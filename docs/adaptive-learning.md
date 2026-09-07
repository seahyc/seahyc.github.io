# Managed coding practice

The learner sees one task and one Continue action. The system owns sequencing,
review dates and the amount of support. Existing code, notes and completion
history remain saved. This is an inspectable rules-based tutor, not a calibrated
measurement of a person's ability.

## Decision policy

1. Resume the current unfinished attempt, including its code. A diagnostic with
   two failed test runs or requested help instead offers a smaller teaching step.
2. Select an eligible due skill check. Prefer an unseen alternate problem;
   use mixed tasks where they exercise the skills that need review. Prerequisites
   must have independent evidence and no unresolved repair.
3. At the curriculum frontier, use a short diagnostic for an unchecked skill.
   Passing can cover explicitly mapped introductory teaching. A simple check
   cannot replace an applied build with additional requirements.
4. After trouble, offer a small executable worked example and scaffolded work,
   then an independent variation. Support is available without a penalty score.
5. Keep applied builds, interview rehearsals and fresh timed mocks as separate
   requirements. Solving one graph task does not complete every graph problem.
6. When no review is eligible, continue new learning. When the finite bank is
   exhausted, offer familiar practice explicitly; never disable Continue while
   waiting for a review date or claim a familiar problem is unseen.

## Evidence model

`skill-catalog.mjs` defines 17 skills, prerequisites, assessed primary skills,
explicitly practiced component skills and exact introductory coverage. A
prerequisite is not automatically tested by a harder problem. Component practice
can maintain established knowledge but cannot diagnose an unknown skill.

`learning-model.mjs` derives the profile from dated observations. Observations
record task, session, pass/fail, assistance, first exposure and whether the
problem was unseen when the session began. Syntax diagnostics and runtime loading
errors are not evidence of forgetting. A guided scaffold cannot count as an
independent solution, even if a stored flag incorrectly says it was cold.

- **Building with support:** a worked or hinted solution, or a repair in progress.
- **Independent solution:** behavior tests pass without recorded hints or paste.
- **Recalled after a gap:** independent solutions on at least two different tasks,
  with a successful scheduled retrieval after at least 24 hours without exposure.
  This label expires when review is due or a later attempt needs repair.
- **Applied to a new problem:** an unseen alternate task passed independently
  after earlier independent evidence on another task. This is near-transfer
  evidence, distinct from a held-out timed assessment.

The initial review interval is one day. Successful, due retrievals with a real gap
extend it through 3, 7, 14 and 30 days. Early repetition neither earns a delayed
check nor pushes the review date forward. Exposure is measured at session start:
leaving a problem open cannot manufacture a gap. Failure or help triggers a short
repair; fixing it does not earn an interval increase. Multiple test runs within
one session cannot manufacture multiple retrieval successes.

The spacing ladder is a transparent starting policy, not a fitted forgetting
model. It should be evaluated with observed delayed and unseen-task outcomes
before stronger effectiveness claims or personalized intervals are made.

## Content and experience

The new bank has 12 short diagnostics, 12 alternate tasks and three mixed tasks.
All 27 have executable behavior tests, failing starters and reference solutions
kept outside the published static site. There are 17 small worked patterns with
predict-output checks. Problem contracts differ substantively, not only by names
or example values. The bank is finite; repeated familiar problems remain possible.

Initial learning and skill checks are untimed. Existing assessment mocks retain
their timers, freshness requirements and separate evidence. Interview rehearsals
retain their structured questions and rubric. Self-report is distinguished from
reported peer review; the app does not listen to or automatically evaluate speech.

The roadmap separates tasks actually completed from teaching covered by checks,
and shows skill evidence rather than a fabricated mastery percentage. Variants
appear under the relevant milestone instead of expanding the main route into a
second exercise list. Sounds and animation celebrate working behavior, not an
unearned claim of mastery.

## Persistence and limitations

Learning events are stored alongside existing browser progress and survive the
short 300-attempt display history. The compact ledger retains up to 6,000 events;
missing older evidence is treated conservatively. Legacy data can establish an
independent pass only when recorded evidence supports it. It cannot manufacture
fresh-task transfer or precise delayed-recall timestamps. Existing drafts and
notes are preserved and cross-tab stale-write protection remains in place.

Storage remains browser-local. No account sync, server tutor, live language-model
problem generation or calibrated learner model was introduced. Automated tests
check specified behavior, not whether the learner can explain every decision;
interview and peer evidence still serve that purpose. Introductory skipping is
explicitly limited to what the diagnostic actually measures.

## Research rationale

- [Math Academy's system description](https://mathacademy.com/how-our-ai-works)
  informs the separation of prerequisites, assessed skills, diagnostics and
  component practice. Its proprietary model and effectiveness claims are not
  reproduced or claimed here.
- [Bjork Learning and Forgetting Lab](https://bjorklab.psych.ucla.edu/research/)
  describes the distinction between immediate performance and lasting learning,
  retrieval, spacing and interleaving. Applying these principles to this product
  is a design hypothesis, not direct proof of coding-assessment effectiveness.
- [Variable retrieval study](https://doi.org/10.1073/pnas.2413511121) motivates
  varied questions for transfer; the study does not validate this coding trainer.

## Verification

Run `node --test scripts/*.test.mjs`, `python3 scripts/verify-variations.py`,
`python3 scripts/verify-exercises.py --curriculum static/practice/variations.json`,
and the existing runner checks. Browser QA uses a separate local origin, never
writes test answers into the learner's live progress, and verifies failure →
support → success → next task plus the roadmap. Reference fixtures must never
be copied into `static/` or the generated public site.
