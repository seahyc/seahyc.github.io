import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {skills,taskSkills} from '../static/practice/skill-catalog.mjs';
import {skillProfile} from '../static/practice/learning-model.mjs';
import {freshState,record,validateImport} from '../static/practice/state.mjs';
import {addLearningEvent} from '../static/practice/learning-state.mjs';
import {nextStep,route} from '../static/practice/mastery.mjs';
import {roadmapModel} from '../static/practice/path/roadmap.mjs';
const read=name=>JSON.parse(readFileSync(new URL(`../static/practice/${name}.json`,import.meta.url)));
const catalog=['ramp','curriculum','variations'].flatMap(n=>read(n).exercises),sessions=read('path/sessions').sessions;
const NOW=Date.UTC(2026,8,7,5),DAY=86400000;
function attempt(state,id,at,{cold=true,fresh=true,mode='cold'}={}){
 const p=state.exercises[id]||={coldDays:[],attempts:0};state.activeExerciseId=id;p.viewedAt||=at;p.session={started:at,mode,cold,freshExercise:fresh};p.files={};
 addLearningEvent(state,id,{kind:'exposure',sessionId:at,passed:false,cold,fresh},at);
 record(state,id,{kind:'tests',passed:true,sessionId:at,cold,fresh,scaffold:taskSkills[id]?.kind==='guided'},at+1000);
}
test('the skill graph is acyclic and every shipped task has explicit coverage',()=>{
 const ids=new Set(skills.map(s=>s.id));assert.equal(ids.size,17);
 for(const e of catalog){const m=taskSkills[e.id];assert.ok(m,e.id);assert.ok(m.primary.length);for(const id of [...m.primary,...m.practiced])assert.ok(ids.has(id));for(const id of m.coverageTasks||[])assert.ok(catalog.some(e=>e.id===id));}
 function visit(id,path=[]){assert.ok(!path.includes(id),path.join(' -> '));for(const pre of skills.find(s=>s.id===id).prerequisites){assert.ok(ids.has(pre));visit(pre,[...path,id]);}}
 for(const s of skills)visit(s.id);
});
test('observations survive reload, old UI history limits and saved draft migration',()=>{
 const state=freshState();attempt(state,'probe-filtering',NOW);state.exercises['probe-filtering'].notes='Keep my thought';
 for(let i=0;i<350;i++)record(state,'probe-counting',{kind:'syntax',passed:false},NOW+i+2000);
 assert.equal(state.attempts.length,300);const restored=validateImport(JSON.parse(JSON.stringify(state)),catalog,false);
 assert.equal(restored.exercises['probe-filtering'].notes,'Keep my thought');assert.equal(restored.activeExerciseId,'probe-filtering');assert.equal(restored.exercises['probe-filtering'].session.freshExercise,true);
 assert.equal(skillProfile(restored,NOW+DAY).filtering.independent,true);assert.equal(skillProfile(restored,NOW+DAY).filtering.retained,false);
 const imported=validateImport(state,catalog,true);assert.equal(imported.exercises['probe-filtering'].session.freshExercise,false);assert.equal(imported.exercises['probe-filtering'].session.cold,false);
});
test('a real session exposure followed by a delayed variation earns dated skill evidence after reload',()=>{
 const state=freshState();attempt(state,'probe-filtering',NOW);attempt(state,'variation-filtering',NOW+DAY+60000);
 const restored=validateImport(state,catalog,false),p=skillProfile(restored,NOW+DAY+62000).filtering;
 assert.equal(p.retained,true);assert.equal(p.transfer,true);assert.equal(p.delayedChecks,1);
});
test('the actual adaptive catalog traverses every interview and applied build without looping',()=>{
 const state=freshState(),path={reviews:[]},seen=new Set();let at=NOW;
 for(let i=0;i<100;i++){
  const step=nextStep(catalog,state,sessions,path,at);assert.equal(step.type==='code'||step.type==='session',true);
  if(step.reinforcement){assert.ok(seen.has('@full-loop'));for(const id of route.filter(id=>!id.startsWith('@')&&taskSkills[id]?.coverable!==true))assert.ok(seen.has(id),`Missing applied milestone ${id}`);return;}
  const key=(step.type==='session'?'@':'')+step.id;assert.ok(!seen.has(key),`Loop at ${key}: ${step.reason}`);seen.add(key);
  if(step.type==='code')attempt(state,step.id,at,{cold:step.mode!=='practice',mode:step.mode});
  else {const s=sessions.find(s=>s.id===step.id);path.reviews.push({id:s.id,at,completed:true,mode:'peer',notes:'x'.repeat(80),feedback:'x'.repeat(30),scores:Object.fromEntries(s.rubric.map(r=>[r.id,3]))});}
  at+=300000;
 }
 assert.fail('Never reached useful reinforcement');
});
test('roadmap anchors the current diagnostic and distinguishes skipped teaching from completion',()=>{
 const state=freshState();let model=roadmapModel(catalog,state,sessions,{},NOW);assert.equal(model.current.id,'probe-filtering');assert.equal(model.currentIndex,0);
 attempt(state,'probe-filtering',NOW);model=roadmapModel(catalog,state,sessions,{},NOW+2000);
 const covered=model.milestones.find(m=>m.id==='tiny-filter-guided');assert.equal(covered.covered,true);assert.equal(covered.completed,false);assert.equal(model.completed,0);assert.equal(model.current.id,'probe-counting');assert.equal(model.skills.find(s=>s.id==='filtering').retained,false);
});
test('exhausted normalization variants still lead to independent retrieval, not the worked scaffold',()=>{
 const state=freshState();attempt(state,'probe-filtering',NOW);attempt(state,'probe-counting',NOW+2000);
 attempt(state,'probe-normalization',NOW+4000,{cold:false});attempt(state,'syntax-faded',NOW+6000,{cold:false,mode:'practice'});attempt(state,'variation-normalization',NOW+8000,{cold:false});attempt(state,'mixed-event-summary',NOW+9000);
 const next=nextStep(catalog,state,sessions,{reviews:[]},NOW+10000);assert.equal(next.id,'probe-normalization');assert.equal(next.mode,'cold');assert.equal(next.action,'fresh');
});
test('a later task in a shared skill family has exactly one current roadmap marker',()=>{
 const state=freshState();state.activeExerciseId='sse-parser';state.exercises['sse-parser']={coldDays:[],attempts:0,lastResult:'pending',files:{'src/sse_parser.py':'# draft'},session:{started:NOW,mode:'cold',cold:true}};
 const model=roadmapModel(catalog,state,sessions,{reviews:[]},NOW);assert.equal(model.current.id,'sse-parser');assert.deepEqual(model.milestones.filter(m=>m.isCurrent).map(m=>m.id),['sse-parser']);
});
