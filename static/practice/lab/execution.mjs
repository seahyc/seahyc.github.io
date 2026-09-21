import {createCodeEditor} from '../editor.bundle.mjs';
const $=id=>document.getElementById(id);
const hash=async text=>[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)))].map(x=>x.toString(16).padStart(2,'0')).join('');

export function createExecution({getEntry,save,onReport,onNotice}){
 let current,files,worker,timer,sequence=0,running=false,finish,cancelled=false,generation=0;
 const editor=createCodeEditor({parent:$('lab-editor'),onChange:source=>{if(!current)return;getEntry(current.id).source=source;save();},onRun:()=>run(false)});
 const stop=()=>{if(running){cancelled=true;finish?.('Execution stopped. No completion credit.');}};
 async function select(m,blocked=false){
  stop();const seq=++sequence;current=m;files=null;
  $('run-scope').hidden=$('scope-label').hidden=m.kind==='kit';
  $('execution').hidden=!m.runtime?.browser&&m.kind!=='kit';
  if($('execution').hidden)return;
  $('execute').disabled=true;$('execute-seeds').disabled=true;
  $('run-status').textContent='Loading workspace…';editor.setReadOnly(true);
  try{
   const base=m.kind==='kit'?'./kit/':`./advanced/${m.runtime.package}/`;
   const names=m.kind==='kit'?['candidate.py','harness.py']:m.runtime.files;
   const results=await Promise.all(names.map(async name=>{const res=await fetch(base+name,{cache:'no-cache'});if(!res.ok)throw Error(`Cannot load ${name}: ${res.status}`);return [name,await res.text()];}));
   if(seq!==sequence)return;
   files=Object.fromEntries(results);editor.setValue(getEntry(m.id).source??files['candidate.py']);editor.setReadOnly(blocked);
   $('execute').disabled=blocked;$('execute-seeds').disabled=blocked;
   $('run-status').textContent='Ready · fresh worker per run · 120 second limit · source saved locally';
  }catch(e){if(seq===sequence)$('run-status').textContent=e.message;}
 }
 async function once(m,seed,source,loaded,scope,token){
  const sourceHash=await hash(source),evaluatorHash=await hash(m.kind==='kit'?loaded['harness.py']:loaded['evaluate.py']+(loaded[['manifest','json'].join('.')]||''));
  return new Promise(resolve=>{
   let settled=false;
   const done=(report,error)=>{
    if(settled)return;settled=true;clearTimeout(timer);worker?.terminate();worker=null;finish=null;
    if(!report){
     const provenance={seed,status:'failed',metrics:{},checks:{},error};
     report=m.kind==='kit'?{schemaVersion:1,track:m.track,candidateSha256:sourceHash,evaluatorSha256:evaluatorHash,runtime:{python:'not completed',platform:'browser worker',machine:'wasm32'},...provenance}:{schemaVersion:2,assessment:m.runtime.assessment,sourceHash,evaluatorHash,runtime:{python:'not completed',platform:'browser worker',device:'wasm32',packages:{}},scope,unsupported:[],...provenance};
    }
    if(token===generation)onReport(m,report);resolve(report);
   };
   finish=error=>done(null,error);
   if(cancelled){done(null,'Execution stopped. No completion credit.');return;}
   try{
    worker=new Worker(new URL('./worker.mjs',import.meta.url),{type:'module'});
    timer=setTimeout(()=>done(null,'Execution exceeded 120 seconds. Reduce work or use the native runner.'),120000);
    worker.onmessage=({data})=>{if(data.type==='phase')$('run-status').textContent=`seed=${seed} · ${data.text}`;if(data.type==='result')done(data.report);if(data.type==='error')done(null,data.error);};
    worker.onerror=e=>{e.preventDefault();done(null,e.message||'Worker failed to load. Check connectivity and retry.');};
    worker.postMessage({files:loaded,source,kit:m.kind==='kit',assessment:m.kind==='kit'?m.track:m.runtime.assessment,seed,scope});
   }catch(e){done(null,e.message);}
  });
 }
 async function run(suite){
  if(running||!files||$('execute').disabled)return;
  const seed=Number($('run-seed').value);
  if(!Number.isSafeInteger(seed)||seed<0||seed>2147483647){onNotice('Seed must be an integer from 0 to 2147483647.');return;}
  const m=current,seq=sequence,source=editor.getValue(),loaded=files,scope=$('run-scope').value,token=generation;
  cancelled=false;running=true;$('execute').disabled=true;$('execute-seeds').disabled=true;$('stop-execution').disabled=false;
  let latest;
  try{
   for(const value of suite?[17,29,43]:[seed]){
    if(sequence!==seq)break;
    latest=await once(m,value,source,loaded,scope,token);
    if(latest.error||sequence!==seq)break;
   }
  }finally{
   running=false;$('stop-execution').disabled=true;
   if(seq===sequence){$('execute').disabled=false;$('execute-seeds').disabled=false;$('run-status').textContent=latest?`${latest.status} · ${latest.error||'Execution evidence saved in the log below.'}`:'Stopped';}
  }
 }
 $('execute').onclick=()=>run(false);$('execute-seeds').onclick=()=>run(true);$('stop-execution').onclick=stop;
 return {select,stop,discard(){generation++;stop();}};
}
