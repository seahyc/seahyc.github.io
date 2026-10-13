import pytest

from refs import ResolveError, dump, resolve


def test_plain_document_unchanged():
    doc = {"a": [1, 2.5, None, True], "b": {"c": "x"}}
    assert resolve(doc) == doc


def test_shared_reference():
    out = resolve({"a": {"$id": "x", "n": 1}, "b": {"$ref": "x"}})
    assert out == {"a": {"n": 1}, "b": {"n": 1}}
    assert out["a"] is out["b"]


def test_dangling_ref():
    with pytest.raises(ResolveError):
        resolve({"a": {"$ref": "nope"}})
