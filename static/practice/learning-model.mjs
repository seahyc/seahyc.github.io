import {skills,taskSkills} from './skill-catalog.mjs';

const DAY=86400000, REPAIR=600000, intervals=[1,3,7,14,30];
const finite=n=>Number.isFinite(Number(n))?Number(n):0;
const clean=e=>e.passed===true&&e.cold===true&&e.assisted!==true;

function legacyEvents(code,represented){
 const out=[];
 for(const a of code.attempts||[]){
  if(!a||represented.has(`${a.id}|${finite(a.at)}`))continue;
  out.push({id:a.id,at:finite(a.at),sessionId:a.sessionId??`legacy-${a.id}-${finite(a.at)}`,passed:!!a.passed,cold:!!a.cold,assisted:!!a.assisted||a.scaffold===true,kind:a.kind,legacy:true,fresh:false});
 }
 // Very old backups sometimes retained only the exercise summary. It can prove one
 // independent completion, but cannot prove spacing or transfer.
 for(const [id,p] of Object.entries(code.exercises||{})){
  if(!p?.passed||!finite(p.lastAt)||out.some(e=>e.id===id)||[...(code.learningEvents||[])].some(e=>e?.id===id))continue;
  const independent=(p.coldDays||[]).length>0&&p.lastResult==='pass'&&!p.session?.assisted&&p.review?.phase!=='relearning'&&!p.review?.assisted&&!p.review?.failed;
  out.push({id,at:finite(p.lastAt),sessionId:`legacy-summary-${id}`,passed:true,cold:independent,assisted:!independent,legacy:true,fresh:false});
 }
 return out;
}

export function skillProfile(code={},now=Date.now()){
 const profile=Object.fromEntries(skills.map(s=>[s.id,{id:s.id,title:s.title,status:'unknown',independent:false,retained:false,transfer:false,needsRepair:false,dueAt:0,lastAt:0,independentTasks:[],delayedChecks:0,_interval:0,_firstTaskAt:0,_seenSessions:new Set(),_repairSessions:new Set(),_lastRepairAt:0,_lastDelayedAt:0,_sessionGaps:new Map()}]));
 const recorded=(code.learningEvents||[]).filter(Boolean);
 const represented=new Set(recorded.map(e=>`${e.id}|${finite(e.at)}`));
 const events=[...recorded,...legacyEvents(code,represented)].filter(e=>finite(e.at)>0&&finite(e.at)<=now&&e.kind!=='syntax'&&taskSkills[e.id]).sort((a,b)=>finite(a.at)-finite(b.at));
 for(const e of events){
  const mapping=taskSkills[e.id], at=finite(e.at), session=String(e.sessionId??`${e.id}-${at}`);
  for(const skillId of [...mapping.primary,...mapping.practiced]){
   const p=profile[skillId];if(!p)continue;
   const primary=mapping.primary.includes(skillId), wasIndependent=p.independent, previousExposure=p.lastAt;
   if(e.kind==='exposure'){
    if(!p._sessionGaps.has(session))p._sessionGaps.set(session,previousExposure>0?at-previousExposure:0);
    p.lastAt=Math.max(p.lastAt,at);
    continue;
   }
   p.lastAt=Math.max(p.lastAt,at);
   if(mapping.kind==='guided'){if(primary&&!p.independent)p.status='learning';continue;}
   if(!primary&&!wasIndependent)continue;
   if(!e.passed||e.assisted||!e.cold){
    if(primary){
     p.needsRepair=true;
     const repairKey=`${session}|${skillId}`;
     if(!p._repairSessions.has(repairKey)){p._repairSessions.add(repairKey);p.dueAt=at+REPAIR;p._lastRepairAt=at;if(p.independent)p._interval=0;}
     if(!p.independent)p.status='learning';
    }
    continue;
   }
   const positiveKey=`${session}|${skillId}`;
   if(p._seenSessions.has(positiveKey)){p.needsRepair=false;continue;}
   p._seenSessions.add(positiveKey);
   if(primary){
    if(!p.independent){p.independent=true;p.status='independent';p.dueAt=at+DAY;p._interval=0;p._firstTaskAt=at;}
    if(!p.independentTasks.includes(e.id))p.independentTasks.push(e.id);
    if(!e.legacy&&e.fresh===true&&['variation','diagnostic'].includes(mapping.kind)&&p.independentTasks.some(id=>id!==e.id)&&at>p._firstTaskAt)p.transfer=true;
   }
   const repairing=p.needsRepair;
   p.needsRepair=false;
   // A repair restores the prior schedule. It does not earn a longer interval.
   if(repairing){if(!p.dueAt||p.dueAt<=at)p.dueAt=at+DAY;continue;}
   const exposureGap=p._sessionGaps.has(session)?p._sessionGaps.get(session):(previousExposure>0?at-previousExposure:0);
   if(wasIndependent&&p.dueAt>0&&at>=p.dueAt&&exposureGap>=DAY&&!e.legacy){
    p.delayedChecks++;p._lastDelayedAt=at;p._interval=Math.min(p._interval+1,intervals.length-1);p.dueAt=at+intervals[p._interval]*DAY;
   }
  }
 }
 for(const p of Object.values(profile)){
  p.retained=p.independent&&!p.needsRepair&&p.independentTasks.length>=2&&p.delayedChecks>=1&&p._lastDelayedAt>p._lastRepairAt&&(p.dueAt<=0||p.dueAt>now);
  p.status=p.retained?'retained':p.independent?'independent':p.status==='learning'?'learning':'unknown';
  delete p._interval;delete p._firstTaskAt;delete p._seenSessions;delete p._repairSessions;delete p._lastRepairAt;delete p._lastDelayedAt;delete p._sessionGaps;
 }
 return profile;
}

