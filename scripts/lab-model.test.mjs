import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {KEY,fresh,restore,validateReport,stateOf,nextMission,reportSummary} from '../static/practice/lab/model.mjs';
import {CODE_KEY,PATH_KEY} from '../static/practice/path/model.mjs';

const program=JSON.parse(readFileSync(new URL('../static/practice/lab/program.json',import.meta.url),'utf8'));
const research=JSON.parse(readFileSync(new URL('../static/practice/research.json',import.meta.url),'utf8'));
const neural=JSON.parse(readFileSync(new URL('../static/practice/neural.json',import.meta.url),'utf8'));
const mission=id=>program.missions.find(m=>m.id===id);
const metricsFor={
 posttrain:{heldout_accuracy:.92,seed_accuracies:[.91,.92,.93],preference_loss:.2,uniform_loss:Math.log(2),uniform_accuracy:.5},
 rl:{evaluation_returns:[.7,.72,.74],mean_return:.72,uniform_expected_return:1.3/3,expected_regrets:[.03,.02,.01]},
 infra:{worst_relative_l2_error:.01,max_normalized_weight_error:.003,float_python_median_us:50,quantized_python_median_us:100,speed_ratio_float_over_quantized:.5,packed_numeric_bytes_ratio:(24*48+24*4)/(24*48*4),zero_row_max_abs_error:0},
 robotics:{closed_loop_success_rates:[.95,.95,1],mean_final_distance:.03,zero_action_mean_final_distance:1.2,training_action_mse:1e-6,training_episodes:50,evaluation_episodes:120},
};
const checksFor={posttrain:{accuracy_each_split:true,preference_loss_improves:true},rl:{each_seed_beats_uniform:true,low_policy_regret:true},infra:{matvec_correct:true,weight_quantization_correct:true,zero_row_exact:true},robotics:{imitates_demonstrations:true,closed_loop_robust:true,beats_zero_action:true}};
const report=(overrides={})=>{const track=overrides.track||'rl';return {schemaVersion:1,track,status:'passed',seed:113,candidateSha256:'a'.repeat(64),evaluatorSha256:'b'.repeat(64),metrics:structuredClone(metricsFor[track]),checks:{...checksFor[track]},...overrides};};
const passedCore=()=>({exercises:Object.fromEntries(program.missions.filter(m=>m.kind==='browser').map(m=>[m.id,{passed:true,lastResult:'pass'}]))});

test('catalog has four domain lanes plus core, each lane reaches execution and external contribution',()=>{
 assert.deepEqual(new Set(program.tracks.map(t=>t.id)),new Set(['shared','posttrain','rl','infra','robotics']));
 const ids=program.missions.map(m=>m.id);assert.equal(new Set(ids).size,ids.length);
 for(const lane of program.tracks.filter(t=>t.id!=='shared')){
  const ms=program.missions.filter(m=>m.track===lane.id);
  assert.ok(ms.some(m=>m.rung===1&&m.kind==='kit'),lane.id);
  for(const rung of [2,3,4])assert.ok(ms.some(m=>m.rung===rung&&m.kind==='external'),`${lane.id} rung ${rung}`);
 }
 assert.deepEqual(new Set(program.missions.filter(m=>m.kind==='browser').map(m=>m.id)),new Set([...research.exercises,...neural.exercises].map(e=>e.id)));
});

test('all prerequisites exist, are acyclic, and precede dependent missions in each lane scope',()=>{
 const byId=new Map(program.missions.map(m=>[m.id,m]));const visiting=new Set(),visited=new Set();
 function visit(id){assert.ok(byId.has(id),`Missing prerequisite ${id}`);assert.ok(!visiting.has(id),`Cycle at ${id}`);if(visited.has(id))return;visiting.add(id);for(const p of byId.get(id).prerequisites)visit(p);visiting.delete(id);visited.add(id);}
 for(const id of byId.keys())visit(id);
 for(const track of program.tracks){
  const scope=program.missions.filter(m=>m.track==='shared'||m.track===track.id);
  for(let i=0;i<scope.length;i++)for(const p of scope[i].prerequisites)assert.ok(scope.slice(0,i).some(m=>m.id===p),`${track.id}: ${p} must precede ${scope[i].id}`);
 }
});

