import {freshState,progress,record,recommendation,label,day,validateImport} from './state.mjs';
const $=id=>document.getElementById(id), KEY='coding-practice-v1';
let state=freshState(),exercises=[],current,file,worker,runTimeout,runContext,lastInput=Date.now(),escapeTab=false,storageStale=false;
const notice=message=>{$('notice').textContent=message;};
try { const saved=localStorage.getItem(KEY); if(saved) state=JSON.parse(saved); } catch { notice('Your saved progress could not be read. Export anything still available before clearing browser storage.'); }
function persist(){if(storageStale)return;try{localStorage.setItem(KEY,JSON.stringify(state));$('save-status').textContent='Saved here';}catch{$('save-status').textContent='Not saved';notice('Browser storage is unavailable or full. Export your progress to keep this attempt.');}}
function entry(){ return state.exercises[current.id] ||= {coldDays:[],attempts:0}; }
function session(){return entry().session ||= {mode:'practice',cold:false,started:Date.now(),hint:0};}
function editable(name){return name!=='src/tests.py' && !name.endsWith('.jsonl');}
function files(){const e=entry();return {...current.files,...Object.fromEntries(Object.entries(e.files||{}).filter(([n])=>n in current.files&&editable(n)))};}
function saveEditor(){if(current&&file&&editable(file)){entry().files ||= {};entry().files[file]=$('editor').value;persist();}}
function renderMarkdown(source){
  const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const parts=source.split(/```[^\n]*\n/);let html='';
  parts.forEach((part,i)=>{if(i%2){html+='<pre><code>'+escape(part.replace(/```\s*$/,''))+'</code></pre>';return;}
    html+=part.split(/\n\s*\n/).map(block=>{const s=escape(block.trim());if(!s)return '';if(/^#{1,3} /.test(s)){const n=s.match(/^#+/)[0].length;return `<h${n}>${s.replace(/^#+ /,'')}</h${n}>`;}
      return '<p>'+s.replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>')+'</p>';}).join('');});
  return html;
}
function refresh(){
  const rec=recommendation(exercises,state), passed=exercises.filter(e=>progress(state,e.id).passed).length,recalled=exercises.filter(e=>progress(state,e.id).coldDays?.length>=2).length;
  $('next-title').textContent=rec.title;$('next-reason').textContent=progress(state,rec.id).due<=day()?'Due for reconstruction. Start from the scaffold and retrieve it again.':rec.focus;
  $('progress-summary').textContent=`${passed} of ${exercises.length} practiced successfully · ${recalled} recalled on separate days`;
  $('recommended').textContent=passed?'Continue today’s practice':'Start with the guided example';
  $('lessons').replaceChildren();let group='';
  exercises.forEach((e,i)=>{if(e.stage!==group){group=e.stage;const h=document.createElement('div');h.className='group-label';h.textContent=group;$('lessons').append(h);}
    const b=document.createElement('button');b.className='lesson';b.setAttribute('aria-current',String(e.id===current?.id));b.textContent=`${String(i+1).padStart(2,'0')}  ${e.title}`;const small=document.createElement('small');small.textContent=`${e.minutes} min · ${label(progress(state,e.id))}`;b.append(small);b.onclick=()=>select(e);$('lessons').append(b);});
  const mocks=state.attempts.filter(a=>a.passed&&a.mockQualified&&a.freshMock);const distinct=new Set(mocks.map(a=>a.id)).size,days=new Set(mocks.map(a=>day(a.at))).size;
  $('evidence-summary').textContent=`${recalled} exercises recalled on 2+ days. ${distinct} different fresh mocks passed within time without recorded assistance, across ${days} day(s). Still review design, explanation and unfamiliar-task transfer yourself.`;
  $('history').replaceChildren();
  if(!state.attempts.length){const li=document.createElement('li');li.textContent='Your first run starts the evidence. Syntax errors are useful feedback.';$('history').append(li);}
  state.attempts.slice(0,6).forEach(a=>{const li=document.createElement('li');const title=exercises.find(e=>e.id===a.id)?.title||'Exercise';li.textContent=`${new Date(a.at).toLocaleDateString()} — ${title}: ${a.passed?'passed':a.kind}${a.cold?' · cold recall':''}${a.output?' · '+firstError(a.output):''}`;$('history').append(li);});
  if(current){const p=entry(),s=session();$('review-status').textContent=p.due?`Next review: ${p.due}. ${label(p)}`:(p.scaffold?'Foundation complete. Continue to independent retrieval.':'A first pass schedules tomorrow’s review.');$('session-status').textContent=s.cold?'Fresh scaffold; no assistance recorded.':'Practice: support is welcome. Cold recall starts with a fresh attempt.';}
}
function firstError(output){const lines=output.split('\n');return (lines.find(s=>/^(SyntaxError|IndentationError|AssertionError|TypeError|ValueError|NameError|NotImplementedError|FAIL:|ERROR:)/.test(s))||'').slice(0,180);}
function select(e){
  if(worker){notice('Stop the current run before switching exercises.');return;}
  saveEditor();current=e;entry().viewedAt ||= Date.now();history.replaceState(null,'',location.pathname+'#'+e.id);
  $('title').textContent=e.title;$('stage').textContent=`${e.stage} · ${e.minutes}-minute target · ${e.focus}`;$('why').textContent=e.why;
  $('brief').innerHTML=renderMarkdown(e.brief);$('file').replaceChildren();
  Object.keys(e.files).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name+(editable(name)?'':' (read only)');$('file').append(o);});
  file=e.entry;$('file').value=file;$('editor').value=files()[file];$('editor').readOnly=!editable(file);
  const s=session();if(day(s.started)!==day())s.cold=false;
  $('mode').value=s.mode;$('notes').value=entry().notes||'';$('hint-details').open=false;$('hint').textContent='';$('rescue').open=false;
  $('output').textContent='Make it parse. Make one example pass. Then handle edge cases.';
  $('main').disabled=!('src/main.py' in e.files);lastInput=Date.now();refresh();tick();persist();
}
function fresh(mode){
  if(worker)return;
  if(!confirm('Start from the original scaffold? Your current code will be replaced. Export progress first if you want to keep it.')){$('mode').value=session().mode;return;}
  entry().files={};entry().notes='';
  entry().session={mode,cold:mode!=='practice'&&!['syntax-guided','syntax-faded'].includes(current.id),started:Date.now(),hint:0};
  if(mode==='mock')entry().session.deadline=Date.now()+current.minutes*60000;
  // Clear the editor before selection so its old contents cannot be saved over the reset.
  file=null;select(current);notice(mode==='mock'?'Timed mock started. Hints and pauses invalidate mock evidence.':'Fresh scaffold loaded. Reconstruct the behavior one small step at a time.');
}
function assisted(reason){session().cold=false;session().assisted=true;persist();refresh();if(reason)notice(reason);}
function busy(on){['syntax','run','new-attempt','mode','file','timer-button'].forEach(id=>$(id).disabled=on);$('main').disabled=on||!current?.files['src/main.py'];$('stop').disabled=!on;$('editor').readOnly=on||!editable(file);}
function stop(message='Execution stopped. Your code is saved.'){if(worker)worker.terminate();worker=null;clearTimeout(runTimeout);busy(false);$('runtime-state').textContent='Ready for another run';if(message)$('output').textContent=message;}
function run(mode){
  if(worker)return;saveEditor();const s=session();
  runContext={id:current.id,cold:s.cold&&day(s.started)===day(),mode:s.mode,deadline:s.deadline,started:s.started,freshMock:!!s.freshMock};
  busy(true);$('output').textContent='Loading Python. The first download can take a little while…';$('runtime-state').textContent='Loading Python';
  worker=new Worker(new URL('./runner.mjs',import.meta.url),{type:'module'});
  runTimeout=setTimeout(()=>stop('Python could not load within 90 seconds. Check your connection, then try again.'),90000);
  worker.onmessage=({data})=>{
    if(data.type==='ready'){clearTimeout(runTimeout);$('runtime-state').textContent='Running';runTimeout=setTimeout(()=>{const ctx=runContext;stop('Execution exceeded 10 seconds. Check for an infinite loop or unexpectedly large input.');if(mode==='tests'){record(state,ctx.id,{passed:false,kind:'timeout',cold:false});persist();refresh();}},10000);return;}
    if(data.type==='error'){stop('Python could not start: '+data.message+'\nCheck your connection and retry.');return;}
    if(data.type==='result'){
      stop(null);$('output').textContent=data.output||'Execution finished without output.';$('runtime-state').textContent=data.passed?(mode==='syntax'?'Syntax valid':mode==='main'?'Program finished':`${data.count||0} tests · passed`):'Read the first error';
      if(mode==='syntax'&&!data.passed){record(state,current.id,{passed:false,kind:'syntax',cold:false,output:firstError(data.output)});persist();refresh();}
      if(mode==='tests'){
        const ctx=runContext;const cold=ctx.cold&&session().cold&&!session().assisted;const mockQualified=current.stage==='Mock'&&ctx.mode==='mock'&&cold&&ctx.deadline>=Date.now();
        record(state,current.id,{passed:data.passed,kind:data.kind,cold,scaffold:['syntax-guided','syntax-faded'].includes(current.id),mockQualified,freshMock:ctx.freshMock,count:data.count,elapsed:Math.round((Date.now()-ctx.started)/1000),output:firstError(data.output)});
        if(data.passed)notice(['syntax-guided','syntax-faded'].includes(current.id)?'Foundation pass recorded. Continue to the next step and gradually remove the support.':cold?'Cold pass recorded. Return on the scheduled day and start fresh.':'Practice pass recorded. Tomorrow, try a fresh cold recall attempt.');
        else notice('One error at a time. Read the first failure, make one change, and run again.');
        persist();refresh();
      }
    }
  };
  worker.onerror=()=>stop('The Python runtime could not load. Check your connection or content blocker, then retry.');
  worker.postMessage({mode,files:files()});
}
function tick(){if(!current)return;const s=session();if(s.deadline){const seconds=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));$('clock').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;$('timer-button').textContent=s.mode==='mock'?'End timed mock':'Pause timer';if(!seconds){$('clock').textContent='Time is up';$('timer-button').textContent='Reset timer';}}
  else{$('clock').textContent=s.remaining?`${Math.ceil(s.remaining/60000)} min paused`:'Untimed';$('timer-button').textContent=s.remaining?'Resume timer':'Start timer';}
  if(Date.now()-lastInput>=90000&&!s.rescueShown){s.rescueShown=true;$('rescue').open=true;notice('If you’re stuck, write one input and expected output. A tiny executable step is enough.');persist();}}
