// Explicit assessment coverage: prerequisites are not automatically practiced.
export const skills = [
 {id:'filtering',title:'Loops and filtering',prerequisites:[],teach:['tiny-filter-guided','tiny-filter-cold'],probe:'probe-filtering'},
 {id:'counting',title:'Dictionary counting',prerequisites:['filtering'],teach:['tiny-count-guided','tiny-count-cold'],probe:'probe-counting'},
 {id:'normalization',title:'Validation and normalization',prerequisites:['filtering'],teach:['syntax-faded'],probe:'probe-normalization'},
 {id:'collections',title:'Sets and collection behavior',prerequisites:['filtering','counting','normalization'],teach:['python-refresher-1'],probe:'probe-collections'},
 {id:'routing',title:'Dispatch and contracts',prerequisites:['collections'],teach:['tool-router'],probe:'probe-routing'},
 {id:'intervals',title:'Interval boundaries',prerequisites:['collections'],teach:['interval-windows'],probe:'probe-intervals'},
 {id:'graphs',title:'Graph traversal',prerequisites:['collections'],teach:['shortest-route'],probe:'probe-graphs'},
 {id:'ranking',title:'Ranking and tie breaking',prerequisites:['collections'],teach:['ranked-results'],probe:'probe-ranking'},
 {id:'evaluation',title:'Evaluation and aggregation',prerequisites:['counting','routing'],teach:['eval-harness'],probe:'probe-evaluation'},
 {id:'windows',title:'Rolling windows',prerequisites:['intervals','counting'],teach:['log-spike'],probe:'probe-windows'},
 {id:'cycles',title:'Repeated state detection',prerequisites:['collections'],teach:['loop-detector'],probe:'probe-cycles'},
 {id:'throttling',title:'Time and rate limits',prerequisites:['intervals'],teach:['rate-limiter'],probe:'probe-throttling'},
 {id:'serialization',title:'Object identity and serialization',prerequisites:['graphs','identity'],teach:['object-graph-codec']},
 {id:'parsing',title:'Incremental parsing',prerequisites:['collections'],teach:['bracket-parser','sse-parser']},
 {id:'stateful',title:'Stateful data structures',prerequisites:['collections'],teach:['versioned-key-value-store','bounded-lru-cache','evolving-ledger','repair-expiring-cache']},
 {id:'concurrency',title:'Bounded concurrent work',prerequisites:['collections','routing'],teach:['bounded-async-map','batch-scheduler']},
 {id:'identity',title:'Container identity and cycles',prerequisites:['collections'],teach:['python-refresher-2']}
];
export const taskSkills = {};
const assign=(ids,primary,kind='challenge',practiced=[])=>ids.forEach(id=>taskSkills[id]={primary,practiced,kind,family:id});
assign(['tiny-filter-guided'],['filtering'],'guided');
assign(['tiny-filter-cold'],['filtering']);
assign(['tiny-count-guided'],['counting'],'guided');
assign(['tiny-count-cold'],['counting']);
assign(['syntax-guided'],['filtering','counting'],'guided');
assign(['syntax-faded'],['normalization'],'guided');
assign(['python-refresher-1'],['collections'],'challenge',['counting']);
assign(['python-refresher-2'],['identity']);
for(const s of skills.slice(4,12))assign(s.teach,[s.id]);
assign(['dependency-graph'],['graphs'],'mock');
assign(['retry-backoff'],['throttling'],'mock');
assign(['object-graph-codec'],['serialization'],'mock');
assign(['bracket-parser','sse-parser'],['parsing'],'mock');
assign(['versioned-key-value-store','bounded-lru-cache','evolving-ledger','repair-expiring-cache'],['stateful'],'mock');
assign(['duplicate-content'],['collections'],'mock');
assign(['bounded-async-map','batch-scheduler'],['concurrency'],'mock');
for(const s of skills.slice(0,12)){
 assign([`probe-${s.id}`],[s.id],'diagnostic');
 assign([`variation-${s.id}`],[s.id],'variation');
 taskSkills[`probe-${s.id}`].family=s.teach[0];
 taskSkills[`variation-${s.id}`].family=s.teach[0];
}
assign(['mixed-event-summary'],['filtering','counting','normalization'],'variation');
assign(['mixed-ranked-counts'],['ranking','counting'],'variation');
assign(['mixed-window-routing'],['windows','routing'],'variation');
taskSkills['mixed-event-summary'].family='tiny-count-cold';
taskSkills['mixed-ranked-counts'].family='ranked-results';
taskSkills['mixed-window-routing'].family='log-spike';
// These short checks cover introductory teaching. Applied builds have additional
// contracts and still require their own independent solution.
for(const id of ['tiny-filter-guided','tiny-filter-cold','tiny-count-guided','tiny-count-cold','syntax-guided','syntax-faded'])taskSkills[id].coverable=true;
taskSkills['syntax-faded'].coverageTasks=['probe-normalization'];
