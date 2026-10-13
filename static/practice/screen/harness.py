"""Grading harness for the Cognition Screen sprint.

Runs identically in Pyodide (the browser worker) and CPython (scripts/verify-screen.py).
Tests are pytest-style: module-level ``test_*`` functions using plain ``assert``,
``pytest.raises``, ``pytest.approx`` and ``pytest.mark.parametrize``. A small shim
stands in for pytest because the browser runtime has no pytest install.
"""

import ast
import contextlib
import importlib.util
import io
import math
import os
import re
import sys
import traceback
import types

MAX_DETAIL = 1500


# ---------------------------------------------------------------- pytest shim

class _Raises:
    def __init__(self, expected, match=None):
        self.expected, self.match, self.value = expected, match, None

    def __enter__(self):
        return self

    def __exit__(self, kind, value, tb):
        if kind is None:
            raise AssertionError(f"DID NOT RAISE {getattr(self.expected, '__name__', self.expected)}")
        if not issubclass(kind, self.expected):
            return False
        if self.match is not None and not re.search(self.match, str(value)):
            raise AssertionError(f"pattern {self.match!r} did not match {str(value)!r}")
        self.value = value
        return True


class _Approx:
    def __init__(self, expected, rel=1e-6, abs=1e-12):
        self.expected, self.rel, self.abs = expected, rel, abs

    def __eq__(self, other):
        if isinstance(self.expected, (list, tuple)):
            return len(other) == len(self.expected) and all(_Approx(e, self.rel, self.abs) == o for e, o in zip(self.expected, other))
        return math.isclose(other, self.expected, rel_tol=self.rel, abs_tol=self.abs)

    def __repr__(self):
        return f"approx({self.expected!r})"


def _parametrize(names, values):
    def mark(fn):
        fn.__dict__.setdefault("_params", []).append(([n.strip() for n in names.split(",")] if isinstance(names, str) else list(names), list(values)))
        return fn
    return mark


def install_pytest_shim():
    shim = types.ModuleType("pytest")
    shim.raises = lambda expected, match=None: _Raises(expected, match)
    shim.approx = _Approx
    shim.mark = types.SimpleNamespace(parametrize=_parametrize)
    shim.fail = lambda msg="": (_ for _ in ()).throw(AssertionError(msg))
    sys.modules["pytest"] = shim


# ---------------------------------------------------------------- collection

def _expand(fn):
    """Yield (name, kwargs) for a test function, expanding parametrize marks."""
    cases = [({}, "")]
    for names, values in reversed(fn.__dict__.get("_params", [])):
        nxt = []
        for kwargs, suffix in cases:
            for i, value in enumerate(values):
                row = value if len(names) > 1 else (value,)
                nxt.append(({**kwargs, **dict(zip(names, row))}, f"{suffix}[{i}]"))
        cases = nxt
    for kwargs, suffix in cases:
        yield fn.__name__ + suffix, kwargs


class StepLimit(BaseException):
    """Raised when a test exceeds its execution budget (an infinite loop, usually)."""


STEP_BUDGET = 1_000_000

# A runaway loop often builds a very deep chain (list inside list inside list...).
# Freeing a chain deeper than a few thousand levels overflows the WebAssembly stack and
# kills Pyodide, so aborted tests park their traceback (and everything it references)
# here instead. The grader discards the whole worker after a submission.
_GRAVEYARD = []


@contextlib.contextmanager
def budget(steps=STEP_BUDGET):
    """Count executed lines; abort the running test past the budget. Works in Pyodide (no signals)."""
    remaining = [steps]

    def tracer(frame, event, arg):
        if event == "line":
            remaining[0] -= 1
            if remaining[0] < 0:
                raise StepLimit(f"exceeded {steps:,} execution steps (infinite loop?)")
        return tracer

    previous = sys.gettrace()
    sys.settrace(tracer)
    try:
        yield
    finally:
        sys.settrace(previous)


def _fresh_module(name, path, source=None):
    spec = importlib.util.spec_from_file_location(name, path)
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    if source is None:
        spec.loader.exec_module(module)
    else:
        exec(compile(source, path, "exec"), module.__dict__)
    return module


def _purge(names):
    for name in list(sys.modules):
        if name in names:
            del sys.modules[name]


def run_test_file(path, label, project_modules):
    """Import a test file afresh and run every test. Returns a list of case dicts."""
    _purge(project_modules | {label})
    out = io.StringIO()
    cases = []
    try:
        with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out), budget():
            module = _fresh_module(label, path)
    except BaseException as error:
        if isinstance(error, (StepLimit, MemoryError, RecursionError)):
            _GRAVEYARD.append(error)
        return [{"name": f"{label}::<import>", "test": "<import>", "status": "error", "detail": traceback.format_exc(limit=4)[-MAX_DETAIL:]}]
    for attr, fn in list(vars(module).items()):
        if not attr.startswith("test") or not callable(fn) or isinstance(fn, type):
            continue
        for name, kwargs in _expand(fn):
            case = {"name": f"{label}::{name}", "test": name, "status": "pass", "detail": ""}
            try:
                with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out), budget():
                    fn(**kwargs)
            except AssertionError:
                case.update(status="fail", detail=traceback.format_exc(limit=4)[-MAX_DETAIL:])
            except BaseException as error:
                case.update(status="error", detail=traceback.format_exc(limit=4)[-MAX_DETAIL:])
                if isinstance(error, (StepLimit, MemoryError, RecursionError)):
                    _GRAVEYARD.append(error)
            cases.append(case)
            if len(cases) >= 200:
                return cases
    return cases


# ---------------------------------------------------------------- mutation

