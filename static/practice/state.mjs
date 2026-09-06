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
    p.passed=true;
    if(result.cold && !p.coldDays.includes(day(now))) p.coldDays.push(day(now));
    p.due=nextDay(now,result.cold ? [1,3,7,14][Math.min(p.coldDays.length-1,3)] : 1);
  } else p.due=day(now);
  state.attempts.unshift({id,at:now,...result});
  state.attempts=state.attempts.slice(0,300);
  return p;
}
export function recommendation(exercises,state,now=Date.now()) {
  const due=exercises.filter(e=>progress(state,e.id).due<=day(now));
  // Do not trap the learner in an immediate failure loop; show due work but retain autonomy.
  return due.sort((a,b)=>(progress(state,a.id).lastAt||0)-(progress(state,b.id).lastAt||0))[0] || exercises.find(e=>!progress(state,e.id).passed) || exercises[0];
}
export function label(p,now=Date.now()) {
  if(p.due<=day(now)) return 'Review due';
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
    clean.exercises[e.id]={coldDays:[...new Set(p.coldDays)],attempts:Number(p.attempts)||0,passed:!!p.passed,due:p.due,lastAt:Number(p.lastAt)||0,lastResult:String(p.lastResult||'')};
    if(p.files){ clean.exercises[e.id].files={}; for(const name of Object.keys(e.files)) if(typeof p.files[name]==='string' && name!=='src/tests.py') clean.exercises[e.id].files[name]=p.files[name].slice(0,200000); }
    if(p.session && typeof p.session==='object') clean.exercises[e.id].session={mode:imported?'practice':(['practice','cold','mock'].includes(p.session.mode)?p.session.mode:'practice'),cold:imported?false:!!p.session.cold,started:Number(p.session.started)||Date.now(),deadline:Number(p.session.deadline)||undefined,remaining:Number(p.session.remaining)||undefined,hint:Math.max(0,Math.min(2,Number(p.session.hint)||0)),assisted:!!p.session.assisted};
    clean.exercises[e.id].notes=String(p.notes||'').slice(0,20000);
  }
  clean.attempts=value.attempts.filter(a=>exercises.some(e=>e.id===a.id)&&Number.isFinite(a.at)).slice(0,300);
  return clean;
}
