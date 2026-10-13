// End-to-end check of the screen page in headless Chromium: start the placement screen,
// write a reference solution, run tests, submit, and read the coach report.
// Usage: node scripts/screen.browser.mjs [--references DIR] (needs network for Pyodide)
import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..','static');
const refs=process.argv.includes('--references')?process.argv[process.argv.indexOf('--references')+1]:path.join(process.env.HOME,'Documents/act2/interview-prep/cognition-screen/references');
import {existsSync} from 'node:fs';
if(!existsSync(path.join(refs,'graph-clone.py'))){console.log(`skipped: private references not found at ${refs}`);process.exit(0);}
const types={'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.py':'text/plain','.svg':'image/svg+xml'};
const server=http.createServer(async(req,res)=>{
 let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';
 try{const body=await readFile(path.join(root,p));res.writeHead(200,{'content-type':types[path.extname(p)]||'application/octet-stream'});res.end(body);}catch{res.writeHead(404);res.end();}
}).listen(0,'127.0.0.1');
await new Promise(r=>server.once('listening',r));
const base=`http://127.0.0.1:${server.address().port}/practice/screen/`;

const DESIGN=`# Design

## Representation
A memo dictionary maps the id of each source container to its new copy, registered before its children are visited.

## Invariant
Each container is copied exactly once and registered before any child can refer back to it, so aliases and cycles resolve to the copy.

## Complexity
O(n) time and O(n) memory for n reachable values; an explicit stack avoids recursion limits on deep nesting.

## Rejected alternative
Plain recursion is shorter but overflows the interpreter stack around a thousand levels, which the deep test exercises.
`;
const CANDIDATE=`import pytest
from graph_clone import CloneError, clone

def test_cycle():
    a = []
    a.append(a)
    c = clone(a)
    assert c[0] is c

def test_shared_dict():
    s = {}
    c = clone([s, s])
    assert c[0] is c[1] and c[0] is not s

def test_reject_tuple():
    with pytest.raises(CloneError):
        clone({"a": (1,)})

def test_reject_key():
    with pytest.raises(CloneError):
        clone({1: 2})

def test_values_and_order():
    v = {"b": [1, {"c": None}], "a": "x"}
    assert clone(v) == v and list(clone(v)) == ["b", "a"]
`;

const browser=await chromium.launch(process.env.SCREEN_CHROMIUM?{executablePath:process.env.SCREEN_CHROMIUM}:{});
const page=await browser.newPage();
const errors=[];page.on('pageerror',e=>errors.push(String(e.stack||e).slice(0,1500)));page.on('console',m=>{if(process.env.SCREEN_DEBUG)console.log('console:',m.text().slice(0,300));});page.on('dialog',d=>d.accept());
const fail=m=>{console.error('FAIL',m,errors);process.exitCode=1;};
try{
 await page.goto(base);
 await page.waitForSelector('#next:not([hidden])');
 console.log('next:',await page.textContent('#next-title'));
 await page.click('#next');
 await page.waitForSelector('#workspace:not([hidden])');
 const put=async(name,text)=>{
  await page.click(`#files button:text-is("${name}")`);
  await page.focus('.cm-content');
  await page.evaluate(t=>{document.execCommand('selectAll');document.execCommand('insertText',false,t);},text);
 };
 await put('src/graph_clone.py',await readFile(path.join(refs,'graph-clone.py'),'utf8'));
 await put('tests/test_candidate.py',CANDIDATE);
 await put('DESIGN.md',DESIGN);
 const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('cognition-screen-v1')).attempts.at(-1).files['DESIGN.md']);
 if(stored!==DESIGN)fail('editor did not store DESIGN.md verbatim');
 const t0=Date.now();
 await page.click('#run');
 await page.waitForFunction(()=>/passed/.test(document.getElementById('output').textContent),null,{timeout:120000});
 console.log(`run (${Date.now()-t0} ms):\n`+(await page.textContent('#output')).split('\n').slice(0,4).join('\n'));
 const t1=Date.now();
 await page.click('#submit');
 await page.waitForSelector('#result:not([hidden])',{timeout:180000});
 console.log(`submit (${Date.now()-t1} ms):`,await page.textContent('#result-title'));
 console.log((await page.$$eval('#parts tr',rows=>rows.map(r=>r.innerText.replace(/\t/g,' | ')))).join('\n'));
 await page.check('#self-api');await page.check('#self-helpers');await page.check('#self-clean');
 await page.selectOption('#pm-category','none');
 await page.fill('#pm-decision','Chose the memo-before-children representation in minute two; nothing consequential went wrong.');
 const r=await page.evaluate(()=>window.cognitionScreenReport());
 const a=r.attempts[0];
 console.log('report:',JSON.stringify({score:a.score,unseen:a.unseen,firstGreenMin:a.firstGreenMin,killRate:a.mutationKillRate,phases:r.phases.map(p=>`${p.id}:${p.proven}`),next:r.next.type}));
 if(a.score<85)fail(`reference solution scored ${a.score}`);
 if(!r.phases[0].proven)fail('placement pass did not prove fluency');
 if(r.next.type!=='screen'&&r.next.type!=='retake'&&r.next.type!=='ready')fail(`unexpected next step ${r.next.type}`);
 if(errors.length)fail('page errors');
 // Every reference must pass every validator inside Pyodide too, without crashing the runtime.
 const catalog=JSON.parse(await readFile(path.join(root,'practice/screen/exercises.json'),'utf8')).exercises;
 const hidden=JSON.parse(await readFile(path.join(root,'practice/screen/validators.json'),'utf8'));
 for(const e of catalog){
  const files={...e.files,[e.entry]:await readFile(path.join(refs,`${e.id}.py`),'utf8'),[e.candidate]:e.files[e.visible]};
  const t=Date.now();
  const out=await page.evaluate(({files,e,src})=>new Promise(res=>{const w=new Worker('/practice/screen/grader.mjs',{type:'module'});
   const done=v=>{w.terminate();res(v);};
   w.onmessage=({data})=>{if(data.type==='result')done({validators:data.report.validators,mutation:data.report.mutation});if(data.type==='error')done({error:data.message.slice(0,300)});};
   setTimeout(()=>done({error:'timeout after 150 s'}),150000);
   w.postMessage({mode:'submit',files,entry:e.entry,visible:e.visible,candidate:e.candidate,validators:src});}),{files,e,src:hidden[e.id].source});
  const bad=(out.validators||[]).filter(c=>c.status!=='pass');
  console.log(`pyodide ${e.id}: ${out.error||`${out.validators.length-bad.length}/${out.validators.length} validators, mutants real ${out.mutation.real} killed ${out.mutation.killed}`} (${Date.now()-t} ms)`);
  if(out.error||bad.length)fail(`${e.id} reference in Pyodide: ${out.error||bad[0].test+' '+bad[0].detail.slice(-300)}`);
 }
}catch(error){fail(error.stack);}
finally{await browser.close();server.close();}
if(!process.exitCode)console.log('ok: screen end-to-end');
