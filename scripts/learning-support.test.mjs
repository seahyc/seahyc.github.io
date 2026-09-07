import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

import { skills } from '../static/practice/skill-catalog.mjs';
import { supports } from '../static/practice/learning-support.mjs';

test('every catalog skill has a compact executable support example', () => {
  assert.deepEqual(Object.keys(supports).sort(), skills.map(({ id }) => id).sort());

  for (const skill of skills) {
    const support = supports[skill.id];
    assert.equal(typeof support.title, 'string', `${skill.id}: title`);
    assert.equal(typeof support.explanation, 'string', `${skill.id}: explanation`);
    assert.ok(support.explanation.split(/[.!?](?:\s|$)/).filter(Boolean).length <= 2,
      `${skill.id}: explanation must have at most two sentences`);
    assert.match(support.prompt, /predict/i, `${skill.id}: prompt asks for prediction`);
    assert.equal(typeof support.answer, 'string', `${skill.id}: answer`);

    const lines = support.code.split('\n').length;
    assert.ok(lines >= 6 && lines <= 18, `${skill.id}: code has ${lines} lines`);
    const run = spawnSync('python3', ['-c', support.code], { encoding: 'utf8' });
    assert.equal(run.status, 0, `${skill.id}: ${run.stderr}`);
    assert.equal(run.stdout.trimEnd(), support.answer, `${skill.id}: stdout`);
  }
});
