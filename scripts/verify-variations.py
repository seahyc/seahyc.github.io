#!/usr/bin/env python3
"""Verify every public variation against reference fixtures and broken starters."""

import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK = ROOT / "static" / "practice" / "variations.json"
REFERENCES = ROOT / "scripts" / "fixtures" / "variation-solutions"
RAN = re.compile(r"Ran (\d+) tests?")


def run_suite(work):
    result = subprocess.run(
        [sys.executable, "tests.py"], cwd=work / "src", capture_output=True,
        text=True, timeout=20,
    )
    output = result.stdout + result.stderr
    match = RAN.search(output)
    if not match:
        raise AssertionError(f"test runner did not report a test count:\n{output}")
    return result.returncode, int(match.group(1)), output


def materialize(work, exercise):
    for name, content in exercise["files"].items():
        target = work / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")


def main():
    exercises = json.loads(BANK.read_text(encoding="utf-8"))["exercises"]
    expected_ids = {
        *(f"probe-{name}" for name in ("filtering", "counting", "normalization", "collections", "routing", "intervals", "graphs", "ranking", "evaluation", "windows", "cycles", "throttling")),
        *(f"variation-{name}" for name in ("filtering", "counting", "normalization", "collections", "routing", "intervals", "graphs", "ranking", "evaluation", "windows", "cycles", "throttling")),
        "mixed-event-summary", "mixed-ranked-counts", "mixed-window-routing",
    }
    ids = [exercise["id"] for exercise in exercises]
    if len(ids) != 27 or set(ids) != expected_ids or len(ids) != len(set(ids)):
        raise AssertionError("variation bank must contain exactly the 27 expected unique ids")

    starter_tests = reference_tests = 0
    with tempfile.TemporaryDirectory(prefix="variation-verification-") as temp:
        temp_root = Path(temp)
        for exercise in exercises:
            work = temp_root / exercise["id"]
            materialize(work, exercise)
            starter_code, count, starter_output = run_suite(work)
            if count < 5:
                raise AssertionError(f"{exercise['id']}: expected at least 5 tests, got {count}")
            if starter_code == 0:
                raise AssertionError(f"{exercise['id']}: unchanged starter unexpectedly passed")
            if "ImportError" in starter_output or "ModuleNotFoundError" in starter_output:
                raise AssertionError(f"{exercise['id']}: starter failed because of an import error")
            if "FAILED (errors=" not in starter_output and "FAILED (failures=" not in starter_output:
                raise AssertionError(f"{exercise['id']}: starter did not fail real test assertions/errors")
            starter_tests += count

            reference = REFERENCES / f"{exercise['id']}.py"
            if not reference.is_file():
                raise AssertionError(f"{exercise['id']}: missing reference fixture {reference}")
            shutil.copyfile(reference, work / exercise["entry"])
            ref_code, ref_count, ref_output = run_suite(work)
            if ref_code or "FAILED" in ref_output or "ERROR" in ref_output:
                raise AssertionError(f"{exercise['id']}: reference failed:\n{ref_output}")
            if ref_count != count:
                raise AssertionError(f"{exercise['id']}: inconsistent test totals")
            reference_tests += ref_count
            print(f"{exercise['id']}: starter FAIL; reference PASS ({ref_count} tests)")

    public_text = BANK.read_text(encoding="utf-8")
    if "variation-solutions" in public_text or ".reference" in public_text:
        raise AssertionError("public bank links to reference fixture material")
    print(f"starter suites: expected failures (27/27, {starter_tests} tests)")
    print(f"reference suites: passed (27/27, {reference_tests} tests)")


if __name__ == "__main__":
    main()
