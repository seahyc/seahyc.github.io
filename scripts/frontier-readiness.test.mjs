import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {freshPath,activeSessions,normalizeTrack,readiness,sessionEvidenceDays} from '../static/practice/path/model.mjs';
import {freshState} from '../static/practice/state.mjs';

const read=path=>JSON.parse(fs.readFileSync(new URL(path,import.meta.url)));
const exercises=[
 ...read('../static/practice/ramp.json').exercises,
 ...read('../static/practice/curriculum.json').exercises,
 ...read('../static/practice/frontier.json').exercises,
 ...read('../static/practice/variations.json').exercises
];
const sessions=[
 ...read('../static/practice/path/sessions.json').sessions,
 ...read('../static/practice/path/frontier-sessions.json').sessions
];
const frontierExercises=read('../static/practice/frontier.json').exercises;
const frontierSessions=read('../static/practice/path/frontier-sessions.json').sessions;
const now=Date.UTC(2026,8,21,8);
const bySession=new Map(sessions.map(s=>[s.id,s]));

function review(id,at=now){
 const session=bySession.get(id);assert.ok(session,`missing session ${id}`);
 return {id,at,mode:'peer',completed:true,elapsed:session.minutes*60,notes:'Concrete assumptions, calculations, observed behavior, decisions, counterexamples, and verification evidence from the completed exercise.'.repeat(2),feedback:'The reviewer challenged the decision, observed the follow-up, and identified a specific next repair.',scores:Object.fromEntries(session.rubric.map(r=>[r.id,2]))};
}
function qualifiedCode(){
 const code=freshState(),ids=['dependency-graph','retry-backoff','object-graph-codec','bracket-parser','versioned-key-value-store'];
 for(const [index,id] of ids.entries()){
  const at=now-(4-index)*86400000,passed=index>0,exercise=exercises.find(e=>e.id===id);assert.ok(exercise);
  code.attempts.push({id,sessionId:`frontier-${index}`,at,passed,mockQualified:passed,freshMock:true,elapsed:exercise.minutes*60-(index===1?900:120)});
  code.exercises[id]={coldDays:[],passed,lastAt:at,lastResult:passed?'pass':'tests',assessmentReview:passed?{errorCategory:'none',scores:{correctness:2,algorithm:2,testing:2,explanation:2},postmortem:'The governing invariant, first consequential error, complexity, missing edge case, and sibling drill are recorded as evidence for a future cold attempt.'.repeat(2)}:undefined};
 }
 for(const id of ['unfamiliar-repo-repair','kv-cache-repair','experiment-analysis'])code.exercises[id]={coldDays:[],passed:true,lastAt:now,lastResult:'pass'};
 return code;
}
function qualifiedPath(track){
 const path=freshPath();path.track=track;
 path.reviews=['live-requirement-change','code-review','reliable-agent-design','customer-implementation-case','agent-build-day','ml-notebook-debug','research-experiment-defense','training-systems-design','inference-service','championship-loop','project-deep-dive','motivation-and-judgment'].map(id=>review(id));
 return path;
}

test('frontier packs contain the complete executable and rehearsal expansion',()=>{
 assert.deepEqual(frontierExercises.map(e=>e.id),['unfamiliar-repo-repair','kv-cache-repair','experiment-analysis']);
 assert.equal(frontierSessions.length,7);
 assert.deepEqual(new Set(frontierSessions.map(s=>s.id)),new Set(['live-requirement-change','ml-notebook-debug','training-systems-design','research-experiment-defense','agent-build-day','customer-implementation-case','championship-loop']));
 const exerciseIds=new Set(exercises.map(e=>e.id));
 for(const session of frontierSessions){
  assert.equal(session.rounds.reduce((sum,round)=>sum+round.minutes,0),session.minutes,session.id);
  assert.ok(session.prerequisites.every(id=>exerciseIds.has(id)),session.id);
  assert.ok(session.rubric.length>=4,session.id);
  assert.ok(session.rubric.every(dimension=>dimension.anchors.length===4),session.id);
  assert.ok(session.followups.length>=3,session.id);
 }
});

test('saved legacy tracks migrate to the four explicit target profiles',()=>{
 assert.equal(normalizeTrack('applied'),'cognition');
 assert.equal(normalizeTrack('depth'),'infra');
 assert.equal(normalizeTrack('both'),'all');
 assert.ok(activeSessions(sessions,'all').length>activeSessions(sessions,'cognition').length);
 assert.ok(activeSessions(sessions,'research').some(s=>s.id==='research-experiment-defense'));
 assert.ok(!activeSessions(sessions,'research').some(s=>s.id==='agent-build-day'));
});

test('each target lane can satisfy the same six gates with its own role evidence',()=>{
 for(const track of ['cognition','research','infra','all']){
  const gates=readiness(qualifiedPath(track),qualifiedCode(),sessions,now,exercises);
  assert.equal(gates.length,6);
  assert.deepEqual(gates.filter(g=>!g.met).map(g=>g.id),[],`${track}: ${gates.map(g=>`${g.id}=${g.met}`).join(', ')}`);
 }
});

test('freshness windows invalidate live-change, role-code, and championship evidence',()=>{
 assert.equal(sessionEvidenceDays('live-requirement-change'),21);
 assert.equal(sessionEvidenceDays('ml-notebook-debug'),28);
 assert.equal(sessionEvidenceDays('championship-loop'),42);
 const path=qualifiedPath('cognition'),code=qualifiedCode();
 path.reviews=path.reviews.map(r=>r.id==='live-requirement-change'?review(r.id,now-22*86400000):r);
 assert.equal(readiness(path,code,sessions,now,exercises).find(g=>g.id==='extension').met,false);
 code.exercises['unfamiliar-repo-repair'].lastAt=now-29*86400000;
 assert.equal(readiness(path,code,sessions,now,exercises).find(g=>g.id==='role').met,false);
 path.reviews=path.reviews.map(r=>r.id==='championship-loop'?review(r.id,now-43*86400000):r);
 assert.equal(readiness(path,code,sessions,now,exercises).find(g=>g.id==='loop').met,false);
});
