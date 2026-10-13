import time

import pytest

from versioned_kv_store import VersionedStore


def sample():
    """v1 a=1, v2 b=2, v3 a=10, v4 delete a, v5 c=3, v6 a=100, v7 delete b."""
    store = VersionedStore()
    store.put("a", 1)
    store.put("b", 2)
    store.put("a", 10)
    store.delete("a")
    store.put("c", 3)
    store.put("a", 100)
    store.delete("b")
    return store


def test_versions_increase_across_keys():
    store = VersionedStore()
    assert store.version == 0
    assert store.put("a", 1) == 1
    assert store.put("b", 1) == 2
    assert store.put("a", 1) == 3  # an equal value still creates a version
    assert store.delete("b") == 4
    assert store.put("b", 5) == 5
    assert store.version == 5


def test_get_current_and_missing():
    store = VersionedStore()
    with pytest.raises(KeyError):
        store.get("x")
    store.put("x", None)
    assert store.get("x") is None  # None is a value, not absence
    store.put("y", 0)
    assert store.get("y") == 0
    with pytest.raises(KeyError):
        store.get("z")


def test_delete_is_a_tombstone_in_history():
    store = sample()
    assert store.history("a") == [
        {"version": 1, "deleted": False, "value": 1},
        {"version": 3, "deleted": False, "value": 10},
        {"version": 4, "deleted": True},
        {"version": 6, "deleted": False, "value": 100},
    ]
    assert store.history("b") == [
        {"version": 2, "deleted": False, "value": 2},
        {"version": 7, "deleted": True},
    ]
    assert set(store.history("b")[1]) == {"version", "deleted"}
    with pytest.raises(KeyError):
        store.get("b")


def test_delete_of_absent_or_deleted_key_creates_no_version():
    store = VersionedStore()
    with pytest.raises(KeyError):
        store.delete("never")
    assert store.version == 0
    store.put("k", 1)
    assert store.delete("k") == 2
    with pytest.raises(KeyError):
        store.delete("k")
    assert store.version == 2
    assert store.put("other", 1) == 3  # no gap was left by the failed deletes
    assert [r["version"] for r in store.history("k")] == [1, 2]
    assert store.history("never") == []


def test_reads_do_not_advance_version():
    store = sample()
    before = store.version
    store.get("c")
    store.get("c", 5)
    store.history("a")
    store.snapshot()
    store.snapshot(3)
    with pytest.raises(KeyError):
        store.get("zzz")
    assert store.version == before == 7
    assert store.put("d", 1) == 8


def test_get_at_version_returns_value_as_of_then():
    store = sample()
    assert store.get("a", 1) == 1
    assert store.get("a", 2) == 1
    assert store.get("a", 3) == 10
    assert store.get("a", 6) == 100
    assert store.get("a", 7) == 100
    assert store.get("b", 2) == 2
    assert store.get("b", 6) == 2
    assert store.get("a") == 100 == store.get("a", store.version)
    assert store.get("c", 5) == 3 and store.get("c", 7) == 3
    # A value later overwritten is still readable at the time it was current.
    store.put("a", 1000)
    assert store.get("a", 7) == 100 and store.get("a", 8) == 1000


def test_get_at_version_sees_tombstones_and_absence():
    store = sample()
    with pytest.raises(KeyError):
        store.get("a", 4)  # deleted at version 4
    with pytest.raises(KeyError):
        store.get("a", 5)  # still deleted
    with pytest.raises(KeyError):
        store.get("b", 1)  # not yet created
    with pytest.raises(KeyError):
        store.get("b", 7)  # tombstone
    with pytest.raises(KeyError):
        store.get("c", 4)
    with pytest.raises(KeyError):
        store.get("nope", 3)


def test_get_at_version_boundaries_and_validation():
    store = sample()
    with pytest.raises(KeyError):
        store.get("a", 0)
    assert store.get("a", 1) == 1  # exactly the record's own version
    assert store.get("a", 7) == 100
    with pytest.raises(ValueError):
        store.get("a", 8)
    with pytest.raises(ValueError):
        store.get("a", -1)
    with pytest.raises(ValueError):
        store.snapshot(8)
    with pytest.raises(ValueError):
        store.snapshot(-3)
    for bad in (1.0, "1", True, 2.5, [1]):
        with pytest.raises(TypeError):
            store.get("a", bad)
        with pytest.raises(TypeError):
            store.snapshot(bad)
    assert store.get("a", version=1) == 1
    assert store.get("a", None) == 100


