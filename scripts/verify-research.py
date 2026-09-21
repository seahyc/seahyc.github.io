#!/usr/bin/env python3
"""Validate CPU research drills against executable, development reference fixtures.

No dependencies beyond Python's standard library. Reference implementations stay
outside static/ and are never shipped as browser exercise files. Public tests are
formative checks, not a secret assessment. Additional randomized checks below
exercise invariants independently of the examples.
"""
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]

REFERENCES = {'gradient-check': 'import math\n'
                   '\n'
                   'def loss_and_grad(w,b,x,y):\n'
                   "    if y not in (0,1):raise ValueError('binary label required')\n"
                   '    z=w*x+b\n'
                   '    loss=max(z,0)-y*z+math.log1p(math.exp(-abs(z)))\n'
                   '    if z>=0:p=1/(1+math.exp(-z))\n'
                   '    else:\n'
                   '        e=math.exp(z);p=e/(1+e)\n'
                   '    return loss,(p-y)*x,p-y\n'
                   '\n'
                   'def central_difference(f,theta,eps=1e-5):\n'
                   "    if eps<=0:raise ValueError('positive eps required')\n"
                   '    return (f(theta+eps)-f(theta-eps))/(2*eps)\n',
 'sgd-regression': 'def mse(data,w,b):\n'
                   "    if not data:raise ValueError('nonempty data required')\n"
                   '    return sum((w*x+b-y)**2 for x,y in data)/len(data)\n'
                   '\n'
                   'def train(data,lr,epochs):\n'
                   '    if not data or lr<0 or isinstance(epochs,bool) or not '
                   "isinstance(epochs,int) or epochs<0:raise ValueError('invalid training "
                   "configuration')\n"
                   '    w=b=0.;losses=[mse(data,w,b)]\n'
                   '    for _ in range(epochs):\n'
                   '        for x,y in data:\n'
                   '            error=w*x+b-y\n'
                   '            w-=lr*2*error*x;b-=lr*2*error\n'
                   '        losses.append(mse(data,w,b))\n'
                   '    return dict(w=w,b=b,losses=losses)\n',
 'categorical-policy': 'import math\n'
                       '\n'
                       'def softmax(logits):\n'
                       "    if not logits:raise ValueError('nonempty logits required')\n"
                       '    m=max(logits);e=[math.exp(z-m) for z in logits];total=sum(e)\n'
                       '    return [v/total for v in e]\n'
                       '\n'
                       'def log_prob(logits,action):\n'
                       '    if not logits or isinstance(action,bool) or not isinstance(action,int) '
                       "or not 0<=action<len(logits):raise ValueError('invalid action')\n"
                       '    m=max(logits)\n'
                       '    return logits[action]-m-math.log(sum(math.exp(z-m) for z in logits))\n'
                       '\n'
                       'def reinforce_loss_grad(logits,action,advantage):\n'
                       '    lp=log_prob(logits,action);p=softmax(logits)\n'
                       '    return -advantage*lp,[advantage*(v-(j==action)) for j,v in '
                       'enumerate(p)]\n',
 'gae-returns': 'def gae(rewards,values,next_values,terminated,truncated,gamma,lam):\n'
                '    n=len(rewards)\n'
                '    if any(len(s)!=n for s in (values,next_values,terminated,truncated)) or not '
                "0<=gamma<=1 or not 0<=lam<=1:raise ValueError('invalid trajectory')\n"
                '    a=[0.]*n;carry=0.\n'
                '    for t in reversed(range(n)):\n'
                '        delta=rewards[t]+gamma*(0 if terminated[t] else '
                'next_values[t])-values[t]\n'
                '        carry=delta+(0 if terminated[t] or truncated[t] else gamma*lam*carry)\n'
                '        a[t]=carry\n'
                '    return a,[a[t]+values[t] for t in range(n)]\n',
 'ppo-objective': 'import math\n'
                  '\n'
                  'def ppo_loss(old_logp,new_logp,advantages,clip_eps=.2):\n'
                  '    n=len(old_logp)\n'
                  '    if not n or len(new_logp)!=n or len(advantages)!=n or not '
                  "0<=clip_eps<1:raise ValueError('invalid PPO batch')\n"
                  '    loss=clipped=kl=0.\n'
                  '    for old,new,a in zip(old_logp,new_logp,advantages):\n'
                  '        d=new-old;r=math.exp(d);c=min(1+clip_eps,max(1-clip_eps,r))\n'
                  '        loss-=min(r*a,c*a);clipped+=r<1-clip_eps or r>1+clip_eps;kl+=(r-1)-d\n'
                  '    return dict(loss=loss/n,clip_fraction=clipped/n,approx_kl=kl/n)\n',
 'preference-loss': 'import math\n'
                    '\n'
                    'def '
                    'dpo_loss(policy_chosen,policy_rejected,reference_chosen,reference_rejected,beta=.1):\n'
                    "    if not math.isfinite(beta) or beta<=0:raise ValueError('finite positive "
                    "beta required')\n"
                    '    '
                    'margin=beta*((policy_chosen-policy_rejected)-(reference_chosen-reference_rejected))\n'
                    '    loss=max(-margin,0)+math.log1p(math.exp(-abs(margin)))\n'
                    '    if margin>=0:\n'
                    '        e=math.exp(-margin);q=e/(1+e)\n'
                    '    else:q=1/(1+math.exp(margin))\n'
                    '    gc=-beta*q\n'
                    '    return loss,margin,gc,-gc\n',
 'quantized-linear': 'import math\n'
                     '\n'
                     'def _shape(rows):\n'
                     '    if not rows or not rows[0] or any(len(r)!=len(rows[0]) for r in '
                     "rows):raise ValueError('nonempty rectangular matrix required')\n"
                     '\n'
                     'def quantize_rows(weights):\n'
                     '    _shape(weights);q=[];scales=[]\n'
                     '    for row in weights:\n'
                     "        if not all(math.isfinite(v) for v in row):raise ValueError('finite "
                     "weights required')\n"
                     '        m=max(map(abs,row));s=m/127 if m else 1.\n'
                     '        q.append([max(-127,min(127,round(v/s))) for v in '
                     'row]);scales.append(s)\n'
                     '    return q,scales\n'
                     '\n'
                     'def dequantize_rows(qrows,scales):\n'
                     '    _shape(qrows)\n'
                     '    if len(scales)!=len(qrows) or any(not math.isfinite(s) or s<=0 for s in '
                     "scales):raise ValueError('invalid scales')\n"
                     '    if any(isinstance(v,bool) or not isinstance(v,int) or not -127<=v<=127 '
                     "for r in qrows for v in r):raise ValueError('invalid quantized weight')\n"
                     '    return [[v*s for v in row] for row,s in zip(qrows,scales)]\n'
                     '\n'
                     'def quantized_matvec(qrows,scales,x):\n'
                     '    rows=dequantize_rows(qrows,scales)\n'
                     "    if len(x)!=len(rows[0]):raise ValueError('vector width mismatch')\n"
                     '    return [sum(w*v for w,v in zip(row,x)) for row in rows]\n',
 'robot-rollout': 'import math\n'
                  '\n'
                  'def _vector(v):\n'
                  '    if len(v)!=2 or not all(math.isfinite(x) for x in v):raise '
                  "ValueError('finite 2D vector required')\n"
                  '\n'
                  'def _config(dt,max_speed):\n'
                  '    if not math.isfinite(dt) or not math.isfinite(max_speed) or dt<=0 or '
                  "max_speed<=0:raise ValueError('positive dynamics configuration required')\n"
                  '\n'
                  'def step(position,action,dt=.1,max_speed=1.):\n'
                  '    _vector(position);_vector(action);_config(dt,max_speed)\n'
                  '    return [p+dt*min(max_speed,max(-max_speed,a)) for p,a in '
                  'zip(position,action)]\n'
                  '\n'
                  'def rollout(start,target,gain,steps,dt=.1,max_speed=1.):\n'
                  '    _vector(start);_vector(target);_config(dt,max_speed)\n'
                  '    if not math.isfinite(gain) or gain<0 or isinstance(steps,bool) or not '
                  "isinstance(steps,int) or steps<0:raise ValueError('invalid controller "
                  "configuration')\n"
                  '    positions=[list(start)]\n'
                  '    for _ in range(steps):\n'
                  '        p=positions[-1];positions.append(step(p,[gain*(t-v) for t,v in '
                  'zip(target,p)],dt,max_speed))\n'
                  '    return positions\n'
                  '\n'
                  'def evaluate(targets,gain,steps,dt=.1,max_speed=1.,tolerance=.05):\n'
                  '    if not targets or not math.isfinite(tolerance) or tolerance<0:raise '
                  "ValueError('invalid evaluation')\n"
                  '    distances=[];lengths=[]\n'
                  '    for target in targets:\n'
                  '        path=rollout([0.,0.],target,gain,steps,dt,max_speed)\n'
                  '        distances.append(math.hypot(*(a-b for a,b in zip(path[-1],target))))\n'
                  '        lengths.append(sum(math.hypot(*(b-a for a,b in zip(p,q))) for p,q in '
                  'zip(path,path[1:])))\n'
                  '    n=len(targets)\n'
                  '    return dict(success_rate=sum(d<=tolerance for d in '
                  'distances)/n,mean_final_distance=sum(distances)/n,mean_path_length=sum(lengths)/n)\n'}

