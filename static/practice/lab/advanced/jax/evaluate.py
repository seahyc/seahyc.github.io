#!/usr/bin/env python3
"""Executable assessment, intentionally independent of candidate implementations."""
import argparse, hashlib, importlib.util, importlib.metadata, json, platform, time
from pathlib import Path
import traceback

def digest(path): return hashlib.sha256(Path(path).read_bytes()).hexdigest()

def run(a, report):
    import numpy as np
    import jax
    import jax.numpy as j
    import flax.serialization as serialization
    spec=importlib.util.spec_from_file_location('candidate',a.candidate)
    c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c)
    r=report; m=r['metrics']; checks=r['checks']; rng=np.random.default_rng(a.seed)
    r['runtime']['device']=', '.join(str(d) for d in jax.devices())
    gpu=any(d.platform in ('gpu','tpu') for d in jax.devices())
    if a.scope=='accelerator' and not gpu:
        r['unsupported'].append('accelerator_hardware'); return
    def check(name, condition):
        checks[name]=bool(condition); m[name]=int(bool(condition))
    def rand(shape): return j.asarray(rng.normal(size=shape).astype('float32')*.25)
    def err(x,y): return float(j.max(j.abs(x-y)))
    def treeerr(x,y): return max(err(p,q) for p,q in zip(jax.tree.leaves(x),jax.tree.leaves(y)))
    if a.assessment=='jax-training':
        import optax
        width=32 if a.scope=='smoke' else 640
        learning_rate=.003 if a.scope=='smoke' else .0003
        iterations=500 if a.scope=='smoke' else 300
        s=c.create_state(a.seed,width,learning_rate)
        from flax.training.train_state import TrainState
        check('flax_state',isinstance(s,TrainState))
        n=sum(p.size for p in jax.tree.leaves(s.params)); m['parameters']=n
        check('parameter_count',10000<n<100000 if a.scope=='smoke' else 9_000_000<n<11_000_000)
        # Single-token integer vocabulary 0..18, PLUS=19, EQUALS=20.
        # Split operand pairs, not duplicate examples; heldout never enters training.
        pairs=np.array([(a,b) for a in range(10) for b in range(10)])
        np.random.default_rng(17).shuffle(pairs); train,test=pairs[:80],pairs[80:]
        def data(pairs):
            x=j.asarray(np.array([[a,19,b,20] for a,b in pairs]),j.int32)
            return x,j.asarray(pairs.sum(1),j.int32)
        x,y=data(train); hx,hy=data(test)
        loss=lambda p,xx,yy:optax.softmax_cross_entropy_with_integer_labels(s.apply_fn({'params':p},xx)[:,-1,:],yy).mean()
        logits=s.apply_fn({'params':s.params},x)
        check('token_logits',logits.shape==(80,4,21))
        changed=x.at[:,3].set(0)
        m['causal_error']=err(logits[:,:3],s.apply_fn({'params':s.params},changed)[:,:3])
        check('causal_mask',m['causal_error']<1e-6)
        initial=float(loss(s.params,x,y)); hi=float(loss(s.params,hx,hy))
        expected=jax.jit(lambda st,xx,yy:st.apply_gradients(grads=jax.grad(loss)(st.params,xx,yy)))(s,x,y)
        step=jax.jit(c.train_step); start=time.perf_counter(); actual=step(s,x,y)
        jax.block_until_ready(actual.params); m['compile_first_step_seconds']=time.perf_counter()-start
        m['update_error']=treeerr(actual,expected); check('gradient_update',m['update_error']<2e-5)
        start=time.perf_counter()
        for _ in range(iterations): s=step(s,x,y)
        jax.block_until_ready(s.params); m['training_seconds']=time.perf_counter()-start
        m['loss_ratio']=float(loss(s.params,x,y))/initial
        m['heldout_ratio']=float(loss(s.params,hx,hy))/hi
        generated=j.argmax(s.apply_fn({'params':s.params},hx)[:,-1,:],axis=-1)
        m['heldout_accuracy']=float(j.mean(generated==hy))
        m['heldout_examples']=int(hy.size); m['training_examples']=int(y.size); m['uniform_chance_accuracy']=1/21
        m['majority_baseline_accuracy']=float(j.mean(hy==j.bincount(y,length=21).argmax()))
        m['training_accuracy']=float(j.mean(j.argmax(s.apply_fn({'params':s.params},x)[:,-1,:],-1)==y))
        check('loss_reduction',m['loss_ratio']<.1); check('heldout',m['heldout_ratio']<2)
        check('heldout_generation',m['heldout_accuracy']>=.2)
        resumed=serialization.from_bytes(s,serialization.to_bytes(s))
        check('resume',treeerr(step(s,x,y),step(resumed,x,y))<1e-7)
        check('optimizer_advanced',int(s.step)==iterations)
    elif a.assessment=='dense-moe':
        T,D,F,E,K=24,8,32,4,2
        x=rand((T,D)); router=rand((D,E)); w1=rand((E,D,F)); w2=rand((E,F,D))
        y,ids,weights=c.moe_forward(x,router,w1,w2,K)
        vals,rids=jax.lax.top_k(x@router,K); rw=jax.nn.softmax(vals,axis=-1)
        # Independent full expert evaluation, only evaluator uses all experts.
        def reference(xx,rr,aa,bb):
            v,i=jax.lax.top_k(xx@rr,K); ww=jax.nn.softmax(v,-1)
            all_y=j.einsum('tef,efd->ted',jax.nn.relu(j.einsum('td,edf->tef',xx,aa)),bb)
            return (j.take_along_axis(all_y,i[:,:,None],axis=1)*ww[:,:,None]).sum(1)
        expected=reference(x,router,w1,w2)
        m['forward_error']=err(y,expected); check('forward',m['forward_error']<2e-5)
        check('routing',bool(j.all(ids==rids)) and err(weights,rw)<1e-6)
        m['routing_coverage']=len(np.unique(np.asarray(ids)))/E; check('coverage',m['routing_coverage']==1)
        cg=jax.grad(lambda xx,rr,aa,bb:j.sum(c.moe_forward(xx,rr,aa,bb,K)[0]**2),argnums=(0,1,2,3))(x,router,w1,w2)
        rg=jax.grad(lambda xx,rr,aa,bb:j.sum(reference(xx,rr,aa,bb)**2),argnums=(0,1,2,3))(x,router,w1,w2)
        m['gradient_error']=treeerr(cg,rg); check('gradients',m['gradient_error']<2e-5)
        dw1=rand((D,K*F)); dw2=rand((K*F,D))
        check('dense',err(c.dense_forward(x,dw1,dw2),jax.nn.relu(x@dw1)@dw2)<2e-5)
        measured_dense=dw1.size+dw2.size; measured_moe=router.size+w1.size+w2.size
        costs=c.costs(T,D,F,E,K); m.update({k:float(v) for k,v in costs.items()})
        check('parameter_accounting',costs['dense_params']==measured_dense and costs['moe_params']==measured_moe)
        check('compute_accounting',costs['dense_flops']==4*T*D*K*F and costs['moe_flops']==4*T*D*K*F+2*T*D*E)
        # Jaxpr review artifact: dynamic gather/dispatch is a separate human audit gate.
        check('no_token_drop',y.shape==(T,D) and ids.shape==(T,K))
        if a.scope!='smoke':
            max_forward=0.; max_gradient=0.; routes_ok=True; empty_cases=0
            for T,D,F,E,K in [(64,16,64,8,1),(48,24,96,6,3),(32,16,48,4,4)]:
                for skew in (False,True):
                    xx=rand((T,D)); rr=rand((D,E)); aa=rand((E,D,F)); bb=rand((E,F,D))
                    if skew: xx=j.abs(xx); rr=rr.at[:,0].set(10.)
                    yy,ii,ww=c.moe_forward(xx,rr,aa,bb,K)
                    empty_cases+=int(len(np.unique(np.asarray(ii)))<E)
                    vals,expected_ids=jax.lax.top_k(xx@rr,K)
                    routes_ok=routes_ok and bool(j.all(ii==expected_ids)) and err(ww,jax.nn.softmax(vals,-1))<1e-6
                    max_forward=max(max_forward,err(yy,reference(xx,rr,aa,bb)))
                    cg=jax.grad(lambda z:j.sum(c.moe_forward(z,rr,aa,bb,K)[0]**2))(xx)
                    rg=jax.grad(lambda z:j.sum(reference(z,rr,aa,bb)**2))(xx)
                    max_gradient=max(max_gradient,err(cg,rg))
            m['full_case_count']=6; m['empty_expert_cases']=empty_cases
            m['full_forward_error']=max_forward; m['full_gradient_error']=max_gradient
            m['full_contract_error']=max(max_forward/1e-4,max_gradient/5e-4,0 if routes_ok else 2)
            check('full_shapes',m['full_contract_error']<1)
            # Train both at equal active expert FLOPs (router is separately counted).
            import optax
            T,D,F,E,K=64,8,16,4,2
            xx=rand((T,D)); target=j.tanh(xx@rand((D,D)))
            dense=(rand((D,K*F)),rand((K*F,D)))
            moe=(rand((D,E)),rand((E,D,F)),rand((E,F,D)))
            dl=lambda pp:j.mean((c.dense_forward(xx,*pp)-target)**2)
            ml=lambda pp:j.mean((c.moe_forward(xx,*pp,K)[0]-target)**2)
            optimizer=optax.adam(.01)
            def fit(params,loss):
                state=optimizer.init(params); initial=float(loss(params))
                @jax.jit
                def update(params,state):
                    grads=jax.grad(loss)(params); updates,state=optimizer.update(grads,state,params)
                    return optax.apply_updates(params,updates),state
                start=time.perf_counter()
                for _ in range(200): params,state=update(params,state)
                jax.block_until_ready(params)
                return float(loss(params)),initial,time.perf_counter()-start
            df,di,dt=fit(dense,dl); mf,mi,mt=fit(moe,ml)
            m.update(dense_final_loss=df,moe_final_loss=mf,dense_loss_ratio=df/di,moe_loss_ratio=mf/mi,dense_training_seconds=dt,moe_training_seconds=mt,training_steps=200,training_active_flops=4*T*D*K*F*200,training_router_flops=2*T*D*E*200)
            m['comparative_loss_ratio']=max(df/di,mf/mi)
            check('comparative_training',m['comparative_loss_ratio']<.2)
    elif a.assessment=='scaling-laws':
        worst=0.; stationarity=0.; constraint=0.
        for _ in range(12 if a.scope=='smoke' else 128):
            C=10**rng.uniform(7,15); A,B=rng.uniform(.5,5,2); alpha,beta=rng.uniform(.2,.8,2)
            N,Dt=map(float,c.compute_optimal(C,A,B,alpha,beta)); assert N>0 and Dt>0
            constraint=max(constraint,abs(6*N*Dt/C-1))
            def objective(logn):
                n=np.exp(logn); return A/n**alpha+B/(C/(6*n))**beta
            z=np.log(N); h=1e-3
            stationarity=max(stationarity,abs(objective(z+h)-objective(z-h))/(2*h*objective(z)))
            grid=np.linspace(-5,np.log(C)+5,20001); best=float(np.min(objective(grid)))
            worst=max(worst,objective(z)/best-1)
        m.update(constraint_error=constraint,stationarity_error=stationarity,search_regret=worst)
        check('constraint',constraint<1e-8); check('stationarity',stationarity<1e-5); check('numerical_search',worst<1e-5)
    else:
        from jax.experimental import pallas as pl
        # Trace inspection verifies a Pallas primitive, not a renamed dense function.
        maxerr=0.; primitive=False
        def contains(eqns):
            return any('pallas_call' in str(eq.primitive) or any(contains(v.jaxpr.eqns) for v in eq.params.values() if hasattr(v,'jaxpr')) for eq in eqns)
        for sizes in ([0,3,0,5],[1,0,6,1],[0,0,0,8]):
            x=rand((8,16)); w=rand((4,16,32)); sz=j.array(sizes,j.int32)
            f=lambda xx,ww,ss:c.ragged_matmul(xx,ww,ss,not gpu)
            trace=jax.make_jaxpr(f)(x,w,sz); primitive=primitive or contains(trace.jaxpr.eqns)
            out=f(x,w,sz)
            expert=np.repeat(np.arange(4),sizes)
            expected=j.stack([x[t]@w[e] for t,e in enumerate(expert)])
            maxerr=max(maxerr,err(out,expected),err(out,jax.lax.ragged_dot(x,w,sz)))
        m['max_error']=maxerr; check('correctness',maxerr<2e-5); check('pallas_primitive',primitive); check('expansion_F_gt_D',w.shape[-1]>x.shape[-1])
        if not gpu and a.scope!='smoke':
            r['unsupported'].append('accelerator_performance'); check('accelerator_benchmark',False); check('accelerator_speedup',False); m['tokens_per_second']=0.; m['speedup']=0.
        elif gpu and a.scope!='smoke':
            x=rand((1024,128)); w=rand((4,128,512)); sz=j.array([0,128,640,256],j.int32)
            f=jax.jit(lambda x,w,s:c.ragged_matmul(x,w,s,False)); ref=jax.jit(jax.lax.ragged_dot)
            def timing(fn):
                fn(x,w,sz).block_until_ready(); samples=[]
                for _ in range(10):
                    t=time.perf_counter(); fn(x,w,sz).block_until_ready(); samples.append(time.perf_counter()-t)
                return float(np.median(samples))
            m['benchmark_error']=err(f(x,w,sz),ref(x,w,sz))
            assert m['benchmark_error']<2e-4, 'Benchmark-shape correctness failed'
            m['kernel_seconds']=timing(f); m['reference_seconds']=timing(ref)
            m['speedup']=m['reference_seconds']/m['kernel_seconds']
            m['tokens_per_second']=1024/m['kernel_seconds']
            check('accelerator_benchmark',m['tokens_per_second']>0)
            check('accelerator_speedup',m['speedup']>=1.05)

