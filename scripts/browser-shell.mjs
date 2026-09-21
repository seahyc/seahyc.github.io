// Shared shell regression: all storage and edits stay in disposable browser context.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium} from 'playwright';
const root=path.resolve(fileURLToPath(new URL('../static/',import.meta.url)));
const server=createServer(async(req,res)=>{
 try {
  let relative=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(relative.endsWith('/'))relative+='index.html';
  const file=path.resolve(root,'.'+relative);
  if(!file.startsWith(root+path.sep))throw Error('not found');
  const body=await readFile(file);
  res.setHeader('Content-Type',({'.html':'text/html','.mjs':'text/javascript','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream');
  res.end(body);
 } catch {res.writeHead(404);res.end('Not found');}
});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}/practice/`;
let browser;
try {
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:950}});
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
 const nav=()=>page.locator('#workspace-nav');
 const editor=()=>page.getByRole('textbox',{name:'Python code editor'});
 const width=async()=>Math.round((await page.locator('.code-pane').boundingBox()).width);
 async function navigation(current) {
  await nav().waitFor();
  for(const label of ['Queue','Files','Experiments']) {
   const link=nav().getByRole('link',{name:label,exact:true});
   assert.equal(await link.count(),1,`${current}: one ${label} link`);
   assert.equal(await link.getAttribute('aria-current'),label===current?'page':null,`${current}: active ${label}`);
  }
  assert.equal(await page.locator('body > header:visible').count(),0,`${current}: header hidden`);
 }
 async function shown(id,expected) {
  assert.equal(await page.locator('#'+id).getAttribute('aria-expanded'),String(expected),`${id}: aria-expanded`);
 }
 async function setShown(id,value) {
  const button=page.locator('#'+id);
  if((await button.getAttribute('aria-expanded'))!==String(value))await button.click();
  await shown(id,value);
 }
 async function noOverflow(label) {
  const dimensions=await page.evaluate(()=>({width:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.ok(dimensions.width<=dimensions.viewport,`${label}: horizontal overflow ${JSON.stringify(dimensions)}`);
 }
 await page.goto(base+'?library=1#tiny-count-cold');
 await editor().waitFor();
 await navigation('Files');
 const activeId=await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).activeExerciseId);
 assert.ok(activeId,'saved exercise selected');
 for(const id of ['toggle-sidebar','toggle-brief','toggle-output'])await setShown(id,true);
 const fullWidth=await width();
 await page.locator('#toggle-sidebar').click();
 await shown('toggle-sidebar',false);
 await page.waitForFunction(()=>document.body.classList.contains('sidebar-collapsed'));
 const sidebarWidth=await width();
 assert.ok(sidebarWidth>fullWidth,`sidebar collapse grows code: ${fullWidth} -> ${sidebarWidth}`);
 await page.locator('#toggle-brief').click();
 await shown('toggle-brief',false);
 await page.waitForFunction(()=>document.body.classList.contains('brief-collapsed'));
 const briefWidth=await width();
 assert.ok(briefWidth>sidebarWidth,`brief collapse grows code: ${sidebarWidth} -> ${briefWidth}`);
 await page.locator('#toggle-output').click();
 await shown('toggle-output',false);
 await page.waitForFunction(()=>document.body.classList.contains('output-collapsed'));
 const outputWidth=await width();
 assert.ok(outputWidth>briefWidth,`output collapse grows code: ${briefWidth} -> ${outputWidth}`);
 const fileOptions=await page.locator('#file option').evaluateAll(options=>options.map(option=>option.value));
 const secondFile=fileOptions.find(name=>name==='src/main.py') || fileOptions.find(name=>name!=='src/tests.py' && name!==fileOptions[0]);
 if(secondFile)await page.locator('#file').selectOption(secondFile);
 const selectedFile=await page.locator('#file').inputValue();
 const original=await page.locator('#editor').inputValue();
 const draft='# shell persistence regression: draft comment only\n'+original;
 await editor().fill(draft);
 await page.waitForFunction(()=>JSON.stringify(JSON.parse(localStorage.getItem('coding-practice-v1')).exercises).includes('shell persistence regression'));
 const preferences=await page.evaluate(()=>localStorage.getItem('workspace-layout-v1'));
 assert.ok(preferences,'layout preference stored');
 await page.reload();await editor().waitFor();
 for(const id of ['toggle-sidebar','toggle-brief','toggle-output'])await shown(id,false);
 assert.ok((await editor().innerText()).includes('shell persistence regression'));
 await nav().getByRole('link',{name:'Experiments',exact:true}).click();
 await page.locator('#hypothesis').waitFor();await navigation('Experiments');
 await shown('toggle-sidebar',false);
 assert.equal(await page.evaluate(()=>localStorage.getItem('workspace-layout-v1')),preferences);
 // Native keyboard activation must use the same persisted sidebar state.
 await page.locator('#toggle-sidebar').focus();await page.keyboard.press('Space');await shown('toggle-sidebar',true);
 await page.keyboard.press('Enter');await shown('toggle-sidebar',false);
 await nav().getByRole('link',{name:'Queue',exact:true}).click();
 await navigation('Queue');
 await nav().getByRole('link',{name:'Files',exact:true}).click();
 await editor().waitFor();await navigation('Files');
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).activeExerciseId),activeId);
 assert.equal(await page.locator('#file').inputValue(),selectedFile,'selected source file restored');
 assert.equal(await page.locator('#editor').inputValue(),draft,'draft source preserved exactly');
 for(const id of ['toggle-sidebar','toggle-brief','toggle-output'])await shown(id,false);
 await page.screenshot({path:'/tmp/workspace-shell-desktop.png',fullPage:true});
 // Verify full layouts and persisted collapsed layouts at narrower widths on every surface.
 for(const viewportWidth of [1050,390]) {
  await page.setViewportSize({width:viewportWidth,height:950});
  for(const id of ['toggle-sidebar','toggle-brief','toggle-output'])await setShown(id,true);
  await noOverflow(`${viewportWidth} Files expanded`);
  for(const id of ['toggle-sidebar','toggle-brief','toggle-output'])await setShown(id,false);
  await noOverflow(`${viewportWidth} Files collapsed`);
  await nav().getByRole('link',{name:'Experiments',exact:true}).click();
  await page.locator('#hypothesis').waitFor();await navigation('Experiments');
  await setShown('toggle-sidebar',true);await noOverflow(`${viewportWidth} Experiments expanded`);
  await setShown('toggle-sidebar',false);await noOverflow(`${viewportWidth} Experiments collapsed`);
  await nav().getByRole('link',{name:'Queue',exact:true}).click();
  await navigation('Queue');await noOverflow(`${viewportWidth} Queue`);
  await nav().getByRole('link',{name:'Files',exact:true}).click();
  await editor().waitFor();await navigation('Files');
 }
 await page.screenshot({path:'/tmp/workspace-shell-mobile.png',fullPage:true});
 // A multi-file task must resume its selected document, not merely its exercise.
 await page.goto(base+'path/');
 await page.goto(base+'?library=1#object-graph-codec');
 await editor().waitFor();
 await page.locator('#file').selectOption('DESIGN.md');
 const designDraft='# Working notes\nA navigation regression marker; no solution supplied.\n';
 await editor().fill(designDraft);
 await nav().getByRole('link',{name:'Experiments',exact:true}).click();
 await navigation('Experiments');
 await nav().getByRole('link',{name:'Files',exact:true}).click();
 await editor().waitFor();
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).activeExerciseId),'object-graph-codec');
 assert.equal(await page.locator('#file').inputValue(),'DESIGN.md');
 assert.equal(await page.locator('#editor').inputValue(),designDraft);
 assert.deepEqual(errors,[],'no browser console or runtime errors');
 console.log(`PASS shared navigation, active links, header removal; code widths ${fullWidth} → ${sidebarWidth} → ${briefWidth} → ${outputWidth}`);
 console.log('PASS sidebar/brief/output persistence, keyboard toggles, cross-page resume and draft preservation including DESIGN.md');
 console.log('PASS expanded/collapsed layouts at 1050px and 390px across all three pages; zero console/runtime errors');
} finally {
 if(browser)await browser.close();
 await new Promise(resolve=>server.close(resolve));
}
