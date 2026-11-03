import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
const b=await chromium.launch({headless:true});
for(const [width,height] of [[390,844],[737,862],[1440,1000]]){
 const p=await b.newPage({viewport:{width,height}});
 await p.goto('http://127.0.0.1:1413/learning/trust-when-agents-arrive/?review=cover'+width,{waitUntil:'networkidle'});await p.waitForFunction(()=>document.querySelector('.swiper')?.swiper);
 const top=await p.locator('.swiper-slide-active').evaluate(el=>{const h=el.querySelector('h1').getBoundingClientRect(),s=el.querySelector('.story-scroll');return {heading:h.toJSON(),fontSizes:[...s.querySelectorAll('p')].map(p=>getComputedStyle(p).fontSize),docOverflow:document.documentElement.scrollWidth>innerWidth};});
 await p.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-agent-trust/review-${width}-cover-top.png`,timeout:60000});
 await p.locator('.swiper-slide-active .story-scroll').evaluate(s=>s.renderCardOffset(s.cardMaxOffset()));
 const bottom=await p.locator('.swiper-slide-active .story-scroll').evaluate(s=>({lastBottom:[...s.querySelectorAll('p,figcaption,table')].filter(n=>n.getBoundingClientRect().height>0).at(-1).getBoundingClientRect().bottom,viewportBottom:document.querySelector('.swiper').getBoundingClientRect().bottom}));
 await p.screenshot({path:`/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-agent-trust/review-${width}-cover-bottom.png`,timeout:60000});
 console.log(JSON.stringify({width,height,...top,...bottom,reachable:bottom.lastBottom<=bottom.viewportBottom+1}));await p.close();
}
await b.close();
