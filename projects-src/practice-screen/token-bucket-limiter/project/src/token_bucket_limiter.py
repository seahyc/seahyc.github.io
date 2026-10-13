"""Per-key token bucket rate limiter with an injected clock. See instructions.md."""


class RateLimiter:
    def __init__(self, capacity, refill_rate, clock):
        raise NotImplementedError

    def allow(self, key, cost=1):
        raise NotImplementedError

    def tokens(self, key):
        raise NotImplementedError

    def retry_after(self, key, cost=1):
        raise NotImplementedError
