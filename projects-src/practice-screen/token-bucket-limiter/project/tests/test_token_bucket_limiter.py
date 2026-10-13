from token_bucket_limiter import RateLimiter


class FakeClock:
    def __init__(self, now=0.0):
        self.now = now

    def __call__(self):
        return self.now


def test_burst_then_deny():
    limiter = RateLimiter(3, 1.0, FakeClock())
    assert [limiter.allow("k") for _ in range(4)] == [True, True, True, False]


def test_refill_over_time():
    clock = FakeClock()
    limiter = RateLimiter(2, 1.0, clock)
    limiter.allow("k"), limiter.allow("k")
    assert not limiter.allow("k")
    clock.now = 1.0
    assert limiter.allow("k")
    assert not limiter.allow("k")


def test_keys_do_not_share_tokens():
    limiter = RateLimiter(1, 0.0, FakeClock())
    assert limiter.allow("a")
    assert limiter.allow("b")
    assert not limiter.allow("a")
