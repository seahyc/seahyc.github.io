// Core user journey regression; run only on an isolated local origin.
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
 const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage();
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 const packs=await Promise.all(['ramp','curriculum','frontier','variations','research','neural'].map(async name=>JSON.parse(await readFile(path.join(root,'practice',name+'.json'),'utf8'))));
 const catalog=packs.flatMap(p=>p.exercises);
 const frontierIds=new Set([...packs[2].exercises,...packs[4].exercises,...packs[5].exercises].map(e=>e.id));
 await page.goto(base+'?library=1#probe-filtering');
 await page.getByRole('textbox',{name:'Python code editor'}).waitFor();
 // Exercise real keyboard events: filling a finished solution misses keymap bugs.
 const keyboardEditor=page.getByRole('textbox',{name:'Python code editor'});
 await keyboardEditor.fill('');
 await keyboardEditor.pressSequentially('def f():');
 await keyboardEditor.press('Enter');
 await keyboardEditor.pressSequentially('for x in xs:');
 await keyboardEditor.press('Enter');
 await keyboardEditor.pressSequentially('out.append(x)');
 assert.equal(await keyboardEditor.innerText(),'def f():\n    for x in xs:\n        out.append(x)');
 await keyboardEditor.press('Tab');
 assert.equal(await keyboardEditor.innerText(),'def f():\n    for x in xs:\n        out.append(x)   ','Tab must not shift the statement');
 await keyboardEditor.press('Enter');
 await keyboardEditor.pressSequentially('done = True');
 assert.match(await keyboardEditor.innerText(),/\n        done = True$/);
 await keyboardEditor.press('Shift+Tab');
 assert.match(await keyboardEditor.innerText(),/\n    done = True$/);
 await keyboardEditor.press('Escape');
 await keyboardEditor.press('Tab');
 assert.equal(await keyboardEditor.evaluate(el=>el===document.activeElement),false,'Esc then Tab must leave the editor');
 console.log('PASS real editor keyboard: nested Enter, inline soft Tab, dedent, keyboard escape');

 for(let i=0;i<catalog.length;i++){
  await page.locator('.lesson').nth(i).click();
  assert.equal(await page.locator('#title').textContent(),catalog[i].title);
  if(frontierIds.has(catalog[i].id)){
   assert.equal(await page.locator('#example-lab').evaluate(e=>e.hidden),false,`${catalog[i].id}: input availability remains explicit`);
   assert.equal(await page.locator('#example-input').isEnabled(),false,`${catalog[i].id}: multi-file mocks do not pretend to accept one JSON input`);
   assert.equal(await page.locator('#example-run').isEnabled(),false);
   continue;
  }
  assert.equal(await page.locator('#example-lab').evaluate(e=>e.hidden),false,`${catalog[i].id}: missing explorer`);
  assert.equal(await page.locator('#example-lab').evaluate(e=>e.tagName),'SECTION',`${catalog[i].id}: explorer must be an always-visible section`);
  assert.equal(await page.locator('#example-lab > h2').isVisible(),true,`${catalog[i].id}: explorer heading must stay visible`);
  await page.locator('#example-input').waitFor({state:'visible'});
  assert.ok((await page.locator('#example-input').inputValue()).trim(),`${catalog[i].id}: missing input`);
  assert.equal(await page.locator('#example-run').isEnabled(),true);
 }
 console.log(`PASS browser explorer is available for ${catalog.length-frontierIds.size} single-input tasks and explicitly unavailable for ${frontierIds.size} multi-file mocks`);
 await context.close();
 // The managed default must expose the same feature, with real Python execution.
 const managed=await browser.newContext({viewport:{width:1280,height:900}}),p=await managed.newPage();
 p.on('pageerror',error=>errors.push(error.message));
 await p.goto(base+'?learn=1');await p.locator('#title').filter({hasText:'Keep Ready Jobs'}).waitFor();
 assert.equal(await p.locator('.testing-pane').evaluate((pane)=>pane.contains(document.querySelector('#example-lab'))&&pane.contains(document.querySelector('#run-results'))),true,'Explorer and run feedback share the testing pane');
 const evidence=()=>p.evaluate(()=>{const s=JSON.parse(localStorage.getItem('coding-practice-v1'));const e=s.exercises['probe-filtering'];return {attempts:s.attempts,events:s.learningEvents,passed:e.passed,cold:e.session.cold,assisted:e.session.assisted};});
 const before=await evidence();assert.equal(before.assisted,false);assert.equal(before.cold,true);
 await p.locator('#example-input').fill('[{"ready":true,"id":"custom"}]');
 await p.locator('#example-run').click();
 await p.waitForFunction(()=>document.querySelector('#example-actual').textContent.includes('NotImplemented')||document.querySelector('#example-actual').textContent.toLowerCase().includes('placeholder'),null,{timeout:120000});
 assert.deepEqual(await evidence(),before,'An experiment error must not change learning evidence');
 const editor=p.getByRole('textbox',{name:'Python code editor'});
 await editor.fill('def ready_jobs(jobs):\n    return [job for job in jobs if job.get("ready") is True]\n');
 const beforeSuccess=await evidence();
 await p.locator('#example-run').click();
 await p.waitForFunction(()=>document.querySelector('#example-actual').textContent.includes('custom'),null,{timeout:120000});
 assert.match(await p.locator('#example-expected').textContent(),/predict|custom/i);
 assert.deepEqual(await evidence(),beforeSuccess,'An example success must not award test or mastery credit');
 await p.locator('#example-input').fill('{');
 assert.ok(!(await p.locator('#example-actual').textContent()).includes('custom'),'Editing input clears stale output');
 await p.locator('#example-run').click();
 assert.match(await p.locator('#example-actual').textContent(),/JSON|invalid|unexpected|expected/i);
 console.log('PASS managed explorer: unfinished code error, real edited-code output, custom expectations, invalid JSON, no evidence changes');
 await p.locator('#run').click();
 await p.waitForFunction(()=>document.querySelector('#runtime-state').textContent==='6 checks passed',null,{timeout:120000});
 assert.match(await p.locator('#case-feedback').textContent(),/6 of 6 checks passed/);
 assert.equal(await p.locator('#journey-next').isVisible(),true);
 console.log('PASS actual test suite reports all six checks and a visible next step');
 assert.equal(await p.locator('.check-details').evaluate(el=>el.open),false,'Passing checks start collapsed');
 assert.ok(await p.evaluate(()=>{const next=document.querySelector('#journey-next').getBoundingClientRect(),results=document.querySelector('#run-results').getBoundingClientRect();return next.top>=results.top&&next.bottom<=results.bottom&&next.top-results.top<=Math.min(180,results.height*.4); }),'Next step must be visible near the top of the feedback pane after passing');
 await p.locator('#hint-details > summary').click();
 await p.locator('.worked-example > summary').waitFor();
 const pageHeight=await p.evaluate(()=>document.documentElement.scrollHeight);
 await p.locator('.worked-example > summary').click();
 await p.locator('.check-details > summary').click();
 await p.locator('#full-output > summary').click();
 const layout=()=>p.evaluate(()=>{
  const rect=selector=>{const r=document.querySelector(selector).getBoundingClientRect();return {top:r.top,right:r.right,bottom:r.bottom,left:r.left,width:r.width,height:r.height};};
  const results=document.querySelector('#run-results');
  return {header:rect('header'),editor:rect('#code-editor'),run:rect('#run'),exampleInput:rect('#example-input'),exampleRun:rect('#example-run'),panes:rect('.panes'),brief:rect('.brief-pane'),code:rect('.code-pane'),testing:rect('.testing-pane'),results:rect('#run-results'),resultsOverflow:getComputedStyle(results).overflowY,height:innerHeight,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,pageHeight:document.documentElement.scrollHeight};
 });
 if(await p.locator('#toggle-sidebar').getAttribute('aria-expanded')==='true')await p.locator('#toggle-sidebar').click();
 let bounds=await layout();
 assert.ok(bounds.pageHeight<=pageHeight+2,'Expanded support and results must not lengthen the page');
 for(const height of [900,720]){
  await p.setViewportSize({width:1280,height});bounds=await layout();
  assert.ok(bounds.header.height<=64,'Desktop header stays compact');
  assert.ok(bounds.panes.top<=110&&bounds.panes.bottom<=height+2,'Desktop workspace stays within the viewport');
  assert.ok(bounds.panes.width>=bounds.width*.95,'Desktop panes use at least 95% of the viewport width');
  assert.ok(bounds.panes.left<=12&&bounds.width-bounds.panes.right<=12,'Desktop workspace keeps at most 12px side gutters');
  assert.ok(bounds.brief.left<bounds.code.left&&bounds.code.left<bounds.testing.left,'Desktop workspace keeps task, code, and testing as three columns');
  assert.ok(bounds.editor.height>=bounds.code.height-180,'Editor fills the height available in the code pane');
  assert.ok(bounds.run.top>=0&&bounds.run.bottom<=height,'Run action stays in viewport');
  assert.ok(bounds.exampleInput.top>=0&&bounds.exampleInput.bottom<=height,'Example input stays in the viewport');
  assert.ok(bounds.exampleRun.top>=0&&bounds.exampleRun.bottom<=height,'Example run action stays in the viewport');
  assert.ok(bounds.results.top>=bounds.testing.top&&bounds.results.bottom<=bounds.testing.bottom+2,'Run feedback stays bounded by the testing pane');
  assert.match(bounds.resultsOverflow,/auto|scroll/,'Run feedback owns its scrolling area');
 }
 await p.setViewportSize({width:390,height:844});bounds=await layout();
 assert.ok(bounds.scrollWidth<=bounds.width,'Mobile layout must not overflow horizontally');
 assert.ok(bounds.brief.height<=500,'Expanded mobile brief stays bounded');
 assert.ok(await p.locator('#journey-next').isVisible());
 await p.setViewportSize({width:1280,height:900});
 console.log('PASS expanded workspace stays bounded on desktop and mobile; editor and actions remain usable');
 await editor.fill('def ready_jobs(jobs):\n    return []\n');
 await p.locator('#run').click();
 await p.waitForFunction(()=>document.querySelector('#runtime-state').textContent.includes('repair needed'),null,{timeout:120000});
 assert.equal(await p.locator('.check-details').evaluate(el=>el.open),true,'Failing checks should open automatically');
 assert.equal(await p.locator('#run-results').evaluate(el=>el.scrollTop),0,'A fresh run starts feedback at the first result');
 console.log('PASS failed checks open automatically at the top of the feedback pane');

 // A representative function with multiple arguments.
 await p.goto(base+'?library=1&case=arguments#probe-windows');await p.locator('#title').filter({hasText:'Rolling Totals'}).waitFor();await editor.waitFor();
 await editor.fill('def rolling_totals(values, width):\n    if width <= 0 or width > len(values):\n        return []\n    return [sum(values[i:i+width]) for i in range(len(values)-width+1)]\n');
 await p.locator('#example-input').fill('[[1, 4, 2], 2]');await p.locator('#example-run').click();
 await p.waitForFunction(()=>document.querySelector('#example-actual').textContent.replace(/\s/g,'')==='[5,6]',null,{timeout:120000});
 console.log('PASS browser multiple-argument input produces real output');
 // Callback exercises need a small Python driver, not JSON pretending to encode functions.
 await p.goto(base+'?library=1&case=callback#probe-routing');await p.locator('#title').filter({hasText:'Route Named Actions'}).waitFor();await editor.waitFor();
 await editor.fill('def route_action(handlers, request):\n    name = request["action"]\n    if name not in handlers:\n        return {"ok": False, "error": "unknown"}\n    return {"ok": True, "value": handlers[name](request.get("payload"))}\n');
 await p.locator('#example-input').fill('from task import route_action\nprint(route_action({"double": lambda value: value * 2}, {"action": "double", "payload": 7}))');
 await p.locator('#example-run').click();await p.waitForFunction(()=>document.querySelector('#example-actual').textContent.includes('14'),null,{timeout:120000});
 console.log('PASS browser Python callback driver uses learner implementation');
 assert.deepEqual(errors,[]);
 console.log('PASS no browser application errors');
}finally{await browser?.close();server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
