# PPO reproduction: Gymnasium CartPole-v1

Train an actual PyTorch actor–critic on Gymnasium's established CartPole-v1
implementation, entirely on your computer. No cloud, pretrained weights, network
calls, rendering dependency, or GPU rental is required. This is a bounded
algorithm reproduction on a small control task, not evidence of large-scale RL
research or a reproduction of the paper's complete benchmark suite.

Implement the three TODOs in `candidate.py`: a trainable actor–critic, generalized
advantage estimation (GAE), and the clipped PPO policy loss. The evaluator owns
rollouts, optimization, resets, evaluation seeds, budgets and artifact recording.

## Setup and run

Use Python 3.12 and an isolated environment. Installation needs internet once;
evaluation itself is offline. Dependencies are pinned to the verified versions.

```sh
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python -r requirements.txt
.venv/bin/python evaluate.py --assessment gym-ppo --seed 17 --scope smoke \
  --candidate candidate.py --output result.json --artifacts runs/smoke-17 --device cpu
.venv/bin/python evaluate.py --assessment gym-ppo --seeds 17,29,43 --scope full \
  --candidate candidate.py --output aggregate.json --artifacts runs/full --device cpu
```

Smoke uses 20,480 training steps. Full uses 65,536. Both use 8 independent
CartPole environments, 128 rollout steps, 4 update epochs, minibatches of 256,
Adam (learning rate 0.002, epsilon 1e-5), gamma 0.99, lambda 0.95, PPO clip 0.2,
value loss coefficient 0.5, entropy coefficient 0.01, and gradient norm clip 0.5.
A pair of 64-unit tanh hidden layers per head is a useful starting architecture.
The CPU backend uses one thread and deterministic PyTorch algorithms.

`--device mps` explicitly returns `unsupported`: this version has not validated
MPS objective/gradient and training parity. It never silently relabels CPU work
as accelerator work.

## Tensor and episode contracts

- `build_policy(4, 2)` returns a PyTorch module mapping `[B,4]` observations to
  unnormalized action logits `[B,2]` and scalar state values `[B]`.
- `gae` receives `[time,environment]` rewards, state values, next-state values,
  true-termination flags, and episode-end flags. True termination removes the
  bootstrap term. Time-limit truncation uses the value of the final observation
  but stops the GAE recurrence across reset. A rollout cutoff bootstraps too.
- `ppo_loss` returns the negative mean of the minimum of unclipped and clipped
  probability-ratio surrogates. Handle negative advantages and retain gradients
  through current log probabilities. Old probabilities and advantages are frozen.

Semantic checks compare actual objective values and autograd gradients, plus
separate termination/truncation/rollout-cutoff GAE fixtures. A constant loss or
incorrect truncation handling fails before training. Learning gates then require
real parameter and policy-output changes, a minimum held-out return, and improvement over random.
See `manifest.json` for the exact versioned thresholds. A failing run remains
failing even when it writes useful diagnostic artifacts.

## Evidence and evaluation discipline

Each run writes:

- `candidate.snapshot.py`: immutable exact evaluated source.
- `config.json`: immutable config, candidate/evaluator/runtime hashes, seed and
  training budget. Reusing its directory with a different config is rejected.
- `learning-curve.jsonl`: one record per update with training episode return,
  completed episode count, steps, loss, approximate KL, clip fraction, gradient
  norm. Zero completed episodes is represented explicitly and is not a zero-return
  episode. Plot returns with episode counts; individual update means are noisy.
- `checkpoint.pt`: model, optimizer, initial parameters, all Python/NumPy/PyTorch
  RNG states, simulator state and RNG, time-limit counters, current observations,
  partial episode returns, current update and full curve.
- `heldout-episodes.json`: final policy and random-baseline returns on matched
  evaluation reset seeds. Smoke uses 12 episodes; full uses 32. Evaluation happens
  once after training, uses deterministic argmax actions, and never feeds gradients,
  early stopping, checkpoint selection, or learning curves.
- The schema-v2 report binds source and evaluator hashes to runtime versions,
  scalar metrics, checks and artifact hashes. The evaluator hash includes the
  manifest, so changing a threshold creates different evidence.

Training starts with seeds `seed*100 + env_index`, then continues each environment's
RNG stream. Evaluation starts with `seed + 1,000,000 + episode_index`; its random
action baseline has a separate RNG. The environment is the same in both sets:
this measures new initial-state/randomness performance, not new-task transfer.
Do not tune a submission repeatedly against its final evaluation episodes and
then claim an untouched test set. Declare additional evaluation seeds before a
final research report and disclose all selection and tuning performed.

Multi-seed mode retains every normal report and config under `artifacts/<seed>`
and produces a separate aggregate envelope. Import the per-seed `result.json`
files as assessment evidence; the aggregate is not a single-run assessment report.
Mean and sample standard deviation summarize variation across training seeds;
the 95% normal-approximation interval is descriptive and especially uncertain at
three seeds. Repeated runs or changed-source runs are not independent replications
of one fixed implementation. Freeze source/config first and report all seeds.

## Resume and process interruption

Every completed PPO update creates an atomic checkpoint. If the process is killed
mid-rollout or mid-update, resume from the most recent completed update; at most
one update is recomputed. No held-out evaluation has occurred at that checkpoint.

```sh
.venv/bin/python evaluate.py --assessment gym-ppo --scope full --seed 17 \
  --candidate candidate.py --output partial.json --artifacts runs/partial \
  --stop-after-updates 7
# The intentionally partial report is failed/non-passing, with an explanatory error.
.venv/bin/python evaluate.py --assessment gym-ppo --scope full --seed 17 \
  --candidate candidate.py --output resumed.json --artifacts runs/resumed \
  --resume runs/partial/checkpoint.pt
```

Resume requires exactly the same source, evaluator, scope, device, package/runtime
and config. Restored learning curves and complete checkpoint state are verified
against uninterrupted CPU runs, not merely compared by approximate score.
Only load your own trusted checkpoints: PyTorch checkpoint deserialization uses
pickle. Copying the checkpoint to another path is fine; changing its contents is
not a valid reproduction.

## Research review

After correctness passes, explain why truncated and terminated episodes differ;
interpret training return, KL and clip fraction together; inspect seed variability
and failures; compare the trained policy with its paired random baseline; and
state what CartPole cannot establish about PPO on larger tasks. Propose an
ablation before running it (for example GAE lambda or clipping), keep its budget
and evaluation protocol fixed, and distinguish the exploratory results from final
evaluation. The pass threshold is a practice gate, not a publication claim.

Algorithm references: Schulman et al., *Proximal Policy Optimization Algorithms*
(arXiv:1707.06347), and *High-Dimensional Continuous Control Using Generalized
Advantage Estimation* (arXiv:1506.02438). Environment: Gymnasium CartPole-v1.
The repository verification script keeps its reference implementation outside
this downloadable workspace.
