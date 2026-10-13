import math
import time

import pytest

from token_bucket_limiter import RateLimiter


class Clock:
    def __init__(self, now=0.0):
        self.now = now

    def __call__(self):
        return self.now


def test_new_key_starts_full_and_bursts():
    clock = Clock(100.0)
    limiter = RateLimiter(5, 1.0, clock)
    assert [limiter.allow("k") for _ in range(7)] == [True] * 5 + [False] * 2
    other = RateLimiter(1, 1.0, Clock(0.0))
    assert other.allow("x") is True and other.allow("x") is False


def test_fractional_refill_accumulates():
    clock = Clock()
    limiter = RateLimiter(2, 0.5, clock)
    assert limiter.allow("k", 2)
    clock.now = 1.0  # 0.5 token: not enough
    assert not limiter.allow("k")
    clock.now = 1.5  # the denied call must not discard the remainder: 0.75 token
    assert not limiter.allow("k")
    clock.now = 2.0  # 1.0 token
    assert limiter.allow("k")
    assert not limiter.allow("k")
    for step in range(1, 5):  # many tiny steps add up like one big one: 0.5 token at t=3
        clock.now = 2.0 + step * 0.25
        assert not limiter.allow("k")
    clock2 = Clock()
    fine = RateLimiter(4, 0.25, clock2)
    assert fine.allow("k", 4)
    for i in range(1, 16):
        clock2.now = i * 0.25
        assert fine.tokens("k") == pytest.approx(i * 0.0625)
    clock2.now = 4.0
    assert fine.allow("k") and not fine.allow("k")


def test_refill_capped_at_capacity():
    clock = Clock()
    limiter = RateLimiter(3, 2.0, clock)
    assert limiter.allow("k", 3)
    clock.now = 1000.0  # long idle: only capacity is available, not 2000 tokens
    assert [limiter.allow("k") for _ in range(5)] == [True, True, True, False, False]
    assert limiter.tokens("k") == 0.0
    clock.now = 1000.25
    assert limiter.tokens("k") == pytest.approx(0.5)
    clock.now = 5000.0
    assert limiter.tokens("k") == 3


def test_denied_request_consumes_nothing():
    limiter = RateLimiter(3, 0.0, Clock())
    assert limiter.allow("k", 2)
    assert not limiter.allow("k", 2)
    assert limiter.tokens("k") == 1
    assert not limiter.allow("k", 3)
    assert limiter.tokens("k") == 1
    assert limiter.allow("k", 1)
    assert limiter.tokens("k") == 0


def test_variable_cost():
    limiter = RateLimiter(10, 0.0, Clock())
    assert limiter.allow("k", 4)
    assert limiter.allow("k", 6)
    assert not limiter.allow("k", 0.5)
    exact = RateLimiter(2, 0.0, Clock())
    assert exact.allow("k", 2) and exact.tokens("k") == 0
    half = RateLimiter(2, 0.0, Clock())
    assert half.allow("k", 0.5) and half.allow("k", 1.5) and not half.allow("k", 0.25)


def test_keys_are_independent():
    clock = Clock()
    limiter = RateLimiter(2, 1.0, clock)
    assert limiter.allow("a", 2)
    assert not limiter.allow("a")
    assert limiter.allow("b", 2)
    clock.now = 1.0
    assert limiter.allow("a")
    assert limiter.tokens("b") == 1
    # A key first seen late starts full at that moment, not with history.
    clock.now = 50.0
    assert limiter.tokens("late") == 2
    assert limiter.allow("late", 2) and not limiter.allow("late")


def test_clock_backwards_gives_no_credit_and_no_double_credit():
    clock = Clock(10.0)
    limiter = RateLimiter(2, 1.0, clock)
    assert limiter.allow("k", 2)
    clock.now = 5.0  # jumped back
    assert not limiter.allow("k")
    assert limiter.tokens("k") == 0
    clock.now = 10.5  # only 0.5 s past the latest reading seen: still nothing to spend
    assert not limiter.allow("k")
    clock.now = 11.0  # exactly one token, measured from t=10 (not from t=5)
    assert limiter.allow("k")
    assert not limiter.allow("k")
    clock.now = 3.0
    assert not limiter.allow("k")
    clock.now = 12.0
    assert limiter.allow("k") and not limiter.allow("k")


