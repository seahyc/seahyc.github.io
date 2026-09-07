import test from 'node:test';
import assert from 'node:assert/strict';
import curriculum from '../static/practice/curriculum.json' with {type:'json'};
import ramp from '../static/practice/ramp.json' with {type:'json'};
import sessionData from '../static/practice/path/sessions.json' with {type:'json'};
import {skillProfile,coveredBySkills,adaptiveNextStep} from '../static/practice/learning-model.mjs';
import {nextStep} from '../static/practice/mastery.mjs';
import {taskSkills} from '../static/practice/skill-catalog.mjs';

const DAY=86400000, NOW=Date.parse('2026-03-01T00:00:00Z');
const ev=(id,at=NOW,x={})=>({id,at,sessionId:x.sessionId||`${id}-${at}`,passed:x.passed??true,cold:x.cold??true,assisted:x.assisted??false,fresh:x.fresh??false,kind:x.kind});
const code=(events=[],exercises={})=>({version:1,learningEvents:events,exercises,attempts:[]});
const ex=id=>({id,title:id,stage:id.includes('mock')?'Mock':'Build',files:{}});

test('early repetition neither postpones due nor inflates delayed evidence',()=>{
 const p=skillProfile(code([ev('tiny-filter-cold'),ev('tiny-filter-cold',NOW+3600000,{sessionId:'two'})]),NOW+3600000).filtering;
 assert.equal(p.dueAt,NOW+DAY);assert.equal(p.delayedChecks,0);assert.equal(p.status,'independent');
});

test('guided results can never establish independent skill evidence',()=>{
 const p=skillProfile(code([ev('tiny-filter-guided',NOW,{cold:true,fresh:true})]),NOW).filtering;
 assert.equal(p.independent,false);assert.equal(p.status,'learning');
});

test('a genuinely delayed fresh variant supplies transfer and delayed evidence',()=>{
 const p=skillProfile(code([ev('tiny-filter-cold'),ev('variation-filtering',NOW+DAY,{fresh:true})]),NOW+DAY).filtering;
 assert.equal(p.transfer,true);assert.equal(p.delayedChecks,1);assert.equal(p.retained,true);assert.deepEqual(p.independentTasks,['tiny-filter-cold','variation-filtering']);
});

test('hints and failures schedule repair; later clean repair does not advance interval',()=>{
 let p=skillProfile(code([ev('tiny-filter-cold'),ev('variation-filtering',NOW+DAY,{passed:false,cold:false})]),NOW+DAY).filtering;
 assert.equal(p.needsRepair,true);assert.equal(p.dueAt,NOW+DAY+600000);
 p=skillProfile(code([ev('tiny-filter-cold'),ev('variation-filtering',NOW+DAY,{passed:false,cold:false}),ev('variation-filtering',NOW+DAY+700000)]),NOW+DAY+700000).filtering;
 assert.equal(p.needsRepair,false);assert.equal(p.delayedChecks,0);
});

test('pass failure pass in one session clears repair without adding evidence',()=>{
 const p=skillProfile(code([ev('tiny-filter-cold',NOW,{sessionId:'one'}),ev('tiny-filter-cold',NOW+1,{sessionId:'one',passed:false,cold:false}),ev('tiny-filter-cold',NOW+2,{sessionId:'one'})]),NOW+2).filtering;
 assert.equal(p.needsRepair,false);assert.equal(p.delayedChecks,0);assert.deepEqual(p.independentTasks,['tiny-filter-cold']);
});

test('diagnostic independence covers teaching only and never mocks',()=>{
 const c=code([ev('probe-filtering',NOW,{fresh:true})]);
 assert.equal(coveredBySkills(c,'tiny-filter-guided',NOW),true);assert.equal(coveredBySkills(c,'tiny-filter-cold',NOW),true);
 assert.equal(coveredBySkills(c,'dependency-graph',NOW),false);
});

test('advanced probes do not cover their canonical builds',()=>{
 assert.equal(coveredBySkills(code([ev('probe-intervals')]),'interval-windows',NOW),false);
 assert.equal(coveredBySkills(code([ev('probe-throttling')]),'rate-limiter',NOW),false);
});

