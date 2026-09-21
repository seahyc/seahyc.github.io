#!/usr/bin/env python3
"""Offline CPU PPO reproduction in the real Gymnasium CartPole-v1 environment."""
import argparse, hashlib, importlib.metadata, importlib.util, json, math, platform, random, statistics, sys
from pathlib import Path
import numpy as np
import torch
from torch import nn
import gymnasium as gym
ROOT = Path(__file__).resolve().parent

def sha(path): return hashlib.sha256(Path(path).read_bytes()).hexdigest()
def hash_json(value): return hashlib.sha256(json.dumps(value, sort_keys=True).encode()).hexdigest()
def atomic_json(path, value):
    path=Path(path); path.parent.mkdir(parents=True,exist_ok=True)
    temp=path.with_suffix(path.suffix+'.tmp'); temp.write_text(json.dumps(value,indent=2,allow_nan=False)+'\n');temp.replace(path)

def objective_tests(c):
    x=torch.tensor([-.9,.3,-.3,.7,-.1],dtype=torch.float64,requires_grad=True)
    old=torch.zeros_like(x);adv=torch.tensor([2.,2.,-2.,-2.,0.],dtype=x.dtype)
    ratio=(x-old).exp(); ref=-torch.minimum(ratio*adv,ratio.clamp(.8,1.2)*adv).mean()
    actual=c.ppo_loss(x,old,adv,.2)
    if actual.shape!=ref.shape: raise ValueError('PPO loss must be scalar')
    err=max(float((actual-ref).abs().detach()),float((torch.autograd.grad(actual,x)[0]-torch.autograd.grad(ref,x)[0]).abs().max()))
    # Independent tiny fixtures include termination, truncation, and rollout cutoff.
    gen=torch.Generator().manual_seed(912)
    r=torch.randn(9,3,generator=gen);v=torch.randn(9,3,generator=gen);nv=torch.randn(9,3,generator=gen)
    term=torch.zeros(9,3,dtype=torch.bool);ends=term.clone();term[3,0]=True;ends[3,0]=True;ends[4,1]=True
    ref=torch.zeros_like(v);carry=torch.zeros(3)
    for t in reversed(range(9)):
        carry=r[t]+.97*nv[t]*(~term[t])-v[t]+.97*.91*(~ends[t])*carry;ref[t]=carry
    a,ret=c.gae(r,v,nv,term,ends,.97,.91)
    if a.shape!=v.shape or ret.shape!=v.shape: raise ValueError('GAE shape mismatch')
    return max(err,float((a-ref).abs().max()),float((ret-ref-v).abs().max()))

def evaluate_policy(model, seed, episodes, random_policy=False):
    # These seeds are disjoint from training reset seeds; never used for tuning or updates.
    env=gym.make('CartPole-v1');rng=np.random.default_rng(seed+900000);scores=[]
    model.eval()
    with torch.no_grad():
        for i in range(episodes):
            obs,_=env.reset(seed=seed+1000000+i);total=0
            while True:
                action=int(rng.integers(2)) if random_policy else int(model(torch.tensor(obs).unsqueeze(0))[0].argmax(-1).item())
                obs,reward,terminated,truncated,_=env.step(action);total+=reward
                if terminated or truncated:break
            scores.append(total)
    env.close();model.train();return scores

