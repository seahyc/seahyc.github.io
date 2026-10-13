import copy
import json
from collections import OrderedDict

import pytest

from codec import CodecError, Registry, decode, encode


class Node:
    def __init__(self, name, nxt=None):
        self.name = name
        self.nxt = nxt


class Pair:
    def __init__(self, x, y):
        self.x = x
        self.y = y


class Mystery:
    pass


class MyList(list):
    pass


def make_registry():
    registry = Registry()
    registry.register(Node, fields=["name", "nxt"])
    registry.register(Pair, fields=["x", "y"])
    return registry


def test_round_trip_all_supported_types():
    value = {
        "l": [1, 2.5, "s", None, True, False, -7],
        "t": (1, (2, 3), "x", ()),
        "s": {1, 2, 3},
        "f": frozenset({"a", "b"}),
        "b": b"\x00\xff abc",
        "d": {"k": {}, "e": []},
        "es": set(),
        "ef": frozenset(),
        "eb": b"",
    }
    out = decode(encode(value))
    assert out == value
    assert type(out["t"]) is tuple and type(out["t"][1]) is tuple and out["t"][3] == ()
    assert type(out["s"]) is set and type(out["f"]) is frozenset and type(out["es"]) is set and type(out["ef"]) is frozenset
    assert type(out["b"]) is bytes and type(out["l"][4]) is bool and type(out["l"][1]) is float
    for primitive in (None, True, 5, 2.5, "s", b"x", (), frozenset()):
        assert decode(encode(primitive)) == primitive


def test_wire_format_shape():
    assert encode([1, 2]) == {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [1, 2]}}}
    assert encode(5) == {"version": 2, "root": 5, "nodes": {}}
    assert encode(b"\x00\xff") == {"version": 2, "root": {"$bytes": "AP8="}, "nodes": {}}
    assert encode({"a": [1]}) == {
        "version": 2,
        "root": {"$ref": "0"},
        "nodes": {"0": {"type": "dict", "entries": {"a": {"$ref": "1"}}}, "1": {"type": "list", "items": [1]}},
    }
    assert encode((1, [2])) == {
        "version": 2,
        "root": {"$tuple": [1, {"$ref": "0"}]},
        "nodes": {"0": {"type": "list", "items": [2]}},
    }
    assert encode({2, 1})["nodes"] == {"0": {"type": "set", "items": [1, 2]}}
    assert encode(frozenset({2, 1}))["root"] == {"$frozenset": [1, 2]}
    reg = make_registry()
    assert encode(Pair(1, [2]), reg) == {
        "version": 2,
        "root": {"$ref": "0"},
        "nodes": {
            "0": {"type": "object", "class": "Pair", "fields": {"x": 1, "y": {"$ref": "1"}}},
            "1": {"type": "list", "items": [2]},
        },
    }
    assert json.loads(json.dumps(encode([(1, b"z", {2})]))) == encode([(1, b"z", {2})])


def test_shared_list_identity_preserved():
    shared = [1, 2]
    value = [shared, shared, {"k": shared}, {"k2": [shared]}]
    out = decode(encode(value))
    assert out[0] is out[1] is out[2]["k"] is out[3]["k2"][0]
    assert out[0] == [1, 2] and out[0] is not shared
    d = {"x": 1}
    out = decode(encode({"a": d, "b": [d]}))
    assert out["a"] is out["b"][0]
    other = decode(encode([[1], [1]]))
    assert other[0] == other[1] and other[0] is not other[1]
    s = {1, 2}
    out = decode(encode([s, s]))
    assert out[0] is out[1] and out[0] == {1, 2}


def test_self_cycles_in_list_and_dict():
    value = [1]
    value.append(value)
    out = decode(encode(value))
    assert out is not value and out[0] == 1 and out[1] is out
    d = {"name": "d"}
    d["me"] = d
    d["list"] = [d, {"back": d}]
    out = decode(encode(d))
    assert out["me"] is out and out["list"][0] is out and out["list"][1]["back"] is out
    a, b = {"n": "a"}, {"n": "b"}
    a["peer"], b["peer"] = b, a
    out = decode(encode([a, b]))
    assert out[0]["peer"] is out[1] and out[1]["peer"] is out[0]


