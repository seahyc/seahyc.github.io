#!/usr/bin/env python3
"""Private repository verifier: reference is intentionally excluded from static packs."""
import argparse, json, subprocess, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PACK=ROOT/'static/practice/lab/advanced/gym'
REFERENCE='''import torch
from torch import nn
class Policy(nn.Module):
    def __init__(self, obs_dim, action_dim):
        super().__init__()
        self.actor=nn.Sequential(nn.Linear(obs_dim,64),nn.Tanh(),nn.Linear(64,64),nn.Tanh(),nn.Linear(64,action_dim))
        self.critic=nn.Sequential(nn.Linear(obs_dim,64),nn.Tanh(),nn.Linear(64,64),nn.Tanh(),nn.Linear(64,1))
        for m in self.modules():
            if isinstance(m,nn.Linear): nn.init.orthogonal_(m.weight,2**.5);nn.init.zeros_(m.bias)
        nn.init.orthogonal_(self.actor[-1].weight,.01);nn.init.orthogonal_(self.critic[-1].weight,1.)
    def forward(self,x):return self.actor(x),self.critic(x).squeeze(-1)
def build_policy(obs_dim,action_dim):return Policy(obs_dim,action_dim)
def gae(rewards,values,next_values,terminated,episode_ends,gamma,lam):
    out=torch.zeros_like(values);carry=torch.zeros_like(values[0])
    for t in reversed(range(len(rewards))):
        carry=rewards[t]+gamma*next_values[t]*(~terminated[t])-values[t]+gamma*lam*(~episode_ends[t])*carry
        out[t]=carry
    return out,out+values
def ppo_loss(logp,old_logp,advantages,clip):
    ratio=(logp-old_logp).exp()
    return -torch.minimum(ratio*advantages,ratio.clamp(1-clip,1+clip)*advantages).mean()
'''

def main():
    p=argparse.ArgumentParser();p.add_argument('--python',default='/tmp/frontier-gym-venv/bin/python');p.add_argument('--scope',choices=['smoke','full'],default='smoke');p.add_argument('--workdir',type=Path);a=p.parse_args()
    work=a.workdir or Path(tempfile.mkdtemp(prefix='verify-gym-'));work.mkdir(parents=True,exist_ok=True)
    ref=work/'reference.py';ref.write_text(REFERENCE)
    def run(name,candidate=ref,extra=(),expect='passed'):
        output=work/(name+'.json');cmd=[a.python,str(PACK/'evaluate.py'),'--assessment','gym-ppo','--scope',a.scope,'--candidate',str(candidate),'--output',str(output),'--artifacts',str(work/name),*extra]
        proc=subprocess.run(cmd,text=True,capture_output=True);r=json.loads(output.read_text())
        assert r['status']==expect,(name,proc.returncode,r,proc.stderr)
        print(name,r['status'],r.get('metrics') or r.get('statistics') or r.get('error'),flush=True)
        return r
    run('todo',PACK/'candidate.py',expect='failed')
    broken=work/'broken.py';broken.write_text(REFERENCE.replace('return -torch.minimum(ratio*advantages,ratio.clamp(1-clip,1+clip)*advantages).mean()','return (logp*0).mean()'))
    run('broken-gradient',broken,expect='failed')
    truncated=work/'bad-truncation.py';truncated.write_text(REFERENCE.replace('next_values[t]*(~terminated[t])','next_values[t]*(~episode_ends[t])'))
    run('broken-truncation',truncated,expect='failed')
    frozen=work/'frozen-policy.py';frozen.write_text(REFERENCE.replace('self.actor(x),self.critic(x).squeeze(-1)',"torch.stack((-(x[:,2]+x[:,3]),x[:,2]+x[:,3]),-1)*20,self.critic(x).squeeze(-1)"))
    fixed=run('fixed-policy',frozen,expect='failed')
    assert fixed['checks'].get('policy_learned') is False
    full=run('uninterrupted',extra=['--seed','17'])
    run('partial',extra=['--seed','17','--stop-after-updates','7'],expect='failed')
    resumed=run('resumed',extra=['--seed','17','--resume',str(work/'partial/checkpoint.pt')])
    assert full['metrics']==resumed['metrics'],'Resume final metrics differ'
    assert (work/'uninterrupted/learning-curve.jsonl').read_bytes()==(work/'resumed/learning-curve.jsonl').read_bytes(),'Resume curve differs'
    # Compare every tensor in model/optimizer and all RNG state via helper subprocess.
    code='''import torch,sys,numpy as np
x=torch.load(sys.argv[1],weights_only=False);y=torch.load(sys.argv[2],weights_only=False)
def same(a,b):
 if isinstance(a,torch.Tensor):return torch.equal(a,b)
 if isinstance(a,np.ndarray):return np.array_equal(a,b)
 if isinstance(a,dict):return a.keys()==b.keys() and all(same(a[k],b[k]) for k in a)
 if isinstance(a,(list,tuple)):return len(a)==len(b) and all(same(u,v) for u,v in zip(a,b))
 return a==b
assert same(x,y),'Checkpoint differs'
print('checkpoint model/optimizer/environment/RNG exact equality')
'''
    subprocess.run([a.python,'-c',code,str(work/'uninterrupted/checkpoint.pt'),str(work/'resumed/checkpoint.pt')],check=True)
    print('deterministic resume: exact curve + metrics + full checkpoint equality',flush=True)
    completed=run('completed-resume',extra=['--seed','17','--resume',str(work/'uninterrupted/checkpoint.pt')])
    assert full['metrics']==completed['metrics'],'Completed checkpoint resume differs'
    changed=work/'changed-source.py';changed.write_text(REFERENCE+'\n# changed source fingerprint\n')
    mismatch=run('source-mismatch',changed,extra=['--resume',str(work/'partial/checkpoint.pt')],expect='failed')
    assert 'Resume source, evaluator, runtime or config differs' in mismatch.get('error','')
    multi=run('multiseed',extra=['--seeds','17,29,43'])
    for report in multi['reports']:print('seed',report['seed'],report['status'],report['metrics'],flush=True)
    run('mps',extra=['--device','mps'],expect='unsupported')
    print('VERIFIED',work)
if __name__=='__main__':main()
