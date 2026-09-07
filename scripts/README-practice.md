# Coding and interview practice

`static/practice/` runs at `/practice/`; the full preparation path is `/practice/path/`. Both are standalone static applications copied by Hugo. There is no server-side code runner or account system.

## Curriculum

Four one-function ramp exercises lead into 24 original Python exercises that cover fluency, data structures, practical AI tooling, progressive requirements, async work, debugging and timed transfer. Twelve interview rehearsals cover live reasoning, code review, discovery, demos, project depth, evaluation, workflow systems, inference, concurrency, model basics, motivation and a full loop. Every rehearsal has a scenario, timed rounds, follow-ups and four domain-specific rubric dimensions.

The default experience is one linear route through both areas. A deterministic mastery policy selects one next step from actual test results, assistance, independent retrieval, due recall and rehearsal evidence. The initial guided tasks teach a pattern; independent variants check transfer. A supported pass schedules a short 10-minute repair interval and can introduce a safe alternate pattern while the interval settles. Failed checks keep the learner on the skill; repeated failures reveal support. Independent retrieval uses a managed 1/3/7/14/30/60-day successive-relearning ladder, with due work inserted into the same queue. There is no subjective recall-grade control in the interface: observed assistance and checks determine the safe schedule. This is rule-based adaptation, not an AI tutor or an inferred psychometric mastery score. The full exercise library is available only through Options. These are training heuristics, not predictions of hiring outcomes or a universal interview syllabus. Specialized research roles require further role-specific depth.

## Runtime and state

Python loads from the pinned jsDelivr runtime into a fresh module worker per run. Stop terminates the worker; execution after initialization is capped at 10 seconds, and output at 30 KB. Official tests are fixed public files. The runner supports synchronous unittest suites and an `ASYNC_TESTS` list of async test functions, awaited without nesting an event loop. Interface sounds are muted by default and are never required to understand a result.

`static/practice/design-system.css` owns the shared visual tokens and components. The studio workspace and path layout files own only their page-specific composition. The CodeMirror editor is built from `projects-src/practice-editor/` with `npm run build:practice-editor`; generated editor output should not be edited by hand.

The studio stores `coding-practice-v1`; the interview path stores `coding-interview-path-v1`. Prior code and progress migrate without resetting exercises. The path can export/import a combined backup and download a private coaching handoff. No stories, notes or code are uploaded. A storage change in another tab stops stale edits from silently overwriting new progress.

Fresh mock launch records whether the task has been opened or attempted in this browser. Familiar retries remain practice. The page cannot detect prior exposure elsewhere, enforce tool rules, or authenticate peer review. Mock evidence requires independent timed passes on two different tasks and days. Rehearsal thresholds require every anchored dimension at least 2/3, written evidence, specific feedback, and learner-reported peer review within 30 days. A subsequent failed rehearsal invalidates older passing review evidence until repaired. There is no automatic spoken grading or recording.

The release workflow stamps local JavaScript, CSS and JSON references with the deployment commit SHA, then writes the same SHA to `version.mjs` and `release.json`. The release poll deliberately fetches unversioned `release.json` with `cache: no-store`, allowing an open page to discover a newer deployment.

## Verification

```
node --test scripts/state.test.mjs scripts/practice-path.test.mjs scripts/mastery.test.mjs
node --test scripts/release-practice.test.mjs
node --check scripts/release-practice.mjs
node --check static/practice/app.mjs
node --check static/practice/runner.mjs
node --check static/practice/path/app.mjs
npm run build:practice-editor
python3 scripts/verify-exercises.py
python3 scripts/verify-exercises.py --curriculum static/practice/ramp.json
```

The public verifier validates/compiles all starters. Add `--source-root` and `--new-reference-root` to run private references; reference solutions must remain outside the public repository. Supplementary private references may be named by exercise ID or entry basename.

Browser smoke tests require Playwright (or `PLAYWRIGHT_MODULE`), an installed browser (`BROWSER_EXECUTABLE` optionally), and `PRACTICE_URL` pointing to the studio:

```
node scripts/browser-practice.mjs
node scripts/browser-mastery-path.mjs
node scripts/browser-mastery-code.mjs
```

