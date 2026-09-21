#!/usr/bin/env python3
"""Real CPU training assessments and an explicitly separate CUDA benchmark."""
import argparse
import copy
import hashlib
import importlib.metadata
import importlib.util
import json
import math
from pathlib import Path
import platform
import random
import statistics
import sys
import time

import torch
from torch import nn
from torch.nn import functional as F

ROOT = Path(__file__).resolve().parent
IDS = ('transformer-posttrain', 'ppo-control', 'visual-policy', 'attention-kernel')


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def evaluator_digest():
    # Bind grading criteria as well as code; the separator makes the bundle explicit.
    return hashlib.sha256(Path(__file__).read_bytes()+b'\0'+(ROOT/'manifest.json').read_bytes()).hexdigest()


def parity(actual, expected, inputs):
    """Compare values AND independent autograd signals (reject constant losses)."""
    if actual.shape != expected.shape:
        return 1e9
    error = float((actual - expected).abs().max().detach())
    ga = torch.autograd.grad(actual.sum(), inputs, retain_graph=True, allow_unused=True)
    gb = torch.autograd.grad(expected.sum(), inputs, retain_graph=True, allow_unused=True)
    for a, b in zip(ga, gb):
        if a is None or b is None:
            return 1e9
        error = max(error, float((a-b).abs().max()))
    return error


def objective_tests(c, family):
    errors = []
    if family == 'posttrain':
        x = torch.randn(3, 5, 13, dtype=torch.float64, requires_grad=True)
        y = torch.randint(13, (3, 5))
        mask = torch.tensor([[0,0,1,1,0],[0,1,1,1,1],[0,0,0,1,1]], dtype=torch.bool)
        expected = F.cross_entropy(x[mask], y[mask])
        errors.append(parity(c.completion_loss(x,y,mask),expected,(x,)))
        a = torch.tensor([-100., -1., 2., 100.],dtype=torch.float64,requires_grad=True)
        b = torch.tensor([2., -3., 1., -2.],dtype=torch.float64,requires_grad=True)
        ra, rb = torch.randn(4,dtype=torch.float64),torch.randn(4,dtype=torch.float64)
        errors.append(parity(c.dpo_loss(a,b,ra,rb,.3),-F.logsigmoid(.3*((a-b)-(ra-rb))).mean(),(a,b)))
        x=torch.randn(4,6,dtype=torch.float64,requires_grad=True)
        old=x.detach()+torch.randn_like(x)*.5
        adv=torch.randn_like(x); ref=torch.randn_like(x)
        ratio=(x-old).exp(); delta=ref-x
        expected=-torch.minimum(ratio*adv,ratio.clamp(.8,1.2)*adv).mean()+.02*(delta.exp()-delta-1).mean()
        errors.append(parity(c.grpo_loss(x,old,adv,ref,.2,.02),expected,(x,)))
    else:
        x=torch.tensor([-.9,.3,-.3,.7,-.1],dtype=torch.float64,requires_grad=True)
        old=torch.zeros_like(x); adv=torch.tensor([2.,2.,-2.,-2.,0.],dtype=torch.float64)
        r=(x-old).exp()
        errors.append(parity(c.ppo_loss(x,old,adv,.2),-torch.minimum(r*adv,r.clamp(.8,1.2)*adv).mean(),(x,)))
        rewards=torch.randn(9,4); values=torch.randn(9,4); nv=torch.randn(9,4)
        term=torch.zeros(9,4,dtype=torch.bool); ends=term.clone()
        term[3,0]=True; ends[3,0]=True; ends[4,1]=True; ends[-1]=True
        expected=torch.zeros_like(values); carry=torch.zeros(4)
        for t in reversed(range(9)):
            delta=rewards[t]+.97*nv[t]*(~term[t])-values[t]
            carry=delta+.97*.91*(~ends[t])*carry; expected[t]=carry
        a,ret=c.gae(rewards,values,nv,term,ends,.97,.91)
        errors.extend([float((a-expected).abs().max()),float((ret-expected-values).abs().max())])
    return max(errors)


