# Native PyTorch assessment workspace

These are executable learning assessments, not a claim of frontier research readiness.
Install Python 3.12 in a fresh virtual environment, then install the exact dependency
versions in `requirements.txt`. No weights, datasets, API keys or network calls are
used by the evaluator.

```sh
python3.12 -m venv .venv
. .venv/bin/activate
python -m pip install -r requirements.txt
python evaluate.py --assessment transformer-posttrain --seed 17 --scope smoke --candidate candidate.py --output result.json
```

Implement the TODO functions in `candidate.py`. The evaluator supplies data,
training loops, optimizers, rollouts and independent numerical checks. Read the
API docstrings before implementing. Run the same command with assessment IDs
`ppo-control`, `visual-policy` or `attention-kernel`. A TODO submission fails.
A nonzero exit code means failed checks or an implementation error. An unsupported
scope produces a JSON report with `status: "unsupported"` and exit code zero;
it is **not** a passing assessment.

`manifest.json` contains machine-readable criteria for every supported scope.
Reports use schema version 2, exact candidate SHA-256 and evaluator-bundle SHA-256 hashes, runtime,
flat numeric metrics, checks and unsupported gates. The evaluator hash is
SHA-256 of `evaluate.py` bytes + one NUL byte + `manifest.json` bytes, so
changing a grading threshold invalidates the previous evaluator identity. They are local evidence and
can be edited: they are not tamper-proof certificates. Preserve the submitted
source and evaluator alongside every report. Do not import a report from an
edited evaluator as if it came from the published evaluator.

## What actually runs

| Assessment | Smoke | Full | What passing establishes |
|---|---|---|---|
| `transformer-posttrain` | 220 SFT updates; 20 updates per preference branch | 700 SFT updates; 60 updates per branch | Causal attention, masked CE and objective/autograd correctness; training and heldout arithmetic; separate DPO and GRPO updates |
| `ppo-control` | 53,760 environment steps | 153,600 environment steps | Multi-step PPO control, GAE terminal/truncation semantics, clipping signs and success on 128 fresh episodes |
| `visual-policy` | 240 minibatches of 96 images | 650 minibatches | A trained CNN controls a synthetic point robot from images in 256 closed-loop evaluation episodes including a shift |
| `attention-kernel` | 32 dtype/shape/mask cases | 64 cases including the 512-token CUDA shape | CPU output, gradient, fully masked row, numerical stress and causality parity against native SDPA |

**Transformer:** This is a small single-block causal transformer (48 hidden
units, 3 heads), trained from scratch on addition of two single-digit integers.
Inputs contain scaled numeric token values and learned positions. The answer
head maps a learned scalar to a fixed ordered answer vocabulary using squared
distance logits with learned precision. This deliberate numeric inductive bias makes CPU learning
reliable; it is not an unconstrained language model or a 1–10M parameter
reproduction. The final answer is one completion token, with shifted targets
and prompt loss masking. Operand tuples are disjoint: `(7*a + 3*b) % 5 == 0`
is held out (20 tuples); the remaining 80 train all branches. DPO compares exact
answers to corrupted answers. GRPO samples groups of eight, uses exact-match
rewards, standardized within-group advantages, frozen behavior log-probabilities,
a sampled reference KL estimator and two update epochs. Both branches start
from the same SFT checkpoint and count 8 response tokens per prompt/update;
this equalizes response-token counts, **not wall-clock or FLOPs**. Heldout
checks require SFT generalization and constrain deterioration after the preference
updates. They do not require or establish that DPO/GRPO beats SFT. Carry/longer-digit
generalization, multi-token generation, tokenizer work and TRL reproduction
remain additional research work.

**PPO:** The native simulator is a one-dimensional point robot with 3 discrete
control actions, a sampled goal, a 24-step time limit and true terminal success.
It is not Gymnasium CartPole or continuous-control reproduction. All 64 rollout
environments use current stochastic policy actions. The evaluator computes
separate next-state values before reset, trains value and policy networks with
4 shuffled epochs, and evaluates deterministic actions from wider heldout starts
with disturbances. Baseline random rollouts use the same evaluation seed.
A separate fixed rollout includes a truncation without termination to catch
incorrect bootstrapping. Success means reaching the goal at least once; the
final-distance check additionally rejects policies that subsequently leave it.

**Vision:** The simulator renders a point robot and target as two Gaussian image
channels. The candidate CNN receives only images; expert labels are used only
for imitation training. Training and evaluation random generators are separate;
heldout starts are wider. Shifted episodes change marker brightness, image
noise and add constant drift. No real camera, robot hardware, contact dynamics,
language conditioning, diffusion policy, public robotics dataset or sim-to-real
claim is involved. A constant policy and a no-update policy fail the gates.

**Attention:** True means attend in the boolean mask. The suite includes empty
rows, padding masks, extreme logits, awkward dimensions and causal perturbations.
Before timing, correctness compares both outputs and q/k/v gradients with PyTorch
SDPA at every timed shape/dtype, with causal, padding, empty-row and stress masks.
The full CPU suite also checks the exact 512-token CUDA benchmark shape. CPU
latency is measured locally but does not establish accelerator performance.

```sh
python evaluate.py --assessment attention-kernel --seed 17 --scope accelerator --candidate candidate.py --output cuda-result.json
```

The accelerator scope requires CUDA; Apple MPS and CPU return `unsupported`.
It tests float32/float16/bfloat16 correctness and measures synchronized, warmed
CUDA latency and peak allocated memory. Passing additionally requires 1.05x
speedup over native SDPA at the recorded benchmark shape. Calling native SDPA
is a valid CPU reference but does not reliably pass this performance gate.
A single-shape speedup is not a universal kernel optimization claim. Other
assessments currently have no accelerator scope. Full runs use larger budgets;
a smoke result never substitutes for a full or accelerator result.

## Reproduction discipline

Start with seed 17. Freeze source before using 113, 271 and 811, retain failures,
and have a peer choose additional seeds and altered conditions. These public
checks catch implementation mistakes and plausible failed learners; a malicious
submission can inspect the process. Do not treat them as a secure exam.
A development-only verifier in the site repository runs correct framework
references, public TODOs and broken candidates through this same CLI. It is
intentionally excluded from the learner download. Its default command runs
smoke positive/negative tests and full references, plus a long-sequence-only
broken attention candidate to prevent correctness/benchmark shape gaps.

Framework references:
- [PyTorch scaled dot product attention](https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html)
- [DPO paper](https://arxiv.org/abs/2305.18290)
- [Spinning Up PPO](https://spinningup.openai.com/en/latest/algorithms/ppo.html)
