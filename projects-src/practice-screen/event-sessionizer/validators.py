import copy

import pytest

from sessions import sessionize


def ev(user, ts, action="act"):
    return {"user": user, "ts": ts, "action": action}


def s(start, end, count):
    return {"start": start, "end": end, "count": count}


def test_single_user_sessions():
    events = [ev("u", t) for t in (1000, 1020, 1050, 2000, 2010, 9000)]
    assert sessionize(events, 100) == {"u": [s(1000, 1050, 3), s(2000, 2010, 2), s(9000, 9000, 1)]}


def test_gap_boundary_is_strict():
    events = [ev("u", 0), ev("u", 60), ev("u", 121)]
    # 60 == gap -> same session; 61 > gap -> new session
    assert sessionize(events, 60) == {"u": [s(0, 60, 2), s(121, 121, 1)]}
    assert sessionize([ev("u", 0), ev("u", 61)], 60) == {"u": [s(0, 0, 1), s(61, 61, 1)]}
    assert sessionize([ev("u", 5), ev("u", 65)], 60) == {"u": [s(5, 65, 2)]}


def test_equal_timestamps_same_session():
    events = [ev("u", 7), ev("u", 7), ev("u", 7, "other"), ev("u", 500)]
    assert sessionize(events, 10) == {"u": [s(7, 7, 3), s(500, 500, 1)]}
    assert sessionize([ev("u", 3), ev("u", 3)], 0) == {"u": [s(3, 3, 2)]}


def test_unsorted_input_sorted_per_user():
    events = [ev("u", 900), ev("u", 10), ev("u", 905), ev("u", 20), ev("u", 400)]
    assert sessionize(events, 50) == {"u": [s(10, 20, 2), s(400, 400, 1), s(900, 905, 2)]}


def test_users_interleaved_and_sorted():
    events = [ev("zed", 5), ev("amy", 100), ev("zed", 8), ev("amy", 1), ev("Bob", 3), ev("amy", 104)]
    result = sessionize(events, 10)
    assert list(result) == ["Bob", "amy", "zed"]
    assert result["amy"] == [s(1, 1, 1), s(100, 104, 2)]
    assert result["zed"] == [s(5, 8, 2)]
    assert result["Bob"] == [s(3, 3, 1)]


def test_zero_gap():
    events = [ev("u", 4), ev("u", 5), ev("u", 5), ev("u", 7)]
    assert sessionize(events, 0) == {"u": [s(4, 4, 1), s(5, 5, 2), s(7, 7, 1)]}


def test_empty_and_singleton():
    assert sessionize([], 30) == {}
    assert sessionize((), 0) == {}
    assert sessionize([ev("only", 0)], 30) == {"only": [s(0, 0, 1)]}
    assert sessionize((ev("only", 42),), 0) == {"only": [s(42, 42, 1)]}


def test_negative_or_bad_gap_rejected():
    for bad in (-1, -100, 1.5, "60", None, True):
        with pytest.raises(ValueError):
            sessionize([ev("u", 1)], bad)
    with pytest.raises(ValueError):
        sessionize([], -1)
    for bad_events in (None, "abc", {"user": "u"}, 5):
        with pytest.raises(ValueError):
            sessionize(bad_events, 10)


def test_malformed_events_rejected_with_index():
    cases = [
        (["x"], "0"),
        ([ev("u", 1), {"ts": 1, "action": "a"}], "1"),
        ([ev("u", 1), ev("u", 2), {"user": "u", "action": "a"}], "2"),
        ([ev("u", 1), {"user": "u", "ts": 1}], "1"),
        ([ev("u", -5)], "0"),
        ([ev("u", 1.5)], "0"),
        ([ev("u", "7")], "0"),
        ([ev("u", True)], "0"),
        ([ev("u", 1), ev("u", 1), ev("u", 1), ev(5, 1)], "3"),
        ([ev("u", 1), ev("u", 1), ev("u", 1), ev("u", 1), {"user": "u", "ts": 1, "action": None}], "4"),
    ]
    for events, index in cases:
        with pytest.raises(ValueError, match=index):
            sessionize(events, 10)


def test_input_not_mutated():
    events = [ev("b", 50), ev("a", 3), ev("b", 1), ev("a", 3)]
    before = copy.deepcopy(events)
    result = sessionize(events, 5)
    assert events == before
    result["a"][0]["count"] = 99
    result["b"].clear()
    assert events == before
    assert sessionize(events, 5)["a"][0]["count"] == 2


def test_deterministic_across_input_order():
    events = [ev("a", 1), ev("b", 9), ev("a", 2), ev("c", 50), ev("b", 100), ev("a", 300), ev("b", 9, "dup")]
    expected = sessionize(events, 20)
    for shift in range(len(events)):
        rotated = events[shift:] + events[:shift]
        assert sessionize(rotated, 20) == expected
        assert list(sessionize(rotated, 20)) == list(expected)
    assert sessionize(list(reversed(events)), 20) == expected


def test_large_timestamps_and_big_gap():
    big = 10**12
    events = [ev("u", big + 5), ev("u", big), ev("u", 3)]
    assert sessionize(events, 10) == {"u": [s(3, 3, 1), s(big, big + 5, 2)]}
    assert sessionize(events, 10**13) == {"u": [s(3, big + 5, 3)]}


def test_scale_many_events():
    events = []
    for u in range(20):
        for i in range(500):
            events.append(ev(f"user{u:02d}", (i * 37) % 1000 + (i // 100) * 100000))
    result = sessionize(events, 50)
    assert list(result) == [f"user{u:02d}" for u in range(20)]
    for sessions in result.values():
        assert sum(x["count"] for x in sessions) == 500
        assert [x["start"] for x in sessions] == sorted(x["start"] for x in sessions)
        assert len(sessions) == 5
