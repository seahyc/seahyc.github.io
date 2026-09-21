"""Independent fixture verification; references stay outside published assets."""
import importlib.util
from pathlib import Path
import tempfile
import shutil
import subprocess
import sys
import os
sys.dont_write_bytecode=True
os.environ["PYTHONDONTWRITEBYTECODE"]="1"

ROOT=Path(__file__).resolve().parents[1]
KIT=ROOT/'static/practice/lab/kit'
spec=importlib.util.spec_from_file_location('lab_harness',KIT/'harness.py')
h=importlib.util.module_from_spec(spec);spec.loader.exec_module(h)
REFERENCE='''
import math
import random

def fit_preferences(pairs,beta,steps,learning_rate):
    w=[0.]*len(pairs[0][0])
    for _ in range(steps):
        grad=[0.]*len(w)
        for x,y in pairs:
            sign=2*y-1
            z=beta*sign*sum(a*b for a,b in zip(w,x))
            scale=-beta*sign/(1+math.exp(z))
            for j in range(len(w)):grad[j]+=scale*x[j]/len(pairs)
        w=[a-learning_rate*g for a,g in zip(w,grad)]
    return w

def train_bandit(pull,n_actions,steps,seed):
    rng=random.Random(seed);theta=[0.]*n_actions;baseline=0.
    for _ in range(steps):
        exp=[math.exp(t-max(theta)) for t in theta];p=[v/sum(exp) for v in exp]
        u=rng.random();action=n_actions-1;total=0.
        for j,v in enumerate(p):
            total+=v
            if u<total:action=j;break
        reward=pull(action);advantage=reward-baseline;baseline+=.02*advantage
        theta=[t+.05*advantage*((j==action)-p[j]) for j,t in enumerate(theta)]
    exp=[math.exp(t-max(theta)) for t in theta]
    return [v/sum(exp) for v in exp]

def quantize_rows(matrix):
    scales=[max(map(abs,row))/127 for row in matrix]
    return [[round(v/s) if s else 0 for v in row] for row,s in zip(matrix,scales)],scales

def quantized_matvec(integer_rows,scales,vector):
    return [sum(v*x for v,x in zip(row,vector))*s for row,s in zip(integer_rows,scales)]

def fit_controller(episodes):
    xx=xy=yy=0.;targets=[[0.,0.],[0.,0.]]
    for episode in episodes:
        for x,a in episode:
            xx+=x[0]*x[0];xy+=x[0]*x[1];yy+=x[1]*x[1]
            for j in range(2):
                targets[j][0]+=a[j]*x[0];targets[j][1]+=a[j]*x[1]
    determinant=xx*yy-xy*xy
    return [[(u*yy-v*xy)/determinant,(v*xx-u*xy)/determinant] for u,v in targets]
'''
CONSTANT='''
def fit_preferences(*args): return [0.]*5
def train_bandit(pull,n_actions,steps,seed):
    for _ in range(100):pull(0)
    return [1/3]*3
def quantize_rows(matrix):return [[0]*len(row) for row in matrix],[1.]*len(matrix)
def quantized_matvec(q,s,x):return [0.]*len(q)
def fit_controller(episodes):return [[0.,0.],[0.,0.]]
'''
count=0
with tempfile.TemporaryDirectory() as tmp:
    for kind,source in [('reference',REFERENCE),('constant',CONSTANT),('nonfinite',REFERENCE.replace('return w','return [float("nan")]*5').replace('return [v/sum(exp) for v in exp]','return [float("nan")]*n_actions').replace('return [[round(v/s) if s else 0 for v in row] for row,s in zip(matrix,scales)],scales','return [[0]*len(row) for row in matrix],[float("nan")]*len(matrix)').replace('return [[(u*yy-v*xy)/determinant,(v*xx-u*xy)/determinant] for u,v in targets]','return [[float("nan")]*2]*2'))]:
        path=Path(tmp)/f'{kind}.py';path.write_text(source)
        for seed in (17,91,203):
            for track in h.TRACKS:
                result=h.run(track,seed,path)
                expected='passed' if kind=='reference' else 'failed'
                assert result['status']==expected,(kind,seed,track,result)
                count+=1
        print(f'{kind}: 12/12 expected outcomes')
    for track in h.TRACKS:
        result=h.run(track,17,KIT/'candidate.py')
        assert result['status']=='failed' and 'NotImplementedError' in result.get('error',''),result
        count+=1
    print('starter: 4/4 fail honestly')
    shutil.copy(KIT/'test_candidate.py',Path(tmp)/'test_candidate.py')
    (Path(tmp)/'candidate.py').write_text(REFERENCE)
    tests=subprocess.run([sys.executable,'-m','unittest','-v'],cwd=tmp,capture_output=True,text=True)
    assert tests.returncode==0,tests.stdout+tests.stderr
    print(tests.stderr.strip())
    out=Path(tmp)/'result.json'
    cli=subprocess.run([sys.executable,str(KIT/'harness.py'),'--track','robotics','--candidate',str(Path(tmp)/'candidate.py'),'--output',str(out)],capture_output=True,text=True)
    assert cli.returncode==0 and out.is_file(),cli.stdout+cli.stderr
    print('CLI reference:',cli.stdout.strip())
    cli=subprocess.run([sys.executable,str(KIT/'harness.py'),'--track','posttrain','--output',str(out)],capture_output=True,text=True)
    assert cli.returncode==1 and out.is_file(),cli.stdout+cli.stderr
    print('CLI starter:',cli.stdout.strip())
print(f'PASS {count} experiment checks, 5 public unit tests, and 2 CLI exit/result checks')
