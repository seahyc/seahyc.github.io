import pytest

from sessions import sessionize


def ev(user, ts, action="x"):
    return {"user": user, "ts": ts, "action": action}


def test_two_sessions():
    result = sessionize([ev("a", 0), ev("a", 10), ev("a", 500)], 60)
    assert result == {"a": [{"start": 0, "end": 10, "count": 2}, {"start": 500, "end": 500, "count": 1}]}


def test_unsorted_input():
    result = sessionize([ev("a", 30), ev("a", 0)], 60)
    assert result == {"a": [{"start": 0, "end": 30, "count": 2}]}


def test_negative_gap_rejected():
    with pytest.raises(ValueError):
        sessionize([], -1)
