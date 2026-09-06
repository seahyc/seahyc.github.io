import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const read=name=>readFileSync(new URL(`../static/practice/${name}`,import.meta.url),'utf8');
const shared=()=>read('design-system.css');
const pages=()=>[read('workspace.css'),read('path/layout.css')];

test('the shared layer declares the complete visual vocabulary',()=>{
  const css=shared();
  for(const token of ['--color-canvas','--color-surface','--color-ink','--color-muted','--color-primary','--color-primary-hover','--color-border','--color-focus','--space-1','--space-2','--space-3','--space-4','--radius-control','--radius-card','--font-sans','--font-mono'])assert.match(css,new RegExp(token.replace('--','--')));
});

test('buttons and button links share one accessible control contract',()=>{
  const css=shared();
  assert.match(css,/button\s*,\s*\.button[^{]*\{[^}]*min-height:\s*44px/s);
  assert.match(css,/button\.primary\s*,\s*\.button\.primary/);
  assert.match(css,/:focus-visible\s*\{[^}]*outline:/s);
  assert.match(css,/button:disabled[^}]*cursor:\s*not-allowed/s);
});

test('shared semantic contracts cover fields cards status details and action groups',()=>{
  const css=shared();
  for(const selector of ['.field-label','.card','[role="status"]','details','.action-group','.action-group--equal'])assert.ok(css.includes(selector),selector);
  assert.doesNotMatch(css,/(^|,)\s*label\s*\{[^}]*display:\s*block/ms);
});

test('equal action groups are three columns on desktop and one on small screens',()=>{
  const css=shared();
  assert.match(css,/\.action-group--equal\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)[^}]*gap:\s*var\(--space-3\)/s);
  assert.match(css,/@media\s*\(max-width:\s*540px\)[\s\S]*\.action-group--equal\s*\{[^}]*grid-template-columns:\s*1fr/s);
});

test('page layers consume tokens instead of declaring page colors or base buttons',()=>{
  for(const css of pages()){
    assert.doesNotMatch(css,/#[0-9a-f]{3,8}\b/i);
    assert.doesNotMatch(css,/(^|})\s*button\s*(,|\{)/m);
    assert.doesNotMatch(css,/:root\s*\{/);
  }
});

test('workspace layer owns the editor examples cases rating and reflection',()=>{
  const css=read('workspace.css');
  for(const selector of ['.studio','.curriculum','.panes','.editor-shell','#example-lab','#case-feedback','.reflection','.practice-options>div'])assert.ok(css.includes(selector),selector);
  assert.match(css,/#example-input\s*\{[^}]*min-height:/s);
  assert.match(css,/body\.focus[^}]*\.curriculum/);
});

test('path layer owns only the focused path and wizard layouts',()=>{
  const css=read('path/layout.css');
  assert.match(read('path/index.html'),/backup-actions action-group action-group--equal/);
  assert.doesNotMatch(css,/\.backup-actions\s*\{[^}]*grid-template-columns:/s);
  for(const selector of ['.recommendation','.next-card','.wizard','.wizard-head','.review-summary','.backup-actions','.step-actions'])assert.ok(css.includes(selector),selector);
});

test('body copy and secondary text retain readable minimum sizes',()=>{
  const css=shared();
  assert.match(css,/body\s*\{[^}]*font-size:\s*16px/s);
  assert.match(css,/\.muted\s*,\s*\.small\s*\{[^}]*font-size:\s*14px/s);
});
