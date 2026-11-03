import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out=new URL('./qa/',import.meta.url).pathname;
const base='http://127.0.0.1:1416/learning/a-bookshelf-that-argues-back/';
const browser=await chromium.launch({headless:true});
const report=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]) {
 const page=await browser.newPage({viewport:{width,height}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});
 const slugs=await page.locator('.story-slide').evaluateAll(es=>es.map(e=>e.dataset.cardSlug));
 const cards=[];
 for(const [i,slug] of slugs.entries()) {
  // Distinct query forces full direct navigation, rather than an asynchronous hashchange race.
  await page.goto(`${base}?qa=${width}-${i}#card-${slug}`,{waitUntil:'networkidle'});
  await page.waitForFunction(s=>document.querySelector('.swiper-slide-active')?.dataset.cardSlug===s,slug);
  await page.evaluate(()=>document.fonts.ready);
  const card=await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   return {slug:el.dataset.cardSlug,hash:location.hash,max:s.cardMaxOffset(),
    overflow:[...s.querySelectorAll('p,h1,h2,h3,img')].filter(n=>{const b=n.getBoundingClientRect();return b.width&& (b.left<r.left-1||b.right>r.right+1)}).map(n=>n.tagName),
    images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0}))};
  });
  card.directHashPass=card.slug===slug;
  if([0,3,6,9,11,12,14].includes(i)) await page.screenshot({path:`${out}${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  await page.waitForTimeout(50);
  card.bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{
   const last=[...s.querySelectorAll('p,figcaption,h3')].filter(n=>n.getBoundingClientRect().height>0).at(-1),b=last.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();
   return {lastBottom:b.bottom,viewportBottom:v.bottom,reachable:b.bottom<=v.bottom+1&&b.top>=v.top-1,lastText:last.textContent.slice(-120)};
  });
  if([0,3,6,9,11,12,14].includes(i)) await page.screenshot({path:`${out}${width}-card${i}-bottom.png`});
  cards.push(card);
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 report.push({width,height,cards,errors,docOverflow});await page.close();
}
const page=await browser.newPage();await page.goto('http://127.0.0.1:1416/learning/',{waitUntil:'networkidle'});
const indexCount=await page.locator('a[href="/learning/a-bookshelf-that-argues-back/"]').count();
const aliases=[];
for(const path of ['/research/ai-advisory-bookshelf/','/learning/ai-advisory-bookshelf/']) {await page.goto('http://127.0.0.1:1416'+path,{waitUntil:'networkidle'});aliases.push({path,canonical:page.url().includes('/learning/a-bookshelf-that-argues-back/')});}
await browser.close();
const summary={indexCount,aliases,viewports:report.map(r=>({width:r.width,height:r.height,cards:r.cards.length,images:r.cards.flatMap(c=>c.images).length,uniqueImages:new Set(r.cards.flatMap(c=>c.images).map(i=>i.src)).size,unloaded:r.cards.flatMap(c=>c.images).filter(i=>!i.loaded).length,docOverflow:r.docOverflow,errors:r.errors,overflows:r.cards.filter(c=>c.overflow.length).map(c=>c.slug),unreachable:r.cards.filter(c=>!c.bottom.reachable).map(c=>c.slug),hashFailures:r.cards.filter(c=>!c.directHashPass).map(c=>c.slug)}))};
await fs.writeFile(out+'report.json',JSON.stringify({summary,report},null,2));
await fs.writeFile(out+'summary.json',JSON.stringify(summary,null,2));
console.log(JSON.stringify(summary,null,2));
if(indexCount!==1||aliases.some(a=>!a.canonical)||summary.viewports.some(r=>r.unloaded||r.docOverflow||r.errors.length||r.overflows.length||r.unreachable.length||r.hashFailures.length))process.exitCode=1;
