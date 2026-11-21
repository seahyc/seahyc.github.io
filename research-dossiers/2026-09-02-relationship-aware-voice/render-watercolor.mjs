import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
import fs from 'node:fs';
const dir='/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-09-02-relationship-aware-voice/watercolor-src/';
const out='/Users/yingcong/Code/seahyc.github.io/static/images/relationship-aware-voice/';
const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:640},deviceScaleFactor:1.5});
for(const n of ['cover','generic','local','shopfront']){
  await p.setContent(`<html><body style="margin:0;background:transparent">${fs.readFileSync(dir+n+'.svg','utf8')}</body></html>`);
  await p.screenshot({path:out+n+'.png',omitBackground:true});console.log('wrote',n);
}
await b.close();