test('coverageTasks require independent evidence from every named task',()=>{
 const map=taskSkills['syntax-faded'], before=map.coverageTasks;map.coverageTasks=['probe-normalization'];
 try{assert.equal(coveredBySkills(code([ev('variation-normalization')]),'syntax-faded',NOW),false);assert.equal(coveredBySkills(code([ev('probe-normalization')]),'syntax-faded',NOW),true);}finally{map.coverageTasks=before;}
});

test('passive exposure updates spacing but never creates repair or credit',()=>{
 const p=skillProfile(code([ev('tiny-filter-cold'),ev('tiny-filter-cold',NOW+DAY,{passed:false,cold:false,kind:'exposure'})]),NOW+DAY).filtering;
 assert.equal(p.lastAt,NOW+DAY);assert.equal(p.needsRepair,false);assert.equal(p.delayedChecks,0);
});

test('a review earns delay from the new session first exposure, not its immediate pass',()=>{
 const events=[ev('tiny-filter-cold'),ev('variation-filtering',NOW+25*3600000,{passed:false,cold:false,kind:'exposure',sessionId:'review'}),ev('variation-filtering',NOW+25*3600000+300000,{fresh:true,sessionId:'review'})];
 assert.equal(skillProfile(code(events),NOW+25*3600000+300000).filtering.delayedChecks,1);
});

test('holding an editor open cannot manufacture a delayed review',()=>{
 const events=[ev('tiny-filter-cold'),ev('variation-filtering',NOW+23*3600000,{passed:false,cold:false,kind:'exposure',sessionId:'early'}),ev('variation-filtering',NOW+25*3600000,{fresh:true,sessionId:'early'})];
 assert.equal(skillProfile(code(events),NOW+25*3600000).filtering.delayedChecks,0);
});

test('a lapse suspends coverage and prerequisite eligibility',()=>{
 const c=code([ev('probe-filtering'),ev('probe-filtering',NOW+1,{passed:false,cold:false})]);
 assert.equal(coveredBySkills(c,'tiny-filter-guided',NOW+1),false);
 const out=adaptiveNextStep([ex('probe-filtering'),ex('tiny-count-guided'),ex('tiny-filter-guided')],c,[],{},NOW+2);
 assert.ok(['probe-filtering','tiny-filter-guided'].includes(out.id));
});

test('practiced graph prerequisites neither diagnose nor clear unknown skills',()=>{
 const p=skillProfile(code([ev('python-refresher-1')]),NOW);
 assert.equal(p.collections.independent,true);assert.equal(p.counting.independent,false);
});

test('future evidence and duplicate positives in one session are ignored or capped',()=>{
 const p=skillProfile(code([ev('tiny-filter-cold',NOW,{sessionId:'s'}),ev('variation-filtering',NOW+DAY,{sessionId:'s',fresh:true}),ev('variation-filtering',NOW+2*DAY,{fresh:true})]),NOW+DAY).filtering;
 assert.equal(p.delayedChecks,0);assert.equal(p.transfer,false);
});

test('legacy evidence is conservative and cannot invent transfer or delay',()=>{
 const c={exercises:{'tiny-filter-cold':{passed:true,lastResult:'pass',lastAt:NOW,coldDays:['2026-03-01']}},attempts:[]};
 const p=skillProfile(c,NOW).filtering;assert.equal(p.independent,true);assert.equal(p.transfer,false);assert.equal(p.delayedChecks,0);
});

test('unfinished active work resumes',()=>{
 const c=code([],{'probe-filtering':{files:{'main.py':'x'},session:{started:NOW,mode:'cold'},lastResult:'error'}});
 assert.equal(adaptiveNextStep([ex('probe-filtering'),ex('tiny-filter-guided')],c,[],{},NOW).action,'resume');
});

test('diagnostic assistance falls back to teaching',()=>{
 const c=code([ev('probe-filtering',NOW,{passed:false,cold:false,assisted:true,sessionId:String(NOW)})],{'probe-filtering':{files:{a:'x'},session:{started:NOW,mode:'cold'},lastResult:'error'}});
 assert.equal(adaptiveNextStep([ex('probe-filtering'),ex('tiny-filter-guided')],c,[],{},NOW+1).id,'tiny-filter-guided');
});