test('every cited source exists, and source identifiers and HTTPS URLs are valid',()=>{
 const sourceIds=new Set(program.sources.map(s=>s.id));assert.equal(sourceIds.size,program.sources.length);
 for(const source of program.sources){assert.ok(source.title.trim());assert.equal(new URL(source.url).protocol,'https:');}
 for(const m of program.missions){assert.ok(m.sources.length);for(const s of m.sources)assert.ok(sourceIds.has(s),`${m.id} -> ${s}`);}
});

test('lab state uses separate storage and never rewrites legacy code progress',()=>{
 assert.notEqual(KEY,CODE_KEY);assert.notEqual(KEY,PATH_KEY);
 const old={version:1,exercises:{'normalize-channel-names':{passed:true,lastAt:123,source:'saved user code'}},notes:'legacy'};
 const before=structuredClone(old);const state=fresh();state.entries['gradient-check']={findings:'started'};
 const restored=restore(state,program);stateOf(mission('gradient-check'),restored,old);
 assert.deepEqual(old,before);assert.equal(restored.entries['gradient-check'].findings,'started');assert.equal(restored.exercises,undefined);
 assert.throws(()=>restore(old,program),/Unrecognized/);assert.deepEqual(old,before);
});

test('pending and failed browser checks never count as passed',()=>{
 const m=mission('gradient-check');const s=fresh();
 for(const progress of [undefined,{passed:false},{passed:true,lastResult:'fail'},{passed:true,lastResult:'pending'}]){
  assert.equal(stateOf(m,s,{exercises:{[m.id]:progress}}),'pending');
 }
 assert.equal(stateOf(m,s,{exercises:{[m.id]:{passed:true,lastResult:'pass'}}}),'checks passed');
});

test('failed execution remains evidence and never enters the passing seed count',()=>{
 const r=validateReport(report({status:'failed',metrics:{},checks:{},error:'NotImplementedError: implement policy'}),'rl');
 const s=fresh();s.entries['rl-bench']={reports:[r],findings:'Observed baseline failure.'};
 assert.equal(stateOf(mission('rl-bench'),s,{}),'evidence recorded');
 assert.deepEqual(reportSummary([r]),{runs:1,passed:0,consistentSeeds:0});
 assert.throws(()=>validateReport(report({status:'pending'}),'rl'));
});

test('malformed reports reject wrong track, provenance, checks and nonfinite nested metrics',()=>{
 const malformed=[null,report({schemaVersion:2}),report({track:'infra'}),report({seed:1.5}),report({candidateSha256:'abc'}),report({evaluatorSha256:'x'.repeat(64)}),report({checks:{}}),report({checks:{improvement:false}}),report({checks:{improvement:1}}),report({checks:[]}),report({metrics:null}),report({metrics:{nested:[NaN]}}),report({metrics:{value:Infinity}})];
 for(const r of malformed)assert.throws(()=>validateReport(r,'rl'),JSON.stringify(r));
 const original=report();const validated=validateReport(original,'rl');validated.metrics.mean_return=0;
 assert.equal(original.metrics.mean_return,.72,'validated data must be detached from the import object');
});

test('mixed implementations, evaluator versions and duplicate seeds cannot inflate consistentSeeds',()=>{
 const runs=[report(),report(),report({seed:271}),report({seed:811,candidateSha256:'c'.repeat(64)}),report({seed:997,evaluatorSha256:'d'.repeat(64)}),report({seed:123,status:'failed',checks:{finite:false}})];
 assert.deepEqual(reportSummary(runs),{runs:6,passed:5,consistentSeeds:2});
 assert.equal(reportSummary([...runs,report({seed:811})]).consistentSeeds,3);
 assert.deepEqual(reportSummary(),{runs:0,passed:0,consistentSeeds:0});
});

