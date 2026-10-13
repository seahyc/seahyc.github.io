# Identity-Preserving Deep Copy

An agent snapshots its working memory before a risky tool call so it can roll back.
Memory is a graph of Python `list` and `dict` objects. `copy.deepcopy` is banned in
this codebase (it copies arbitrary objects, which hid a bug last quarter), so write a
narrow, explicit copier.

## Task

Implement `clone(value)` in `src/graph_clone.py`.

- Supported values: `None`, `bool`, `int`, `float`, `str`, and `list` / `dict` containing them.
  Dictionary keys must be `str`.
- Every list and dict in the result is a **new** object; primitives may be returned as-is.
- **Identity is preserved:** if the same container appears twice in the input, the
  copy contains one shared copy of it, not two.
- **Cycles are preserved:** a list that contains itself clones to a list that contains itself.
- Dict insertion order is preserved.
- The input is never mutated.
- Anything else (tuples, sets, objects, non-string keys) raises `CloneError` (already
  defined) whose message names the path to the bad value, e.g. `root.items[2]` or `root["cfg"]`.

Do not use `copy`, `pickle`, `json` or `marshal`.

## Files

- `src/graph_clone.py`: your solution.
- `tests/test_graph_clone.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **25 minutes**.
