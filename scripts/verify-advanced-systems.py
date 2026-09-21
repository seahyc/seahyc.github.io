#!/usr/bin/env python3
"""Repository-only reference and regression probes; never ship in learner assets."""
import importlib.util
import json
import tempfile
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]/'static/practice/lab/advanced/systems'
REFERENCE=r'''
import hashlib
import json
import math
import os
from pathlib import Path

def audit_splits(records):
    splits={}
    for r in records: splits.setdefault(tuple(sorted(r['operands'])),set()).add(r['split'])
    return sorted(r['id'] for r in records if len(splits[tuple(sorted(r['operands']))])>1)

def reward(response,expected,max_chars):
    return float(len(response)<=max_chars and response.strip()==str(expected))

def normalize_rewards(rewards):
    mean=math.fsum(rewards)/len(rewards)
    sd=math.sqrt(math.fsum((v-mean)**2 for v in rewards)/len(rewards))
    return [(v-mean)/sd if sd else 0. for v in rewards]

def rollout_targets(transitions,gamma):
    return [x['reward']+(0 if x['terminated'] else gamma*x['next_value']) for x in transitions]

def aggregate_rollouts(chunks,current_version,consumed_ids):
    unique={x['id']:x for x in chunks if x['version']==current_version and x['id'] not in consumed_ids}
    ids=sorted(unique)
    return dict(ids=ids,total_reward=math.fsum(v for key in ids for v in unique[key]['rewards']))

def save_checkpoint(directory,state,interrupt_at=None):
    root=Path(directory); root.mkdir(parents=True,exist_ok=True)
    generations=[int(p.stem.split('_')[1]) for p in root.glob('commit_*.json')]
    generation=max(generations,default=-1)+1
    payload=json.dumps(state,sort_keys=True)
    record=json.dumps(dict(payload=payload,checksum=hashlib.sha256(payload.encode()).hexdigest()))
    staging=root/'staging.tmp'
    with staging.open('w') as f:
        f.write(record)
        if interrupt_at=='after_write': raise OSError('injected after write')
        f.flush(); os.fsync(f.fileno())
    if interrupt_at=='before_commit': raise OSError('injected before commit')
    os.replace(staging,root/f'commit_{generation:08d}.json')

def load_checkpoint(directory):
    for p in sorted(Path(directory).glob('commit_*.json'),reverse=True):
        try:
            record=json.loads(p.read_text()); payload=record['payload']
            if hashlib.sha256(payload.encode()).hexdigest()!=record['checksum']: continue
            return json.loads(payload)
        except (ValueError,KeyError,UnicodeError): continue
    raise ValueError('no valid checkpoint')

def admit_request(request_id,pending_ids,completed_ids,capacity):
    return request_id not in pending_ids and request_id not in completed_ids and len(pending_ids)<capacity

def robot_action(observation,goal,action_limit):
    return max(-action_limit,min(action_limit,2*(goal-observation[0])-2.5*observation[1]))
'''

BROKEN={
'reward-audit': "\ndef reward(response,expected,max_chars): return float(str(expected) in response)\n",
'rollout-boundary': "\ndef rollout_targets(transitions,gamma): return [x['reward']+(0 if x['terminated'] or x['truncated'] else gamma*x['next_value']) for x in transitions]\n",
'checkpoint-recovery': "\ndef load_checkpoint(directory):\n    for p in sorted(Path(directory).glob('commit_*.json'),reverse=True):\n        try:\n            state=json.loads(json.loads(p.read_text())['payload']); state['momentum']=0.; return state\n        except (ValueError,KeyError,UnicodeError): pass\n    raise ValueError('missing')\n",
'robot-shift': "\ndef robot_action(observation,goal,action_limit): return 10*(goal-observation[0])\n",
}
HARDCODED={
'reward-audit': "\ndef audit_splits(records): return []\n",
'rollout-boundary': "\ndef aggregate_rollouts(chunks,current_version,consumed_ids): return dict(ids=[],total_reward=0.)\n",
'checkpoint-recovery': "\ndef admit_request(request_id,pending_ids,completed_ids,capacity): return True\n",
'robot-shift': "\ndef robot_action(observation,goal,action_limit): return 0.\n",
}


def main():
    spec=importlib.util.spec_from_file_location('systems_evaluator',ROOT/'evaluate.py')
    evaluator=importlib.util.module_from_spec(spec); spec.loader.exec_module(evaluator)
    count=0
    with tempfile.TemporaryDirectory() as directory:
        reference=Path(directory)/'reference.py'; reference.write_text(REFERENCE)
        for assessment in BROKEN:
            for seed in [17,113,271]:
                for scope in ['smoke','full']:
                    report=evaluator.run(assessment,seed,scope,reference)
                    assert report['status']=='passed',report
                    assert all(report['checks'].values()),report
                    json.dumps(report,allow_nan=False)
                    print(assessment,seed,scope,'reference',report['status'],json.dumps(report['metrics'],sort_keys=True)); count+=1
            unsupported=evaluator.run(assessment,17,'accelerator',reference)
            assert unsupported['status']=='unsupported' and unsupported['unsupported']
            print(assessment,'accelerator unsupported'); count+=1
            for kind,content in [('starter',(ROOT/'candidate.py').read_text()),('broken',REFERENCE+BROKEN[assessment]),('hardcoded',REFERENCE+HARDCODED[assessment])]:
                path=Path(directory)/(assessment+'-'+kind+'.py'); path.write_text(content)
                report=evaluator.run(assessment,811,'full',path)
                assert report['status']=='failed',(assessment,kind,report)
                print(assessment,kind,'failed as required',json.dumps(report['checks'],sort_keys=True)); count+=1
    print(f'PASS: {count} reference, unsupported and negative assessment runs')


if __name__=='__main__': main()
