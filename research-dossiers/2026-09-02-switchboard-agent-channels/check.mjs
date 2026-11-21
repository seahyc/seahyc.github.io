// Usage: node check.mjs <baseUrl>   (run from repo root so playwright resolves)
import { chromium } from '/Users/yingcong/Code/seahyc.github.io/node_modules/playwright/index.mjs';
const base = process.argv[2] || 'http://127.0.0.1:14199';
const dir = '/Users/yingcong/Code/seahyc.github.io/research-dossiers/2026-09-02-switchboard-agent-channels';
const browser = await chromium.launch(); const out = [];
for (const [w, h] of [[390, 844], [737, 862], [1440, 1000]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } }); const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${base}/learning/switchboard-agent-channels/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => Promise.all([...document.images].map(i => i.decode().catch(() => {}))));
  const r = await page.evaluate(() => ({ cards: document.querySelectorAll('.story-slide').length, imgs: [...document.images].length, broken: [...document.images].filter(i => !i.naturalWidth).map(i => i.src), hOverflow: document.documentElement.scrollWidth > innerWidth + 1 }));
  out.push({ w, h, errors, ...r });
  if (w === 390) await page.screenshot({ path: `${dir}/render-390-full.png`, fullPage: true });
  if (w === 1440) await page.screenshot({ path: `${dir}/render-1440-full.png`, fullPage: true });
  await page.close();
}
await browser.close(); console.log(JSON.stringify(out, null, 1));
