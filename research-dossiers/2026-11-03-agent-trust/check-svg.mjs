import {chromium} from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
const dir='/Users/yingcong/Code/seahyc.github.io/static/images/agent-trust';const b=await chromium.launch();const p=await b.newPage();const results=[];
for(const name of (await fs.readdir(dir)).filter(n=>n.endsWith('.svg'))){await p.goto('http://127.0.0.1:1413/images/agent-trust/'+name);results.push({name,clipped:await p.locator('text').evaluateAll(ts=>ts.map(t=>{const r=t.getBBox();return {text:t.textContent,x:r.x,end:r.x+r.width}}).filter(r=>r.x<0||r.end>600))});}
console.log(JSON.stringify(results,null,2));await fs.writeFile('/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-11-03-agent-trust/svg-check.json',JSON.stringify(results,null,2));await b.close();if(results.some(r=>r.clipped.length))process.exitCode=1;
