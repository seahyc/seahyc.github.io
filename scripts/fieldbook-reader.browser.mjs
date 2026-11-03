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
  const momentumPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await momentumPage.goto(`${baseUrl}/learning/pipeline-in-a-person/#card-18-a-12-24-month-path-of-attack`, { waitUntil: 'networkidle' });
  await momentumPage.evaluate(() => {
    const viewport = document.querySelector('.swiper');
    viewport.swiper.slideNext();
    const sheet = document.querySelector('.swiper-slide-active .story-scroll');
    sheet.renderCardOffset(sheet.cardMaxOffset());
    viewport.dispatchEvent(new WheelEvent('wheel', { deltaY: 80, bubbles: true, cancelable: true }));
  });
  await momentumPage.waitForFunction(() => !document.querySelector('.swiper').swiper.animating, null, { timeout: 2000 });
  const momentumState = await momentumPage.evaluate(() => {
    const swiper = document.querySelector('.swiper').swiper;
    return {
      expected: swiper.translate,
      actual: new DOMMatrixReadOnly(getComputedStyle(swiper.wrapperEl).transform).m41,
      slug: document.querySelector('.swiper-slide-active').dataset.cardSlug,
      hash: location.hash,
    };
  });
  assert.ok(Math.abs(momentumState.actual - momentumState.expected) < 1, 'momentum must not strand the wrapper between cards');
  assert.equal(momentumState.hash, '#card-' + momentumState.slug, 'completed transition must update the shareable URL');
  await momentumPage.locator('[data-swipe="next"]').click();
  await momentumPage.waitForFunction(() => !document.querySelector('.swiper').swiper.animating);
  assert.equal(await momentumPage.evaluate(() => document.querySelector('.swiper').swiper.activeIndex), 20);
  await momentumPage.close();
  console.log('PASS wheel momentum during a card turn settles and subsequent navigation works');

  const hashPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await hashPage.goto(`${baseUrl}/learning/the-joint-that-has-to-survive/#card-02-the-mechanism`, { waitUntil: 'networkidle' });
  assert.equal(
    await hashPage.evaluate(() => {
      const card = document.getElementById('card-02-the-mechanism');
      return Math.abs(card.getBoundingClientRect().top - 30) < 5 ? card.dataset.cardSlug : null;
    }),
    '02-the-mechanism',
    'a direct card hash must open the requested sheet',
  );
  await hashPage.close();

  const page = await browser.newPage({ viewport: { width: 1100, height: 862 } });
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
  await mobilePage.goto(`${baseUrl}/learning/the-joint-that-has-to-survive/#card-02-the-mechanism`, { waitUntil: 'networkidle' });
  assert.equal(await mobilePage.locator('.swiper').count(), 0, 'mobile must not initialise a gesture reader');
  const originalHash = await mobilePage.evaluate(() => location.hash);
  const initialY = await mobilePage.evaluate(() => scrollY);
  const session = await mobileContext.newCDPSession(mobilePage);
  await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 195, y: 650 }] });
  for (const y of [580, 500, 420, 340, 250]) {
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 180, y }] });
    await mobilePage.waitForTimeout(20);
  }
  await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  await mobilePage.waitForTimeout(500);
  assert.ok(await mobilePage.evaluate(() => scrollY) > initialY + 100, 'a fast slightly diagonal gesture must scroll the document');
  assert.equal(await mobilePage.evaluate(() => location.hash), originalHash, 'scrolling must not trigger card navigation');
  await mobilePage.locator('#card-02-the-mechanism h2').tap();
  assert.equal(await mobilePage.evaluate(() => location.hash), originalHash, 'tapping prose must not turn a card');
  await mobilePage.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  assert.ok(await mobilePage.locator('.story-slide:last-child').evaluate(node => node.getBoundingClientRect().bottom <= innerHeight + 1), 'final section must be reachable');
  assert.ok(await mobilePage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'mobile must have no horizontal page overflow');
  await mobileContext.close();
  console.log('PASS native mobile document scrolling, fast diagonal gesture, prose taps, final section and overflow');

  console.log('PASS desktop sheet translation and wheel edge turn');
} finally {
  await browser.close();
  server?.kill('SIGTERM');
}
