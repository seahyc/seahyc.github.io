"""Verify neural primitives using trusted reference fixtures outside public assets."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile

sys.dont_write_bytecode=True
os.environ['PYTHONDONTWRITEBYTECODE']='1'
ROOT=Path(__file__).resolve().parents[1]
REFERENCES={'mlp-backprop': "import math\n\ndef forward_and_grad(params,x,target):\n    h=[math.tanh(sum(w*v for w,v in zip(row,x))+b) for row,b in zip(params['W1'],params['b1'])]\n    prediction=sum(w*v for w,v in zip(params['W2'],h))+params['b2']\n    error=prediction-target\n    hidden_grad=[error*w*(1-v*v) for w,v in zip(params['W2'],h)]\n    return prediction,.5*error*error,{'W1':[[g*v for v in x] for g in hidden_grad],'b1':hidden_grad,'W2':[error*v for v in h],'b2':error}\n", 'causal-attention': 'import math\n\ndef causal_attention(queries,keys,values):\n    if not queries:return [],[]\n    n=len(queries);d=len(queries[0]);v=len(values[0]);outputs=[];weights=[]\n    for i,q in enumerate(queries):\n        scores=[sum(a*b for a,b in zip(q,k))/math.sqrt(d) for k in keys[:i+1]]\n        peak=max(scores);exp=[math.exp(s-peak) for s in scores];den=sum(exp)\n        row=[e/den for e in exp]+[0.]*(n-i-1)\n        weights.append(row);outputs.append([sum(row[j]*values[j][z] for j in range(i+1)) for z in range(v)])\n    return outputs,weights\n', 'language-model-loss': "import math\n\ndef next_token_loss(logits,tokens,loss_mask,pad_id):\n    per=[]\n    for t in range(len(tokens)-1):\n        target=tokens[t+1]\n        if not loss_mask[t+1] or target==pad_id:per.append(None);continue\n        row=logits[t];m=max(row)\n        per.append((m-row[target])+math.log(sum(math.exp(v-m) for v in row)))\n    included=[v for v in per if v is not None]\n    return {'loss':sum(included)/len(included) if included else 0.,'token_count':len(included),'per_position':per}\n"}
MUTANTS={
    'mlp-backprop': REFERENCES['mlp-backprop'].replace("'b2':error", "'b2':0.0"),
    'causal-attention': REFERENCES['causal-attention'].replace('keys[:i+1]', 'keys').replace("+[0.]*(n-i-1)", '').replace('range(i+1)', 'range(n)'),
    'language-model-loss': REFERENCES['language-model-loss'].replace('loss_mask[t+1]', 'loss_mask[t]'),
}
pack=json.loads((ROOT/'static/practice/neural.json').read_text())
assert len(pack['exercises'])==3
count=0
for exercise in pack['exercises']:
    assert set(('id','title','stage','minutes','focus','why','brief','entry','files','hints'))<=exercise.keys()
    assert exercise['entry'] in exercise['files']
    assert len(exercise['hints'])==3
    assert 'src/candidate_tests.py' in exercise['files'] and 'DESIGN.md' in exercise['files']
    for path,source in exercise['files'].items():
        if path.endswith('.py'):compile(source,path,'exec')
    with tempfile.TemporaryDirectory() as tmp:
        folder=Path(tmp)
        (folder/'tests.py').write_text(exercise['files']['src/tests.py'])
        for label,source in [('starter',exercise['files'][exercise['entry']]),('reference',REFERENCES[exercise['id']]),('mutant',MUTANTS[exercise['id']])]:
            (folder/'solution.py').write_text(source)
            result=subprocess.run([sys.executable,'-m','unittest','-v','tests'],cwd=tmp,text=True,capture_output=True,timeout=30)
            if label=='reference':
                assert result.returncode==0,result.stdout+result.stderr
                print(exercise['id']+': reference\n'+result.stderr.strip())
            elif label=='mutant':
                assert result.returncode!=0,result.stdout+result.stderr
                print(exercise['id']+': incorrect gradient/mask implementation rejected')
            else:
                assert result.returncode!=0 and 'NotImplementedError' in result.stderr,result.stdout+result.stderr
                print(exercise['id']+': starter fails honestly')
            count+=1
print(f'PASS {count} real suite outcomes; randomized all-weight finite differences, causal invariance, loss shift and masking properties verified')
