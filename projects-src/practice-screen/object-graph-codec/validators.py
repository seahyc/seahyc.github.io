import json
import time

import pytest

from object_graph_codec import CodecError, decode, encode


def ref(i):
    return {"$ref": str(i)}


def test_primitive_roots():
    for value in (None, True, False, 0, -7, 3.25, "hello", ""):
        payload = encode(value)
        assert payload == {"version": 1, "root": value, "nodes": {}}
        back = decode(payload)
        assert back == value and type(back) is type(value)


def test_wire_format_exact():
    payload = encode({"name": "n", "tags": ["x", None], "meta": {"k": 1.5}})
    assert payload == {
        "version": 1,
        "root": ref(0),
        "nodes": {
            "0": {"type": "dict", "items": {"name": "n", "tags": ref(1), "meta": ref(2)}},
            "1": {"type": "list", "items": ["x", None]},
            "2": {"type": "dict", "items": {"k": 1.5}},
        },
    }
    assert encode([]) == {"version": 1, "root": ref(0), "nodes": {"0": {"type": "list", "items": []}}}
    assert encode({}) == {"version": 1, "root": ref(0), "nodes": {"0": {"type": "dict", "items": {}}}}


def test_ids_follow_depth_first_encounter_order():
    # Breadth-first numbering would give "b" id 2 and the inner list id 3.
    value = {"a": {"x": [1]}, "b": []}
    nodes = encode(value)["nodes"]
    assert nodes["0"]["items"] == {"a": ref(1), "b": ref(3)}
    assert nodes["1"]["items"] == {"x": ref(2)}
    assert nodes["2"] == {"type": "list", "items": [1]}
    assert nodes["3"] == {"type": "list", "items": []}


def test_shared_identity_roundtrip():
    shared = [1, 2]
    leaf = {"k": 1}
    value = {"x": shared, "y": [shared, leaf], "z": {"again": leaf}}
    payload = encode(value)
    back = decode(payload)
    assert back == value
    assert back["x"] is back["y"][0]
    assert back["y"][1] is back["z"]["again"]
    assert back["x"] is not shared and back is not value
    # Each shared container appears once in nodes.
    assert len(payload["nodes"]) == 5


def test_self_and_mutual_cycles():
    value = [1]
    value.append(value)
    back = decode(encode(value))
    assert back[0] == 1 and back[1] is back and back is not value

    a, b = {"name": "a"}, {"name": "b"}
    a["peer"], b["peer"] = b, a
    back = decode(encode(a))
    assert back["peer"]["peer"] is back
    assert back["peer"] is not b and back["peer"]["name"] == "b"

    deep = {"list": []}
    deep["list"].append(deep)
    back = decode(encode([deep, deep["list"]]))
    assert back[0]["list"][0] is back[0]
    assert back[1] is back[0]["list"]


def test_cycle_wire_format():
    value = []
    value.append(value)
    assert encode(value) == {
        "version": 1,
        "root": ref(0),
        "nodes": {"0": {"type": "list", "items": [ref(0)]}},
    }
    a = {}
    a["me"] = a
    a["kid"] = [a]
    assert encode(a)["nodes"] == {
        "0": {"type": "dict", "items": {"me": ref(0), "kid": ref(1)}},
        "1": {"type": "list", "items": [ref(0)]},
    }


def test_equal_but_distinct_containers_not_merged():
    value = [[1], [1]]
    payload = encode(value)
    assert len(payload["nodes"]) == 3
    back = decode(payload)
    assert back == value and back[0] is not back[1]


def test_encode_rejects_unsupported_values():
    bad = [(1, 2), {1, 2}, b"x", object(), float("nan"), float("inf"), -float("inf"), 1 + 2j, range(2)]
    for item in bad:
        with pytest.raises(CodecError):
            encode(item)
        with pytest.raises(CodecError):
            encode([1, {"deep": [item]}])
    with pytest.raises(CodecError):
        encode({1: "x"})
    with pytest.raises(CodecError):
        encode([{"ok": {None: 1}}])
    with pytest.raises(CodecError):
        encode({("a", "b"): 1})


def good_payload():
    return {
        "version": 1,
        "root": ref(0),
        "nodes": {"0": {"type": "dict", "items": {"a": ref(1)}}, "1": {"type": "list", "items": [1]}},
    }