PROPERTY_TESTS = {
    'gradient-check': '''
class Properties(unittest.TestCase):
    def test_seeded_derivatives_and_label_symmetry(self):
        rng=random.Random(1741)
        for _ in range(100):
            w,b,x=[rng.uniform(-3,3) for _ in range(3)];y=rng.randrange(2)
            loss,gw,gb=loss_and_grad(w,b,x,y)
            h=1e-5
            numerical_w=(loss_and_grad(w+h,b,x,y)[0]-loss_and_grad(w-h,b,x,y)[0])/(2*h)
            numerical_b=(loss_and_grad(w,b+h,x,y)[0]-loss_and_grad(w,b-h,x,y)[0])/(2*h)
            self.assertAlmostEqual(gw,numerical_w,places=7)
            self.assertAlmostEqual(gb,numerical_b,places=7)
            self.assertAlmostEqual(loss,loss_and_grad(-w,-b,x,1-y)[0],places=12)
''',
    'sgd-regression': '''
class Properties(unittest.TestCase):
    def test_unseen_lines_learn_and_generalize(self):
        rng=random.Random(1742)
        train_x=[-1.5,-1,-.5,0,.5,1,1.5]
        test_x=[-1.3,-.7,.2,.8,1.2]
        for _ in range(15):
            slope,bias=rng.uniform(-4,4),rng.uniform(-2,2)
            data=[(x,slope*x+bias) for x in train_x]
            result=train(data,.025,150)
            heldout_error=sum((result['w']*x+result['b']-(slope*x+bias))**2 for x in test_x)/len(test_x)
            self.assertLess(heldout_error,1e-10)
            self.assertLess(result['losses'][-1],result['losses'][0]*1e-8)
            self.assertEqual(len(result['losses']),151)
            self.assertAlmostEqual(result['losses'][-1],mse(data,result['w'],result['b']))
    def test_curve_records_measured_epochs(self):
        data=[(-.3,.7),(.4,-.2),(1.1,1.8)]
        long=train(data,.01,9)
        for epoch in range(10):
            short=train(data,.01,epoch)
            self.assertAlmostEqual(long['losses'][epoch],mse(data,short['w'],short['b']))
''',
    'categorical-policy': '''
class Properties(unittest.TestCase):
    def test_seeded_gradient_and_conservation(self):
        rng=random.Random(1743)
        for _ in range(40):
            n=rng.randint(2,8);z=[rng.uniform(-5,5) for _ in range(n)];a=rng.randrange(n);adv=rng.uniform(-3,3)
            loss,g=reinforce_loss_grad(z,a,adv);h=1e-5
            self.assertAlmostEqual(sum(softmax(z)),1);self.assertAlmostEqual(sum(g),0)
            for j in range(n):
                p=z.copy();m=z.copy();p[j]+=h;m[j]-=h
                self.assertAlmostEqual(g[j],(-adv*log_prob(p,a)+adv*log_prob(m,a))/(2*h),places=7)
            shifted=[v+400 for v in z]
            self.assertAlmostEqual(log_prob(z,a),log_prob(shifted,a),places=11)
''',
    'gae-returns': '''
class Properties(unittest.TestCase):
    def test_seeded_independent_forward_expansion(self):
        rng=random.Random(1744)
        for _ in range(40):
            n=rng.randint(1,12);rewards=[rng.uniform(-2,2) for _ in range(n)];values=[rng.uniform(-2,2) for _ in range(n)];next_values=[rng.uniform(-2,2) for _ in range(n)]
            term=[rng.random()<.2 for _ in range(n)];trunc=[rng.random()<.2 for _ in range(n)];gamma,lam=rng.random(),rng.random()
            a,ret=gae(rewards,values,next_values,term,trunc,gamma,lam)
            for start in range(n):
                expected=0
                for end in range(start,n):
                    residual=rewards[end]-values[end]
                    if not term[end]:residual+=gamma*next_values[end]
                    expected+=(gamma*lam)**(end-start)*residual
                    if term[end] or trunc[end]:break
                self.assertAlmostEqual(a[start],expected,places=12)
                self.assertAlmostEqual(ret[start],expected+values[start],places=12)
''',
    'ppo-objective': '''
class Properties(unittest.TestCase):
    def test_seeded_pessimism_and_identity(self):
        rng=random.Random(1745)
        for _ in range(80):
            a=rng.uniform(-3,3);ratio=rng.uniform(.05,3);eps=rng.uniform(0,.9)
            r=ppo_loss([-.7],[-.7+math.log(ratio)],[a],eps)
            surrogate=-r['loss']
            self.assertLessEqual(surrogate,ratio*a+1e-12)
            self.assertLessEqual(surrogate,min(1+eps,max(1-eps,ratio))*a+1e-12)
            if a>=0:expected=a*min(ratio,1+eps)
            else:expected=a*max(ratio,1-eps)
            self.assertAlmostEqual(surrogate,expected,places=12)
            self.assertGreaterEqual(r['approx_kl'],-1e-12)
            self.assertAlmostEqual(ppo_loss([-.7],[-.7],[a],eps)['loss'],-a)
''',
    'preference-loss': '''
class Properties(unittest.TestCase):
    def test_seeded_gradients_and_preference_direction(self):
        rng=random.Random(1746)
        for _ in range(80):
            args=[rng.uniform(-10,0) for _ in range(4)]+[rng.uniform(.01,2)]
            loss,margin,gc,gr=dpo_loss(*args);h=1e-5
            for j,g in [(0,gc),(1,gr)]:
                plus=args.copy();minus=args.copy();plus[j]+=h;minus[j]-=h
                self.assertAlmostEqual(g,(dpo_loss(*plus)[0]-dpo_loss(*minus)[0])/(2*h),places=7)
            self.assertAlmostEqual(gc+gr,0)
            improved=args.copy();improved[0]+=.01
            self.assertLessEqual(dpo_loss(*improved)[0],loss)
            self.assertAlmostEqual(margin,args[4]*((args[0]-args[1])-(args[2]-args[3])))
''',
    'quantized-linear': '''
class Properties(unittest.TestCase):
    def test_seeded_reconstruction_and_operator_bound(self):
        rng=random.Random(1747)
        for _ in range(50):
            rows,cols=rng.randint(1,7),rng.randint(1,15)
            w=[[rng.uniform(-9,9) for _ in range(cols)] for _ in range(rows)];x=[rng.uniform(-4,4) for _ in range(cols)]
            q,scales=quantize_rows(w);reconstructed=dequantize_rows(q,scales);y=quantized_matvec(q,scales,x)
            for original,back,quant,scale,out in zip(w,reconstructed,q,scales,y):
                self.assertEqual(max(map(abs,quant)),127)
                for real,approx in zip(original,back):self.assertLessEqual(abs(real-approx),scale/2+1e-12)
                expected=sum(a*b for a,b in zip(original,x))
                self.assertLessEqual(abs(out-expected),scale/2*sum(map(abs,x))+1e-11)
                self.assertAlmostEqual(out,sum(a*b for a,b in zip(back,x)),places=12)
''',
    'robot-rollout': '''
class Properties(unittest.TestCase):
    def test_seeded_action_bound_and_heldout_generalization(self):
        rng=random.Random(1748)
        # Controller configuration is fixed before generating held-out targets.
        gain,dt,max_speed,steps=2.,.1,1.,100
        targets=[[rng.uniform(-1,1),rng.uniform(-1,1)] for _ in range(30)]
        r=evaluate(targets,gain,steps,dt,max_speed)
        self.assertEqual(r['success_rate'],1);self.assertLess(r['mean_final_distance'],1e-7)
        for t in targets:
            path=rollout([0,0],t,gain,steps,dt,max_speed)
            self.assertEqual(len(path),steps+1)
            for p,q in zip(path,path[1:]):
                self.assertLessEqual(abs(q[0]-p[0]),dt*max_speed+1e-12)
                self.assertLessEqual(abs(q[1]-p[1]),dt*max_speed+1e-12)
                self.assertLessEqual(math.dist(q,t),math.dist(p,t)+1e-12)
    def test_metrics_aggregate_trajectories(self):
        targets=[[.5,.1],[-.2,.4],[1,-.7]];gain=7;steps=6;dt=.2
        paths=[rollout([0,0],t,gain,steps,dt) for t in targets]
        distances=[math.dist(p[-1],t) for p,t in zip(paths,targets)]
        lengths=[sum(math.dist(p,q) for p,q in zip(path,path[1:])) for path in paths]
        got=evaluate(targets,gain,steps,dt)
        self.assertAlmostEqual(got['mean_final_distance'],sum(distances)/len(targets))
        self.assertAlmostEqual(got['mean_path_length'],sum(lengths)/len(targets))
''',
}