class TinyLM(nn.Module):
    """One decoder block, trained from scratch. Completion is one answer token."""
    def __init__(self,c):
        super().__init__(); self.c=c
        self.embed=nn.Linear(1,48); self.pos=nn.Parameter(torch.randn(3,48)*.02)
        self.qkv=nn.Linear(48,144); self.out=nn.Linear(48,48)
        self.n1=nn.LayerNorm(48); self.n2=nn.LayerNorm(48)
        self.ff=nn.Sequential(nn.Linear(48,96),nn.GELU(),nn.Linear(96,48))
        self.head=nn.Linear(48,1)
        self.log_precision=nn.Parameter(torch.tensor(math.log(200.)))
        self.register_buffer("answer_values",(torch.arange(30)-11)/18)
    def forward(self,tokens):
        x=self.embed(tokens.float().unsqueeze(-1)/10)+self.pos[:tokens.shape[1]]
        b,t,d=x.shape
        q,k,v=self.qkv(self.n1(x)).reshape(b,t,3,3,16).permute(2,0,3,1,4).unbind(0)
        allowed=torch.ones(t,t,device=x.device,dtype=torch.bool).tril()
        a=self.c.attention(q,k,v,allowed).transpose(1,2).reshape(b,t,d)
        x=x+self.out(a); x=x+self.ff(self.n2(x))
        return -self.log_precision.exp()*(self.head(x)-self.answer_values)**2


def arithmetic():
    train=[]; test=[]
    for a in range(10):
        for b in range(10):
            (test if (a*7+b*3)%5==0 else train).append(([a,b,10],11+a+b))
    def tensors(rows):
        return torch.tensor([x for x,y in rows]),torch.tensor([y for x,y in rows])
    return (*tensors(train),*tensors(test))


def log_probs(model,x,y):
    return model(x)[:,-1].log_softmax(-1).gather(1,y[:,None]).squeeze(1)


