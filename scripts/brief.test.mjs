import test from 'node:test';
import assert from 'node:assert/strict';
import {withoutDuplicateTitle} from '../static/practice/brief.mjs';

test('removes a leading markdown H1 when it repeats the exercise title',()=>{
  assert.equal(withoutDuplicateTitle('# Tool Router\n\n## Context\n\nBuild it.','Tool Router'),'## Context\n\nBuild it.');
});

test('compares duplicate titles after harmless whitespace and markdown escaping differences',()=>{
  assert.equal(withoutDuplicateTitle('#   Rock \\* Paper   \n\nKeep this.','Rock * Paper'),'Keep this.');
});

test('retains a leading heading that is not the exercise title',()=>{
  const brief='# Background\n\n## Context\n\nKeep this.';
  assert.equal(withoutDuplicateTitle(brief,'Tool Router'),brief);
});

test('does not remove a matching H1 after introductory content',()=>{
  const brief='Read this first.\n\n# Tool Router\n\nKeep this.';
  assert.equal(withoutDuplicateTitle(brief,'Tool Router'),brief);
});
