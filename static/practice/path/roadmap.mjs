import {nextStep,route} from '../mastery.mjs?v=recall-2026-09-06-1';
import {exerciseEvidence} from '../evidence.mjs?v=recall-2026-09-06-1';
import {assessedSessions,reviewPass} from './model.mjs?v=recall-2026-09-06-1';

const phaseRank={Foundation:0,Build:1,Mock:2};
const phaseTitle=['Foundations','Applied practice','Assessment practice'];

function interviewEvidence(session,path,now){
 const records=(path.reviews||[]).filter(r=>r.id===session.id&&r.at<=now).sort((a,b)=>b.at-a.at);
 const completed=records.some(r=>reviewPass(r,session));
 const peerCurrent=assessedSessions(path,[session],true,now).length===1;
 const selfCurrent=!peerCurrent&&assessedSessions(path,[session],false,now).length===1;
 if(peerCurrent)return {completed,covered:false,retained:true,label:'Current peer review',detail:'A reported passing peer review is still current.'};
 if(selfCurrent)return {completed,covered:false,retained:true,label:'Current self-rated rehearsal',detail:'This passing rehearsal is current; peer feedback would strengthen the evidence.'};
 if(completed)return {completed,covered:false,retained:false,label:'Refresh needed',detail:'You completed this rehearsal before, but its current evidence has expired or a later rehearsal needs repair.'};
 return {completed:false,covered:false,retained:false,label:'Not completed',detail:'Complete the rehearsal and record specific feedback against every rubric dimension.'};
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
  const evidence=interview?interviewEvidence(source,path,now):exerciseEvidence(code,id,now);
  const isCurrent=current.id===id&&current.type!=='done';
  let status=evidence.completed?'completed':evidence.covered?'covered':'upcoming';
  let statusLabel=evidence.label;
  if(isCurrent){status=current.review?'review':current.type==='pause'?'scheduled':'current';statusLabel=current.review?'Recall due':current.type==='pause'?'Recall scheduled':evidence.label;}
  milestones.push({id,title:source.title,type:interview?'interview':'code',phase:phaseTitle[phase],practiced:evidence.completed,completed:evidence.completed,covered:evidence.covered,retained:evidence.retained,evidenceLabel:evidence.label,evidenceDetail:evidence.detail,status,statusLabel,isCurrent});
 }
 const completed=milestones.filter(m=>m.completed).length;
 const retained=milestones.filter(m=>m.type==='code'&&m.retained).length;
 const currentIndex=milestones.findIndex(m=>m.isCurrent);
 return {summary:`${completed} of ${milestones.length} milestones completed`,completed,practiced:completed,retained,total:milestones.length,milestones,current,currentIndex};
}

function element(tag,className,text){const node=document.createElement(tag);if(className)node.className=className;if(text!==undefined)node.textContent=text;return node;}

export function renderRoadmap(container,model){
 container.replaceChildren();
 const overview=element('div','roadmap-overview');
 const label=element('label','roadmap-progress-label','Milestones completed');label.htmlFor='roadmap-progress';
 const count=element('strong','roadmap-count',model.summary);
 const progress=element('progress','roadmap-progress');progress.id='roadmap-progress';progress.max=model.total;progress.value=model.completed;progress.textContent=model.summary;
 overview.append(label,count,progress);
 if(model.retained>0)overview.append(element('p','roadmap-retained',`${model.retained} coding task${model.retained===1?'':'s'} with current delayed-recall evidence`));
 const current=model.currentIndex>=0?model.milestones[model.currentIndex]:null;
 if(current){
  const here=element('section','roadmap-here');
  here.append(element('p','roadmap-here-step',`You are here · Step ${model.currentIndex+1} of ${model.total}`),element('h3','roadmap-here-title',current.title),element('p','roadmap-here-reason',model.current.reason||current.evidenceDetail));
  if(current.completed&&model.current.review)here.append(element('p','roadmap-history-note','Completion stays checked. Recall comes back when it is due.'));
  overview.append(here);
 }
 const evidenceHelp=element('details','roadmap-evidence-help');
 evidenceHelp.append(element('summary','', 'What counts as evidence?'),element('p','', 'Coding evidence moves from guided success to an independent pass, then delayed recall. Unfamiliar timed tasks check transfer separately. Interview rehearsals are self-rated unless you report a peer review. These observations are progress evidence, not a measured mastery percentage.'));
 overview.append(evidenceHelp);
 container.append(overview);
 let phase='',list;
 for(const milestone of model.milestones){
  if(milestone.phase!==phase){phase=milestone.phase;container.append(element('h3','roadmap-phase',phase));list=element('ol','roadmap-list');container.append(list);}
  const item=element('li',`roadmap-item roadmap-item--${milestone.status}${milestone.completed?' roadmap-item--completed':''}`);
  if(milestone.isCurrent){item.setAttribute('aria-current','step');item.append(element('span','roadmap-you-are-here','→ You are here'));}
  const title=element('span','roadmap-title');
  title.append(element('span','roadmap-ink',milestone.title));
  const visibleLabel=milestone.covered&&!milestone.completed?'Covered by later work':milestone.statusLabel;
  const meta=element('span','roadmap-status',`${milestone.type==='code'?'Code':'Interview'} · ${visibleLabel}`);
  if(milestone.completed)title.prepend(element('span','roadmap-check','✓ '));
  item.append(title,meta);
  if(milestone.evidenceDetail)item.title=milestone.evidenceDetail;
  list.append(item);
 }
}