def posttrain(c,full):
    error=objective_tests(c,'posttrain')
    x,y,xt,yt=arithmetic(); model=TinyLM(c)
    with torch.no_grad(): initial=float(-log_probs(model,xt,yt).mean())
    opt=torch.optim.Adam(model.parameters(),lr=.002)
    steps=700 if full else 220
    # Actual shifted input/targets: completion token follows delimiter; prompts masked.
    targets=torch.cat((x[:,1:],y[:,None]),1); mask=torch.zeros_like(x,dtype=torch.bool);mask[:,-1]=True
    for _ in range(steps):
        opt.zero_grad(); loss=c.completion_loss(model(x),targets,mask);loss.backward();opt.step()
    with torch.no_grad():
        sft_nll=float(-log_probs(model,xt,yt).mean())
        sft_acc=float((model(xt)[:,-1].argmax(-1)==yt).float().mean())
        ref_train=model(x)[:,-1].log_softmax(-1).detach()
        ref_test=log_probs(model,xt,yt).detach()
    base=copy.deepcopy(model.state_dict())
    # Both methods start from identical frozen SFT and use same response-token budget.
    branches={}; updates=60 if full else 20; group=8
    for method in ('dpo','grpo'):
        m=TinyLM(c);m.load_state_dict(base);opt=torch.optim.Adam(m.parameters(),lr=.000003)
        for _ in range(updates):
            idx=torch.randint(len(x),(32,)); xb=x[idx];yb=y[idx]
            lp=m(xb)[:,-1].log_softmax(-1)
            if method=='dpo':
                # 4 pairs x 2 responses = same 8 response tokens as GRPO group.
                chosen=lp.gather(1,yb[:,None]).expand(-1,4).reshape(-1)
                bad=(yb[:,None]+torch.tensor([-1,1,-1,1])[None]).clamp(11,29)
                rejected=lp.gather(1,bad).reshape(-1)
                rc=ref_train[idx].gather(1,yb[:,None]).expand(-1,4).reshape(-1)
                rr=ref_train[idx].gather(1,bad).reshape(-1)
                loss=c.dpo_loss(chosen,rejected,rc,rr,.2)
            else:
                sample=torch.multinomial(lp.detach().exp(),group,replacement=True)
                reward=(sample==yb[:,None]).float()
                advantages=(reward-reward.mean(1,keepdim=True))/(reward.std(1,keepdim=True,unbiased=False)+1e-5)
                old=lp.detach().gather(1,sample); ref=ref_train[idx].gather(1,sample)
                # Two epochs on frozen behavior log-probs activate ratio/clipping.
                for epoch in range(2):
                    current=m(xb)[:,-1].log_softmax(-1).gather(1,sample)
                    loss=c.grpo_loss(current,old,advantages,ref,.2,.01)
                    opt.zero_grad();loss.backward();opt.step()
                continue
            opt.zero_grad();loss.backward();opt.step()
        with torch.no_grad():
            test_lp=log_probs(m,xt,yt)
            train_lp=m(x)[:,-1].log_softmax(-1)
            branches[method+'_train_reward_gain']=float((train_lp.gather(1,y[:,None]).exp()-ref_train.gather(1,y[:,None]).exp()).mean())
            if method=='dpo':
                bad=(y[:,None]+torch.tensor([-1,1])[None]).clamp(11,29)
                pc=train_lp.gather(1,y[:,None]).expand(-1,2).reshape(-1)
                pr=train_lp.gather(1,bad).reshape(-1)
                rc=ref_train.gather(1,y[:,None]).expand(-1,2).reshape(-1)
                rr=ref_train.gather(1,bad).reshape(-1)
                branches['dpo_train_objective']=float(c.dpo_loss(pc,pr,rc,rr,.2))
            branches[method+'_parameter_delta']=float(sum((v-base[k]).square().sum() for k,v in m.state_dict().items()).sqrt())
            branches[method+'_heldout_nll']=float(-test_lp.mean())
            branches[method+'_heldout_accuracy']=float((m(xt)[:,-1].argmax(-1)==yt).float().mean())
            branches[method+'_heldout_nll_ratio']=float(-test_lp.mean())/max(sft_nll,1e-8)
    # Causality: a future token must not change earlier hidden predictions.
    with torch.no_grad():
        altered=x.clone();altered[:,2]=9
        leakage=float((model(x)[:,:2]-model(altered)[:,:2]).abs().max())
    return dict(objective_error=error,causal_error=leakage,sft_loss_ratio=sft_nll/initial,
                sft_heldout_accuracy=sft_acc,sft_heldout_nll=sft_nll,initial_heldout_nll=initial,
                train_tuples=len(x),heldout_tuples=len(xt),sft_steps=steps,
                preference_response_tokens=updates*32*group,**branches)


class ActorCritic(nn.Module):
    def __init__(self):
        super().__init__();self.body=nn.Sequential(nn.Linear(4,32),nn.Tanh(),nn.Linear(32,32),nn.Tanh())
        self.policy=nn.Linear(32,3);self.value=nn.Linear(32,1)
    def forward(self,obs):
        h=self.body(obs);return self.policy(h),self.value(h).squeeze(-1)


def observation(x,g,t):
    return torch.stack((x,g,x-g,t/24),-1)


def control_eval(model,seed,random_policy=False):
    generator=torch.Generator().manual_seed(seed)
    n=128;x=torch.rand(n,generator=generator)*2.4-1.2;g=torch.rand(n,generator=generator)*1.6-.8
    total=torch.zeros(n);success=torch.zeros(n,dtype=torch.bool)
    with torch.no_grad():
        for t in range(24):
            logits,_=model(observation(x,g,torch.full_like(x,t)))
            a=torch.randint(3,(n,),generator=generator) if random_policy else logits.argmax(-1)
            x=(x+(a-1)*.15+torch.randn(n,generator=generator)*.006).clamp(-1.5,1.5)
            dist=(x-g).abs();total-=dist;success|=dist<.09
    return float(total.mean()),float(success.float().mean()),float((x-g).abs().mean())