export function coveredBySkills(code,id,now=Date.now()){
 const mapping=taskSkills[id];
 if(!mapping||mapping.coverable!==true||mapping.kind==='mock'||mapping.kind==='diagnostic'||mapping.kind==='variation')return false;
 const primary=mapping.primary||[];
 const profile=skillProfile(code,now);
 return primary.length>0&&primary.every(skill=>profile[skill]?.independent&&!profile[skill]?.needsRepair)&&(mapping.coverageTasks||[]).every(task=>ownIndependent(code,task,now));
}

function step(e,extra={}){return {type:'code',id:e.id,title:e.title,mode:extra.mode||'cold',action:extra.action||'fresh',review:!!extra.review,reinforcement:extra.reinforcement||undefined,reason:extra.reason||'Build this independently. Ask for a hint whenever you need one.',diagnostic:extra.diagnostic||undefined,variation:extra.variation||undefined,skillIds:extra.skillIds,milestoneId:taskSkills[e.id]?.family};}
const terminal=p=>p?.passed&&p.lastResult==='pass'&&!p.review?.pending;
const untouched=(e,code)=>{const p=code.exercises?.[e.id];return !p?.viewedAt&&!p?.files&&!p?.attempts&&!p?.session&&!(code.learningEvents||[]).some(x=>x.id===e.id);};
function ownIndependent(code,id,now){
 if(taskSkills[id]?.kind==='guided')return false;
 const current=(code.learningEvents||[]).filter(e=>e?.id===id&&finite(e.at)<=now&&e.kind!=='syntax'&&e.kind!=='exposure').sort((a,b)=>finite(a.at)-finite(b.at));
 if(current.length){const e=current.at(-1);return e.passed===true&&e.cold===true&&e.assisted!==true;}
 const legacy=(code.attempts||[]).filter(e=>e?.id===id&&finite(e.at)<=now&&e.kind!=='syntax').sort((a,b)=>finite(a.at)-finite(b.at));
 if(legacy.length){const e=legacy.at(-1);return e.passed===true&&e.cold===true&&e.assisted!==true&&e.scaffold!==true;}
 const p=code.exercises?.[id];return !!(p?.passed&&p.lastResult==='pass'&&(p.coldDays||[]).length&&!p.session?.assisted&&(!p.lastAt||p.lastAt<=now));
}

