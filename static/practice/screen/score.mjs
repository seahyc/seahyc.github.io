// Score one submitted screen out of 100, mirroring the CoderPad mock rubric.
// Every point is computed from evidence except 9 self-rated quality points, which are labelled.
// Missing the central invariant (a critical validator failing) caps the total at 69.

const MIN=60000;
export const STRONG=85;
const SECTIONS=['Representation','Invariant','Complexity','Rejected alternative'];

const words=text=>(String(text).match(/[A-Za-z0-9_()+*^\/.-]+/g)||[]).length;
const baseName=name=>String(name).replace(/^[^:]*::/,'').replace(/\[.*$/,'');
const allPass=cases=>cases.length>0&&cases.every(c=>c.status==='pass');

// Sections of DESIGN.md keyed by heading, so the score reads the candidate's own words.
export function designSections(markdown){
 const out={};let current=null;
 for(const line of String(markdown).split(/\r?\n/)){
  const h=line.match(/^#{2,3}\s+(.+?)\s*$/);
  if(h){current=h[1].trim();out[current]='';continue;}
  if(current)out[current]+=line+'\n';
 }
 return out;
}

export function correctness(validators=[],weights={},critical=[]){
 const byTest=new Map();
 for(const c of validators){const k=baseName(c.test||c.name);const prev=byTest.get(k);byTest.set(k,prev===false?false:c.status==='pass');}
 if(!byTest.size||validators.some(c=>c.test==='<import>'))return {points:0,passed:0,total:byTest.size,failed:[...byTest.keys()],criticalFailed:critical.slice()};
 let got=0,max=0;const failed=[];
 for(const [k,ok] of byTest){const w=weights[k]??1;max+=w;if(ok)got+=w;else failed.push(k);}
 return {points:Math.round(40*got/max*10)/10,passed:byTest.size-failed.length,total:byTest.size,failed,criticalFailed:critical.filter(k=>byTest.get(k)!==true)};
}

export function edges(candidate=[],mutation={real:0,killed:0}){
 const own=candidate.filter(c=>c.test!=='<import>');
 const suite=own.length>=3&&allPass(own)?5:0;
 const rate=mutation.real>0?mutation.killed/mutation.real:0;
 return {points:Math.round((suite+15*rate)*10)/10,tests:own.length,suitePasses:allPass(own),killRate:Math.round(rate*100)/100,real:mutation.real,killed:mutation.killed,survivors:mutation.survivors||[]};
}

export function design(markdown){
 const sections=designSections(markdown);let points=0;const thin=[];
 for(const name of SECTIONS){const n=words(sections[name]||'');if(n>=12)points+=3;else thin.push(name);}
 const complexity=/O\([^)]+\)/.test(sections.Complexity||'');
 if(complexity&&points>=9)points+=3;
 return {points,thin,complexityStated:complexity};
}

// static: {customError:boolean, mutableGlobals:string[]} from the worker's AST scan.
// self: {api:boolean, helpers:boolean} self-rated after submit.
export function quality(staticChecks={},self={}){
 const auto=(staticChecks.customError?3:0)+((staticChecks.mutableGlobals||[]).length===0?3:0);
 const rated=(self.api?5:0)+(self.helpers?4:0);
 return {points:auto+rated,auto,selfRated:rated,mutableGlobals:staticChecks.mutableGlobals||[],customError:!!staticChecks.customError};
}

// events: {startedAt, deadline, submittedAt, runs:[{at, anyPass}], pastes:[{at, chars}], awayMs}
export function execution(events,minutes,self={}){
 const start=events.startedAt,limit=minutes*MIN;
 const firstGreen=(events.runs||[]).find(r=>r.anyPass);
 const firstGreenMin=firstGreen?Math.round((firstGreen.at-start)/MIN*10)/10:null;
 const early=firstGreen&&firstGreen.at-start<=limit/3?3:0;
 const windows=new Set((events.runs||[]).map(r=>Math.floor((r.at-start)/(5*MIN))));
 const incremental=windows.size>=3?2:0;
 const largePastes=(events.pastes||[]).filter(p=>p.chars>80).length;
 const away=Math.round((events.awayMs||0)/1000);
 const honest=largePastes===0&&away<=120?2:0;
 const onTime=events.submittedAt<=events.deadline?2:0;
 const clean=self.clean?1:0;
 return {points:early+incremental+honest+onTime+clean,firstGreenMin,runs:(events.runs||[]).length,windows:windows.size,largePastes,awaySeconds:away,onTime:!!onTime};
}

export function scoreScreen({minutes,validators,weights,critical,candidate,mutation,designText,staticChecks,events,self={}}){
 const parts={
  correctness:correctness(validators,weights,critical),
  edges:edges(candidate,mutation),
  quality:quality(staticChecks,self),
  design:design(designText),
  execution:execution(events,minutes,self)
 };
 const raw=Math.round(Object.values(parts).reduce((s,p)=>s+p.points,0));
 const capped=parts.correctness.criticalFailed.length>0&&raw>69;
 const total=capped?69:raw;
 return {total,raw,capped,strong:total>=STRONG,parts};
}