def test_reput_after_delete():
    store = VersionedStore()
    store.put("k", "first")
    store.delete("k")
    assert store.put("k", "second") == 3
    assert store.get("k") == "second"
    assert store.get("k", 1) == "first"
    with pytest.raises(KeyError):
        store.get("k", 2)
    assert store.delete("k") == 4
    assert len(store.history("k")) == 4


def test_history_returns_fresh_copies():
    store = VersionedStore()
    store.put("k", [1])
    store.put("k", [2])
    first = store.history("k")
    first[0]["version"] = 99
    first[0]["deleted"] = True
    first.append({"junk": 1})
    first.pop(1)
    again = store.history("k")
    assert again == [{"version": 1, "deleted": False, "value": [1]}, {"version": 2, "deleted": False, "value": [2]}]
    assert again is not store.history("k")
    assert again[0] is not store.history("k")[0]


def test_history_of_unknown_key_is_empty():
    store = VersionedStore()
    assert store.history("x") == []
    store.put("y", 1)
    assert store.history("x") == []
    assert isinstance(store.history("x"), list)
    store.history("x").append(1)
    assert store.history("x") == []


def test_key_type_validation():
    store = VersionedStore()
    for key in (1, None, b"k", ("k",), 1.5):
        with pytest.raises(TypeError):
            store.put(key, "x")
        with pytest.raises(TypeError):
            store.get(key)
        with pytest.raises(TypeError):
            store.delete(key)
        with pytest.raises(TypeError):
            store.history(key)
    assert store.version == 0
    assert store.put("", "empty key is fine") == 1


def test_values_stored_by_reference():
    store = VersionedStore()
    shared = {"n": [1]}
    store.put("k", shared)
    assert store.get("k") is shared
    shared["n"].append(2)
    assert store.get("k") == {"n": [1, 2]}
    assert store.history("k")[0]["value"] is shared
    assert store.snapshot()["k"] is shared
    assert store.get("k", 1) is shared


def test_snapshot_current_is_fresh_and_excludes_deleted():
    store = sample()
    snap = store.snapshot()
    assert snap == {"a": 100, "c": 3}  # b was deleted at 7
    snap["a"] = -1
    snap["new"] = 0
    del snap["c"]
    assert store.snapshot() == {"a": 100, "c": 3}
    assert store.get("a") == 100
    assert store.snapshot() is not store.snapshot()
    assert isinstance(snap, dict)
    assert VersionedStore().snapshot() == {}


def test_snapshot_at_version_is_point_in_time():
    store = sample()
    assert store.snapshot(0) == {}
    assert store.snapshot(1) == {"a": 1}
    assert store.snapshot(2) == {"a": 1, "b": 2}
    assert store.snapshot(3) == {"a": 10, "b": 2}
    assert store.snapshot(4) == {"b": 2}
    assert store.snapshot(5) == {"b": 2, "c": 3}
    assert store.snapshot(6) == {"a": 100, "b": 2, "c": 3}
    assert store.snapshot(7) == {"a": 100, "c": 3}
    taken = store.snapshot()
    store.put("a", -5)
    store.delete("c")
    store.put("zz", 1)
    assert taken == {"a": 100, "c": 3}
    assert store.snapshot(7) == {"a": 100, "c": 3}
    assert store.snapshot() == {"a": -5, "zz": 1}


def test_snapshot_is_sorted_by_key():
    store = VersionedStore()
    for key in ("m", "b", "z", "a", "Z"):
        store.put(key, key.upper())
    assert list(store.snapshot()) == ["Z", "a", "b", "m", "z"]
    store.put("c", 1)
    assert list(store.snapshot(5)) == ["Z", "a", "b", "m", "z"]
    assert list(store.snapshot()) == ["Z", "a", "b", "c", "m", "z"]


def test_scale_history_lookups():
    start = time.perf_counter()
    store = VersionedStore()
    count = 4000
    for i in range(count):
        store.put("hot", i)
        if i % 4 == 3:
            store.put(f"other-{i}", i)
    seen = 0
    for v in range(1, store.version + 1, 3):
        try:
            value = store.get("hot", v)
        except KeyError:
            continue
        assert value <= v
        seen += 1
    assert seen > 1000
    for key in range(2000):
        store.put(f"k{key}", key)
    assert len(store.snapshot()) == 2000 + 1 + count // 4
    assert store.get("hot", 1) == 0
    assert time.perf_counter() - start < 1.0
