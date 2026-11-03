import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const out='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-power-for-ai';
const base='http://127.0.0.1:1434/learning/power-for-ai/';
const browser=await chromium.launch({headless:true});
const report=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'load'});const count=await page.locator('.story-slide').count();let cards=[];
 for(let i=0;i<count;i++){
  await page.evaluate(i=>document.querySelector('.swiper').swiper.slideTo(i,0),i);await page.waitForTimeout(55);
  const data=await page.locator('.swiper-slide-active').evaluate(el=>{
   const s=el.querySelector('.story-scroll'),r=s.getBoundingClientRect();
   const overflow=[...s.querySelectorAll('p,h1,h2,h3,img')].filter(n=>{let b=n.getBoundingClientRect();return b.left<r.left-1||b.right>r.right+1}).map(n=>n.tagName+':'+n.textContent.slice(0,50));
   return {slug:el.dataset.cardSlug,hash:location.hash,max:s.cardMaxOffset(),overflow,images:[...s.querySelectorAll('img')].map(n=>({src:n.src,loaded:n.complete&&n.naturalWidth>0}))};
  });
  if([0,1,2,4,7,11,12,13,14,16,17].includes(i))await page.screenshot({path:`${out}/visual-pass-${width}-card${i}-top.png`});
  await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
  data.bottom=await page.locator('.swiper-slide-active .story-scroll').evaluate(s=>{let b=s.lastElementChild.getBoundingClientRect(),v=document.querySelector('.swiper').getBoundingClientRect();return {lastBottom:b.bottom,viewportBottom:v.bottom,reachable:b.bottom<=v.bottom+1,lastText:s.lastElementChild.innerText.slice(-100)}});
  if([0,3,7,12,17].includes(i))await page.screenshot({path:`${out}/visual-pass-${width}-card${i}-bottom.png`});
  cards.push(data);
 }
 let directFailures=[];
 for(const c of cards){await page.goto(base+'?direct='+c.slug+'#card-'+c.slug,{waitUntil:'load'});await page.waitForFunction(slug=>document.querySelector('.swiper-slide-active')?.dataset.cardSlug===slug,c.slug);const actual=await page.locator('.swiper-slide-active').getAttribute('data-card-slug');if(actual!==c.slug)directFailures.push({expected:c.slug,actual});}
 const internalBroken=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#card-"]')].map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1))));
 report.push({width,height,count,errors,cards,directFailures,internalBroken,docOverflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 await page.close();
}
const svgpage=await browser.newPage();let svg=[];
for(const name of ['power-chain','equipment','nuclear-gates','deal-map','economics','roadmap','queue-outcomes','project-record','smr-boundaries','cost-boundary','bear-case','model-boundary']){
 await svgpage.goto('http://127.0.0.1:1434/images/power-for-ai/'+name+'.svg');
 svg.push({name,overflow:await svgpage.evaluate(()=>[...document.querySelectorAll('text')].map(t=>({text:t.textContent,b:t.getBBox(),font:Number(t.getAttribute('font-size'))})).filter(t=>t.b.x<0||t.b.x+t.b.width>600||t.b.y<0||t.b.y+t.b.height>600||t.font<21))});
 await svgpage.screenshot({path:`${out}/visual-${name}.png`});
}
await browser.close();await fs.writeFile(out+'/visual-pass-self-check.json',JSON.stringify({report,svg},null,2));
const summary={viewports:report.map(r=>({width:r.width,height:r.height,cards:r.count,images:r.cards.flatMap(c=>c.images).length,unloaded:r.cards.flatMap(c=>c.images).filter(i=>!i.loaded),errors:r.errors,horizontalOverflow:r.docOverflow,cardOverflows:r.cards.filter(c=>c.overflow.length),unreachable:r.cards.filter(c=>!c.bottom.reachable),directHashFailures:r.directFailures,brokenInternalHashes:r.internalBroken})),svg};
console.log(JSON.stringify(summary,null,2));
if(report.some(r=>r.errors.length||r.docOverflow||r.directFailures.length||r.internalBroken.length||r.cards.some(c=>c.overflow.length||!c.bottom.reachable||c.images.some(i=>!i.loaded)))||svg.some(s=>s.overflow.length))process.exitCode=1;
