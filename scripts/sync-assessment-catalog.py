"""Synchronize reviewable assessment criteria into the static catalog; no user data."""
import json, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'static/practice/lab'
p=ROOT/'program.json'; program=json.loads(p.read_text())
# Existing mission IDs remain stable so saved notes and evidence survive.
bindings={
 'posttrain-repro':('torch','transformer-posttrain'),
 'rl-repro':('torch','ppo-control'),
 'gym-ppo':('gym','gym-ppo'),
 'infra-repro':('torch','attention-kernel'),
 'robotics-repro':('torch','visual-policy'),
 'posttrain-stress':('systems','reward-audit'),
 'rl-stress':('systems','rollout-boundary'),
 'infra-stress':('systems','checkpoint-recovery'),
 'robotics-stress':('systems','robot-shift'),
 'jax-training':('jax','jax-training'),
 'dense-moe':('jax','dense-moe'),
 'scaling-laws':('jax','scaling-laws'),
 'pallas-ragged':('jax','pallas-ragged'),
}
coverage={
 'gym-ppo':'Executable scope: real PyTorch PPO training in pinned Gymnasium CartPole-v1 on your CPU. Includes held-out episodes, a paired random baseline, three-seed reports, hashed configs and exact deterministic checkpoint resume. MPS is explicitly unsupported pending parity validation; larger control benchmarks remain research extensions.',
 'transformer-posttrain':'Executable scope: a small numeric-input, single-answer-token transformer; real SFT, DPO and GRPO updates. Multi-token language modeling and a TRL reproduction remain research extensions.',
 'ppo-control':'Executable scope: real PPO training in a custom multi-step point-navigation simulator. The next gym-ppo mission reproduces PPO in Gymnasium; distributed training remains a research extension.',
 'visual-policy':'Executable scope: train a CNN from synthetic images and evaluate closed-loop control under shifted rendering and dynamics. LeRobot datasets, ACT/diffusion policies and physical robots remain research extensions.',
 'attention-kernel':'Executable scope: attention values, gradients, masks and timed-shape parity; a CUDA run must demonstrate at least 1.05x speedup over native SDPA. CPU passing results do not satisfy the accelerator gate.',
 'reward-audit':'Executable scope: seeded split contamination, strict verifiable rewards and reward normalization. Audit a trained model and real data pipeline in the research extension.',
 'rollout-boundary':'Executable scope: bootstrapping plus simulated stale, duplicate and reordered worker chunks. Actual distributed concurrency and network failures remain research extensions.',
 'checkpoint-recovery':'Executable scope: interrupted writes, corrupted files, optimizer/RNG resume and simulated bounded-queue retries. Physical crash durability and concurrent production serving remain research extensions.',
 'robot-shift':'Executable scope: one-dimensional feedback recovery under dynamics changes, noise and impulses. This gate evaluates a controller, not learned visual recovery; the learned-policy investigation below remains a research extension.',
 'jax-training':'Executable scope: causal Flax transformer, Optax updates, checkpoint resume and heldout answer generation; full is about 10M parameters. The engineering gate accepts limited generalization. Improving model quality requires the research review.',
 'dense-moe':'Executable scope: routed expert outputs/gradients, multiple shapes, parameter/FLOP accounting and comparative training. A profile or source review must still establish sparse execution.',
 'scaling-laws':'Executable scope: randomized constrained optima checked by finite differences and numerical search. The symbolic derivation still requires review.',
 'pallas-ragged':'Executable scope: Pallas ragged expansion correctness including empty groups; accelerator completion requires measured 1.05x speedup. CPU interpretation only satisfies smoke.',
}
definitions={}
for package in ['jax','torch','systems','gym']:
 for a in json.loads((ROOT/'advanced'/package/'manifest.json').read_text())['assessments']:
  definitions[a['id']]=a
program['assessments']=definitions
for m in program['missions']:
 if m['id'] not in bindings: continue
 package,assessment=bindings[m['id']]; definition=definitions[assessment]
 files=sorted(set(definition['files'])|{'manifest.json'})
 m['runtime']={'package':package,'assessment':assessment,'browser':package=='systems','files':files,'coverage':coverage[assessment],'requiredScope':'accelerator' if assessment in ('attention-kernel','pallas-ragged') else 'full'}
 # Keep scientific protocol and artifact reviews; automated scope is an additional gate.
 marker='Executable gate: '
 m['protocol']=[v for v in m['protocol'] if not v.startswith(marker)]
 m['protocol'].insert(0,marker+('run in this browser, or select Mac CPU and pair the local runner. ' if package=='systems' else 'select Mac CPU and pair the local runner; alternatively download the workspace and use its README. ')+f"python evaluate.py --assessment {assessment} --seed 17 --scope smoke --candidate candidate.py --output result.json")
 m['evaluation']=[v for v in m['evaluation'] if not v.startswith('Progress gate: ')]
 m['evaluation'].append(f"Progress gate: three passing {m['runtime']['requiredScope']} reports from the same source and evaluator on distinct seeds, findings, artifact, and a recorded independent review. Smoke reports alone never finish this project. Imported JSON is user-supplied evidence, not authenticated proof.")
serialized=json.dumps(program,indent=2,ensure_ascii=False)+'\n'
if '--write' in sys.argv:p.write_text(serialized)
else:assert p.read_text()==serialized,'Catalog/manifests differ; run sync-assessment-catalog.py --write'
print(f'PASS catalog criteria and runtime bindings match {len(definitions)} runnable assessments')
