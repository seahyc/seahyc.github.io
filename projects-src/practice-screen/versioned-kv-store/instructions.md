# Versioned Key/Value Store

A tool-driven workflow keeps its state in a key/value store and needs an audit trail:
what was the value of `config` before the third tool call, and when did `token` disappear?
Build an in-memory store where every successful mutation gets a **global version**, so
any earlier state can be read back.

## Task

Implement `VersionedStore` in `src/versioned_kv_store.py`:

```python
VersionedStore()
version            # property: the current global version (0 for an empty store)
put(key, value) -> int
delete(key) -> int
get(key, version=None)
history(key) -> list[dict]
snapshot(version=None) -> dict
```

**Versions**

- Versions are integers starting at 1 and shared by all keys. Every `put` and every
  successful `delete` creates exactly one new version and returns it. A `put` always
  creates a version, even when it stores a value equal to the current one.
- Reads never change the version. `store.version` is the latest version created, `0` when none.
- `delete(key)` on a key that is absent or already deleted raises `KeyError` and creates
  **no** version.

**Current reads**

- `get(key)` returns the current value; `KeyError` when the key was never set or is deleted.

**Reads at a version**

- `get(key, version=v)` returns what `get(key)` would have returned when the store was
  at version `v`: the value of the key's latest record with `record.version <= v`.
  `KeyError` if the key had no record yet at `v`, or its latest record then was a delete.
- `version=0` is the empty store. A `version` greater than `store.version` raises
  `ValueError` (the future is not readable). A negative version raises `ValueError`; a
  `version` that is not an `int` (`bool` counts as not an int) raises `TypeError`.

**History**

- `history(key)` lists every record of the key in ascending version order, including
  deletes (**tombstones**). A put record is `{"version": int, "deleted": False, "value": value}`;
  a delete record is exactly `{"version": int, "deleted": True}`.
- An unknown key has an empty history. The returned list and its record dicts are fresh
  copies: mutating them never affects the store.

**Snapshots**

- `snapshot(version=None)` returns a **new** `dict` mapping every live key to its value at
  that version (current when `None`), ordered by key ascending. Deleted keys are absent.
  Later mutations never change a snapshot already returned, and mutating a snapshot never
  changes the store. `snapshot(0)` is `{}`. Version validation is the same as for `get`.

**Values and keys**

- Values may be any object, including mutable ones; they are stored by reference (no
  copying) and returned as-is by `get` and `snapshot`.
- A non-`str` key raises `TypeError` from every method that takes a key.
- `get(key, version)` must not scan the whole history of the key: 4,000 records and
  4,000 lookups have to run well under a second.

## Files

- `src/versioned_kv_store.py`: your solution.
- `tests/test_versioned_kv_store.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **60 minutes**.
