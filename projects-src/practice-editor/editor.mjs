import {Compartment, EditorState} from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab
} from '@codemirror/commands';
import {
  bracketMatching,
  HighlightStyle,
  indentUnit,
  indentOnInput,
  syntaxHighlighting
} from '@codemirror/language';
import {tags} from '@lezer/highlight';
import {python} from '@codemirror/lang-python';
import {closeBrackets, closeBracketsKeymap} from '@codemirror/autocomplete';
import {highlightSelectionMatches, searchKeymap} from '@codemirror/search';

const pythonHighlight=HighlightStyle.define([
  {tag:[tags.keyword,tags.controlKeyword,tags.operatorKeyword],color:'var(--color-code-keyword, #f0b86e)'},
  {tag:[tags.string,tags.special(tags.string)],color:'var(--color-code-string, #a8d49d)'},
  {tag:[tags.number,tags.bool,tags.null],color:'var(--color-code-number, #d8b9ef)'},
  {tag:[tags.comment,tags.meta],color:'var(--color-code-comment, #91a298)',fontStyle:'italic'},
  {tag:[tags.definition(tags.variableName),tags.function(tags.variableName),tags.className],color:'var(--color-code-definition, #8fcad4)'},
  {tag:[tags.variableName,tags.propertyName],color:'var(--color-code-variable, #eef4ee)'},
  {tag:[tags.punctuation,tags.bracket,tags.operator],color:'var(--color-code-punctuation, #c7d3ca)'},
  {tag:tags.invalid,color:'var(--color-code-invalid, #ffb49d)',textDecoration:'underline'}
]);

const editorTheme=EditorView.theme({
  '&': {
    height: '360px',
    backgroundColor: 'var(--color-code, #18241e)',
    color: 'var(--color-code-ink, #eef4ee)',
    fontSize: '14px'
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
    lineHeight: '1.65'
  },
  '.cm-content': {padding: '16px 0', caretColor: 'var(--color-focus, #d09122)'},
  '.cm-line': {padding: '0 16px'},
  '.cm-gutters': {
    backgroundColor: 'var(--color-code, #18241e)',
    color: 'var(--color-code-muted, #91a298)',
    borderRight: '1px solid var(--color-code-border, #3e5146)'
  },
  '.cm-activeLine, .cm-activeLineGutter': {backgroundColor: 'var(--color-code-active-line, #213229)'},
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {backgroundColor: 'var(--color-code-selection, #315743) !important'},
  '.cm-cursor, .cm-dropCursor': {borderLeftColor: 'var(--color-focus, #d09122)'},
  '.cm-searchMatch': {backgroundColor: 'var(--color-code-search, #655b2c)'},
  '.cm-searchMatch.cm-searchMatch-selected': {backgroundColor: 'var(--color-code-search-selected, #7c6c2c)'},
  '&.cm-focused': {outline: '3px solid var(--color-focus, #d09122)', outlineOffset: '2px'}
},{dark:true});

export function createCodeEditor({parent,doc='',onChange=()=>{},onPaste=()=>{},onRun=()=>{}}){
  if(!(parent instanceof Element))throw new TypeError('Code editor parent must be a DOM element.');
  const readOnly=new Compartment();
  const editable=new Compartment();
  let locked=false;
  let suppressChange=false;
  const runKey={key:'Mod-Enter',preventDefault:true,run:()=>{onRun();return true;}};
  const createState=value=>EditorState.create({
    doc:String(value),
    extensions:[
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      drawSelection(),
      dropCursor(),
      indentOnInput(),
      bracketMatching(),
      closeBrackets(),
      highlightActiveLine(),
      highlightSelectionMatches(),
      python(),
      indentUnit.of('    '),
      syntaxHighlighting(pythonHighlight),
      keymap.of([runKey,indentWithTab,...closeBracketsKeymap,...defaultKeymap,...searchKeymap,...historyKeymap]),
      EditorView.contentAttributes.of({'aria-label':'Python code editor','aria-multiline':'true'}),
      EditorView.domEventHandlers({paste:event=>{onPaste(event);return false;}}),
      EditorView.updateListener.of(update=>{if(update.docChanged&&!suppressChange)onChange(update.state.doc.toString());}),
      readOnly.of(EditorState.readOnly.of(locked)),
      editable.of(EditorView.editable.of(!locked)),
      editorTheme
    ]
  });
  const state=createState(doc);
  const view=new EditorView({state,parent});
  return {
    getValue(){return view.state.doc.toString();},
    setValue(value){
      const next=String(value);
      if(next===view.state.doc.toString())return;
      suppressChange=true;
      try{view.setState(createState(next));}finally{suppressChange=false;}
    },
    setReadOnly(value){
      locked=!!value;
      view.dispatch({effects:[
        readOnly.reconfigure(EditorState.readOnly.of(locked)),
        editable.reconfigure(EditorView.editable.of(!locked))
      ]});
    },
    focus(){view.focus();},
    destroy(){view.destroy();}
  };
}