def test_clock_backwards_never_goes_negative():
    clock = Clock(10.0)
    limiter = RateLimiter(3, 1.0, clock)
    assert limiter.allow("k")
    clock.now = -100.0
    assert limiter.tokens("k") == 2
    assert limiter.allow("k", 2)
    assert limiter.tokens("k") == 0
    clock.now = 10.0
    assert limiter.retry_after("k") == pytest.approx(1.0)
    assert not limiter.allow("k")
    clock.now = 0.0
    assert not limiter.allow("k")
    # A fresh key seen while the clock is in the past starts full and is still consistent.
    clock.now = -5.0
    assert limiter.tokens("fresh") == 3 and limiter.allow("fresh", 3)
    clock.now = -4.0
    assert limiter.allow("fresh") and not limiter.allow("fresh")


def test_cost_above_capacity_never_allowed():
    clock = Clock()
    limiter = RateLimiter(2, 100.0, clock)
    assert limiter.allow("k", 3) is False
    clock.now = 1e6
    assert limiter.allow("k", 2.5) is False
    assert limiter.tokens("k") == 2
    assert limiter.allow("k", 2) is True


def test_zero_refill_rate_never_refills():
    clock = Clock()
    limiter = RateLimiter(2, 0, clock)
    assert limiter.allow("k") and limiter.allow("k") and not limiter.allow("k")
    clock.now = 1e9
    assert not limiter.allow("k")
    assert limiter.tokens("k") == 0


def test_tokens_reports_without_consuming():
    clock = Clock()
    limiter = RateLimiter(4, 1.0, clock)
    assert limiter.tokens("never-seen") == 4
    assert limiter.allow("k", 3)
    for _ in range(3):
        assert limiter.tokens("k") == 1
    clock.now = 2.5
    assert limiter.tokens("k") == pytest.approx(3.5)
    assert limiter.tokens("k") == pytest.approx(3.5)
    assert limiter.allow("k", 3.5) and limiter.tokens("k") == pytest.approx(0)


def test_retry_after():
    clock = Clock()
    limiter = RateLimiter(4, 2.0, clock)
    assert limiter.retry_after("k") == 0.0
    assert limiter.allow("k", 4)
    assert limiter.retry_after("k") == pytest.approx(0.5)
    assert limiter.retry_after("k", 3) == pytest.approx(1.5)
    assert limiter.retry_after("k", 4) == pytest.approx(2.0)
    clock.now = 0.25
    assert limiter.retry_after("k") == pytest.approx(0.25)
    assert limiter.tokens("k") == pytest.approx(0.5)  # retry_after must not spend tokens
    assert limiter.retry_after("k", 5) == math.inf
    clock.now = 10.0
    assert limiter.retry_after("k", 4) == 0.0
    still = RateLimiter(2, 0.0, Clock())
    assert still.allow("k", 2)
    assert still.retry_after("k") == math.inf
    assert still.retry_after("other") == 0.0


def test_invalid_arguments():
    for capacity in (0, -1, -0.5):
        with pytest.raises(ValueError):
            RateLimiter(capacity, 1.0, Clock())
    with pytest.raises(ValueError):
        RateLimiter(1, -0.5, Clock())
    for bad in ("3", None):
        with pytest.raises(TypeError):
            RateLimiter(bad, 1.0, Clock())
        with pytest.raises(TypeError):
            RateLimiter(1, bad, Clock())
    limiter = RateLimiter(2, 1.0, Clock())
    for cost in (0, -1, -0.5):
        with pytest.raises(ValueError):
            limiter.allow("k", cost)
        with pytest.raises(ValueError):
            limiter.retry_after("k", cost)
    for key in (None, 1, b"k", ("k",)):
        with pytest.raises(TypeError):
            limiter.allow(key)
        with pytest.raises(TypeError):
            limiter.tokens(key)
        with pytest.raises(TypeError):
            limiter.retry_after(key)
    assert limiter.tokens("k") == 2  # failed calls left no trace


def test_same_sequence_same_decisions():
    def run():
        clock = Clock()
        limiter = RateLimiter(3, 0.75, clock)
        out = []
        for step in range(60):
            clock.now = step * 0.5 if step % 11 else step * 0.25
            out.append(limiter.allow("a" if step % 3 else "b", 1 + step % 2))
        return out

    first = run()
    assert first == run()
    assert True in first and False in first


def test_many_keys_scale():
    start = time.perf_counter()
    clock = Clock()
    limiter = RateLimiter(2, 1.0, clock)
    for i in range(5000):
        assert limiter.allow(f"key-{i}")
    for i in range(5000):
        assert limiter.allow(f"key-{i}")
        assert not limiter.allow(f"key-{i}")
    clock.now = 1.0
    for i in range(0, 5000, 7):
        assert limiter.allow(f"key-{i}") and not limiter.allow(f"key-{i}")
    assert time.perf_counter() - start < 1.0