test('opening a diagnostic does not count as a second failed test',()=>{
 const c=code([ev('probe-filtering',NOW,{passed:false,cold:false,kind:'exposure',sessionId:String(NOW)}),ev('probe-filtering',NOW+1,{passed:false,cold:false,sessionId:String(NOW)})],{'probe-filtering':{files:{a:'x'},session:{started:NOW,mode:'cold'},lastResult:'error'}});
 const out=adaptiveNextStep([ex('probe-filtering'),ex('tiny-filter-guided')],c,[],{},NOW+2);assert.equal(out.id,'probe-filtering');assert.equal(out.action,'resume');
});

test('failed diagnostic opens its canonical task as supported practice',()=>{
 const c=code([ev('probe-filtering',NOW,{passed:false,cold:false}),ev('probe-filtering',NOW+1,{passed:false,cold:false,sessionId:'two'})]);
 const out=adaptiveNextStep([ex('probe-filtering'),ex('tiny-filter-cold')],c,[],{},NOW+2);assert.equal(out.id,'tiny-filter-cold');assert.equal(out.mode,'practice');assert.equal(out.action,'fresh');
});

test('assisted canonical completion advances to a fresh variation',()=>{
 const c=code([ev('tiny-filter-cold',NOW,{cold:false,assisted:true})],{'tiny-filter-cold':{passed:true,lastResult:'pass',lastAt:NOW,session:{started:NOW,assisted:true}}});
 const out=adaptiveNextStep([ex('probe-filtering'),ex('tiny-filter-cold'),ex('variation-filtering')],c,[],{},NOW+1);assert.equal(out.id,'variation-filtering');assert.equal(out.variation,true);assert.equal(out.action,'fresh');
});

test('assisted browser sequence cannot jump to a mixed task with unknown prerequisites',()=>{
 const events=[ev('probe-filtering',NOW,{passed:false,cold:false,assisted:true,sessionId:'probe'}),ev('tiny-filter-guided',NOW+1,{cold:false,assisted:true,sessionId:'guided'}),ev('variation-filtering',NOW+2,{cold:false,assisted:true,sessionId:'variation'})];
 const c=code(events,{'probe-filtering':{passed:true,lastResult:'pass',lastAt:NOW},'tiny-filter-guided':{passed:true,lastResult:'pass',lastAt:NOW+1},'variation-filtering':{passed:true,lastResult:'pass',lastAt:NOW+2}});
 const all=[ex('probe-filtering'),ex('mixed-event-summary'),ex('variation-filtering'),ex('tiny-filter-guided'),ex('tiny-filter-cold')];
 const out=adaptiveNextStep(all,c,[],{},NOW+3,{route:['tiny-filter-guided','tiny-filter-cold']});
 assert.equal(out.id,'tiny-filter-cold');assert.notEqual(out.id,'mixed-event-summary');
});

test('guided-looking legacy cold data cannot become independent',()=>{
 const c={exercises:{'tiny-filter-guided':{passed:true,lastResult:'pass',lastAt:NOW,coldDays:['2026-03-01']}},attempts:[]};
 assert.equal(coveredBySkills(c,'tiny-filter-cold',NOW),false);assert.equal(skillProfile(c,NOW).filtering.independent,false);
});

test('interviews reject assisted canonical prerequisites',()=>{
 const s={id:'think-aloud',title:'think',prerequisites:['python-refresher-1'],rubric:[]};
 const c=code([ev('python-refresher-1',NOW,{cold:false,assisted:true})],{'python-refresher-1':{passed:true,lastResult:'pass',lastAt:NOW}});
 const out=adaptiveNextStep([ex('probe-filtering'),ex('python-refresher-1')],c,[s],{},NOW+1,{route:['@think-aloud'],reviewPass:()=>false,peerCurrent:()=>false});assert.equal(out.type,'code');assert.equal(out.id,'python-refresher-1');
});

