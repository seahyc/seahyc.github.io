import {EditorSelection, countColumn} from '@codemirror/state';
import {indentMore, indentLess} from '@codemirror/commands';
import {getIndentUnit} from '@codemirror/language';

// A cursor inserts soft tabs; a selection shifts the selected code as a block.
export function insertSoftTab({state, dispatch}) {
  if (state.readOnly) return false;
  if (state.selection.ranges.some(range => !range.empty)) {
    return indentMore({state, dispatch});
  }
  const width = getIndentUnit(state);
  dispatch(state.update(state.changeByRange(range => {
    const line = state.doc.lineAt(range.head);
    const column = countColumn(line.text.slice(0, range.head - line.from), state.tabSize);
    const spaces = ' '.repeat(width - column % width);
    return {
      changes: {from: range.head, insert: spaces},
      range: EditorSelection.cursor(range.head + spaces.length)
    };
  }), {scrollIntoView: true, userEvent: 'input.indent'}));
  return true;
}

export const pythonTabKey = {key: 'Tab', run: insertSoftTab, shift: indentLess};
