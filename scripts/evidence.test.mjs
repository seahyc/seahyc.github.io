import test from 'node:test';
import assert from 'node:assert/strict';
import {exerciseEvidence} from '../static/practice/evidence.mjs';
import {freshState,record} from '../static/practice/state.mjs';
const NOW=Date.parse('2026-09-01T12:00:00Z'),DAY=86400000;
const pass=(s,at,cold=true)=>record(s,'tool-router',{passed:true,cold},at);
test('completion is earned with support without claiming independent recall',()=>{const s=freshState();pass(s,NOW,false);const e=exerciseEvidence(s,'tool-router',NOW);assert.equal(e.completed,true);assert.equal(e.retained,false);assert.equal(e.label,'Working solution');});
test('a first independent pass and repeated same-day runs do not prove retention',()=>{const s=freshState();pass(s,NOW);pass(s,NOW+1000);const e=exerciseEvidence(s,'tool-router',NOW+1000);assert.equal(e.label,'Independent pass');assert.equal(e.retained,false);});
test('recall after an actual day earns evidence, overdue review refreshes it without losing completion',()=>{const s=freshState();pass(s,NOW);pass(s,NOW+DAY);assert.equal(exerciseEvidence(s,'tool-router',NOW+DAY).retained,true);const due=s.exercises['tool-router'].review.dueAt;const e=exerciseEvidence(s,'tool-router',due);assert.equal(e.retained,false);assert.equal(e.label,'Recall due');assert.equal(e.completed,true);});
test('a failed retrieval keeps completion and requires repair',()=>{const s=freshState();pass(s,NOW);pass(s,NOW+DAY);record(s,'tool-router',{passed:false,kind:'tests',sessionId:'later'},NOW+2*DAY);const e=exerciseEvidence(s,'tool-router',NOW+2*DAY);assert.equal(e.completed,true);assert.equal(e.retained,false);assert.equal(e.label,'Recall needs repair');});
test('attempt immediately before success prevents a delayed recall claim',()=>{const s=freshState();pass(s,NOW);pass(s,NOW+DAY-1000);pass(s,NOW+DAY);assert.equal(exerciseEvidence(s,'tool-router',NOW+DAY).retained,false);});
test('crossing midnight is not a 24-hour recall gap',()=>{const s=freshState();pass(s,Date.parse('2026-09-01T23:59:00Z'));pass(s,Date.parse('2026-09-02T00:01:00Z'));assert.equal(exerciseEvidence(s,'tool-router',Date.parse('2026-09-02T00:01:00Z')).retained,false);});
test('later prerequisite coverage does not manufacture historical completions',()=>{const s=freshState();record(s,'python-refresher-1',{passed:true,cold:true},NOW);const e=exerciseEvidence(s,'tiny-filter-guided',NOW);assert.equal(e.covered,true);assert.equal(e.completed,false);});

test('legacy completion without dated history does not invent assistance or retention',()=>{const s=freshState();s.exercises['tool-router']={passed:true,coldDays:['2026-08-01','2026-08-02'],lastResult:'pass'};const e=exerciseEvidence(s,'tool-router',NOW);assert.equal(e.completed,true);assert.equal(e.label,'Recall unverified');assert.equal(e.retained,false);});
