import copy

import pytest

from inventory import rollup


def row(sku, wh, qty):
    return {"sku": sku, "warehouse": wh, "qty": qty}


def test_clean_rows_aggregate():
    report = rollup([row("X1", "north", 3), row("X2", "north", 4), row("X1", "south", 10)])
    assert report == {
        "accepted": 3,
        "totals": {"X1": 13, "X2": 4},
        "by_warehouse": {"north": {"X1": 3, "X2": 4}, "south": {"X1": 10}},
        "rejected": [],
    }


def test_sku_case_and_whitespace_merge():
    report = rollup([row(" ab-1", "w", 1), row("AB-1", "w", 2), row("aB-1 ", "w", 3), row("ab-2", "w", 1)])
    assert report["totals"] == {"AB-1": 6, "AB-2": 1}
    assert report["by_warehouse"] == {"w": {"AB-1": 6, "AB-2": 1}}


def test_warehouse_case_and_whitespace_merge():
    report = rollup([row("a", "East", 1), row("a", " east", 2), row("a", "EAST ", 4)])
    assert report["by_warehouse"] == {"east": {"A": 7}}
    assert report["totals"] == {"A": 7}


def test_string_quantities_parsed():
    report = rollup([row("a", "w", "5"), row("a", "w", " 7 "), row("a", "w", "+3"), row("b", "w", "0")])
    assert report["accepted"] == 4
    assert report["totals"] == {"A": 15, "B": 0}
    assert all(type(v) is int for v in report["totals"].values())


def test_missing_or_blank_fields_rejected():
    report = rollup([
        {"warehouse": "w", "qty": 1},
        {"sku": None, "warehouse": "w", "qty": 1},
        {"sku": "   ", "warehouse": "w", "qty": 1},
        {"sku": "a", "qty": 1},
        {"sku": "a", "warehouse": "", "qty": 1},
        {"sku": "a", "warehouse": "w"},
        {"sku": "a", "warehouse": "w", "qty": None},
    ])
    assert report["accepted"] == 0
    assert report["totals"] == {} and report["by_warehouse"] == {}
    assert [r["reason"] for r in report["rejected"]] == [
        "missing sku", "missing sku", "missing sku", "missing warehouse", "missing warehouse", "missing qty", "missing qty",
    ]


def test_invalid_quantity_types():
    bad = [2.5, True, False, "1.5", "abc", "", "  ", "1_0", "١", [], {}, "--1", "+", "1e3"]
    report = rollup([row("a", "w", q) for q in bad])
    assert report["accepted"] == 0
    assert [r["reason"] for r in report["rejected"]] == ["invalid qty"] * len(bad)
    assert [r["index"] for r in report["rejected"]] == list(range(len(bad)))


def test_negative_quantity_rejected_zero_kept():
    report = rollup([row("a", "w", -1), row("a", "w", "-4"), row("a", "w", 0), row("b", "w", "-0")])
    assert [r["reason"] for r in report["rejected"]] == ["negative qty", "negative qty"]
    assert report["totals"] == {"A": 0, "B": 0}
    assert report["accepted"] == 2


def test_non_dict_rows_and_bad_input():
    report = rollup(["x", None, 5, [1], row("a", "w", 1)])
    assert report["accepted"] == 1
    assert report["rejected"] == [{"index": i, "reason": "not a dict"} for i in range(4)]
    assert rollup((row("a", "w", 1),))["totals"] == {"A": 1}
    for bad in (None, "abc", {"sku": "a"}, 7, iter([])):
        with pytest.raises(TypeError):
            rollup(bad)


def test_rejected_keeps_input_order_and_index():
    rows = [row("a", "w", 1), row("", "w", 1), row("a", "w", 1), row("a", "w", "x"), row("b", "w", 2), row("c", "w", -1)]
    report = rollup(rows)
    assert report["rejected"] == [
        {"index": 1, "reason": "missing sku"},
        {"index": 3, "reason": "invalid qty"},
        {"index": 5, "reason": "negative qty"},
    ]
    assert report["accepted"] == 3


def test_output_key_order_sorted():
    report = rollup([row("b", "west", 1), row("C", "East", 1), row("a", "west", 1), row("a", "east", 1), row("B", "east", 1)])
    assert list(report["totals"]) == ["A", "B", "C"]
    assert list(report["by_warehouse"]) == ["east", "west"]
    assert list(report["by_warehouse"]["east"]) == ["A", "B", "C"]
    assert list(report["by_warehouse"]["west"]) == ["A", "B"]


def test_empty_and_all_rejected():
    assert rollup([]) == {"accepted": 0, "totals": {}, "by_warehouse": {}, "rejected": []}
    assert rollup(()) == {"accepted": 0, "totals": {}, "by_warehouse": {}, "rejected": []}
    report = rollup([{}])
    assert report == {"accepted": 0, "totals": {}, "by_warehouse": {}, "rejected": [{"index": 0, "reason": "missing sku"}]}


def test_input_not_mutated():
    rows = [row(" a ", "East", "3"), {"sku": "b"}, "junk", row("a", "w", 2)]
    before = copy.deepcopy(rows)
    report = rollup(rows)
    assert rows == before
    report["totals"]["A"] = -1
    report["rejected"].clear()
    assert rows == before


def test_result_independent_of_row_order():
    rows = [row("a", "e", 1), row("b", "w", "2"), row("A", "E", 3), row("c", "e", 4), row("b", "e", 5)]
    expected = rollup(rows)
    for shift in range(1, len(rows)):
        rotated = rows[shift:] + rows[:shift]
        report = rollup(rotated)
        assert report["totals"] == expected["totals"]
        assert list(report["totals"]) == list(expected["totals"])
        assert report["by_warehouse"] == expected["by_warehouse"]
        assert list(report["by_warehouse"]) == list(expected["by_warehouse"])
        assert report["accepted"] == expected["accepted"]
    assert rollup(rows) == expected


def test_reason_precedence():
    assert rollup([{}])["rejected"][0]["reason"] == "missing sku"
    assert rollup([{"sku": 5, "warehouse": None, "qty": "x"}])["rejected"][0]["reason"] == "invalid sku"
    assert rollup([{"sku": "a", "warehouse": 3, "qty": None}])["rejected"][0]["reason"] == "invalid warehouse"
    assert rollup([{"sku": "a", "warehouse": " ", "qty": -1}])["rejected"][0]["reason"] == "missing warehouse"
    assert rollup([{"sku": "a", "warehouse": "w", "qty": "q"}])["rejected"][0]["reason"] == "invalid qty"


def test_scale_many_rows():
    rows = [row(f"sku{i % 50}", f"wh{i % 7}", str(i % 13)) for i in range(5000)]
    rows += [{"sku": "bad"}] * 100
    report = rollup(rows)
    assert report["accepted"] == 5000
    assert len(report["rejected"]) == 100
    assert len(report["totals"]) == 50
    assert sum(report["totals"].values()) == sum(i % 13 for i in range(5000))
    assert list(report["totals"]) == sorted(report["totals"])
