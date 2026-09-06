#!/usr/bin/env python3
"""Validate the public exercise bundle and test private reference solutions."""

import argparse
import json
import py_compile
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path, PurePosixPath


REQUIRED_ROOT = {"title", "exercises"}
REQUIRED_EXERCISE = {
    "id", "title", "stage", "minutes", "focus", "why", "brief",
    "entry", "files", "hints",
}
STAGES = {"Foundation", "Build", "Mock"}



def fail(message):
    raise AssertionError(message)


def safe_relative(name):
    path = PurePosixPath(name)
    return bool(name) and not path.is_absolute() and ".." not in path.parts


def validate(data):
    if not isinstance(data, dict) or set(data) != REQUIRED_ROOT:
        fail("root must contain exactly title and exercises")
    if not isinstance(data["title"], str) or not data["title"].strip():
        fail("title must be a non-empty string")
    exercises = data["exercises"]
    if not isinstance(exercises, list) or not exercises:
        fail("exercises must be a non-empty list")

    ids = set()
    for index, exercise in enumerate(exercises):
        label = f"exercise {index + 1}"
        if not isinstance(exercise, dict) or set(exercise) != REQUIRED_EXERCISE:
            fail(f"{label} has an invalid schema")
        for key in ("id", "title", "focus", "why", "brief", "entry"):
            if not isinstance(exercise[key], str) or not exercise[key].strip():
                fail(f"{label}.{key} must be a non-empty string")
        if exercise["id"] in ids:
            fail(f"duplicate id: {exercise['id']}")
        ids.add(exercise["id"])
        if exercise["stage"] not in STAGES:
            fail(f"{label}.stage is invalid")
        if isinstance(exercise["minutes"], bool) or not isinstance(exercise["minutes"], int) or exercise["minutes"] <= 0:
            fail(f"{label}.minutes must be a positive integer")
        if not isinstance(exercise["hints"], list) or len(exercise["hints"]) != 3:
            fail(f"{label} must have exactly three hints")
        if any(not isinstance(hint, str) or not hint.strip() for hint in exercise["hints"]):
            fail(f"{label} hints must be non-empty strings")
        files = exercise["files"]
        if not isinstance(files, dict) or not files:
            fail(f"{label}.files must be a non-empty object")
        for name, content in files.items():
            if not isinstance(name, str) or not safe_relative(name):
                fail(f"{label} has unsafe file path: {name!r}")
            if not isinstance(content, str):
                fail(f"{label} file {name!r} is not text")
            if not (name.startswith("src/") and (name.endswith(".py") or name.endswith(".jsonl"))) and name != "DESIGN.md":
                fail(f"{label} has disallowed public file: {name!r}")
        if not safe_relative(exercise["entry"]) or exercise["entry"] not in files:
            fail(f"{label}.entry must name a bundled relative file")
        if "src/tests.py" not in files:
            fail(f"{label} is missing src/tests.py")

    serialized = json.dumps(data, ensure_ascii=False).lower()
    if "/users/" in serialized or "file://" in serialized:
        fail("public curriculum contains a private or absolute path")
    return exercises


def compile_starters(exercises):
    count = 0
    with tempfile.TemporaryDirectory(prefix="exercise-compile-") as temp:
        root = Path(temp)
        for exercise in exercises:
            for name, content in exercise["files"].items():
                if not name.endswith(".py"):
                    continue
                target = root / exercise["id"] / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content, encoding="utf-8")
                py_compile.compile(str(target), cfile=str(target) + ".pyc", doraise=True)
                count += 1
    return count


def find_original_reference(source_root, entry_name):
    matches = list(source_root.glob(f"*/.reference/{entry_name}"))
    if len(matches) != 1:
        fail(f"expected one private reference for {entry_name}, found {len(matches)}")
    return matches[0]


def run_references(exercises, source_root, new_reference_root):
    passed = []
    with tempfile.TemporaryDirectory(prefix="exercise-tests-") as temp:
        root = Path(temp)
        for exercise in exercises:
            work = root / exercise["id"]
            for name, content in exercise["files"].items():
                target = work / name
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_text(content, encoding="utf-8")
            entry = work / exercise["entry"]
            candidates = [new_reference_root / (exercise["id"] + ".py"), new_reference_root / entry.name]
            reference = next((candidate for candidate in candidates if candidate.is_file()), None)
            if reference is None:
                reference = find_original_reference(source_root, entry.name)
            if not reference.is_file():
                fail(f"missing private reference for {exercise['id']}: {reference}")
            shutil.copyfile(reference, entry)
            result = subprocess.run(
                [sys.executable, "tests.py"], cwd=work / "src",
                text=True, capture_output=True, timeout=30,
            )
            output = (result.stdout + result.stderr).strip()
            if result.returncode:
                fail(f"reference tests failed for {exercise['id']}:\n{output}")
            passed.append((exercise["id"], output.splitlines()[-1] if output else "passed"))
    return passed


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--curriculum",
        type=Path,
        default=Path(__file__).resolve().parents[1] / "static" / "practice" / "curriculum.json",
    )
    parser.add_argument("--source-root", type=Path)
    parser.add_argument("--new-reference-root", type=Path)
    args = parser.parse_args()

    data = json.loads(args.curriculum.read_text(encoding="utf-8"))
    exercises = validate(data)
    compiled = compile_starters(exercises)
    if bool(args.source_root) != bool(args.new_reference_root):
        parser.error("provide both reference roots, or neither for public validation")
    passed = run_references(exercises, args.source_root, args.new_reference_root) if args.source_root else []
    print(f"schema/safety: ok ({len(exercises)} exercises)")
    print(f"starter compilation: ok ({compiled} Python files)")
    for exercise_id, result in passed:
        print(f"reference tests: ok {exercise_id} ({result})")
    if args.source_root:
        print(f"reference suites: ok ({len(passed)}/{len(exercises)})")
    else:
        print("reference suites: skipped (private reference roots not supplied)")


if __name__ == "__main__":
    main()
