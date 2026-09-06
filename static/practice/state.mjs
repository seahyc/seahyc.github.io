import {recallState,isReviewDue,rateRecall} from './recall.mjs?v=recall-2026-09-06-1';

export const VERSION = 1;
export function day(now = Date.now()) {
  const d = new Date(now);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
export function nextDay(now, days) { const d = new Date(now); d.setDate(d.getDate()+days); return day(d); }
export function freshState() { return {version:VERSION, exercises:{}, attempts:[], motivation:'Build reliable AI tools with my own hands.'}; }
export function progress(state, id) { return state.exercises[id] || {coldDays:[], attempts:0}; }
export function record(state, id, result, now=Date.now()) {
  const p = state.exercises[id] ||= {coldDays:[], attempts:0};
  p.attempts++; p.lastResult = result.passed ? 'pass' : result.kind;
  p.lastAt=now;
  if(result.passed){
    const reviewBeforeEvidence=recallState(p,now);
    p.passed=true;
    p.scaffold=!!result.scaffold;
    if(result.cold && !p.coldDays.includes(day(now))) p.coldDays.push(day(now));
    if(result.scaffold){delete p.review;p.due=undefined;}
    else {
      const review=reviewBeforeEvidence;
      review.pending=true;
      review.assisted=result.requiresRating===true&&(!result.cold||!!p.session?.assisted);
      review.failed=review.failed||(result.sessionId!==undefined&&p.recallFailureSessionId===String(result.sessionId));
      p.review=review;
      if(result.requiresRating===true)p.due=review.dueAt?day(review.dueAt):day(now);
      else rateRecall(state,id,result.cold?'good':'hard',now);
    }
  } else {
    p.due=day(now);
    if(p.review)p.review.pending=false;
    const testFailure=result.kind!=='syntax'&&!result.scaffold;
    if(testFailure){
      const review=recallState(p,now);
      const sessionId=String(result.sessionId||p.session?.started||'legacy');
      if(p.recallFailureSessionId!==sessionId){
        const actualForgetting=review.streak>0||review.history.length>0||!!p.passed;
        if(actualForgetting){review.lapses++;review.streak=0;review.phase='relearning';review.dueAt=now+600000;review.intervalDays=0;p.due=day(review.dueAt);}
        review.failed=true;
        p.recallFailureSessionId=sessionId;
      }
      p.review=review;
    }
  }
  state.attempts.unshift({id,at:now,...result});
  state.attempts=state.attempts.slice(0,300);
  return p;
}
export function recommendation(exercises,state,now=Date.now()) {
  const due=exercises.filter(e=>{const p=progress(state,e.id);return p.review?.dueAt?isReviewDue(p,now):p.due<=day(now);});
  // Do not trap the learner in an immediate failure loop; show due work but retain autonomy.
  return due.sort((a,b)=>(progress(state,a.id).lastAt||0)-(progress(state,b.id).lastAt||0))[0] || exercises.find(e=>!progress(state,e.id).passed) || exercises[0];
}
export function label(p,now=Date.now()) {
  if(p.scaffold&&p.passed&&!p.due) return 'Foundation complete';
  if(p.review?.dueAt?isReviewDue(p,now):p.due<=day(now)) return 'Review due';
  if(p.coldDays?.length>=2) return 'Recalled on 2+ days';
  if(p.coldDays?.length===1) return 'Cold pass · review scheduled';
  if(p.passed) return 'Practice pass · retry cold';
  return p.attempts ? 'In progress' : 'New';
}
export function validateImport(value,exercises, imported=true) {
  if(!value || value.version!==VERSION || !value.exercises || !Array.isArray(value.attempts)) throw Error('Choose a practice backup exported by this page.');
  const clean=freshState();
  clean.motivation=String(value.motivation||clean.motivation).slice(0,240);
  for(const e of exercises){
    const p=value.exercises[e.id]; if(!p) continue;
    if(!Array.isArray(p.coldDays)||p.coldDays.some(d=>!/^\d{4}-\d{2}-\d{2}$/.test(d))) throw Error('Invalid review dates in backup.');
    clean.exercises[e.id]={coldDays:[...new Set(p.coldDays)],attempts:Number(p.attempts)||0,passed:!!p.passed,scaffold:['syntax-guided','syntax-faded','tiny-filter-guided','tiny-count-guided'].includes(e.id),due:p.due,lastAt:Number(p.lastAt)||0,viewedAt:Number(p.viewedAt)||undefined,lastResult:String(p.lastResult||'')};
    if(p.review!==undefined){if(!p.review||typeof p.review!=='object'||(p.review.version!==undefined&&p.review.version!==1))throw Error('Invalid recall history in backup.');clean.exercises[e.id].review=recallState(p);}
    if(p.recallFailureSessionId!==undefined)clean.exercises[e.id].recallFailureSessionId=String(p.recallFailureSessionId).slice(0,200);
    if(p.files){ clean.exercises[e.id].files={}; for(const name of Object.keys(e.files)) if(typeof p.files[name]==='string' && name!=='src/tests.py') clean.exercises[e.id].files[name]=p.files[name].slice(0,200000); }
    if(Array.isArray(p.savedAttempts))clean.exercises[e.id].savedAttempts=p.savedAttempts.slice(0,3).map(a=>({at:Number(a.at)||0,notes:String(a.notes||'').slice(0,20000),files:Object.fromEntries(Object.entries(a.files||{}).filter(([n,v])=>n in e.files&&n!=='src/tests.py'&&typeof v==='string').map(([n,v])=>[n,v.slice(0,200000)]))}));
    if(p.session && typeof p.session==='object') clean.exercises[e.id].session={mode:imported?'practice':(['practice','cold','mock'].includes(p.session.mode)?p.session.mode:'practice'),cold:imported?false:!!p.session.cold,started:Number(p.session.started)||Date.now(),deadline:Number(p.session.deadline)||undefined,remaining:Number(p.session.remaining)||undefined,hint:Math.max(0,Math.min(2,Number(p.session.hint)||0)),assisted:!!p.session.assisted,freshMock:imported?false:!!p.session.freshMock};
    clean.exercises[e.id].notes=String(p.notes||'').slice(0,20000);
  }
  clean.attempts=value.attempts.filter(a=>exercises.some(e=>e.id===a.id)&&Number.isFinite(a.at)).slice(0,300);
  return clean;
}
