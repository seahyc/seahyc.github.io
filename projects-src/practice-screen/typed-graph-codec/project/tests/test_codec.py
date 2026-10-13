import json

import pytest

from codec import CodecError, Registry, decode, encode


class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y


def test_round_trip_basic_types():
    value = {"a": [1, 2.5, None, True], "t": (1, "x"), "s": {3, 1, 2}, "b": b"hi"}
    out = decode(encode(value))
    assert out == value and type(out["t"]) is tuple and type(out["s"]) is set


def test_shared_list_and_cycle():
    shared = [1]
    value = [shared, shared]
    value.append(value)
    out = decode(json.loads(json.dumps(encode(value))))
    assert out[0] is out[1] and out[2] is out


def test_registered_class_and_unregistered_error():
    reg = Registry()
    reg.register(Point, fields=["x", "y"])
    out = decode(encode(Point(1, [2]), reg), reg)
    assert (out.x, out.y) == (1, [2])
    with pytest.raises(CodecError):
        encode(Point(1, 2))
