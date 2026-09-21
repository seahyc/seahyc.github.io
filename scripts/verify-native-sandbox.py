#!/usr/bin/env python3
"""Actual native isolation checks; requires the assessment Torch/JAX venvs."""
import json
import os
import signal
import time
from pathlib import Path
import subprocess
import sys
import tempfile
import threading

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'runner'))
import sandbox


def runtime_roots(python):
    base = subprocess.check_output([str(python), '-I', '-c', 'import sys; print(sys.base_prefix)'], text=True).strip()
    return [python.parent.parent, Path(base)]


def main():
    torch_python = Path(os.environ.get('TORCH_PYTHON', '/tmp/frontier-torch-venv/bin/python'))
    jax_python = Path(os.environ.get('JAX_PYTHON', '/tmp/frontier-jax-venv/bin/python'))
    if sys.platform != 'darwin':
        raise SystemExit('Requires macOS: cannot claim native verification on another OS')
    with tempfile.TemporaryDirectory(prefix='sandbox-verification-') as temporary:
        root = Path(temporary).resolve()
        secret = root / 'planted-secret.txt'
        secret.write_text('SYNTHETIC-DO-NOT-PRINT')
        outside = root / 'outside-write.txt'
        def check(name, code, *, python=torch_python, expected='completed', timeout=15,
                  memory=1024, output=100000, disk=16, cancellation=False):
            cwd = root / name
            cwd.mkdir()
            (cwd / 'escape').symlink_to(secret)
            logs = []
            event = threading.Event()
            timer = threading.Timer(0.25, event.set) if cancellation else None
            if timer:
                timer.start()
            try:
                result = sandbox.run([str(python), '-I', '-u', '-c', code], cwd,
                                     runtime_roots(python), event, timeout, memory,
                                     logs.append, max_output_bytes=output, max_disk_mb=disk)
            finally:
                if timer:
                    timer.cancel()
            text = ''.join(logs)
            assert 'SYNTHETIC-DO-NOT-PRINT' not in text, name + ': leaked secret'
            assert result['reason'] == expected, (name, result, text[-1000:])
            if expected == 'completed':
                assert result['exit_code'] == 0, (name, result, text[-1000:])
            print(name + ': ' + json.dumps(result))
            return text
        check('deny-secret-read', f"from pathlib import Path\ntry: Path({str(secret)!r}).read_text()\nexcept PermissionError: pass\nelse: raise AssertionError('read allowed')")
        check('deny-external-write', f"from pathlib import Path\ntry: Path({str(outside)!r}).write_text('x')\nexcept PermissionError: pass\nelse: raise AssertionError('write allowed')")
        assert not outside.exists()
        check('deny-symlink-escape', "from pathlib import Path\ntry: Path('escape').read_text()\nexcept PermissionError: pass\nelse: raise AssertionError('symlink escape allowed')")
        check('deny-network', "import socket\ntry:\n s=socket.socket(); s.settimeout(1); s.connect(('1.1.1.1',443))\nexcept PermissionError: pass\nelse: raise AssertionError('network allowed')")
        check('deny-fork', "import os\ntry: os.fork()\nexcept PermissionError: pass\nelse: os._exit(99)")
        check('deny-subprocess', "import subprocess,sys\ntry: subprocess.run([sys.executable,'-c','print(123)'],check=True)\nexcept PermissionError: pass\nelse: raise AssertionError('spawn allowed')")
        check('minimal-environment', "import os\nassert not any(x in os.environ for x in ['AWS_ACCESS_KEY_ID','OPENAI_API_KEY','SSH_AUTH_SOCK','PYTHONPATH'])")
        check('torch-cpu', "import torch\nx=torch.tensor([2.,3.],requires_grad=True); (x*x).sum().backward(); assert x.grad.tolist()==[4.,6.]; print('torch CPU autograd verified')", timeout=30)
        check('jax-cpu', "import jax,jax.numpy as jnp\nf=jax.jit(jax.grad(lambda x:(x*x).sum())); assert f(jnp.array([2.,3.])).tolist()==[4.,6.]; assert all(d.platform=='cpu' for d in jax.devices()); print('JAX CPU jit/grad verified')", python=jax_python, timeout=30)
        mps = check('mps-probe', "import torch\nprint('MPS_AVAILABLE='+str(torch.backends.mps.is_available()))", timeout=30)
        print(mps.strip())
        check('wall-timeout', 'while True: pass', expected='timeout', timeout=1)
        check('cancellation', 'while True: pass', expected='cancelled', cancellation=True)
        check('stdout-limit', "while True: print('x'*10000)", expected='output_limit', output=20000)
        check('memory-limit', "import time\nx=bytearray(200*1024*1024); time.sleep(3)", expected='memory_limit', memory=48)
        check('disk-limit', "import os\nf=open('large','wb',buffering=0)\nwhile True: f.write(b'x'*65536)", expected='output_limit', disk=1)
        # Kill the service process while a sandbox writes. The independent
        # guardian must reap the writer before recovery exposes its artifacts.
        orphan_work = root / 'orphan-parent-death'
        orphan_work.mkdir()
        child_code = "import os,time;open('child.pid','w').write(str(os.getpid()));f=open('writes','ab',buffering=0)\nwhile True:f.write(b'x');time.sleep(.02)"
        parent_code = ("import sys,pathlib,threading;sys.path.insert(0," + repr(str(Path(sandbox.__file__).parent)) + ");import sandbox;"
            + "sandbox.run(" + repr([str(torch_python), '-I', '-c', child_code])
            + ",pathlib.Path(" + repr(str(orphan_work)) + "),"
            + repr([str(p) for p in runtime_roots(torch_python)])
            + ",threading.Event(),30,128,lambda text:None)")
        parent = subprocess.Popen([sys.executable, '-I', '-c', parent_code], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        child = None
        try:
            deadline = time.monotonic() + 10
            while not (orphan_work / 'child.pid').exists() and time.monotonic() < deadline:
                time.sleep(.02)
            child = int((orphan_work / 'child.pid').read_text())
            assert not sandbox.cleanup_previous(orphan_work, .1), 'guardian lock absent while running'
            parent.kill(); parent.wait()
            assert sandbox.cleanup_previous(orphan_work, 5), 'guardian did not reap after parent death'
            try:
                os.kill(child, 0)
            except ProcessLookupError:
                pass
            else:
                raise AssertionError('sandbox child survived guardian cleanup')
            before = (orphan_work / 'writes').stat().st_size
            time.sleep(.1)
            assert (orphan_work / 'writes').stat().st_size == before
            print('parent-death: guardian lock held during execution; SIGKILL parent; child reaped; no surviving writer')
        finally:
            if parent.poll() is None:
                parent.kill(); parent.wait()
            if child:
                try: os.kill(child, signal.SIGKILL)
                except ProcessLookupError: pass
        original = sandbox.SANDBOX_EXEC
        sandbox.SANDBOX_EXEC = '/nonexistent/sandbox-exec'
        try:
            check('fail-closed-unavailable', "raise AssertionError('executed')", expected='unavailable')
        finally:
            sandbox.SANDBOX_EXEC = original
    print('PASS: isolation, CPU frameworks, and resource termination checks')


if __name__ == '__main__':
    main()
