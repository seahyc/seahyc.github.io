import test from 'node:test';
import assert from 'node:assert/strict';
import {EditorState, EditorSelection} from '@codemirror/state';
import {python} from '@codemirror/lang-python';
import {indentUnit} from '@codemirror/language';
import {insertNewlineAndIndent, indentLess, deleteCharBackward, history, undo} from '@codemirror/commands';
import {insertSoftTab} from '../projects-src/practice-editor/indentation.mjs';

function editor(doc, selection={anchor:doc.length}, extensions=[]) {
 let state=EditorState.create({doc,selection,extensions:[python(),indentUnit.of('    '),EditorState.tabSize.of(4),history(),...extensions]});
 return {get state(){return state;},dispatch(tr){state=tr.state;}};
}
for(const [doc,spaces] of [
 ['def f():',4],['def f(): # comment',4],
 ['def f():\n    for x in xs:',8],
 ['def f():\n    for x in xs:\n        if x:',12],
 ['def f():\n    for x in xs:\n        out.append(x)',8],
 ['def f():\n    out = [',8],
 ['def f():\n    x = 1\n    ',4]
]) test(`Enter keeps Python indentation: ${JSON.stringify(doc)}`,()=>{
 const view=editor(doc);assert.equal(insertNewlineAndIndent(view),true);
 assert.equal(view.state.doc.line(view.state.doc.lines).text,' '.repeat(spaces));
});
test('Tab after code inserts spaces at the cursor without moving the statement',()=>{
 const view=editor('    x = 1');insertSoftTab(view);
 assert.equal(view.state.doc.toString(),'    x = 1   ');
 undo(view);assert.equal(view.state.doc.toString(),'    x = 1');
});
test('Tab at a partial indent advances to the next four-space stop',()=>{
 const view=editor('  return x',{anchor:2});insertSoftTab(view);
 assert.equal(view.state.doc.toString(),'    return x');
 assert.equal(view.state.selection.main.head,4);
});
test('selected lines indent and dedent together',()=>{
 const view=editor('x = 1\ny = 2',{anchor:0,head:11});insertSoftTab(view);
 assert.equal(view.state.doc.toString(),'    x = 1\n    y = 2');
 indentLess(view);assert.equal(view.state.doc.toString(),'x = 1\ny = 2');
});
test('Shift-Tab and Backspace remove one indentation level',()=>{
 for(const command of [indentLess,deleteCharBackward]){
  const view=editor('        x',{anchor:8});command(view);
  assert.equal(view.state.doc.toString(),'    x');
 }
});
test('soft tabs preserve multiple cursors and readonly state',()=>{
 const view=editor('a\nb',EditorSelection.create([EditorSelection.cursor(1),EditorSelection.cursor(3)]),[EditorState.allowMultipleSelections.of(true)]);
 insertSoftTab(view);assert.equal(view.state.doc.toString(),'a   \nb   ');
 assert.equal(view.state.selection.ranges.length,2);
 const locked=editor('x',undefined,[EditorState.readOnly.of(true)]);
 assert.equal(insertSoftTab(locked),false);assert.equal(locked.state.doc.toString(),'x');
});
