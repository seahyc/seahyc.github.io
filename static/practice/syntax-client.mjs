const DEFAULT_DEBOUNCE_MS=600;
const DEFAULT_TIMEOUT_MS=90000;

export function createSyntaxChecker({onResult=()=>{},onStatus=()=>{},workerFactory,debounceMs=DEFAULT_DEBOUNCE_MS,timeoutMs=DEFAULT_TIMEOUT_MS}={}){
  const makeWorker=workerFactory||(()=>new Worker(new URL('./syntax-worker.mjs?v=delight-2026-09-06-1',import.meta.url),{type:'module'}));
  let worker=null,workerRequestId=0,debounceTimer=null,timeoutTimer=null,revision=0,destroyed=false;

  const clearTimers=()=>{clearTimeout(debounceTimer);clearTimeout(timeoutTimer);debounceTimer=timeoutTimer=null;};
  const discardWorker=candidate=>{if(worker&&(!candidate||candidate===worker)){worker.terminate();worker=null;workerRequestId=0;}};
  const unavailable=id=>{if(destroyed||id!==revision)return;onStatus('unavailable');onResult({id,status:'unavailable',diagnostics:[]});};
  const ensureWorker=id=>{
    if(worker)return worker;
    onStatus('loading');
    let candidate;
    try{candidate=makeWorker();}catch{unavailable(id);return null;}
    worker=candidate;
    candidate.onmessage=({data})=>{
      if(destroyed||candidate!==worker||!data||data.id!==revision)return;
      if(data.type==='status'){
        if(data.status==='loading'||data.status==='checking')onStatus(data.status);
        return;
      }
      clearTimeout(timeoutTimer);timeoutTimer=null;
      if(data.status==='unavailable'){
        onStatus('unavailable');discardWorker(candidate);
      }
      onResult({id:data.id,status:data.status,diagnostics:Array.isArray(data.diagnostics)?data.diagnostics:[]});
    };
    candidate.onerror=()=>{
      if(destroyed||candidate!==worker)return;
      const id=workerRequestId,isCurrent=id===revision;
      clearTimeout(timeoutTimer);timeoutTimer=null;
      discardWorker(candidate);if(isCurrent)unavailable(id);
    };
    return candidate;
  };
  const send=(id,source,filename)=>{
    if(destroyed||id!==revision)return;
    const target=ensureWorker(id);if(!target)return;
    workerRequestId=id;
    try{target.postMessage({id,source,filename});}catch{discardWorker(target);unavailable(id);return;}
    timeoutTimer=setTimeout(()=>{
      if(destroyed||id!==revision)return;
      onStatus('unavailable');discardWorker(target);onResult({id,status:'unavailable',diagnostics:[]});
    },timeoutMs);
  };

  return {
    check(source,filename='lesson.py'){
      if(destroyed)return;
      const id=++revision;clearTimers();
      debounceTimer=setTimeout(()=>send(id,String(source),String(filename||'lesson.py')),debounceMs);
    },
    clear(){if(destroyed)return;revision++;clearTimers();},
    destroy(){if(destroyed)return;destroyed=true;revision++;clearTimers();discardWorker();}
  };
}
