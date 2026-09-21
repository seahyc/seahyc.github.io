const object=v=>v&&typeof v==='object'&&!Array.isArray(v);
const sha=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
export function validateAdvanced(r,definition){
 if(!definition||!r||r.schemaVersion!==2||r.assessment!==definition.id||!Number.isSafeInteger(r.seed)||!sha(r.sourceHash)||!sha(r.evaluatorHash)||!['passed','failed','unsupported'].includes(r.status))throw Error('Expected a version 2 result for this assessment with source and evaluator hashes.');
 const scope=definition.scopes?.[r.scope];
 if(!scope)throw Error('Unrecognized execution scope.');
 if(!object(r.runtime)||!['python','platform','device'].every(k=>typeof r.runtime[k]==='string'&&r.runtime[k].trim())||!object(r.runtime.packages))throw Error('Missing runtime, device or package metadata.');
 if(!object(r.metrics)||Object.values(r.metrics).some(v=>typeof v!=='number'||!Number.isFinite(v))||!object(r.checks)||Object.values(r.checks).some(v=>typeof v!=='boolean')||!Array.isArray(r.unsupported)||r.unsupported.some(v=>typeof v!=='string'||!v.trim()))throw Error('Malformed measured results.');
 if(r.status==='failed'&&typeof r.error==='string'&&r.error.trim())return structuredClone(r);
 if(r.status==='unsupported'&&r.unsupported.length)return structuredClone(r);
 if(scope.unsupported){if(r.status!=='unsupported'||!r.unsupported.length)throw Error('This scope is unsupported.');return structuredClone(r);}
 const expected={};
 for(const rule of scope.criteria||[]){
  const value=r.metrics[rule.metric];
  if(typeof value!=='number')throw Error(`Missing measurement: ${rule.metric}.`);
  const operators={lt:(a,b)=>a<b,lte:(a,b)=>a<=b,eq:(a,b)=>a===b,gte:(a,b)=>a>=b,gt:(a,b)=>a>b};
  if(!operators[rule.op]||!Number.isFinite(rule.value))throw Error('Invalid assessment criterion.');
  expected[rule.name||rule.metric]=operators[rule.op](value,rule.value);
 }
 if(!Object.keys(expected).length)throw Error('No executable grading criteria for this scope.');
 if(Object.keys(r.checks).length!==Object.keys(expected).length||Object.entries(expected).some(([k,v])=>r.checks[k]!==v))throw Error('Reported checks disagree with measured results.');
 if(r.status==='unsupported'){if(!r.unsupported.length)throw Error('Unsupported result needs named gates.');}
 else{
  if(r.unsupported.length)throw Error('Unrun gates cannot count as a completed execution.');
  if((r.status==='passed')!==Object.values(expected).every(Boolean))throw Error('Reported status disagrees with measured results.');
 }
 return structuredClone(r);
}
export function scopedReports(m,reports=[]){return m.runtime?reports.filter(r=>r.schemaVersion===2&&r.assessment===m.runtime.assessment&&r.scope===m.runtime.requiredScope):reports;}
