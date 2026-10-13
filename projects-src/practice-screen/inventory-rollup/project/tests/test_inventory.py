import pytest

from inventory import rollup


def test_simple_rollup():
    report = rollup([
        {"sku": "a", "warehouse": "east", "qty": 2},
        {"sku": "A", "warehouse": "west", "qty": "5"},
    ])
    assert report["accepted"] == 2
    assert report["totals"] == {"A": 7}
    assert report["by_warehouse"] == {"east": {"A": 2}, "west": {"A": 5}}
    assert report["rejected"] == []


def test_rejected_row_has_index_and_reason():
    report = rollup([{"sku": "a", "warehouse": "e", "qty": 1}, {"sku": "b", "warehouse": "e"}])
    assert report["rejected"] == [{"index": 1, "reason": "missing qty"}]


def test_bad_container_type():
    with pytest.raises(TypeError):
        rollup("not a list")
