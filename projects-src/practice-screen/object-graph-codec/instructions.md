# Object Graph Codec

An agent runtime checkpoints its configuration graph to a JSON-compatible payload and
restores it later. Plain JSON loses object identity (two fields pointing at the same
list come back as two lists) and cannot represent cycles. Build a deterministic codec
that keeps both.

## Task

Implement `encode(value)` and `decode(payload)` in `src/object_graph_codec.py`.
`CodecError` (a `ValueError`) is already defined.

**Supported values**

- Primitives: `None`, `bool`, `int`, finite `float`, `str` (exact types; subclasses are unsupported).
- Containers: `list` and `dict` with `str` keys. They may be nested, shared, or cyclic.
- Everything else (tuple, set, bytes, custom objects, non-string keys, `nan`/`inf`) makes `encode` raise `CodecError`.

**Wire format** (the payload `encode` returns)

```python
{
    "version": 1,
    "root": {"$ref": "0"},
    "nodes": {
        "0": {"type": "dict", "items": {"left": {"$ref": "1"}}},
        "1": {"type": "list", "items": [1, 2, 3]},
    },
}
```

- Each distinct list or dict (by identity, not equality) gets one decimal-string ID.
- IDs are assigned in deterministic **depth-first encounter order**, starting at `"0"`.
  Dict traversal uses insertion order. A container gets its ID when first encountered,
  before its children.
- Every occurrence of a container, including the root, is exactly `{"$ref": "<id>"}`.
- A primitive is embedded directly. A primitive root gives `"root": <value>` and `"nodes": {}`.
- The payload must be JSON-compatible and `encode` must not mutate its input.

**`decode(payload)`**

- Returns a new graph. Identity and cycles are restored: a container referenced twice
  decodes to one object. Equal-but-distinct containers stay distinct.
- Validates strictly and raises `CodecError` (never `KeyError`, `TypeError`, or a crash) for:
  a payload that is not a dict with exactly the keys `version`, `root`, `nodes`; a
  `version` other than `1`; a node that is not exactly `{"type", "items"}`; a `type` other
  than `"list"` / `"dict"`; `items` of the wrong shape (list for list nodes, string-keyed
  dict for dict nodes); a wire value that is neither a supported primitive nor an exact
  `{"$ref": <str>}` object; a `$ref` that names no node (a dangling reference).
- Nodes unreachable from the root are allowed and ignored.
- The payload is never mutated and the result shares no containers with it.
- Must handle graphs nested 1500 levels deep and wide graphs without hitting Python's recursion limit.

Do not use `copy`, `pickle`, `json`, or `marshal` in your solution.

## Files

- `src/object_graph_codec.py`: your solution.
- `tests/test_object_graph_codec.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **75 minutes**.
