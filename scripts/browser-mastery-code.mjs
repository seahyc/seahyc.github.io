import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
const base=process.env.PRACTICE_URL||'http://127.0.0.1:8771/practice/';
const context=await browser.newContext({viewport:{width:1280,height:900}}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const key='coding-practice-v1';
const editor=target=>target.getByRole('textbox',{name:'Python code editor'});
const waitId=id=>page.waitForFunction(id=>location.hash==='#'+id&&!!document.querySelector('#editor')?.value,id);
async function solve(id){const source=await fs.readFile(`${process.env.RAMP_REFERENCE_ROOT}/${id}.py`,'utf8');await editor(page).fill(source);await page.locator('#run').click();await page.waitForFunction(()=>/^\d+ checks passed$/.test(document.querySelector('#runtime-state').textContent),null,{timeout:90000});assert.equal(await page.locator('#journey-next').isVisible(),true);}
try{
 await page.goto(base+'#batch-scheduler');await waitId('tiny-filter-guided');
 assert.equal(await page.locator('.curriculum').isVisible(),false);assert.equal(await page.locator('.session-bar').isVisible(),false);assert.equal(await page.locator('#journey-next').isVisible(),false);
 await page.screenshot({path:'/private/tmp/mastery-code-desktop.png'});
 await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/private/tmp/mastery-code-mobile.png'});await page.setViewportSize({width:1280,height:900});
 await page.locator('#run').click();await page.waitForFunction(()=>/^\d+ checks ran · repair needed$/.test(document.querySelector('#runtime-state').textContent),null,{timeout:90000});assert.equal(await page.locator('#journey-next').isVisible(),false);assert.equal(await page.locator('#full-output').evaluate(e=>e.open),false);
 console.log('PASS single task, locked deep link, compact error, mobile layout and failed check cannot advance');
 if(process.env.RAMP_REFERENCE_ROOT){
  await solve('tiny-filter-guided');await page.locator('#journey-next').click();await waitId('tiny-filter-cold');
  assert.equal(await page.locator('#mode').inputValue(),'cold');
  await page.locator('#hint-details summary').click();await page.waitForFunction(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['tiny-filter-cold'].session.assisted===true);
  await solve('tiny-filter-cold');assert.match(await page.locator('#journey-message').innerText(),/with support/);await page.locator('#journey-next').click();
  await waitId('tiny-count-guided');
  const assisted=await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['tiny-filter-cold']);
  assert.equal(assisted.review.phase,'relearning');assert.equal(assisted.review.pending,false);assert.ok(assisted.review.dueAt-Date.now()<=600000&&assisted.review.dueAt>Date.now());
  assert.ok(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['tiny-filter-cold'].files['src/tiny_filter_cold.py'].includes('return result')));
  await editor(page).fill('# my unfinished counting work\npass');await page.reload();await page.waitForFunction(()=>document.querySelector('#editor').value.includes('unfinished counting work'));
  await solve('tiny-count-guided');await page.locator('#journey-next').click();await waitId('tiny-count-cold');await solve('tiny-count-cold');
  assert.equal(await page.locator('#journey-next').innerText(),'Finish for now');
  console.log('PASS real Python 20 new tests, assisted 10-minute relearning schedule, safe alternate pattern, archived solution and reload');
 }
 const newer=await context.newPage();await newer.goto(base);await newer.waitForFunction(()=>!!document.querySelector('#editor')?.value);await editor(newer).fill('# newer work\npass');
 await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('another tab'));assert.ok(await page.locator('#journey-next').isDisabled());assert.equal(await editor(page).getAttribute('contenteditable'),'false');await newer.close();
 console.log('PASS stale tab cannot edit or advance');assert.deepEqual(errors,[]);console.log('PASS no browser page errors');
}finally{await browser.close();}
