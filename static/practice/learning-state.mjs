// Compact observations survive the short UI attempt history. No inferred scores are saved.
export const MAX_LEARNING_EVENTS=6000;
export function learningEvent(id,result,at){
 return {id,at,sessionId:String(result.sessionId??`legacy-${at}`),passed:result.passed===true,
  cold:result.cold===true,assisted:result.assisted===true,fresh:result.fresh===true,
  kind:String(result.kind||(result.passed?'pass':'error')).slice(0,40)};
}
export function addLearningEvent(state,id,result,at=Date.now()){
 if(result.kind==='syntax')return;
 state.learningEvents||=[];
 state.learningEvents.push(learningEvent(id,result,at));
 if(state.learningEvents.length>MAX_LEARNING_EVENTS)state.learningEvents=state.learningEvents.slice(-MAX_LEARNING_EVENTS);
}
export function validateLearningEvents(events,ids){
 if(events===undefined)return [];
 if(!Array.isArray(events))throw Error('The saved learning history could not be read.');
 return events.filter(e=>e&&ids.has(e.id)&&Number.isFinite(e.at)&&e.at>0&&typeof e.passed==='boolean')
  .slice(-MAX_LEARNING_EVENTS).map(e=>learningEvent(e.id,e,e.at));
}
