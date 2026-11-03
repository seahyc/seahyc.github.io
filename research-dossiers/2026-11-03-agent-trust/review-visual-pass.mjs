import {chromium} from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const dir='research-dossiers/2026-11-03-agent-trust',url='http://127.0.0.1:1435/learning/trust-when-agents-arrive/';
const browser=await chromium.launch({headless:true});const result=[];
for(const [width,height] of [[390,844],[1440,1000]]){
 const p=await browser.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url+'?review=visualpass',{waitUntil:'networkidle'});await p.waitForFunction(()=>document.querySelector('.swiper')?.swiper);
 const cards=[];
 for(let i=0;i<18;i++){
  await p.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await p.waitForTimeout(50);
  const c=await p.locator('.swiper-slide-active').evaluate(el=>{const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();return {i:+el.dataset.swiperSlideIndex,slug:el.dataset.cardSlug,images:[...s.querySelectorAll('img')].map(im=>({src:im.getAttribute('src'),loaded:im.complete&&im.naturalWidth>0,width:im.width})),tables:s.querySelectorAll('table').length,overflow:[...s.querySelectorAll('p,h1,h2,h3,img,figure')].filter(n=>{const b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName)};});
  if([0,1,3,5,7,8,9,10,11,12,13,14,15,16].includes(i)){
    await p.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const im=s.querySelector('img');if(im){const b=im.getBoundingClientRect(),r=s.getBoundingClientRect();s.renderCardOffset(Math.min(s.cardMaxOffset(),Math.max(0,b.top-r.top-45)));}});
    await p.screenshot({path:`${dir}/review-visual-pass-${width}-card${i}.png`,animations:'disabled'});
  }
  cards.push(c);
 }
 result.push({width,height,docOverflow:await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),errors,cards});await p.close();
}
await browser.close();await fs.writeFile(dir+'/review-visual-pass-results.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result.map(r=>({width:r.width,cards:r.cards.length,imageCards:r.cards.filter(c=>c.images.length).length,tableOnly:r.cards.filter(c=>!c.images.length&&c.tables).map(c=>c.slug),unloaded:r.cards.flatMap(c=>c.images).filter(i=>!i.loaded),overflow:r.cards.filter(c=>c.overflow.length),docOverflow:r.docOverflow,errors:r.errors})),null,2));
