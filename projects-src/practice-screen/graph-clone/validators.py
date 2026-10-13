import pytest

from graph_clone import CloneError, clone


def test_primitives_returned_unchanged():
    for value in (None, True, 0, -3, 2.5, "s", ""):
        assert clone(value) == value and type(clone(value)) is type(value)


def test_nested_copy_is_independent():
    value = {"a": [1, {"b": [2]}]}
    copied = clone(value)
    copied["a"][1]["b"].append(3)
    assert value == {"a": [1, {"b": [2]}]}
    assert copied["a"] is not value["a"]


def test_shared_list_stays_shared():
    shared = [1, 2]
    copied = clone({"x": shared, "y": [shared]})
    assert copied["x"] is copied["y"][0]
    assert copied["x"] is not shared


def test_self_cycle():
    value = [1]
    value.append(value)
    copied = clone(value)
    assert copied[1] is copied and copied is not value


def test_mutual_cycle_through_dicts():
    a, b = {"name": "a"}, {"name": "b"}
    a["peer"], b["peer"] = b, a
    copied = clone(a)
    assert copied["peer"]["peer"] is copied
    assert copied["peer"] is not b


def test_alias_inside_list_and_dict():
    leaf = {"k": 1}
    copied = clone([leaf, {"again": leaf}, [leaf]])
    assert copied[0] is copied[1]["again"] is copied[2][0]


def test_tuple_rejected_with_path():
    with pytest.raises(CloneError) as info:
        clone({"items": [1, 2, (3,)]})
    assert "items" in str(info.value) and "2" in str(info.value)


def test_non_string_key_rejected():
    with pytest.raises(CloneError):
        clone({1: "x"})
    with pytest.raises(CloneError):
        clone([{"ok": {None: 1}}])


def test_input_not_mutated():
    shared = [1]
    value = {"a": shared, "b": shared}
    before = repr(value)
    clone(value)
    assert repr(value) == before and value["a"] is value["b"]


def test_deep_nesting_without_recursion_error():
    value = current = []
    for _ in range(1500):
        nxt = []
        current.append(nxt)
        current = nxt
    copied = clone(value)
    depth, node = 0, copied
    while node:
        node, depth = node[0], depth + 1
    assert depth == 1500


def test_dict_order_preserved():
    value = {"z": 1, "a": 2, "m": [3]}
    assert list(clone(value)) == ["z", "a", "m"]
