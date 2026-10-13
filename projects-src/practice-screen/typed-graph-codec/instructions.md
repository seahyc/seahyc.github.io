# Typed Graph Codec

Your agent runtime persists its state between runs as JSON. v1 of the codec only knew about
lists and dicts. The state now also contains tuples, sets, raw bytes, and instances of a few
application classes, and the same object is often referenced from several places (sometimes
from itself). Write codec v2. Old v1 snapshots on disk must still load.

## Supported values

| Python value | Identity preserved? | Notes |
|---|---|---|
| `None`, `bool`, `int`, `str`, finite `float` | n/a | exact `type()` match; `nan`/`inf` are rejected |
| `list`, `dict` (`str` keys) | yes | may be shared and cyclic |
| `set` | yes | elements are primitives or `bytes` only |
| `tuple`, `frozenset` | no | written inline; `frozenset` elements as for `set`. A tuple may hold mutable containers, so a cycle may pass through a tuple |
| `bytes` | no | base64 |
| instances of registered classes | yes | state is the registered `fields` |

Type checks are on the exact type: a subclass of `list`, an `OrderedDict`, an `IntEnum`
or an instance of an unregistered class is **unsupported** and raises `CodecError`.

## Task: `src/codec.py`

```python
registry = Registry()
registry.register(Point, fields=["x", "y"])          # optional name="pt"; default name is cls.__name__
doc = encode(value, registry)                         # JSON-compatible dict
value2 = decode(doc, registry)                        # works on json.loads(json.dumps(doc)) too
```

`registry` is optional in both functions (default: an empty `Registry`). `register` raises
`CodecError` if the class or the name is already registered, or if `fields` is not a
list/tuple of distinct `str`. Decoding an instance creates it with `cls.__new__(cls)` (no
`__init__` call), then sets the registered attributes. Encoding an object whose class lacks one
of its registered attributes raises `CodecError`.

### Wire format v2

```
{"version": 2, "root": <value>, "nodes": {"<id>": <node>, ...}}
```

`<value>` is one of: a primitive as itself; `{"$ref": "<id>"}`; `{"$bytes": "<base64>"}`;
`{"$tuple": [<value>, ...]}`; `{"$frozenset": [<element>, ...]}`, where `<element>` is a primitive or
`{"$bytes": ...}`. `<node>` is one of:

```
{"type": "list",   "items": [<value>, ...]}
{"type": "dict",   "entries": {"<key>": <value>, ...}}
{"type": "set",    "items": [<element>, ...]}
{"type": "object", "class": "<registered name>", "fields": {"<field>": <value>, ...}}
```

Every list, dict, set and registered object is a node, referenced through `$ref`. Ids are the
strings `"0"`, `"1"`, ... assigned in order of first encounter: the root first (if it is a node),
then nodes are expanded in id order, and each node's children are encountered left to right
(dict entries in insertion order, object fields in registered order). Example:

```python
encode([1, 2]) == {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [1, 2]}}}
```

Output must be deterministic. **Set order:** set and frozenset elements are written sorted by type
rank `None < bool < int/float < str < bytes`, then by natural order within a rank. Dict entries keep insertion order.

### `decode(doc, registry=None)`

- Accepts v2 and **v1**. v1 is the old format: `{"version": 1, "root": <value>, "nodes": {...}}`,
  where `<value>` is a primitive or `{"$ref": id}`, and nodes are only `{"type": "list", "items": [...]}`
  and `{"type": "dict", "entries": {...}}`. Decoding a v1 document yields the same kind of graph
  (shared references and cycles included); encoding it again produces v2.
- Ids in a document are arbitrary strings (do not assume `"0"`, `"1"`).
- Any malformed document raises `CodecError`: not a dict, missing/unsupported `version`, missing `root`
  or `nodes`, dangling `$ref`, unknown node type or object class, object `fields` that differ from the
  registered fields, bad base64, v2-only constructs inside a v1 document, any value of an unknown shape.
- The document is never mutated.

Both directions must handle chains of over a thousand nested lists/dicts without hitting the
recursion limit (nesting of *tuples* inside tuples may use ordinary recursion).

## Files

- `src/codec.py`: your solution (`CodecError` provided).
- `tests/test_codec.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **75 minutes**.
