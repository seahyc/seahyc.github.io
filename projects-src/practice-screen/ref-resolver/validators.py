import copy
import json

import pytest

from refs import ResolveError, dump, resolve


def test_primitives_and_plain_tree():
    for value in (None, True, 3, -1.5, "s", "", [], {}):
        assert resolve(value) == value
    doc = {"z": [1, {"y": None}, [2, [3]]], "a": {"b": {}}, "m": "q"}
    out = resolve(doc)
    assert out == doc and list(out) == ["z", "a", "m"]
    assert out is not doc and out["z"] is not doc["z"] and out["a"]["b"] is not doc["a"]["b"]


def test_id_key_removed_from_output():
    out = resolve({"$id": "root", "k": 1, "child": {"$id": "c", "v": [1]}})
    assert out == {"k": 1, "child": {"v": [1]}}
    assert list(out) == ["k", "child"]
    assert "$id" not in out and "$id" not in out["child"]


def test_shared_reference_is_same_object():
    out = resolve({"a": {"$id": "shared", "n": 1}, "b": {"$ref": "shared"}, "c": [{"$ref": "shared"}]})
    assert out["a"] == {"n": 1}
    assert out["b"] is out["a"]
    assert out["c"][0] is out["a"]
    out["a"]["n"] = 2
    assert out["b"]["n"] == 2


def test_forward_reference():
    out = resolve({"first": {"$ref": "later"}, "second": {"x": [{"$id": "later", "v": 9}]}})
    assert out["first"] is out["second"]["x"][0]
    assert out["first"] == {"v": 9}


def test_cycle_to_ancestor():
    out = resolve({"$id": "plan", "name": "p", "tasks": [{"title": "t", "plan": {"$ref": "plan"}}]})
    assert out["tasks"][0]["plan"] is out
    mid = resolve({"top": {"$id": "a", "kids": [{"$id": "b", "up": {"$ref": "a"}, "down": []}]}})
    assert mid["top"]["kids"][0]["up"] is mid["top"]


def test_self_reference_and_root_cycle():
    out = resolve({"$id": "me", "me": {"$ref": "me"}})
    assert out["me"] is out and list(out) == ["me"]
    a = resolve({"p": {"$id": "p", "self": {"$ref": "p"}}, "q": {"$ref": "p"}})
    assert a["p"]["self"] is a["p"] and a["q"] is a["p"]


def test_refs_inside_lists():
    out = resolve([{"$id": "o", "v": 1}, {"$ref": "o"}, [{"$ref": "o"}, 5], {"$ref": "o"}])
    assert out[0] is out[1] is out[2][0] is out[3]
    assert out[2][1] == 5 and len(out) == 4


def test_dangling_ref_rejected():
    for doc in ({"$ref": "x"}, {"a": {"$ref": "x"}}, [{"$ref": "x"}], {"$id": "y", "a": {"$ref": "Y"}}):
        with pytest.raises(ResolveError, match="x|Y"):
            resolve(doc)


def test_duplicate_id_rejected():
    with pytest.raises(ResolveError, match="dup"):
        resolve([{"$id": "dup"}, {"$id": "dup"}])
    with pytest.raises(ResolveError, match="dup"):
        resolve({"$id": "dup", "inner": {"$id": "dup"}})
    assert resolve([{"$id": "a"}, {"$id": "b"}]) == [{}, {}]


def test_ref_with_extra_keys_rejected():
    for doc in ({"$id": "a", "x": {"$ref": "a", "extra": 1}}, {"$id": "a", "x": {"$ref": "a", "$id": "b"}}, {"$ref": "a", "n": None}):
        with pytest.raises(ResolveError):
            resolve(doc)


def test_non_string_id_and_ref_rejected():
    for doc in ({"$id": 1}, {"$id": None}, {"$id": ["a"]}, {"$id": "a", "x": {"$ref": 1}}, {"$id": "a", "x": {"$ref": None}}, [{"$ref": ["a"]}]):
        with pytest.raises(ResolveError):
            resolve(doc)
    for doc in ((1, 2), {"a": {1, 2}}, {1: "x"}, [object()], {"k": ({},)}):
        with pytest.raises(ResolveError):
            resolve(doc)


def test_resolve_does_not_mutate_input():
    doc = {"$id": "r", "a": {"$id": "x", "n": [1]}, "b": {"$ref": "x"}, "c": {"$ref": "r"}}
    before = copy.deepcopy(doc)
    out = resolve(doc)
    assert doc == before
    out["a"]["n"].append(2)
    assert doc == before
    assert out["a"]["n"] is not doc["a"]["n"]


