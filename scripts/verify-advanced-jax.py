#!/usr/bin/env python3
"""Private evaluator regression tests. Never publish under static/."""
import json, subprocess, sys, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
LAB=ROOT/'static/practice/lab/advanced/jax'
REFERENCE='''import jax
import jax.numpy as j
import flax.linen as nn
from flax.training.train_state import TrainState
import optax
from jax.experimental import pallas as pl
class Model(nn.Module):
    width:int
    @nn.compact
    def __call__(self,tokens):
        x=nn.Embed(21,self.width)(tokens)
        x=x+self.param('position',nn.initializers.normal(.02),(1,4,self.width))[:,:tokens.shape[1]]
        mask=nn.make_causal_mask(tokens)
        for _ in range(2):
            h=nn.LayerNorm()(x)
            x=x+nn.MultiHeadDotProductAttention(num_heads=4,qkv_features=self.width,out_features=self.width,dropout_rate=0)(h,h,mask=mask)
            h=nn.LayerNorm()(x); x=x+nn.Dense(self.width)(nn.gelu(nn.Dense(4*self.width)(h)))
        return nn.Dense(21)(nn.LayerNorm()(x))
def create_state(seed,width,learning_rate):
    model=Model(width); params=model.init(jax.random.key(seed),j.ones((1,4),j.int32))['params']
    return TrainState.create(apply_fn=model.apply,params=params,tx=optax.adam(learning_rate))
def train_step(state,x,y):
    loss=lambda p:optax.softmax_cross_entropy_with_integer_labels(state.apply_fn({'params':p},x)[:,-1,:],y).mean()
    return state.apply_gradients(grads=jax.grad(loss)(state.params))
def dense_forward(x,w1,w2): return jax.nn.relu(x@w1)@w2
def moe_forward(x,router,w1,w2,k):
    vals,ids=jax.lax.top_k(x@router,k); weights=jax.nn.softmax(vals,-1)
    selected=jax.vmap(lambda xx,ii:jax.vmap(lambda e:jax.nn.relu(xx@w1[e])@w2[e])(ii))(x,ids)
    return (selected*weights[:,:,None]).sum(1),ids,weights
def costs(tokens,d,f,experts,k):
    return dict(dense_params=2*d*k*f,moe_params=2*experts*d*f+d*experts,dense_flops=4*tokens*d*k*f,moe_flops=4*tokens*d*k*f+2*tokens*d*experts)
def compute_optimal(C,A,B,alpha,beta):
    N=((alpha*A/(beta*B))*(C/6)**beta)**(1/(alpha+beta)); return N,C/(6*N)
def ragged_matmul(x,weights,group_sizes,interpret):
    T,D=x.shape; E,_,F=weights.shape
    def kernel(xr,wr,sr,yr):
        row=pl.program_id(0); sizes=sr[:]; ends=j.cumsum(sizes)
        expert=j.sum(row>=ends); dd=j.arange(D); ff=j.arange(F)
        xv=xr[row,dd]; ww=wr[expert,dd[:,None],ff[None,:]]
        yr[row,ff]=j.sum(xv[:,None]*ww,axis=0)
    return pl.pallas_call(kernel,out_shape=jax.ShapeDtypeStruct((T,F),x.dtype),grid=(T,),interpret=interpret)(x,weights,group_sizes)
'''
CASES=[('bad_causal_mask',REFERENCE.replace('mask=nn.make_causal_mask(tokens)','mask=None'),['jax-training'],False),('reference',REFERENCE,['jax-training','dense-moe','scaling-laws','pallas-ragged'],True),('todo',(LAB/'candidate.py').read_text(),['jax-training','dense-moe','scaling-laws','pallas-ragged'],False),('constant_training',REFERENCE+'\ndef train_step(state,x,y): return state\n',['jax-training'],False),('bad_router',REFERENCE.replace('weights=jax.nn.softmax(vals,-1)','weights=j.ones_like(vals)/k'),['dense-moe'],False),('bad_scaling',REFERENCE+'\ndef compute_optimal(C,A,B,alpha,beta): return (C/6)**.5,(C/6)**.5\n',['scaling-laws'],False),('bad_mask',REFERENCE.replace('expert=j.sum(row>=ends)','expert=j.array(0)'),['pallas-ragged'],False),('constant_ragged',REFERENCE+'\ndef ragged_matmul(x,weights,group_sizes,interpret): return j.zeros((x.shape[0],weights.shape[-1]))\n',['pallas-ragged'],False)]
def validate_result(result):
    if result.get('error'):
        assert result['status']=='failed' and result['metrics']=={} and result['checks']=={}
        return
    if result['unsupported']==['accelerator_hardware']:
        assert result['status']=='unsupported' and not result['metrics'] and not result['checks']
        return
    manifest=json.loads((LAB/'manifest.json').read_text())
    assessment=next(x for x in manifest['assessments'] if x['id']==result['assessment'])
    criteria=assessment['scopes'][result['scope']]['criteria']
    assert set(result['checks'])=={c['name'] for c in criteria},result
    for c in criteria:
        v=result['metrics'][c['metric']]; threshold=c['value']
        expected={'eq':lambda:v==threshold,'lt':lambda:v<threshold,'gt':lambda:v>threshold,'gte':lambda:v>=threshold}[c['op']]()
        assert result['checks'][c['name']]==expected,(c,result)

def main():
    with tempfile.TemporaryDirectory(prefix='jax-assess-') as temp:
        for name,source,ids,passes in CASES:
            candidate=Path(temp)/f'{name}.py'; candidate.write_text(source)
            for assessment in ids:
                output=Path(temp)/'result.json'
                p=subprocess.run([sys.executable,str(LAB/'evaluate.py'),'--assessment',assessment,'--seed','17','--scope','smoke','--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
                result=json.loads(output.read_text()); validate_result(result); supported=all(result['checks'].values()) and result['status']!='failed'
                print(name,assessment,result['status'],result['metrics'],result.get('error',''),flush=True)
                assert supported==passes,(name,assessment,p.stdout,p.stderr)
                if name=='reference' and assessment=='pallas-ragged': assert result['scope']=='smoke' and 'accelerator_benchmark' not in result['checks'] if 'cpu' in result['runtime']['device'].lower() else True
        candidate=Path(temp)/'reference.py'
        for assessment in ['dense-moe','scaling-laws','pallas-ragged']:
            output=Path(temp)/f'{assessment}-full.json'
            subprocess.run([sys.executable,str(LAB/'evaluate.py'),'--assessment',assessment,'--scope','full','--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
            result=json.loads(output.read_text()); validate_result(result)
            print('reference',assessment,'full',result['status'],result['metrics'],flush=True)
            assert result['status']==('unsupported' if assessment=='pallas-ragged' and 'cpu' in result['runtime']['device'].lower() else 'passed')

        for scope,expected in [('full','passed'),('accelerator','unsupported')]:
            output=Path(temp)/f'{scope}.json'
            subprocess.run([sys.executable,str(LAB/'evaluate.py'),'--assessment','jax-training','--scope',scope,'--candidate',str(candidate),'--output',str(output)],capture_output=True,text=True)
            result=json.loads(output.read_text()); validate_result(result)
            print('reference jax-training',scope,result['status'],result['metrics'],flush=True)
            if scope=='full': assert result['status']==expected
            elif 'cpu' in result['runtime']['device'].lower(): assert result['status']==expected
    print('PASS: real JAX reference checks and all negative controls')
if __name__=='__main__': main()