def ppo(c,full,seed):
    error=objective_tests(c,'ppo');model=ActorCritic();opt=torch.optim.Adam(model.parameters(),lr=.003)
    baseline,_,_=control_eval(model,seed+400,True)
    n=64;horizon=24;x=torch.rand(n)*2-1;g=torch.rand(n)*1.6-.8;age=torch.zeros(n)
    updates=100 if full else 35
    for _ in range(updates):
        obsbuf=[];acts=[];logs=[];vals=[];rewards=[];nvals=[];terms=[];ends=[]
        with torch.no_grad():
            for t in range(horizon):
                obs=observation(x,g,age);logits,value=model(obs);dist=torch.distributions.Categorical(logits=logits);a=dist.sample()
                xn=(x+(a-1)*.15).clamp(-1.5,1.5);age+=1;distance=(xn-g).abs()
                term=distance<.07;end=term|(age>=24);reward=-distance+term.float()
                _,nv=model(observation(xn,g,age))
                obsbuf.append(obs);acts.append(a);logs.append(dist.log_prob(a));vals.append(value)
                rewards.append(reward);nvals.append(nv);terms.append(term);ends.append(end)
                x=torch.where(end,torch.rand(n)*2-1,xn);g=torch.where(end,torch.rand(n)*1.6-.8,g);age=torch.where(end,0.,age)
        with torch.no_grad():
            advantages,returns=c.gae(torch.stack(rewards),torch.stack(vals),torch.stack(nvals),torch.stack(terms),torch.stack(ends),.97,.95)
            advantages=(advantages-advantages.mean())/(advantages.std()+1e-8)
        observations=torch.stack(obsbuf).reshape(-1,4);actions=torch.stack(acts).flatten();old=torch.stack(logs).flatten()
        for epoch in range(4):
            order=torch.randperm(n*horizon)
            for idx in order.split(384):
                logits,value=model(observations[idx]);d=torch.distributions.Categorical(logits=logits)
                loss=c.ppo_loss(d.log_prob(actions[idx]),old[idx],advantages.flatten()[idx],.2)+.5*F.mse_loss(value,returns.flatten()[idx])-.01*d.entropy().mean()
                opt.zero_grad();loss.backward();nn.utils.clip_grad_norm_(model.parameters(),.5);opt.step()
    score,success,distance=control_eval(model,seed+400)
    return dict(objective_error=error,heldout_return=score,random_return=baseline,
                return_improvement=score-baseline,heldout_success=success,final_distance=distance,
                environment_steps=updates*n*horizon,evaluation_episodes=128)


def images(pos,goal,generator,shift=False):
    grid=torch.linspace(-1,1,16);yy,xx=torch.meshgrid(grid,grid,indexing='ij')
    xy=torch.stack((xx,yy),-1)[None,None]
    centers=torch.stack((pos,goal),1)[:,:,None,None,:]
    im=torch.exp(-((xy-centers)**2).sum(-1)/.012)
    noise=torch.rand(im.shape,generator=generator)*(.06 if shift else .02)
    gain=.65 if shift else 1.
    return gain*im+noise


def visual_eval(model,seed,shift=False,zero=False):
    gen=torch.Generator().manual_seed(seed);n=128
    pos=torch.rand(n,2,generator=gen)*1.7-.85;goal=torch.rand(n,2,generator=gen)*1.5-.75
    initial=(pos-goal).norm(dim=-1)
    with torch.no_grad():
        for _ in range(18):
            action=torch.zeros_like(pos) if zero else model(images(pos,goal,gen,shift))
            if action.shape!=pos.shape or not torch.isfinite(action).all():raise ValueError('Policy must return finite [B,2] actions')
            pos=(pos+.16*action.clamp(-1,1)+(torch.tensor([.008,-.006]) if shift else 0)).clamp(-1,1)
    distance=(pos-goal).norm(dim=-1)
    return float((distance<.15).float().mean()),float(distance.mean()),float(initial.mean())


