import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {chromium} from '../../node_modules/playwright/index.mjs';
const dossier=path.dirname(new URL(import.meta.url).pathname);
const root=path.resolve(dossier,'../..');
const dir=path.join(root,'static/images/agent-trust');
const targets=['buyer-economics.svg','vendor-economics.svg'];
const before=new Map(fs.readdirSync(dir).map(n=>[n,fs.readFileSync(path.join(dir,n))]));
console.log(execFileSync('python3',[path.join(dossier,'build-visuals.py'),'--only',...targets.map(n=>n.slice(0,-4))],{encoding:'utf8'}).trim());
console.log('$ git -C /Users/yingcong/Code/seahyc.github.io status --short -- static/images/agent-trust');
console.log(execFileSync('git',['-C',root,'status','--short','--','static/images/agent-trust'],{encoding:'utf8'}).trim());
const changed=fs.readdirSync(dir).filter(n=>!before.get(n)?.equals(fs.readFileSync(path.join(dir,n))));
assert(changed.every(n=>targets.includes(n)));
const numbers=svg=>[...svg.toString().matchAll(/>([^<>]*)</g)].flatMap(m=>m[1].match(/\d[\d,.]*/g)||[]);
for(const name of targets) assert.deepEqual(numbers(fs.readFileSync(path.join(dir,name))),numbers(before.get(name)));
console.log(`PASS: changed assets: ${changed.join(', ')}; every displayed number identical; all other assets byte-identical.`);
const browser=await chromium.launch();
try {
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
 for(const name of targets){
  await page.setContent(`<html><body style="margin:0;background:#f6f1e8">${fs.readFileSync(path.join(dir,name),'utf8')}</body></html>`);
  await page.locator('svg').evaluate(s=>{s.style.width='390px';s.style.height='auto';s.style.display='block';});
  await page.locator('svg').screenshot({path:path.join(dossier,name.replace('.svg','-polish-390.png'))});
  const result=await page.evaluate(()=>{
   const root=document.querySelector('svg');
   const label=[...root.querySelectorAll('text')].find(t=>t.textContent==='$6,500');
   const line=root.querySelector('path');
   return {width:root.getBoundingClientRect().width,baseValueHurdleGapPx:label?line.getBoundingClientRect().left-label.getBoundingClientRect().right:undefined,negativeLabel:[...root.querySelectorAll('text')].find(t=>t.textContent.startsWith('Contribution: −'))?.textContent};
  });
  assert.equal(result.width,390);
  if(result.baseValueHurdleGapPx!==undefined)assert(result.baseValueHurdleGapPx>=8);
  console.log(`${name}: ${JSON.stringify(result)}`);
 }
}finally{await browser.close();}
