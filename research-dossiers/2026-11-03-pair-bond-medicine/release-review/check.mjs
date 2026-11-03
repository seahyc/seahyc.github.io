import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-pair-bond-medicine/release-review';
const root='http://127.0.0.1:1417/learning/can-we-build-better-bonds/';
const browser=await chromium.launch({headless:true});const reports=[];
for (const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(root,{waitUntil:'networkidle'});const cards=[];const n=await page.locator('.story-slide').count();
 for(let i=0;i<n;i++){
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(65);
  const c=await page.locator('.swiper-slide-active').evaluate(el=>{const s=el.querySelector('.story-scroll');const r=s.getBoundingClientRect();return {slug:el.dataset.cardSlug,hash:location.hash,max:s.cardMaxOffset(),overflow:[...s.querySelectorAll('p,h1,h2,h3,figure,img')].filter(n=>{let b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+n.textContent.slice(0,35)),images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0})),text:s.innerText}});
  if([0,3,4,6,9,12,15,16,18,20].includes(i)) await page.screenshot({path:`${out}/${width}-${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  c.bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{let b=s.lastElementChild.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {reachable:b.bottom<=v.bottom+1,lastBottom:b.bottom,viewportBottom:v.bottom,lastText:s.lastElementChild.innerText.slice(-100)}});
  if([0,12,18,20].includes(i))await page.screenshot({path:`${out}/${width}-${i}-bottom.png`});
  cards.push(c);
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);reports.push({width,height,n,errors,docOverflow,cards});await page.close();
}
const p=await browser.newPage();const hashes=[];
for(const c of reports[0].cards){await p.goto('about:blank');await p.goto(root+'#card-'+c.slug,{waitUntil:'networkidle'});await p.waitForTimeout(150);hashes.push({requested:c.slug,actual:await p.locator('.swiper-slide-active').getAttribute('data-card-slug')});}
await p.goto('http://127.0.0.1:1417/learning/',{waitUntil:'networkidle'});const indexCount=await p.locator('a[href="/learning/can-we-build-better-bonds/"]').count();
await browser.close();await fs.writeFile(out+'/report.json',JSON.stringify({reports,hashes,indexCount},null,2));
console.log(JSON.stringify({viewports:reports.map(r=>({width:r.width,height:r.height,cards:r.n,images:r.cards.flatMap(c=>c.images).length,unloaded:r.cards.flatMap(c=>c.images).filter(x=>!x.loaded),docOverflow:r.docOverflow,errors:r.errors,overflow:r.cards.filter(c=>c.overflow.length).map(c=>({slug:c.slug,overflow:c.overflow})),unreachable:r.cards.filter(c=>!c.bottom.reachable)})),hashesPassed:hashes.filter(x=>x.actual===x.requested).length,hashesTotal:hashes.length,indexCount},null,2));