_CMP = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt, ast.Eq: ast.NotEq, ast.NotEq: ast.Eq,
        ast.Is: ast.IsNot, ast.IsNot: ast.Is, ast.In: ast.NotIn, ast.NotIn: ast.In}
_BIN = {ast.Add: ast.Sub, ast.Sub: ast.Add, ast.Mult: ast.FloorDiv, ast.FloorDiv: ast.Mult}


class _Sites(ast.NodeVisitor):
    def __init__(self):
        self.sites = []

    def generic_visit(self, node):
        kind = None
        if isinstance(node, ast.Compare) and type(node.ops[0]) in _CMP:
            kind = "compare"
        elif isinstance(node, ast.BinOp) and type(node.op) in _BIN:
            kind = "binop"
        elif isinstance(node, ast.BoolOp):
            kind = "boolop"
        elif isinstance(node, ast.UnaryOp) and isinstance(node.op, ast.Not):
            kind = "not"
        elif isinstance(node, ast.Constant) and type(node.value) is int and node.value in (0, 1):
            kind = "const"
        elif isinstance(node, ast.Raise):
            kind = "raise"
        elif isinstance(node, (ast.Break, ast.Continue)):
            kind = "loopctl"
        elif isinstance(node, ast.Assign) and isinstance(node.targets[0], ast.Subscript):
            kind = "store"
        elif isinstance(node, ast.Return) and node.value is not None and not (isinstance(node.value, ast.Constant) and node.value.value is None):
            kind = "return"
        if kind:
            self.sites.append((kind, node))
        super().generic_visit(node)


class _Apply(ast.NodeTransformer):
    def __init__(self, target):
        self.target = target

    def visit(self, node):
        if node is not self.target:
            return super().visit(node)
        if isinstance(node, ast.Compare):
            node.ops[0] = _CMP[type(node.ops[0])]()
        elif isinstance(node, ast.BinOp):
            node.op = _BIN[type(node.op)]()
        elif isinstance(node, ast.BoolOp):
            node.op = ast.Or() if isinstance(node.op, ast.And) else ast.And()
        elif isinstance(node, ast.UnaryOp):
            return node.operand
        elif isinstance(node, ast.Constant):
            node.value = 1 - node.value
        elif isinstance(node, ast.Return):
            node.value = ast.Constant(None)
        elif isinstance(node, (ast.Raise, ast.Break, ast.Continue, ast.Assign)):
            return ast.Pass()
        return node


def mutants(source, limit=40):
    """Deterministic first-order mutants of a source file: [(description, source)]."""
    try:
        tree = ast.parse(source)
    except SyntaxError:
        return []
    finder = _Sites()
    finder.visit(tree)
    count = len(finder.sites)
    chosen = range(count) if count <= limit else [int(i * count / limit) for i in range(limit)]  # spread evenly
    result = []
    for index in chosen:
        clone = ast.parse(source)
        clone_finder = _Sites()
        clone_finder.visit(clone)
        kind, target = clone_finder.sites[index]
        line = getattr(target, "lineno", 0)
        mutated = ast.fix_missing_locations(_Apply(target).visit(clone))
        try:
            text = ast.unparse(mutated)
        except Exception:
            continue
        result.append((f"line {line}: {kind}", text))
    return result


# ---------------------------------------------------------------- grading

def _status_ok(cases):
    return bool(cases) and all(c["status"] == "pass" for c in cases)


def grade(root, entry, visible, candidate, validators, max_mutants=40):
    """Grade a project rooted at ``root``.

    entry: path of the solution module relative to root (e.g. src/codec.py)
    visible / candidate / validators: test file paths relative to root (validators may be None)
    Mutation: mutate the candidate's own solution; a mutant that fails the hidden validators
    is a real bug, and the candidate's tests should catch it.
    """
    install_pytest_shim()
    os.chdir(root)
    src = os.path.join(root, "src")
    if src not in sys.path:
        sys.path.insert(0, src)
    project = {os.path.splitext(f)[0] for f in os.listdir(src) if f.endswith(".py")}
    report = {"visible": [], "candidate": [], "validators": [], "mutation": {"total": 0, "real": 0, "killed": 0, "survivors": []}, "output": ""}
    out = io.StringIO()
    with contextlib.redirect_stdout(out), contextlib.redirect_stderr(out):
        report["visible"] = run_test_file(os.path.join(root, visible), "visible_tests", project)
        if candidate and os.path.exists(os.path.join(root, candidate)):
            report["candidate"] = run_test_file(os.path.join(root, candidate), "candidate_tests", project)
        if validators:
            report["validators"] = run_test_file(os.path.join(root, validators), "validators", project)
    report["output"] = out.getvalue()[-20000:]
    if not (validators and candidate and _status_ok(report["candidate"]) and _status_ok(report["validators"])):
        return report  # mutation only measures tests that pass on a correct-enough solution
    entry_path = os.path.join(root, entry)
    original = open(entry_path).read()
    module_name = os.path.splitext(os.path.basename(entry))[0]
    for description, text in mutants(original, max_mutants):
        report["mutation"]["total"] += 1
        try:
            with open(entry_path, "w") as handle:
                handle.write(text)
            with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                hidden = run_test_file(os.path.join(root, validators), "validators", project)
                if _status_ok(hidden):
                    continue  # equivalent or invisible to the spec; not counted
                report["mutation"]["real"] += 1
                own = run_test_file(os.path.join(root, candidate), "candidate_tests", project)
            if _status_ok(own):
                report["mutation"]["survivors"].append(description)
            else:
                report["mutation"]["killed"] += 1
        finally:
            with open(entry_path, "w") as handle:
                handle.write(original)
            _purge(project | {module_name})
    return report
