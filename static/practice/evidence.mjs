import {demonstrated,supported} from './mastery.mjs?v=recall-2026-09-06-1';
import {recallState} from './recall.mjs?v=recall-2026-09-06-1';

const DAY=86400000;
// Completion is history; recall is dated evidence, never a measurement of inner ability.
export function exerciseEvidence(code,id,now=Date.now()){
 const p=code.exercises?.[id]||{};
 const attempts=(code.attempts||[]).filter(a=>a.id===id&&a.at<=now);
 const completed=!!(p.passed&&(!p.lastAt||p.lastAt<=now))||attempts.some(a=>a.passed);
 const covered=!completed&&demonstrated(code,id);
 const result=(label,detail,retained=false)=>({completed,covered,label,detail,retained});
 if(!completed)return result(covered?'Covered by later work':attempts.length?'In progress':'Not yet practiced',covered?'A later task satisfied this prerequisite; this exercise was not completed directly.':'');
 if(supported(id))return result('Guided practice complete','You made it work with a scaffold. Independent recall is checked in later tasks.');
 const r=recallState(p,now);
 if(r.phase==='relearning'||r.failed||p.lastResult&&p.lastResult!=='pass')return result('Recall needs repair','Your completed work stays checked. Rebuild independently to refresh the evidence.');
 if(r.pending)return result('Recall being scheduled','The checks passed; the next retrieval is being scheduled.');
 const history=r.history.filter(h=>h.at<=now).sort((a,b)=>a.at-b.at);
 const latest=history.at(-1);
 if(!latest)return result('Recall unverified','Completion was saved, but there is not enough dated evidence to assess delayed recall.');
 if(latest.rating!=='good')return result('Working solution','A working solution is a real step. A clean independent recall still needs checking.');
 const reset=Math.max(0,...history.filter(h=>h.rating==='again').map(h=>h.at));
 const delayed=history.filter(h=>{
  if(h.rating!=='good'||h.at<=reset)return false;
  // A different calendar date alone is not spacing (e.g. runs across midnight).
  const previous=Math.max(0,...history.filter(x=>x.at<h.at).map(x=>x.at),...attempts.filter(a=>a.at<h.at).map(a=>a.at));
  return previous>0&&h.at-previous>=DAY;
 });
 if(r.dueAt>0&&r.dueAt<=now)return result('Recall due',delayed.length?'You recalled this after a gap before. Check it again to refresh that evidence.':'You passed independently. Now check what remains after a gap.');
 if(delayed.length)return result('Recalled after a gap',`${delayed.length} independent recall check${delayed.length===1?'':'s'} after at least 24 hours without another recorded attempt. The next review is scheduled.`,true);
 return result('Independent pass','You did it without hints. Delayed recall is still unverified; a same-day rerun adds no retention evidence.');
}
