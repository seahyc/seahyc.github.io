import {createCodeEditor} from '../editor.bundle.mjs?v=recall-2026-09-06-1';
import {scoreScreen,STRONG} from './score.mjs?v=screen-1';
import {phaseStatus,readiness,nextStep,unseen,dayOf} from './plan.mjs?v=screen-1';
import {KEY,loadState,report} from './report.mjs?v=screen-1';

const $=id=>document.getElementById(id);
let exercises=[],state=loadState(),attempt=null,exercise=null,file='instructions.md',worker=null,busy=false,tick=null,awayFrom=null;
const notice=text=>{$('notice').textContent=text;};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{notice('Progress could not be saved: browser storage is full or unavailable. Keep this tab open.');}}
const byId=id=>exercises.find(e=>e.id===id);
const editable=name=>name===exercise.entry||name===exercise.candidate||name==='DESIGN.md'||(name.startsWith('src/')&&name.endsWith('.py'));

// ---------------------------------------------------------------- markdown (headings, lists, code, inline code, bold)
function markdown(source){
 const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const inline=s=>esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
 return source.split(/```[^\n]*\n/).map((part,i)=>{
  if(i%2)return `<pre><code>${esc(part.replace(/```\s*$/,''))}</code></pre>`;
  return part.split(/\n\s*\n/).map(block=>{
   const raw=block.trim();if(!raw)return '';
   const h=raw.match(/^(#{1,3}) (.*)$/);if(h&&!raw.includes('\n'))return `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;
   const lines=raw.split('\n');
   if(lines.every(l=>/^\s*[-*] |^\s{2,}\S/.test(l))){const items=[];for(const l of lines){if(/^\s*[-*] /.test(l))items.push(l.replace(/^\s*[-*] /,''));else items[items.length-1]+=' '+l.trim();}return '<ul>'+items.map(t=>`<li>${inline(t)}</li>`).join('')+'</ul>';}
   return `<p>${inline(raw.replace(/\n/g,' '))}</p>`;
  }).join('');
 }).join('');
}

// ---------------------------------------------------------------- dashboard
function render(){
 $('dashboard').hidden=false;$('workspace').hidden=true;$('result').hidden=true;
 $('target-date').value=state.targetDate||'';
 const step=nextStep(exercises,state);
 const kinds={screen:'Next screen',resume:'In progress',postmortem:'Postmortem due',ready:'Ready',retake:'Practice',rebuild:'Coached rebuild'};
 $('next-kind').textContent=kinds[step.type]||'Next';
 const e=step.exerciseId&&byId(step.exerciseId);
 $('next-title').textContent=step.type==='ready'?'Book the real screen':e?`${e.title} · ${e.minutes} min`:'Nothing scheduled';
 $('next-reason').textContent=step.reason+(e&&step.type==='screen'?` ${e.summary}`:'');
 $('next-rest').hidden=!step.rest;$('next-rest').textContent=step.rest||'';
 $('next').hidden=!e;
 $('next').textContent={resume:'Resume',postmortem:'Write postmortem',retake:'Retake (practice)',rebuild:'Start rebuild (practice)'}[step.type]||'Start timer';
 $('next').onclick=()=>step.type==='postmortem'?showResult(state.attempts.find(a=>a.id===step.attemptId)):step.type==='resume'?open(state.attempts.find(a=>!a.submittedAt)):start(step.exerciseId);
 const ch=step.challenge;
 $('challenge').hidden=$('challenge-reason').hidden=!ch;
 if(ch){$('challenge').textContent=`Skip ahead: ${byId(ch.exerciseId).title}`;$('challenge-reason').textContent=ch.reason;$('challenge').onclick=()=>start(ch.exerciseId);}
 $('phases').replaceChildren(...phaseStatus(exercises,state).map(p=>{
  const li=document.createElement('li');li.className=p.proven?'met':'';
  li.innerHTML=`<strong></strong> <span class="small"></span><p class="small"></p>`;
  li.querySelector('strong').textContent=`${p.proven?'✓':'○'} ${p.title}`;
  li.querySelector('span').textContent=p.subsumed?'proven by a later phase':p.proven?'proven':p.how;
  li.querySelector('p').textContent=p.goal;return li;}));
 const ready=readiness(exercises,state);
 $('gates').replaceChildren(...ready.gates.map(g=>{const li=document.createElement('li');li.className=g.met?'met':'';li.textContent=`${g.met?'✓':'○'} ${g.title}: ${g.detail}`;return li;}));
 const firsts=new Set(unseen(state).map(a=>a.id));
 $('history').replaceChildren(...state.attempts.filter(a=>a.submittedAt).slice().reverse().map(a=>{
  const tr=document.createElement('tr'),ex=byId(a.exerciseId);
  for(const text of [dayOf(a.submittedAt),ex?.title||a.exerciseId,`${a.score.total}${a.score.capped?' (capped)':''}`,a.score.parts.execution.firstGreenMin==null?'none':`${a.score.parts.execution.firstGreenMin} min`,firsts.has(a.id)?'yes':'retake']){const td=document.createElement('td');td.textContent=text;tr.append(td);}
  tr.onclick=()=>showResult(a);return tr;}));
 const tried=new Set(state.attempts.map(a=>a.exerciseId));
 $('catalog').replaceChildren(...exercises.map(e=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=`${e.title} · ${e.phase} · ${e.minutes} min${tried.has(e.id)?' · seen':''}`;b.onclick=()=>{if(tried.has(e.id)&&!confirm('You have seen this exercise. A retake is practice and will not count as evidence. Start anyway?'))return;start(e.id);};li.append(b);return li;}));
}

$('target-date').onchange=()=>{state.targetDate=$('target-date').value;persist();};
$('copy-report').onclick=async()=>{const r=await report();await navigator.clipboard.writeText(JSON.stringify(r,null,1));$('copy-status').textContent=' Copied.';};

// ---------------------------------------------------------------- workspace
function start(id){
 if(state.attempts.some(a=>!a.submittedAt)){notice('Finish or submit the screen in progress first.');return;}
 const e=byId(id);
 const a={id:`${id}-${Date.now()}`,exerciseId:id,startedAt:Date.now(),deadline:Date.now()+e.minutes*60000,files:{...e.files},events:{runs:[],pastes:[],awayMs:0}};
 state.attempts.push(a);persist();open(a);
}

const codeEditor=createCodeEditor({parent:$('code-editor'),onChange:value=>{if(attempt&&editable(file)){attempt.files[file]=value;persist();}},
 onPaste:event=>{if(!attempt)return;const chars=(event.clipboardData?.getData('text')||'').length;attempt.events.pastes.push({at:Date.now(),chars});persist();if(chars>80)notice('Large paste recorded. The real screen records pastes in playback.');},
 onRun:()=>run()});

function open(a){
 attempt=a;exercise=byId(a.exerciseId);file='instructions.md';
 $('dashboard').hidden=true;$('result').hidden=true;$('workspace').hidden=false;
 $('ws-title').textContent=exercise.title;$('output').textContent='Run tests to see results. Grading uses a separate, larger hidden suite.';
 renderFiles();show('instructions.md');
 clearInterval(tick);tick=setInterval(clock,1000);clock();
}

function renderFiles(){
 const names=['instructions.md',...Object.keys(attempt.files).sort((a,b)=>a.split('/').length-b.split('/').length||a.localeCompare(b))];
 $('files').replaceChildren(...names.map(name=>{const li=document.createElement('li'),b=document.createElement('button');b.textContent=name;b.setAttribute('aria-current',String(name===file));if(name!=='instructions.md'&&!editable(name))b.title='Read-only';b.onclick=()=>show(name);li.append(b);return li;}));
}

function show(name){
 file=name;renderFiles();
 const doc=name==='instructions.md';
 $('instructions').hidden=!doc;$('code-editor').hidden=doc;
 if(doc){$('instructions').innerHTML=markdown(exercise.instructions);return;}
 codeEditor.setValue(attempt.files[name]);codeEditor.setReadOnly(!editable(name));codeEditor.focus();
}

function clock(){
 if(!attempt)return;
 const left=attempt.deadline-Date.now();
 const m=Math.max(0,Math.floor(left/60000)),s=Math.max(0,Math.floor(left/1000)%60);
 $('clock').textContent=`${m}:${String(s).padStart(2,'0')} left`;
 $('clock').classList.toggle('late',left<10*60000);
 if(left<=0&&!busy){notice('Time is up. Submitting what you have, as the real screen does.');submit();}
}

// Time away from the tab is recorded, as CoderPad playback does.
document.addEventListener('visibilitychange',()=>{
 if(!attempt||attempt.submittedAt)return;
 if(document.hidden)awayFrom=Date.now();
 else if(awayFrom){attempt.events.awayMs+=Date.now()-awayFrom;awayFrom=null;persist();}
});

function grader(){worker ||= new Worker(new URL('./grader.mjs?v=screen-1',import.meta.url),{type:'module'});return worker;}
function grade(mode,validators){
 return new Promise((resolve,reject)=>{
  const w=grader();
  w.onmessage=({data})=>{if(data.type==='progress')$('ws-status').textContent=data.message;else if(data.type==='ready')$('ws-status').textContent=mode==='submit'?'Grading…':'Running…';else if(data.type==='result')resolve(data.report);else if(data.type==='error')reject(Error(data.message));};
  w.onerror=e=>reject(Error(e.message||'Python runtime failed to start'));
  w.postMessage({mode,files:attempt.files,entry:exercise.entry,visible:exercise.visible,candidate:exercise.candidate,validators});
 });
}

function formatCases(label,cases){
 if(!cases.length)return `${label}: no tests collected\n`;
 const bad=cases.filter(c=>c.status!=='pass');
 return `${label}: ${cases.length-bad.length}/${cases.length} passed\n`+cases.map(c=>`  ${c.status==='pass'?'PASS':c.status.toUpperCase()}  ${c.test}`).join('\n')+'\n'+(bad[0]?`\nFirst failure, ${bad[0].test}:\n${bad[0].detail}\n`:'');
}

async function run(){
 if(!attempt||busy)return;
 busy=true;$('run').disabled=true;
 try{
  const r=await grade('run');
  const anyPass=[...r.visible,...r.candidate].some(c=>c.status==='pass');
  attempt.events.runs.push({at:Date.now(),anyPass});persist();
  $('output').textContent=formatCases('tests/'+exercise.visible.split('/').pop(),r.visible)+'\n'+formatCases('tests/test_candidate.py',r.candidate)+(r.output?`\n--- output ---\n${r.output}`:'');
  $('ws-status').textContent=r.static.syntaxError?`Syntax error, ${r.static.syntaxError}`:'';
 }catch(error){$('output').textContent=String(error.message||error);}
 finally{busy=false;$('run').disabled=false;}
}

async function submit(){
 if(!attempt||busy)return;
 if(Date.now()<attempt.deadline&&!confirm('Submit now? Like the real screen, you cannot change the code afterwards.'))return;
 busy=true;$('run').disabled=$('submit').disabled=true;clearInterval(tick);
 const submittedAt=Date.now();
 try{
  const validators=(await (await fetch(new URL('./validators.json?v=screen-1',import.meta.url))).json())[exercise.id];
  const r=await grade('submit',validators.source);
  attempt.submittedAt=submittedAt;
  attempt.grading={validators:r.validators,candidate:r.candidate,mutation:r.mutation,staticChecks:r.static,weights:validators.weights,critical:validators.critical};
  rescore(attempt);persist();worker?.terminate();worker=null;showResult(attempt);
 }catch(error){$('output').textContent=`Grading failed, so nothing was submitted. ${error.message||error}`;tick=setInterval(clock,1000);}
 finally{busy=false;$('run').disabled=$('submit').disabled=false;}
}

function rescore(a){
 const e=byId(a.exerciseId),g=a.grading;
 a.score=scoreScreen({minutes:e.minutes,validators:g.validators,weights:g.weights,critical:g.critical,candidate:g.candidate,mutation:g.mutation,designText:a.files['DESIGN.md']||'',staticChecks:g.staticChecks,events:{...a.events,startedAt:a.startedAt,deadline:a.deadline,submittedAt:a.submittedAt},self:a.self||{}});
}

$('run').onclick=run;$('submit').onclick=submit;

// ---------------------------------------------------------------- result and postmortem
function showResult(a){
 attempt=a;exercise=byId(a.exerciseId);
 $('dashboard').hidden=true;$('workspace').hidden=true;$('result').hidden=false;
 const s=a.score,p=s.parts;
 $('result-title').textContent=`${exercise.title}: ${s.total}/100`;
 $('result-summary').textContent=s.capped?`Capped at 69 because a core-invariant validator failed (${p.correctness.criticalFailed.join(', ')}).`:s.strong?'Strong pass. This counts as evidence if it was your first attempt.':`Below ${STRONG}. Repair the first consequential mistake, then take a sibling exercise.`;
 const rows=[['Correctness (hidden validators)',p.correctness.points,40,`${p.correctness.passed}/${p.correctness.total} validators`],
  ['Edge cases (your tests vs mutants)',p.edges.points,20,`${p.edges.tests} tests; caught ${p.edges.killed}/${p.edges.real} real bugs injected into your code`],
  ['Engineering quality',p.quality.points,15,`${p.quality.auto}/6 automatic, ${p.quality.selfRated}/9 self-rated`],
  ['Design note',p.design.points,15,p.design.thin.length?`thin: ${p.design.thin.join(', ')}`:'all sections substantive'],
  ['Screen execution',p.execution.points,10,`first green ${p.execution.firstGreenMin??'never'} min · ${p.execution.runs} runs · ${p.execution.largePastes} large pastes · ${p.execution.awaySeconds}s away`]];
 $('parts').replaceChildren(...rows.map(([label,got,max,detail])=>{const tr=document.createElement('tr');for(const t of [label,`${got}/${max}`,detail]){const td=document.createElement('td');td.textContent=t;tr.append(td);}return tr;}));
 const findings=[];
 if(p.correctness.failed.length)findings.push(`Hidden validators that failed: ${p.correctness.failed.join(', ')}.`);
 if(p.edges.survivors.length)findings.push(`Bugs your tests missed when injected into your solution: ${p.edges.survivors.slice(0,6).join('; ')}.`);
 if(p.quality.mutableGlobals.length)findings.push(`Module-level mutable state: ${p.quality.mutableGlobals.join(', ')}.`);
 if(!p.quality.customError)findings.push('No specific exception class is raised by your solution.');
 if(!p.design.complexityStated)findings.push('The design note gives no big-O complexity.');
 $('findings').replaceChildren(...findings.map(t=>{const x=document.createElement('p');x.textContent=t;return x;}));
 a.self ||= {};
 $('assisted').checked=!!a.assisted;$('assisted').onchange=()=>{a.assisted=$('assisted').checked;persist();};
 for(const [id,key] of [['self-api','api'],['self-helpers','helpers'],['self-clean','clean']]){$(id).checked=!!a.self[key];$(id).onchange=()=>{a.self[key]=$(id).checked;rescore(a);persist();showResult(a);};}
 a.postmortem ||= {category:'',decision:'',drill:''};
 $('pm-category').value=a.postmortem.category;$('pm-decision').value=a.postmortem.decision;$('pm-drill').value=a.postmortem.drill||'';
 const status=()=>{$('pm-status').textContent=a.postmortem.category&&a.postmortem.decision.trim().length>=40?'Postmortem recorded.':'Required before the next screen: a category and at least 40 characters on the earliest bad decision.';};
 $('pm-category').onchange=()=>{a.postmortem.category=$('pm-category').value;persist();status();};
 $('pm-decision').oninput=()=>{a.postmortem.decision=$('pm-decision').value;persist();status();};
 $('pm-drill').oninput=()=>{a.postmortem.drill=$('pm-drill').value;persist();};
 status();
}
$('back').onclick=()=>{attempt=null;render();};

// ---------------------------------------------------------------- boot
window.cognitionScreenReport=()=>report();
try{
 exercises=(await (await fetch(new URL('./exercises.json?v=screen-1',import.meta.url),{cache:'no-store'})).json()).exercises;
 const open_=state.attempts.find(a=>!a.submittedAt);
 if(open_&&byId(open_.exerciseId))open(open_);else render();
}catch(error){notice(`The exercises could not be loaded: ${error.message}`);}
