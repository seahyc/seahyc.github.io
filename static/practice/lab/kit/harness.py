"""Portable, transparent public experiment evaluator. Not a secure hidden grader."""
import argparse
import hashlib
import importlib.util
import json
import math
import platform
import random
import statistics
import time
from pathlib import Path


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def finite(values):
    return all(isinstance(v, (int, float)) and not isinstance(v, bool) and math.isfinite(v) for v in values)


def sigmoid(x):
    return 1 / (1 + math.exp(-max(-700, min(700, x))))


def posttrain(c, seed):
    rng = random.Random(seed)
    teacher = [rng.uniform(-1, 1) for _ in range(5)]
    def samples(r, n):
        xs = [[r.gauss(0, 1) for _ in teacher] for _ in range(n)]
        return [(x, int(dot(x, teacher) > 0)) for x in xs]
    train = samples(rng, 200)
    w = c.fit_preferences(train, 0.7, 250, 0.15)
    if len(w) != 5 or not finite(w):
        raise ValueError('Expected five finite weights')
    accuracies, losses = [], []
    for s in (seed + 10001, seed + 20001, seed + 30001):
        data = samples(random.Random(s), 250)
        accuracies.append(statistics.mean(int((dot(w, x) > 0) == bool(y)) for x, y in data))
        losses.append(statistics.mean(math.log1p(math.exp(-max(-700, min(700, 0.7 * (2*y-1)*dot(w,x))))) for x,y in data))
    metrics = dict(heldout_accuracy=statistics.mean(accuracies), seed_accuracies=accuracies,
                   preference_loss=statistics.mean(losses), uniform_loss=math.log(2), uniform_accuracy=0.5)
    return metrics, {'accuracy_each_split': min(accuracies) >= .88, 'preference_loss_improves': metrics['preference_loss'] < .4}


def rl(c, seed):
    scores, regrets = [], []
    for offset in (0, 1000, 2000):
        rng = random.Random(seed + offset)
        means = [.15, .4, .75]
        rng.shuffle(means)
        calls = 0
        def pull(action):
            nonlocal calls
            if not isinstance(action, int) or action not in range(3):
                raise ValueError('Invalid action')
            calls += 1
            if calls > 6000:
                raise ValueError('Training interaction budget exceeded')
            return float(rng.random() < means[action])
        p = c.train_bandit(pull, 3, 6000, seed + offset)
        if len(p) != 3 or not finite(p) or min(p) < 0 or abs(sum(p)-1) > 1e-6 or calls < 100:
            raise ValueError('Invalid policy or insufficient training interactions')
        # Independent environment draws measure a frozen policy, without further learning.
        erng = random.Random(seed + offset + 50001)
        total = 0
        for _ in range(3000):
            u = erng.random()
            a = 0 if u < p[0] else (1 if u < p[0]+p[1] else 2)
            total += erng.random() < means[a]
        scores.append(total / 3000)
        regrets.append(max(means)-dot(p,means))
    return {'evaluation_returns': scores, 'mean_return': statistics.mean(scores), 'uniform_expected_return': 1.3/3,
            'expected_regrets': regrets}, {'each_seed_beats_uniform': min(scores) > .62, 'low_policy_regret': max(regrets) < .1}


def infra(c, seed):
    rng = random.Random(seed)
    matrix = [[rng.uniform(-1,1) * (10 ** (i%5-2)) for _ in range(48)] for i in range(24)]
    matrix[0] = [0.] * 48
    q, scales = c.quantize_rows(matrix)
    if len(q) != 24 or len(scales) != 24 or not finite(scales) or min(scales) < 0:
        raise ValueError('Invalid quantization dimensions/scales')
    if any(len(row)!=48 or any(type(v) is not int or not -127<=v<=127 for v in row) for row in q):
        raise ValueError('Quantized elements must be signed int8 values excluding -128')
    errors = []
    for _ in range(12):
        x = [rng.uniform(-1,1) for _ in range(48)]
        expected = [dot(row,x) for row in matrix]
        actual = c.quantized_matvec(q,scales,x)
        if len(actual)!=24 or not finite(actual):
            raise ValueError('Invalid matvec output')
        errors.append(math.sqrt(sum((a-b)**2 for a,b in zip(actual,expected))/max(1e-20,sum(b*b for b in expected))))
    reconstructed = [[v*s for v in row] for row,s in zip(q,scales)]
    max_row_error = max(max(abs(a-b) for a,b in zip(original,rebuilt))/max(1e-12,max(map(abs,original))) for original,rebuilt in zip(matrix,reconstructed))
    def bench(fn):
        for _ in range(20): fn()
        results=[]
        for _ in range(7):
            start=time.perf_counter_ns()
            for _ in range(100): fn()
            results.append((time.perf_counter_ns()-start)/100/1000)
        return statistics.median(results)
    baseline_us=bench(lambda:[dot(row,x) for row in matrix])
    quant_us=bench(lambda:c.quantized_matvec(q,scales,x))
    return {'worst_relative_l2_error':max(errors),'max_normalized_weight_error':max_row_error,'zero_row_max_abs_error':max(map(abs,reconstructed[0])),
            'float_python_median_us':baseline_us,'quantized_python_median_us':quant_us,
            'speed_ratio_float_over_quantized':baseline_us/quant_us,
            'packed_numeric_bytes_ratio':(24*48+24*4)/(24*48*4)}, {
                'matvec_correct':max(errors)<.03,'weight_quantization_correct':max_row_error<=1/127,
                'zero_row_exact':all(v==0 for v in reconstructed[0])}


