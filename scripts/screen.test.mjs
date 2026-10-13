import test from 'node:test';
import assert from 'node:assert/strict';
import {scoreScreen,design,correctness,execution} from '../static/practice/screen/score.mjs';
import {nextStep,phaseStatus,readiness} from '../static/practice/screen/plan.mjs';
import {summarize} from '../static/practice/screen/report.mjs';

const MIN=60000,DAY=86400000;
const GOOD_DESIGN=`## Representation
A memo dictionary maps id of each source container to its copy, created before its children are visited.
## Invariant
Every container is copied exactly once, and its copy is registered before any child can refer back to it.
## Complexity
O(n) time and O(n) space for n containers and primitives, with an explicit stack instead of recursion.
## Rejected alternative
Recursive descent is shorter but overflows the interpreter stack on deep nesting, so I chose an explicit stack.`;

function inputs({fail=[],critical=['test_core'],start=0,minutes=60,firstGreen=10,submitted=50,ownTests=4,killed=8,real=10,designText=GOOD_DESIGN,self={api:true,helpers:true,clean:true},pastes=[]}={}){
 const names=['test_core','test_a','test_b','test_c','test_d','test_e','test_f','test_g'];
 return {minutes,critical,weights:{test_core:3},
  validators:names.map(n=>({test:n,status:fail.includes(n)?'fail':'pass'})),
  candidate:Array.from({length:ownTests},(_,i)=>({test:`test_own_${i}`,status:'pass'})),
  mutation:{real,killed,survivors:[]},designText,staticChecks:{customError:true,mutableGlobals:[]},self,
  events:{startedAt:start,deadline:start+minutes*MIN,submittedAt:start+submitted*MIN,awayMs:0,pastes,
   runs:[{at:start+firstGreen*MIN,anyPass:true},{at:start+25*MIN,anyPass:true},{at:start+40*MIN,anyPass:true}]}};
}

test('a clean, fast, well-tested solution scores as a strong pass',()=>{
 const s=scoreScreen(inputs());
 assert.equal(s.parts.correctness.points,40);
 assert.equal(s.parts.design.points,15);
 assert.equal(s.parts.execution.points,10);
 assert.equal(s.parts.edges.points,17);
 assert.equal(s.total,97);assert.equal(s.strong,true);
});

test('a failing core-invariant validator caps the total at 69',()=>{
 const s=scoreScreen(inputs({fail:['test_core']}));
 assert.equal(s.capped,true);assert.equal(s.total,69);assert.deepEqual(s.parts.correctness.criticalFailed,['test_core']);
});

test('correctness weights tests and treats any failing parametrized case as a failure',()=>{
 const c=correctness([{test:'test_x[0]',status:'pass'},{test:'test_x[1]',status:'fail'},{test:'test_y',status:'pass'}],{test_x:3},[]);
 assert.deepEqual(c.failed,['test_x']);assert.equal(c.points,10);
});

test('an import failure in the validators earns no correctness points',()=>{
 const c=correctness([{test:'<import>',status:'error'}],{},['test_core']);
 assert.equal(c.points,0);assert.deepEqual(c.criticalFailed,['test_core']);
});

test('a template-only design note earns nothing; complexity needs big-O',()=>{
 assert.equal(design('## Representation\n\n## Invariant\n\n## Complexity\n\n## Rejected alternative\n').points,0);
 const noBigO=GOOD_DESIGN.replace('O(n) time and O(n) space','linear time and linear space');
 assert.equal(design(noBigO).points,12);
});

test('execution rewards an early first green and penalises large pastes and late submission',()=>{
 const late=execution({startedAt:0,deadline:60*MIN,submittedAt:61*MIN,runs:[{at:30*MIN,anyPass:true}],pastes:[{at:1,chars:400}],awayMs:0},60,{});
 assert.equal(late.points,0);
 assert.equal(late.firstGreenMin,30);
});

test('weak own tests lose edge-case points even when the code is correct',()=>{
 const s=scoreScreen(inputs({ownTests:1,killed:2,real:10}));
 assert.equal(s.parts.edges.points,3);
});

// ---------------------------------------------------------------- plan

const catalog=[
 {id:'clone',phase:'fluency',family:'identity',order:10,minutes:25},
 {id:'rollup',phase:'fluency',family:'data',order:20,minutes:20},
 {id:'codec',phase:'family',family:'identity',order:40,minutes:75},
 {id:'resolver',phase:'family',family:'identity',order:50,minutes:60},
 {id:'build',phase:'transfer',family:'graph',order:70,minutes:60},
 {id:'bucket',phase:'transfer',family:'time',order:80,minutes:60}
];
function attempt(exerciseId,day,total,{firstGreen=5,postmortem=true}={}){
 const startedAt=day*DAY+9*3600000,minutes=catalog.find(e=>e.id===exerciseId).minutes;
 return {id:`${exerciseId}-${day}-${total}`,exerciseId,startedAt,deadline:startedAt+minutes*MIN,submittedAt:startedAt+(minutes-5)*MIN,
  score:{total,capped:false,strong:total>=85,parts:{correctness:{points:40,failed:[],criticalFailed:[]},edges:{points:15,tests:4,killRate:.8,survivors:[]},quality:{points:12,selfRated:9},design:{points:15,thin:[]},execution:{points:9,firstGreenMin:firstGreen,onTime:true,runs:5,largePastes:0,awaySeconds:0}}},
  postmortem:postmortem?{category:'none',decision:'No consequential mistake; the representation was chosen in the first five minutes.'}:undefined};
}
const NOW=30*DAY;