def train(c,cfg,art,resume,stop):
    torch.manual_seed(cfg['seed']);np.random.seed(cfg['seed']);random.seed(cfg['seed'])
    error=objective_tests(c)
    if not math.isfinite(error) or error>=1e-5:raise ValueError(f'Objective/gradient parity failed: {error}')
    model=c.build_policy(4,2)
    if not isinstance(model,nn.Module): raise ValueError('Policy must be nn.Module')
    parameters=[p for p in model.parameters() if p.requires_grad]
    initial=torch.cat([p.detach().flatten() for p in parameters]).clone()
    probes=torch.linspace(-.4,.4,128).reshape(32,4)
    with torch.no_grad():initial_policy=model(probes)[0].log_softmax(-1).clone()
    opt=torch.optim.Adam(parameters,lr=cfg['lr'],eps=1e-5)
    envs=[gym.make('CartPole-v1') for _ in range(cfg['num_envs'])]
    obs=np.stack([e.reset(seed=cfg['seed']*100+i)[0] for i,e in enumerate(envs)])
    running=np.zeros(len(envs));start=0;curve=[]
    if resume:
        # Only load checkpoints that you created: torch checkpoint loading uses pickle.
        state=torch.load(resume,map_location='cpu',weights_only=False)
        if state['config']!=cfg:raise ValueError('Resume source, evaluator, runtime or config differs')
        model.load_state_dict(state['model']);opt.load_state_dict(state['optimizer']);initial=state['initial'];initial_policy=state['initial_policy']
        start=state['update'];obs=state['observations'];running=state['episode_returns'];curve=state['curve']
        for e,s in zip(envs,state['environments']):
            e.unwrapped.state=s['state'];e.unwrapped.np_random.bit_generator.state=s['rng'];e._elapsed_steps=s['elapsed'];e.unwrapped.steps_beyond_terminated=s['beyond']
        torch.set_rng_state(state['torch_rng']);np.random.set_state(state['numpy_rng']);random.setstate(state['python_rng'])
    curvepath=art/'learning-curve.jsonl'
    curvepath.write_text(''.join(json.dumps(row,allow_nan=False)+'\n' for row in curve))
    checkpoint=art/'checkpoint.pt'
    if resume:
        temp=checkpoint.with_suffix('.tmp');torch.save(state,temp);temp.replace(checkpoint)
    for update in range(start,cfg['updates']):
        buffers=[[] for _ in range(8)];completed=[]
        with torch.no_grad():
            for t in range(cfg['horizon']):
                ot=torch.tensor(obs);logits,values=model(ot)
                if logits.shape!=(len(envs),2) or values.shape!=(len(envs),):raise ValueError('Policy output shapes invalid')
                dist=torch.distributions.Categorical(logits=logits);actions=dist.sample()
                nextobs=[];rewards=[];terms=[];ends=[]
                for i,e in enumerate(envs):
                    no,r,term,trunc,_=e.step(int(actions[i]));nextobs.append(no);rewards.append(r);terms.append(term);ends.append(term or trunc)
                    running[i]+=r
                # Bootstrap before reset, including truncated episodes' final observations.
                nv=model(torch.tensor(np.stack(nextobs)))[1]
                for buf,data in zip(buffers,[ot,actions,dist.log_prob(actions),values,torch.tensor(rewards),nv,torch.tensor(terms),torch.tensor(ends)]):buf.append(data)
                for i,e in enumerate(envs):
                    if ends[i]:completed.append(float(running[i]));running[i]=0;nextobs[i]=e.reset()[0]
                obs=np.stack(nextobs)
            ob,ac,lp,va,rw,nv,te,en=[torch.stack(b) for b in buffers]
            adv,returns=c.gae(rw,va,nv,te,en,cfg['gamma'],cfg['lambda'])
            adv=(adv-adv.mean())/(adv.std(unbiased=False)+1e-8)
        size=cfg['horizon']*len(envs);losses=[];kls=[];clips=[];gradnorms=[]
        for epoch in range(cfg['epochs']):
            for ix in torch.randperm(size).split(cfg['minibatch']):
                logits,values=model(ob.reshape(-1,4)[ix]);dist=torch.distributions.Categorical(logits=logits)
                logp=dist.log_prob(ac.flatten()[ix]);old=lp.flatten()[ix]
                loss=c.ppo_loss(logp,old,adv.flatten()[ix],.2)+.5*(values-returns.flatten()[ix]).square().mean()-.01*dist.entropy().mean()
                opt.zero_grad();loss.backward();gn=nn.utils.clip_grad_norm_(parameters,.5);opt.step()
                with torch.no_grad():
                    ratio=(logp-old).exp();kls.append(float(((ratio-1)-(logp-old)).mean()));clips.append(float(((ratio-1).abs()>.2).float().mean()));gradnorms.append(float(gn));losses.append(float(loss))
        row=dict(update=update+1,environment_steps=(update+1)*size,completed_episodes=len(completed),train_episode_return=statistics.mean(completed) if completed else 0.,loss=statistics.mean(losses),approx_kl=statistics.mean(kls),clip_fraction=statistics.mean(clips),gradient_norm=statistics.mean(gradnorms))
        if not all(math.isfinite(v) for v in row.values()):raise ValueError('Nonfinite training diagnostic')
        curve.append(row)
        with curvepath.open('a') as f:f.write(json.dumps(row,allow_nan=False)+'\n')
        state=dict(config=cfg,model=model.state_dict(),optimizer=opt.state_dict(),initial=initial,initial_policy=initial_policy,update=update+1,observations=obs,episode_returns=running,curve=curve,
                   environments=[dict(state=e.unwrapped.state,rng=e.unwrapped.np_random.bit_generator.state,elapsed=e._elapsed_steps,beyond=e.unwrapped.steps_beyond_terminated) for e in envs],torch_rng=torch.get_rng_state(),numpy_rng=np.random.get_state(),python_rng=random.getstate())
        temp=checkpoint.with_suffix('.tmp');torch.save(state,temp);temp.replace(checkpoint)
        if stop and update+1>=stop:break
    for e in envs:e.close()
    metadata={name:dict(path=str(path.resolve()),sha256=sha(path)) for name,path in [('checkpoint',checkpoint),('learningCurve',curvepath)]}
    if curve[-1]['update']<cfg['updates']:return {},metadata,True
    # Final evaluation is performed exactly once, after all learning has finished.
    heldout=evaluate_policy(model,cfg['seed'],cfg['evaluation_episodes']);baseline=evaluate_policy(model,cfg['seed'],cfg['evaluation_episodes'],True)
    atomic_json(art/'heldout-episodes.json',dict(policy=heldout,random=baseline,seeds=[cfg['seed']+1000000+i for i in range(len(heldout))]))
    delta=float((torch.cat([p.detach().flatten() for p in parameters])-initial).norm())
    with torch.no_grad():policy_delta=float((model(probes)[0].log_softmax(-1)-initial_policy).abs().max())
    metrics=dict(objective_error=error,policy_output_delta=policy_delta,parameter_delta=delta,heldout_return=statistics.mean(heldout),heldout_return_std=statistics.stdev(heldout),random_return=statistics.mean(baseline),return_improvement=statistics.mean(heldout)-statistics.mean(baseline),environment_steps=cfg['updates']*cfg['horizon']*cfg['num_envs'],evaluation_episodes=len(heldout),final_train_return=curve[-1]['train_episode_return'],final_gradient_norm=curve[-1]['gradient_norm'])
    metadata['heldoutEpisodes']=dict(path=str((art/'heldout-episodes.json').resolve()),sha256=sha(art/'heldout-episodes.json'))
    return metrics,metadata,False

