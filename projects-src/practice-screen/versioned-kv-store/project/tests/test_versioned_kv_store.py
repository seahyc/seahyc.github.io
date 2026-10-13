import pytest

from versioned_kv_store import VersionedStore


def test_put_get_delete_history():
    store = VersionedStore()
    assert store.put("a", 1) == 1
    assert store.put("b", 2) == 2
    assert store.delete("a") == 3
    with pytest.raises(KeyError):
        store.get("a")
    assert store.history("a") == [
        {"version": 1, "deleted": False, "value": 1},
        {"version": 3, "deleted": True},
    ]


def test_get_at_version():
    store = VersionedStore()
    store.put("k", "old")
    store.put("k", "new")
    assert store.get("k", version=1) == "old"
    assert store.get("k") == "new"


def test_snapshot_is_point_in_time():
    store = VersionedStore()
    store.put("a", 1)
    first = store.snapshot()
    store.put("b", 2)
    assert first == {"a": 1}
    assert store.snapshot(1) == {"a": 1}
