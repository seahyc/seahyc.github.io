import {exerciseEvidence} from './evidence.mjs?v=recall-2026-09-06-1';
import {createSyntaxChecker} from './syntax-client.mjs?v=delight-2026-09-06-1';
import {celebrate,clearCelebration} from './celebration.mjs?v=recall-2026-09-06-1';
import {createCodeEditor} from './editor.bundle.mjs?v=recall-2026-09-06-1';
import {feedback} from './feedback.mjs?v=recall-2026-09-06-1';
import './version.mjs?v=recall-2026-09-06-1';
import {rateRecall,recallState} from './recall.mjs?v=recall-2026-09-06-1';
import {nextStep,supported} from './mastery.mjs?v=recall-2026-09-06-1';
import {freshPath,validatePath} from './path/model.mjs?v=recall-2026-09-06-1';
import {freshState,progress,record,recommendation,label,day,validateImport} from './state.mjs?v=recall-2026-09-06-1';
const guidedFlow=new URLSearchParams(location.search).get('library')!=='1';
if(!guidedFlow)document.body.classList.remove('focus');
let interviews=[],pathState=freshPath(),examples={},activeAction;
const $=id=>document.getElementById(id), KEY='coding-practice-v1';
let state=freshState(),exercises=[],current,file,worker,runTimeout,runContext,lastInput=Date.now(),storageStale=false;
const notice=message=>{$('notice').textContent=message;};
try { const saved=localStorage.getItem(KEY); if(saved) state=JSON.parse(saved); } catch { storageStale=true;notice('Your saved progress could not be read. Keep this tab open; your stored data has not been cleared.'); }
function persist(){if(storageStale)return;try{localStorage.setItem(KEY,JSON.stringify(state));$('save-status').textContent='Saved here';}catch{$('save-status').textContent='Not saved';notice('This attempt could not be saved because browser storage is unavailable or full. Keep this tab open until saving works again.');}}
function entry(){ return state.exercises[current.id] ||= {coldDays:[],attempts:0}; }
function session(){return entry().session ||= {mode:'practice',cold:false,started:Date.now(),hint:0};}
function editable(name){return name!=='src/tests.py' && !name.endsWith('.jsonl');}
function files(){const e=entry();return {...current.files,...Object.fromEntries(Object.entries(e.files||{}).filter(([n])=>n in current.files&&editable(n)))};}
function saveEditor(){if(current&&file&&editable(file)){entry().files ||= {};entry().files[file]=$('editor').value;persist();}}
function archiveDraft(p){
 if(!Object.keys(p.files||{}).length&&!p.notes)return;
 p.savedAttempts ||= [];p.savedAttempts.unshift({at:Date.now(),files:{...(p.files||{})},notes:p.notes||''});p.savedAttempts=p.savedAttempts.slice(0,3);
}
function clearRunOutcome(message=''){
 clearCelebration();$('success-moment').hidden=true;
 $('case-feedback').replaceChildren();$('case-feedback').hidden=true;$('first-feedback').hidden=true;$('journey-feedback').hidden=true;$('run').classList.add('primary');
 if(message)$('runtime-state').textContent=message;
}
const codeEditor=createCodeEditor({parent:$('code-editor'),onChange:value=>{
 $('editor').value=value;lastInput=Date.now();
 if(current){
  if(entry().lastResult==='pass')entry().lastResult='pending';
  if(!$('case-feedback').hidden||!$('journey-feedback').hidden){clearRunOutcome('Changes need checking');notice('');}
 }
 saveEditor();queueSyntax();
},onPaste:()=>assisted('Paste recorded as supported practice. We’ll check recall from a fresh scaffold.'),onRun:()=>{if(current&&!storageStale)run('tests');}});
const syntaxChecker=createSyntaxChecker({
 onStatus:status=>{if(storageStale||!current||!editable(file))return;$('syntax-status').dataset.state=status;$('syntax-status').textContent=status==='loading'?'Starting live syntax…':status==='unavailable'?'Live syntax unavailable. You can still run checks.':'Checking syntax…';document.body.classList.toggle('syntax-unavailable',status==='unavailable');},
 onResult:result=>{if(storageStale||!current||!editable(file)||result.status!=='checked')return;codeEditor.setDiagnostics(result.diagnostics);document.body.classList.remove('syntax-unavailable');const first=result.diagnostics[0];$('syntax-status').dataset.state=first?'error':'clear';$('syntax-status').textContent=first?`Line ${first.line}: ${first.message}`:'Syntax clear';}
});
function queueSyntax(){
 codeEditor.setDiagnostics([]);
 if(storageStale||!current||!file||!editable(file)||!file.endsWith('.py')){syntaxChecker.clear();$('syntax-status').textContent='';return;}
 $('syntax-status').dataset.state='checking';$('syntax-status').textContent='Checking syntax…';syntaxChecker.check(codeEditor.getValue(),file);
}
function loadEditor(){clearCelebration();$('success-moment').hidden=true;const value=files()[file];$('editor').value=value;codeEditor.setValue(value);codeEditor.setReadOnly(!editable(file)||storageStale);queueSyntax();}
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
  if(guidedFlow&&current)updateJourney();
  $('history').replaceChildren();
  if(!state.attempts.length){const li=document.createElement('li');li.textContent='Your first run starts the evidence. Syntax errors are useful feedback.';$('history').append(li);}
  state.attempts.slice(0,6).forEach(a=>{const li=document.createElement('li');const title=exercises.find(e=>e.id===a.id)?.title||'Exercise';li.textContent=`${new Date(a.at).toLocaleDateString()} — ${title}: ${a.passed?'passed':a.kind}${a.cold?' · cold recall':''}${a.output?' · '+firstError(a.output):''}`;$('history').append(li);});
  if(current){const p=entry(),s=session();$('review-status').textContent=p.due?`Next review: ${p.due}. ${label(p)}`:(p.scaffold?'Foundation complete. Continue to independent retrieval.':'A first pass schedules tomorrow’s review.');$('session-status').textContent=s.cold?'Fresh scaffold; no assistance recorded.':'Practice: support is welcome. Cold recall starts with a fresh attempt.';}
}
function readPath(){try{const saved=localStorage.getItem('coding-interview-path-v1');pathState=saved?validatePath(JSON.parse(saved),interviews):freshPath();}catch{pathState=freshPath();notice('Interview progress could not be read. Your saved data has been kept; try refreshing this page.');}}
function updateJourney(){
 const p=entry();const passed=p.lastResult==='pass';
 const effort=recallState(p);
 if(passed&&effort.pending&&!storageStale){rateRecall(state,current.id,'good');persist();}
 $('journey-feedback').hidden=!passed;
 $('run').classList.toggle('primary',!passed);$('practice-context').textContent=activeAction?.reinforcement?'Practice · build fluency':activeAction?.review?'Recall · from memory':supported(current.id)?'Learn · with an example':'Build · then check';
 if(passed){
  const step=nextStep(exercises,state,interviews,pathState);
  $('journey-message').textContent=step.reinforcement?'Keep practising this pattern. We’ll bring back recall checks when they’re due.':step.type==='done'?'You’ve completed this sequence. Your next step is a rehearsal with a peer.':step.type==='session'?'Next, explain your reasoning in a short interview rehearsal.':step.review?'A recall check is due. Rebuild the solution from a fresh scaffold.':supported(current.id)&&!supported(step.id)?'Now use this pattern without the worked example.':'Your next task is ready, chosen from your progress.';
  $('next-review-date').textContent=p.review?.dueAt?'Recall checks are scheduled automatically.':'';
  $('journey-next').textContent=step.reinforcement?'Continue practising →':step.type==='done'?'View your progress →':step.type==='session'?`Start rehearsal: ${step.title} →`:step.id===current.id?'Try it from memory →':`Next: ${step.title} →`;
 }
}
function renderExample(){const demo=examples[current.id];$('example-lab').hidden=!demo;if(!demo)return;$('example-caption').textContent=demo.caption;$('example-input').value=JSON.stringify(demo.args[0]);$('example-expected').textContent=JSON.stringify(demo.expected);}
function renderCases(cases){
 const target=$('case-feedback');target.replaceChildren();target.hidden=!cases?.length;if(!cases?.length)return;
 const summary=document.createElement('p');summary.className=cases.every(c=>c.status==='pass')?'checks-pass':'checks-fail';summary.textContent=`${cases.filter(c=>c.status==='pass').length} of ${cases.length} checks passed`;target.append(summary);
 for(const c of [...cases.filter(c=>c.status!=='pass'),...cases.filter(c=>c.status==='pass')].slice(0,8)){
  const item=document.createElement(c.detail?'details':'div'),label=document.createElement(c.detail?'summary':'p');label.textContent=`${c.status==='pass'?'✓':'○'} ${c.name.replace(/^.*\.test_/,'').replace(/^test_/,'').replaceAll('_',' ')}`;item.append(label);
  if(c.detail){const detail=document.createElement('pre');detail.textContent=c.detail;item.append(detail);}target.append(item);
 }
}
$('example-input').oninput=()=>{$('example-expected').textContent=$('example-input').value===JSON.stringify(examples[current.id]?.args[0])?JSON.stringify(examples[current.id].expected):'Custom input — predict the result';};
$('example-run').onclick=()=>{try{const arg=JSON.parse($('example-input').value);if(!Array.isArray(arg))throw Error('Use a JSON list, for example ["", "agent"].');run('probe',{...examples[current.id],args:[arg]});}catch(e){$('example-actual').textContent=e.message;}};


