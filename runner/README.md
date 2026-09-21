# Local Frontier Workspace runner

This macOS companion runs the published practice workspace's Python experiments on your Mac. It supports **CPU execution only**, including PyTorch, JAX, Gymnasium, and the systems assessments. It does not provision GPUs, rent machines, or support MPS under its sandbox policy.

## Install

Install [uv](https://docs.astral.sh/uv/getting-started/installation/) and keep this repository available for its static assessment files. At least 8 GB free disk space is required before installing dependencies and before accepting jobs.

From the repository root:

```sh
python3 runner/install.py --dry-run
python3 runner/install.py
```

The installer creates permanent isolated runtimes in `~/Library/Application Support/Frontier Workspace/runtimes/`. Torch, JAX, and Gym use the assessment packages' pinned requirements; systems uses the Python standard library. It reuses uv's dependency cache. `config.json` stores absolute static-directory and runtime paths, port 8765, and each interpreter's allowed runtime read roots. Private configuration, logs, service code, and job records live under the same application-support directory with restricted permissions.

To also start the companion at login:

```sh
python3 runner/install.py --install-service
```

This installs the per-user `com.seahyc.frontier-workspace` LaunchAgent. Its server uses the permanent systems interpreter and listens on `127.0.0.1:8765`. Re-running with `--install-service` stops the managed service before updating dependencies and restarts it once complete. Running jobs can be interrupted by upgrades; finish or cancel them first. Installation refuses an occupied port owned by an unmanaged process. If an update fails, the service stays stopped; fix the error and rerun the installer. Existing experiment records are retained.

For foreground operation without launchd:

```sh
"$HOME/Library/Application Support/Frontier Workspace/runtimes/systems/bin/python" \
  "$HOME/Library/Application Support/Frontier Workspace/service/server.py" \
  --config "$HOME/Library/Application Support/Frontier Workspace/config.json"
```

Use either the LaunchAgent or foreground operation, so only one runner owns the workspace. `--home`, `--static`, `--port`, and `--python` customize installation; run `python3 runner/install.py --help` for details.

## Pair and run

Open the practice lab on the published website and connect its local runner. The local confirmation page requires an explicit **Pair browser** click before sharing its token. Keep the token private. If your browser blocks public-site access to localhost, open [the local pairing page](http://127.0.0.1:8765/pair) directly; it opens the local copy of the workspace after pairing. Both interfaces use the same durable local job records. Their browser journals have separate storage: export/import a backup to carry notes and drafts between origins; the runner never silently migrates them.

Submitted jobs run sequentially. Jobs have separate source snapshots and writable output directories. Reports, logs, and artifacts remain on this Mac; stopping the service does not delete them. A guardian kills and reaps the worker if the service dies. A restart waits for that cleanup before marking the job interrupted or releasing its artifacts. Resume is available only where the assessment supports a checkpoint.

## Execution boundary

The companion requires macOS `sandbox-exec` and fails closed when unavailable. Each job receives a minimal environment. Its policy denies network access, child processes, reads of private file contents, and writes outside its job directory. Read access includes its source snapshot, selected Python runtime, and necessary operating-system libraries. Filesystem metadata is readable; this is not a virtual machine.

CPU time, maximum individual file size, and core-dump prohibition use operating-system resource limits. Wall time, process RSS, combined disk usage, and streamed output are monitored and terminate offending jobs. RSS and disk checks are **sampled thresholds**, not hard cgroup allocation quotas; usage can briefly exceed the requested amount, and reported RSS peaks are sampled. This boundary has been exercised with real CPU Torch autograd and JAX jit/grad, denied synthetic secret reads, external writes, symlink escapes, network and process creation, plus cancellation and resource-limit cases.

Run the isolation checks against installed interpreters:

```sh
TORCH_PYTHON="$HOME/Library/Application Support/Frontier Workspace/runtimes/torch/bin/python" \
JAX_PYTHON="$HOME/Library/Application Support/Frontier Workspace/runtimes/jax/bin/python" \
python3 scripts/verify-native-sandbox.py
```

## Stop or remove the service

Stop the LaunchAgent:

```sh
launchctl bootout "gui/$(id -u)/com.seahyc.frontier-workspace"
```

Start it again:

```sh
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.seahyc.frontier-workspace.plist"
```

To prevent future login startup, stop it and remove only its LaunchAgent file:

```sh
rm "$HOME/Library/LaunchAgents/com.seahyc.frontier-workspace.plist"
```

These commands preserve configuration, pairing state, jobs, artifacts, and runtimes. Foreground operation stops with Control-C. Logs are in `~/Library/Application Support/Frontier Workspace/logs/`; their contents may include experiment output. No automatic deletion of experiment records is performed.