test('restore keeps notes, review and valid evidence while discarding invalid imported reports',()=>{
 const input={...fresh(),track:'rl',selected:'rl-bench',entries:{'rl-bench':{hypothesis:'Expected an improvement.',findings:'Failure teaches something.',artifact:'local artifact',reviewer:'A reviewer',review:'A recorded review.',updated:42,reports:[report(),report({track:'posttrain'}),report({checks:{finite:false}})]},'unknown-mission':{findings:'ignored'}}};
 const restored=restore(input,program);
 assert.equal(restored.track,'rl');assert.equal(restored.selected,'rl-bench');assert.equal(restored.entries['rl-bench'].hypothesis,input.entries['rl-bench'].hypothesis);assert.equal(restored.entries['rl-bench'].findings,input.entries['rl-bench'].findings);assert.equal(restored.entries['rl-bench'].review,'A recorded review.');assert.equal(restored.entries['rl-bench'].reports.length,1);assert.equal(restored.entries['unknown-mission'],undefined);
 assert.equal(input.entries['rl-bench'].reports.length,3,'restore must not mutate the original backup');
});

test('restore rejects invalid containers and falls back safely for missing selection and track',()=>{
 for(const bad of [null,{}, {...fresh(),version:2},{...fresh(),entries:[]}])assert.throws(()=>restore(bad,program));
 const r=restore({...fresh(),track:'unknown',selected:'unknown'},program);assert.equal(r.track,'shared');assert.equal(r.selected,'gradient-check');
});

test('visiting or writing notes does not advance past incomplete work',()=>{
 const s=fresh();s.track='rl';s.entries['gradient-check']={findings:'Attempted a solution but not passed.'};
 assert.equal(nextMission(program,s,{}).id,'gradient-check');
 const code=passedCore();s.entries['rl-bench']={hypothesis:'',findings:'',reports:[]};
 assert.equal(nextMission(program,s,code).id,'rl-bench');
 s.entries['rl-bench'].findings='Long notes without a validated run. '.repeat(5);
 assert.equal(nextMission(program,s,code).id,'rl-bench');
});

test('kit advancement requires three consistent seeds and substantive findings',()=>{
 const s=fresh();s.track='rl';const code=passedCore();
 s.entries['rl-bench']={reports:[report(),report({seed:271}),report({seed:811,candidateSha256:'c'.repeat(64)})],findings:'A measured result with a baseline, a limitation, and an explanation of the experimental outcome. '.repeat(2)};
 assert.equal(nextMission(program,s,code).id,'rl-bench');
 s.entries['rl-bench'].reports.push(report({seed:811}));s.entries['rl-bench'].findings='Brief';
 assert.equal(nextMission(program,s,code).id,'rl-bench');
 s.entries['rl-bench'].findings='A measured result with a baseline, a limitation, and an explanation of the experimental outcome. '.repeat(2);
 assert.equal(nextMission(program,s,code).id,'rl-repro');
});

test('an external artifact alone does not advance without an attributable review',()=>{
 const s=fresh();s.track='rl';const code=passedCore();
 s.entries['rl-bench']={reports:[report(),report({seed:271}),report({seed:811})],findings:'Measured baseline and controlled comparison. '.repeat(4)};
 s.entries['rl-repro']={artifact:'https://example.com/artifact',findings:'Results and traces. '.repeat(6)};
 assert.equal(nextMission(program,s,code).id,'rl-repro');
 s.entries['rl-repro'].review='Independent reproduction of the baseline and the changed run, with examined uncertainty and acknowledged limits. '.repeat(2);
 assert.equal(nextMission(program,s,code).id,'rl-repro');
 s.entries['rl-repro'].reviewer='Peer reviewer';assert.equal(nextMission(program,s,code).id,'rl-stress');
});


