import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
for (const path of ['static/practice/index.html', 'static/practice/path/index.html']) {
  test(`${path}: terminal presentation preserves navigation and hides header`, () => {
    const html = read(path);
    assert.match(html, /<title>workspace — (terminal|queue)<\/title>/);
    assert.match(html, /<header hidden>/);
    assert.match(html, /class="terminal-footer"/);
    assert.match(html, /href="(?:\.\.\/)?lab\/">Experiments<\/a>/);
    const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)];
    assert.match(sheets.at(-1)[1], /terminal\.css/);
    assert.doesNotMatch(html, /Coding practice|Coding Practice|Target interview loop|Frontier interview qualification/);
  });
}
test('workspace execution hooks survive terminal styling', () => {
  const html = read('static/practice/index.html');
  for (const id of ['editor','code-editor','file','run','syntax','stop','output','practice-context','mode','method-button','export','import-button','import']) {
    assert.equal([...html.matchAll(new RegExp(`id="${id}"`, 'g'))].length, 1, `${id} exists exactly once`);
  }
});
test('queue configuration values retain progress compatibility', () => {
  const html = read('static/practice/path/index.html');
  for (const value of ['cognition','research','infra','all']) assert.match(html, new RegExp(`value="${value}"`));
  for (const id of ['qualification-gates','qualification-status','target-track','wizard','roadmap-content']) assert.match(html, new RegExp(`id="${id}"`));
});
test('terminal stylesheet supports complete desktop viewport and mobile stack', () => {
  const css = read('static/practice/terminal.css');
  assert.match(css, /color-scheme: dark/);
  assert.match(css, /height: 100dvh/);
  assert.match(css, /max-width: 540px/);
  assert.match(css, /\.sound-toggle.*display: none !important/);
  assert.match(css, /body\.focus \.terminal-footer/);
});
