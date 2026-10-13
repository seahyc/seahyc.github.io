# Event Sessionizer

An agent-observability tool receives tool-call events from many users, in whatever order
the log shippers deliver them. To compute "how long did each working session last" it must
group each user's events into sessions.

## Task

Implement `sessionize(events, gap_seconds)` in `src/sessions.py`.

- `events` is a `list` or `tuple` of `dict`s with keys `user` (`str`), `ts` (`int` seconds,
  `>= 0`, not `bool`) and `action` (`str`). Extra keys are ignored. Input order is arbitrary:
  events of one user may arrive out of order and users may be interleaved.
- `gap_seconds` is an `int` (not `bool`) `>= 0`.
- Per user, sort events by `ts`. A new session starts when the gap to the **previous event
  of the same user** is **strictly greater** than `gap_seconds`. A gap exactly equal to
  `gap_seconds` stays in the same session. Events with identical timestamps are valid
  and belong to the same session (each counts).
- Return a new dict `{user: [session, ...]}` where each session is
  `{"start": first ts, "end": last ts, "count": number of events}`. Users are ordered by name
  ascending, each user's sessions by `start` ascending. A user with no events does not appear.
- Anything invalid raises `ValueError`:
  - bad `gap_seconds` (negative, not an int, a bool);
  - `events` not a list/tuple;
  - a malformed event (not a dict, missing key, wrong type, negative `ts`, bool `ts`). The
    message must contain the event's index in `events`, e.g. `"event 3: ts must be a non-negative int"`.
- The input is never mutated. The result depends only on the multiset of events.

Example:

```python
sessionize([
  {"user": "bo", "ts": 100, "action": "run"},
  {"user": "al", "ts": 5,   "action": "edit"},
  {"user": "bo", "ts": 40,  "action": "open"},
  {"user": "bo", "ts": 700, "action": "run"},
], 60)
# {"al": [{"start": 5, "end": 5, "count": 1}],
#  "bo": [{"start": 40, "end": 100, "count": 2}, {"start": 700, "end": 700, "count": 1}]}
```

## Files

- `src/sessions.py`: your solution.
- `tests/test_sessions.py`: a few visible tests. Grading uses a separate, larger hidden suite.
- `tests/test_candidate.py`: add your own tests for the risks you see.
- `DESIGN.md`: four short sections.

Target: **25 minutes**.
