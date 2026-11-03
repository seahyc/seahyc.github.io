import {chromium} from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-pair-bond-medicine/release-review';
const url='http://127.0.0.1:1417/learning/can-we-build-better-bonds/';
const browser=await chromium.launch({headless:true});const results=[];
for(const [width,height]of [[390,844],[737,862],[1440,1000]]){
 const p=await browser.newPage({viewport:{width,height}});const errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(url,{waitUntil:'networkidle'});
 const cards=[];
 for(const i of [13,18,20]){
  await p.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await p.waitForTimeout(100);
  cards.push(await p.locator('.swiper-slide-active').evaluate(el=>{const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();return {slug:el.dataset.cardSlug,overflow:[...s.querySelectorAll('p,h1,h2,h3,figure,img,.story-table-wrap')].filter(n=>{let b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName),images:[...s.querySelectorAll('img')].map(n=>n.complete&&n.naturalWidth>0)}}));
  await p.screenshot({path:`${out}/${width}-${i}-recheck-top.png`});await p.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  cards.at(-1).bottom=await p.locator('.swiper-slide-active .story-scroll').evaluate(s=>{const b=s.lastElementChild.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {reachable:b.bottom<=v.bottom+1,lastText:s.lastElementChild.innerText.slice(-150)}});
  await p.screenshot({path:`${out}/${width}-${i}-recheck-bottom.png`});
 }
 await p.goto('about:blank');await p.goto(url+'#card-13-a-pilot-is-a-learning-service',{waitUntil:'networkidle'});
 const anchor=p.locator('.swiper-slide-active a').filter({hasText:'Original unit model'});const before=await anchor.evaluate(a=>({href:a.href,target:a.target,html:a.outerHTML}));
 await anchor.click();await p.waitForTimeout(5200);const after={url:p.url(),active:await p.locator('.swiper-slide-active').getAttribute('data-card-slug')};
 results.push({width,height,cards,errors,inlineLink:{before,after}});await p.close();
}
await browser.close();await fs.writeFile(out+'/recheck.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
