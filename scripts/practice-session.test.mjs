import test from 'node:test';
import assert from 'node:assert/strict';
import {canStartFreshMock} from '../static/practice/practice-session.mjs';

const exercise={stage:'Mock',files:{'src/task.py':'def solve():\n    raise NotImplementedError\n'}};

test('reading a mock brief and its starter file does not consume a fresh timed attempt',()=>{
 const progress={viewedAt:42,attempts:0,session:{mode:'practice',started:42},files:{'src/task.py':exercise.files['src/task.py']}};
 assert.equal(canStartFreshMock(exercise,progress,'mock'),true);
});

test('edited, assisted, or previously timed work cannot restart as a fresh mock',()=>{
 const base={attempts:0,session:{mode:'practice'},files:{'src/task.py':exercise.files['src/task.py']}};
 assert.equal(canStartFreshMock(exercise,{...base,files:{'src/task.py':'def solve(): return 1'}},'mock'),false);
 assert.equal(canStartFreshMock(exercise,{...base,session:{mode:'practice',assisted:true}},'mock'),false);
 assert.equal(canStartFreshMock(exercise,{...base,session:{mode:'mock'}},'mock'),false);
 assert.equal(canStartFreshMock(exercise,{...base,attempts:1},'mock'),false);
});
