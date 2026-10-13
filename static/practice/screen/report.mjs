// A single JSON snapshot of practice evidence, for the candidate and for coaching agents.
// Read it from any seahyingcong.com tab:
//   import('/practice/screen/report.mjs').then(m => m.report())
// It reads browser storage only; it never changes it.
import {phaseStatus,readiness,nextStep,unseen,submitted,dayOf} from './plan.mjs';

export const KEY='cognition-screen-v1';
const LEGACY='coding-practice-v1';

export function loadState(storage=globalThis.localStorage){
 try{return JSON.parse(storage.getItem(KEY)||'')||fresh();}catch{return fresh();}
}
export function fresh(){return {version:1,targetDate:'',attempts:[],drafts:{}};}

async function catalog(){
 const res=await fetch(new URL('./exercises.json',import.meta.url),{cache:'no-store'});
 return (await res.json()).exercises.map(({files,instructions,...meta})=>meta);
}

function legacySummary(storage){
 let code;try{code=JSON.parse(storage.getItem(LEGACY)||'null');}catch{return null;}
 if(!code)return null;
 const ex=code.exercises||{},attempts=code.attempts||[];
 const last=Math.max(0,...attempts.map(a=>a.at||0));
 return {
  passed:Object.entries(ex).filter(([,p])=>p.passed&&p.lastResult==='pass').map(([id])=>id),
  attempted:Object.keys(ex).filter(id=>ex[id].attempts||ex[id].lastAt),
  attempts:attempts.length,
  lastActivity:last?new Date(last).toISOString():null,
  // Time per attempt is the fluency signal on the old path; over 3 h means the tab was left open.
  slowest:attempts.filter(a=>a.passed&&a.elapsed<3*3600).sort((a,b)=>b.elapsed-a.elapsed).slice(0,5).map(a=>({id:a.id,minutes:Math.round(a.elapsed/60),cold:!!a.cold}))
 };
}

export function summarize(exercises,state,now=Date.now()){
 const byId=new Map(exercises.map(e=>[e.id,e]));
 const firsts=new Set(unseen(state).map(a=>a.id));
 const attempts=submitted(state).sort((a,b)=>a.submittedAt-b.submittedAt).map(a=>{
  const e=byId.get(a.exerciseId)||{},p=a.score.parts;
  return {exercise:a.exerciseId,phase:e.phase,family:e.family,day:dayOf(a.submittedAt),unseen:firsts.has(a.id),
   assisted:!!a.assisted,minutesAllowed:e.minutes,minutesUsed:Math.round((a.submittedAt-a.startedAt)/60000),
   score:a.score.total,capped:a.score.capped,
   parts:{correctness:p.correctness.points,edges:p.edges.points,quality:p.quality.points,design:p.design.points,execution:p.execution.points},
   failedValidators:p.correctness.failed,criticalFailed:p.correctness.criticalFailed,
   ownTests:p.edges.tests,mutationKillRate:p.edges.killRate,survivingMutants:p.edges.survivors.slice(0,8),
   firstGreenMin:p.execution.firstGreenMin,runs:p.execution.runs,largePastes:p.execution.largePastes,awaySeconds:p.execution.awaySeconds,
   thinDesignSections:p.design.thin,selfRatedQuality:p.quality.selfRated,
   postmortem:a.postmortem||null};
 });
 // Per family: the latest score and the trend, so weak families stand out.
 const families={};
 for(const a of attempts){const f=families[a.family] ||= {attempts:0,best:0,latest:0,unseenStrong:0};f.attempts++;f.best=Math.max(f.best,a.score);f.latest=a.score;if(a.unseen&&a.score>=85)f.unseenStrong++;}
 const errorCounts={};for(const a of attempts)if(a.postmortem?.category)errorCounts[a.postmortem.category]=(errorCounts[a.postmortem.category]||0)+1;
 return {
  generatedAt:new Date(now).toISOString(),targetDate:state.targetDate||null,
  next:nextStep(exercises,state,now),
  readiness:readiness(exercises,state,now),
  phases:phaseStatus(exercises,state,now).map(({id,title,proven,subsumed,evidence})=>({id,title,proven,subsumed,evidence})),
  families,errorCounts,attempts,
  inProgress:(state.attempts||[]).filter(a=>!a.submittedAt).map(a=>({exercise:a.exerciseId,startedAt:new Date(a.startedAt).toISOString(),deadline:new Date(a.deadline).toISOString()}))
 };
}

export async function report(storage=globalThis.localStorage,now=Date.now()){
 const exercises=await catalog();
 return {...summarize(exercises,loadState(storage),now),legacyPath:legacySummary(storage)};
}
