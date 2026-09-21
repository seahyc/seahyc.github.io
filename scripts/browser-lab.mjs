// Core user journey regression; run only on an isolated local origin.
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {readFile,mkdtemp,cp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {releasePractice} from './release-practice.mjs';
import {createServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const sourceRoot=path.resolve(fileURLToPath(new URL('../static/',import.meta.url)));
const root=await mkdtemp(path.join(tmpdir(),'released-lab-'));
await cp(path.join(sourceRoot,'practice'),path.join(root,'practice'),{recursive:true});
await releasePractice(path.join(root,'practice'),'browser-release-test');
const server=createServer(async(req,res)=>{
 try{
  let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(relative.endsWith('/'))relative+='index.html';
  const file=path.resolve(root,'.'+relative);if(!file.startsWith(root+path.sep))throw Error('not found');
  const body=await readFile(file);res.setHeader('Content-Type',({'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');res.end(body);
 }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/practice/`;
let browser;
try{
 browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:950}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base+'lab/');await page.locator('#title').filter({hasText:'Gradients you can test'}).waitFor();
 await page.locator('#next').click();assert.equal(await page.locator('#title').textContent(),'Gradients you can test');
 await page.locator('#hypothesis').fill('A finite difference should agree with the analytic derivative away from floating point cancellation.');
 await page.reload();assert.match(await page.locator('#hypothesis').inputValue(),/finite difference/);
 await page.locator('#track').selectOption('posttrain');
 await page.getByRole('button',{name:'Preference policy',exact:false}).click();
 await page.locator('#findings').fill('Learning reduced the held-out loss relative to the unchanged reference. Next I will vary preference noise while keeping the split fixed.');
 const report={schemaVersion:1,track:'posttrain',seed:17,candidateSha256:'a'.repeat(64),evaluatorSha256:'b'.repeat(64),metrics:{heldout_accuracy:.94,seed_accuracies:[.94,.95,.93],preference_loss:.3,uniform_loss:Math.log(2),uniform_accuracy:.5},checks:{accuracy_each_split:true,preference_loss_improves:true},status:'passed'};
 await page.locator('#report').setInputFiles({name:'result.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(report))});
 await page.locator('#reports').filter({hasText:'1 reports'}).waitFor();
 await page.locator('#report').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...report,checks:{accuracy_each_split:false,preference_loss_improves:true}}))});
 await page.locator('#notice').filter({hasText:/passing report|checks|metric/i}).waitFor();assert.match(await page.locator('#reports').textContent(),/1 reports/);
 await page.reload();await page.locator('#reports').filter({hasText:'1 reports'}).waitFor();
 const downloadPromise=page.waitForEvent('download');await page.locator('#export').click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'experiment-workspace.json');
 const archive=await page.request.get(base+'lab/workspace.zip');assert.equal(archive.status(),200);assert.equal((await archive.body()).subarray(0,2).toString(),'PK');
 await page.screenshot({path:'/tmp/experiment-workspace-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);await page.screenshot({path:'/tmp/experiment-workspace-mobile.png',fullPage:true});
 // Real browser CPU evaluation, including TODO failure, frozen-seed suite and draft persistence.
 const kitReference=execFileSync('python3',['-c',`import ast,pathlib; t=ast.parse(pathlib.Path('scripts/verify-lab-kit.py').read_text()); print(next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='REFERENCE' for x in n.targets)))`],{encoding:'utf8'});
 await page.setViewportSize({width:1440,height:950});
 await page.locator('#execute').waitFor({state:'visible'});
 await page.locator('#execute').click();await page.locator('#run-status').filter({hasText:/failed.*NotImplementedError/}).waitFor({timeout:120000});
 for(const [lane,title] of [['posttrain','Preference policy'],['rl','Experience to improvement'],['infra','Quantization under measurement'],['robotics','Learn a feedback controller']]){
  await page.locator('#track').selectOption(lane);await page.getByRole('button',{name:title,exact:false}).click();
  await page.waitForFunction(()=>!document.querySelector('#execute').disabled);
  await page.getByRole('textbox',{name:'Python code editor'}).fill(kitReference);
  await page.locator('#execute').click();await page.locator('#run-status').filter({hasText:/^passed/}).waitFor({timeout:120000});
 }
 await page.reload();await page.waitForFunction(()=>!document.querySelector('#execute').disabled);
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries['robotics-bench'].source),kitReference);
 await page.locator('#execute-seeds').click();await page.locator('#run-status').filter({hasText:/^passed/}).waitFor({timeout:120000});
 assert.match(await page.locator('#reports').textContent(),/3 distinct seeds/);
 // Infinite candidate is isolated; Stop records failure and the editor stays usable.
 await page.getByRole('textbox',{name:'Python code editor'}).fill('while True: pass');
 await page.locator('#execute').click();await page.locator('#stop-execution').click();
 await page.locator('#run-status').filter({hasText:/Execution stopped/}).waitFor();
 await page.getByRole('textbox',{name:'Python code editor'}).fill(kitReference);
 const systemsReference=execFileSync('python3',['-c',`import ast,pathlib; t=ast.parse(pathlib.Path('scripts/verify-advanced-systems.py').read_text()); print(next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='REFERENCE' for x in n.targets)))`],{encoding:'utf8'});
 for(const [lane,title,id] of [['posttrain','Audit the reward and data pipeline','posttrain-stress'],['rl','Debug a distributed rollout boundary','rl-stress'],['infra','Checkpoint, resume and serving under faults','infra-stress'],['robotics','Recover from distribution shift','robotics-stress']]){
  await page.locator('#track').selectOption(lane);await page.getByRole('button',{name:title,exact:false}).click();
  await page.waitForFunction(()=>!document.querySelector('#execute').disabled);
  await page.getByRole('textbox',{name:'Python code editor'}).fill(systemsReference);
  await page.locator('#run-scope').selectOption('full');await page.locator('#execute').click();
  await page.locator('#run-status').filter({hasText:/^passed/}).waitFor({timeout:120000});
  const stored=await page.evaluate(id=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries[id].reports.at(-1),id);
  assert.equal(stored.scope,'full');assert.equal(stored.status,'passed');assert.equal(stored.schemaVersion,2);
 }
 await page.locator('#toggle-sidebar').click();await page.screenshot({path:'/tmp/frontier-browser-execution.png',fullPage:true});
 await page.locator('#toggle-sidebar').click();
 // Native JAX projects expose their specific runner and accept honest unsupported reports.
 await page.locator('#track').selectOption('infra');await page.getByRole('button',{name:'Pallas ragged expert expansion',exact:false}).click();
 assert.equal(await page.locator('#execution').isVisible(),true);
 assert.equal(await page.locator('#run-target').inputValue(),'mac');
 assert.match(await page.getByRole('link',{name:'$ download native runner'}).getAttribute('href'),/advanced\/jax\/workspace.zip/);
 const unsupported={schemaVersion:2,assessment:'pallas-ragged',seed:17,sourceHash:'a'.repeat(64),evaluatorHash:'b'.repeat(64),runtime:{python:'3.12',platform:'test',packages:{},device:'cpu'},scope:'accelerator',status:'unsupported',metrics:{},checks:{},unsupported:['accelerator_hardware']};
 await page.locator('#report').setInputFiles({name:'result.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(unsupported))});
 await page.locator('#reports').filter({hasText:'unsupported'}).waitFor();assert.match(await page.locator('#reports').textContent(),/0 passed/);
 // A delayed file read remains attached to the mission where import began.
 await page.locator('#track').selectOption('posttrain');await page.getByRole('button',{name:'Preference policy',exact:false}).click();
 await page.evaluate(()=>{const original=File.prototype.text;File.prototype.text=async function(){if(this.name==='delayed.json')await new Promise(r=>setTimeout(r,800));return original.call(this);};});
 await page.locator('#report').setInputFiles({name:'delayed.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...report,seed:9001}))});
 await page.getByRole('button',{name:'A useful upstream contribution',exact:false}).click();
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries['posttrain-bench'].reports.some(r=>r.seed===9001));
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries['posttrain-contribution'].reports.length),0);
 // Importing a backup discards callbacks from the old execution generation.
 await page.getByRole('button',{name:'Preference policy',exact:false}).click();await page.waitForFunction(()=>!document.querySelector('#execute').disabled);
 await page.getByRole('textbox',{name:'Python code editor'}).fill('while True: pass');await page.locator('#execute').click();
 const backup={version:1,track:'posttrain',selected:'posttrain-bench',entries:{'posttrain-bench':{source:'# replacement draft',hypothesis:'',findings:'',artifact:'',reviewer:'',review:'',reports:[]}}};
 page.once('dialog',dialog=>dialog.accept());
 await page.locator('#import').setInputFiles({name:'backup.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});
 await page.locator('#notice').filter({hasText:'Workspace restored.'}).waitFor();await page.waitForFunction(()=>!document.querySelector('#execute').disabled);
 // A terminated worker's cancelled CDN fetch need not reach network-idle.
 // Ready means replacement source loaded; the cancelled callback already settled.
 await page.locator('#run-status').filter({hasText:/^Ready/}).waitFor();
 const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('experiment-workspace-v1')).entries['posttrain-bench']);
 assert.equal(restored.source,'# replacement draft');assert.equal(restored.reports.length,0);
 // New primitive really loads in the existing execution console, with its editable candidate tests.
 await page.goto(base+'?library=1#gradient-check');await page.getByRole('textbox',{name:'Python code editor'}).waitFor();await page.locator('#title').filter({hasText:'Differentiate a Logistic Loss'}).waitFor();
 await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('coding-practice-v1')||'{}').exercises?.['gradient-check']?.attempts>0,{},{timeout:120000});
 assert.ok(!await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['gradient-check'].passed));
 const refs=JSON.parse(execFileSync('python3',['-c',`import ast,json,pathlib; t=ast.parse(pathlib.Path('scripts/verify-research.py').read_text()); print(json.dumps(next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='REFERENCES' for x in n.targets))))`],{encoding:'utf8'}));
 await page.getByRole('textbox',{name:'Python code editor'}).fill(refs['gradient-check']);await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('coding-practice-v1')||'{}').exercises?.['gradient-check']?.lastResult==='pass',{},{timeout:120000});
 await page.goto(base+'lab/');await page.locator('#next').click();await page.locator('#title').filter({hasText:'A complete learning loop'}).waitFor();
 // Files must expose continuation after a real pass, even with the sidebar hidden.
 await page.goto(base+'?library=1#probe-counting');await page.locator('#title').filter({hasText:'Count Result Codes'}).waitFor();
 const solution='def count_codes(codes):\n    counts = {}\n    for code in codes:\n        counts[code] = counts.get(code, 0) + 1\n    return counts\n';
 await page.getByRole('textbox',{name:'Python code editor'}).fill(solution);await page.locator('#run').click();
 await page.locator('#success-title').filter({hasText:'6 of 6 checks passed'}).waitFor({timeout:120000});
 await page.getByRole('button',{name:/^Next exercise:/}).waitFor();assert.equal(await page.locator('#first-feedback').isVisible(),false);
 await page.reload();await page.getByRole('button',{name:/^Next exercise:/}).waitFor();
 await page.getByRole('button',{name:/^Next exercise:/}).click();
 assert.notEqual(await page.locator('#title').textContent(),'Count Result Codes');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['probe-counting']);assert.equal(saved.files['src/task.py'],solution);assert.equal(saved.lastResult,'pass');
 await page.goto(base+'?library=1#probe-counting');await page.reload();await page.locator('#title').filter({hasText:'Count Result Codes'}).waitFor();
 await page.getByRole('textbox',{name:'Python code editor'}).fill('def count_codes(codes):\n    return {}\n');assert.equal(await page.locator('#journey-next').isVisible(),false);
 await page.locator('#run').click();await page.locator('#first-feedback').filter({hasText:/AssertionError/}).waitFor({timeout:120000});assert.equal(await page.locator('#journey-next').isVisible(),false);
 console.log('PASS Files continuation: pass, reload, next exercise, preserved source and hidden CTA after edits/failure');
 assert.deepEqual(errors,[]);console.log('PASS browser execution: 4 CPU kits + 4 full fault suites, 3-seed run, Stop, drafts, scoped reports, navigation, journal/backup, mobile and primitive regression');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));await rm(root,{recursive:true,force:true});}
