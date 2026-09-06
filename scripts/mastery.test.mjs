import test from 'node:test';
import assert from 'node:assert/strict';
import curriculum from '../static/practice/curriculum.json' with {type: 'json'};
import sessionData from '../static/practice/path/sessions.json' with {type: 'json'};
import ramp from '../static/practice/ramp.json' with {type: 'json'};
import {nextStep, route, demonstrated} from '../static/practice/mastery.mjs';
import {freshState, record, day} from '../static/practice/state.mjs';

const NOW = new Date('2026-01-10T12:00:00+08:00').getTime();
const LATER = new Date('2026-01-11T12:00:00+08:00').getTime();
const exercises = curriculum.exercises;
const sessions = sessionData.sessions;
const exercise = (id, stage = 'Build') => ({id, title: id, stage, prerequisites: []});
const codeWith = (entries = {}) => ({...freshState(), exercises: entries});
const pass = (id, extra = {}) => ({id, passed: true, lastResult: 'pass', lastAt: NOW, ...extra});
const review = (id, at, mode = 'solo', good = true) => ({
  id, at, mode, completed: good, notes: good ? 'x'.repeat(80) : 'too short',
  feedback: good ? 'y'.repeat(30) : '',
  scores: Object.fromEntries((sessions.find(s => s.id === id)?.rubric || []).map(r => [r.id, good ? 2 : 0]))
});

test('a new learner starts at the tiny filter despite unrelated metadata', () => {
  const code = {...codeWith(), profile: {lastVisited: 'elsewhere'}, metadata: {foo: 'bar'}};
  const out = nextStep([exercise('tiny-filter-guided'), exercise('tiny-filter-cold')], code, [], {}, NOW);
  assert.equal(out.id, 'tiny-filter-guided');
  assert.equal(out.mode, 'practice');
});

test('a guided filter pass moves the learner to the cold filter step', () => {
  const code = codeWith({'tiny-filter-guided': pass('tiny-filter-guided')});
  const out = nextStep([exercise('tiny-filter-guided'), exercise('tiny-filter-cold')], code, [], {}, NOW);
  assert.equal(out.id, 'tiny-filter-cold');
});

test('a supported cold task pass asks for fresh recall', () => {
  const code = codeWith({'interval-windows': pass('interval-windows')});
  const out = nextStep([exercise('interval-windows')], code, [], {}, NOW);
  assert.equal(out.id, 'interval-windows');
  assert.equal(out.mode, 'cold');
  assert.equal(out.action, 'fresh');
});

test('a failed latest result blocks an earlier passing task', () => {
  const code = codeWith({'interval-windows': {...pass('interval-windows'), lastResult: 'error', due: day(NOW)}});
  const out = nextStep([exercise('interval-windows')], code, [], {}, NOW);
  assert.equal(out.id, 'interval-windows');
  assert.match(out.reason, /Repair|failing/);
});

test('due review is returned before new work and carries review intent', () => {
  const code = codeWith({
    'interval-windows': {...pass('interval-windows'), due: day(NOW), lastAt: new Date('2026-01-08T12:00:00+08:00').getTime()},
    'shortest-route': pass('shortest-route')
  });
  const out = nextStep([exercise('interval-windows'), exercise('shortest-route')], code, [], {}, NOW);
  assert.equal(out.id, 'interval-windows');
  assert.equal(out.review, true);
});

test('same-day cold retries add only one cold day', () => {
  const state = freshState();
  record(state, 'interval-windows', {passed: true, cold: true}, NOW);
  record(state, 'interval-windows', {passed: true, cold: true}, NOW + 60 * 60 * 1000);
  assert.deepEqual(state.exercises['interval-windows'].coldDays, [day(NOW)]);
});

test('a hinted or assisted pass does not count as mastery evidence', () => {
  const code = codeWith({'interval-windows': pass('interval-windows', {session: {assisted: true}})});
  assert.equal(demonstrated(code, 'interval-windows'), false);
  assert.equal(nextStep([exercise('interval-windows')], code, [], {}, NOW).action, 'fresh');
});

test('legacy independent Python refresher evidence lets the ramp continue', () => {
  const code = codeWith({'python-refresher-1': pass('python-refresher-1', {coldDays: [day(NOW)]})});
  assert.equal(demonstrated(code, 'python-refresher-1'), true);
  const out = nextStep([exercise('python-refresher-1'), exercise('tool-router')], code, [], {}, NOW);
  assert.equal(out.id, 'tool-router');
});

