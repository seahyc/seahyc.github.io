import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const app=readFileSync(new URL('../static/practice/app.mjs',import.meta.url),'utf8');
const html=readFileSync(new URL('../static/practice/index.html',import.meta.url),'utf8');
const explorer=readFileSync(new URL('../static/practice/explorer.mjs',import.meta.url),'utf8');

test('the optional input lab starts collapsed and retains its controls',()=>{
  assert.match(html,/<details id="example-lab" hidden><summary>Try a real input<\/summary>/);
  for(const id of ['example-input','example-run','example-expected','example-actual'])assert.match(html,new RegExp(`id="${id}"`));
});

test('the input lab labels examples separately from experimental output',()=>{
  assert.match(html,/Expected for the example/);
  assert.match(html,/Your output/);
  assert.match(html,/id="example-input-label"/);
  assert.match(html,/id="example-help"/);
  assert.match(explorer,/Custom input — predict the result/);
});

test('the exercise has one title and it lives inside the notebook brief',()=>{
  assert.equal((html.match(/id="title"/g)||[]).length,1);
  const briefStart=html.indexOf('<section class="brief-pane">');
  const briefEnd=html.indexOf('</section>',briefStart);
  const title=html.indexOf('id="title"');
  assert.ok(briefStart<title&&title<briefEnd);
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

test('probe experiments do not record mastery, failures or assistance',()=>{
 const resultBranch=app.slice(app.indexOf("if(data.type==='result')"),app.indexOf('worker.onerror'));
 const probeBranch=resultBranch.slice(resultBranch.indexOf("if(mode==='probe')"),resultBranch.indexOf("showResult(data,mode)"));
 assert.doesNotMatch(probeBranch,/record\(|assisted\(|feedback\('(pass|fail)'\)/);
 assert.match(app,/run\('probe',makeProbe/);
});

test('an input cannot change during a run and probe termination is shown beside it',()=>{
 assert.match(app,/\$\('example-input'\)\.disabled=on\|\|explorerUnavailable/);
 assert.match(app,/runContext\?\.executionMode==='probe'[^;]*\$\('example-actual'\)\.textContent='Error: '/);
});


test('the next action sits beside the success result before detailed checks',()=>{
 const success=html.indexOf('id="success-moment"'),next=html.indexOf('id="journey-feedback"'),checks=html.indexOf('id="case-feedback"');
 assert.ok(success<next&&next<checks);
 assert.equal((html.match(/id="journey-next"/g)||[]).length,1);
});


test('the path never turns a future recall into a disabled continue or a file download',()=>{
 const path=readFileSync(new URL('../static/practice/path/app.mjs',import.meta.url),'utf8');
 assert.doesNotMatch(path,/Recall scheduled|Come back|Export coaching handoff|handoff'\)\.click/);
 assert.doesNotMatch(path,/disabled=action\.type==='pause'/);
 const launch=path.slice(path.indexOf('function launch()'),path.indexOf('function openSession('));
 assert.doesNotMatch(launch,/download|handoff/);
});