def run(a,seed,art):
    runtime=dict(python=platform.python_version(),platform=platform.platform(),packages={d.metadata['Name'].lower():d.version for d in importlib.metadata.distributions()},device=a.device)
    evaluator=hashlib.sha256(Path(__file__).read_bytes()+b'\0'+(ROOT/'manifest.json').read_bytes()).hexdigest()
    report=dict(schemaVersion=2,assessment='gym-ppo',seed=seed,sourceHash=sha(a.candidate),evaluatorHash=evaluator,runtime=runtime,scope=a.scope,status='failed',metrics={},checks={},unsupported=[])
    if a.device!='cpu':report.update(status='unsupported',unsupported=['mps_training_parity_not_validated']);return report
    spec=json.loads((ROOT/'manifest.json').read_text())['assessments'][0]['scopes'][a.scope]['criteria']
    cfg=dict(environment='CartPole-v1',seed=seed,scope=a.scope,num_envs=8,horizon=128,updates=20 if a.scope=='smoke' else 64,epochs=4,minibatch=256,lr=.002,gamma=.99,**{'lambda':.95},evaluation_episodes=12 if a.scope=='smoke' else 32,sourceHash=report['sourceHash'],evaluatorHash=evaluator,runtimeHash=hash_json(runtime))
    art.mkdir(parents=True,exist_ok=True);configpath=art/'config.json'
    try:
        if configpath.exists() and json.loads(configpath.read_text())!=cfg:raise ValueError('Artifact directory contains a different immutable config')
        if not configpath.exists():atomic_json(configpath,cfg)
        sourcepath=art/'candidate.snapshot.py'
        if sourcepath.exists() and sha(sourcepath)!=report['sourceHash']:raise ValueError('Immutable candidate snapshot differs')
        if not sourcepath.exists():sourcepath.write_bytes(a.candidate.read_bytes())
        report['configHash']=sha(configpath);report['runtimeHash']=cfg['runtimeHash']
        module_spec=importlib.util.spec_from_file_location('candidate',a.candidate);c=importlib.util.module_from_spec(module_spec);module_spec.loader.exec_module(c)
        metrics,artifacts,partial=train(c,cfg,art,a.resume,a.stop_after_updates);report['metrics']=metrics;report['artifacts']=artifacts
        report['artifacts']['candidate']=dict(path=str(sourcepath.resolve()),sha256=sha(sourcepath))
        report['artifacts']['config']=dict(path=str(configpath.resolve()),sha256=sha(configpath))
        if partial:report['error']='Interrupted at requested update boundary; resume checkpoint to finish';return report
        if not all(isinstance(v,(float,int)) and math.isfinite(v) for v in metrics.values()):raise ValueError('Nonfinite metric')
        ops=dict(lt=lambda x,y:x<y,gt=lambda x,y:x>y,gte=lambda x,y:x>=y,lte=lambda x,y:x<=y)
        report['checks']={r['name']:bool(ops[r['op']](metrics[r['metric']],r['value'])) for r in spec}
        report['status']='passed' if all(report['checks'].values()) else 'failed'
    except Exception as exc:report['error']=f'{type(exc).__name__}: {exc}';report['checks']={r['name']:False for r in spec}
    return report

