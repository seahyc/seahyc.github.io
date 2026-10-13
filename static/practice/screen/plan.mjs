// The sprint is gated by evidence, not the calendar. Prove a phase and you move on the
// same day; a strong pass on a harder phase proves the easier ones too. Only an exercise's
// first attempt (unseen) counts as evidence; retakes are practice.

import {STRONG} from './score.mjs';

const DAY=86400000,WINDOW=21*DAY;
export const PHASES=[
 {id:'fluency',title:'Fluency',goal:'Write correct Python fast enough: first passing test inside a third of the time.'},
 {id:'family',title:'Serialization and identity',goal:'The reported task family: references, aliases and cycles through an encode/decode boundary.'},
 {id:'transfer',title:'Transfer',goal:'Unfamiliar problems of a different shape, so the result is skill rather than recall.'}
];
const rank=Object.fromEntries(PHASES.map((p,i)=>[p.id,i]));
export const dayOf=ms=>new Date(ms).toLocaleDateString('en-CA');

export function submitted(state){return (state.attempts||[]).filter(a=>a.submittedAt&&a.score);}

// First submitted attempt per exercise is the unseen one.
export function unseen(state){
 const seen=new Set(),out=[];
 for(const a of submitted(state).sort((x,y)=>x.submittedAt-y.submittedAt)){if(seen.has(a.exerciseId))continue;seen.add(a.exerciseId);out.push(a);}
 return out;
}

// Assisted work (AI or outside help, self-reported) is practice, never evidence.
const strongOn=a=>!a.assisted&&a.score.total>=STRONG&&a.score.parts.execution.firstGreenMin!==null&&a.score.parts.execution.onTime;

export function phaseStatus(exercises,state,now=Date.now()){
 const byId=new Map(exercises.map(e=>[e.id,e]));
 const fresh=unseen(state).filter(a=>now-a.submittedAt<=WINDOW&&byId.has(a.exerciseId));
 const all=submitted(state).filter(a=>now-a.submittedAt<=WINDOW&&byId.has(a.exerciseId));
 const strong=fresh.filter(strongOn);
 const phaseOf=a=>byId.get(a.exerciseId).phase;
 const direct={
  fluency:all.filter(a=>phaseOf(a)==='fluency'&&strongOn(a)&&a.score.parts.execution.firstGreenMin<=byId.get(a.exerciseId).minutes/3),
  family:strong.filter(a=>phaseOf(a)==='family'),
  transfer:strong.filter(a=>phaseOf(a)==='transfer')
 };
 const proof={
  fluency:direct.fluency.length>=1,
  family:direct.family.length>=1,
  transfer:direct.transfer.length>=2&&new Set(direct.transfer.map(a=>dayOf(a.submittedAt))).size>=2
 };
 // A strong unseen family or transfer screen proves fluency too. Family and transfer
 // never stand in for each other: the reported task family must be proven directly.
 const beyondFluency=strong.some(a=>rank[phaseOf(a)]>0);
 return PHASES.map(p=>{
  const proven=proof[p.id]||(p.id==='fluency'&&beyondFluency);
  const evidence=direct[p.id].map(a=>({exercise:a.exerciseId,score:a.score.total,day:dayOf(a.submittedAt)}));
  const how=p.id==='transfer'?'Two strong unseen transfer screens on different days.':p.id==='family'?'One strong unseen family screen.':'One strong screen with the first passing test inside a third of the time.';
  return {...p,proven,subsumed:proven&&!proof[p.id],evidence,how};
 });
}

// Ready to book the real screen. The fastest honest path is two days.
export function readiness(exercises,state,now=Date.now()){
 const byId=new Map(exercises.map(e=>[e.id,e]));
 const fresh=unseen(state).filter(a=>now-a.submittedAt<=WINDOW&&byId.has(a.exerciseId));
 const strong=fresh.filter(strongOn);
 const long=strong.filter(a=>byId.get(a.exerciseId).minutes>=60);
 const latest=fresh[fresh.length-1];
 const gates=[
  {id:'family',title:'Reported task family',met:long.some(a=>byId.get(a.exerciseId).phase==='family'),detail:'A strong unseen serialization/identity screen of 60+ minutes.'},
  {id:'transfer',title:'Transfer',met:long.some(a=>byId.get(a.exerciseId).phase==='transfer'),detail:'A strong unseen screen of a different shape, 60+ minutes.'},
  {id:'days',title:'Reliable across days',met:new Set(long.map(a=>dayOf(a.submittedAt))).size>=2,detail:'Strong long screens on at least two different days.'},
  {id:'latest',title:'No regression',met:!!latest&&latest.score.total>=80,detail:latest?`Latest unseen screen scored ${latest.score.total}; it must be 80 or more.`:'No unseen screen yet.'},
  {id:'fresh',title:'Current evidence',met:long.length>0,detail:'All evidence from the last 21 days.'}
 ];
 return {ready:gates.every(g=>g.met),gates,strong:strong.map(a=>a.exerciseId)};
}

