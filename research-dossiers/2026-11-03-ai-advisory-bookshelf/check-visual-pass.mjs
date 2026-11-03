import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const report=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]) {
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:1431/learning/a-bookshelf-that-argues-back/',{waitUntil:'networkidle'});
 const count=await page.locator('.story-slide').count(); const cards=[];
 for(let i=0;i<count;i++) {
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(40);
  cards.push(await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   const elements=[...s.querySelectorAll('p,h1,h2,h3,img')];
   const overflow=elements.filter(n=>{let b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+n.textContent.slice(0,50));
   return {slug:el.dataset.cardSlug,hash:location.hash,textLength:s.innerText.length,max:s.cardMaxOffset(),overflow,images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0,width:n.width}))};
  }));
  if([0,1,4,5,8,9,10,11,13,14].includes(i)) await page.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-ai-advisory-bookshelf/${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  const bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const last=s.lastElementChild,b=last.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {lastBottom:b.bottom,viewportBottom:v.bottom,reachable:b.bottom<=v.bottom+1,lastText:last.innerText.slice(-120)}});
  cards.at(-1).bottom=bottom;
  if([0,4,5,8,9,10,14].includes(i)) await page.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-ai-advisory-bookshelf/${width}-card${i}-bottom.png`});
 }
 const hashFailures=[];
 for (const c of cards) {
  await page.goto('http://127.0.0.1:1431/learning/a-bookshelf-that-argues-back/#card-'+c.slug,{waitUntil:'networkidle'});
  await page.reload({waitUntil:'networkidle'});
  const actual=await page.locator('.swiper-slide-active').getAttribute('data-card-slug');
  if(actual!==c.slug)hashFailures.push({expected:c.slug,actual});
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const images=cards.flatMap(c=>c.images);report.push({width,height,count,images:images.length,uniqueImages:new Set(images.map(x=>x.src)).size,unloaded:images.filter(x=>!x.loaded),docOverflow,errors,hashFailures,cards});
 await page.close();
}
const p=await browser.newPage();await p.goto('http://127.0.0.1:1431/learning/a-bookshelf-that-argues-back/#card-10-the-cost-of-staying-small',{waitUntil:'networkidle'});let direct=await p.locator('.swiper-slide-active').getAttribute('data-card-slug');
let indexCount = null;
await browser.close();
await fs.writeFile('/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-ai-advisory-bookshelf/report.json',JSON.stringify({direct,indexCount,report},null,2));
console.log(JSON.stringify({direct,indexCount,viewports:report.map(r=>({width:r.width,cards:r.count,images:r.images,uniqueImages:r.uniqueImages,unloaded:r.unloaded,docOverflow:r.docOverflow,errors:r.errors,hashFailures:r.hashFailures,overflows:r.cards.filter(c=>c.overflow.length),unreachable:r.cards.filter(c=>!c.bottom.reachable)}))},null,2));