def test_resolve_deep_nesting():
    doc = leaf = {"$id": "top"}
    for _ in range(1500):
        nxt = {}
        leaf["child"] = nxt
        leaf = nxt
    leaf["back"] = {"$ref": "top"}
    out = resolve(doc)
    node, depth = out, 0
    while "child" in node:
        node, depth = node["child"], depth + 1
    assert depth == 1500 and node["back"] is out
    nested = []
    cur = nested
    for _ in range(1500):
        nxt = []
        cur.append(nxt)
        cur = nxt
    assert resolve(nested) == nested


def test_dump_ids_only_for_shared_dicts():
    shared = {"v": 1}
    solo = {"w": 2}
    out = dump({"a": shared, "b": solo, "c": [shared]})
    assert out == {"a": {"$id": "1", "v": 1}, "b": {"w": 2}, "c": [{"$ref": "1"}]}
    assert dump({"x": {"y": 1}}) == {"x": {"y": 1}}
    assert dump([1, "a", None, [2]]) == [1, "a", None, [2]]
    assert dump(5) == 5


def test_dump_ids_in_dfs_order_deterministic():
    p, q, r = {"n": "p"}, {"n": "q"}, {"n": "r"}
    inner = {"q": q, "r": r, "again_q": q}
    value = {"first": [r, {"nest": inner}], "p1": p, "p2": p, "q2": q, "r2": r}
    expected = {
        "first": [
            {"$id": "1", "n": "r"},
            {"nest": {"q": {"$id": "2", "n": "q"}, "r": {"$ref": "1"}, "again_q": {"$ref": "2"}}},
        ],
        "p1": {"$id": "3", "n": "p"},
        "p2": {"$ref": "3"},
        "q2": {"$ref": "2"},
        "r2": {"$ref": "1"},
    }
    out = dump(value)
    assert out == expected
    assert list(out["p1"]) == ["$id", "n"]
    assert dump(value) == out and json.dumps(dump(value)) == json.dumps(out)


def test_dump_cycle():
    root = {"name": "root"}
    root["self"] = root
    assert dump(root) == {"$id": "1", "name": "root", "self": {"$ref": "1"}}
    a, b = {"n": "a"}, {"n": "b"}
    a["b"], b["a"] = b, a
    assert dump([a]) == [{"$id": "1", "n": "a", "b": {"n": "b", "a": {"$ref": "1"}}}]
    out = dump([b, a])
    assert out == [{"$id": "1", "n": "b", "a": {"$id": "2", "n": "a", "b": {"$ref": "1"}}}, {"$ref": "2"}]


def test_round_trip_preserves_identity():
    shared = {"s": [1, 2]}
    loop = {"label": "loop"}
    loop["me"] = loop
    loop["shared"] = shared
    value = {"x": shared, "y": [shared, loop], "loop": loop, "z": {"deep": {"deeper": loop}}, "n": None}
    back = resolve(dump(value))
    assert back["x"] is back["y"][0]
    assert back["y"][1] is back["loop"] is back["z"]["deep"]["deeper"]
    assert back["loop"]["me"] is back["loop"]
    assert back["loop"]["shared"] is back["x"]
    assert back["x"] == {"s": [1, 2]} and back["n"] is None
    assert back is not value and back["x"] is not shared
    tree = {"a": [1, {"b": "c"}], "d": {}}
    assert resolve(dump(tree)) == tree


def test_dump_rejects_unsupported():
    shared_list = [1]
    cycle = []
    cycle.append(cycle)
    bads = [
        (1, 2),
        {"a": (1,)},
        {"a": {1, 2}},
        {1: "x"},
        [object()],
        {"a": shared_list, "b": shared_list},
        cycle,
        {"$id": "x"},
        {"a": {"$ref": "x"}},
    ]
    for bad in bads:
        with pytest.raises(ResolveError):
            dump(bad)


def test_dump_does_not_mutate_and_is_json():
    shared = {"k": [1]}
    value = {"a": shared, "b": shared, "c": {"d": 1.5}}
    before = repr(value)
    out = dump(value)
    assert repr(value) == before and value["a"] is value["b"]
    assert json.loads(json.dumps(out)) == out
    out["a"]["k"].append(2)
    assert shared == {"k": [1]}


def test_dump_deep_nesting():
    root = node = {}
    for _ in range(1500):
        nxt = {}
        node["n"] = nxt
        node = nxt
    node["root"] = root
    out = dump(root)
    assert out["$id"] == "1"
    depth, cur = 0, out
    while "n" in cur:
        cur, depth = cur["n"], depth + 1
    assert depth == 1500 and cur == {"root": {"$ref": "1"}}
    back = resolve(out)
    cur = back
    while "n" in cur:
        cur = cur["n"]
    assert cur["root"] is back
