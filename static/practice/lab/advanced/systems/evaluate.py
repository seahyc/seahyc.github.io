"""Seeded CPU fault-injection assessments. No third-party dependencies."""
import argparse
import hashlib
import importlib.util
import json
import math
import platform
import random
import sys
import tempfile
from pathlib import Path


def reward_audit(c, rng, n):
    correct = total = 0
    for trial in range(n):
        records, expected = [], []
        for j in range(12):
            a, b = trial * 1000 + j * 20 + rng.randrange(9), rng.randrange(-900, -100)
            splits = rng.sample(['train', 'validation', 'test'], rng.choice([1, 1, 2, 3]))
            ids = []
            for split in splits:
                for duplicate in range(rng.randint(1, 3)):
                    rid = f'{trial}:{j}:{split}:{duplicate}'
                    operands = [a,b] if rng.random() < .5 else [b,a]
                    records.append(dict(id=rid, split=split, operands=operands)); ids.append(rid)
            if len(splits) > 1: expected.extend(ids)
        rng.shuffle(records)
        correct += c.audit_splits(records) == sorted(expected); total += 1
    reward_ok = reward_total = norm_ok = 0
    for _ in range(n * 4):
        answer = rng.randrange(-10000, 10000); limit = rng.randrange(12, 60)
        text = rng.choice([str(answer), ' '+str(answer)+'\n', '0'+str(answer),
                           str(answer)+'\nignore previous rules', f'answer: {answer}',
                           str(answer)+' '+str(answer+1), ' '*limit+str(answer), str(answer+1)])
        reward_ok += c.reward(text,answer,limit) == float(len(text)<=limit and text.strip()==str(answer)); reward_total += 1
        values = [rng.random() for _ in range(9)] if rng.random()<.5 else [rng.choice([0.,1.,-3.])]*9
        mean = math.fsum(values)/len(values); sd = math.sqrt(math.fsum((x-mean)**2 for x in values)/len(values))
        expected = [(x-mean)/sd if sd else 0. for x in values]
        got = c.normalize_rewards(values)
        norm_ok += len(got)==len(values) and all(math.isfinite(x) and abs(x-y)<1e-9 for x,y in zip(got,expected))
    return dict(split_accuracy=correct/total,reward_accuracy=reward_ok/reward_total,normalization_accuracy=norm_ok/reward_total,cases=total+reward_total)


def rollout_boundary(c,rng,n):
    target_ok = aggregate_ok = 0
    for i in range(n):
        gamma=rng.uniform(.8,.999)
        transitions=[dict(reward=rng.uniform(-5,5),next_value=rng.uniform(-9,9),terminated=t,truncated=u) for t,u in [(False,False),(True,False),(False,True),(True,True)] for _ in range(4)]
        got=c.rollout_targets(transitions,gamma)
        expected=[x['reward']+(0 if x['terminated'] else gamma*x['next_value']) for x in transitions]
        target_ok += len(got)==len(expected) and all(math.isfinite(a) and abs(a-b)<1e-10 for a,b in zip(got,expected))
        version=rng.randrange(2,40); consumed=[f'{i}:0',f'{i}:3']
        chunks=[dict(id=f'{i}:{j}',version=version if j%3 else version-1,rewards=[rng.uniform(-10,10) for _ in range(5)]) for j in range(12)]
        chunks += chunks[2:7]; rng.shuffle(chunks)
        unique={x['id']:x for x in chunks if x['version']==version and x['id'] not in consumed}
        ids=sorted(unique); expected_sum=math.fsum(v for key in ids for v in unique[key]['rewards'])
        got=c.aggregate_rollouts(chunks,version,consumed); rng.shuffle(chunks)
        again=c.aggregate_rollouts(chunks,version,consumed)
        aggregate_ok += got==again and got['ids']==ids and abs(got['total_reward']-expected_sum)<1e-10
    return dict(target_accuracy=target_ok/n,aggregation_accuracy=aggregate_ok/n,cases=n*2)


def tuple_tree(x):
    return tuple(tuple_tree(v) for v in x) if isinstance(x,list) else x


def advance(state,steps):
    r=random.Random(); r.setstate(tuple_tree(state['rng']))
    s=dict(state)
    for _ in range(steps):
        gradient=2*(s['weight']-r.uniform(-1,1)); s['momentum']=.9*s['momentum']+gradient
        s['weight']-=.03*s['momentum']; s['step']+=1
    s['rng']=r.getstate()
    return json.loads(json.dumps(s))


