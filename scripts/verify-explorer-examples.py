#!/usr/bin/env python3
"""Validate every Practice Explorer runnable example against its contract."""

from __future__ import annotations

import argparse
import ast
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOGS = (
    ROOT / "static/practice/ramp.json",
    ROOT / "static/practice/curriculum.json",
    ROOT / "static/practice/variations.json",
)
EXAMPLES = ROOT / "static/practice/examples.json"
REFERENCES = ROOT / "scripts/fixtures/variation-solutions"
MODES = {"value", "arguments", "python"}

# This starter deliberately supplies an empty class instead of placeholder methods.
ALLOWED_STARTER_ERRORS = {"evolving-ledger": ("AttributeError",)}


def load_catalogs():
    exercises = []
    source_catalog = {}
    for path in CATALOGS:
        data = json.loads(path.read_text())
        for exercise in data["exercises"]:
            if exercise["id"] in source_catalog:
                raise AssertionError(f"duplicate exercise id: {exercise['id']}")
            exercises.append(exercise)
            source_catalog[exercise["id"]] = path
    return exercises, source_catalog


def definitions(source: str):
    tree = ast.parse(source)
    return {
        node.name
        for node in tree.body
        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef))
    }


def validate_schema(exercises, examples):
    ids = [exercise["id"] for exercise in exercises]
    assert list(examples) == ids, "examples must cover all exercises in catalog order"
    for exercise in exercises:
        eid = exercise["id"]
        example = examples[eid]
        mode = example.get("mode")
        assert mode in MODES, f"{eid}: invalid mode {mode!r}"
        assert isinstance(example.get("caption"), str) and example["caption"].strip(), (
            f"{eid}: caption must be nonempty"
        )
        if mode == "python":
            assert set(example) == {"mode", "script", "expected", "caption"}, (
                f"{eid}: unexpected Python example fields"
            )
            assert isinstance(example["script"], str) and "print(" in example["script"], (
                f"{eid}: Python driver must print learner-produced output"
            )
            assert isinstance(example["expected"], str), f"{eid}: Python expected must be text"
            compile(
                example["script"], f"examples.json:{eid}", "exec",
                flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT,
            )
            imported = []
            for node in ast.parse(example["script"], mode="exec").body:
                if isinstance(node, ast.ImportFrom):
                    imported.extend((node.module, alias.name) for alias in node.names)
            assert imported, f"{eid}: Python driver must import learner code"
            module = Path(exercise["entry"]).stem
            available = definitions(exercise["files"][exercise["entry"]])
            for imported_module, name in imported:
                if imported_module == module:
                    assert name in available, f"{eid}: imported learner name {name!r} does not exist"
            assert any(imported_module == module for imported_module, _ in imported), (
                f"{eid}: Python driver does not import entry module {module!r}"
            )
        else:
            assert set(example) == {
                "mode", "module", "function", "args", "expected", "caption"
            }, f"{eid}: unexpected JSON example fields"
            assert example["module"] == Path(exercise["entry"]).stem, (
                f"{eid}: module must match entry basename"
            )
            assert isinstance(example["args"], list), f"{eid}: args must be a JSON array"
            if mode == "value":
                assert len(example["args"]) == 1, f"{eid}: value mode needs exactly one argument"
            available = definitions(exercise["files"][exercise["entry"]])
            assert example["function"] in available, (
                f"{eid}: function {example['function']!r} does not exist"
            )


def runner_source(example):
    if example["mode"] == "python":
        body = "\n".join("    " + line for line in example["script"].splitlines())
        return "import asyncio\nasync def __example_main():\n" + body + "\nasyncio.run(__example_main())\n"
    payload = json.dumps(example["args"])
    return f"""import json
from {example['module']} import {example['function']} as learner_function
args = json.loads({json.dumps(payload)})
actual = learner_function(*args)
print(json.dumps(actual, separators=(',', ':'), allow_nan=False))
"""


def expected_stdout(example):
    if example["mode"] == "python":
        return example["expected"].strip()
    return json.dumps(example["expected"], separators=(",", ":"), allow_nan=False)


def execute(exercise, example, replacement=None):
    with tempfile.TemporaryDirectory(prefix="practice-example-") as raw:
        temp = Path(raw)
        for relative, content in exercise["files"].items():
            target = temp / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content)
        if replacement is not None:
            (temp / exercise["entry"]).write_text(replacement)
        driver = temp / "src/run_example.py"
        driver.write_text(runner_source(example))
        return subprocess.run(
            [sys.executable, str(driver)], cwd=temp / "src", text=True,
            capture_output=True, timeout=10,
        )


def error_name(stderr):
    for line in reversed(stderr.splitlines()):
        stripped = line.strip()
        if stripped and ":" not in stripped:
            return stripped
        if ":" in line:
            return line.split(":", 1)[0].strip()
    return "unknown error"


def verify_execution(exercises, source_catalog, examples):
    starters_incomplete = []
    starters_match = []
    variant_count = 0
    for exercise in exercises:
        eid = exercise["id"]
        example = examples[eid]
        result = execute(exercise, example)
        expected = expected_stdout(example)
        if result.returncode == 0:
            if result.stdout.strip() == expected:
                starters_match.append(eid)
            else:
                starters_incomplete.append(f"{eid}: output mismatch")
        else:
            err = error_name(result.stderr)
            if err == "NotImplementedError" or err in ALLOWED_STARTER_ERRORS.get(eid, ()):
                starters_incomplete.append(f"{eid}: {err}")
            else:
                raise AssertionError(
                    f"{eid}: unexpected starter failure {err}\n{result.stderr.strip()}"
                )

        if source_catalog[eid] == CATALOGS[2]:
            variant_count += 1
            reference_path = REFERENCES / f"{eid}.py"
            assert reference_path.is_file(), f"{eid}: missing reference fixture"
            reference = execute(exercise, example, reference_path.read_text())
            assert reference.returncode == 0, (
                f"{eid}: reference execution failed\n{reference.stderr.strip()}"
            )
            assert reference.stdout.strip() == expected, (
                f"{eid}: expected {expected!r}, reference produced {reference.stdout.strip()!r}"
            )
    return starters_match, starters_incomplete, variant_count


def main():
    parser = argparse.ArgumentParser()
    parser.parse_args()
    exercises, source_catalog = load_catalogs()
    examples = json.loads(EXAMPLES.read_text())["examples"]
    validate_schema(exercises, examples)
    matches, incomplete, variants = verify_execution(exercises, source_catalog, examples)
    print(f"schema/coverage: {len(examples)}/{len(exercises)} examples valid")
    print(f"starter execution: {len(matches)} already match; {len(incomplete)} explicitly incomplete")
    for item in incomplete:
        print(f"  incomplete: {item}")
    print(f"variant references: {variants}/{variants} examples match exactly")
    print("original expectations: grounded in embedded tests; no private reference solutions available")


if __name__ == "__main__":
    main()
