#!/usr/bin/env python3
"""Verify the Cognition Screen sprint exercises.

Every exercise lives in projects-src/practice-screen/<id>/:
  meta.json        id, title, family, phase, order, minutes, entry, summary, weights, critical
  instructions.md  the problem statement (shown as instructions.md)
  project/         starter files: src/*.py, tests/test_<name>.py (visible), tests/test_candidate.py, DESIGN.md
  validators.py    hidden validators (pytest-style), run only on Submit

Checks: schema, the starter fails the validators, and (with --references) a private
reference solution passes the visible tests and every validator, and a minimal
candidate-tests file kills at least one real mutant of the reference.
"""

import argparse
import json
import shutil
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "projects-src" / "practice-screen"
sys.path.insert(0, str(ROOT / "static" / "practice" / "screen"))
import harness  # noqa: E402

PHASES = {"fluency", "family", "transfer"}
FAMILIES = {"identity", "data", "graph", "parsing", "state", "time"}
META = {"id", "title", "family", "phase", "order", "minutes", "entry", "summary", "weights", "critical"}


def fail(message):
    raise AssertionError(message)


def load(directory):
    meta = json.loads((directory / "meta.json").read_text())
    if set(meta) != META:
        fail(f"{directory.name}: meta keys must be exactly {sorted(META)}, got {sorted(meta)}")
    if meta["id"] != directory.name:
        fail(f"{directory.name}: id must match directory")
    if meta["phase"] not in PHASES or meta["family"] not in FAMILIES:
        fail(f"{meta['id']}: bad phase/family")
    if not isinstance(meta["minutes"], int) or not 10 <= meta["minutes"] <= 90:
        fail(f"{meta['id']}: minutes must be 10-90")
    project = directory / "project"
    files = {str(p.relative_to(project)): p.read_text() for p in sorted(project.rglob("*")) if p.is_file()}
    entry = meta["entry"]
    stem = Path(entry).stem
    visible = f"tests/test_{stem}.py"
    for required in (entry, visible, "tests/test_candidate.py", "DESIGN.md"):
        if required not in files:
            fail(f"{meta['id']}: missing project file {required}")
    for name in files:
        if not (name.startswith("src/") or name.startswith("tests/") or name == "DESIGN.md"):
            fail(f"{meta['id']}: unexpected file {name}")
    instructions = (directory / "instructions.md").read_text()
    validators = (directory / "validators.py").read_text()
    return meta, files, instructions, validators, visible


def stage(files, validators, replace=None):
    temp = Path(tempfile.mkdtemp(prefix="screen-"))
    for name, text in {**files, **(replace or {})}.items():
        path = temp / name
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(text)
    (temp / "validators.py").write_text(validators)
    return temp


def verify(directory, references):
    meta, files, _, validators, visible = load(directory)
    tid = meta["id"]
    temp = stage(files, validators)
    try:
        report = harness.grade(str(temp), meta["entry"], visible, "tests/test_candidate.py", "validators.py")
    finally:
        shutil.rmtree(temp)
    names = {c["test"] for c in report["validators"]}
    if "<import>" in names:
        # A starter that raises NotImplementedError at call time is fine; an import failure is not.
        fail(f"{tid}: validators failed to import against the starter: {report['validators'][0]['detail']}")
    base = {n.split("[")[0] for n in names}
    for key in list(meta["weights"]) + meta["critical"]:
        if key not in base:
            fail(f"{tid}: weight/critical names unknown validator {key}")
    if len(base) < 8:
        fail(f"{tid}: need at least 8 validator functions, found {len(base)}")
    if all(c["status"] == "pass" for c in report["validators"]):
        fail(f"{tid}: starter passes every validator")
    result = {"id": tid, "validators": len(base), "starter_failing": sum(c["status"] != "pass" for c in report["validators"])}
    if references:
        ref = references / f"{tid}.py"
        if not ref.exists():
            fail(f"{tid}: missing reference {ref}")
        candidate = files[visible]  # the visible tests double as a minimal candidate suite
        temp = stage(files, validators, {meta["entry"]: ref.read_text(), "tests/test_candidate.py": candidate})
        try:
            report = harness.grade(str(temp), meta["entry"], visible, "tests/test_candidate.py", "validators.py")
        finally:
            shutil.rmtree(temp)
        bad = [c for c in report["visible"] + report["validators"] if c["status"] != "pass"]
        if bad:
            fail(f"{tid}: reference fails {bad[0]['name']}: {bad[0]['detail'][-600:]}")
        m = report["mutation"]
        if m["real"] < 3:
            fail(f"{tid}: validators detect only {m['real']} mutants of the reference; strengthen them")
        result.update(reference="pass", mutants_real=m["real"], killed_by_visible=m["killed"])
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--references", type=Path, help="directory of private reference solutions <id>.py")
    parser.add_argument("ids", nargs="*")
    args = parser.parse_args()
    dirs = [d for d in sorted(SOURCE.iterdir()) if d.is_dir() and (not args.ids or d.name in args.ids)]
    if not dirs:
        fail("no exercises found")
    orders = set()
    for directory in dirs:
        result = verify(directory, args.references)
        print(json.dumps(result))
        order = json.loads((directory / "meta.json").read_text())["order"]
        if order in orders:
            fail(f"duplicate order {order}")
        orders.add(order)
    print(f"ok: {len(dirs)} exercises")


if __name__ == "__main__":
    main()