def test_registered_objects_identity_and_cycle():
    reg = make_registry()
    a, b = Node("a"), Node("b")
    a.nxt, b.nxt = b, a
    shared = Pair(1, [2, 3])
    payload = {"ring": a, "again": a, "pair1": shared, "pair2": [shared], "list": shared.y}
    out = decode(encode(payload, reg), reg)
    assert type(out["ring"]) is Node and type(out["pair1"]) is Pair
    assert out["ring"] is out["again"] and out["ring"] is not a
    assert out["ring"].name == "a" and out["ring"].nxt.name == "b"
    assert out["ring"].nxt.nxt is out["ring"]
    assert out["pair1"] is out["pair2"][0] and out["pair1"] is not shared
    assert out["pair1"].y is out["list"] and out["list"] == [2, 3]
    assert vars(out["pair1"]) == {"x": 1, "y": [2, 3]}
    selfish = Node("me")
    selfish.nxt = selfish
    out = decode(encode(selfish, reg), reg)
    assert out.nxt is out and out is not selfish
    plain = decode(encode(Node("x", Pair((1, 2), {3})), reg), reg)
    assert plain.nxt.x == (1, 2) and plain.nxt.y == {3}


def test_cycle_through_tuple():
    inner = []
    t = (inner, "t")
    inner.append(t)
    out = decode(encode(inner))
    assert type(out[0]) is tuple and out[0][0] is out and out[0][1] == "t"
    reg = make_registry()
    n = Node("n")
    n.nxt = (n, [n])
    out = decode(encode(n, reg), reg)
    assert out.nxt[0] is out and out.nxt[1][0] is out


def test_tuple_holding_shared_mutables():
    shared = [0]
    value = (shared, shared, {"s": shared})
    out = decode(encode(value))
    assert out[0] is out[1] is out[2]["s"]
    assert type(out) is tuple


def test_set_order_is_deterministic():
    assert encode({"b", "a", "c"})["nodes"]["0"]["items"] == ["a", "b", "c"]
    mixed = {"x", 2, None, True, b"y", 1.5, "A"}
    assert encode(mixed)["nodes"]["0"]["items"] == [None, True, 1.5, 2, "A", "x", {"$bytes": "eQ=="}]
    forward, backward = set(), set()
    for i in range(60):
        forward.add(i * 7)
        backward.add((59 - i) * 7)
    assert forward == backward
    assert encode(forward) == encode(backward)
    assert encode(forward)["nodes"]["0"]["items"] == sorted(forward)
    f1 = frozenset(["q", "b", "m", "a"])
    f2 = frozenset(["a", "m", "b", "q"])
    assert encode([f1]) == encode([f2])
    assert encode(f1)["root"] == {"$frozenset": ["a", "b", "m", "q"]}
    assert decode(encode(mixed)) == mixed


def test_bytes_base64():
    for raw in (b"", b"\x00", b"\xff\xfe\xfd", bytes(range(256)), b"hello world"):
        doc = encode({"data": raw})
        text = json.dumps(doc)
        assert decode(json.loads(text))["data"] == raw
    assert encode(b"hello")["root"] == {"$bytes": "aGVsbG8="}
    assert decode({"version": 2, "root": {"$bytes": "aGVsbG8="}, "nodes": {}}) == b"hello"
    for bad in ("!!!", "aGVsbG8", "a", 5, None, ["aGVsbG8="]):
        with pytest.raises(CodecError):
            decode({"version": 2, "root": {"$bytes": bad}, "nodes": {}})


def test_unregistered_and_unsupported_rejected():
    reg = make_registry()
    with pytest.raises(CodecError, match="Mystery"):
        encode(Mystery(), reg)
    with pytest.raises(CodecError):
        encode([1, {"deep": [Mystery()]}], reg)
    with pytest.raises(CodecError):
        encode(Pair(Mystery(), 1), reg)
    with pytest.raises(CodecError):
        encode(Pair(1, 2))  # registered only in another registry
    with pytest.raises(CodecError):
        encode(Mystery())
    bads = [
        MyList([1]),
        OrderedDict(a=1),
        object(),
        len,
        1j,
        {1, (2, 3)},
        {frozenset({1})},
        frozenset({(1,)}),
        {1: "x"},
        {None: 1},
        float("nan"),
        float("inf"),
        [float("-inf")],
        {float("nan")},
        range(3),
        bytearray(b"x"),
    ]
    for bad in bads:
        with pytest.raises(CodecError):
            encode(bad, reg)