$('editor').addEventListener('input',()=>{lastInput=Date.now();saveEditor();});
$('editor').addEventListener('paste',()=>assisted('Paste recorded as assisted practice. You can still learn and pass; start fresh for cold recall.'));
$('editor').addEventListener('keydown',e=>{if(e.key==='Escape'){escapeTab=true;return;}if(e.key==='Tab'&&!escapeTab&&!$('editor').readOnly){e.preventDefault();const t=$('editor');t.setRangeText('    ',t.selectionStart,t.selectionEnd,'end');saveEditor();}escapeTab=false;lastInput=Date.now();});
$('file').onchange=()=>{saveEditor();file=$('file').value;$('editor').value=files()[file];$('editor').readOnly=!editable(file);};
$('notes').oninput=()=>{entry().notes=$('notes').value;persist();};
$('motivation').oninput=()=>{state.motivation=$('motivation').value;persist();};
$('mode').onchange=()=>fresh($('mode').value);$('new-attempt').onclick=()=>fresh($('mode').value);
$('syntax').onclick=()=>run('syntax');$('run').onclick=()=>run('tests');$('main').onclick=()=>run('main');$('stop').onclick=()=>stop();
$('timer-button').onclick=()=>{const s=session();if(s.deadline){s.remaining=Math.max(0,s.deadline-Date.now());delete s.deadline;if(s.mode==='mock')assisted('Timed mock ended. Further work is practice.');}else{s.deadline=Date.now()+(s.remaining||current.minutes*60000);delete s.remaining;}persist();tick();};
$('hint-details').ontoggle=()=>{if($('hint-details').open){assisted('Hint opened: this attempt now counts as supported practice.');$('hint').textContent=current.hints[session().hint||0];}};
$('next-hint').onclick=()=>{const s=session();s.hint=Math.min((s.hint||0)+1,current.hints.length-1);$('hint').textContent=current.hints[s.hint];persist();};
$('recommended').onclick=()=>{select(recommendation(exercises,state));document.querySelector('.studio').scrollIntoView({behavior:'instant'});};
$('next-exercise').onclick=()=>{select(recommendation(exercises,state));document.querySelector('.exercise-heading').scrollIntoView({behavior:'instant'});};
$('method-button').onclick=()=>$('method').showModal();$('close-method').onclick=()=>$('method').close();
$('export').onclick=()=>{saveEditor();const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`coding-practice-${day()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onchange=async()=>{const f=$('import').files[0];if(!f)return;try{if(worker)throw Error('Stop the run before importing.');if(f.size>5000000)throw Error('Backup is too large.');const next=validateImport(JSON.parse(await f.text()),exercises);if(!confirm('Replace this browser’s practice progress with the backup?'))return;state=next;file=null;persist();$('motivation').value=state.motivation;select(current);notice('Backup restored. Imported code counts as practice until a fresh attempt.');}catch(e){notice(e.message);}finally{$('import').value='';}};
window.addEventListener('beforeunload',saveEditor);
window.addEventListener('storage',event=>{
 if(event.key!==KEY)return;
 storageStale=true;stop(null);
 for(const id of ['syntax','run','main','new-attempt','mode','file','timer-button','next-hint'])$(id).disabled=true;
 $('editor').readOnly=true;
 notice('Coding progress changed in another tab. Export this tab if you need its unsaved work, then reload before continuing.');
});
try {const response=await fetch('./curriculum.json');if(!response.ok)throw Error('Exercise download failed');const pack=await response.json();exercises=pack.exercises;state=validateImport(state,exercises,false);$('motivation').value=state.motivation;const target=exercises.find(e=>e.id===location.hash.slice(1))||recommendation(exercises,state);
if(new URLSearchParams(location.search).get('assessment')==='1'){
 const previous=state.exercises[target.id];
 if(target.stage==='Mock'&&!previous?.viewedAt&&!previous?.session&&!previous?.files&&!previous?.attempts){
  state.exercises[target.id]={coldDays:[],attempts:0,session:{mode:'mock',cold:true,freshMock:true,started:Date.now(),deadline:Date.now()+target.minutes*60000,hint:0}};
  notice('Fresh mock started. Work independently; the timer is running. Explain your design afterward in the interview room.');
 }else notice('This task has already been opened. Continue as familiar practice, or choose an unviewed mock from the complete path.');
}
select(target);setInterval(tick,1000);}catch(e){notice('Could not load the practice workspace: '+e.message+'. Reload to try again.');}
