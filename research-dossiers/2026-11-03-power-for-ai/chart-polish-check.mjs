import { chromium } from '../../node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';

const chart = new URL('../../static/images/power-for-ai/economics.svg', import.meta.url);
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 390 }, deviceScaleFactor: 1 });
  await page.setContent(`<body style="margin:0;background:#fff">${await fs.readFile(chart, 'utf8')}<style>svg{display:block;width:390px;height:390px}</style>`);
  await page.evaluate(() => document.fonts.ready);
  const measurements = await page.evaluate(() => {
    const texts = [...document.querySelectorAll('text')];
    const value = texts.find(t => t.textContent === '−384,000').getBoundingClientRect();
    const low = texts.find(t => t.textContent === 'LOW').getBoundingClientRect();
    const zero = document.querySelector('line').getBoundingClientRect();
    const bar = document.querySelector('rect').getBoundingClientRect();
    return {
      width: document.querySelector('svg').getBoundingClientRect().width,
      valueToLowGapPx: low.top - value.bottom,
      valueToZeroLineGapPx: value.top - zero.bottom - 0.65,
      valueToBarGapPx: bar.left - value.right,
      text: texts.map(t => t.textContent),
    };
  });
  assert.equal(measurements.width, 390);
  assert.ok(measurements.valueToLowGapPx >= 12);
  assert.ok(measurements.valueToZeroLineGapPx >= 8);
  const screenshot = new URL('./chart-polish-economics-390.png', import.meta.url);
  await page.screenshot({ path: screenshot.pathname });
  await fs.writeFile(new URL('./chart-polish-measurements.json', import.meta.url), JSON.stringify(measurements, null, 2) + '\n');
  console.log(JSON.stringify(measurements, null, 2));
  console.log('PASS · economics.svg rendered at 390px');
} finally {
  await browser.close();
}
