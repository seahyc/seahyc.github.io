#!/usr/bin/env python3
"""Install permanent CPU runtimes and optionally a per-user launchd service."""
import argparse
import json
import os
from pathlib import Path
import plistlib
import shutil
import socket
import subprocess
import sys
import time

LABEL = 'com.seahyc.frontier-workspace'
PACKAGES = ('systems', 'torch', 'jax', 'gym')
FLOOR = 8 * 1024**3


def run(argv, **kwargs):
    return subprocess.run([str(x) for x in argv], check=True, **kwargs)


def listening(port):
    with socket.socket() as sock:
        sock.settimeout(.25)
        return sock.connect_ex(('127.0.0.1', port)) == 0


def write_private(path, content):
    temporary = path.with_name(path.name + '.new')
    with open(temporary, 'wb') as stream:
        os.chmod(temporary, 0o600)
        stream.write(content)
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--home', type=Path, default=Path.home() / 'Library/Application Support/Frontier Workspace')
    parser.add_argument('--static', type=Path, default=Path(__file__).resolve().parents[1] / 'static')
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--python', default='3.12', help='uv Python version or interpreter path')
    parser.add_argument('--install-service', action='store_true', help='Install/update and start the user LaunchAgent')
    parser.add_argument('--dry-run', action='store_true', help='Print the plan without changing files, packages, or services')
    args = parser.parse_args()
    if sys.platform != 'darwin':
        parser.error('The native sandbox requires macOS.')
    if not 1024 <= args.port <= 65535:
        parser.error('Use a port between 1024 and 65535.')
    home, static = args.home.expanduser().resolve(), args.static.expanduser().resolve()
    if not (static / 'practice/lab/index.html').is_file():
        parser.error('--static must contain practice/lab/index.html')
    requirements = {package: static / 'practice/lab/advanced' / package / 'requirements.txt' for package in PACKAGES}
    for package, path in requirements.items():
        if package != 'systems' and not path.is_file():
            parser.error(f'Missing requirements: {path}')
    existing = home
    while not existing.exists():
        existing = existing.parent
    free = shutil.disk_usage(existing).free
    if free < FLOOR:
        parser.error('At least 8 GB free disk space is required before installation.')
    uv = shutil.which('uv')
    if not uv:
        parser.error('Install uv first: https://docs.astral.sh/uv/getting-started/installation/')
    target = f'gui/{os.getuid()}/{LABEL}'
    plist = Path.home() / 'Library/LaunchAgents' / (LABEL + '.plist')
    config_path = home / 'config.json'
    if args.dry_run:
        print(json.dumps({'home': str(home), 'static': str(static), 'port': args.port,
            'config': str(config_path), 'python': args.python, 'freeGB': round(free / 1024**3, 2),
            'runtimes': {p: {'path': str(home / 'runtimes' / p),
                'requirements': str(requirements[p]) if requirements[p].exists() else 'stdlib only',
                'read_roots': 'venv directory and resolved interpreter sys.base_prefix'} for p in PACKAGES},
            'service': str(plist) if args.install_service else 'not installed or started'}, indent=2))
        return
    os.umask(0o077)
    loaded = subprocess.run(['/bin/launchctl', 'print', target], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0
    if loaded and not args.install_service:
        parser.error('The managed service is running. Use --install-service to stop it during the update and restart it.')
    if listening(args.port) and not loaded:
        parser.error(f'Port {args.port} is already in use. Stop that runner before installing; no process was killed.')
    if loaded:
        run(['/bin/launchctl', 'bootout', target])
        deadline = time.monotonic() + 10
        while listening(args.port) and time.monotonic() < deadline:
            time.sleep(.1)
        if listening(args.port):
            parser.error('Port remains occupied after stopping the managed service; stop the other listener first.')
    home.mkdir(parents=True, exist_ok=True, mode=0o700)
    home.chmod(0o700)
    (home / 'runtimes').mkdir(exist_ok=True, mode=0o700)
    runtimes = {}
    for package in PACKAGES:
        if shutil.disk_usage(home).free < FLOOR:
            raise SystemExit('Free space fell below 8 GB; installation stopped. Existing records are preserved.')
        venv = home / 'runtimes' / package
        python = venv / 'bin/python'
        if not python.is_file():
            run([uv, 'venv', '--python', args.python, venv])
        if requirements[package].is_file():
            run([uv, 'pip', 'sync', '--python', python, requirements[package]])
        base = run([python, '-I', '-c', 'import sys; print(sys.base_prefix)'], capture_output=True, text=True).stdout.strip()
        runtimes[package] = {'python': str(python), 'read_roots': [str(venv.resolve()), str(Path(base).resolve())]}
    config = {'home': str(home), 'static': str(static), 'port': args.port,
              'min_free_bytes': FLOOR, 'runtimes': runtimes}
    write_private(config_path, (json.dumps(config, indent=2) + '\n').encode())
    service = home / 'service'
    service.mkdir(exist_ok=True, mode=0o700)
    for name in ('server.py', 'sandbox.py'):
        write_private(service / name, (Path(__file__).resolve().parent / name).read_bytes())
    logs = home / 'logs'
    logs.mkdir(exist_ok=True, mode=0o700)
    print(f'Installed CPU runtimes and config: {config_path}')
    if args.install_service:
        if listening(args.port):
            raise SystemExit('Port became occupied during installation; service was not started.')
        plist.parent.mkdir(parents=True, exist_ok=True)
        definition = {'Label': LABEL,
            'ProgramArguments': [runtimes['systems']['python'], '-u', str(service / 'server.py'), '--config', str(config_path)],
            'WorkingDirectory': str(service), 'RunAtLoad': True, 'KeepAlive': True,
            'ThrottleInterval': 10, 'Umask': 0o077,
            'StandardOutPath': str(logs / 'service.log'), 'StandardErrorPath': str(logs / 'service-error.log'),
            'EnvironmentVariables': {'PATH': '/usr/bin:/bin', 'PYTHONDONTWRITEBYTECODE': '1', 'PYTHONNOUSERSITE': '1'}}
        write_private(plist, plistlib.dumps(definition))
        run(['/bin/launchctl', 'bootstrap', f'gui/{os.getuid()}', plist])
        deadline = time.monotonic() + 10
        while not listening(args.port) and time.monotonic() < deadline:
            time.sleep(.1)
        if not listening(args.port):
            raise SystemExit(f'Service did not open its port. Inspect {logs / "service-error.log"}')
        print(f'LaunchAgent started. Open http://127.0.0.1:{args.port}/pair')
    else:
        print('Service not started. Run this installer again with --install-service, or start service/server.py with --config.')


if __name__ == '__main__':
    main()
