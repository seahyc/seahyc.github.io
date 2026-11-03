import {createRequire} from 'node:module';
import fs from 'node:fs';
const require=createRequire(process.cwd()+'/package.json');
const {chromium}=require('playwright');
const D='research-dossiers/2026-11-03-insurance-ai-rollup';
const URL='http://127.0.0.1:1418/learning/the-broker-behind-the-promise/';
const browser=await chromium.launch();
let fail=[];let summary=[];
for (const [width,height] of [[390,844],[737,862],[1440,1000]]) {
 const page=await browser.newPage({viewport:{width,height}});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(URL);await page.waitForSelector('.swiper-slide-active');await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
 const ids=await page.locator('.story-slide').evaluateAll(es=>es.map(e=>e.id));let reached=0,hashes=0,loaded=0,overflow=0;const rows=[];
 for(let i=0;i<ids.length;i++){
  await page.goto(URL+'?cardcheck='+i+'#'+ids[i]);await page.waitForSelector('.swiper-slide-active');await page.waitForTimeout(750);
  await page.waitForFunction(id=>document.querySelector('.swiper-slide-active')?.id===id,ids[i]);
  await page.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
  let initial=await page.evaluate(()=>{let s=document.querySelector('.swiper-slide-active'),c=s.querySelector('.story-scroll');let r=c.getBoundingClientRect();return {id:s.id,max:c.cardMaxOffset(),offset:c._cardOffset,h:c.offsetHeight,overflow:document.documentElement.scrollWidth>innerWidth+1,images:[...s.querySelectorAll('img')].every(im=>im.complete&&im.naturalWidth>0),wide:[...c.querySelectorAll('p,h1,h2,h3,figure')].filter(e=>e.getBoundingClientRect().right>innerWidth+2).map(e=>e.tagName)}});
  if(initial.id===ids[i])hashes++;
  if(initial.images)loaded++;
  if(initial.overflow||initial.wide.length){overflow++;fail.push(`${width} ${ids[i]} overflow ${JSON.stringify(initial)}`);}
  if([0,7,14,15].includes(i))await page.screenshot({path:`${D}/self-${width}-${i}-top.png`});
  // Use actual wheel input, exactly to the end; avoid triggering next-card overscroll.
  await page.mouse.move(width/2,height/2);
  if(initial.max>0)await page.mouse.wheel(0,initial.max-initial.offset);
  await page.waitForTimeout(250);
  const end=await page.evaluate(()=>{const s=document.querySelector('.swiper-slide-active'),c=s.querySelector('.story-scroll');const e=[...c.querySelectorAll('p,figure,table')].at(-1);const r=e.getBoundingClientRect();return {id:s.id,bottom:r.bottom,top:r.top,offset:c._cardOffset,max:c.cardMaxOffset(),height:innerHeight};});
  const ok=end.id===ids[i]&&end.bottom<=height+2&&end.bottom>0&&Math.abs(end.offset-end.max)<3;
  if(ok)reached++;else fail.push(`${width} ${ids[i]} ending ${JSON.stringify(end)}`);
  rows.push({card:ids[i],hash:initial.id===ids[i],images:initial.images,initial,end,reachable:ok});
  if([0,7,14,15,17].includes(i))await page.screenshot({path:`${D}/self-${width}-${i}-end.png`});
 }
 if(errors.length)fail.push(`${width} page errors ${errors.join(';')}`);
 // All internal numerical source links must resolve to a card.
 const badLinks=await page.locator('a[href^="#card-"]').evaluateAll((as,ids)=>as.map(a=>a.getAttribute('href').slice(1)).filter(id=>!ids.includes(id)),ids);
 if(badLinks.length)fail.push('Broken card refs '+badLinks.join(','));
 const msg=`${width}x${height}: cards ${ids.length}; endings ${reached}/${ids.length}; direct hashes ${hashes}/${ids.length}; images ${loaded}/${ids.length}; horizontal overflow ${overflow}; page errors ${errors.length}; broken card refs ${badLinks.length}`;
 console.log(msg);summary.push(msg);fs.writeFileSync(`${D}/check-${width}.json`,JSON.stringify(rows,null,2));await page.close();
}
await browser.close();
fs.writeFileSync(`${D}/render-check.txt`,summary.join('\n')+'\n'+(fail.length?fail.join('\n'):'PASS')+'\n');
for(const f of fail)console.log('FAIL',f);if(fail.length)process.exit(1);console.log('PASS');
