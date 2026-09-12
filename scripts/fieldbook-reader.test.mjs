import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

let server;
let baseUrl = process.env.FIELDBOOK_BASE_URL;
if (!baseUrl) {
  const port = 14137;
  baseUrl = `http://127.0.0.1:${port}`;
  server = spawn('hugo', ['server', '--bind', '127.0.0.1', '--port', String(port), '--disableFastRender'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
}
const browser = await chromium.launch({ headless: true });

try {
  const hashPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await hashPage.goto(`${baseUrl}/learning/the-joint-that-has-to-survive/#card-02-the-mechanism`, { waitUntil: 'networkidle' });
  assert.equal(
    await hashPage.locator('.swiper-slide-active').getAttribute('data-card-slug'),
    '02-the-mechanism',
    'a direct card hash must open the requested sheet',
  );
  await hashPage.close();

  const page = await browser.newPage({ viewport: { width: 737, height: 862 } });
  await page.goto(`${baseUrl}/learning/the-joint-that-has-to-survive/`, { waitUntil: 'networkidle' });
  await page.locator('.swipe-progress button:nth-child(3)').click();
  await page.waitForTimeout(550);

  const active = page.locator('.swiper-slide-active');
  const sheet = active.locator('.story-scroll');
  const initialSlug = await active.getAttribute('data-card-slug');
  assert.equal(initialSlug, '02-the-mechanism');

  await sheet.hover({ position: { x: 250, y: 400 } });
  await page.mouse.wheel(0, 240);
  await page.waitForTimeout(80);

  const moved = await sheet.evaluate((node) => ({
    scrollTop: node.scrollTop,
    translate: getComputedStyle(node).getPropertyValue('--card-scroll-y').trim(),
  }));
  assert.equal(moved.scrollTop, 0, 'the sheet must not scroll inside its own fixed viewport');
  assert.notEqual(moved.translate, '0px', 'vertical reading must translate the whole sheet');

  await sheet.evaluate((node) => node.renderCardOffset(node.cardMaxOffset()));
  const track = page.locator('.swipe-track');
  const beforePreview = await track.evaluate((node) => getComputedStyle(node).transform);
  await page.mouse.wheel(0, 80);
  await page.waitForTimeout(50);
  const duringPreview = await track.evaluate((node) => getComputedStyle(node).transform);
  assert.notEqual(duringPreview, beforePreview, 'continued overscroll must reveal the adjacent card before turning');
  assert.equal(await page.locator('.swiper-slide-active').getAttribute('data-card-slug'), initialSlug);

  for (let index = 0; index < 4; index += 1) {
    await page.mouse.wheel(0, 80);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(650);
  assert.equal(
    await page.locator('.swiper-slide-active').getAttribute('data-card-slug'),
    '03-the-corrected-market',
    'overscroll beyond the threshold must turn to the next card',
  );

  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${baseUrl}/learning/the-joint-that-has-to-survive/`, { waitUntil: 'networkidle' });
  await mobilePage.locator('.swipe-progress button:nth-child(3)').click();
  await mobilePage.waitForTimeout(550);
  const session = await mobileContext.newCDPSession(mobilePage);
  const touch = async (type, y) => session.send('Input.dispatchTouchEvent', {
    type,
    touchPoints: type === 'touchEnd' ? [] : [{ x: 195, y }],
  });
  await touch('touchStart', 620);
  await touch('touchMove', 360);
  await touch('touchEnd', 360);
  await mobilePage.waitForTimeout(80);
  const mobileSheet = mobilePage.locator('.swiper-slide-active .story-scroll');
  const mobileMoved = await mobileSheet.evaluate((node) => ({
    scrollTop: node.scrollTop,
    translate: getComputedStyle(node).getPropertyValue('--card-scroll-y').trim(),
  }));
  assert.equal(mobileMoved.scrollTop, 0, 'touch reading must not create an inner scroll pane');
  assert.notEqual(mobileMoved.translate, '0px', 'touch reading must translate the whole sheet');

  await mobileSheet.evaluate((node) => node.renderCardOffset(node.cardMaxOffset()));
  await touch('touchStart', 650);
  await touch('touchMove', 250);
  await touch('touchEnd', 250);
  await mobilePage.waitForTimeout(600);
  assert.equal(
    await mobilePage.locator('.swiper-slide-active').getAttribute('data-card-slug'),
    '03-the-corrected-market',
    'touch overscroll beyond the threshold must turn to the next card',
  );
  await mobileContext.close();

  console.log('PASS fieldbook sheet translation and edge turn for wheel and touch');
} finally {
  await browser.close();
  server?.kill('SIGTERM');
}
