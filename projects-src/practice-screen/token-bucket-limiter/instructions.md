# Per-Key Token Bucket Limiter

An API gateway rate-limits each caller. Every key (an API key, a tenant) owns a **token
bucket**: it holds up to `capacity` tokens, refills continuously at `refill_rate`
tokens per second, and each request spends `cost` tokens. A full bucket permits a burst
of `capacity` requests; after that, requests are admitted at the refill rate.

Time comes from an injected `clock()` (a zero-argument callable returning seconds as a
float), so behavior is fully deterministic. Never read the real clock.

## Task

Implement `RateLimiter` in `src/token_bucket_limiter.py`:

```python
RateLimiter(capacity: float, refill_rate: float, clock)
allow(key: str, cost: float = 1) -> bool
tokens(key: str) -> float
retry_after(key: str, cost: float = 1) -> float
```

All keys share the same `capacity` and `refill_rate`.

**Semantics**

- A key seen for the first time starts with a **full** bucket (`capacity` tokens) at the
  current clock reading.
- Refill is **lazy**: when a key is touched, add `elapsed * refill_rate` tokens, capped at
  `capacity`, where `elapsed` is the time since that key's last refill point. Refill is
  fractional: nothing is rounded, and the fractional remainder is never thrown away.
- `allow(key, cost)`: refill, then if `tokens >= cost` spend `cost` and return `True`;
  otherwise return `False` and spend **nothing**. A `cost` above `capacity` can never be
  satisfied: return `False` (do not raise).
- `tokens(key)`: the tokens available right now after refill, without spending any. A key
  never seen reports `capacity`.
- `retry_after(key, cost)`: seconds until `allow(key, cost)` would succeed if nothing else
  happens: `0.0` when it would succeed now, `math.inf` when it never will (cost above
  capacity, or not enough tokens and `refill_rate == 0`).
- **Clock going backwards** (a bad NTP step, a test with a hand-driven clock): treat the
  negative elapsed time as zero (no refill, no negative tokens) and **do not move the
  key's refill point backwards**. After the clock returns to or passes the earlier
  reading, elapsed time is measured from the latest reading ever seen for that key, so
  the same interval is never credited twice.
- Hidden tests use exactly representable numbers (0.5, 0.25, 2.0, ...), so compare with
  `>=` directly; no epsilon is needed.

**Validation**

- `capacity <= 0` or `refill_rate < 0` raises `ValueError`; a non-numeric one raises `TypeError`.
- `cost <= 0` raises `ValueError`. A non-`str` key raises `TypeError` from every method.
- 5,000 keys with a few calls each must run well under a second.

## Files

- `src/token_bucket_limiter.py`: your solution.
- `tests/test_token_bucket_limiter.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **60 minutes**.