function launchStep(){
 if(worker||storageStale)return;
 readPath();const step=nextStep(exercises,state,interviews,pathState);
 if(step.type!=='code'){location.assign('./path/');return;}activeAction=step;
 const e=exercises.find(e=>e.id===step.id),p=state.exercises[e.id] ||= {coldDays:[],attempts:0};
 const pristine=!p.viewedAt&&!p.files&&!p.attempts&&!p.session;
 if(step.action==='fresh'){
  if(current)saveEditor();
  archiveDraft(p);
  p.files={};p.session=null;p.lastResult='pending';file=null;
 }
 if(!p.session){p.session={mode:step.mode,cold:step.mode!=='practice',started:Date.now(),hint:0,assisted:false,freshMock:step.mode==='mock'&&pristine};if(step.mode==='mock')p.session.deadline=Date.now()+e.minutes*60000;}
 select(e);
 if(step.reinforcement)notice('Fresh practice, ready. We’ll handle the recall timing.');
 else if(step.review)notice('Recall is due. Rebuild this from the scaffold.');
 else if(p.lastResult&&p.lastResult!=='pass'&&p.lastResult!=='pending')notice('Repair the first failing behavior, then check again.');
 else notice('');
 scrollTo({top:0,behavior:'instant'});
}
function showResult(data,mode){
 if(!guidedFlow)return;
 const message=data.passed?(mode==='syntax'?'Python can read this. Check your code next.':mode==='tests'||mode==='probe'?'':'Program finished.'):feedbackMessage(data.output||'');
 $('first-feedback').hidden=!message;$('first-feedback').textContent=message;
 $('full-output').open=false;
}
$('journey-next').onclick=launchStep;
function feedbackMessage(output){if(output.includes('NotImplementedError'))return 'The function still has a placeholder. Replace raise NotImplementedError with your implementation.';if(/SyntaxError|IndentationError/.test(output))return 'Python cannot read this yet. Check the construct named in the full output, especially colons and indentation.';if(output.includes('NameError'))return 'A name is not defined. Check the variable spelling and where it is created.';return firstError(output)||'One case still needs work. Open its result below to compare the behavior.';}
function firstError(output){const lines=output.split('\n');return (lines.find(s=>/^(SyntaxError|IndentationError|AssertionError|TypeError|ValueError|NameError|NotImplementedError|FAIL:|ERROR:)/.test(s))||'').slice(0,180);}
function select(e){
  if(worker){notice('Stop the current run before switching exercises.');return;}
  saveEditor();current=e;entry().viewedAt ||= Date.now();history.replaceState(null,'',location.pathname+(guidedFlow?'?learn=1':'?library=1')+'#'+e.id);
  $('title').textContent=e.title;$('stage').textContent=`${e.stage} · ${e.minutes}-minute target · ${e.focus}`;$('why').textContent=e.why;
  $('brief').innerHTML=renderMarkdown(e.brief);$('file').replaceChildren();
  Object.keys(e.files).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name+(editable(name)?'':' (read only)');$('file').append(o);});
  file=e.entry;$('file').value=file;loadEditor();
  const s=session();if(day(s.started)!==day())s.cold=false;
  document.body.classList.toggle('mock-active',s.mode==='mock');
  $('mode').value=s.mode;$('notes').value=entry().notes||'';$('hint-details').open=false;$('hint').textContent='';$('rescue').open=false;
  $('output').textContent='Make it parse. Make one example pass. Then handle edge cases.';
  $('main').disabled=!('src/main.py' in e.files);renderExample();$('case-feedback').hidden=true;$('example-actual').textContent='Run your code to see';lastInput=Date.now();$('journey-feedback').hidden=true;$('first-feedback').hidden=true;$('full-output').open=!guidedFlow;refresh();tick();persist();
}
function fresh(mode){
  if(worker)return;
  if(!confirm('Start from the original scaffold? Your current code will be replaced. Your current draft will be saved in your practice history.')){$('mode').value=session().mode;return;}
  saveEditor();const p=entry();archiveDraft(p);p.files={};p.notes='';p.lastResult='pending';
  p.session={mode,cold:mode!=='practice'&&!supported(current.id),started:Date.now(),hint:0,assisted:false};
  if(mode==='mock')p.session.deadline=Date.now()+current.minutes*60000;
  // Clear the editor before selection so its old contents cannot be saved over the reset.
  file=null;select(current);notice(mode==='mock'?'Timed mock started. Hints and pauses invalidate mock evidence.':'Fresh scaffold loaded. Reconstruct the behavior one small step at a time.');
}
function assisted(reason){session().cold=false;session().assisted=true;persist();refresh();if(reason)notice(reason);}
function busy(on){['syntax','run','new-attempt','mode','file','timer-button','example-run'].forEach(id=>$(id).disabled=on);$('main').disabled=on||!current?.files['src/main.py'];$('stop').disabled=!on;codeEditor.setReadOnly(on||!editable(file)||storageStale);}
function stop(message='Execution stopped. Your code is saved.'){if(worker)worker.terminate();worker=null;clearTimeout(runTimeout);busy(false);$('runtime-state').textContent='Ready for another run';if(message){$('output').textContent=message;$('first-feedback').hidden=false;$('first-feedback').textContent=message;}}
function run(mode,probe){
  if(worker||storageStale)return;feedback('run');saveEditor();const s=session();
  runContext={previouslyPassed:entry().lastResult==='pass',id:current.id,cold:s.cold&&day(s.started)===day(),sessionId:s.started,mode:s.mode,deadline:s.deadline,started:s.started,freshMock:!!s.freshMock};
  if(mode==='tests'){clearRunOutcome();notice('');}else $('first-feedback').hidden=true;
  busy(true);$('first-feedback').hidden=false;$('first-feedback').textContent=mode==='tests'?'Loading checks…':'Preparing Python…';if(mode==='probe')$('example-actual').textContent='Running…';$('output').textContent='Loading Python. The first download can take a little while…';$('runtime-state').textContent=mode==='tests'?'Loading checks':'Loading Python';
  worker=new Worker(new URL('./runner.mjs?v=recall-2026-09-06-1',import.meta.url),{type:'module'});
  runTimeout=setTimeout(()=>stop('Python could not load within 90 seconds. Check your connection, then try again.'),90000);
  worker.onmessage=({data})=>{
    if(data.type==='ready'){clearTimeout(runTimeout);$('runtime-state').textContent=mode==='tests'?'Running checks':'Running';$('first-feedback').textContent=mode==='probe'?'Trying your input…':mode==='tests'?'Running checks…':'Checking your code…';runTimeout=setTimeout(()=>{const ctx=runContext;stop('Execution exceeded 10 seconds. Check for an infinite loop or unexpectedly large input.');if(mode==='tests'){const cold=ctx.cold&&session().cold&&!session().assisted;record(state,ctx.id,{passed:false,kind:'timeout',cold,sessionId:ctx.sessionId,requiresRating:guidedFlow&&!supported(ctx.id),scaffold:supported(ctx.id)});feedback('fail');persist();refresh();}},10000);return;}
    if(data.type==='error'){stop('Python could not start: '+data.message+'\nCheck your connection and retry.');return;}
    if(data.type==='result'){
      stop(null);if(mode==='tests'){renderCases(data.cases);if(data.passed){$('success-moment').hidden=false;$('success-title').textContent=`${data.count} of ${data.count} checks passed`;$('success-caption').textContent='You made it work.';if(!runContext.previouslyPassed){feedback('pass');celebrate($('success-moment'));}}else feedback('fail');}if(mode==='probe')$('example-actual').textContent=data.passed?JSON.stringify(data.value):feedbackMessage(data.output||'');showResult(data,mode);$('output').textContent=data.output||'Execution finished without output.';const count=Number.isFinite(data.count)?data.count:null;$('runtime-state').textContent=data.passed?(mode==='syntax'?'Syntax valid':mode==='main'?'Program finished':mode==='probe'?'Input finished':count===null?'Checks passed':`${count} check${count===1?'':'s'} passed`):mode==='tests'&&count!==null?`${count} check${count===1?'':'s'} ran · repair needed`:'Read the first error';
      if(mode==='syntax'&&!data.passed){record(state,current.id,{passed:false,kind:'syntax',cold:false,output:firstError(data.output)});persist();refresh();}
      if(mode==='tests'){
        const ctx=runContext;const cold=ctx.cold&&session().cold&&!session().assisted;const mockQualified=current.stage==='Mock'&&ctx.mode==='mock'&&cold&&ctx.deadline>=Date.now();
        record(state,current.id,{passed:data.passed,kind:data.kind,cold,sessionId:ctx.sessionId,requiresRating:guidedFlow&&!supported(current.id),scaffold:supported(current.id),mockQualified,freshMock:ctx.freshMock,count:data.count,elapsed:Math.round((Date.now()-ctx.started)/1000),output:firstError(data.output)});
        if(data.passed&&!supported(current.id)&&entry().review?.pending)rateRecall(state,current.id,'good');
        if(data.passed){notice('');const evidence=exerciseEvidence(state,current.id);$('success-caption').textContent=evidence.label==='Recalled after a gap'?'You brought it back after a gap. That is new recall evidence.':evidence.label==='Independent pass'?'You built it independently. We’ll check it again after a gap.':evidence.label==='Guided practice complete'?'First working pattern, checked off. Next, use it with less support.':'Working solution, checked off. We’ll return to check independent recall.';}
        else {
         notice('One error at a time. Repair the first failing behavior, then check again.');
         const recent=state.attempts.filter(a=>a.id===current.id).slice(0,2);
         if(guidedFlow&&s.mode!=='mock'&&recent.length===2&&recent.every(a=>!a.passed)){
          $('hint-details').open=true;assisted('Let’s make this smaller. Use the hint for this repair; we’ll check independence afterward.');$('hint').textContent=current.hints[session().hint||0];
         }
        }
        persist();refresh();
        if(data.passed&&guidedFlow&&!document.hidden){$('journey-next').focus({preventScroll:true});$('journey-feedback').scrollIntoView({block:'nearest',behavior:'instant'});}
      }
    }
  };
  worker.onerror=()=>stop('The Python runtime could not load. Check your connection or content blocker, then retry.');
  worker.postMessage({mode,files:files(),probe});
}
function tick(){if(!current)return;const s=session();document.body.classList.toggle('mock-active',s.mode==='mock');if(s.deadline){const seconds=Math.max(0,Math.ceil((s.deadline-Date.now())/1000));$('clock').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;$('timer-button').textContent=s.mode==='mock'?'End timed mock':'Pause timer';if(!seconds){$('clock').textContent='Time is up';$('timer-button').textContent='Reset timer';}}
  else{$('clock').textContent=s.remaining?`${Math.ceil(s.remaining/60000)} min paused`:'Untimed';$('timer-button').textContent=s.remaining?'Resume timer':'Start timer';}
  if(!guidedFlow&&s.mode!=='mock'&&Date.now()-lastInput>=90000&&!s.rescueShown){s.rescueShown=true;$('rescue').open=true;notice('If you’re stuck, write one input and expected output. A tiny executable step is enough.');persist();}}
