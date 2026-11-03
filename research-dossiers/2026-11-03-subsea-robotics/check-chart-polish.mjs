import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const dossier = new URL('./', import.meta.url);
const browser = await chromium.launch();
try {
 const page = await browser.newPage({viewport:{width:390,height:700},deviceScaleFactor:1});
 for (const [name, expected] of [['economics', ['−910 after company costs','−448 after company costs','+332 after company costs']], ['vessel-stress',['Job contribution: +21k','Job contribution: +1k','Job contribution: −19k']]]) {
  const svg = await fs.readFile(new URL(`../../static/images/subsea-robotics/${name}.svg`, dossier),'utf8');
  await page.setContent(`<style>body{margin:0}svg{display:block;width:390px;height:auto}</style>${svg}`);
  const result = await page.evaluate(() => {
   const root = document.querySelector('svg');
   const texts = [...root.querySelectorAll('text')];
   const values = texts.filter(t => /after company costs|Job contribution:/.test(t.textContent));
   const categories = texts.filter(t => /^(Low|Base|High|Vessel:)/.test(t.textContent));
   const line = root.querySelector('path').getBoundingClientRect();
   const gaps = values.slice(0,-1).map((v,i) => categories[i+1].getBoundingClientRect().top-v.getBoundingClientRect().bottom);
   const clearances = values.map(v => {
    const r=v.getBoundingClientRect();
    return Math.hypot(Math.max(line.left-r.right,r.left-line.right,0),Math.max(line.top-r.bottom,r.top-line.bottom,0))-0.65;
   });
   return {width:root.getBoundingClientRect().width,values:values.map(t=>t.textContent),rowGapsPx:gaps,lineClearancesPx:clearances,barWidths:[...root.querySelectorAll('rect')].map(r=>r.getAttribute('width'))};
  });
  assert.deepEqual(result.values,expected);
  assert.equal(result.width,390);
  assert.ok(result.rowGapsPx.every(g=>g>=12));
  assert.ok(result.lineClearancesPx.every(g=>g>=8));
  await page.locator('svg').screenshot({path:new URL(`chart-polish-${name}-390.png`,dossier).pathname});
  console.log(`${name}: ${JSON.stringify(result)}`);
 }
 console.log('PASS: both 390px renders; row gaps ≥12px; value/axis clearances ≥8px; expected values preserved');
} finally {await browser.close();}
