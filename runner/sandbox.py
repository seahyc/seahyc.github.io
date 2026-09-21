"""Fail-closed macOS Seatbelt execution, intended for local CPU assessments.

Seatbelt denies network and process creation and restricts file content access.
RSS and disk quotas are sampled kill thresholds, not cgroup/hard allocation limits.
The caller must keep its service code, credentials and state outside the job cwd.
"""
from __future__ import annotations

import ctypes
import fcntl
import json
import math
import os
from pathlib import Path
import resource
import selectors
import signal
import subprocess
import sys
import threading
import time

SANDBOX_EXEC = '/usr/bin/sandbox-exec'


def _quote(value):
    return json.dumps(str(value))


def _profile(command, cwd, read_roots):
    roots = {str(Path(p).resolve(strict=True)) for p in read_roots}
    roots.update(('/System', '/usr/lib', '/usr/share', '/private/var/db/dyld'))
    # Include the launch spelling as well as its resolved path (venv symlinks).
    executable = Path(command[0])
    exec_paths = {str(executable.absolute()), str(executable.resolve(strict=True))}
    framework_python = executable.resolve().parent.parent / 'Resources/Python.app/Contents/MacOS/Python'
    if framework_python.is_file():
        exec_paths.add(str(framework_python))
    return '\n'.join([
        '(version 1)', '(deny default)',
        '(allow process-exec ' + ' '.join('(literal %s)' % _quote(p) for p in exec_paths) + ')',
        '(allow sysctl-read)',
        # Metadata does not grant file contents or directory enumeration.
        '(allow file-read-metadata)',
        '(allow file-read* (literal "/"))',
        '(allow file-read* ' + ' '.join('(subpath %s)' % _quote(p) for p in sorted(roots)) + ')',
        '(allow file-read* file-write* (subpath %s))' % _quote(cwd),
        '(allow file-read* file-write* (literal "/dev/null"))',
        '(allow file-read* (literal "/dev/urandom") (literal "/dev/random"))',
        '(allow mach-lookup (global-name "com.apple.system.logger"))',
        # No network*, process-fork, mach access to browsers/keychain, or IOKit.
    ])


def _rss_mb(pid):
    # proc_pidinfo PROC_PIDTASKINFO provides resident bytes without spawning ps.
    class TaskInfo(ctypes.Structure):
        _fields_ = [('virtual_size', ctypes.c_uint64), ('resident_size', ctypes.c_uint64),
                    ('rest', ctypes.c_byte * 80)]
    info = TaskInfo()
    libproc = ctypes.CDLL('/usr/lib/libproc.dylib')
    count = libproc.proc_pidinfo(pid, 4, 0, ctypes.byref(info), ctypes.sizeof(info))
    return info.resident_size / (1024 * 1024) if count >= 16 else 0.0


def _disk_bytes(cwd):
    size = 0
    for directory, _, filenames in os.walk(cwd, followlinks=False):
        for filename in filenames:
            try:
                path = Path(directory) / filename
                if not path.is_symlink():
                    size += path.stat().st_size
            except OSError:
                pass
    return size


