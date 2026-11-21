// Native-reader check for this report only (mirrors scripts/fieldbook-reader.browser.mjs assertions).
import {createRequire} from 'node:module';import path from 'node:path';import {spawn} from 'node:child_process';
const {chromium}=createRequire(path.resolve('package.json'))('playwright');
const s=spawn('hugo',['server','--bind','127.0.0.1','--port','14199','--disableFastRender','--destination','/tmp/obaf-render'],{stdio:'ignore'});
const base='http://127.0.0.1:14199/learning/open-source-beeper-agents/';
for(let i=0;i<100;i++){try{if((await fetch(base)).ok)break}catch{}await new Promise(r=>setTimeout(r,200))}
const b=await chromium.launch();let bad=0;
for(const [w,h] of [[390,844],[737,862],[1440,1000],[2560,1440]]){
 const p=await b.newPage({viewport:{width:w,height:h}});await p.goto(base,{waitUntil:'networkidle'});
 await p.evaluate(()=>Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))));
 const r=await p.evaluate(()=>{const ss=[...document.querySelectorAll('.story-slide')];return{cards:ss.length,imgsOk:[...document.images].every(i=>i.naturalWidth>0),overflow:document.documentElement.scrollWidth>innerWidth+1,clipped:ss.some(x=>x.inert||x.scrollHeight>x.clientHeight+2),continuous:document.documentElement.classList.contains('fieldbook-continuous')}});
 const ok=r.imgsOk&&!r.overflow&&!r.clipped&&r.continuous;if(!ok)bad++;
 console.log(`${w}x${h}`,JSON.stringify(r),ok?'PASS':'FAIL');}
await b.close();s.kill();process.exit(bad?1:0);
