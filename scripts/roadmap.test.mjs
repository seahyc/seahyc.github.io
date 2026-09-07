import test from 'node:test';
import assert from 'node:assert/strict';
import curriculum from '../static/practice/curriculum.json' with {type:'json'};
import ramp from '../static/practice/ramp.json' with {type:'json'};
import sessionData from '../static/practice/path/sessions.json' with {type:'json'};
import {route} from '../static/practice/mastery.mjs';
import {roadmapModel} from '../static/practice/path/roadmap.mjs';
import {freshState,record} from '../static/practice/state.mjs';
import {freshPath} from '../static/practice/path/model.mjs';

const NOW=new Date('2026-01-10T12:00:00+08:00').getTime();
const exercises=[...ramp.exercises,...curriculum.exercises],sessions=sessionData.sessions;
const reviewed=(s,mode='solo')=>({completed:true,id:s.id,mode,at:NOW,notes:'Concrete observations, calculations, assumptions, and boundary evidence from the rehearsal.'.repeat(2),feedback:'The explanation was specific; next time test one additional boundary case.',scores:Object.fromEntries(s.rubric.map(r=>[r.id,2]))});

test('fresh roadmap follows the canonical route and exposes only its first milestone as current',()=>{
 const model=roadmapModel(exercises,freshState(),sessions,freshPath(),NOW);
 assert.deepEqual(model.milestones.map(m=>(m.type==='interview'?'@':'')+m.id),route);
 assert.equal(model.summary,`0 of ${route.length} milestones practiced`);
 assert.deepEqual(model.milestones.filter(m=>m.status==='current').map(m=>m.id),['tiny-filter-guided']);
 assert.ok(model.milestones.slice(1).every(m=>m.status==='upcoming'));
});

test('real catalog phases advance once without changing canonical row order',()=>{
 const milestones=roadmapModel(exercises,freshState(),sessions,freshPath(),NOW).milestones;
 assert.deepEqual(milestones.map(m=>(m.type==='interview'?'@':'')+m.id),route);
 const groups=milestones.map(m=>m.phase).filter((phase,index,all)=>index===0||phase!==all[index-1]);
 assert.deepEqual(groups,['Foundations','Applied practice','Assessment practice']);
});

test('independent code and passing interview evidence count as practiced milestones',()=>{
 const code=freshState(),path=freshPath(),session=sessions.find(s=>s.id==='think-aloud');
 record(code,'tiny-filter-guided',{passed:true,scaffold:true},NOW);
 record(code,'tiny-filter-cold',{passed:true,cold:true},NOW);
 record(code,'tiny-count-guided',{passed:true,scaffold:true},NOW);
 record(code,'tiny-count-cold',{passed:true,cold:true},NOW);
 record(code,'syntax-faded',{passed:true,scaffold:true},NOW);
 record(code,'python-refresher-1',{passed:true,cold:true},NOW);
 path.reviews=[reviewed(session)];
 const model=roadmapModel(exercises,code,sessions,path,NOW);
 assert.equal(model.milestones.find(m=>m.id==='python-refresher-1').status,'completed');
 assert.equal(model.milestones.find(m=>m.id==='think-aloud').status,'completed');
 assert.equal(model.milestones.find(m=>m.id==='tool-router').status,'current');
});

test('a due recall is the one current step without erasing practiced progress',()=>{
 const code=freshState();record(code,'interval-windows',{passed:true,cold:true},NOW-2*86400000);
 code.exercises['interval-windows'].due='2026-01-10';
 const partial=exercises.filter(e=>['interval-windows','shortest-route'].includes(e.id));
 const model=roadmapModel(partial,code,[],freshPath(),NOW),item=model.milestones.find(m=>m.id==='interval-windows');
 assert.equal(item.status,'review');assert.equal(item.statusLabel,'Recall due');assert.equal(item.practiced,true);
 assert.equal(model.practiced,1);
});

test('the final interview milestone needs current peer-reviewed evidence',()=>{
 const session=sessions.find(s=>s.id==='full-loop'),path=freshPath();path.reviews=[reviewed(session,'solo')];
 let item=roadmapModel([],freshState(),[session],path,NOW).milestones[0];assert.equal(item.practiced,false);
 path.reviews=[reviewed(session,'peer')];item=roadmapModel([],freshState(),[session],path,NOW).milestones[0];assert.equal(item.practiced,true);
});

test('roadmap disclosure is collapsed by default and has an explicit hash opener',async()=>{
 const html=await import('node:fs/promises').then(fs=>fs.readFile(new URL('../static/practice/path/index.html',import.meta.url),'utf8'));
 const app=await import('node:fs/promises').then(fs=>fs.readFile(new URL('../static/practice/path/app.mjs',import.meta.url),'utf8'));
 assert.match(html,/<details id="roadmap" class="roadmap">/);assert.doesNotMatch(html,/<details id="roadmap"[^>]*\sopen(?:\s|>)/);
 assert.match(app,/location\.hash==='#roadmap'/);
});