def run_suite(work, module):
    result = subprocess.run(
        [sys.executable, '-B', '-m', 'unittest', '-v', module],
        cwd=work / 'src', capture_output=True, text=True, timeout=30,
    )
    return result, result.stdout + result.stderr


def main():
    spec = importlib.util.spec_from_file_location('validate_exercises', ROOT / 'scripts/verify-exercises.py')
    validator = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(validator)
    data = json.loads((ROOT / 'static/practice/research.json').read_text())
    exercises = validator.validate(data)
    assert len(exercises) == 8
    assert {ex['id'] for ex in exercises} == set(REFERENCES) == set(PROPERTY_TESTS)
    compiled = validator.compile_starters(exercises)
    total_tests = 0
    with tempfile.TemporaryDirectory(prefix='research-verification-') as directory:
        for exercise in exercises:
            work = Path(directory) / exercise['id']
            for name, content in exercise['files'].items():
                dest = work / name
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_text(content)
            result, output = run_suite(work, 'tests')
            if result.returncode == 0 or 'NotImplementedError' not in output:
                raise AssertionError(f"Starter must fail on unimplemented work for {exercise['id']}:\n{output}")
            (work / exercise['entry']).write_text(REFERENCES[exercise['id']])
            result, output = run_suite(work, 'tests')
            if result.returncode:
                raise AssertionError(f"Reference failed {exercise['id']}:\n{output}")
            import re
            count = int(re.search(r'Ran (\d+) tests?', output).group(1))
            assert count >= 5, f"Too few collected tests for {exercise['id']}"
            (work / 'src/properties.py').write_text(
                'import math\nimport random\nimport unittest\nfrom solution import *\n' + PROPERTY_TESTS[exercise['id']]
            )
            result, output = run_suite(work, 'properties')
            if result.returncode:
                raise AssertionError(f"Randomized checks failed {exercise['id']}:\n{output}")
            properties = int(re.search(r'Ran (\d+) tests?', output).group(1))
            total_tests += count + properties
            print(f"{exercise['id']}: starter fails; reference {count} tests + {properties} seeded property checks pass")
    print(f"Schema and compilation: PASS ({len(exercises)} exercises, {compiled} Python files)")
    print(f"Reference verification: PASS ({total_tests} collected tests; 8/8 expected starter failures)")


if __name__ == '__main__':
    main()