test('all four real harness report shapes validate with optional runtime metadata',()=>{
 for(const track of ['posttrain','rl','infra','robotics']){
  const r=report({track});assert.equal(validateReport(r,track).status,'passed');
  r.runtime={python:'3.12.4',platform:'Linux-6.8-aarch64',machine:'aarch64'};
  assert.deepEqual(validateReport(r,track).runtime,r.runtime);
  r.runtime.machine='';assert.doesNotThrow(()=>validateReport(r,track));
  r.runtime.python='';assert.throws(()=>validateReport(r,track),/runtime/);
 }
});

test('required metrics, check names and finite numeric types cannot be replaced by arbitrary success flags',()=>{
 for(const track of ['posttrain','rl','infra','robotics']){
  for(const metrics of [{},[],{score:1}])assert.throws(()=>validateReport(report({track,metrics}),track));
  const missing=report({track});delete missing.metrics[Object.keys(missing.metrics)[0]];assert.throws(()=>validateReport(missing,track));
  const nonfinite=report({track});nonfinite.metrics[Object.keys(nonfinite.metrics)[0]]=NaN;assert.throws(()=>validateReport(nonfinite,track));
  const arbitrary=report({track,checks:{looks_good:true}});assert.throws(()=>validateReport(arbitrary,track));
 }
 const strings=report();strings.metrics.mean_return='.72';assert.throws(()=>validateReport(strings,'rl'));
 const emptyFailed=report({status:'failed',metrics:{},checks:{},error:'ValueError: bad output shape'});
 assert.equal(validateReport(emptyFailed,'rl').status,'failed');
 delete emptyFailed.error;assert.throws(()=>validateReport(emptyFailed,'rl'));
 for(const metrics of [[],null])assert.throws(()=>validateReport({...emptyFailed,metrics,error:'failure'},'rl'));
});

test('acceptance checks are recomputed from metrics, including exact inequality boundaries',()=>{
 const mutations=[
  ['posttrain','preference_loss',.4,'preference_loss_improves'],
  ['rl','expected_regrets',[.01,.02,.1],'low_policy_regret'],
  ['infra','worst_relative_l2_error',.03,'matvec_correct'],
  ['infra','zero_row_max_abs_error',1e-12,'zero_row_exact'],
  ['robotics','training_action_mse',1e-4,'imitates_demonstrations'],
  ['robotics','closed_loop_success_rates',[.95,.875,1],'closed_loop_robust'],
 ];
 for(const [track,key,value,check] of mutations){
  const r=report({track});r.metrics[key]=value;
  assert.throws(()=>validateReport(r,track),/checks|status/,`${track} cannot claim passing with failed ${key}`);
  r.checks[check]=false;r.status='failed';assert.equal(validateReport(r,track).status,'failed');
 }
 const accuracy=report({track:'posttrain'});accuracy.metrics.seed_accuracies=[.87,.92,.93];accuracy.metrics.heldout_accuracy=(.87+.92+.93)/3;
 assert.throws(()=>validateReport(accuracy,'posttrain'));
 const returnBoundary=report();returnBoundary.metrics.evaluation_returns=[.62,.72,.74];returnBoundary.metrics.mean_return=(.62+.72+.74)/3;
 assert.throws(()=>validateReport(returnBoundary,'rl'));
 const claimedFailure=report({status:'failed'});assert.throws(()=>validateReport(claimedFailure,'rl'),/status/);
});

test('aggregate and baseline measurements must agree with raw values and fixed experiment configuration',()=>{
 for(const [track,key,value] of [['posttrain','heldout_accuracy',.99],['posttrain','uniform_accuracy',.1],['rl','mean_return',.99],['rl','uniform_expected_return',0],['infra','speed_ratio_float_over_quantized',2],['infra','packed_numeric_bytes_ratio',.1],['robotics','training_episodes',1],['robotics','evaluation_episodes',20]]){
  const r=report({track});r.metrics[key]=value;assert.throws(()=>validateReport(r,track),`${track}: ${key}`);
 }
});