def visual(c,full,seed):
    model=c.build_visual_policy()
    if not isinstance(model,nn.Module) or not any(isinstance(m,nn.Conv2d) for m in model.modules()):
        raise ValueError('Visual policy must contain a torch.nn.Conv2d')
    parameters=[p for p in model.parameters() if p.requires_grad]
    if not parameters:raise ValueError('Policy must have trainable parameters')
    before=torch.cat([p.detach().flatten() for p in parameters]).clone()
    opt=torch.optim.Adam(parameters,lr=.003);gen=torch.Generator().manual_seed(seed+50)
    steps=650 if full else 240
    model.train()
    for _ in range(steps):
        pos=torch.rand(96,2,generator=gen)*1.5-.75;goal=torch.rand(96,2,generator=gen)*1.5-.75
        im=images(pos,goal,gen);expert=((goal-pos)*3).clamp(-1,1)
        output=model(im);loss=F.mse_loss(output,expert)
        opt.zero_grad();loss.backward();opt.step()
    model.eval();success,distance,initial=visual_eval(model,seed+700)
    shift_success,shift_distance,_=visual_eval(model,seed+701,True)
    zero_success,zero_distance,_=visual_eval(model,seed+700,zero=True)
    after=torch.cat([p.detach().flatten() for p in parameters])
    return dict(heldout_success=success,shifted_success=shift_success,final_distance=distance,
                shifted_final_distance=shift_distance,zero_success=zero_success,zero_distance=zero_distance,
                distance_ratio=distance/zero_distance,parameter_delta=float((before-after).norm()),
                training_steps=steps,evaluation_episodes=256)