test('repeated support in one session repairs without trapping progression',()=>{
 const events=[ev('tiny-filter-cold'),ev('tiny-filter-cold',NOW+1,{passed:false,cold:false,assisted:true,sessionId:'support'}),ev('tiny-filter-cold',NOW+2,{sessionId:'support'}),ev('tiny-filter-cold',NOW+3,{sessionId:'support'})];
 const p=skillProfile(code(events),NOW+3).filtering;assert.equal(p.needsRepair,false);assert.equal(p.independent,true);assert.equal(p.delayedChecks,0);
});

test('historical delayed evidence does not restore retention until after a new delayed retrieval',()=>{
 const delayed=NOW+DAY, failed=delayed+3600000, repaired=failed+700000;
 const events=[ev('tiny-filter-cold'),ev('variation-filtering',delayed,{fresh:true}),ev('variation-filtering',failed,{passed:false,cold:false,sessionId:'repair'}),ev('variation-filtering',repaired,{sessionId:'repair'})];
 let p=skillProfile(code(events),repaired).filtering;
 assert.equal(p.delayedChecks,1);assert.equal(p.needsRepair,false);assert.equal(p.retained,false);assert.equal(p.dueAt,repaired+DAY);
 events.push(ev('variation-filtering',repaired+DAY,{passed:false,cold:false,kind:'exposure',sessionId:'after-repair'}),ev('variation-filtering',repaired+DAY+300000,{sessionId:'after-repair'}));
 p=skillProfile(code(events),repaired+DAY+300000).filtering;
 assert.equal(p.delayedChecks,2);assert.equal(p.retained,true);assert.equal(p.dueAt,repaired+DAY+300000+3*DAY);
});

test('repeated failures in one session keep the first short repair deadline',()=>{
 const events=[ev('tiny-filter-cold'),ev('tiny-filter-cold',NOW+1000,{passed:false,cold:false,sessionId:'one'}),ev('tiny-filter-cold',NOW+2000,{passed:false,cold:false,sessionId:'one'})];
 const p=skillProfile(code(events),NOW+2000).filtering;assert.equal(p.dueAt,NOW+1000+600000);assert.equal(p.needsRepair,true);
});

test('a due specialized skill reuses only an exposed mock as familiar cold review',()=>{
 const events=[ev('python-refresher-1'),ev('python-refresher-2'),ev('probe-graphs'),ev('object-graph-codec')];
 const c=code(events,{'object-graph-codec':{viewedAt:NOW,passed:true,lastResult:'pass',lastAt:NOW}});
 const out=adaptiveNextStep([ex('object-graph-codec'),ex('sse-parser')],c,[],{},NOW+DAY);
 assert.equal(out.id,'object-graph-codec');assert.equal(out.mode,'cold');assert.equal(out.review,true);assert.match(out.reason,/familiar|fresh assessment/i);
});

test('an unviewed specialized mock remains reserved for its canonical assessment',()=>{
 const events=[ev('python-refresher-1'),ev('python-refresher-2'),ev('probe-graphs'),ev('object-graph-codec')];
 const out=adaptiveNextStep([ex('sse-parser')],code(events),[],{},NOW+DAY);
 assert.notEqual(out.review,true);
});

test('legacy summary cannot revive a skill marked for relearning',()=>{
 const c={exercises:{'tiny-filter-cold':{passed:true,lastResult:'pass',lastAt:NOW,coldDays:['2026-03-01'],review:{phase:'relearning',failed:true}}},attempts:[]};
 const p=skillProfile(c,NOW).filtering;assert.equal(p.independent,false);assert.equal(p.retained,false);
});

test('a mixed exercise is preferred for due maintenance',()=>{
 const events=[ev('tiny-filter-cold'),ev('tiny-count-cold'),ev('syntax-faded')];
 const all=[ex('tiny-filter-cold'),ex('tiny-count-cold'),ex('syntax-faded'),ex('mixed-event-summary')];
 const step=adaptiveNextStep(all,code(events),[],{},NOW+DAY);assert.equal(step.id,'mixed-event-summary');assert.equal(step.review,true);
});

