# Build Order and Cycle Path

A build scheduler gets a dependency graph and must emit one linear build order, or
explain why none exists. The explanation matters: "there is a cycle" is not enough to
fix a monorepo, so the error names the cycle.

## Task

Implement `build_order(deps)` in `src/build_order.py`. `CycleError` (a `ValueError`) is
already defined with a `cycle` attribute you must fill in.

`deps` maps each node name (`str`) to the list (or tuple) of node names it depends on.
A node that appears only inside a dependency list is still a real node with no
dependencies of its own.

**Order**

- Return a `list` of **every** node (keys and dependency-only nodes), each exactly once.
- Every node appears after all of its dependencies.
- **Deterministic tie-break:** whenever several nodes are ready at the same moment (all
  their dependencies are already placed), place the alphabetically smallest first. This
  is a rule about the ready set at each step, not a global sort.
  `{"d": ["a"], "b": [], "c": [], "a": []}` gives `["a", "b", "c", "d"]`, and
  `{"z": [], "a": ["z"], "b": []}` gives `["b", "z", "a"]`.
- Duplicate dependencies (`"a": ["b", "b"]`) are harmless.
- The result does not depend on dict key order or dependency-list order.

**Cycles**

- If no order exists (including a self-dependency), raise `CycleError`.
- `error.cycle` is a list of node names that starts and ends with the same node, where
  each node depends on the next one: `["a", "b", "c", "a"]` means `a` depends on `b`,
  `b` on `c`, `c` on `a`. A self-dependency is `["a", "a"]`.
- Rotate the cycle so it starts at its alphabetically smallest node. Nodes that merely
  depend on a cycle are not part of it. If the graph holds several cycles, report any
  one valid cycle.
- `str(error)` must contain the path joined with `" -> "`, e.g. `a -> b -> c -> a`.

**Input errors**

- `deps` that is not a `dict`, a non-`str` node name (key or dependency), or a
  dependency collection that is not a list or tuple (a bare string `"b"` is a classic
  slip) raises `TypeError`.
- The input is never mutated.
- 8,000 nodes must run well under a second. Avoid recursion; chains can be thousands deep.

## Files

- `src/build_order.py`: your solution.
- `tests/test_build_order.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **60 minutes**.
