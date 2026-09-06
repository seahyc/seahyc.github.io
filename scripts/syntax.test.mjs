import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {createSyntaxChecker} from '../static/practice/syntax-client.mjs';

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const workerSource=readFileSync(new URL('../static/practice/syntax-worker.mjs',import.meta.url),'utf8');
const editorSource=readFileSync(new URL('../projects-src/practice-editor/editor.mjs',import.meta.url),'utf8');

class FakeWorker {
  constructor(){this.messages=[];this.terminated=false;}
  postMessage(message){this.messages.push(message);}
  emit(data){this.onmessage?.({data});}
  fail(){this.onerror?.(new Error('worker failed'));}
  terminate(){this.terminated=true;}
}

test('real CPython compile accepts valid function return and rejects structural syntax',()=>{
  const samples=[
    ['def f():\n    return 1\n',true],
    ['def greet(name)\n    return name\n',false],
    ["if True:\nprint('x')\n",false],
    ['return 1\n',false],
    ['π = 1\nif π ==:\n    pass\n',false]
  ];
  const python=String.raw`import json,sys
out=[]
for source,valid in json.load(sys.stdin):
 try:
  compile(source,'lesson.py','exec'); out.append({'valid':True})
 except SyntaxError as error:
  out.append({'valid':False,'line':error.lineno or 1,'column':error.offset or 1,'endLine':getattr(error,'end_lineno',None) or error.lineno or 1,'endColumn':getattr(error,'end_offset',None) or (error.offset or 1)+1,'message':error.msg})
print(json.dumps(out,ensure_ascii=False))`;
  const run=spawnSync('python3',['-c',python],{input:JSON.stringify(samples),encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
  const results=JSON.parse(run.stdout);
  assert.deepEqual(results.map(x=>x.valid),samples.map(x=>x[1]));
  assert.ok(results[1].message.length>0);
  assert.match(results[2].message,/indent/i);
  assert.match(results[3].message,/outside function/i);
  assert.equal(results[4].line,2);
  assert.equal(results[4].column,8,'CPython columns are one-based Unicode character positions');
});

test('browser compiler is compile-only and editor exposes native lint diagnostics',()=>{
  assert.match(workerSource,/compile\(syntax_source, syntax_filename, 'exec'\)/);
  assert.doesNotMatch(workerSource,/\bexec\(syntax_source|\beval\(syntax_source/);
  assert.match(workerSource,/MAX_SOURCE_LENGTH=200000/);
  assert.match(editorSource,/lintGutter\(\)/);
  assert.match(editorSource,/setDiagnostics\(diagnostics=\[\]\)/);
});

test('client debounces edits and ignores an older worker result',async()=>{
  const worker=new FakeWorker(),results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:()=>{},workerFactory:()=>worker,debounceMs:5});
  checker.check('first','a.py');await sleep(10);const first=worker.messages[0];
  checker.check('second','a.py');await sleep(10);const second=worker.messages[1];
  worker.emit({id:first.id,status:'checked',diagnostics:[{line:1,column:1,endLine:1,endColumn:2,message:'old'}]});
  worker.emit({id:second.id,status:'checked',diagnostics:[]});
  assert.deepEqual(results,[{id:second.id,status:'checked',diagnostics:[]}]);checker.destroy();
});

test('clear cancels debounce and invalidates in-flight results',async()=>{
  const worker=new FakeWorker(),results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:()=>{},workerFactory:()=>worker,debounceMs:5});
  checker.check('waiting','a.py');checker.clear();await sleep(10);assert.equal(worker.messages.length,0);
  checker.check('sent','a.py');await sleep(10);const sent=worker.messages[0];checker.clear();worker.emit({id:sent.id,status:'checked',diagnostics:[]});
  assert.deepEqual(results,[]);checker.destroy();
});

test('a load timeout reports unavailable and a later edit creates a fresh worker',async()=>{
  const workers=[],statuses=[],results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:value=>statuses.push(value),workerFactory:()=>{const worker=new FakeWorker();workers.push(worker);return worker;},debounceMs:1,timeoutMs:12});
  checker.check('one','a.py');await sleep(20);
  assert.equal(workers[0].terminated,true);assert.equal(results[0].status,'unavailable');assert.ok(statuses.includes('unavailable'));
  checker.check('two','a.py');await sleep(5);assert.equal(workers.length,2);checker.destroy();
});

test('worker construction failure is reported without throwing from typing',async()=>{
  const statuses=[],results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:value=>statuses.push(value),workerFactory:()=>{throw Error('CSP blocked');},debounceMs:1});
  assert.doesNotThrow(()=>checker.check('x = 1','a.py'));await sleep(5);
  assert.equal(results[0].status,'unavailable');assert.ok(statuses.includes('unavailable'));checker.destroy();
});

test('postMessage failure is contained and reported unavailable',async()=>{
  const results=[];class BrokenWorker extends FakeWorker{postMessage(){throw Error('blocked');}}
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:()=>{},workerFactory:()=>new BrokenWorker(),debounceMs:1});
  checker.check('x = 1','a.py');await sleep(5);assert.equal(results[0].status,'unavailable');checker.destroy();
});

test('clear suppresses a stale worker error and the next check can recover',async()=>{
  const workers=[],results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:()=>{},workerFactory:()=>{const worker=new FakeWorker();workers.push(worker);return worker;},debounceMs:1});
  checker.check('one','a.py');await sleep(5);checker.clear();workers[0].fail();assert.deepEqual(results,[]);
  checker.check('two','a.py');await sleep(5);assert.equal(workers.length,2);checker.destroy();
});

test('destroy prevents further work and terminates the compiler',async()=>{
  const worker=new FakeWorker(),results=[];
  const checker=createSyntaxChecker({onResult:value=>results.push(value),onStatus:()=>{},workerFactory:()=>worker,debounceMs:1});
  checker.check('one','a.py');await sleep(5);checker.destroy();checker.check('two','a.py');worker.emit({id:1,status:'checked',diagnostics:[]});
  assert.equal(worker.terminated,true);assert.deepEqual(results,[]);
});

test('the exact worker compiler returns diagnostics without executing learner code',()=>{
  const block=workerSource.match(/py\.runPythonAsync\(`([\s\S]*?)`\)/)?.[1];
  assert.ok(block,'extract actual worker compiler');
  const samples=['raise RuntimeError("must not execute")\n','def f()\n    return 1\n','return 1\n'];
  const harness='import json,sys\npayload=json.load(sys.stdin)\nfor source in payload["samples"]:\n env={"syntax_source":source,"syntax_filename":"lesson.py"}\n exec(payload["block"],env)\n print(json.dumps(env["syntax_result"]))\n';
  const run=spawnSync('python3',['-c',harness],{input:JSON.stringify({block,samples}),encoding:'utf8'});
  assert.equal(run.status,0,run.stderr);
  const results=run.stdout.trim().split('\n').map(line=>JSON.parse(line));
  assert.deepEqual(results[0],[]);
  assert.equal(results[1][0].line,1);assert.match(results[1][0].message,/expected/);
  assert.match(results[2][0].message,/outside function/);
});