test('early exposure at due time does not cause an endless review loop',()=>{
 const events=[ev('tiny-filter-cold'),ev('tiny-filter-cold',NOW+DAY-1000,{sessionId:'early'})];
 const c=code(events);const all=[ex('probe-filtering'),ex('tiny-filter-cold'),ex('variation-filtering')];
 const atDue=adaptiveNextStep(all,c,[],{},NOW+DAY);assert.equal(atDue.review,false);
 c.learningEvents.push(ev('variation-filtering',NOW+DAY,{sessionId:'learning',fresh:true}));
 const tomorrow=adaptiveNextStep(all,c,[],{},NOW+2*DAY);assert.equal(tomorrow.review,true);
});

test('most recent active draft wins and preserves variation metadata',()=>{
 const c=code([],{'tiny-filter-cold':{files:{a:'old'},session:{started:NOW,mode:'cold'},lastResult:'error'},'variation-filtering':{files:{a:'new'},session:{started:NOW+1,mode:'cold'},lastResult:'error'}});
 const out=adaptiveNextStep([ex('tiny-filter-cold'),ex('variation-filtering')],c,[],{},NOW+2);assert.equal(out.id,'variation-filtering');assert.equal(out.variation,true);
});

test('explicit active exercise ignores stale drafts',()=>{
 const c=code([],{'tiny-filter-cold':{files:{a:'old'},session:{started:NOW+2,mode:'cold'},lastResult:'error'},'variation-filtering':{files:{a:'chosen'},session:{started:NOW+1,mode:'cold'},lastResult:'error'}});c.activeExerciseId='variation-filtering';
 assert.equal(adaptiveNextStep([ex('tiny-filter-cold'),ex('variation-filtering')],c,[],{},NOW+3).id,'variation-filtering');
});

test('an exhausted bank still returns useful practice',()=>{
 const events=Object.keys(taskSkills).filter(id=>!id.includes('mock')).map(id=>ev(id));
 const all=[ex('probe-filtering'),ex('variation-filtering'),ex('tiny-filter-guided'),ex('tiny-filter-cold')];
 const out=adaptiveNextStep(all,code(events),[],{},NOW+1000);assert.equal(out.type,'code');assert.equal(out.reinforcement,true);assert.notEqual(taskSkills[out.id]?.kind,'guided');
});

test('old state is safe and broad mocks stay explicit',()=>{
 const old={version:1,exercises:{},attempts:[]};assert.doesNotThrow(()=>skillProfile(old,NOW));
 const c=code([ev('probe-graphs',NOW,{fresh:true}),ev('probe-throttling',NOW,{fresh:true})]);
 assert.equal(coveredBySkills(c,'dependency-graph',NOW),false);assert.equal(coveredBySkills(c,'retry-backoff',NOW),false);
});

test('synthetic adaptive route keeps yielding through diagnostics, code, and interviews',()=>{
 const all=[...ramp.exercises,...curriculum.exercises], sessions=sessionData.sessions, c=code(), path={reviews:[]};
 // Add lightweight probe/variation objects if catalog integration has not supplied them in JSON yet.
 for(const id of Object.keys(taskSkills))if((id.startsWith('probe-')||id.startsWith('variation-')||id.startsWith('mixed-'))&&!all.some(e=>e.id===id))all.push(ex(id));
 const seen=new Set();
 for(let i=0;i<180;i++){
  const s=nextStep(all,c,sessions,path,NOW);
  assert.ok(s&&s.type!=='done');
  if(s.type==='session'){
   const def=sessions.find(x=>x.id===s.id);path.reviews.push({id:s.id,at:NOW,mode:s.id==='full-loop'?'peer':'solo',completed:true,notes:'n'.repeat(100),feedback:'f'.repeat(40),scores:Object.fromEntries(def.rubric.map(r=>[r.id,2]))});
  }else{
   c.learningEvents.push(ev(s.id,NOW,{fresh:true,sessionId:`run-${i}`}));c.exercises[s.id]={passed:true,lastResult:'pass',lastAt:NOW};
  }
  seen.add(`${s.type}:${s.id}`);
  if(seen.has('session:full-loop'))break;
 }
 assert.ok(seen.has('session:think-aloud'));assert.ok(seen.has('session:full-loop'));assert.ok(seen.has('code:probe-filtering'));
});
