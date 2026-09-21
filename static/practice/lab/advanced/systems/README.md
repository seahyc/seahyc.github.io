# Failure analysis: runnable fault injection

These four CPU assessments turn the stress missions into executable exercises.
Start after the corresponding tiny benchmark. They are bridges to the full
TRL/verl, distributed training, serving and visual robotics missions; passing
these small models does not finish those external reproductions.

## Before you start

You need Python functions, dictionaries, lists, exceptions and file I/O. For
reward-audit, understand train versus test data and mean/variance. For
rollout-boundary, first work through rewards, discounting and value estimates:
a terminated episode has no future reward, while an artificial time limit may
cut off a continuing task. Checkpoint-recovery needs optimizer momentum (a
running weighted sum of gradients), RNG state (where a random sequence resumes),
and the distinction between a staging file and a committed file. Robot-shift
needs position, velocity and feedback: repeatedly observe the current error and
choose an action that reduces it while braking velocity. Do not assume you've
learned these because a mission is unlocked; derive a three-step example first.

## Workflow

1. Read the matching function docstrings in `candidate.py`. Predict a failing
   case by hand. Implement one assessment's functions; the others can stay TODO.
2. Run `python3 evaluate.py --assessment reward-audit --seed 17 --scope smoke
   --candidate candidate.py --output reward-17.json` (one line).
3. Inspect every metric and check. Add your own failing case before changing
   your implementation. Preserve the failing report and state a causal hypothesis.
4. Freeze the candidate, then run `--scope full` with fresh peer-chosen seeds.
   Use `rollout-boundary`, `checkpoint-recovery`, or `robot-shift` for the other
   assessments. Full runs use 64 generated scenarios/episodes versus 8 in smoke.
5. Explain your intervention, compare a deliberately broken baseline, and ask a
   peer to change the fault distribution. Public seeded cases are reproducible,
   not secret held-out data. Report source/evaluator hashes with the result.

`manifest.json` publishes exact machine-readable gates for both CPU scopes.
`accelerator` explicitly returns unsupported; these exercises make no accelerator
performance claim. Run source you trust: candidates execute Python, without a
security sandbox. The evaluator also exports `run(assessment, seed, scope,
candidate_path)` for a Python-in-browser host that preloads the listed files.

## What runs

- **reward-audit** generates duplicate and commuted addition problems in multiple
  splits, including harmless within-split duplicates. It tests whole-answer reward
  parsing against injections, long responses and ties in reward normalization.
- **rollout-boundary** checks terminated/truncated targets and combines shuffled
  worker chunks with stale policies, duplicate deliveries and consumed IDs. The
  sum and accepted IDs must be invariant to worker arrival order.
- **checkpoint-recovery** writes to a real temporary filesystem, interrupts both
  named save boundaries, corrupts newly committed files and requires recovery of
  the prior generation. An SGD-with-momentum process must exactly resume its
  parameters, optimizer and random sequence. A bounded queue simulation delivers
  retries while completions are delayed; every admission is checked.
- **robot-shift** executes a point-mass controller for 220 steps per episode under
  new starting positions, goals, actuator gains, drag, sensor noise and impulses.
  Both final position/velocity and every proposed action are checked. A zero
  controller is evaluated under the same disturbances as a negative control.

Checkpoint implementations may choose their layout, but must preserve immutable
previous committed generations when publishing a new generation. Each committed
record should include its step/generation and a checksum. Staging filenames must
not be considered committed. The evaluator corrupts all changed/new files from
one commit, so retaining a prior immutable generation is essential.

## Limits of the evidence

Faults are deterministic calls and byte corruption, not process kill, power loss,
fsync guarantees on physical disks, or adversarial concurrent writers. Queue and
worker arrival order are simulated in one process; throughput, network partitions,
GPU training and production service latency are not assessed. The robot has one
position dimension, observes velocity, and has no camera, contact or collision
geometry. Passing shows feedback recovery in this simulator only; it says nothing
about a real robot, visual policy learning or safe hardware deployment. The robot
exercise evaluates a controller intervention, not a learned-policy training run.