test('session prerequisites gate the session even when session order is edited', () => {
  const s = sessions.find(s => s.id === 'code-review');
  const code = codeWith({'python-refresher-1': pass('python-refresher-1', {coldDays: [day(NOW)]})});
  const out = nextStep([exercise('python-refresher-1'), exercise('log-spike')], code, [s], {}, NOW);
  assert.equal(out.type, 'code');
  assert.equal(out.id, 'log-spike');
});

test('a recent failed solo interview invalidates a previous pass', () => {
  const s = sessions.find(s => s.id === 'code-review');
  const path = {reviews: [review('code-review', NOW - 1000, 'solo', true), review('code-review', NOW, 'solo', false)]};
  const code = codeWith({
    'python-refresher-1': pass('python-refresher-1', {coldDays: [day(NOW)]}),
    'log-spike': pass('log-spike', {coldDays: [day(NOW)]})
  });
  const out = nextStep([exercise('python-refresher-1'), exercise('log-spike'), ...sessions.map(x => exercise(x.id))], code, [s], path, NOW);
  assert.equal(out.type, 'session');
  assert.equal(out.id, 'code-review');
});

test('the full loop requires peer evidence', () => {
  const s = sessions.find(s => s.id === 'full-loop');
  const prereqs = Object.fromEntries(s.prerequisites.map(id => [id, pass(id, {coldDays: [day(NOW)]})]));
  const path = {reviews: [review('full-loop', NOW, 'solo', true)]};
  const out = nextStep(s.prerequisites.map(id => exercise(id)).concat([exercise('full-loop')]), codeWith(prereqs), [s], path, NOW);
  assert.equal(out.type, 'session');
  assert.equal(out.id, 'full-loop');
  assert.match(out.reason, /peer/i);
});

test('the route covers the catalog and every interview exactly once', () => {
  assert.equal(new Set(route).size, route.length);
  const routeCode = new Set(route.filter(id => !id.startsWith('@')));
  for (const e of [...ramp.exercises, ...exercises]) if (e.id !== 'syntax-guided') assert.ok(routeCode.has(e.id), e.id);
  assert.equal(routeCode.has('syntax-guided'), false);
  const routeSessions = route.filter(id => id.startsWith('@')).map(id => id.slice(1));
  assert.deepEqual(new Set(routeSessions), new Set(sessions.map(s => s.id)));
  assert.equal(routeSessions.length, sessions.length);
  assert.ok(Array.isArray(ramp.exercises));
});

test('the whole route remains traversable with independent work and reviewed interviews',()=>{
 const catalog=[...ramp.exercises,...exercises],state=freshState(),path={reviews:[]},visited=new Set();
 for(let i=0;i<100;i++){
  const step=nextStep(catalog,state,sessions,path,NOW);
  if(step.type==='done'){assert.equal(visited.size,route.length);return;}
  const id=(step.type==='session'?'@':'')+step.id;assert.ok(!visited.has(id),`Unexpected repeated step ${id}`);visited.add(id);
  if(step.type==='code')record(state,step.id,{passed:true,cold:!step.id.endsWith('guided')&&step.id!=='syntax-faded',scaffold:step.id.endsWith('guided')||step.id==='syntax-faded'},NOW);
  else path.reviews.push(review(step.id,NOW,step.id==='full-loop'?'peer':'solo',true));
 }
 assert.fail('The route never completed');
});

test('returning tomorrow starts fresh retrieval and a successful cold pass restores progression',()=>{
 const state=freshState(),catalog=[exercise('interval-windows'),exercise('shortest-route')];
 record(state,'interval-windows',{passed:true,cold:true},NOW);
 state.exercises['interval-windows'].session={started:NOW,cold:true,mode:'cold'};
 const check=nextStep(catalog,state,[],{},LATER);assert.equal(check.id,'interval-windows');assert.equal(check.action,'fresh');
 record(state,'interval-windows',{passed:true,cold:true},LATER);
 assert.equal(nextStep(catalog,state,[],{},LATER).id,'shortest-route');
 assert.equal(state.exercises['interval-windows'].coldDays.length,2);
});

test('an old advanced practice pass cannot pull a rusty beginner past the foundations',()=>{
 const state=freshState();record(state,'batch-scheduler',{passed:true,cold:false},NOW);
 const step=nextStep([...ramp.exercises,...exercises],state,sessions,{},LATER);
 assert.equal(step.id,'tiny-filter-guided');
});
