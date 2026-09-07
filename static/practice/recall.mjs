const DAY=86400000, TEN_MINUTES=600000;
const RATINGS=new Set(['again','hard','good']);
const ladder=[1,3,7,14,30,60];

function localDay(at){const d=new Date(at);return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function dueTimestamp(value){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(value||''))return 0;
  const [year,month,date]=value.split('-').map(Number);
  const at=new Date(year,month-1,date).getTime();
  return Number.isFinite(at)?at:0;
}
function finite(value,fallback=0){return Number.isFinite(Number(value))?Number(value):fallback;}

export function recallState(p={},now=Date.now()){
  const source=p.review&&typeof p.review==='object'?p.review:{};
  const coldDays=Array.isArray(p.coldDays)?[...new Set(p.coldDays)]:[];
  const legacyDue=dueTimestamp(p.due);
  const inferredInterval=legacyDue&&p.lastAt?Math.max(0,Math.round((legacyDue-finite(p.lastAt))/DAY)):(coldDays.length?ladder[Math.min(coldDays.length-1,ladder.length-1)]:0);
  const history=Array.isArray(source.history)?source.history.slice(-30).filter(x=>x&&RATINGS.has(x.rating)).map(x=>({...x})) : [];
  return {
    version:1,
    phase:['learning','review','relearning'].includes(source.phase)?source.phase:(finite(source.lapses)>0?'relearning':coldDays.length?'review':'learning'),
    dueAt:finite(source.dueAt,legacyDue),
    intervalDays:Math.max(0,finite(source.intervalDays,inferredInterval)),
    streak:Math.max(0,Math.trunc(finite(source.streak,coldDays.length))),
    lapses:Math.max(0,Math.trunc(finite(source.lapses))),
    lastRatedAt:Math.max(0,finite(source.lastRatedAt)),
    lastCreditDay:typeof source.lastCreditDay==='string'?source.lastCreditDay:(coldDays.at(-1)||''),
    pending:!!source.pending,
    assisted:!!source.assisted,
    failed:!!source.failed,
    history
  };
}

export function isReviewDue(p,now=Date.now()){
  const r=recallState(p,now);
  return r.dueAt>0&&r.dueAt<=now;
}

function prospective(p,rating,now){
  if(!RATINGS.has(rating))throw Error('Rating must be again, hard, or good.');
  const r=recallState(p,now);
  if(!r.pending)throw Error('Complete a retrieval before rating it.');
  let effective=rating;
  if(r.assisted||(r.failed&&r.phase==='relearning'))effective='again';
  else if(r.failed&&effective==='good')effective='hard';
  // An extra clean run before the scheduled check is practice, not a longer interval.
  if(effective==='good'&&r.dueAt>now){
    const entry={rating:effective,requestedRating:rating,at:now,dueAt:r.dueAt,intervalDays:r.intervalDays,early:true};
    return {...r,lastRatedAt:now,pending:false,assisted:false,failed:false,history:[...r.history,entry].slice(-30),rating:effective};
  }
  const sameDay=r.lastCreditDay===localDay(now);
  let interval=r.intervalDays, streak=r.streak, lapses=r.lapses, phase='review', dueAt;
  if(effective==='again'){
    interval=0; streak=0; phase='relearning'; dueAt=now+TEN_MINUTES;
    if(!(r.failed&&r.phase==='relearning'))lapses++;
  }else if(effective==='hard'){
    interval=r.intervalDays>1?Math.max(1,Math.min(30,Math.floor(r.intervalDays/2))):1;
    if(!sameDay)streak=Math.max(1,streak);
    dueAt=now+interval*DAY;
  }else{
    if(!sameDay){streak=r.phase==='relearning'?1:streak+1;interval=ladder[Math.min(Math.max(0,streak-1),ladder.length-1)];}
    else interval=Math.max(1,interval);
    dueAt=now+interval*DAY;
  }
  const entry={rating:effective,requestedRating:rating,at:now,dueAt,intervalDays:interval};
  return {...r,phase,dueAt,intervalDays:interval,streak,lapses,lastRatedAt:now,lastCreditDay:sameDay?r.lastCreditDay:localDay(now),pending:false,assisted:false,failed:false,history:[...r.history,entry].slice(-30),rating:effective};
}

export function previewRecall(p,rating,now=Date.now()){
  return prospective(p,rating,now);
}

export function rateRecall(state,id,rating,now=Date.now()){
  const p=state?.exercises?.[id];
  if(!p)throw Error('Complete a retrieval before rating it.');
  const next=prospective(p,rating,now);
  const {rating:effective,...stored}=next;
  p.review=stored;
  p.due=localDay(next.dueAt);
  return p.review;
}
