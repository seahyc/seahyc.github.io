# Inventory Rollup

A warehouse-sync agent receives stock records scraped from several vendor feeds. The
feeds are dirty: SKUs differ in case, quantities arrive as strings, fields go missing.
Before the agent reasons about stock it needs one clean report, plus an explanation for
every row that was thrown away.

## Task

Implement `rollup(records)` in `src/inventory.py`.

`records` is a `list` or `tuple` of rows (anything else raises `TypeError`). A valid row is
a `dict` with:

- `sku`: a `str`. Normalised with `strip()` then `upper()`. Must not be empty afterwards.
- `warehouse`: a `str`. Normalised with `strip()` then `lower()`. Must not be empty afterwards.
- `qty`: an `int` (not `bool`), or a `str` holding an optionally signed base-10 integer
  (ASCII digits only, surrounding whitespace allowed, e.g. `"7"`, `" +3 "`, `"-2"`). Must be `>= 0`.
  `0` is valid. Floats, bools, other types, `""`, `"1.5"`, `"1_0"` are invalid.

Extra keys are ignored. Return a new dict:

```python
{
  "accepted": 3,                      # number of valid rows
  "totals": {"A1": 12, "B2": 4},      # sku -> total qty over all warehouses
  "by_warehouse": {"east": {"A1": 7, "B2": 4}, "west": {"A1": 5}},
  "rejected": [{"index": 4, "reason": "negative qty"}],
}
```

- `totals`, `by_warehouse` and each inner dict are ordered by key, ascending (plain string order).
  `rejected` is in input order. `index` is the row's position in `records`.
- Each invalid row produces exactly one rejection, with the **first** failing reason from this list,
  checked in this order, using these exact strings:
  1. `"not a dict"`: the row is not a `dict`
  2. `"missing sku"`: key absent, `None`, or blank after strip; `"invalid sku"`: present but not a `str`
  3. `"missing warehouse"` / `"invalid warehouse"`: same rules as sku
  4. `"missing qty"`: key absent or `None`; `"invalid qty"`: wrong type or unparsable;
     `"negative qty"`: parsed value below 0
- Invalid rows never contribute to totals. The input (rows included) is never mutated.
- The result depends only on the multiset of valid rows, not on their order.
- Empty input is valid: zero accepted, empty dicts, empty list.

Example:

```python
rollup([
  {"sku": " ab-1", "warehouse": "East", "qty": "3"},
  {"sku": "AB-1", "warehouse": "east ", "qty": 4},
  {"sku": "zz", "warehouse": "west", "qty": -1},
])
# {"accepted": 2, "totals": {"AB-1": 7}, "by_warehouse": {"east": {"AB-1": 7}},
#  "rejected": [{"index": 2, "reason": "negative qty"}]}
```

## Files

- `src/inventory.py`: your solution.
- `tests/test_inventory.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **20 minutes**.
