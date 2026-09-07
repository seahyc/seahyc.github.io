import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const app=readFileSync(new URL('../static/practice/path/app.mjs',import.meta.url),'utf8');
test('completed rehearsal evidence does not require waiting for the clock to expire',()=>{
 const handler=app.slice(app.indexOf("$('save-review').onclick"),app.indexOf("$('outcome-next').onclick"));
 assert.doesNotMatch(handler,/rehearsalComplete|timer\.deadline|Finish the timed rehearsal/);
 assert.match(handler,/d\.roundNotes\.some/);assert.match(handler,/selected\.rubric\.some/);assert.match(handler,/completed'\)\.checked/);
});