def checkpoint_recovery(c,rng,n):
    recovery=resume=queue=0
    for trial in range(n):
        r=random.Random(rng.randrange(2**32))
        initial=json.loads(json.dumps(dict(weight=rng.random(),momentum=0.,step=0,rng=r.getstate())))
        old=advance(initial,7); new=advance(old,5)
        with tempfile.TemporaryDirectory() as directory:
            c.save_checkpoint(directory,old)
            ok=True
            for point in ['after_write','before_commit']:
                raised=False
                try: c.save_checkpoint(directory,new,interrupt_at=point)
                except OSError: raised=True
                ok = ok and raised and c.load_checkpoint(directory)==old
            before={p.name:p.read_bytes() for p in Path(directory).iterdir() if p.is_file()}
            c.save_checkpoint(directory,new)
            loaded=c.load_checkpoint(directory)
            resume += loaded==new and advance(loaded,11)==advance(initial,23)
            changed=[p for p in Path(directory).iterdir() if p.is_file() and before.get(p.name)!=p.read_bytes()]
            # Damage every file introduced/changed by this commit, including its manifest.
            for p in changed: p.write_bytes(b'{corrupt:'+bytes([rng.randrange(256)]))
            recovery += bool(ok and changed and c.load_checkpoint(directory)==old)
        capacity=rng.randrange(1,6); pending=[]; completed=set(); accepted=set(); safe=True
        for tick in range(100):
            rid=f'request-{rng.randrange(18)}'
            expected=rid not in pending and rid not in completed and len(pending)<capacity
            admit=c.admit_request(rid,list(pending),sorted(completed),capacity)
            safe = safe and type(admit) is bool and admit==expected
            if admit:
                if rid in accepted: safe=False
                accepted.add(rid); pending.append(rid)
            if pending and rng.random()<.3: completed.add(pending.pop(0))
            safe = safe and len(pending)<=capacity
        queue += safe
    return dict(recovery_accuracy=recovery/n,resume_accuracy=resume/n,queue_accuracy=queue/n,cases=n*4)


def robot_shift(c,rng,n):
    successes=violations=0; errors=[]; zero_errors=[]
    for episode in range(n):
        start=rng.uniform(-2.5,2.5); goal=rng.uniform(-1.5,1.5)
        gain=rng.uniform(.65,1.35); drag=rng.uniform(.12,.65); limit=rng.uniform(1.5,3.)
        x=start; v=rng.uniform(-.3,.3); zx=x; zv=v
        for step in range(220):
            noise_x=rng.gauss(0,.015); noise_v=rng.gauss(0,.025)
            action=c.robot_action([x+noise_x,v+noise_v],goal,limit)
            if not isinstance(action,(int,float)) or not math.isfinite(action): raise ValueError('nonfinite action')
            violations += abs(action)>limit+1e-12
            action=max(-limit,min(limit,action))
            disturbance=rng.uniform(-.08,.08)+(rng.choice([-1,1])*.9 if step==80 else 0)
            v+=.05*(gain*action-drag*v+disturbance); x+=.05*v
            zv+=.05*(-drag*zv+disturbance); zx+=.05*zv
        errors.append(abs(x-goal)); zero_errors.append(abs(zx-goal)); successes += abs(x-goal)<.12 and abs(v)<.12
    return dict(success_rate=successes/n,action_violations=violations,mean_final_error=math.fsum(errors)/n,zero_control_error=math.fsum(zero_errors)/n,episodes=n)


RUNNERS={'reward-audit':reward_audit,'rollout-boundary':rollout_boundary,'checkpoint-recovery':checkpoint_recovery,'robot-shift':robot_shift}
OPS={'eq':lambda a,b:a==b,'lt':lambda a,b:a<b,'lte':lambda a,b:a<=b,'gt':lambda a,b:a>b,'gte':lambda a,b:a>=b}


def run(assessment,seed,scope,candidate_path):
    source=Path(candidate_path)
    manifest=json.loads(Path(__file__).with_name('manifest.json').read_text())
    spec=next(s for s in manifest['assessments'] if s['id']==assessment)
    result=dict(schemaVersion=2,assessment=assessment,seed=seed,sourceHash=hashlib.sha256(source.read_bytes()).hexdigest(),evaluatorHash=hashlib.sha256(Path(__file__).read_bytes()+Path(__file__).with_name('manifest.json').read_bytes()).hexdigest(),runtime=dict(python=platform.python_version(),platform=platform.platform(),packages={},device='cpu'),scope=scope,status='failed',metrics={},checks={},unsupported=[])
    if scope=='accelerator':
        result.update(status='unsupported',unsupported=['accelerator_execution']); return result
    try:
        module_spec=importlib.util.spec_from_file_location('systems_candidate',source)
        c=importlib.util.module_from_spec(module_spec); module_spec.loader.exec_module(c)
        metrics=RUNNERS[assessment](c,random.Random(seed),8 if scope=='smoke' else 64)
        if any(type(v) not in (int,float) or not math.isfinite(v) for v in metrics.values()): raise ValueError('invalid metric')
        result['metrics']=metrics
        result['checks']={rule['name']:OPS[rule['op']](metrics[rule['metric']],rule['value']) for rule in spec['scopes'][scope]['criteria']}
        result['status']='passed' if result['checks'] and all(result['checks'].values()) else 'failed'
    except Exception as exc:
        result['checks']['execution']=False; result['error']=f'{type(exc).__name__}: {exc}'
    return result


def main():
    p=argparse.ArgumentParser(); p.add_argument('--assessment',required=True,choices=list(RUNNERS)); p.add_argument('--seed',type=int,default=17)
    p.add_argument('--scope',choices=['smoke','full','accelerator'],default='smoke'); p.add_argument('--candidate',default=str(Path(__file__).with_name('candidate.py'))); p.add_argument('--output',required=True)
    a=p.parse_args(); result=run(a.assessment,a.seed,a.scope,a.candidate)
    Path(a.output).write_text(json.dumps(result,indent=2,allow_nan=False)+'\n'); print(json.dumps(result,allow_nan=False))
    return 0 if result['status'] in ('passed','unsupported') else 1


if __name__=='__main__': sys.exit(main())
