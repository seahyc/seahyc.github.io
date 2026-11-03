import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(path.resolve('package.json'));
const {chromium}=require('playwright');
const out=path.resolve('research-dossiers/2026-11-03-agentic-commerce/qa');
fs.mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:1420/learning/the-buyers-agent/';
const browser=await chromium.launch();
const results=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);await page.waitForSelector('.swiper-slide-active');
 const cards=await page.locator('.story-slide').evaluateAll(ss=>ss.map(s=>({id:s.id,slug:s.dataset.cardSlug})));
 const checks=[];
 for(let i=0;i<cards.length;i++){
  const c=cards[i];await page.goto(base+'?qa='+width+'-'+i+'#'+c.id);await page.waitForSelector('.swiper-slide-active');
  await page.waitForFunction(id=>document.querySelector('.swiper-slide-active')?.id===id,c.id);
  await page.evaluate(async()=>{await document.fonts.ready;await Promise.all([...document.querySelectorAll('.swiper-slide-active img')].map(im=>im.decode()));});
  const check=await page.evaluate(()=>{
   const a=document.querySelector('.swiper-slide-active'),s=a.querySelector('.story-scroll');
   const bounds=s.getBoundingClientRect();
   return {id:a.id,hash:location.hash,images:[...a.querySelectorAll('img')].every(im=>im.complete&&im.naturalWidth>0),pageOverflow:document.documentElement.scrollWidth>innerWidth+1,cardOverflow:s.scrollWidth>s.clientWidth+1,contentWidth:bounds.width,scrollHeight:s.scrollHeight,clientHeight:s.clientHeight};
  });
  await page.screenshot({path:path.join(out,`${width}-${String(i).padStart(2,'0')}-top.png`)});
  await page.mouse.move(width/2,height/2);
  const max=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.cardMaxOffset());
  if(max>0)await page.mouse.wheel(0,max);
  await page.waitForTimeout(120);
  check.ending=await page.evaluate(()=>{
   const a=document.querySelector('.swiper-slide-active'),s=a.querySelector('.story-scroll');
   const children=[...s.children].filter(el=>!el.classList.contains('card-scroll-cue'));
   const last=children.at(-1),r=last.getBoundingClientRect(),b=s.getBoundingClientRect();
   return {offset:s._cardOffset,max:s.cardMaxOffset(),bottom:r.bottom,viewportBottom:innerHeight,reachable:s.cardMaxOffset()-s._cardOffset<3&&r.bottom<=innerHeight+2};
  });
  await page.screenshot({path:path.join(out,`${width}-${String(i).padStart(2,'0')}-end.png`)});
  check.pass=check.images&&!check.pageOverflow&&!check.cardOverflow&&check.ending.reachable;
  checks.push(check);
 }
 const summary={viewport:`${width}x${height}`,cards:cards.length,passed:checks.filter(x=>x.pass).length,images:checks.every(x=>x.images),noHorizontalOverflow:checks.every(x=>!x.pageOverflow&&!x.cardOverflow),allEndings:checks.every(x=>x.ending.reachable),directHashes:checks.every(x=>x.hash==='#'+x.id),pageErrors:errors,checks};
 results.push(summary);
 console.log(JSON.stringify({...summary,checks:undefined}));
 await page.close();
}
fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
const charts=await browser.newPage({viewport:{width:390,height:1100}});
for(const name of ['precedents','economics']){
 await charts.setContent(`<html><body style="margin:0;width:390px"><img style="display:block;width:390px;height:auto" src="http://127.0.0.1:1420/images/agentic-commerce/${name}.svg"></body></html>`);
 await charts.locator('img').evaluate(im=>im.decode());
 await charts.locator('img').screenshot({path:path.join(out,`${name}-390.png`)});
}
await charts.close();await browser.close();
if(results.some(r=>r.passed!==r.cards||r.pageErrors.length))process.exitCode=1;
