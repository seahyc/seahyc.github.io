import {demonstrated,nextStep,route} from '../mastery.mjs?v=recall-2026-09-06-1';
import {assessedSessions,reviewPass} from './model.mjs?v=recall-2026-09-06-1';

const phaseRank={Foundation:0,Build:1,Mock:2};
const phaseTitle=['Foundations','Applied practice','Assessment practice'];

function interviewComplete(session,path,now){
 const records=(path.reviews||[]).filter(r=>r.id===session.id&&r.at<=now).sort((a,b)=>b.at-a.at);
 if(!reviewPass(records[0],session))return false;
 return session.id!=='full-loop'||assessedSessions(path,[session],true,now).length===1;
}

export function roadmapModel(exercises,code={},sessions=[],path={},now=Date.now()){
 const codeById=new Map(exercises.map(e=>[e.id,e])),sessionById=new Map(sessions.map(s=>[s.id,s]));
 const current=nextStep(exercises,code,sessions,path,now),milestones=[];
 let phase=0;
 for(const routeId of route){
  const interview=routeId.startsWith('@'),id=interview?routeId.slice(1):routeId;
  const source=interview?sessionById.get(id):codeById.get(id);
  if(!source)continue;
  if(!interview)phase=Math.max(phase,phaseRank[source.stage]??phase);
  const practiced=interview?interviewComplete(source,path,now):demonstrated(code,id);
  const isCurrent=current.id===id&&current.type!=='done';
  let status=practiced?'completed':'upcoming',statusLabel=practiced?'Practiced':'Upcoming';
  if(isCurrent){
   status=current.review?'review':current.type==='pause'?'scheduled':'current';
   statusLabel=current.review?'Recall due':current.type==='pause'?'Recall scheduled':'Current';
  }
  milestones.push({id,title:source.title,type:interview?'interview':'code',phase:phaseTitle[phase],practiced,status,statusLabel});
 }
 const practiced=milestones.filter(m=>m.practiced).length;
 return {summary:`${practiced} of ${milestones.length} milestones practiced`,practiced,total:milestones.length,milestones,current};
}

export function renderRoadmap(container,model){
 container.replaceChildren();
 const summary=document.createElement('p');summary.className='roadmap-summary';summary.textContent=model.summary;container.append(summary);
 let phase='';
 for(const milestone of model.milestones){
  if(milestone.phase!==phase){phase=milestone.phase;const heading=document.createElement('h3');heading.className='roadmap-phase';heading.textContent=phase;container.append(heading);const list=document.createElement('ol');list.className='roadmap-list';container.append(list);}
  const item=document.createElement('li');item.className=`roadmap-item roadmap-item--${milestone.status}`;
  if(milestone.status==='current'||milestone.status==='review'||milestone.status==='scheduled')item.setAttribute('aria-current','step');
  const title=document.createElement('span');title.className='roadmap-title';title.textContent=milestone.title;
  const meta=document.createElement('span');meta.className='roadmap-status';meta.textContent=`${milestone.type==='code'?'Code':'Interview'} · ${milestone.statusLabel}`;
  item.append(title,meta);container.lastElementChild.append(item);
 }
}