def test_registry_errors():
    reg = make_registry()
    with pytest.raises(CodecError):
        reg.register(Pair, fields=["x", "y"])  # class already registered

    class Other:
        pass

    with pytest.raises(CodecError):
        reg.register(Other, fields=[], name="Pair")  # name already used
    for bad_fields in ("xy", ["x", "x"], [1], None):
        with pytest.raises(CodecError):
            reg.register(Other, fields=bad_fields)
    reg.register(Other, fields=[], name="other-v1")
    assert encode(Other(), reg)["nodes"]["0"] == {"type": "object", "class": "other-v1", "fields": {}}
    assert type(decode(encode(Other(), reg), reg)) is Other
    broken = Node("n")
    del broken.nxt
    with pytest.raises(CodecError):
        encode(broken, reg)
    doc = encode(Pair(1, 2), reg)
    with pytest.raises(CodecError):
        decode(doc, Registry())
    with pytest.raises(CodecError):
        decode(doc)
    missing = copy.deepcopy(doc)
    del missing["nodes"]["0"]["fields"]["y"]
    with pytest.raises(CodecError):
        decode(missing, reg)
    extra = copy.deepcopy(doc)
    extra["nodes"]["0"]["fields"]["z"] = 3
    with pytest.raises(CodecError):
        decode(extra, reg)
    renamed = Registry()
    renamed.register(Pair, fields=["x", "y"], name="pt")
    out = decode(encode(Pair(4, 5), renamed), renamed)
    assert (out.x, out.y) == (4, 5)


V1_DOC = {
    "version": 1,
    "root": {"$ref": "0"},
    "nodes": {
        "0": {"type": "dict", "entries": {"a": {"$ref": "1"}, "b": {"$ref": "1"}, "self": {"$ref": "0"}, "n": None}},
        "1": {"type": "list", "items": [1, {"$ref": "1"}, "s", 2.5, True]},
    },
}


def test_decode_v1_upgrades():
    out = decode(copy.deepcopy(V1_DOC))
    assert out["a"] is out["b"]
    assert out["self"] is out
    assert out["a"][1] is out["a"]
    assert out["a"][0] == 1 and out["a"][2:] == ["s", 2.5, True] and out["n"] is None
    assert list(out) == ["a", "b", "self", "n"]
    again = encode(out)
    assert again["version"] == 2
    back = decode(again)
    assert back["a"] is back["b"] and back["self"] is back and back["a"][1] is back["a"]
    assert decode({"version": 1, "root": 5, "nodes": {}}) == 5
    assert decode({"version": 1, "root": None, "nodes": {}}) is None
    flat = decode({"version": 1, "root": {"$ref": "r"}, "nodes": {"r": {"type": "list", "items": []}}})
    assert flat == []
    shared = decode({"version": 1, "root": {"$ref": "x"}, "nodes": {
        "x": {"type": "list", "items": [{"$ref": "y"}, {"$ref": "y"}]},
        "y": {"type": "dict", "entries": {}},
    }})
    assert shared[0] is shared[1] and shared[0] == {}


