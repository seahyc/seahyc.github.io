import test from 'node:test';
import assert from 'node:assert/strict';
import curriculum from '../static/practice/curriculum.json' with {type:'json'};
import ramp from '../static/practice/ramp.json' with {type:'json'};
import sessionData from '../static/practice/path/sessions.json' with {type:'json'};
import {route} from '../static/practice/mastery.mjs';
import {roadmapModel} from '../static/practice/path/roadmap.mjs';
import {freshState,record} from '../static/practice/state.mjs';
import {freshPath} from '../static/practice/path/model.mjs';

const DAY=86400000,NOW=new Date('2026-01-10T12:00:00+08:00').getTime();
const exercises=[...ramp.exercises,...curriculum.exercises],sessions=sessionData.sessions;
const reviewed=(s,mode='solo',at=NOW)=>({completed:true,id:s.id,mode,at,notes:'Concrete observations, calculations, assumptions, and boundary evidence from the rehearsal.'.repeat(2),feedback:'The explanation was specific; next time test one additional boundary case.',scores:Object.fromEntries(s.rubric.map(r=>[r.id,2]))});

test('fresh roadmap follows the canonical route and exposes only its first milestone as current',()=>{
 const model=roadmapModel(exercises,freshState(),sessions,freshPath(),NOW);
 assert.deepEqual(model.milestones.map(m=>(m.type==='interview'?'@':'')+m.id),route);
 assert.equal(model.summary,`0 of ${route.length} milestones completed`);
 assert.equal(model.currentIndex,0);
 assert.deepEqual(model.milestones.filter(m=>m.isCurrent).map(m=>m.id),['tiny-filter-guided']);
});

test('real catalog phases advance once without changing canonical row order',()=>{
 const milestones=roadmapModel(exercises,freshState(),sessions,freshPath(),NOW).milestones;
 const groups=milestones.map(m=>m.phase).filter((phase,index,all)=>index===0||phase!==all[index-1]);
 assert.deepEqual(groups,['Foundations','Applied practice','Assessment practice']);
});

test('completion persists when a later failed recall makes the exercise current again',()=>{
 const code=freshState();record(code,'interval-windows',{passed:true,cold:true},NOW-2*DAY);record(code,'interval-windows',{passed:false,kind:'test'},NOW);
 const model=roadmapModel(exercises.filter(e=>['interval-windows','shortest-route'].includes(e.id)),code,[],freshPath(),NOW);
 const item=model.milestones.find(m=>m.id==='interval-windows');
 assert.equal(item.completed,true);assert.equal(item.isCurrent,true);assert.equal(item.retained,false);
 assert.equal(item.evidenceLabel,'Recall needs repair');assert.equal(model.completed,1);
});

test('a current delayed recall stays checked and is counted separately from completion',()=>{
 const code=freshState();
 code.exercises['interval-windows']={passed:true,lastResult:'pass',lastAt:NOW-DAY,review:{version:1,phase:'scheduled',dueAt:NOW+DAY,intervalDays:3,streak:2,lapses:0,lastRatedAt:NOW-DAY,lastCreditDay:'2026-01-09',pending:false,assisted:false,failed:false,history:[{at:NOW-3*DAY,rating:'good'},{at:NOW-DAY,rating:'good'}]}};
 code.attempts=[{id:'interval-windows',at:NOW-4*DAY,passed:true,cold:true}];
 const model=roadmapModel(exercises.filter(e=>e.id==='interval-windows'),code,[],freshPath(),NOW),item=model.milestones[0];
 assert.equal(item.completed,true);assert.equal(item.retained,true);assert.equal(item.evidenceLabel,'Recalled after a gap');
 assert.equal(model.completed,1);assert.equal(model.retained,1);
});

test('assisted completion is honest completion but not retained evidence',()=>{
 const code=freshState();record(code,'tool-router',{passed:true,cold:false,requiresRating:true},NOW);
 const item=roadmapModel(exercises.filter(e=>e.id==='tool-router'),code,[],freshPath(),NOW).milestones[0];
 assert.equal(item.completed,true);assert.equal(item.retained,false);assert.notEqual(item.evidenceLabel,'Recalled after a gap');
});

test('canonical coverage is shown without crediting a direct completion',()=>{
 const code=freshState();record(code,'python-refresher-1',{passed:true,cold:true},NOW);
 const model=roadmapModel(exercises.filter(e=>['tiny-filter-guided','python-refresher-1'].includes(e.id)),code,[],freshPath(),NOW);
 const covered=model.milestones.find(m=>m.id==='tiny-filter-guided');
 assert.equal(covered.covered,true);assert.equal(covered.completed,false);assert.equal(covered.evidenceLabel,'Covered by later work');assert.equal(model.completed,1);
});

test('interviews distinguish current peer review, self rating, and historical refresh',()=>{
 const session=sessions.find(s=>s.id==='think-aloud'),path=freshPath();
 path.reviews=[reviewed(session,'solo')];
 let item=roadmapModel([],freshState(),[session],path,NOW).milestones[0];
 assert.equal(item.completed,true);assert.equal(item.evidenceLabel,'Current self-rated rehearsal');
 path.reviews=[reviewed(session,'peer')];item=roadmapModel([],freshState(),[session],path,NOW).milestones[0];
 assert.equal(item.evidenceLabel,'Current peer review');
 path.reviews=[reviewed(session,'peer',NOW-31*DAY)];item=roadmapModel([],freshState(),[session],path,NOW).milestones[0];
 assert.equal(item.completed,true);assert.equal(item.evidenceLabel,'Refresh needed');
});

test('roadmap disclosure stays collapsed and retains its native summary marker',async()=>{
 const fs=await import('node:fs/promises');
 const html=await fs.readFile(new URL('../static/practice/path/index.html',import.meta.url),'utf8');
 const css=await fs.readFile(new URL('../static/practice/path/layout.css',import.meta.url),'utf8');
 assert.match(html,/<details id="roadmap" class="roadmap">/);assert.doesNotMatch(html,/<details id="roadmap"[^>]*\sopen(?:\s|>)/);
 assert.doesNotMatch(css,/\.roadmap\s*>\s*summary\s*\{[^}]*display:\s*inline-flex/s);
 assert.match(css,/@media \(prefers-reduced-motion: reduce\)/);
});