def main():
    p=argparse.ArgumentParser();p.add_argument('--assessment',choices=['gym-ppo'],required=True);p.add_argument('--seed',type=int,default=17);p.add_argument('--seeds');p.add_argument('--scope',choices=['smoke','full'],default='smoke');p.add_argument('--candidate',type=Path,default=ROOT/'candidate.py');p.add_argument('--output',type=Path,required=True);p.add_argument('--artifacts',type=Path);p.add_argument('--resume',type=Path);p.add_argument('--device',choices=['cpu','mps'],default='cpu');p.add_argument('--stop-after-updates',type=int);a=p.parse_args()
    torch.set_num_threads(1);torch.use_deterministic_algorithms(True)
    art=a.artifacts or a.output.parent/(a.output.stem+'-artifacts')
    if a.seeds:
        seeds=[int(s) for s in a.seeds.split(',')]
        if len(set(seeds))!=len(seeds) or len(seeds)<2 or a.resume:p.error('Use distinct seeds; resume supports a single run')
        reports=[]
        for seed in seeds:
            r=run(a,seed,art/str(seed));atomic_json(art/str(seed)/'result.json',r);reports.append(r)
        stats={}
        for key in ('heldout_return','return_improvement'):
            if all(key in r['metrics'] for r in reports):
                vals=[r['metrics'][key] for r in reports];mean=statistics.mean(vals);sd=statistics.stdev(vals);stats[key]=dict(mean=mean,std=sd,normalApprox95HalfWidth=1.96*sd/math.sqrt(len(vals)))
        result=dict(kind='gym-ppo-multiseed',schemaVersion=2,seeds=seeds,reports=reports,statistics=stats,intervalCaveat='Normal approximation across training seeds; small n, not a robust confidence bound',status='passed' if all(r['status']=='passed' for r in reports) else 'failed')
    else:result=run(a,a.seed,art)
    atomic_json(a.output,result);print(json.dumps(result,allow_nan=False));return 0 if result['status'] in ('passed','unsupported') else 1
if __name__=='__main__':sys.exit(main())
