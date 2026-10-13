from object_graph_codec import decode, encode


def test_primitive_root_round_trip():
    payload = encode(7)
    assert payload == {"version": 1, "root": 7, "nodes": {}}
    assert decode(payload) == 7


def test_wire_format_for_small_graph():
    shared = [1, 2]
    assert encode({"a": shared, "b": shared}) == {
        "version": 1,
        "root": {"$ref": "0"},
        "nodes": {
            "0": {"type": "dict", "items": {"a": {"$ref": "1"}, "b": {"$ref": "1"}}},
            "1": {"type": "list", "items": [1, 2]},
        },
    }


def test_shared_reference_restored():
    shared = [1]
    restored = decode(encode([shared, shared]))
    assert restored[0] is restored[1]
    assert restored[0] is not shared