export function pendingPostmortem(state){
 return submitted(state).find(a=>!a.postmortem||!a.postmortem.category||String(a.postmortem.decision||'').trim().length<40)||null;
}

// What to do now. `challenge` jumps to the next unproven phase above the current one.
export function nextStep(exercises,state,now=Date.now()){
 const open=(state.attempts||[]).find(a=>!a.submittedAt);
 if(open)return {type:'resume',exerciseId:open.exerciseId,reason:'A screen is in progress. The timer kept running.'};
 const post=pendingPostmortem(state);
 if(post)return {type:'postmortem',exerciseId:post.exerciseId,attemptId:post.id,reason:'Name the first consequential mistake before the next screen. It decides the next drill.'};
 const ready=readiness(exercises,state,now);
 const phases=phaseStatus(exercises,state,now);
 // A very weak first attempt means the next cold screen would fail the same way. Rebuild
 // this one with a coach first (worked example, then faded support); it is practice only.
 const last=submitted(state).sort((a,b)=>b.submittedAt-a.submittedAt)[0];
 if(last&&(last.score.total<50||last.assisted)&&unseen(state).some(a=>a.id===last.id))
  return {type:'rebuild',exerciseId:last.exerciseId,reason:`${last.assisted?'That screen was assisted':`That screen scored ${last.score.total}`}. Rebuild it untimed with your coach, with no AI: make one visible test pass first, run tests every few minutes, then add your own tests and the design note. It is practice, so it will not count as evidence; the next unseen screen follows.`};
 const attempted=new Set(submitted(state).map(a=>a.exerciseId));
 const ordered=[...exercises].sort((a,b)=>a.order-b.order);
 const firstUnseen=phase=>ordered.find(e=>e.phase===phase&&!attempted.has(e.id));
 const current=phases.find(p=>!p.proven);
 const longToday=submitted(state).filter(a=>dayOf(a.submittedAt)===dayOf(now)&&exercises.find(e=>e.id===a.exerciseId)?.minutes>=60).length;
 const rest=longToday>=2?'You have done two long screens today. A third adds fatigue, not evidence; sleep consolidates.':null;
 if(ready.ready)return {type:'ready',reason:'Every gate is met. Ask the recruiter for a fresh link and book the real screen within a few days, while the evidence is current.',rest};
 if(!current){
  const missing=ready.gates.find(g=>!g.met);
  const phase=missing?.id==='family'?'family':'transfer';
  const e=firstUnseen(phase)||firstUnseen('transfer')||firstUnseen('family');
  return e?{type:'screen',exerciseId:e.id,phase:e.phase,reason:`Phases are proven; this closes the booking gate: ${missing?.title||'evidence'}.`,rest}:{type:'retake',reason:'Every exercise has been seen. Retakes are practice only; ask for new exercises to produce fresh evidence.',rest};
 }
 const e=firstUnseen(current.id);
 const above=phases.slice(phases.indexOf(current)+1).find(p=>!p.proven);
 const challenge=above&&firstUnseen(above.id);
 const step=e?{type:'screen',exerciseId:e.id,phase:current.id,reason:`${current.title}: ${current.how}`}
  :{type:'retake',phase:current.id,exerciseId:ordered.filter(x=>x.phase===current.id).sort((a,b)=>lastAt(state,a.id)-lastAt(state,b.id))[0]?.id,reason:'Every exercise in this phase has been seen. Retake the oldest; a strong retake proves fluency, not the later phases.'};
 if(challenge)step.challenge={exerciseId:challenge.id,phase:above.id,reason:current.id==='fluency'?`Confident? Skip ahead: a strong unseen ${above.title.toLowerCase()} screen proves fluency too.`:`Confident? Take a ${above.title.toLowerCase()} screen now; both phases still need their own proof.`};
 step.rest=rest;
 return step;
}
const lastAt=(state,id)=>Math.max(0,...submitted(state).filter(a=>a.exerciseId===id).map(a=>a.submittedAt));