def main():
    p=argparse.ArgumentParser(); p.add_argument('--assessment',required=True,choices=['jax-training','dense-moe','scaling-laws','pallas-ragged']); p.add_argument('--seed',type=int,default=17); p.add_argument('--scope',choices=['smoke','full','accelerator'],default='smoke'); p.add_argument('--output',required=True); p.add_argument('--candidate',default=str(Path(__file__).with_name('candidate.py'))); a=p.parse_args()
    r=dict(schemaVersion=2,assessment=a.assessment,seed=a.seed,sourceHash='',evaluatorHash=digest(__file__),runtime=dict(python=platform.python_version(),platform=platform.platform(),packages={},device='unavailable'),scope=a.scope,status='failed',metrics={},checks={},unsupported=[])
    try:
        r['sourceHash']=digest(a.candidate)
        r['runtime']['packages']={k:importlib.metadata.version(k) for k in ['jax','jaxlib','flax','optax','numpy']}
        run(a,r)
        r['status']='unsupported' if r['unsupported'] and all(v for k,v in r['checks'].items() if k not in ('accelerator_benchmark','accelerator_speedup')) else ('passed' if all(r['checks'].values()) else 'failed')
    except Exception as e:
        r['error']=f'{type(e).__name__}: {e}'; r['checks']={}; r['metrics']={}; r['unsupported']=[]; r['status']='failed'
    try: payload=json.dumps(r,indent=2,allow_nan=False)
    except ValueError: r['metrics']={}; r['checks']={}; r['unsupported']=[]; r['status']='failed'; r['error']='Nonfinite metrics'; payload=json.dumps(r,indent=2)
    Path(a.output).parent.mkdir(parents=True,exist_ok=True); Path(a.output).write_text(payload+'\n'); print(payload)
    return 0 if r['status'] in ('passed','unsupported') else 1
if __name__=='__main__': raise SystemExit(main())