export function adaptiveNextStep(exercises,code={},sessions=[],path={},now=Date.now(),options={}){
 const byId=new Map(exercises.map(e=>[e.id,e])), profile=skillProfile(code,now);
 const events=(code.learningEvents||[]).filter(e=>e.at<=now&&e.kind!=='syntax').sort((a,b)=>a.at-b.at);
 const lastId=events.at(-1)?.id;
 const pending=exercises.find(e=>code.exercises?.[e.id]?.review?.pending);
 if(pending)return step(pending,{action:'resume',reason:'The checks passed. Finish recording this result before continuing.'});
 const activeCandidates=exercises.filter(e=>{const p=code.exercises?.[e.id];if(!p?.session||terminal(p)||!(p.files||p.attempts||p.lastResult))return false;
  if(taskSkills[e.id]?.kind==='diagnostic'){
   const adverse=events.filter(x=>x.id===e.id&&x.kind!=='exposure'&&String(x.sessionId)===String(p.session.started)&&(!x.passed||x.assisted));
   if(adverse.some(x=>x.assisted)||adverse.length>=2)return false;
  }
  return true;
 });
 const requested=code.activeExerciseId&&activeCandidates.find(e=>e.id===code.activeExerciseId);
 const active=(requested||(code.activeExerciseId?undefined:activeCandidates.sort((a,b)=>(code.exercises?.[b.id]?.session?.started||0)-(code.exercises?.[a.id]?.session?.started||0))[0]));
 if(active){const kind=taskSkills[active.id]?.kind;return step(active,{mode:code.exercises[active.id].session.mode||'practice',action:'resume',diagnostic:kind==='diagnostic',variation:kind==='variation',skillIds:taskSkills[active.id]?.primary,reason:'Continue the attempt already in progress.'});}

 const eligible=e=>{
  const m=taskSkills[e.id];if(!m)return true;
  return (m.primary||[]).every(id=>(skills.find(s=>s.id===id)?.prerequisites||[]).every(pre=>profile[pre]?.independent&&!profile[pre]?.needsRepair));
 };
 const dueSkills=Object.values(profile).filter(p=>p.independent&&p.dueAt>0&&p.dueAt<=now&&(p.needsRepair||now-p.lastAt>=DAY)).sort((a,b)=>a.dueAt-b.dueAt);
 for(const due of dueSkills){
  const coversDue=e=>eligible(e)&&(taskSkills[e.id]?.primary?.includes(due.id)||(!due.needsRepair&&taskSkills[e.id]?.practiced?.includes(due.id)));
  let candidates=exercises.filter(e=>coversDue(e)&&taskSkills[e.id]?.kind!=='mock');
  if(!candidates.length)candidates=exercises.filter(e=>coversDue(e)&&taskSkills[e.id]?.kind==='mock'&&!untouched(e,code));
  const independentCandidates=candidates.filter(e=>taskSkills[e.id]?.kind!=='guided');if(independentCandidates.length)candidates=independentCandidates;
  const fresh=candidates.find(e=>e.id!==lastId&&untouched(e,code)&&(taskSkills[e.id].kind==='variation'||taskSkills[e.id].kind==='diagnostic'));
  const mixed=candidates.find(e=>e.id!==lastId&&taskSkills[e.id].primary.length>1);
  const pick=fresh||mixed||candidates.filter(e=>e.id!==lastId).sort((a,b)=>(code.exercises?.[a.id]?.lastAt||0)-(code.exercises?.[b.id]?.lastAt||0))[0]||candidates[0];
  if(pick){const familiarMock=taskSkills[pick.id].kind==='mock';return step(pick,{mode:'cold',review:true,diagnostic:taskSkills[pick.id].kind==='diagnostic'&&untouched(pick,code),variation:taskSkills[pick.id].kind==='variation'&&untouched(pick,code),skillIds:taskSkills[pick.id].primary,reason:familiarMock?'Rebuild this familiar task as an untimed cold review. This does not count as a fresh assessment.':fresh?'A fresh variation checks what remains after a gap.':mixed?'A mixed exercise maintains several due skills together.':'Rebuild a familiar exercise after the scheduled gap.'});}
 }

 // Walk the canonical route. Covered teaching tasks disappear, but mocks and
 // interview sessions remain explicit milestones.
 // Prefer the exported canonical order when callers provide a shuffled catalog.
 const canonical=options.route||[];
 const known=new Set(canonical.filter(id=>id.startsWith('@')?sessions.some(s=>s.id===id.slice(1)):byId.has(id)));
 const ordered=[...canonical.filter(id=>known.has(id)),...exercises.map(e=>e.id).filter(id=>!canonical.includes(id)&&!id.startsWith('probe-')&&!id.startsWith('variation-')&&!id.startsWith('mixed-'))];
 for(const id of ordered){
  if(id.startsWith('@')){
   const s=sessions.find(x=>x.id===id.slice(1));if(!s)continue;
   const missing=s.prerequisites?.find(task=>byId.has(task)&&!(taskSkills[task]?.kind==='guided'&&terminal(code.exercises?.[task]))&&!ownIndependent(code,task,now)&&!coveredBySkills(code,task,now));
   if(missing){const e=byId.get(missing);return step(e,{mode:taskSkills[missing]?.kind==='mock'&&untouched(e,code)?'mock':'cold',skillIds:taskSkills[missing]?.primary,reason:'Complete this prerequisite before the interview rehearsal.'});}
   const latest=(path.reviews||[]).filter(r=>r.id===s.id&&r.at<=now).sort((a,b)=>b.at-a.at)[0];
   const passed=latest&&options.reviewPass?.(latest,s), final=s.id==='full-loop';
   if(!passed||(final&&!options.peerCurrent?.(path,s,now)))return {type:'session',id:s.id,title:s.title,review:false,reason:latest&&!passed?'Repair the weakest part with a new rehearsal.':final?'Bring the pieces together with a peer. Their feedback is required for this final rehearsal.':'Explain the work one prompt at a time, then record specific feedback.'};
   continue;
  }
  const e=byId.get(id), map=taskSkills[id];if(!e)continue;
  const independent=ownIndependent(code,id,now);
  if((map?.kind==='mock'?independent:map?.kind==='guided'?terminal(code.exercises?.[id])&&independent:independent)||coveredBySkills(code,id,now))continue;
  if(!eligible(e)){
   const missing=(map?.primary||[]).flatMap(s=>skills.find(x=>x.id===s)?.prerequisites||[]).find(s=>!profile[s]?.independent||profile[s]?.needsRepair);
   const def=skills.find(s=>s.id===missing), candidate=def?.probe&&byId.get(def.probe)||def?.teach.map(x=>byId.get(x)).find(Boolean);
   if(candidate&&eligible(candidate))return step(candidate,{diagnostic:taskSkills[candidate.id]?.kind==='diagnostic',mode:taskSkills[candidate.id]?.kind==='guided'?'practice':'cold',skillIds:[missing],reason:'Build the earliest missing prerequisite before continuing.'});
   continue;
  }
  if(terminal(code.exercises?.[id])&&!independent&&map?.kind!=='guided'){
   const variation=exercises.find(x=>taskSkills[x.id]?.kind==='variation'&&taskSkills[x.id].primary.some(s=>map?.primary?.includes(s))&&untouched(x,code)&&eligible(x));
   if(variation)return step(variation,{mode:'cold',variation:true,skillIds:taskSkills[variation.id].primary,reason:'Try a fresh variation after the supported solution.'});
   return step(e,{mode:'cold',action:'fresh',skillIds:map?.primary,reason:'Rebuild this task independently after the supported solution.'});
  }
  const primary=(map?.primary||[]).find(s=>!profile[s]?.independent);
  if(primary){
   const def=skills.find(s=>s.id===primary), probe=def?.probe&&byId.get(def.probe);
   if(probe&&untouched(probe,code)&&eligible(probe))return step(probe,{diagnostic:true,skillIds:[primary],reason:'Try one short diagnostic before the guided sequence. Hints remain available if you need them.'});
  }
  if(map?.kind==='guided'&&terminal(code.exercises?.[id])&&!independent){const variation=exercises.find(x=>taskSkills[x.id]?.kind==='variation'&&taskSkills[x.id].primary.some(s=>map.primary.includes(s))&&untouched(x,code)&&eligible(x));if(variation)return step(variation,{mode:'cold',variation:true,skillIds:taskSkills[variation.id].primary,reason:'Try a fresh independent variation after the worked example.'});const candidates=exercises.filter(x=>!['guided','mock'].includes(taskSkills[x.id]?.kind)&&taskSkills[x.id]?.primary?.some(s=>map.primary.includes(s))&&eligible(x));const cold=candidates.find(x=>(map.coverageTasks||[]).includes(x.id))||candidates.find(x=>taskSkills[x.id]?.kind==='challenge')||candidates[0];if(cold)return step(cold,{mode:'cold',skillIds:taskSkills[cold.id].primary,reason:'Rebuild this skill independently after the worked example.'});}
  if(map?.kind==='mock'&&terminal(code.exercises?.[id])&&!independent)return step(e,{mode:'cold',action:'fresh',skillIds:map.primary,reason:'Rebuild this task independently after the supported attempt.'});
  const failedProbe=(map?.primary||[]).some(skill=>{const probe=skills.find(s=>s.id===skill)?.probe;if(!probe)return false;const xs=events.filter(x=>x.id===probe&&x.kind!=='exposure');return xs.some(x=>x.assisted)||xs.filter(x=>!x.passed).length>=2;});
  return step(e,{mode:map?.kind==='guided'||failedProbe&&!code.exercises?.[id]?.passed?'practice':e.stage==='Mock'&&untouched(e,code)?'mock':'cold',action:code.exercises?.[id]?.session&&!failedProbe?'resume':'fresh',skillIds:map?.primary,reason:map?.kind==='guided'||failedProbe?'Use the worked example to build one small working behavior.':map?.kind==='mock'?'Apply your skills to this full unfamiliar task.':'Build this independently. Ask for a hint whenever you need one.'});
 }

 // Sessions are never inferred from code evidence; caller integration interleaves
 // them. If only adaptive exercises are supplied, perpetual useful practice wins.
 let pool=exercises.filter(e=>eligible(e)&&taskSkills[e.id]?.kind!=='mock');
 const nonguided=pool.filter(e=>taskSkills[e.id]?.kind!=='guided');if(nonguided.length)pool=nonguided;
 const unseenVariation=pool.find(e=>taskSkills[e.id]?.kind==='variation'&&untouched(e,code));
 const pick=unseenVariation||pool.filter(e=>e.id!==lastId).sort((a,b)=>(code.exercises?.[a.id]?.lastAt||0)-(code.exercises?.[b.id]?.lastAt||0))[0]||pool[0]||exercises[0];
 return pick?step(pick,{reinforcement:true,variation:!!unseenVariation&&taskSkills[pick.id]?.kind==='variation',skillIds:taskSkills[pick.id]?.primary,reason:unseenVariation?'Use a fresh variation to extend the skill to a new problem.':'The new variants are exhausted. Revisit the least recent eligible exercise for familiar practice.'}):{type:'done',title:'Practice is complete.',reason:'Your progress is saved.'};
}
