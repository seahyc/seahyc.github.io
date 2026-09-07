import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {expectedForInput,explorerPresentation,formatExplorerOutput,getInitialInput,makeProbe,validateExplorerCatalog} from '../static/practice/explorer.mjs';

const load=name=>JSON.parse(readFileSync(new URL(`../static/practice/${name}.json`,import.meta.url),'utf8'));
const fn=(overrides={})=>({mode:'value',module:'task',function:'solve',args:[['a']],expected:['a'],caption:'Example.',...overrides});

test('all exercise catalogs have valid, exact explorer coverage',()=>{
 const exercises=['ramp','curriculum','variations'].flatMap(name=>load(name).exercises);
 const examples=load('examples').examples;
 assert.equal(exercises.length,55);
 assert.equal(Object.keys(examples).length,55);
 assert.equal(validateExplorerCatalog(exercises,examples),true);
});

test('legacy value mode accepts every JSON value as the single argument',()=>{
 for(const value of [{query:'agent'},'hello',null,42,true]){
  const example=fn({mode:undefined,args:[value]});
  assert.deepEqual(makeProbe(example,JSON.stringify(value)),{module:'task',function:'solve',args:[value]});
 }
});

test('arguments mode treats the input array as the complete argument list',()=>{
 const example=fn({mode:'arguments',args:[[1,2],3]});
 assert.deepEqual(makeProbe(example,'[[4, 5], 6]'),{module:'task',function:'solve',args:[[4,5],6]});
 assert.throws(()=>makeProbe(example,'{"items": [1]}'),/Arguments must be a JSON array/);
});

test('invalid JSON and oversized input produce explicit errors',()=>{
 assert.throws(()=>makeProbe(fn(),'{oops'),/Invalid JSON:/);
 assert.throws(()=>makeProbe(fn(),' '.repeat(30001)),/Input is too large/);
});

test('python mode sends the editable script and enforces bounds',()=>{
 const example={mode:'python',script:'from task import Thing\nprint(Thing())',expected:'Thing()',caption:'Construct it.'};
 assert.equal(getInitialInput(example),example.script);
 assert.deepEqual(makeProbe(example,'print("current code")'),{script:'print("current code")'});
 assert.throws(()=>makeProbe(example,'  '),/Enter a Python snippet/);
 assert.throws(()=>makeProbe(example,'x'.repeat(30001)),/Input is too large/);
 assert.deepEqual(explorerPresentation(example),{label:'Try it (Python)',help:'Edit this short driver snippet. It can import and call your current code.',rows:8});
});

test('output formatting is JSON-aware while Python stdout stays plain',()=>{
 assert.equal(formatExplorerOutput(fn(),{answer:[1,null]}),'{\n  "answer": [\n    1,\n    null\n  ]\n}');
 assert.equal(formatExplorerOutput(fn(),'hello'),'"hello"');
 assert.equal(formatExplorerOutput(fn(),null),'null');
 assert.equal(formatExplorerOutput({mode:'python'},'hello\n'),'hello');
 assert.equal(formatExplorerOutput({mode:'python'},'\n'),'(no output)');
});

test('expected output is shown only while the example input is unchanged',()=>{
 const example=fn({args:[{query:'agent'}],expected:{found:true}});
 assert.equal(expectedForInput(example,' { "query" : "agent" } '),'{\n  "found": true\n}');
 assert.equal(expectedForInput(example,'{"query":"other"}'),'Custom input — predict the result');
 assert.equal(expectedForInput(example,'invalid'),'Custom input — predict the result');
});

test('catalog validation reports missing, extra, malformed and disconnected metadata',()=>{
 const exercises=[{id:'one',files:{'src/task.py':'def solve(value):\n    return value\n'}}];
 assert.throws(()=>validateExplorerCatalog(exercises,{}),/one: missing explorer metadata/);
 assert.throws(()=>validateExplorerCatalog(exercises,{one:fn(),extra:fn()}),/extra: explorer metadata has no matching exercise/);
 assert.throws(()=>validateExplorerCatalog(exercises,{one:fn({module:'missing'})}),/module src\/missing\.py is not an exercise file/);
 assert.throws(()=>validateExplorerCatalog(exercises,{one:fn({function:'absent'})}),/function absent is not defined/);
 assert.throws(()=>validateExplorerCatalog(exercises,{one:fn({mode:'arguments',args:'nope'})}),/args must be an array/);
});
