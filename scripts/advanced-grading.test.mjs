import test from 'node:test';
import assert from 'node:assert/strict';
import {validateAdvanced,scopedReports} from '../static/practice/lab/grading.mjs';
import {reportSummary,restore,fresh,nextMission} from '../static/practice/lab/model.mjs';
const definition={id:'train',scopes:{smoke:{criteria:[{name:'heldout',metric:'loss',op:'lt',value:.3}]},full:{criteria:[{name:'heldout',metric:'loss',op:'lt',value:.1}]},accelerator:{criteria:[],unsupported:true}}};
const report=(o={})=>({schemaVersion:2,assessment:'train',seed:17,sourceHash:'a'.repeat(64),evaluatorHash:'b'.repeat(64),runtime:{python:'3.12',platform:'Linux',packages:{},device:'cpu'},scope:'smoke',status:'passed',metrics:{loss:.2},checks:{heldout:true},unsupported:[],...o});
test('advanced checks are derived from raw measurements in the exact execution scope',()=>{
 assert.equal(validateAdvanced(report(),definition).status,'passed');
 assert.throws(()=>validateAdvanced(report({scope:'full'}),definition),/checks/);
 assert.equal(validateAdvanced(report({scope:'full',status:'failed',checks:{heldout:false}}),definition).status,'failed');
 for(const r of [report({assessment:'other'}),report({sourceHash:'abc'}),report({metrics:{loss:NaN}}),report({checks:{random:true}}),report({status:'passed',unsupported:['hardware']}),report({scope:'accelerator'})])assert.throws(()=>validateAdvanced(r,definition));
});
test('exceptions and unsupported gates remain visible without becoming passing work',()=>{
 for(const r of [report({status:'failed',metrics:{},checks:{},error:'NotImplementedError'}),report({scope:'accelerator',status:'unsupported',metrics:{},checks:{},unsupported:['hardware']})]){
  assert.equal(validateAdvanced(r,definition).status,r.status);assert.equal(reportSummary([r]).consistentSeeds,0);
 }
 assert.throws(()=>validateAdvanced(report({status:'failed',metrics:{},checks:{}}),definition));
});
test('seed aggregation separates scope, code and evaluator; a failed rerun revokes that seed',()=>{
 const runs=[report(),report({seed:29}),report({seed:43,scope:'full'}),report({seed:71,sourceHash:'c'.repeat(64)})];
 assert.equal(reportSummary(runs).consistentSeeds,2);
 runs.push(report({status:'failed',checks:{heldout:false}}));assert.equal(reportSummary(runs).consistentSeeds,1);
 assert.equal(scopedReports({runtime:{assessment:'train',requiredScope:'full'}},runs).length,1);
});
test('restore keeps source and validated scoped evidence, and smoke or prose cannot finish a project',()=>{
 const m={id:'project',track:'rl',kind:'external',runtime:{assessment:'train',requiredScope:'full'}};
 const next={id:'next',track:'rl',kind:'external'};
 const program={tracks:[{id:'shared'},{id:'rl'}],missions:[m,next],assessments:{train:definition}};
 const e={source:'#'+ 'x'.repeat(200001),findings:'measured findings '.repeat(10),artifact:'artifact',reviewer:'peer',review:'specific review '.repeat(10),reports:[17,29,43].map(seed=>report({seed}))};
 const state=restore({...fresh(),track:'rl',selected:'project',entries:{project:e}},program);
 assert.equal(state.entries.project.source,e.source);assert.equal(state.entries.project.reports.length,3);
 assert.equal(nextMission(program,state,{}).id,'project');
 state.entries.project.reports=[17,29,43].map(seed=>report({seed,scope:'full',metrics:{loss:.01}}));
 assert.equal(nextMission(program,state,{}).id,'next');
});
