# Coding and interview practice

`static/practice/` runs at `/practice/`; the full preparation path is `/practice/path/`. Both are standalone static applications copied by Hugo. There is no server-side code runner or account system.

## Curriculum

24 original Python exercises cover fluency, data structures, practical AI tooling, progressive requirements, async work, debugging and timed transfer. Twelve interview rehearsals cover live reasoning, code review, discovery, demos, project depth, evaluation, workflow systems, inference, concurrency, model basics, motivation and a full loop. Every rehearsal has a scenario, timed rounds, follow-ups and four domain-specific rubric dimensions.

Choose Applied systems, Engineering depth or Both. Time budgets allocate practice; readiness thresholds do not relax when a target date is near. These are training heuristics, not predictions of hiring outcomes or a universal interview syllabus. Specialized research roles require further role-specific depth.

## Runtime and state

Python loads from the pinned jsDelivr runtime into a fresh module worker per run. Stop terminates the worker; execution after initialization is capped at 10 seconds, and output at 30 KB. Official tests are fixed public files. The runner supports synchronous unittest suites and an `ASYNC_TESTS` list of async test functions, awaited without nesting an event loop.

The studio stores `coding-practice-v1`; the interview path stores `coding-interview-path-v1`. Prior code and progress migrate without resetting exercises. The path can export/import a combined backup and download a private coaching handoff. No stories, notes or code are uploaded. A storage change in another tab stops stale edits from silently overwriting new progress.

Fresh mock launch records whether the task has been opened or attempted in this browser. Familiar retries remain practice. The page cannot detect prior exposure elsewhere, enforce tool rules, or authenticate peer review. Mock evidence requires independent timed passes on two different tasks and days. Rehearsal thresholds require every anchored dimension at least 2/3, written evidence, specific feedback, and learner-reported peer review within 30 days. A subsequent failed rehearsal invalidates older passing review evidence until repaired. There is no automatic spoken grading or recording.

## Verification

```
node --test scripts/state.test.mjs scripts/practice-path.test.mjs
node --check static/practice/app.mjs
node --check static/practice/runner.mjs
node --check static/practice/path/app.mjs
python3 scripts/verify-exercises.py
```

The public verifier validates/compiles all starters. Add `--source-root` and `--new-reference-root` to run private references; reference solutions must remain outside the public repository. Supplementary private references may be named by exercise ID or entry basename.

Browser smoke tests require Playwright (or `PLAYWRIGHT_MODULE`), an installed browser (`BROWSER_EXECUTABLE` optionally), and `PRACTICE_URL` pointing to the studio:

```
node scripts/browser-practice.mjs
node scripts/browser-practice-path.mjs
```

The tests use isolated browser contexts. They cover Python execution, stopping code, saved-work migration, timer/freshness semantics, coaching evidence, backup round trips, track selection and mobile overflow. Screenshots are saved to the operating-system temporary directory.
