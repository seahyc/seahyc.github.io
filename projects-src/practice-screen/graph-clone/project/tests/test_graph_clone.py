from graph_clone import clone


def test_nested_round_trip():
    value = {"a": [1, 2, {"b": None}], "c": "x"}
    copied = clone(value)
    assert copied == value
    assert copied is not value


def test_shared_reference():
    shared = [1]
    copied = clone([shared, shared])
    assert copied[0] is copied[1]
    assert copied[0] is not shared
