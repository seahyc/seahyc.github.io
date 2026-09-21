// Core user journey regression; run only on an isolated local origin.
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=path.resolve(fileURLToPath(new URL('../static/',import.meta.url)));
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
 // New primitive really loads in the existing execution console, with its editable candidate tests.
 await page.goto(base+'?library=1#gradient-check');await page.getByRole('textbox',{name:'Python code editor'}).waitFor();
 await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('coding-practice-v1')||'{}').exercises?.['gradient-check']?.attempts>0,{},{timeout:120000});
 assert.ok(!await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['gradient-check'].passed));
 const refs=JSON.parse(execFileSync('python3',['-c',`import ast,json,pathlib; t=ast.parse(pathlib.Path('scripts/verify-research.py').read_text()); print(json.dumps(next(ast.literal_eval(n.value) for n in t.body if isinstance(n,ast.Assign) and any(isinstance(x,ast.Name) and x.id=='REFERENCES' for x in n.targets))))`],{encoding:'utf8'}));
 await page.getByRole('textbox',{name:'Python code editor'}).fill(refs['gradient-check']);await page.locator('#run').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('coding-practice-v1')||'{}').exercises?.['gradient-check']?.lastResult==='pass',{},{timeout:120000});
 await page.goto(base+'lab/');await page.locator('#next').click();await page.locator('#title').filter({hasText:'A complete learning loop'}).waitFor();
 assert.deepEqual(errors,[]);console.log('PASS journal persistence, no skip on visit, result rejection/import, backup, zip, desktop/mobile, and real Pyodide starter failure');
}finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
