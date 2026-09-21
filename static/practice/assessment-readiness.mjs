import {taskSkills} from './skill-catalog.mjs';

const DAY=86400000, WINDOW=21*DAY;
export const assessmentDimensions=[
 ['correctness','Correctness and robustness'],
 ['algorithm','Algorithm and complexity'],
 ['testing','Test strategy and edge cases'],
 ['explanation','Explanation and adaptation']
];
export const errorCategories=['none','contract','invariant','data-structure','edge-case','complexity','debugging','time','explanation'];

export function completeAssessmentReview(review){
 return !!review&&errorCategories.includes(review.errorCategory)&&review.postmortem?.trim().length>=120&&assessmentDimensions.every(([id])=>Number.isInteger(review.scores?.[id])&&review.scores[id]>=2);
}

export function assessmentQualification(code={},catalog=[],now=Date.now()){
 const byId=new Map(catalog.map(e=>[e.id,e]));
 const recent=(code.attempts||[]).filter(a=>a?.freshMock&&a.at<=now&&now-a.at<=WINDOW&&byId.get(a.id)?.stage==='Mock').sort((a,b)=>a.at-b.at);
 const groups=[];
 for(const attempt of recent){
  const key=`${attempt.id}|${attempt.sessionId??attempt.at}`;
  let round=groups.find(x=>x.key===key);
  if(!round){round={key,id:attempt.id,at:attempt.at,attempts:[]};groups.push(round);}
  round.at=Math.max(round.at,attempt.at);round.attempts.push(attempt);
 }
 for(const round of groups){
  const exercise=byId.get(round.id),qualified=round.attempts.find(a=>a.passed&&a.mockQualified);
  const review=code.exercises?.[round.id]?.assessmentReview;
  round.passed=!!qualified;round.reviewed=completeAssessmentReview(review);round.strong=round.passed&&round.reviewed;
  round.elapsed=qualified?.elapsed??Infinity;round.margin=qualified?exercise.minutes*60-qualified.elapsed:-Infinity;
  round.family=(taskSkills[round.id]?.primary||[]).join('+')||round.id;
 }
 const latest=groups.slice(-5),strong=latest.filter(r=>r.strong),lastThree=latest.slice(-3);
 const families=new Set(strong.map(r=>r.family)),days=new Set(strong.map(r=>new Date(r.at).toISOString().slice(0,10)));
 const gates=[
  {id:'volume',title:'Championship set',met:latest.length>=5&&strong.length>=4,detail:`${strong.length}/4 strong passes in the latest ${latest.length}/5 fresh mocks`},
  {id:'streak',title:'Finish consistently',met:lastThree.length===3&&lastThree.every(r=>r.strong),detail:`${lastThree.filter(r=>r.strong).length}/3 latest mocks are consecutive strong passes`},
  {id:'breadth',title:'Transfer across problem families',met:families.size>=3&&days.size>=3,detail:`${families.size}/3 task families across ${days.size}/3 days`},
  {id:'margin',title:'Keep a review buffer',met:strong.some(r=>r.margin>=600),detail:strong.some(r=>r.margin>=600)?'At least one strong pass finished with 10+ minutes remaining':'No strong pass has a 10-minute review buffer yet'},
  {id:'review',title:'Write proof-quality postmortems',met:strong.length>=4,detail:`${strong.length}/4 passes include scores of 2+ in every dimension and a 120-character postmortem`}
 ];
 return {ready:gates.every(g=>g.met),gates,rounds:groups,latest,strong};
}