def _run_internal(command: list[str], cwd: Path, read_roots: list[Path], cancel: threading.Event,
        timeout_seconds: int, memory_mb: int, on_log, max_output_bytes=1_000_000,
        max_disk_mb=256) -> dict:
    """Run argv with a minimal environment. Never falls back to unsandboxed exec.

    Trusted caller supplies absolute interpreter, immutable code and runtime roots.
    on_log receives decoded combined stdout/stderr (UTF-8 with replacement).
    """
    started = time.monotonic()
    result = dict(exit_code=None, reason='failed', duration_seconds=0.0, peak_rss_mb=0.0)
    process = None
    selector = selectors.DefaultSelector()
    try:
        if sys.platform != 'darwin' or not Path(SANDBOX_EXEC).is_file():
            result['reason'] = 'unavailable'
            return result
        if not command or not Path(command[0]).is_absolute():
            raise ValueError('command requires an absolute executable path')
        if min(timeout_seconds, memory_mb, max_output_bytes, max_disk_mb) <= 0:
            raise ValueError('resource limits must be positive')
        cwd = Path(cwd).resolve(strict=True)
        if not cwd.is_dir() or cwd == Path('/'):
            raise ValueError('cwd must be a dedicated job directory')
        if cancel.is_set():
            result['reason'] = 'cancelled'
            return result
        profile = _profile(command, cwd, read_roots)
        environment = {
            'PATH': '/usr/bin:/bin', 'HOME': str(cwd), 'TMPDIR': str(cwd),
            'LANG': 'en_US.UTF-8', 'LC_ALL': 'en_US.UTF-8',
            'PYTHONDONTWRITEBYTECODE': '1', 'PYTHONNOUSERSITE': '1',
            'OMP_NUM_THREADS': '2', 'OPENBLAS_NUM_THREADS': '2',
            'VECLIB_MAXIMUM_THREADS': '2', 'JAX_PLATFORMS': 'cpu',
            'XDG_CACHE_HOME': str(cwd / '.cache'),
        }
        # A trusted launcher sets rlimits before exec. Avoid preexec_fn: this API
        # is called by a threaded HTTP server, where Python preexec can deadlock.
        launch = [sys.executable, '-I', str(Path(__file__).resolve()),
                  '--limited-exec', str(timeout_seconds), str(max_disk_mb),
                  SANDBOX_EXEC, '-p', profile, *command]
        process = subprocess.Popen(launch, cwd=cwd, env=environment,
                                   stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                                   stdin=subprocess.DEVNULL, start_new_session=True)
        os.set_blocking(process.stdout.fileno(), False)
        selector.register(process.stdout, selectors.EVENT_READ)
        consumed = 0
        reason = 'completed'
        last_disk_check = 0.0
        while True:
            now = time.monotonic()
            rss = _rss_mb(process.pid)
            result['peak_rss_mb'] = max(result['peak_rss_mb'], rss)
            if cancel.is_set():
                reason = 'cancelled'
            elif now - started > timeout_seconds:
                reason = 'timeout'
            elif rss > memory_mb:
                reason = 'memory_limit'
            elif now - last_disk_check > 0.2:
                last_disk_check = now
                if _disk_bytes(cwd) >= max_disk_mb * 1024**2:
                    reason = 'output_limit'
            if reason != 'completed':
                break
            for key, _ in selector.select(timeout=0.05):
                chunk = os.read(key.fd, 65536)
                if chunk:
                    allowed = max(0, max_output_bytes - consumed)
                    if allowed:
                        on_log(chunk[:allowed].decode('utf-8', errors='replace'))
                    consumed += len(chunk)
                    if consumed > max_output_bytes:
                        reason = 'output_limit'
                        break
                else:
                    selector.unregister(key.fileobj)
            if reason != 'completed' or (process.poll() is not None and not selector.get_map()):
                break
        if reason != 'completed':
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        process.wait()
        result['exit_code'] = process.returncode
        if reason == 'completed' and _disk_bytes(cwd) >= max_disk_mb * 1024**2:
            reason = 'output_limit'
        if reason == 'completed' and process.returncode == -signal.SIGXCPU:
            reason = 'timeout'
        if reason == 'completed' and process.returncode == -signal.SIGXFSZ:
            reason = 'output_limit'
        result['reason'] = reason
    except Exception as error:
        on_log('Sandbox execution failed: %s\n' % type(error).__name__)
        result['reason'] = 'failed'
    finally:
        if process is not None:
            try:
                os.killpg(process.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
            process.wait()
            if process.stdout:
                process.stdout.close()
        selector.close()
        result['duration_seconds'] = round(time.monotonic() - started, 3)
        result['peak_rss_mb'] = round(result['peak_rss_mb'], 2)
    return result


def _environment(cwd):
    return {'PATH': '/usr/bin:/bin', 'HOME': str(cwd), 'TMPDIR': str(cwd),
            'LANG': 'en_US.UTF-8', 'PYTHONDONTWRITEBYTECODE': '1',
            'PYTHONNOUSERSITE': '1'}


def cleanup_previous(cwd, timeout_seconds=10):
    """True only once the guardian releases its job lock after process reaping.

    Call before treating interrupted jobs as terminal or serving their artifacts.
    The lock is outside writable cwd; parent acquires it before guardian spawn.
    """
    lock_path = Path(cwd).resolve().parent / '.process.lock'
    fd = os.open(lock_path, os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
    try:
        deadline = time.monotonic() + timeout_seconds
        while True:
            try:
                fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
                return True
            except BlockingIOError:
                if time.monotonic() >= deadline:
                    return False
                time.sleep(.05)
    finally:
        os.close(fd)


def run(command: list[str], cwd: Path, read_roots: list[Path], cancel: threading.Event,
        timeout_seconds: int, memory_mb: int, on_log, max_output_bytes=1_000_000,
        max_disk_mb=256) -> dict:
    """Supervise a sandbox through a guardian that survives server termination."""
    started = time.monotonic()
    fallback = dict(exit_code=None, reason='failed', duration_seconds=0., peak_rss_mb=0.)
    if sys.platform != 'darwin' or not Path(SANDBOX_EXEC).is_file():
        return fallback | {'reason': 'unavailable'}
    if cancel.is_set():
        return fallback | {'reason': 'cancelled'}
    cwd = Path(cwd).resolve(strict=True)
    # Inherit this locked descriptor atomically with guardian creation: there is
    # no gap where recovery sees an unlocked job while a guardian can launch it.
    fd = os.open(cwd.parent / '.process.lock', os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
    guardian = None
    selector = selectors.DefaultSelector()
    answer = None
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        guardian = subprocess.Popen([sys.executable, '-I', str(Path(__file__).resolve()),
            '--supervise', str(fd)], stdin=subprocess.PIPE, stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL, env=_environment(cwd), start_new_session=True,
            pass_fds=(fd,))
        os.close(fd); fd = None
        payload = dict(command=command, cwd=str(cwd), read_roots=[str(p) for p in read_roots],
            timeout_seconds=timeout_seconds, memory_mb=memory_mb,
            max_output_bytes=max_output_bytes, max_disk_mb=max_disk_mb)
        guardian.stdin.write((json.dumps(payload) + '\n').encode()); guardian.stdin.flush()
        os.set_blocking(guardian.stdout.fileno(), False)
        selector.register(guardian.stdout, selectors.EVENT_READ)
        buffer = b''
        while selector.get_map():
            if cancel.is_set() and not guardian.stdin.closed:
                guardian.stdin.close()
            for key, _ in selector.select(.05):
                chunk = os.read(key.fd, 65536)
                if not chunk:
                    selector.unregister(key.fileobj)
                    break
                buffer += chunk
                while b'\n' in buffer:
                    line, buffer = buffer.split(b'\n', 1)
                    message = json.loads(line)
                    if 'log' in message:
                        on_log(message['log'])
                    elif 'result' in message:
                        answer = message['result']
        guardian.wait()
        return answer or fallback
    finally:
        if fd is not None:
            os.close(fd)
        if guardian is not None:
            # EOF remains the termination signal even if log processing raises.
            if not guardian.stdin.closed:
                guardian.stdin.close()
            guardian.stdout.close()
            guardian.wait()
        selector.close()
        fallback['duration_seconds'] = round(time.monotonic() - started, 3)


def _supervise():
    lock_fd = int(sys.argv[2])
    try:
        raw = sys.stdin.buffer.readline()
        if not raw:
            return
        options = json.loads(raw)
        options['cwd'] = Path(options['cwd'])
        options['read_roots'] = [Path(p) for p in options['read_roots']]
        cancelled = threading.Event()
        def parent_watch():
            # Neither the sandbox nor its launch helper inherits this pipe.
            # Parent death closes its writer; no PID polling/reuse race exists.
            os.read(sys.stdin.fileno(), 1)
            cancelled.set()
        watcher = threading.Thread(target=parent_watch, daemon=True)
        watcher.start()
        def emit(value):
            try:
                print(json.dumps(value), flush=True)
            except BrokenPipeError:
                cancelled.set()
        result = _run_internal(cancel=cancelled, on_log=lambda value: emit({'log': value}), **options)
        emit({'result': result})
    finally:
        # _run_internal always kills/reaps before this lock can be released.
        os.close(lock_fd)


def _limited_exec():
    if len(sys.argv) < 7 or sys.argv[1] != '--limited-exec':
        raise SystemExit('This module is an internal sandbox launcher')
    cpu = max(1, math.ceil(float(sys.argv[2])))
    file_limit = int(sys.argv[3]) * 1024**2
    resource.setrlimit(resource.RLIMIT_CORE, (0, 0))
    resource.setrlimit(resource.RLIMIT_FSIZE, (file_limit, file_limit))
    resource.setrlimit(resource.RLIMIT_CPU, (cpu, cpu + 1))
    resource.setrlimit(resource.RLIMIT_NOFILE, (128, 128))
    os.execve(SANDBOX_EXEC, sys.argv[4:], dict(os.environ))


if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--supervise':
        _supervise()
    else:
        _limited_exec()
