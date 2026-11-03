import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const dir='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-agent-trust';
const url='http://127.0.0.1:1435/learning/trust-when-agents-arrive/';
const browser=await chromium.launch({headless:true});const report=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('.swiper')?.swiper);
 const count=await page.locator('.story-slide').count(),cards=[];
 for(let i=0;i<count;i++){
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(50);
  const c=await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   return {slug:el.dataset.cardSlug,hash:location.hash,overflow:[...s.querySelectorAll('p,h1,h2,h3,img,figure')].filter(n=>{const b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+n.textContent.slice(0,40)),images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0,width:n.width})),max:s.cardMaxOffset()};
  });
  if(true)await page.screenshot({timeout:60000,animations:"disabled",path:`${dir}/visual-pass-${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  c.bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const last=[...s.querySelectorAll('p,figcaption,table,h1,h2,h3')].filter(n=>n.getBoundingClientRect().height>0).at(-1),b=last.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {reachable:b.bottom<=v.bottom+1,lastBottom:b.bottom,viewportBottom:v.bottom,lastText:last.innerText.slice(-80)}});
  if(true)await page.screenshot({timeout:60000,animations:"disabled",path:`${dir}/visual-pass-${width}-card${i}-bottom.png`});cards.push(c);
 }
 // Reload every direct hash and check actual active card.
 const hashes=[];
 for(const c of cards){await page.goto(url+'?direct='+encodeURIComponent(c.slug)+'#card-'+c.slug,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('.swiper')?.swiper);hashes.push({expected:c.slug,actual:await page.locator('.swiper-slide-active').getAttribute('data-card-slug')});}
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);report.push({width,height,count,docOverflow,errors,cards,hashes});await page.close();
}
const p=await browser.newPage();await p.goto('http://127.0.0.1:1435/learning/',{waitUntil:'networkidle'});const indexCount=await p.locator('a[href="/learning/trust-when-agents-arrive/"]').count();await browser.close();
const summary={indexCount,viewports:report.map(r=>({width:r.width,height:r.height,cards:r.count,images:r.cards.flatMap(c=>c.images).length,uniqueImages:new Set(r.cards.flatMap(c=>c.images.map(i=>i.src))).size,unloaded:r.cards.flatMap(c=>c.images).filter(i=>!i.loaded),docOverflow:r.docOverflow,errors:r.errors,overflows:r.cards.filter(c=>c.overflow.length),unreachable:r.cards.filter(c=>!c.bottom.reachable),hashFailures:r.hashes.filter(h=>h.actual!==h.expected)}))};
await fs.writeFile(dir+'/visual-pass-check-results.json',JSON.stringify({summary,report},null,2));console.log(JSON.stringify(summary,null,2));if(summary.viewports.some(r=>r.unloaded.length||r.docOverflow||r.errors.length||r.overflows.length||r.unreachable.length||r.hashFailures.length))process.exitCode=1;
