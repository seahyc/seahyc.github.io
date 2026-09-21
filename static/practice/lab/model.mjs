import {validateAdvanced,scopedReports} from './grading.mjs';
export const KEY='experiment-workspace-v1';
export const fresh=()=>({version:1,track:'shared',selected:'gradient-check',entries:{}});
export function restore(value,program){
 if(!value||value.version!==1||!value.entries||typeof value.entries!=='object'||Array.isArray(value.entries))throw Error('Unrecognized workspace backup; existing data was kept.');
 const ids=new Set(program.missions.map(m=>m.id));const result=fresh();
 result.track=program.tracks.some(t=>t.id===value.track)?value.track:'shared';
 result.selected=ids.has(value.selected)?value.selected:'gradient-check';
 for(const [id,e] of Object.entries(value.entries)){if(!ids.has(id)||!e||typeof e!=='object')continue;
 result.entries[id]={hypothesis:String(e.hypothesis||'').slice(0,12000),findings:String(e.findings||'').slice(0,30000),artifact:String(e.artifact||'').slice(0,2000),reviewer:String(e.reviewer||'').slice(0,2000),review:String(e.review||'').slice(0,12000),updated:Number(e.updated)||0,...(typeof e.source==='string'?{source:e.source}:{}),reports:[]};
 for(const r of (Array.isArray(e.reports)?e.reports:[]).slice(-20)){try{result.entries[id].reports.push(validateReport(r,program.missions.find(m=>m.id===id).track,program.assessments?.[program.missions.find(m=>m.id===id).runtime?.assessment]));}catch{/* Keep notes; invalid report cannot count. */}}
 }
 return result;
}
export function validateReport(r,track,definition){
 if(definition&&r?.schemaVersion!==2)throw Error('This project requires an advanced assessment report.');
 if(r?.schemaVersion===2)return validateAdvanced(r,definition);
 const tracks=['posttrain','rl','infra','robotics'];
 if(!r||r.schemaVersion!==1||!tracks.includes(track)||r.track!==track||!['passed','failed'].includes(r.status)||!Number.isSafeInteger(r.seed)||!/^[a-f0-9]{64}$/.test(r.candidateSha256||'')||!/^[a-f0-9]{64}$/.test(r.evaluatorSha256||''))throw Error('Expected a kit result for this track with source and evaluator hashes.');
 const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
 if(!object(r.metrics)||!object(r.checks)||Object.values(r.checks).some(v=>typeof v!=='boolean'))throw Error('Malformed metrics/checks.');
 function numericFinite(v){if(typeof v==='number'&&!Number.isFinite(v))throw Error('Nonfinite measurement.');if(v&&typeof v==='object')Object.values(v).forEach(numericFinite);}numericFinite(r);
 if(r.runtime!==undefined&&(!object(r.runtime)||typeof r.runtime.python!=='string'||!r.runtime.python.trim()||typeof r.runtime.platform!=='string'||!r.runtime.platform.trim()||typeof r.runtime.machine!=='string'))throw Error('Malformed runtime metadata.');
 const m=r.metrics;
 // An exception before evaluation produces no measurements and must stay failed.
 if(r.status==='failed'&&!Object.keys(m).length&&!Object.keys(r.checks).length){
  if(typeof r.error!=='string'||!r.error.trim())throw Error('An empty failed report must identify the execution error.');
  return JSON.parse(JSON.stringify(r));
 }
 const number=(key,min=0,max=Infinity)=>{if(typeof m[key]!=='number'||!Number.isFinite(m[key])||m[key]<min||m[key]>max)throw Error(`Invalid measurement: ${key}.`);return m[key];};
 const vector=(key,min=0,max=1)=>{const v=m[key];if(!Array.isArray(v)||v.length!==3||v.some(x=>typeof x!=='number'||!Number.isFinite(x)||x<min||x>max))throw Error(`Expected three valid measurements: ${key}.`);return v;};
 const close=(a,b)=>Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(a),Math.abs(b));
 const consistent=(a,b,label)=>{if(!close(a,b))throw Error(`Inconsistent measurement: ${label}.`);};
 const mean=v=>v.reduce((a,b)=>a+b,0)/v.length;
 let expected,fields;
 if(track==='posttrain'){
  fields=['heldout_accuracy','seed_accuracies','preference_loss','uniform_loss','uniform_accuracy'];
  const acc=vector('seed_accuracies'),loss=number('preference_loss');
  consistent(number('heldout_accuracy',0,1),mean(acc),'heldout_accuracy');
  consistent(number('uniform_loss'),Math.log(2),'uniform_loss');consistent(number('uniform_accuracy',0,1),.5,'uniform_accuracy');
  expected={accuracy_each_split:Math.min(...acc)>=.88,preference_loss_improves:loss<.4};
 }else if(track==='rl'){
  fields=['evaluation_returns','mean_return','uniform_expected_return','expected_regrets'];
  const scores=vector('evaluation_returns'),regrets=vector('expected_regrets',-1e-12,.6+1e-12);
  consistent(number('mean_return',0,1),mean(scores),'mean_return');consistent(number('uniform_expected_return',0,1),1.3/3,'uniform_expected_return');
  expected={each_seed_beats_uniform:Math.min(...scores)>.62,low_policy_regret:Math.max(...regrets)<.1};
 }else if(track==='infra'){
  fields=['worst_relative_l2_error','max_normalized_weight_error','float_python_median_us','quantized_python_median_us','speed_ratio_float_over_quantized','packed_numeric_bytes_ratio','zero_row_max_abs_error'];
  const error=number('worst_relative_l2_error'),weight=number('max_normalized_weight_error'),zero=number('zero_row_max_abs_error');
  const floatTime=number('float_python_median_us',Number.MIN_VALUE),quantTime=number('quantized_python_median_us',Number.MIN_VALUE);
  consistent(number('speed_ratio_float_over_quantized',Number.MIN_VALUE),floatTime/quantTime,'speed ratio');consistent(number('packed_numeric_bytes_ratio'),(24*48+24*4)/(24*48*4),'packed bytes ratio');
  expected={matvec_correct:error<.03,weight_quantization_correct:weight<=1/127,zero_row_exact:zero===0};
 }else{
  fields=['closed_loop_success_rates','mean_final_distance','zero_action_mean_final_distance','training_action_mse','training_episodes','evaluation_episodes'];
  const rates=vector('closed_loop_success_rates'),distance=number('mean_final_distance'),baseline=number('zero_action_mean_final_distance'),mse=number('training_action_mse');
  if(number('training_episodes')!==50||number('evaluation_episodes')!==120)throw Error('Unexpected episode counts.');
  expected={imitates_demonstrations:mse<1e-4,closed_loop_robust:Math.min(...rates)>=.9,beats_zero_action:distance<.15*baseline};
 }
 if(Object.keys(m).length!==fields.length||fields.some(key=>!Object.hasOwn(m,key)))throw Error('Unexpected measurement schema.');
 if(Object.keys(r.checks).length!==Object.keys(expected).length||Object.entries(expected).some(([key,value])=>r.checks[key]!==value))throw Error('Reported checks disagree with the measured results.');
 if((r.status==='passed')!==Object.values(expected).every(Boolean))throw Error('Reported status disagrees with the measured results.');
 return JSON.parse(JSON.stringify(r));
}
export function stateOf(m,state,code){
 if(m.kind==='browser'){const p=code?.exercises?.[m.id];return p?.passed&&(!p.lastResult||p.lastResult==='pass')?'checks passed':'pending';}
 const e=state.entries[m.id];if(!e)return 'pending';
 if(!m.runtime&&e.review?.trim().length>=80&&e.reviewer?.trim()&&e.artifact?.trim())return 'review recorded';
 if(m.runtime&&scopedReports(m,e.reports).some(r=>r.status==='passed'))return `${m.runtime.requiredScope} checks recorded`;
 if(m.runtime&&e.reports?.some(r=>r.status==='passed'))return `${e.reports.filter(r=>r.status==='passed').at(-1).scope} checks recorded`;
 if(m.kind==='kit'&&e.reports?.some(r=>r.status==='passed'))return 'checks recorded';
 return e.findings?.trim()?'evidence recorded':'in progress';
}
export function nextMission(program,state,code){
 const inScope=m=>m.track==='shared'||m.track===state.track;
 const complete=m=>m.kind==='browser'?stateOf(m,state,code)==='checks passed':m.kind==='kit'?reportSummary(state.entries[m.id]?.reports).consistentSeeds>=3&&(state.entries[m.id]?.findings?.trim().length||0)>=80:m.runtime?reportSummary(scopedReports(m,state.entries[m.id]?.reports)).consistentSeeds>=3&&(state.entries[m.id]?.findings?.trim().length||0)>=80&&(state.entries[m.id]?.review?.trim().length||0)>=80&&!!state.entries[m.id]?.reviewer?.trim()&&!!state.entries[m.id]?.artifact?.trim():stateOf(m,state,code)==='review recorded';
 return program.missions.find(m=>inScope(m)&&!complete(m))||program.missions.find(m=>m.track===state.track)||program.missions[0];
}
export function reportSummary(reports=[]){
 const passed=reports.filter(r=>r.status==='passed');
 const groups=new Map();for(const r of reports){const key=(r.sourceHash||r.candidateSha256)+':'+(r.evaluatorHash||r.evaluatorSha256)+':'+(r.scope||'kit');if(!groups.has(key))groups.set(key,new Map());groups.get(key).set(r.seed,r.status==='passed');}
 const seeds=Math.max(0,...[...groups.values()].map(s=>[...s.values()].filter(Boolean).length));
 return {runs:reports.length,passed:passed.length,consistentSeeds:seeds};
}
