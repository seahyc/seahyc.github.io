import {chromium} from 'playwright';
import fs from 'node:fs';
const out=new URL('.',import.meta.url).pathname;
const browser=await chromium.launch();
const reports=[];
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const page=await browser.newPage({viewport:{width,height}});const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('http://localhost:1419/learning/peptide-proof/',{waitUntil:'networkidle'});
 await page.waitForSelector('.swiper-slide-active');
 const ids=await page.locator('.story-slide').evaluateAll(es=>es.map(e=>e.id));
 const failures=[];let ends=0,hashes=0;
 for(let i=0;i<ids.length;i++){
  // Direct navigation tests the public URL contract, not only the progress control.
  await page.goto('http://localhost:1419/learning/peptide-proof/?qa='+i+'#'+ids[i],{waitUntil:'load'});
  await page.waitForTimeout(100);
  await page.locator('.story-slide img').evaluateAll(async es=>{await Promise.all(es.map(e=>e.decode()));});
  if(width===390){
   await page.screenshot({path:out+`qa-top-390-card-${String(i).padStart(2,'0')}.png`});
   if(await page.locator('.swiper-slide-active img[src$=".svg"]').count()) await page.locator('.swiper-slide-active figure').screenshot({path:out+`chart-390-card-${String(i).padStart(2,'0')}.png`});
  }
  const state=await page.evaluate(({id})=>{
   const card=document.querySelector('.swiper-slide-active');const scroll=card.querySelector('.story-scroll');
   scroll.scrollTop=scroll.scrollHeight;
   return {active:card.id,broken:[...card.querySelectorAll('img')].filter(e=>!e.complete||e.naturalWidth===0).length,overflow:document.documentElement.scrollWidth>innerWidth+1,innerOverflow:scroll.scrollWidth>scroll.clientWidth+1};
  },{id:ids[i]});
  await page.waitForTimeout(80);
  const end=await page.evaluate(()=>{const s=document.querySelector('.swiper-slide-active .story-scroll');const r=s.getBoundingClientRect();const nodes=[...s.children].filter(e=>e.tagName!=='HR');const last=nodes.at(-1).getBoundingClientRect();return {bottom:last.bottom,clip:r.bottom,top:last.top,scroll:s.scrollTop,max:s.scrollHeight-s.clientHeight};});
  if(state.active===ids[i])hashes++;else failures.push(ids[i]+': wrong active hash '+state.active);
  if(end.bottom<=end.clip+2 && Math.abs(end.scroll-end.max)<=2)ends++;else failures.push(ids[i]+': ending unreachable '+JSON.stringify(end));
  if(state.broken||state.overflow||state.innerOverflow) failures.push(ids[i]+': '+JSON.stringify(state));
  if(width===390 || i===0) await page.screenshot({path:out+`qa-${width}-card-${String(i).padStart(2,'0')}.png`});
 }
 if(errors.length)failures.push(...errors);
 const report={viewport:`${width}x${height}`,cards:ids.length,endingsReachable:ends,directHashes:hashes,pageErrors:errors.length,failures};reports.push(report);console.log(JSON.stringify(report));
 await page.close();
}
await browser.close();
fs.writeFileSync(out+'qa-results.json',JSON.stringify(reports,null,2));
if(reports.some(r=>r.failures.length))process.exitCode=1;
