import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,executablePath:process.env.BROWSER_EXECUTABLE});
const base=process.env.PRACTICE_URL||'http://127.0.0.1:8769/practice/';
const context=await browser.newContext({viewport:{width:1100,height:900}}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
async function finishReview(score){
 while(await page.locator('#round-step').isVisible()){await page.locator('#round-notes').fill('Concrete assumptions, boundary trace, expected output, and implementation evidence for this prompt.');await page.locator('#round-next').click();}
 while(await page.locator('#review-step').isVisible()){await page.locator('#rubric-score').selectOption(String(score));await page.locator('#rubric-next').click();}
 await page.locator('#feedback').fill('The boundary trace was specific. Next I will test the weakest assumption with one new counterexample.');
 await page.locator('#completed').check();
 await page.evaluate(()=>{window.__realNow||=Date.now.bind(Date);window.__testOffset=(window.__testOffset||0)+4*60*60*1000;Date.now=()=>window.__realNow()+window.__testOffset;});
 await page.locator('#save-review').click();
}
try{
 await page.goto(base+'path/#session-full-loop');await page.locator('#next-title').filter({hasText:'Keep useful text'}).waitFor();
 assert.equal(await page.locator('.next-card').count(),1);assert.equal(await page.locator('#wizard:visible').count(),0);assert.equal(await page.locator('#roadmap,.phase,.session-button,#gates').count(),0);assert.equal(await page.locator('#next').count(),1);
 await page.screenshot({path:'/private/tmp/mastery-path-desktop.png'});await page.setViewportSize({width:390,height:844});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'/private/tmp/mastery-path-mobile.png'});await page.setViewportSize({width:1100,height:900});
 console.log('PASS one recommendation, no catalog, and locked deep link does not bypass beginner work');
 await page.evaluate(()=>{const now=Date.now(),cold=id=>({coldDays:['2026-01-01'],attempts:1,passed:true,lastResult:'pass',lastAt:now});localStorage.setItem('coding-practice-v1',JSON.stringify({version:1,motivation:'Practice',exercises:{'syntax-faded':cold('syntax-faded'),'python-refresher-1':cold('python-refresher-1')},attempts:[{id:'python-refresher-1',at:now,passed:true,cold:true}]}));});
 await page.reload();await page.locator('#next-title').filter({hasText:'Think Aloud'}).waitFor();await page.locator('#next').click();await page.locator('#round-notes').fill('A persisted draft answer with a concrete exact-boundary trace.');const firstDeadline=await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-interview-path-v1')).sessions['think-aloud'].deadline);await page.reload();assert.equal(await page.locator('#wizard:visible').count(),0);await page.locator('#next').click();assert.match(await page.locator('#round-notes').inputValue(),/persisted draft/);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-interview-path-v1')).sessions['think-aloud'].deadline),firstDeadline);
 assert.match(await page.locator('#round-count').innerText(),/of 6/i);console.log('PASS interview is click-gated, includes sequential follow-ups, and draft plus timer resume after reload');
 await finishReview(0);assert.match(await page.locator('#review-result').innerText(),/revisit evidence/);await page.locator('#outcome-next').click();assert.match(await page.locator('#next-title').innerText(),/Think Aloud/);
 await page.locator('#next').click();await finishReview(2);assert.match(await page.locator('#review-result').innerText(),/Self-rated practice saved/);assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-interview-path-v1')).reviews.length),2);
 console.log('PASS failed review repeats the session and successful practice review advances');
 await page.locator('.backup summary').click();
 const downloadEvent=page.waitForEvent('download');await page.locator('#backup').click();const backup=JSON.parse(await fs.readFile(await (await downloadEvent).path(),'utf8'));assert.equal(backup.path.reviews.length,2);
 backup.code.exercises['python-refresher-1'].session={cold:true,mode:'mock',freshMock:true,started:Date.now()};
 await page.locator('#restore').setInputFiles({name:'practice.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(backup))});await page.waitForFunction(()=>document.querySelector('#notice').textContent.includes('Backup restored'));
 assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('coding-practice-v1')).exercises['python-refresher-1'].session.cold),false);
 console.log('PASS complete backup round trip preserves reviews and invalidates resumed independent credit');
 const another=await context.newPage();await another.goto(base+'path/');await another.waitForFunction(()=>document.querySelector('#next-title').textContent!=='Loading…');await another.evaluate(()=>localStorage.setItem('coding-interview-path-v1',localStorage.getItem('coding-interview-path-v1')+' '));await page.waitForFunction(()=>document.querySelector('#next').disabled);assert.equal(await page.locator('#restore').isDisabled(),true);await another.close();console.log('PASS stale path cannot overwrite newer progress');
 const brokenContext=await browser.newContext(),broken=await brokenContext.newPage();await broken.goto(base+'path/');await broken.evaluate(()=>localStorage.setItem('coding-interview-path-v1','broken saved bytes'));await broken.reload();await broken.waitForFunction(()=>document.querySelector('#notice').textContent.includes('Saved progress could not be read'));assert.equal(await broken.evaluate(()=>localStorage.getItem('coding-interview-path-v1')),'broken saved bytes');assert.ok(await broken.locator('#next').isDisabled());await brokenContext.close();console.log('PASS malformed progress stays intact and blocks writes');
 assert.deepEqual(errors,[]);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);console.log('PASS no page errors and viewport fits');
}finally{await browser.close();}
