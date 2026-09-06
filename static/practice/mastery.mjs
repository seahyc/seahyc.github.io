import {day} from './state.mjs';
import {reviewPass,assessedSessions} from './path/model.mjs';

// One shared route. A supported success permits retrieval practice, not a mastery claim.
export const route = [
 'tiny-filter-guided','tiny-filter-cold','tiny-count-guided','tiny-count-cold',
 'syntax-faded','python-refresher-1','@think-aloud',
 'tool-router','interval-windows','python-refresher-2','log-spike','@code-review',
 'shortest-route','ranked-results','eval-harness','@eval-design',
 'loop-detector','rate-limiter','@customer-discovery',
 'dependency-graph','retry-backoff','@reliable-agent-design',
 'object-graph-codec','bracket-parser','sse-parser','@delivery-demo',
 'versioned-key-value-store','bounded-lru-cache','duplicate-content','evolving-ledger',
 'repair-expiring-cache','@project-deep-dive',
 'bounded-async-map','@concurrency-whiteboard','batch-scheduler',
 '@model-fundamentals','@inference-service','@motivation-and-judgment','@full-loop'
];
export const supported = id => ['tiny-filter-guided','tiny-count-guided','syntax-guided','syntax-faded'].includes(id);
export function demonstrated(code,id){
 if(id.startsWith('tiny-')) {
  if(demonstrated(code,'python-refresher-1'))return true;
  if(supported(id)&&code.exercises?.['syntax-guided']?.passed)return true;
 }
 const p=code.exercises?.[id];
 if(!p?.passed || (p.lastResult && p.lastResult!=='pass')) return false;
 if(supported(id)) return true;
 // An old assisted pass is useful progress, but not evidence of independent retrieval.
 return (code.attempts||[]).some(a=>a.id===id&&a.passed&&a.cold&&a.at>= (p.lastAt||0)) || ((p.coldDays||[]).length>0&&p.lastResult==='pass'&&(code.attempts||[]).filter(a=>a.id===id).length===0);
}
function codeStep(e,code,review=false,now=Date.now()){
 const p=code.exercises?.[e.id]||{}, s=p.session;
 const guided=supported(e.id);
 const supportPass=p.passed&&p.lastResult==='pass'&&!demonstrated(code,e.id);
 const newDay=s&&day(s.started)!==day(now);
 const pristine=!p.viewedAt&&!p.files&&!p.attempts&&!s;
 const mode=guided?'practice':e.stage==='Mock'&&pristine?'mock':supportPass||review||pristine?'cold':s?.mode||'cold';
 const action=(supportPass||review||newDay)&&(!s?.cold||newDay||p.lastAt>=s.started)?'fresh':'resume';
 const failed=p.lastResult&&p.lastResult!=='pass';
 return {type:'code',id:e.id,title:e.title,mode,action,review,
 reason:guided?'Use the example to build one small working behavior.':review?'A short recall check is due. Rebuild this from the scaffold before moving on.':supportPass?'It works with support. Now rebuild from a fresh scaffold without hints.':failed?'Stay with this step. Repair the first failing behavior; support is available.':mode==='mock'?'Apply what you know to an unfamiliar task. The timer starts when you continue.':'Build this independently. Ask for a hint whenever you need one; we’ll check recall afterward.'};
}
export function nextStep(exercises,code={},sessions=[],path={},now=Date.now()){
 const codeById=new Map(exercises.map(e=>[e.id,e]));
 const sessionById=new Map(sessions.map(s=>[s.id,s]));
 const reviews=path.reviews||[];
 const steps=route.filter(id=>id.startsWith('@')?sessionById.has(id.slice(1)):codeById.has(id));
 // Spaced retrieval is inserted into the same queue; never make a separate review list.
 const frontier=steps.findIndex(id=>!id.startsWith('@')&&!demonstrated(code,id));
 const due=steps.filter((id,i)=>frontier<0||i<=frontier).filter(id=>!id.startsWith('@')&&!supported(id)).map(id=>codeById.get(id)).filter(e=>{
  const p=code.exercises?.[e.id];return p?.passed&&p.due<=day(now)&&day(p.lastAt||0)!==day(now);
 }).sort((a,b)=>(code.exercises[a.id].lastAt||0)-(code.exercises[b.id].lastAt||0));
 if(due.length)return codeStep(due[0],code,true,now);
 for(const id of steps){
  if(!id.startsWith('@')){
   if(!demonstrated(code,id))return codeStep(codeById.get(id),code,false,now);
  }else{
   const s=sessionById.get(id.slice(1));
   // Prerequisites are enforceable even if session order is edited later.
   const missing=s.prerequisites.find(p=>codeById.has(p)&&!(p==='syntax-guided'&&demonstrated(code,'tiny-filter-guided')&&demonstrated(code,'tiny-count-guided'))&&!demonstrated(code,p));
   if(missing)return codeStep(codeById.get(missing),code,false,now);
   const latest=reviews.filter(r=>r.id===s.id&&r.at<=now).sort((a,b)=>b.at-a.at)[0];
   const passed=latest&&reviewPass(latest,s);
   const final=s.id==='full-loop';
   if(!passed || (final&&!assessedSessions({...path,reviews},[s],true,now).length))return {type:'session',id:s.id,title:s.title,reason:latest&&!passed?'Repair the weakest part with a new rehearsal, one prompt at a time.':final?'Bring the pieces together with a peer. Their feedback is required for this final rehearsal.':'Now explain the work. We’ll show one prompt at a time; practice feedback is self-rated until a peer reviews it.',review:false};
  }
 }
 return {type:'done',title:'Your next step is real feedback.',reason:'You completed this practice sequence. Keep returning for recall checks and use a peer to assess your explanations and new tasks.'};
}
