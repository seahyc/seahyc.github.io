import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const browser=await chromium.launch({headless:true});
const report=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]) {
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:1411/learning/eyes-beneath-the-shipping-lanes/',{waitUntil:'networkidle'});
 const count=await page.locator('.story-slide').count(); const cards=[];
 for(let i=0;i<count;i++) {
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(40);
  cards.push(await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   const elements=[...s.querySelectorAll('p,h1,h2,h3,img')];
   const overflow=elements.filter(n=>{let b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+n.textContent.slice(0,50));
   return {slug:el.dataset.cardSlug,hash:location.hash,textLength:s.innerText.length,max:s.cardMaxOffset(),overflow,images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0,width:n.width}))};
  }));
  if([0,3,6,9,12,15,17].includes(i)) await page.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-subsea-robotics/${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  const bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const last=[...s.querySelectorAll('p,li,figure,h1,h2,h3,table')].filter(n=>n.getBoundingClientRect().height>0 && (n.innerText.trim()||n.querySelector('img'))).at(-1),b=last.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {lastBottom:b.bottom,viewportBottom:v.bottom,reachable:b.bottom<=v.bottom+1,lastText:last.innerText.slice(-120)}});
  cards.at(-1).bottom=bottom;
  if([0,3,6,9,12,14,17].includes(i)) await page.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-subsea-robotics/${width}-card${i}-bottom.png`});
 }
 const docOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 const images=cards.flatMap(c=>c.images);report.push({width,height,count,images:images.length,uniqueImages:new Set(images.map(x=>x.src)).size,unloaded:images.filter(x=>!x.loaded),docOverflow,errors,cards});
 await page.close();
}
const p=await browser.newPage();await p.goto('http://127.0.0.1:1411/learning/eyes-beneath-the-shipping-lanes/#card-12-defence-is-a-different-company-building-path',{waitUntil:'networkidle'});let direct=await p.locator('.swiper-slide-active').getAttribute('data-card-slug');
const hashChecks=[]; for(const c of report[0].cards){await p.goto('http://127.0.0.1:1411/learning/eyes-beneath-the-shipping-lanes/?direct='+encodeURIComponent(c.slug)+'#card-'+c.slug,{waitUntil:'networkidle'});await p.waitForTimeout(50);const actual=await p.locator('.swiper-slide-active').getAttribute('data-card-slug');hashChecks.push({expected:c.slug,actual,pass:c.slug===actual});}
await p.goto('http://127.0.0.1:1411/learning/',{waitUntil:'networkidle'});let indexCount=await p.locator('a[href="/learning/eyes-beneath-the-shipping-lanes/"]').count();
await browser.close();
await fs.writeFile('/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-subsea-robotics/report.json',JSON.stringify({direct,indexCount,hashChecks,report},null,2));
console.log(JSON.stringify({direct,indexCount,hashesPassed:hashChecks.filter(x=>x.pass).length,hashesTested:hashChecks.length,viewports:report.map(r=>({width:r.width,cards:r.count,images:r.images,uniqueImages:r.uniqueImages,unloaded:r.unloaded,docOverflow:r.docOverflow,errors:r.errors,overflows:r.cards.filter(c=>c.overflow.length),unreachable:r.cards.filter(c=>!c.bottom.reachable)}))},null,2));
