import pytest

from build_order import CycleError, build_order


def test_diamond_order():
    deps = {"d": ["b", "c"], "b": ["a"], "c": ["a"], "a": []}
    assert build_order(deps) == ["a", "b", "c", "d"]


def test_dependency_only_node_is_included():
    assert build_order({"app": ["lib"]}) == ["lib", "app"]


def test_cycle_reports_path():
    with pytest.raises(CycleError) as info:
        build_order({"a": ["b"], "b": ["a"]})
    assert info.value.cycle == ["a", "b", "a"]
