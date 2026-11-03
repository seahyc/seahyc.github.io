import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const root='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-clinical-trial-compression';
const url='http://127.0.0.1:1415/learning/the-time-between-molecule-and-medicine/';
const browser=await chromium.launch({headless:true});
const report=[];
const screenshotWarnings=[];
async function capture(page,path){try{await page.screenshot({path,timeout:4000});}catch(e){screenshotWarnings.push({path,error:e.message.split("\n")[0]});try{await page.screenshot({path,clip:{x:0,y:0,width:Math.min(390,page.viewportSize().width),height:Math.min(700,page.viewportSize().height)},timeout:4000});}catch{}}}
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('.swiper')?.swiper);
 const count=await page.locator('.story-slide').count(),cards=[];
 for(let i=0;i<count;i++){
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(35);
  cards.push(await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   const elements=[...s.querySelectorAll('p,h1,h2,h3,img,figure')];
   return {slug:el.dataset.cardSlug,hash:location.hash,max:s.cardMaxOffset(),overflow:elements.filter(n=>{const b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+(n.textContent||n.alt||'').slice(0,70)),images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0,width:n.width}))};
  }));
  if([0,4,6,8,12,13,18,19].includes(i))await capture(page,`${root}/${width}-card${i}-top.png`);
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  cards.at(-1).bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const b=s.lastElementChild.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {reachable:b.bottom<=v.bottom+1,lastBottom:b.bottom,viewportBottom:v.bottom,lastText:s.lastElementChild.innerText.slice(-120)}});
  if([0,4,6,12,18,19,20].includes(i))await capture(page,`${root}/${width}-card${i}-bottom.png`);
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const badLinks=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#card-"]')].filter(a=>!document.getElementById(a.hash.slice(1))).map(a=>a.hash));
 const images=cards.flatMap(c=>c.images);report.push({width,height,count,images:images.length,uniqueImages:new Set(images.map(x=>x.src)).size,unloaded:images.filter(x=>!x.loaded),docOverflow,errors,badLinks,cards});await page.close();
}
const page=await browser.newPage();const hashes=[];
for(const c of report[0].cards){await page.goto(url+'?direct='+encodeURIComponent(c.slug)+'#card-'+c.slug,{waitUntil:'networkidle'});await page.waitForFunction(slug=>document.querySelector('.swiper-slide-active')?.dataset.cardSlug===slug,c.slug);hashes.push({expected:c.slug,actual:await page.locator('.swiper-slide-active').getAttribute('data-card-slug')});}
await page.goto('http://127.0.0.1:1415/learning/',{waitUntil:'networkidle'});const indexCount=await page.locator('a[href="/learning/the-time-between-molecule-and-medicine/"]').count();
await browser.close();const data={hashes,indexCount,screenshotWarnings,report};await fs.writeFile(root+'/render-checks.json',JSON.stringify(data,null,2));
const summary={screenshotWarnings,hashesPassed:hashes.filter(x=>x.expected===x.actual).length,hashesTotal:hashes.length,indexCount,viewports:report.map(r=>({width:r.width,height:r.height,cards:r.count,images:r.images,uniqueImages:r.uniqueImages,unloaded:r.unloaded,docOverflow:r.docOverflow,errors:r.errors,badLinks:r.badLinks,overflows:r.cards.filter(c=>c.overflow.length),unreachable:r.cards.filter(c=>!c.bottom.reachable)}))};
console.log(JSON.stringify(summary,null,2));await fs.writeFile(root+'/render-summary.json',JSON.stringify(summary,null,2));
if(hashes.some(x=>x.expected!==x.actual)||report.some(r=>r.docOverflow||r.errors.length||r.badLinks.length||r.unloaded.length||r.cards.some(c=>c.overflow.length||!c.bottom.reachable)))process.exitCode=1;
