// Real local companion, isolated job archive and browser storage. Never alters learner records.
import {spawn,execFileSync} from 'node:child_process';
import {readFile,writeFile,mkdtemp,cp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {releasePractice} from './release-practice.mjs';
const repo=path.resolve(new URL('../',import.meta.url).pathname);
const temp=await mkdtemp(path.join(tmpdir(),'browser-native-'));
const installed=JSON.parse(await readFile(path.join(process.env.HOME,'Library/Application Support/Frontier Workspace/config.json'),'utf8'));
const port=18765,origin=`http://127.0.0.1:${port}`;
await cp(path.join(repo,'static/practice'),path.join(temp,'static/practice'),{recursive:true});
const native=path.join(temp,'static/practice/lab/native.mjs');await writeFile(native,(await readFile(native,'utf8')).replaceAll('http://127.0.0.1:8765',origin));
await releasePractice(path.join(temp,'static/practice'),'native-browser-verification');
const config={...installed,port,home:path.join(temp,'state'),static:path.join(temp,'static'),min_free_bytes:0};
await writeFile(path.join(temp,'config.json'),JSON.stringify(config));
const service=spawn(installed.runtimes.systems.python,[path.join(repo,'runner/server.py'),'--config',path.join(temp,'config.json')],{stdio:['ignore','pipe','pipe']});
let output='';service.stdout.on('data',d=>output+=d);service.stderr.on('data',d=>output+=d);
let browser;
const reference=file=>execFileSync(installed.runtimes.systems.python,['-c',`import ast\np=ast.parse(open(${JSON.stringify(path.join(repo,'scripts',file))}).read())\nprint(next(ast.literal_eval(n.value) for n in p.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='REFERENCE' for t in n.targets)),end='')`],{encoding:'utf8'});
try{
 for(let n=0;n<100;n++){if(service.exitCode!==null)throw Error(output);try{if((await fetch(origin+'/')).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(origin+'/practice/lab/');await page.locator('#title').filter({hasText:'Gradients you can test'}).waitFor();
 await page.locator('#track').selectOption('posttrain');await page.getByRole('button',{name:'Audit the reward and data pipeline',exact:false}).click();
 await page.locator('#run-target').selectOption('mac');await page.locator('#run-scope').selectOption('full');
 await page.locator('#native-panel > summary').click();
 const popupPromise=page.waitForEvent('popup');await page.locator('#native-pair').click();const popup=await popupPromise;
 await popup.getByRole('button',{name:'Pair browser',exact:true}).click();await page.locator('#native-status').filter({hasText:'Connected'}).waitFor();
 await page.getByRole('textbox',{name:'Python code editor'}).fill(reference('verify-advanced-systems.py'));
 await page.locator('#execute-seeds').click();await page.locator('#reports').filter({hasText:'3 reports · 3 passed'}).waitFor({timeout:45000});
 assert.equal(await page.evaluate(()=>localStorage.getItem('coding-practice-v1')),null);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).nativeImportedJobs.length),3);
 await page.locator('#native-refresh').click();await page.waitForTimeout(500);assert.match(await page.locator('#reports').textContent(),/^3 reports/);
 await page.locator('#native-jobs button').first().click();await page.locator('#native-group').filter({hasText:'3 passed'}).waitFor();
 const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:/Download result.json/}).click();assert.equal((await downloadPromise).suggestedFilename(),'result.json');
 console.log('PASS real pairing, released assets, immutable three-seed CPU jobs, artifact download and deduplicated grading');
 // Real Gymnasium training through the service, then resume a completed checkpoint.
 await page.locator('#track').selectOption('rl');await page.getByRole('button',{name:'CartPole',exact:false}).click();
 await page.getByRole('textbox',{name:'Python code editor'}).fill(reference('verify-gym-reproduction.py'));await page.locator('#run-scope').selectOption('smoke');await page.locator('#execute').click();
 await page.locator('#reports').filter({hasText:'1 reports · 1 passed'}).waitFor({timeout:180000});
 await page.getByRole('button',{name:'Resume checkpoint',exact:true}).click();await page.locator('#reports').filter({hasText:'2 reports · 2 passed'}).waitFor({timeout:60000});
 assert.match(await page.locator('#native-group').textContent(),/mean/);
 await page.screenshot({path:'/tmp/frontier-native-browser.png',fullPage:true});
 console.log('PASS real Gymnasium training, reports/learning curves/checkpoint artifacts and checkpoint resume through browser');
 // A running native job survives navigation; cancellation remains available globally.
 await page.getByRole('textbox',{name:'Python code editor'}).fill('import time\ntime.sleep(60)\n');await page.locator('#execute').click();
 await page.locator('#track').selectOption('posttrain');await page.getByRole('button',{name:'Audit the reward and data pipeline',exact:false}).click();
 await page.getByRole('button',{name:'Cancel job',exact:true}).click();await page.locator('#native-log').filter({hasText:'cancelled'}).waitFor({timeout:20000});
 await page.reload();await page.locator('#native-panel > summary').click();await page.locator('#native-connect').click();await page.locator('#native-status').filter({hasText:'Connected'}).waitFor();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).nativeImportedJobs.length),5);
 console.log('PASS navigation-safe queue, cancellation and reconnect without duplicate reports');
 // Restoring a blank backup pauses automatic import until explicit reconnect.
 const backup={version:1,track:'rl',selected:'gym-ppo',entries:{}};
 page.once('dialog',d=>d.accept());await page.locator('#import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
 await page.locator('#notice').filter({hasText:'Workspace restored'}).waitFor();await page.waitForTimeout(3500);
 assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries['gym-ppo'].reports),[]);
 assert.match(await page.locator('#native-status').textContent(),/Disconnected/);
 assert.equal(errors.length,0,errors.join('\n'));
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);
 console.log('PASS backup replacement isolation, no page errors and mobile width');
 const auth=await page.evaluate(()=>sessionStorage.getItem('frontier-runner-token'));
 for(const [pkg,assessment] of [['torch','attention-kernel'],['jax','dense-moe']]){
  const response=await fetch(origin+'/api/jobs',{method:'POST',headers:{Authorization:'Bearer '+auth,'Content-Type':'application/json'},body:JSON.stringify({requestId:crypto.randomUUID(),package:pkg,assessment,source:reference('verify-advanced-'+pkg+'.py'),seeds:[17],scope:'smoke',device:'cpu'})});
  assert.equal(response.status,201);const id=(await response.json()).jobs[0].id;let result;
  for(let i=0;i<360;i++){result=await (await fetch(origin+'/api/jobs/'+id,{headers:{Authorization:'Bearer '+auth}})).json();if(['completed','failed','cancelled'].includes(result.status))break;await new Promise(r=>setTimeout(r,500));}
  assert.equal(result.report?.status,'passed',JSON.stringify(result));console.log('PASS native '+pkg+' '+assessment+' CPU sandbox grading');
 }

}finally{
 await browser?.close();service.kill('SIGTERM');await new Promise(r=>{if(service.exitCode!==null)r();else service.once('exit',r);});
 if(process.env.KEEP_NATIVE_TEST)console.log('Test artifacts:',temp);else await rm(temp,{recursive:true,force:true});
}
