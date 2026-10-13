# Reference Resolver

An agent framework stores its working state as JSON. To avoid duplicating big shared
objects and to allow cyclic structures (a task that points at its parent plan, which lists
the task), documents use **anchors** and **references**, in the spirit of JSON Schema's
`$id`/`$ref`. You own the decoder and its inverse.

## Document format

A document is any JSON-compatible value: `None`, `bool`, `int`, `float`, `str`, `list`, or
`dict` with `str` keys.

- A `dict` may carry an anchor: the key `"$id"` with a `str` value. The decoded dict is
  registered under that id and the `"$id"` key is **not** present in the output dict.
- `{"$ref": "<id>"}` (a dict whose **only** key is `"$ref"`, with a `str` value) is a pointer.
  It decodes to **the very same Python object** as the dict anchored with that id.
- Anchors can be declared after the reference that uses them (forward references), above it
  (references to an ancestor produce a cycle), or elsewhere in the tree (shared references).
  Anchors are only valid on dicts, so references only ever point at dicts.
- Ids are arbitrary strings, unique within a document.

```python
resolve({"a": {"$id": "x", "n": 1}, "b": {"$ref": "x"}})
# {"a": {"n": 1}, "b": <the same dict as result["a"]>}
```

## Task

Implement in `src/refs.py`:

### `resolve(doc)`

Return the decoded object graph. Every container in the result is new (the input is never
mutated and the output shares no container with it). Dict key order is preserved
(`"$id"` simply disappears). Must work for nesting over a thousand levels deep, so
don't rely on Python recursion. Raise `ResolveError` (already defined, a `ValueError`) for:

- a `$ref` to an id that is never declared;
- the same `$id` declared twice;
- a dict containing `"$ref"` together with any other key (including `"$id"`), or whose `"$ref"` value is not a `str`;
- a `"$id"` whose value is not a `str`;
- unsupported values (tuples, sets, objects) or non-`str` dict keys anywhere in the document.

### `dump(value)`

The inverse. `value` is a graph of `None`/`bool`/`int`/`float`/`str`/`list`/`dict` (`str` keys)
whose dicts may be shared or cyclic. Return a JSON-compatible document such that
`resolve(dump(value))` reproduces the graph, including which dicts are the same object.

- Assign an anchor **only** to dicts reachable through more than one reference (a dict that is
  the child of two slots, or that contains itself through a cycle, including the root). Dicts
  referenced once get no `"$id"`.
- Ids are `"1"`, `"2"`, ... in order of **first visit** in a depth-first, pre-order walk (lists in
  index order, dicts in insertion order). Only dicts that receive an id consume a number.
- The first time a shared dict is met it is written in full with `"$id"` as its first key; every
  later occurrence is written as `{"$ref": id}`.
- Lists cannot carry an anchor, so a list reachable twice (shared or cyclic) raises `ResolveError`.
  So do unsupported values, non-`str` keys, and any dict that already has a `"$id"` or `"$ref"` key.
- The input is never mutated; dumping must also handle deep nesting without recursion errors.

## Files

- `src/refs.py`: your solution.
- `tests/test_refs.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **60 minutes**.