test('a new candidate starts with the placement screen and can skip ahead',()=>{
 const step=nextStep(catalog,{attempts:[]},NOW);
 assert.equal(step.exerciseId,'clone');
 assert.equal(step.challenge.exerciseId,'codec');
});

test('a strong unseen family screen proves fluency too, without any fluency attempt',()=>{
 const state={attempts:[attempt('codec',29,90)]};
 const phases=phaseStatus(catalog,state,NOW);
 assert.equal(phases[0].proven,true);assert.equal(phases[0].subsumed,true);
 assert.equal(phases[1].proven,true);
 assert.equal(nextStep(catalog,state,NOW).exerciseId,'build');
});

test('a transfer pass never stands in for the reported task family',()=>{
 const state={attempts:[attempt('build',28,92),attempt('bucket',29,90)]};
 const phases=phaseStatus(catalog,state,NOW);
 assert.equal(phases[1].proven,false);assert.equal(phases[2].proven,true);
 assert.equal(nextStep(catalog,state,NOW).exerciseId,'codec');
});

test('the fastest honest path to booking is two strong long screens on two days',()=>{
 const sameDay={attempts:[attempt('codec',29,90),attempt('build',29,88)]};
 assert.equal(readiness(catalog,sameDay,NOW).ready,false);
 const twoDays={attempts:[attempt('codec',28,90),attempt('build',29,88)]};
 const r=readiness(catalog,twoDays,NOW);
 assert.equal(r.ready,true,JSON.stringify(r.gates));
 assert.equal(nextStep(catalog,twoDays,NOW).type,'ready');
});

test('a retake never counts as unseen evidence',()=>{
 const state={attempts:[attempt('codec',27,60),attempt('codec',28,95),attempt('build',29,90)]};
 assert.equal(readiness(catalog,state,NOW).gates.find(g=>g.id==='family').met,false);
});

test('a weak latest screen blocks booking even after earlier strong passes',()=>{
 const state={attempts:[attempt('codec',27,90),attempt('build',28,90),attempt('bucket',29,70)]};
 assert.equal(readiness(catalog,state,NOW).gates.find(g=>g.id==='latest').met,false);
});

test('evidence older than 21 days expires',()=>{
 const state={attempts:[attempt('codec',1,90),attempt('build',2,90)]};
 assert.equal(readiness(catalog,state,NOW).ready,false);
});

test('a postmortem is required before the next screen',()=>{
 const state={attempts:[attempt('clone',29,70,{postmortem:false})]};
 assert.equal(nextStep(catalog,state,NOW).type,'postmortem');
});

test('a slow fluency pass does not prove fluency',()=>{
 const state={attempts:[attempt('clone',29,90,{firstGreen:12})]};
 assert.equal(phaseStatus(catalog,state,NOW)[0].proven,false);
});

test('the report gives an agent per-attempt evidence, family trends and the next step',()=>{
 const state={targetDate:'2026-11-03',attempts:[attempt('clone',28,72),attempt('codec',29,90)]};
 const r=summarize(catalog,state,NOW);
 assert.equal(r.attempts.length,2);
 assert.equal(r.attempts[0].unseen,true);
 assert.equal(r.families.identity.best,90);
 assert.equal(r.next.exerciseId,'build');
 assert.equal(r.targetDate,'2026-11-03');
 assert.ok(r.readiness.gates.length>=4);
});

test('a very weak first attempt leads to a coached rebuild of the same exercise',()=>{
 const state={attempts:[attempt('clone',29,5)]};
 const step=nextStep(catalog,state,NOW);
 assert.equal(step.type,'rebuild');assert.equal(step.exerciseId,'clone');
 const first=attempt('clone',29,5),after={attempts:[first,{...attempt('clone',29,70),id:'retake',submittedAt:first.submittedAt+3600000}]};
 assert.equal(nextStep(catalog,after,NOW).type,'screen');
});

test('a self-reported assisted screen never counts as evidence',()=>{
 const state={attempts:[{...attempt('codec',28,95),assisted:true},attempt('build',29,90)]};
 assert.equal(readiness(catalog,state,NOW).gates.find(g=>g.id==='family').met,false);
 assert.equal(nextStep(catalog,{attempts:[{...attempt('codec',29,95),assisted:true}]},NOW).type,'rebuild');
});
