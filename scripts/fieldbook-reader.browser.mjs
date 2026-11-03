import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright';

let server;
let baseUrl = process.env.FIELDBOOK_BASE_URL;
if (!baseUrl) {
  baseUrl = 'http://127.0.0.1:14137';
  server = spawn('hugo', ['server', '--bind', '127.0.0.1', '--port', '14137', '--disableFastRender', '--destination', '/tmp/fieldbook-test-render'], { stdio: 'ignore' });
  for (let attempt = 0; attempt < 100; attempt++) {
    try { if ((await fetch(baseUrl)).ok) break; } catch {}
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}
const reports = [];
for (const directory of await readdir(new URL('../content/research/', import.meta.url))) {
  try {
    const source = await readFile(new URL(`../content/research/${directory}/index.md`, import.meta.url), 'utf8');
    if (!source.includes('layout = "research-swipe"') || /draft\s*=\s*true/.test(source)) continue;
    reports.push(source.match(/^slug = "(.*)"/m)?.[1] || directory);
  } catch {}
}
assert.ok(reports.length > 0);
const browser = await chromium.launch({ headless: true });
try {
  let checks = 0;
  for (const [width, height] of [[390, 844], [737, 862], [1440, 1000], [2560, 1440]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    for (const report of reports) {
      await page.goto(`${baseUrl}/learning/${report}/`, { waitUntil: 'networkidle' });
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
      const state = await page.evaluate(() => {
        const sections = [...document.querySelectorAll('.story-slide')];
        const longest = sections.reduce((a, b) => a.scrollHeight > b.scrollHeight ? a : b);
        return {
          continuous: document.documentElement.classList.contains('fieldbook-continuous'),
          swiper: !!document.querySelector('.swiper'),
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          clipped: sections.some(section => section.inert || section.scrollHeight > section.clientHeight + 2),
          longest: longest.id,
          prose: [...document.querySelectorAll('.story-scroll > p')].map(node => ({ width: node.getBoundingClientRect().width, size: parseFloat(getComputedStyle(node).fontSize) })),
        };
      });
      const label = `${report} at ${width}px`;
      assert.ok(state.continuous && !state.swiper, `${label}: native document reader`);
      assert.ok(!state.overflow && !state.clipped, `${label}: content must not overflow or clip`);
      if (width > 900) assert.ok(state.prose.every(p => p.width <= 681 && p.size >= 19), `${label}: readable prose measure and size`);
      await page.goto(`${baseUrl}/learning/${report}/#${state.longest}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
      const top = await page.locator(`#${state.longest}`).evaluate(node => node.getBoundingClientRect().top);
      assert.ok(Math.abs(top) < 80, `${label}: direct section link`);
      const bottom = await page.locator(`#${state.longest} .story-scroll`).evaluate(node => {
        const last = [...node.children].filter(child => child.getBoundingClientRect().height > 0).at(-1);
        last.scrollIntoView({ block: 'end' });
        return last.getBoundingClientRect().bottom;
      });
      assert.ok(bottom <= height + 2 && bottom > 0, `${label}: longest section ending reachable (${bottom}px)`);
      await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
      assert.ok(await page.locator('.story-slide:last-child').evaluate(node => node.getBoundingClientRect().bottom <= innerHeight + 2), `${label}: final section reachable`);
      checks++;
    }
    await page.close();
  }
  console.log(`PASS ${reports.length} Fieldbooks across four sizes: ${checks} continuous-scroll, overflow, deep-link and reading checks`);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/learning/the-buyers-agent/#card-22-evidence-and-stop-rules`, { waitUntil: 'networkidle' });
  const hash = await page.evaluate(() => location.hash);
  await page.locator('#card-22-evidence-and-stop-rules h2').tap();
  assert.equal(await page.evaluate(() => location.hash), hash, 'prose tap must not navigate');
  await page.evaluate(() => scrollTo(0, 1000));
  const before = await page.evaluate(() => scrollY);
  const session = await context.newCDPSession(page);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 650 }] });
  for (const y of [580, 500, 420, 340, 250]) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 180, y }] });
    await page.waitForTimeout(20);
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await page.waitForTimeout(300);
  assert.ok(await page.evaluate(() => scrollY) > before + 100, 'fast diagonal touch must scroll the document');
  assert.equal(await page.evaluate(() => location.hash), hash, 'scroll gesture must not navigate');
  await context.close();
  console.log('PASS buyer-agent deep link, prose taps and fast diagonal touch scrolling');
} finally {
  await browser.close();
  server?.kill('SIGTERM');
}