def test_decode_rejects_malformed_payloads():
    assert decode(good_payload()) == {"a": [1]}
    cases = []
    for junk in (None, [], "x", 5, ()):
        cases.append(junk)
    p = good_payload(); del p["version"]; cases.append(p)
    p = good_payload(); del p["nodes"]; cases.append(p)
    p = good_payload(); p["extra"] = 1; cases.append(p)
    p = good_payload(); p["version"] = 2; cases.append(p)
    p = good_payload(); p["version"] = "1"; cases.append(p)
    p = good_payload(); p["version"] = True; cases.append(p)
    p = good_payload(); p["nodes"] = []; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["type"] = "tuple"; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["type"] = "dict"; cases.append(p)
    p = good_payload(); p["nodes"]["0"]["items"] = [1]; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = {"a": 1}; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = None; cases.append(p)
    p = good_payload(); p["nodes"]["1"] = 5; cases.append(p)
    p = good_payload(); p["nodes"]["1"] = {"type": "list"}; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["extra"] = 0; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = [(1, 2)]; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = [float("nan")]; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = [{"plain": "dict"}]; cases.append(p)
    p = good_payload(); p["nodes"]["1"]["items"] = [{"$ref": "0", "extra": 1}]; cases.append(p)
    p = good_payload(); p["root"] = {"type": "list", "items": []}; cases.append(p)
    p = good_payload(); p["root"] = [1]; cases.append(p)
    for case in cases:
        with pytest.raises(CodecError):
            decode(case)


def test_decode_rejects_dangling_and_bad_refs():
    for bad_root in (ref(9), {"$ref": 0}, {"$ref": None}, {"$ref": "00"}, {"$ref": ""}):
        p = good_payload()
        p["root"] = bad_root
        with pytest.raises(CodecError):
            decode(p)
    for bad in (ref(7), {"$ref": 1}, {"$ref": ["1"]}):
        p = good_payload()
        p["nodes"]["1"]["items"] = [bad]
        with pytest.raises(CodecError):
            decode(p)
    p = good_payload()
    p["nodes"]["0"]["items"] = {"a": ref(5)}
    with pytest.raises(CodecError):
        decode(p)
    p = {"version": 1, "root": ref(0), "nodes": {}}
    with pytest.raises(CodecError):
        decode(p)


def test_inputs_not_mutated():
    shared = [1, {"k": 2}]
    value = {"a": shared, "b": shared, "c": "s"}
    value["self"] = value
    before = (list(value), list(shared), dict(shared[1]))
    encode(value)
    assert (list(value), list(shared), dict(shared[1])) == before
    assert value["a"] is value["b"] is shared and value["self"] is value

    payload = good_payload()
    snapshot = json.dumps(payload, sort_keys=True)
    decode(payload)
    assert json.dumps(payload, sort_keys=True) == snapshot


def test_decoded_graph_independent_of_payload():
    payload = good_payload()
    back = decode(payload)
    back["a"].append(2)
    back["extra"] = 1
    assert payload["nodes"]["1"]["items"] == [1]
    assert payload["nodes"]["0"]["items"] == {"a": ref(1)}
    assert decode(payload) == {"a": [1]}


def test_unreachable_nodes_allowed_and_ids_arbitrary():
    payload = {
        "version": 1,
        "root": {"$ref": "root"},
        "nodes": {
            "root": {"type": "list", "items": [{"$ref": "leaf"}, {"$ref": "leaf"}]},
            "leaf": {"type": "dict", "items": {}},
            "orphan": {"type": "list", "items": []},
        },
    }
    back = decode(payload)
    assert back == [{}, {}] and back[0] is back[1]


def test_payload_survives_json():
    value = {"s": "é\n", "n": [1, -2, 3.5, True, None], "d": {}}
    value["loop"] = value
    payload = json.loads(json.dumps(encode(value)))
    back = decode(payload)
    assert back["s"] == "é\n" and back["n"] == [1, -2, 3.5, True, None]
    assert back["loop"] is back
    assert type(back["n"][3]) is bool and type(back["n"][0]) is int


def test_scale_deep_and_wide():
    start = time.perf_counter()
    root = current = []
    for _ in range(1500):
        nxt = []
        current.append(nxt)
        current = nxt
    current.append(root)  # cycle back to the top
    payload = encode(root)
    assert len(payload["nodes"]) == 1501
    back = decode(payload)
    depth, node = 0, back
    while node and node[0] is not back:
        node, depth = node[0], depth + 1
    assert depth == 1500 and node[0] is back

    shared = {"s": 1}
    wide = [{"i": i, "shared": shared} for i in range(5000)]
    payload = encode(wide)
    assert len(payload["nodes"]) == 5002
    back = decode(payload)
    assert back == wide and back[0]["shared"] is back[4999]["shared"]
    assert time.perf_counter() - start < 1.0
