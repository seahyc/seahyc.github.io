# Frontier engineering assessments

These exercises run real JAX, Flax and Optax locally. Implement `candidate.py`; the evaluator supplies data, computes independent references and writes evidence. Reading a lesson or a passing smoke run does not establish research readiness. No solution is published with this package.

## Install and run

Python 3.12; tested on Apple silicon CPU. `requirements.txt` pins the complete CPU environment actually installed for verification. Use a separate environment:

```sh
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python -r requirements.txt
.venv/bin/python evaluate.py --assessment jax-training --seed 17 --scope smoke --candidate candidate.py --output result.json
```

Change assessment to `dense-moe`, `scaling-laws`, or `pallas-ragged`. The starter intentionally fails until implemented. Exit 1 means failure; inspect JSON status even with exit 0, because unsupported is not passed. Candidate code is arbitrary trusted local Python, not sandboxed. Do not run untrusted submissions on a privileged host.

## Contracts and scope

**JAX training: causal arithmetic transformer.** Implement a Linen transformer with a 21-token vocabulary (integers 0..18, PLUS=19, EQUALS=20), learned token and length-4 position embeddings, two pre-norm residual blocks, four attention heads, GELU feedforward width 4×model width, final LayerNorm and 21-logit head. Use a causal attention mask and no dropout. Inputs are token prompts `a + b =`; next-token targets encode the integer sum as one vocabulary token. This is autoregressive next-token training with one-token answers, not multi-digit text generation. Train with Optax Adam and cross-entropy only at the last prompt position. `create_state(seed,width,learning_rate)` returns TrainState; `train_step(state,x,y)` updates it with x[B,4] and y[B].

The fixed seed 17 data split (independent of model initialization seed) holds out 20 operand pairs and trains on the other 80. Evaluation generates answers with argmax at the next position, independently checks causal noninterference by changing future tokens, compares the entire first optimizer update with an independent jitted autodiff step, and checks serialized checkpoint continuation. Smoke width 32 has 26,965 reference parameters, 500 steps and learning rate .003. Full width 640 has 9,877,781 reference parameters, 300 steps and learning rate .0003. Full parameter count must be 9–11 million. Architecture inspection remains a manual gate: parameter counts and output tests alone cannot prove the model's internal architecture.

The generation gate is deliberately modest (20% exact match against 21 output tokens, uniform chance 4.76%); heldout cross-entropy must remain below 2× its initial value. The report includes the train-majority baseline on the 20 heldout examples. this is an engineering exercise on a tiny dataset, not evidence of arithmetic mastery. Reports expose train and heldout accuracy and cross-entropy separately. Extended model-quality review requires substantially higher heldout arithmetic accuracy and an explanation of the remaining gap. Review overfitting and propose a richer task/data split before claiming arithmetic mastery. A smoke pass never satisfies the full gate.

**Dense vs MoE.** Inputs [T,D], E expert MLPs D→F→D, relu, no bias, top-k router. Normalize the selected logits, dispatch each token to exactly k experts, then weighted combine. Return output, indices and weights. Smoke uses T=24,D=8,F=32,E=4,k=2. Compare against a dense MLP of width kF, matching active expert matrix multiplications; MoE additionally pays router compute. Count actual arrays, not nominal model size. Costs count only matmul operations with multiply-add=2; report dispatch, softmax, communication and load balance overhead separately. The evaluator validates forward results, gradients for inputs/router/both expert matrices, coverage, token preservation and costs. A human must inspect the dispatch implementation or profiler to verify unselected experts are not computed: numerical tests alone cannot establish sparse execution. Full adds larger shapes with k=1, k=3 and k=all, random and heavily skewed routing including unused experts, and 200 actual Adam steps for both models on the same teacher target. Active expert matmul FLOPs are matched; router FLOPs are explicitly additional. It records each final loss, loss reduction and end-to-end training time including compilation; no speed advantage is assumed.

**Scaling laws.** Derive the stationary condition for L=E+A/N^α+B/D^β with C=6ND, A,B,α,β>0. Explain elimination of D, differentiate with respect to log N, show the minimizer is unique and extract the compute exponents. E does not affect the minimizer. Submit that written derivation separately for human review; the executable gate only checks `compute_optimal` on 12 smoke or 128 full randomized budgets/constants against finite differences and a dense numerical constrained search. No symbolic mastery is granted by this report.

**Pallas ragged.** Implement `pallas_call` for sorted tokens [T,D] and expert weights [E,D,F]. Segment sizes may be zero and uneven. Preserve the expansion workload **F>D**: correctness uses D=16,F=32; hardware benchmark uses D=128,F=512. Check both an independent per-row reference and `jax.lax.ragged_dot`. CPU executes interpret mode only. Smoke can pass correctness alone; it never grants accelerator performance credit. Full on CPU is `unsupported` with `accelerator_performance`, even when every correctness check passes. GPU/TPU runs require a backend compatible implementation and dependencies for that hardware (CPU lockfile alone does not install CUDA). `--scope accelerator` on CPU explicitly returns unsupported. Benchmark warms both implementations, synchronizes every invocation with `block_until_ready`, and reports medians over 10 repetitions. Actual speedup is measured, never assumed. Full and accelerator require at least 1.05× speedup against synchronized JAX ragged_dot on the benchmark workload. Accelerator correctness and performance have not been verified on the development CPU.

JSON hashes bind the candidate file and evaluator file; runtime includes installed package versions and device. Dependencies imported by a candidate are not captured by its single-file hash. This is reviewable local evidence, not signed proof: a user can edit JSON or evaluator. Scope is always part of the claim. Acceptance details live in `manifest.json`; manual gates remain manual and are not awarded by the CLI.

## Primary API references

- https://flax.readthedocs.io/en/latest/api_reference/flax.training.html
- https://optax.readthedocs.io/en/stable/_collections/examples/flax_example.html
- https://docs.jax.dev/en/latest/pallas/quickstart.html
- https://docs.jax.dev/en/latest/pallas/grid_blockspec.html
- https://docs.jax.dev/en/latest/_autosummary/jax.lax.ragged_dot.html

APIs checked against installed versions recorded in the lockfile. Timings are machine-specific; evaluator reports compilation separately for training and excludes compilation from steady hardware kernel measurements.

Development verification uses Python 3.12.12, JAX/jaxlib 0.11.2, Flax 0.12.9, Optax 0.2.8 on macOS arm64 CPU. The private reference transformer has 9,877,781 parameters and trains 300 steps in about 18 CPU seconds. This tiny split overfits: train accuracy 100%, heldout 25%; reports preserve that gap. These are evaluator regression results, not learner submissions. Pallas CPU max error 0; accelerator hardware unverified.

Additional real reference runs used the same heldout pairs and unchanged gates across initialization seeds:

| Seed | Smoke exact match | Full exact match | Full heldout CE / initial CE |
| --- | ---: | ---: | ---: |
| 17 | 20% | 25% | 1.733 |
| 29 | 70% | 50% | 0.990 |
| 43 | 40% | 35% | 1.214 |

All passed the minimum engineering gate; none establishes high arithmetic accuracy. Twenty heldout examples give coarse 5-point increments, so report uncertainty and expand evaluation before model-quality claims. GPU/TPU throughput and speedup still require hardware execution; the performance gate requires positive throughput and measured speedup of at least 1.05×. A human also reviews whether the workload and optimization are useful. The private CPU correctness reference is not a GPU optimization and is not expected to satisfy this hardware speedup gate.
