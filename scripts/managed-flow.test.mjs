import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app=readFileSync(new URL('../static/practice/app.mjs',import.meta.url),'utf8');
const html=readFileSync(new URL('../static/practice/index.html',import.meta.url),'utf8');

test('the optional input lab starts collapsed and retains its controls',()=>{
  assert.match(html,/<details id="example-lab" hidden><summary>Try a real input<\/summary>/);
  for(const id of ['example-input','example-run','example-expected','example-actual'])assert.match(html,new RegExp(`id="${id}"`));
});

test('the managed flow has no learner grading controls',()=>{
  assert.doesNotMatch(html,/recall-rating|rating-actions|Needed help|Effortful|Independent/);
  assert.doesNotMatch(app,/data\.rating|previewRecall/);
});

test('editing successful code invalidates only the current success claim',()=>{
  assert.match(app,/lastResult==='pass'[^}]*lastResult='pending'/s);
  assert.doesNotMatch(app,/delete\s+[^;]*attempts|attempts\s*=\s*\[\]/);
});

test('fresh attempts archive editable drafts before loading the scaffold',()=>{
  assert.match(app,/function archiveDraft\(p\)[\s\S]*savedAttempts\.unshift/);
  assert.match(app,/saveEditor\(\);const p=entry\(\);archiveDraft\(p\);p\.files=\{\}/);
});

test('timed mocks never open hints automatically',()=>{
  assert.match(app,/s\.mode!=='mock'[^\n]*recent\.length===2/);
});

test('probe success is reported only in the input result',()=>{
  assert.match(app,/mode==='tests'\|\|mode==='probe'\?'':/);
  assert.doesNotMatch(app,/mode==='probe'\?'Program finished/);
});


test('the next action sits beside the success result before detailed checks',()=>{
 const success=html.indexOf('id="success-moment"'),next=html.indexOf('id="journey-feedback"'),checks=html.indexOf('id="case-feedback"');
 assert.ok(success<next&&next<checks);
 assert.equal((html.match(/id="journey-next"/g)||[]).length,1);
});