The tests use isolated browser contexts. They cover Python execution, stopping code, saved-work migration, timer/freshness semantics, coaching evidence, backup round trips, mastery transitions, one-question interviews and mobile overflow. Screenshots are saved to the operating-system temporary directory.

`RAMP_REFERENCE_ROOT` optionally points the coding-flow smoke test to private ramp references named by exercise ID. With references it runs all 20 new Python tests through the browser, including assisted-pass → 10-minute repair scheduling → safe alternate-pattern progression. Fresh resets retain the last three code snapshots in the coding backup. Interview wizard drafts retain every answer and position on reload; old freeform notes migrate into the first answer.

## Live editing feedback

A separate, persistent Pyodide worker compiles the current editable Python file after a 600 ms pause. It never executes the source. CodeMirror shows CPython syntax diagnostics inline; generation IDs discard stale results after edits and file changes. Loading or worker failure leaves the runner usable and exposes the manual syntax check. Compilation does not write attempts, assistance or mastery evidence. Execution and test suites remain explicit actions in a separate fresh worker.

The shared sound switch controls soft typewriter strikes, a return-key bell, action sounds and the passing chord. Keyboard shortcuts, navigation, read-only files and IME composition stay silent. Muting stops active voices. A newly successful run gets a drawn checkmark and a short, contained confetti burst; rerunning unchanged passing code does not repeat it. Reduced motion retains the success card without motion or confetti.

After a passing run, the completion card places the named next action before the individual test details, focuses that button and brings it into view. The same action policy supplies the next exercise, recall, rehearsal or stopping point. The optional roadmap is available from the path screen and the editor’s Options menu; it displays the canonical route and evidence without providing a second task-selection interface.

Progress separates historical completion from current evidence. Direct passes remain checked through later repair; prerequisite coverage does not invent a completed exercise. Delayed recall requires an independent successful rating at least 24 hours after any preceding recorded attempt/rating, and becomes due again on schedule. This is a conservative observation, not a calibrated mastery probability. Same-task retention does not establish transfer: unfamiliar mocks and reported peer review remain separate evidence.

The managed path never pauses for a future recall: it selects other work at the same level or a fresh reinforcement attempt. Clean runs before a scheduled review keep its due time, interval and relearning state; they cannot accelerate the spacing ladder. At the end of the sequence the scheduler offers further practice. The normal interface saves locally without transfer-file controls.

## Learning-engine audit (2026-09-07)

The current engine is a rule-based exercise route with outcome-adjusted recall intervals. It is not a calibrated knowledge-tracing model. It repeats the same scaffold and checks for recall; it does not generate equivalent new problems. Conditional prerequisite coverage is limited to explicit rules in `demonstrated`, rather than an adaptive placement diagnostic. Code learning/recall is untimed in the managed UI; pristine Mock-stage tasks use a countdown. Interview rehearsals still use countdowns. The audit removed the artificial minimum-time gate: a complete rehearsal can be recorded before the countdown ends. Required answers, rubric scores, feedback, and completion confirmation remain enforced.

The next substantive learning improvements should be validated problem families mapped to component skills, fresh variants for transfer checks, diagnostic challenge tasks for conditional skipping, and conservative credit only for component skills actually exercised. Routine learning should remain untimed, with fluency timing followed by explicit realistic mocks; do not treat timer expiry as mastery evidence. Equivalent variants must vary reasoning or requirements, not only identifier names or input values. Wrong-answer patterns should identify a smaller repair task. All of this must feed the existing single Continue action rather than add learner scheduling choices.

Research references: Math Academy describes diagnostic, graph, and implicit-review mechanisms at https://mathacademy.com/how-our-ai-works (product mechanism claims, not independent validation of this site). Varied retrieval and transfer: https://doi.org/10.1073/pnas.2413511121 . Learning/performance distinction and interleaving: https://bjorklab.psych.ucla.edu/research/ . Interview stress study: https://par.nsf.gov/servlets/purl/10196170 (observed interview stress; not a study isolating countdown timers).

## Adaptive engine (September 2026)

The earlier learning-engine audit above describes the pre-adaptive release.
The current design, evidence rules, coverage limits, migration behavior and
verification commands are documented in [the adaptive learning design](../docs/adaptive-learning.md).
