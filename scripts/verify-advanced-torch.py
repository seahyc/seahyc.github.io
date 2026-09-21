#!/usr/bin/env python3
"""Development-only references. Never include this file in the learner download.
Usage: /tmp/frontier-torch-venv/bin/python scripts/verify-advanced-torch.py [--scope full]
Runs actual assessment CLIs with correct and incorrect submissions.
"""
import argparse
import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT=Path(__file__).resolve().parents[1]/'static/practice/lab/advanced/torch'
REFERENCE=r'''
import torch
from torch import nn
from torch.nn import functional as F

def attention(q,k,v,allowed):
    return F.scaled_dot_product_attention(q,k,v,attn_mask=allowed)

def completion_loss(logits,targets,mask):
    return F.cross_entropy(logits[mask],targets[mask])

def dpo_loss(chosen,rejected,ref_chosen,ref_rejected,beta):
    return -F.logsigmoid(beta*((chosen-rejected)-(ref_chosen-ref_rejected))).mean()

def grpo_loss(logp,old_logp,advantages,ref_logp,clip,beta):
    ratio=(logp-old_logp).exp()
    delta=ref_logp-logp
    return -torch.minimum(ratio*advantages,ratio.clamp(1-clip,1+clip)*advantages).mean()+beta*(delta.exp()-delta-1).mean()

def gae(rewards,values,next_values,terminated,episode_end,gamma,lam):
    out=torch.zeros_like(values);carry=torch.zeros_like(values[0])
    for t in reversed(range(len(rewards))):
        carry=rewards[t]+gamma*next_values[t]*(~terminated[t])-values[t]+gamma*lam*(~episode_end[t])*carry
        out[t]=carry
    return out,out+values

def ppo_loss(new_logp,old_logp,advantages,clip):
    ratio=(new_logp-old_logp).exp()
    return -torch.minimum(ratio*advantages,ratio.clamp(1-clip,1+clip)*advantages).mean()

def build_visual_policy():
    return nn.Sequential(nn.Conv2d(2,8,3,padding=1),nn.ReLU(),nn.Conv2d(8,16,3,stride=2,padding=1),nn.ReLU(),nn.Flatten(),nn.Linear(16*8*8,64),nn.ReLU(),nn.Linear(64,2),nn.Tanh())
'''
BROKEN={
 'transformer-posttrain':'\ndef completion_loss(logits,targets,mask):\n    return logits.sum()*0\n',
 'ppo-control':'\ndef ppo_loss(new_logp,old_logp,advantages,clip):\n    return -((new_logp-old_logp).exp()*advantages).mean()\n',
 'visual-policy':r'''
class ConstantPolicy(nn.Module):
    def __init__(self):
        super().__init__();self.conv=nn.Conv2d(2,2,1);self.bias=nn.Parameter(torch.zeros(2))
    def forward(self,x):return self.bias[None].expand(x.shape[0],-1)
def build_visual_policy():return ConstantPolicy()
''',
 'attention-kernel':'\ndef attention(q,k,v,allowed):\n    return torch.softmax(q@k.transpose(-2,-1)/q.shape[-1]**.5,dim=-1)@v\n'
}

def main():
    p=argparse.ArgumentParser();p.add_argument('--scope',choices=['smoke','full']);p.add_argument('--seed',type=int,default=17)
    p.add_argument('--assessment',choices=list(BROKEN));p.add_argument('--reference-only',action='store_true');args=p.parse_args()
    if args.scope is None:
        # Default verification continuously covers both configurations.
        for scope in ['smoke','full']:
            command=[sys.executable,__file__,'--scope',scope,'--seed',str(args.seed)]
            if args.assessment:command+=['--assessment',args.assessment]
            if args.reference_only or scope=='full':command+=['--reference-only']
            subprocess.run(command,check=True)
        return
    ids=[args.assessment] if args.assessment else list(BROKEN)
    with tempfile.TemporaryDirectory(prefix='advanced-torch-check-') as td:
        tmp=Path(td);ref=tmp/'reference.py';ref.write_text(REFERENCE)
        def run(id,mode,candidate,expected):
            output=tmp/(id+'-'+mode+'.json')
            proc=subprocess.run([sys.executable,str(ROOT/'evaluate.py'),'--assessment',id,'--seed',str(args.seed),'--scope',args.scope,'--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
            if not output.exists():raise AssertionError(proc.stderr)
            report=json.loads(output.read_text())
            print(json.dumps({'assessment':id,'scope':args.scope,'seed':args.seed,'candidate':mode,'status':report['status'],'metrics':report['metrics'],'checks':report['checks'],'error':report.get('error')}),flush=True)
            assert report['status']==expected,(id,mode,report,proc.stderr)
            assert proc.returncode==(0 if expected=='passed' else 1)
            assert len(report['sourceHash'])==len(report['evaluatorHash'])==64
            import hashlib
            # Use an actual NUL byte, identical to the published bundle framing.
            expected_hash=hashlib.sha256((ROOT/'evaluate.py').read_bytes()+bytes([0])+(ROOT/'manifest.json').read_bytes()).hexdigest()
            assert report['evaluatorHash']==expected_hash
        for id in ids:
            modes=['reference'] if args.reference_only else ['reference','todo','broken']
            for mode in modes:
                candidate=ref if mode=='reference' else ROOT/'candidate.py'
                if mode=='broken':candidate=tmp/(id+'.py');candidate.write_text(REFERENCE+BROKEN[id])
                run(id,mode,candidate,'passed' if mode=='reference' else 'failed')
            if id=='attention-kernel' and args.scope=='full':
                long=tmp/'long-broken.py'
                long.write_text(REFERENCE+'\ndef attention(q,k,v,allowed):\n    result=F.scaled_dot_product_attention(q,k,v,attn_mask=allowed)\n    return result*0 if q.shape[-2]>=128 else result\n')
                run(id,'long-sequence-broken',long,'failed')
        import torch
        if not torch.cuda.is_available():
            output=tmp/'unsupported.json'
            subprocess.run([sys.executable,str(ROOT/'evaluate.py'),'--assessment','attention-kernel','--scope','accelerator','--candidate',str(ref),'--output',str(output)],capture_output=True,check=True)
            report=json.loads(output.read_text());assert report['status']=='unsupported';assert report['unsupported']
            print('CUDA accelerator scope: unsupported (verified)',flush=True)

if __name__=='__main__':main()
