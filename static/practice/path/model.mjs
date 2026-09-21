import {assessmentQualification} from '../assessment-readiness.mjs';
export const PATH_KEY = 'coding-interview-path-v1';
export const CODE_KEY = 'coding-practice-v1';
export const today = (now=Date.now()) => {const d=new Date(now);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export const roleProfiles={
 cognition:{label:'Cognition applied / Special Projects',tracks:['shared','applied','cognition']},
 research:{label:'Frontier Research Engineer',tracks:['shared','depth','research']},
 infra:{label:'ML Infrastructure',tracks:['shared','depth','infra']},
 all:{label:'All frontier loops',tracks:['shared','applied','depth','cognition','research','infra']}
};
export function normalizeTrack(track){return ({applied:'cognition',depth:'infra',both:'all'})[track]||((track in roleProfiles)?track:'cognition');}
export function freshPath(){return {version:1,track:'cognition',minutes:35,targetDate:'',reason:'Turn my engineering judgment into reliable code I can explain.',sessions:{},reviews:[],drafts:{}};}
export function eligibleMock(e,code={}){const p=code.exercises?.[e.id];return e.stage==='Mock'&&!p?.viewedAt&&!p?.session&&!p?.files&&!p?.attempts&&!(code.attempts||[]).some(a=>a.id===e.id);}
export function activeSessions(sessions,track){const allowed=new Set(roleProfiles[normalizeTrack(track)].tracks);return sessions.filter(s=>allowed.has(s.track));}
export function validatePath(value,sessions){
 if(!value||value.version!==1||typeof value.sessions!=='object'||!Array.isArray(value.reviews))throw Error('Choose a path backup exported from this page.');
 const next=freshPath();next.track=normalizeTrack(value.track);next.minutes=[20,35,60,90].includes(value.minutes)?value.minutes:35;next.targetDate=/^\d{4}-\d{2}-\d{2}$/.test(value.targetDate||'')?value.targetDate:'';next.reason=String(value.reason||next.reason).slice(0,500);
 for(const s of sessions){const d=value.drafts?.[s.id],questionCount=s.rounds.length+s.followups.length;if(d)next.drafts[s.id]={notes:String(d.notes||'').slice(0,30000),roundNotes:Array.from({length:questionCount},(_,i)=>String(d.roundNotes?.[i]||(!d.roundNotes&&i===0?d.notes:'')||'').slice(0,30000)),roundIndex:Math.max(0,Math.min(questionCount,Number.isInteger(d.roundIndex)?d.roundIndex:0)),rubricIndex:Math.max(0,Math.min(s.rubric.length,Number.isInteger(d.rubricIndex)?d.rubricIndex:0)),mode:['solo','peer'].includes(d.mode)?d.mode:'solo',scores:Object.fromEntries(s.rubric.map(r=>[r.id,validScore(d.scores?.[r.id])])),feedback:String(d.feedback||'').slice(0,12000)};
 const old=value.sessions[s.id];if(old&&Number.isFinite(old.started))next.sessions[s.id]={started:old.started,deadline:Number(old.deadline)||null};}
 next.reviews=value.reviews.filter(r=>sessions.some(s=>s.id===r.id)&&Number.isFinite(r.at)).slice(0,200).map(r=>{const s=sessions.find(s=>s.id===r.id);return {id:r.id,at:r.at,mode:r.mode==='peer'?'peer':'solo',scores:Object.fromEntries(s.rubric.map(d=>[d.id,validScore(r.scores?.[d.id])])),notes:String(r.notes||'').slice(0,30000),feedback:String(r.feedback||'').slice(0,12000),completed:r.completed===true,elapsed:Number(r.elapsed)||0};});return next;
}
function validScore(v){return Number.isInteger(v)&&v>=0&&v<=3?v:null;}
export function reviewPass(review,session){return review&&review.completed===true&&session.rubric.every(r=>validScore(review.scores?.[r.id])!==null&&review.scores[r.id]>=2)&&review.notes?.trim().length>=80&&review.feedback?.trim().length>=30;}
export function rehearsalComplete(session,now=Date.now()){return Number.isFinite(session?.started)&&Number.isFinite(session?.deadline)&&session.deadline<=now;}
export function sessionEvidenceDays(id){
 if(['agent-build-day','research-experiment-defense','training-systems-design','championship-loop','project-deep-dive','motivation-and-judgment'].includes(id))return 42;
 if(['live-requirement-change','code-review'].includes(id))return 21;
 return 28;
}
export function assessedSessions(path,sessions,peer=false,now=Date.now()) {
 return sessions.filter(s=>{
  const records=(path.reviews||[]).filter(r=>r.id===s.id&&r.at<=now).sort((a,b)=>b.at-a.at);
  if(!records.length||!reviewPass(records[0],s))return false;
  const evidence=records.find(r=>(!peer||r.mode==='peer')&&reviewPass(r,s));
  return !!evidence&&now-evidence.at<=sessionEvidenceDays(s.id)*86400000&&!records.some(r=>r.at>evidence.at&&!reviewPass(r,s));
 });
}
export function readiness(path,code,sessions,now=Date.now(),catalog=[]){
 const role=normalizeTrack(path.track),current=activeSessions(sessions,role);
 const pass=id=>{const p=code.exercises?.[id];return !!p?.passed&&(!p.lastResult||p.lastResult==='pass');};
 const recentPass=(id,days)=>pass(id)&&Number.isFinite(code.exercises?.[id]?.lastAt)&&now-code.exercises[id].lastAt<=days*86400000;
 const qualification=assessmentQualification(code,catalog,now);
 const reviewed=assessedSessions(path,current,true,now);
 const peer=id=>reviewed.some(r=>r.id===id),codeSet=(ids,days)=>ids.every(id=>recentPass(id,days)),sessionSet=ids=>ids.every(peer);
 const roleEvidence={
  cognition:{code:['unfamiliar-repo-repair'],sessions:['reliable-agent-design','customer-implementation-case'],competition:['agent-build-day']},
  research:{code:['kv-cache-repair','experiment-analysis'],sessions:['ml-notebook-debug','research-experiment-defense'],competition:['research-experiment-defense']},
  infra:{code:['unfamiliar-repo-repair','kv-cache-repair'],sessions:['training-systems-design','inference-service'],competition:['training-systems-design']},
  all:{code:['unfamiliar-repo-repair','kv-cache-repair','experiment-analysis'],sessions:['reliable-agent-design','customer-implementation-case','ml-notebook-debug','research-experiment-defense','training-systems-design','inference-service'],competition:['agent-build-day','research-experiment-defense','training-systems-design']}
 }[role];
 return [
  {id:'blind',title:'Blind coding qualification',met:qualification.ready,detail:`${qualification.gates.filter(g=>g.met).length}/${qualification.gates.length} contest gates met in the past 21 days`,next:'Complete five fresh mocks with four strong passes, three consecutive finishes, broad transfer, and a review buffer.'},
  {id:'extension',title:'Adapt to a live requirement change',met:peer('live-requirement-change'),detail:peer('live-requirement-change')?'Current passing peer review':'A passing peer-reviewed live extension is required',next:'Have a peer reveal constraints during the round while you preserve existing behavior.'},
  {id:'debug',title:'Repair an unfamiliar repository',met:recentPass('unfamiliar-repo-repair',21)&&peer('code-review'),detail:`${Number(recentPass('unfamiliar-repo-repair',21))+Number(peer('code-review'))}/2 current implementation and peer-review checks`,next:'Diagnose the multi-file system, add regression tests, and defend the root cause with a peer.'},
  {id:'role',title:`Meet the ${roleProfiles[role].label} technical bar`,met:codeSet(roleEvidence.code,28)&&sessionSet(roleEvidence.sessions),detail:`${roleEvidence.code.filter(id=>recentPass(id,28)).length+roleEvidence.sessions.filter(peer).length}/${roleEvidence.code.length+roleEvidence.sessions.length} current role-specific coding and reviewed sessions`,next:'Complete the coding, ML, systems, product, or customer events selected for this target loop.'},
  {id:'competition',title:'Complete the role competition event',met:sessionSet(roleEvidence.competition),detail:`${roleEvidence.competition.filter(peer).length}/${roleEvidence.competition.length} long-form role events have current peer-reviewed passes`,next:'Run the extended build, experiment defense, or systems design without coaching and record concrete peer feedback.'},
  {id:'loop',title:'Pass a complete frontier interview loop',met:peer('championship-loop')&&sessionSet(['project-deep-dive','motivation-and-judgment']),detail:`${['championship-loop','project-deep-dive','motivation-and-judgment'].filter(peer).length}/3 full-loop, project-depth, and judgment reviews are current`,next:'Run the five-hour fresh loop with a peer, then repair every dimension below 2/3. Evidence expires after 42 days.'}
 ];
}
export function sessionStatus(s,path,now=Date.now()){
 const rs=path.reviews.filter(r=>r.id===s.id).sort((a,b)=>b.at-a.at);if(!rs.length)return 'Not rehearsed';
 const r=rs[0];if(now-r.at>sessionEvidenceDays(s.id)*86400000)return 'Review again';if(!reviewPass(r,s))return 'Repair and repeat';return assessedSessions(path,[s],true,now).length?'Peer-reviewed evidence':'Self-rated; peer review next';
}
export function nextAction(path,code,catalog,sessions,now=Date.now()){
 const due=catalog.filter(e=>code.exercises?.[e.id]?.due<=today(now));
 if(due.length)return {type:'code',id:due[0].id,title:due[0].title,reason:'A spaced review is due. Reconstruct it before adding new material.'};
 const active=activeSessions(sessions,path.track);
 const readySession=active.find(s=>!path.reviews.some(r=>r.id===s.id&&reviewPass(r,s))&&s.prerequisites.every(id=>code.exercises?.[id]?.passed));
 // Add communication early, but keep the very first session focused on syntax.
 if(readySession&&code.exercises?.['python-refresher-1']?.passed)return {type:'session',id:readySession.id,title:readySession.title,reason:'Pair your implementation skill with a spoken explanation.'};
 const exercise=catalog.find(e=>!code.exercises?.[e.id]?.passed);
 if(exercise)return {type:eligibleMock(exercise,code)?'mock':'code',id:exercise.id,title:exercise.title,reason:'The next manageable coding step. Stop after one useful behavior if your time is short.'};
 const pending=active.find(s=>sessionStatus(s,path,now)!=='Peer-reviewed evidence');
 return pending?{type:'session',id:pending.id,title:pending.title,reason:'Turn practice into reviewed evidence.'}:{type:'session',id:'full-loop',title:'Full interview rehearsal',reason:'Repeat under realistic conditions and ask for a new follow-up.'};
}
