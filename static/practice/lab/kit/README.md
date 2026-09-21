# Local experiment workspace

This first rung makes four research mechanisms small enough to derive, implement and measure on a CPU. It does **not** establish frontier research readiness. Complete the shared numerical foundations first; then pick one track. Python 3.10+ and the standard library suffice. There are no packages, model downloads, GPU requirements or network calls.

Keep `candidate.py`, `harness.py` and `test_candidate.py` together in a directory. Work only in `candidate.py`; keep an unmodified copy of the evaluator. Record your hypothesis before running it.

```sh
python3 -m py_compile candidate.py harness.py test_candidate.py
python3 -m unittest -v
python3 harness.py --track posttrain --seed 17 --output posttrain-17.json
python3 harness.py --track rl --seed 17 --output rl-17.json
python3 harness.py --track infra --seed 17 --output infra-17.json
python3 harness.py --track robotics --seed 17 --output robotics-17.json
```

The unfinished starter deliberately fails. Work on a single track with, for example, `python3 -m unittest -v test_candidate.CandidateContracts.test_preference_direction`. The full unit suite passes only after all four tracks are implemented. A run exits 1 on failure and still writes an explanatory JSON result. The runner executes your Python normally: use your own code or an isolated disposable environment. It is not a sandbox.

## 1. Preference optimization, 3–6 focused hours

Prerequisites: dot products, sigmoid, derivative/chain rule, likelihood and gradient descent. Implement `fit_preferences`: a binary linear policy learns which of two actions is preferred. The frozen reference policy is uniform, so its log odds cancel. If `s=2*y-1`, the per-pair loss is `-log(sigmoid(beta*s*dot(w,x)))`. Derive the gradient on paper, check it with centered finite differences, then implement batch descent. Use stable scalar math.

Evaluation: 200 training examples; three independent sets of 250 heldout examples from the same teacher. Each must exceed 88% accuracy; mean preference loss must be below 0.4 versus uniform baseline `log(2)`. Separate tests from model selection: choose learning rate using a training split, then freeze it before evaluating new seeds. These public samples are reproducible, not secret.

Deliver: loss curve, gradient check, beta ablation (0.1/0.7/2.0), comparison against unchanged uniform reference, and one counterexample from a shifted feature distribution. Explain why this miniature objective is related to DPO but is not language-model alignment, safety evaluation or production post-training. Next: repeat with a small pretrained model using TRL, train/validation/test preference splits, actual reference log probabilities and measured heldout reward/length/KL.

## 2. Policy gradient, 4–8 focused hours

Prerequisites: categorical sampling, softmax, expected return, gradient of log probability. Implement `train_bandit` using only the `pull(action)` interface. Maintain logits, sample actions, collect rewards and update using `advantage * gradient(log probability)`. A running reward baseline can reduce variance. Do not inspect the environment closure or use hard-coded arm identities. The interaction budget is 6,000 per run.

Evaluation: three shuffled stochastic environments, then frozen-policy rollouts with independent RNG streams (3,000 interactions each). All returns must exceed 0.62 versus uniform expected return 0.433; each learned policy's expected regret must be below 0.1. Report variation across training seeds, not the best run.

Deliver: reward learning curve, estimated uncertainty, baseline/no-baseline ablation, one unstable learning-rate run and diagnosis. Next: temporal credit assignment on a multi-step environment; termination/truncation correctness, REINFORCE versus actor-critic, then PPO reproduction. A bandit has no state transitions or long-horizon credit assignment and cannot substitute for that work.

## 3. Quantized inference primitive, 3–6 focused hours

Prerequisites: matrix-vector multiplication, numerical error, signed integer ranges, benchmark noise. Implement symmetric per-row int8 quantization and matvec without rebuilding the float matrix. Check zero rows and widely different row magnitudes.

Evaluation: heldout random vectors; worst relative L2 output error below 0.03, normalized weight error at most `1/127`, exact zero row. Only after correctness checks, compare seven median timing batches after 20 warmups. There is **no speed threshold**: Python integer loops can be slower than float loops. The packed-byte ratio assumes a packed int8 array and float32 scales; ordinary Python integers do not occupy one byte. Do not call that ratio measured process memory.

Deliver: correctness/error table, warmup/repeat methodology, median and spread, hardware/software record, and account of where time and memory actually go. Next: NumPy/PyTorch baseline, packed buffers, profiler evidence, then a GPU kernel with synchronization and device memory measurement. CPU Python speed does not predict GPU kernel performance.

## 4. Behavior cloning and closed-loop control, 4–8 focused hours

Prerequisites: regression, train/test separation, feedback control. Fit a 2x2 linear controller from 50 complete expert trajectories. Each observation is goal minus current position; each target is expert action. Solve least squares or train by gradient descent. The expert gain varies with the seed; learn it from observations.

Evaluation: training action MSE below 1e-4, plus 120 **new episodes** over three independent seeds with wider start/goal distribution, clipped actions and disturbances. At least 90% of each set must reach within 0.12 of the goal; mean final distance must improve at least 85% over zero-action control. Demonstration episodes, not individual correlated frames, are the split unit. Low one-step MSE alone does not prove closed-loop success.

Deliver: per-episode success/distance, success by initial distance, disturbance ablation and failed trajectories. Next: a standard simulator and LeRobot dataset/policy workflow, episode-level heldout data, camera variation, latency and action chunking. This point simulator omits contact, perception, embodiment and safety; it does not qualify a policy for a physical robot.

## Evidence protocol

For each track, save three runs with seeds 17, 91 and 203 **after** freezing your implementation. The evaluator internally uses multiple heldout streams too. Save source, command, result JSON, hypothesis, raw learning curve, one failed attempt, and an ablation table. JSON records source SHA256, runtime, seed, numerical checks and measured metrics. Hashes identify a submission; they do not authenticate it or make it tamper-proof. Public checks cannot establish that code followed the intended algorithm, so peer review must inspect the implementation and derivation.

Do not tune on every seed you call heldout. Ask a peer to choose new seeds or a shifted test distribution after the implementation is frozen. A passing file demonstrates this particular exercise only. Before research claims, reproduce an external baseline with matched budgets, multiple training seeds, uncertainty, failure analysis and an independently runnable artifact. Before an upstream contribution, read the project's contribution guidelines, run its tests and have maintainers evaluate the actual change.

For shared machines, keep runs bounded: one process, no parallel sweep, no datasets downloaded implicitly. This kit runs on ARM Linux as well as macOS. GPU-based next steps require a separately provisioned environment; a CPU-only Oracle VM can run these exercises but is not a GPU training service.
