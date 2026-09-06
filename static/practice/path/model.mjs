export const PATH_KEY = 'coding-interview-path-v1';
export const CODE_KEY = 'coding-practice-v1';
export const today = (now=Date.now()) => {const d=new Date(now);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function freshPath(){return {version:1,track:'applied',minutes:35,targetDate:'',reason:'Turn my engineering judgment into reliable code I can explain.',sessions:{},reviews:[],drafts:{}};}
export function eligibleMock(e,code={}){const p=code.exercises?.[e.id];return e.stage==='Mock'&&!p?.viewedAt&&!p?.session&&!p?.files&&!p?.attempts&&!(code.attempts||[]).some(a=>a.id===e.id);}
export function activeSessions(sessions,track){return sessions.filter(s=>s.track==='shared'||track==='both'||s.track===track);}
export function validatePath(value,sessions){
 if(!value||value.version!==1||typeof value.sessions!=='object'||!Array.isArray(value.reviews))throw Error('Choose a path backup exported from this page.');
 const next=freshPath();next.track=['applied','depth','both'].includes(value.track)?value.track:'applied';next.minutes=[20,35,60,90].includes(value.minutes)?value.minutes:35;next.targetDate=/^\d{4}-\d{2}-\d{2}$/.test(value.targetDate||'')?value.targetDate:'';next.reason=String(value.reason||next.reason).slice(0,500);
 for(const s of sessions){const d=value.drafts?.[s.id];if(d)next.drafts[s.id]={notes:String(d.notes||'').slice(0,30000),mode:['solo','peer'].includes(d.mode)?d.mode:'solo',scores:Object.fromEntries(s.rubric.map(r=>[r.id,validScore(d.scores?.[r.id])])),feedback:String(d.feedback||'').slice(0,12000)};
 const old=value.sessions[s.id];if(old&&Number.isFinite(old.started))next.sessions[s.id]={started:old.started,deadline:Number(old.deadline)||null};}
 next.reviews=value.reviews.filter(r=>sessions.some(s=>s.id===r.id)&&Number.isFinite(r.at)).slice(0,200).map(r=>{const s=sessions.find(s=>s.id===r.id);return {id:r.id,at:r.at,mode:r.mode==='peer'?'peer':'solo',scores:Object.fromEntries(s.rubric.map(d=>[d.id,validScore(r.scores?.[d.id])])),notes:String(r.notes||'').slice(0,30000),feedback:String(r.feedback||'').slice(0,12000),completed:r.completed===true,elapsed:Number(r.elapsed)||0};});return next;
}
function validScore(v){return Number.isInteger(v)&&v>=0&&v<=3?v:null;}
export function reviewPass(review,session){return review&&review.completed===true&&session.rubric.every(r=>validScore(review.scores?.[r.id])!==null&&review.scores[r.id]>=2)&&review.notes?.trim().length>=80&&review.feedback?.trim().length>=30;}
export function assessedSessions(path,sessions,peer=false,now=Date.now()) {
 return sessions.filter(s=>{
  const records=path.reviews.filter(r=>r.id===s.id&&r.at<=now).sort((a,b)=>b.at-a.at);
  if(!records.length||!reviewPass(records[0],s))return false;
  const evidence=records.find(r=>(!peer||r.mode==='peer')&&reviewPass(r,s));
  return !!evidence&&now-evidence.at<=30*86400000&&!records.some(r=>r.at>evidence.at&&!reviewPass(r,s));
 });
}
export function readiness(path,code,sessions,now=Date.now()){
 const current=activeSessions(sessions,path.track);
 const pass=id=>{const p=code.exercises?.[id];return !!p?.passed&&(!p.lastResult||p.lastResult==='pass');};
 const cold=id=>pass(id)&&(code.exercises?.[id]?.coldDays?.length||0)>=2;
 const foundation=['python-refresher-1','tool-router','interval-windows'];
 const practical=path.track==='depth'?['dependency-graph','bounded-async-map','batch-scheduler','repair-expiring-cache']:path.track==='both'?['object-graph-codec','evolving-ledger','bounded-async-map','batch-scheduler','repair-expiring-cache']:['object-graph-codec','evolving-ledger','eval-harness','repair-expiring-cache'];
 const mockAttempts=(code.attempts||[]).filter(a=>a.passed&&a.mockQualified&&a.freshMock&&a.at<=now&&now-a.at<=30*86400000);
 const distinct=new Set(mockAttempts.map(a=>a.id)), days=new Set(mockAttempts.map(a=>today(a.at)));
 const reviewed=assessedSessions(path,current,true,now);
 const must=current.filter(s=>s.id!=='full-loop');
 return [
  {id:'fluency',title:'Retrieve the fundamentals',met:foundation.every(cold),detail:`${foundation.filter(cold).length}/${foundation.length} core exercises recalled on two different days`,next:'Return to Python Muscle Memory, Tool Router and Interval Windows from a fresh scaffold.'},
  {id:'build',title:'Finish practical systems',met:practical.every(pass),detail:`${practical.filter(pass).length}/${practical.length} selected systems exercises pass`,next:'Complete the practical builds for your selected emphasis and explain their edge cases.'},
  {id:'mock',title:'Transfer under time pressure',met:distinct.size>=2&&days.size>=2,detail:`${distinct.size}/2 different fresh mocks passed on ${days.size}/2 days in the past 30 days`,next:'Use “Start a fresh mock” for an unviewed task. A familiar retry measures retention, not fresh transfer.'},
  {id:'interview',title:'Explain it to another person',met:must.every(s=>reviewed.some(r=>r.id===s.id)),detail:`${must.filter(s=>reviewed.some(r=>r.id===s.id)).length}/${must.length} interview sessions meet every rubric dimension with reported peer review`,next:'Rehearse with a peer, capture their specific feedback, and score each dimension against its anchor. Evidence expires after 30 days.'},
  {id:'loop',title:'Complete the full rehearsal',met:reviewed.some(s=>s.id==='full-loop'),detail:reviewed.some(s=>s.id==='full-loop')?'Full loop reviewed in the past 30 days':'Full-loop rehearsal still needs review',next:'Run the 150-minute loop with another person and repair any dimension below 2/3.'}
 ];
}
export function sessionStatus(s,path,now=Date.now()){
 const rs=path.reviews.filter(r=>r.id===s.id).sort((a,b)=>b.at-a.at);if(!rs.length)return 'Not rehearsed';
 const r=rs[0];if(now-r.at>30*86400000)return 'Review again';if(!reviewPass(r,s))return 'Repair and repeat';return assessedSessions(path,[s],true,now).length?'Peer-reviewed evidence':'Self-rated; peer review next';
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