def robotics(c, seed):
    rng=random.Random(seed)
    # Each demonstration is a complete trajectory; heldout episodes never enter fitting.
    gain=rng.uniform(.65,.95)
    episodes=[]
    for _ in range(50):
        pos=[rng.uniform(-1,1),rng.uniform(-1,1)]
        goal=[rng.uniform(-1,1),rng.uniform(-1,1)]
        episode=[]
        for _ in range(30):
            error=[g-p for g,p in zip(goal,pos)]
            action=[gain*e for e in error]
            episode.append((error,action))
            pos=[p+.15*a for p,a in zip(pos,action)]
        episodes.append(episode)
    w=c.fit_controller(episodes)
    if len(w)!=2 or any(len(row)!=2 or not finite(row) for row in w):
        raise ValueError('Expected finite 2x2 controller weights')
    mse=statistics.mean((dot(row,error)-action[j])**2 for episode in episodes for error,action in episode for j,row in enumerate(w))
    rates=[]; finals=[]; baseline_finals=[]
    for offset in (10001,20001,30001):
        erng=random.Random(seed+offset)
        successes=0
        for _ in range(40):
            pos=[erng.uniform(-2,2),erng.uniform(-2,2)]
            goal=[erng.uniform(-2,2),erng.uniform(-2,2)]
            baseline=pos[:]
            for _ in range(80):
                error=[g-p for g,p in zip(goal,pos)]
                action=[max(-1,min(1,dot(row,error))) for row in w]
                disturbance=[erng.gauss(0,.008),erng.gauss(0,.008)]
                pos=[p+.15*a+d for p,a,d in zip(pos,action,disturbance)]
                baseline=[p+d for p,d in zip(baseline,disturbance)]
            distance=math.dist(pos,goal)
            successes+=distance<.12
            finals.append(distance); baseline_finals.append(math.dist(baseline,goal))
        rates.append(successes/40)
    return {'closed_loop_success_rates':rates,'mean_final_distance':statistics.mean(finals),
            'zero_action_mean_final_distance':statistics.mean(baseline_finals),'training_action_mse':mse,
            'training_episodes':50,'evaluation_episodes':120}, {
                'imitates_demonstrations':mse<1e-4,'closed_loop_robust':min(rates)>=.9,
                'beats_zero_action':statistics.mean(finals)<.15*statistics.mean(baseline_finals)}


TRACKS={'posttrain':posttrain,'rl':rl,'infra':infra,'robotics':robotics}

def run(track, seed, candidate_path):
    source=Path(candidate_path)
    result={'schemaVersion':1,'track':track,'seed':seed,'candidateSha256':hashlib.sha256(source.read_bytes()).hexdigest(),
            'evaluatorSha256':hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
            'runtime':{'python':platform.python_version(),'platform':platform.platform(),'machine':platform.machine()},
            'metrics':{},'checks':{},'status':'failed',
            'evaluationScope':'Public educational experiment; independent replication and scientific review still required.'}
    try:
        spec=importlib.util.spec_from_file_location('candidate_submission',source)
        module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
        metrics,checks=TRACKS[track](module,seed)
        json.dumps(metrics,allow_nan=False)
        result.update(metrics=metrics,checks=checks,status='passed' if checks and all(checks.values()) else 'failed')
    except Exception as exc:
        result['error']=f'{type(exc).__name__}: {exc}'
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--track',choices=TRACKS,required=True)
    parser.add_argument('--seed',type=int,default=17)
    parser.add_argument('--output',default='result.json')
    parser.add_argument('--candidate',default=str(Path(__file__).with_name('candidate.py')))
    args=parser.parse_args()
    result=run(args.track,args.seed,args.candidate)
    Path(args.output).write_text(json.dumps(result,indent=2,allow_nan=False)+'\n')
    print(json.dumps({'track':args.track,'status':result['status'],'checks':result['checks'],'error':result.get('error')}))
    raise SystemExit(0 if result['status']=='passed' else 1)
