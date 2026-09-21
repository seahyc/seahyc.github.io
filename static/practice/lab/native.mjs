const ORIGIN='http://127.0.0.1:8765',TOKEN='frontier-runner-token';
const $=id=>document.getElementById(id),terminal=j=>['completed','failed','cancelled','interrupted'].includes(j.status);
export function createNative({onReport,wasImported,isBlocked,onNotice}){
 let token='',connected=false,generation=0,timer,selected='',jobs=[],polling=false,popup,challenge;
 const details=new Map();
 try{token=sessionStorage.getItem(TOKEN)||'';}catch{}
 const status=text=>$('native-status').textContent=text;
 async function api(path,options={}){
  const response=await fetch(ORIGIN+path,{...options,headers:{Authorization:`Bearer ${token}`,...(options.body?{'Content-Type':'application/json'}:{}),...options.headers},signal:AbortSignal.timeout(15000)});
  if(!response.ok){let message=`Runner returned ${response.status}`;try{message=(await response.json()).error||message;}catch{}throw Error(message);}
  return response;
 }
 async function json(path,options){return (await api(path,options)).json();}
 function pause(){generation++;details.clear();connected=false;polling=false;clearTimeout(timer);popup?.close();popup=null;challenge=null;$('native-refresh').disabled=true;status('Disconnected. Jobs already queued keep running on this Mac. Connect to retrieve them.');}
 function renderList(){
  const root=$('native-jobs');root.replaceChildren();
  if(!jobs.length){root.textContent='No Mac jobs yet.';return;}
  for(const job of jobs){const b=document.createElement('button');b.textContent=`${job.assessment} · seed ${job.seed} · ${job.scope} · ${job.status}`;b.setAttribute('aria-current',String(selected===job.id));b.onclick=()=>{selected=job.id;renderList();show(job.id).catch(e=>onNotice(e.message));};root.append(b);}
 }
 async function show(id){
  const epoch=generation,job=await json('/api/jobs/'+encodeURIComponent(id));if(epoch!==generation||selected!==id)return;
  details.set(id,job);
  const group=jobs.filter(j=>j.group_id===job.group_id),measured=group.map(j=>details.get(j.id)?.report).filter(r=>typeof r?.metrics?.heldout_return==='number'&&Number.isFinite(r.metrics.heldout_return)),values=measured.map(r=>r.metrics.heldout_return);
  const expected=Number.isInteger(job.group_size)?job.group_size:group.length,missing=Math.max(0,expected-group.length);
  const passed=group.filter(j=>details.get(j.id)?.report?.status==='passed').length,pending=group.filter(j=>!terminal(j)).length,failed=group.length-passed-pending;
  const mean=values.length?values.reduce((a,b)=>a+b,0)/values.length:0,sd=values.length>1?Math.sqrt(values.reduce((sum,x)=>sum+(x-mean)**2,0)/(values.length-1)):null;
  $('native-group').textContent=`Seed group: ${expected} expected jobs · ${passed} passed · ${failed} failed/interrupted/cancelled · ${pending} pending · ${missing} unavailable in this page. ${!pending&&!missing&&passed===expected?'All jobs passed.':'Group has not passed.'}`+(values.length?`\nHeld-out return: mean ${mean.toFixed(3)} · sample SD ${sd===null?'needs 2 measurements':sd.toFixed(3)} · ${values.length}/${expected} measured reports, including failed reports with this metric.`:'');
  $('native-log').textContent=`${job.assessment} · ${job.status} · ${job.reason||''}\n${job.resumeFrom?'Resumed from '+job.resumeFrom+'\n':''}${job.log||'No output yet.'}${job.report?'\nReport: '+job.report.status+'\n'+JSON.stringify(job.report.metrics,null,2):''}`;
  const actions=$('native-artifacts');actions.replaceChildren();
  const button=(label,fn)=>{const b=document.createElement('button');b.textContent=label;b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){onNotice(e.message);}finally{b.disabled=false;}};actions.append(b);};
  if(!terminal(job))button('Cancel job',async()=>{await json('/api/jobs/'+id+'/cancel',{method:'POST',body:'{}'});if(epoch===generation)await refresh();});
  else{
   if(job.package==='gym'&&job.artifacts?.some(a=>a.name.endsWith('checkpoint.pt')))button('Resume checkpoint',async()=>{if(isBlocked()||!connected||epoch!==generation)throw Error('Reconnect before submitting.');const result=await json('/api/jobs',{method:'POST',body:JSON.stringify({requestId:crypto.randomUUID(),resumeFrom:id})});if(epoch!==generation)return;selected=result.jobs[0]?.id||'';await refresh();});
   for(const a of job.artifacts||[])button(`Download ${a.name} (${a.bytes} bytes)`,async()=>{const response=await api('/api/jobs/'+id+'/artifacts/'+a.name.split('/').map(encodeURIComponent).join('/'));const blob=await response.blob();if(epoch!==generation)return;const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=a.name.split('/').at(-1);link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
  }
 }
 async function refresh(){
  if(!connected||polling||isBlocked())return;const epoch=generation;polling=true;clearTimeout(timer);
  try{
   const result=await json('/api/jobs');if(epoch!==generation)return;jobs=result.jobs;renderList();
   for(const job of [...jobs].reverse()){if(!terminal(job))continue;let detail=details.get(job.id);if(!detail||!terminal(detail)||detail.updated!==job.updated){detail=await json('/api/jobs/'+job.id);if(epoch!==generation)return;details.set(job.id,detail);}if(detail.report&&!wasImported(job.id))onReport(job.id,detail.report);}
   if(!selected&&jobs.length)selected=jobs[0].id;if(selected)await show(selected);if(epoch!==generation)return;
   status(`Connected · CPU only · one worker · ${jobs.filter(j=>!terminal(j)).length} queued/running. Records and artifacts stay on this Mac.`);
  }catch(e){if(epoch===generation)status('Runner unavailable: '+e.message+' Reconnect or use the local mirror.');}
  finally{if(epoch===generation){polling=false;timer=setTimeout(refresh,3000);}}
 }
 async function connect(){
  if(isBlocked())throw Error('Restore a valid workspace first.');const epoch=++generation;clearTimeout(timer);connected=false;polling=false;
  const info=await json('/api/status');if(epoch!==generation)return;connected=true;$('native-refresh').disabled=false;status(`Connected · ${info.runtimes.join(', ')} · CPU only`);await refresh();
 }
 $('native-connect').onclick=()=>{
  if(isBlocked())return;
  if(token){connect().catch(e=>{status(e.message+' Use Pair browser to authorize again.');});return;}
  pair();
 };
 function pair(){if(isBlocked())return;challenge=crypto.randomUUID();popup=window.open(ORIGIN+'/pair?origin='+encodeURIComponent(location.origin)+'&challenge='+challenge,'frontier-pair','width=700,height=550');status(popup?'Confirm Pair browser in the local window.':'Popup blocked. Allow popups and pair again.');}
 $('native-pair').onclick=pair;$('native-disconnect').onclick=pause;$('native-refresh').onclick=()=>refresh();
 window.addEventListener('message',event=>{if(event.origin!==ORIGIN||event.source!==popup||event.data?.type!=='frontier-paired'||event.data.challenge!==challenge||typeof event.data.token!=='string'||event.data.token.length>256)return;token=event.data.token;popup=null;challenge=null;try{sessionStorage.setItem(TOKEN,token);}catch{}connect().catch(e=>status(e.message));});
 async function submit(m,source,seeds,scope){
  if(isBlocked())throw Error('Restore a valid workspace first.');if(!connected){$('native-panel').open=true;throw Error('Connect the Mac runner below before running.');}
  const epoch=generation,result=await json('/api/jobs',{method:'POST',body:JSON.stringify({requestId:crypto.randomUUID(),package:m.runtime.package,assessment:m.runtime.assessment,source,seeds,scope,device:'cpu'})});
  if(epoch!==generation)return;selected=result.jobs[0]?.id||'';$('native-panel').open=true;await refresh();return result;
 }
 status('Mac runner disconnected. Pair once, then connect to retrieve durable jobs.');
 return {submit,pause,connect};
}
