import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out=new URL('./',import.meta.url).pathname;
const url='http://127.0.0.1:1417/learning/can-we-build-better-bonds/';
const browser=await chromium.launch({headless:true});
const reports=[];const hashChecks=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]) {
 const page=await browser.newPage({viewport:{width,height}});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'networkidle'});
 const count=await page.locator('.story-slide').count(); const cards=[];
 for(let i=0;i<count;i++) {
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(55);
  await page.locator('.swiper-slide-active img').evaluateAll(ns=>Promise.all(ns.map(n=>n.decode().catch(()=>{}))));
  const card=await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   const overflow=[...s.querySelectorAll('p,h1,h2,h3,img,figure')].filter(n=>{const b=n.getBoundingClientRect();return b.left<r.left-2||b.right>r.right+2}).map(n=>({tag:n.tagName,text:n.textContent.slice(0,60)}));
   return {slug:el.dataset.cardSlug,hash:location.hash,max:s.cardMaxOffset(),overflow,images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0}))};
  });
  if([0,3,4,6,9,12,15,16,18,20].includes(i)) await page.screenshot({path:`${out}qa-${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  card.bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{
   const b=s.lastElementChild.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();
   return {reachable:b.bottom<=v.bottom+1,bottom:b.bottom,limit:v.bottom,text:s.lastElementChild.innerText.slice(-100)};
  });
  if([0,12,15,18,20].includes(i)) await page.screenshot({path:`${out}qa-${width}-card${i}-bottom.png`});
  cards.push(card);
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 for(const c of (width===390?cards:[cards[0],cards.at(-1)])) {
  await page.goto('about:blank');
  await page.goto(url+c.hash,{waitUntil:'networkidle'});
  await page.waitForFunction(slug=>document.querySelector('.swiper-slide-active')?.dataset.cardSlug===slug,c.slug,{timeout:5000});
  const actual=await page.locator('.swiper-slide-active').getAttribute('data-card-slug');
  hashChecks.push({width,hash:c.hash,expected:c.slug,actual,pass:actual===c.slug});
 }
 reports.push({width,height,count,errors,docOverflow,cards});await page.close();
}
const p=await browser.newPage();await p.goto('http://127.0.0.1:1417/learning/',{waitUntil:'networkidle'});
const indexCount=await p.locator('a[href="/learning/can-we-build-better-bonds/"]').count();
const aliases=[];
for(const path of ['/research/pair-bond-medicine/','/learning/pair-bond-medicine/']) {
 await p.goto('http://127.0.0.1:1417'+path,{waitUntil:'networkidle'});aliases.push({path,url:p.url(),canonical:new URL(p.url()).pathname===new URL(url).pathname});
}
await browser.close();
const summary={indexCount,aliases,hashChecks:hashChecks.length,hashFailures:hashChecks.filter(x=>!x.pass),viewports:reports.map(r=>({width:r.width,height:r.height,cards:r.count,uniqueImages:new Set(r.cards.flatMap(x=>x.images).map(x=>x.src)).size,unloaded:r.cards.flatMap(x=>x.images).filter(x=>!x.loaded),docOverflow:r.docOverflow,errors:r.errors,overflows:r.cards.filter(x=>x.overflow.length),unreachable:r.cards.filter(x=>!x.bottom.reachable)}))};
await fs.writeFile(out+'qa-report.json',JSON.stringify({summary,reports,hashChecks},null,2));
console.log(JSON.stringify(summary,null,2));
if(summary.hashFailures.length||indexCount!==1||aliases.some(x=>!x.canonical)||summary.viewports.some(r=>r.cards!==21||r.unloaded.length||r.docOverflow||r.errors.length||r.overflows.length||r.unreachable.length))process.exitCode=1;