def attention_suite(c,full,accelerator):
    device='cuda' if accelerator else 'cpu';maxerr=0.;graderr=0.;causalerr=0.
    shapes=[(2,2,7,5),(1,3,13,8),(2,1,4,17)]
    if full:shapes += [(2,4,31,32),(1,2,63,16),(1,1,127,64),(2,4,512,32)]
    timed_length=512 if accelerator else (127 if full else 31)
    timed_shape=(2,4,timed_length,32)
    if timed_shape not in shapes:shapes.append(timed_shape)
    # Every timed shape/dtype is checked above the timer, including masked rows.
    # Full CPU also checks the CUDA benchmark shape, catching length-specific bugs.
    dtypes=[torch.float64,torch.float32]
    if accelerator:dtypes=[torch.float32,torch.float16,torch.bfloat16]
    for dtype in dtypes:
        for b,h,t,d in shapes:
            for mode in ('causal','padding','empty','stress'):
                scale=40 if mode=='stress' else 1
                q=(torch.randn(b,h,t,d,device=device,dtype=dtype)*scale).requires_grad_()
                k=(torch.randn_like(q)*scale).requires_grad_();v=torch.randn_like(q,requires_grad=True)
                allowed=torch.ones(t,t,device=device,dtype=torch.bool).tril()
                if mode=='padding':allowed[:,t//2:]=False
                if mode=='empty':allowed[2,:]=False
                expected=F.scaled_dot_product_attention(q,k,v,attn_mask=allowed)
                actual=c.attention(q,k,v,allowed)
                if actual.shape!=expected.shape or not torch.isfinite(actual).all():raise ValueError('Invalid attention outputs')
                norm=max(1.,float(expected.abs().max()))
                maxerr=max(maxerr,float((actual-expected).abs().max().detach())/norm)
                weight=torch.randn_like(actual)
                ga=torch.autograd.grad((actual*weight).sum(),(q,k,v),retain_graph=True)
                gb=torch.autograd.grad((expected*weight).sum(),(q,k,v))
                for a,bb in zip(ga,gb):
                    if not torch.isfinite(a).all():raise ValueError('Nonfinite attention gradients')
                    graderr=max(graderr,float((a-bb).abs().max())/max(1.,float(bb.abs().max())))
                with torch.no_grad():
                    kk=k.clone();vv=v.clone();kk[:,:,t//2:]+=10;vv[:,:,t//2:]+=10
                    changed=c.attention(q,kk,vv,allowed)
                    causalerr=max(causalerr,float((changed[:,:,:t//2]-actual[:,:,:t//2]).abs().max()))
    # Real local timings. CPU measurement is never interpreted as GPU speed evidence.
    t=timed_length
    q=torch.randn(2,4,t,32,device=device);k=torch.randn_like(q);v=torch.randn_like(q)
    mask=torch.ones(t,t,device=device,dtype=torch.bool).tril();samples={};peak=0
    with torch.no_grad():
        for name,fn in [('candidate',lambda:c.attention(q,k,v,mask)),('reference',lambda:F.scaled_dot_product_attention(q,k,v,attn_mask=mask))]:
            for _ in range(8):fn()
            if accelerator:torch.cuda.synchronize();torch.cuda.reset_peak_memory_stats()
            times=[]
            for _ in range(60 if full or accelerator else 20):
                if accelerator:torch.cuda.synchronize()
                start=time.perf_counter();fn()
                if accelerator:torch.cuda.synchronize()
                times.append((time.perf_counter()-start)*1000)
            samples[name]=times
            if accelerator and name=='candidate':peak=torch.cuda.max_memory_allocated()
    a=samples['candidate'];b=samples['reference']
    return dict(output_error=maxerr,gradient_error=graderr,causal_error=causalerr,
                candidate_median_ms=statistics.median(a),candidate_p95_ms=sorted(a)[math.ceil(len(a)*.95)-1],
                reference_median_ms=statistics.median(b),speedup=statistics.median(b)/statistics.median(a),
                peak_allocated_bytes=peak,case_count=len(shapes)*len(dtypes)*4,sequence_length=t)


def main():
    p=argparse.ArgumentParser();p.add_argument('--assessment',choices=IDS,required=True)
    p.add_argument('--seed',type=int,default=17);p.add_argument('--scope',choices=['smoke','full','accelerator'],default='smoke')
    p.add_argument('--output',type=Path,required=True);p.add_argument('--candidate',type=Path,default=ROOT/'candidate.py');a=p.parse_args()
    torch.set_num_threads(1);torch.manual_seed(a.seed);random.seed(a.seed)
    result=dict(schemaVersion=2,assessment=a.assessment,seed=a.seed,sourceHash=digest(a.candidate),evaluatorHash=evaluator_digest(),
                runtime=dict(python=platform.python_version(),platform=platform.platform(),packages={'torch':torch.__version__},device='cpu'),
                scope=a.scope,status='failed',metrics={},checks={},unsupported=[])
    manifest=json.loads((ROOT/'manifest.json').read_text());spec=next(x for x in manifest['assessments'] if x['id']==a.assessment)
    criteria=spec['scopes'][a.scope]['criteria']
    try:
        if a.scope=='accelerator' and (a.assessment!='attention-kernel' or not torch.cuda.is_available()):
            result['status']='unsupported';result['unsupported']=[r['name'] for r in criteria] or ['accelerator_scope']
        else:
            module_spec=importlib.util.spec_from_file_location('submission',a.candidate)
            c=importlib.util.module_from_spec(module_spec);module_spec.loader.exec_module(c)
            full=a.scope=='full'
            if a.assessment=='transformer-posttrain':metrics=posttrain(c,full)
            elif a.assessment=='ppo-control':metrics=ppo(c,full,a.seed)
            elif a.assessment=='visual-policy':metrics=visual(c,full,a.seed)
            else:metrics=attention_suite(c,full,a.scope=='accelerator')
            if any(not isinstance(v,(float,int)) or not math.isfinite(v) for v in metrics.values()):raise ValueError('Nonfinite metric')
            result['metrics']=metrics
            ops={'lt':lambda x,y:x<y,'lte':lambda x,y:x<=y,'gt':lambda x,y:x>y,'gte':lambda x,y:x>=y}
            result['checks']={r['name']:bool(ops[r['op']](metrics[r['metric']],r['value'])) for r in criteria}
            result['status']='passed' if result['checks'] and all(result['checks'].values()) else 'failed'
            if a.scope=='accelerator':result['runtime']['device']=torch.cuda.get_device_name()
    except Exception as exc:
        result['error']=f'{type(exc).__name__}: {exc}';result['checks']={r['name']:False for r in criteria}
    a.output.parent.mkdir(parents=True,exist_ok=True)
    a.output.write_text(json.dumps(result,indent=2,allow_nan=False)+'\n')
    print(json.dumps(result,allow_nan=False))
    return 0 if result['status'] in ('passed','unsupported') else 1


if __name__=='__main__':sys.exit(main())