$('file').onchange=()=>{saveEditor();file=$('file').value;loadEditor();};
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
$('export').onclick=()=>{saveEditor();const payload=storageStale?{kind:'coding-recovery',raw:localStorage.getItem(KEY),inMemory:state}:state;const url=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`coding-practice-${day()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import-button').onclick=()=>$('import').click();
$('import').onchange=async()=>{const f=$('import').files[0];if(!f)return;try{if(worker)throw Error('Stop the run before importing.');if(f.size>5000000)throw Error('Backup is too large.');const next=validateImport(JSON.parse(await f.text()),exercises);if(!confirm('Replace this browser’s practice progress with the backup?'))return;state=next;file=null;persist();$('motivation').value=state.motivation;select(current);notice('Backup restored. Imported code counts as practice until a fresh attempt.');}catch(e){notice(e.message);}finally{$('import').value='';}};
window.addEventListener('beforeunload',saveEditor);
window.addEventListener('pagehide',()=>{syntaxChecker.clear();clearCelebration();});
window.addEventListener('pageshow',event=>{if(event.persisted)queueSyntax();});
window.addEventListener('storage',event=>{
 if(event.key!==KEY)return;
 storageStale=true;syntaxChecker.clear();codeEditor.setDiagnostics([]);stop(null);
 for(const id of ['syntax','run','main','new-attempt','mode','file','timer-button','next-hint','journey-next','example-run','recommended','next-exercise','import'])$(id).disabled=true;
 codeEditor.setReadOnly(true);$('notes').readOnly=true;$('example-input').readOnly=true;
 notice('Progress changed in another tab. Keep any unsaved code here, then reload to use the latest progress.');
});
try {const responses=await Promise.all([fetch('./curriculum.json?v=recall-2026-09-06-1'),fetch('./ramp.json?v=recall-2026-09-06-1'),fetch('./path/sessions.json?v=recall-2026-09-06-1'),fetch('./examples.json?v=recall-2026-09-06-1')]);if(responses.some(r=>!r.ok))throw Error('Exercise download failed');const [pack,ramp,interviewPack,examplePack]=await Promise.all(responses.map(r=>r.json()));exercises=[...ramp.exercises,...pack.exercises];interviews=interviewPack.sessions;examples=examplePack.examples;readPath();state=validateImport(state,exercises,false);$('motivation').value=state.motivation;const target=exercises.find(e=>e.id===location.hash.slice(1))||recommendation(exercises,state);
if(!guidedFlow&&new URLSearchParams(location.search).get('assessment')==='1'){
 const previous=state.exercises[target.id];
 if(target.stage==='Mock'&&!previous?.viewedAt&&!previous?.session&&!previous?.files&&!previous?.attempts){
  state.exercises[target.id]={coldDays:[],attempts:0,session:{mode:'mock',cold:true,freshMock:true,started:Date.now(),deadline:Date.now()+target.minutes*60000,hint:0}};
  notice('Fresh mock started. Work independently; the timer is running. Explain your design afterward in the interview room.');
 }else notice('This task has already been opened. Continue as familiar practice, or choose an unviewed mock from the complete path.');
}
if(guidedFlow)launchStep();else select(target);setInterval(tick,1000);}catch(e){notice('Could not load the practice workspace: '+e.message+'. Reload to try again.');}