def test_bad_documents_rejected():
    good = {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": []}}}
    assert decode(good) == []
    bads = [
        None,
        [],
        "doc",
        5,
        {},
        {"root": 1, "nodes": {}},
        {"version": 3, "root": 1, "nodes": {}},
        {"version": 0, "root": 1, "nodes": {}},
        {"version": "2", "root": 1, "nodes": {}},
        {"version": True, "root": 1, "nodes": {}},
        {"version": 2, "nodes": {}},
        {"version": 2, "root": 1},
        {"version": 2, "root": 1, "nodes": []},
        {"version": 2, "root": {"$ref": "missing"}, "nodes": {}},
        {"version": 2, "root": {"$ref": 0}, "nodes": {"0": {"type": "list", "items": []}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [{"$ref": "9"}]}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "blob"}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list"}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "dict", "entries": []}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [[1]]}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [{"$what": 1}]}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "list", "items": [{"$ref": "0", "x": 1}]}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "set", "items": [{"$tuple": []}]}}},
        {"version": 2, "root": {"$ref": "0"}, "nodes": {"0": {"type": "set", "items": [{"$ref": "0"}]}}},
        {"version": 2, "root": {"$tuple": "xy"}, "nodes": {}},
        {"version": 2, "root": {"$frozenset": [[1]]}, "nodes": {}},
        {"version": 1, "root": {"$bytes": "AA=="}, "nodes": {}},
        {"version": 1, "root": {"$tuple": []}, "nodes": {}},
        {"version": 1, "root": {"$ref": "0"}, "nodes": {"0": {"type": "set", "items": []}}},
        {"version": 1, "root": {"$ref": "0"}, "nodes": {"0": {"type": "object", "class": "Pair", "fields": {}}}},
        {"version": 1, "root": {"$ref": "q"}, "nodes": {}},
    ]
    reg = make_registry()
    for bad in bads:
        with pytest.raises(CodecError):
            decode(bad, reg)


def test_json_text_round_trip():
    reg = make_registry()
    a = Node("a")
    a.nxt = Pair(a, {"s": {1, 2}, "t": (b"\x01", [a])})
    value = {"head": a, "alias": a, "bag": [a.nxt]}
    text = json.dumps(encode(value, reg))
    out = decode(json.loads(text), reg)
    assert out["head"] is out["alias"] and out["bag"][0] is out["head"].nxt
    assert out["head"].nxt.x is out["head"]
    assert out["head"].nxt.y["s"] == {1, 2}
    assert out["head"].nxt.y["t"][0] == b"\x01" and out["head"].nxt.y["t"][1][0] is out["head"]
    assert json.dumps(encode(out, reg)) == text


def build_graph():
    shared = {"k": [1, 2]}
    reg = make_registry()
    n = Node("n", Pair({3, 1, 2}, (shared, frozenset({"b", "a"}))))
    return {"n": n, "s": shared, "l": [shared, b"b"]}, reg


def test_encode_deterministic_and_input_not_mutated():
    value, reg = build_graph()
    again, reg2 = build_graph()
    first = encode(value, reg)
    assert encode(value, reg) == first
    assert encode(again, reg2) == first
    assert json.dumps(encode(again, reg2)) == json.dumps(first)
    assert value["n"].nxt.x == {1, 2, 3} and value["s"] is value["l"][0]
    assert value["n"].nxt.y[0] is value["s"] and list(vars(value["n"])) == ["name", "nxt"]
    first["nodes"]["0"]["entries"].clear()
    assert encode(value, reg) == encode(again, reg2)
    assert value["s"] == {"k": [1, 2]}


def test_decode_handwritten_v2_with_arbitrary_ids():
    reg = make_registry()
    doc = {
        "version": 2,
        "root": {"$ref": "alpha"},
        "nodes": {
            "beta": {"type": "list", "items": [{"$ref": "alpha"}, {"$ref": "gamma"}, {"$tuple": [1, {"$ref": "beta"}]}]},
            "gamma": {"type": "object", "class": "Node", "fields": {"name": "g", "nxt": {"$ref": "delta"}}},
            "alpha": {"type": "dict", "entries": {"list": {"$ref": "beta"}, "obj": {"$ref": "gamma"}, "bytes": {"$bytes": "AAE="}, "fs": {"$frozenset": ["x", {"$bytes": "AA=="}]}}},
            "delta": {"type": "set", "items": [3, "z", {"$bytes": "AA=="}]},
        },
    }
    out = decode(doc, reg)
    assert list(out) == ["list", "obj", "bytes", "fs"]
    assert out["list"][0] is out and out["list"][1] is out["obj"]
    assert out["list"][2][1] is out["list"] and out["list"][2][0] == 1
    assert type(out["obj"]) is Node and out["obj"].name == "g" and out["obj"].nxt == {3, "z", b"\x00"}
    assert out["bytes"] == b"\x00\x01" and out["fs"] == frozenset({"x", b"\x00"})
    scalar = {"version": 2, "root": {"$ref": "only one"}, "nodes": {"only one": {"type": "list", "items": ["a"]}}}
    assert decode(scalar) == ["a"]


def test_decode_does_not_mutate_document():
    reg = make_registry()
    value, _ = build_graph()
    doc = encode(value, reg)
    before = copy.deepcopy(doc)
    decode(doc, reg)
    assert doc == before
    v1 = copy.deepcopy(V1_DOC)
    out = decode(v1)
    out["a"].append("more")
    assert v1 == V1_DOC


def test_dict_and_field_order_preserved():
    value = {"z": 1, "a": 2, "m": {"y": 1, "b": 2}}
    doc = encode(value)
    assert list(doc["nodes"]["0"]["entries"]) == ["z", "a", "m"]
    out = decode(json.loads(json.dumps(doc)))
    assert list(out) == ["z", "a", "m"] and list(out["m"]) == ["y", "b"]
    reg = Registry()
    reg.register(Pair, fields=["y", "x"])
    doc = encode(Pair(1, 2), reg)
    assert list(doc["nodes"]["0"]["fields"]) == ["y", "x"]


def test_deep_chain_without_recursion_error():
    value = current = []
    for _ in range(1500):
        nxt = []
        current.append(nxt)
        current = nxt
    current.append(value)
    doc = encode(value)
    assert len(doc["nodes"]) == 1501
    out = decode(doc)
    depth, node = 0, out
    while node and node[0] is not out:
        node, depth = node[0], depth + 1
    assert depth == 1500 and node[0] is out
    chain = {}
    cur = chain
    for _ in range(1500):
        cur["next"] = {}
        cur = cur["next"]
    out = decode(encode(chain))
    depth = 0
    while "next" in out:
        out, depth = out["next"], depth + 1
    assert depth == 1500
