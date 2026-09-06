import {loadPyodide} from 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs';

const MAX_SOURCE_LENGTH=200000;
const loaderPromise=loadPyodide();
let latestRequest=0;
let compileQueue=Promise.resolve();
let loaded=false;

const compileOnly=async(py,source,filename)=>{
  py.globals.set('syntax_source',source);
  py.globals.set('syntax_filename',filename);
  try {
    const encoded=await py.runPythonAsync(`
import json
try:
    compile(syntax_source, syntax_filename, 'exec')
    syntax_result = []
except SyntaxError as error:
    line = max(1, int(error.lineno or 1))
    column = max(1, int(error.offset or 1))
    end_line = max(line, int(getattr(error, 'end_lineno', None) or line))
    end_column = max(column + 1 if end_line == line else 1, int(getattr(error, 'end_offset', None) or (column + 1)))
    syntax_result = [{
        'line': line,
        'column': column,
        'endLine': end_line,
        'endColumn': end_column,
        'message': str(error.msg or 'Invalid Python syntax')
    }]
json.dumps(syntax_result, ensure_ascii=False, separators=(',', ':'))
`);
    return JSON.parse(encoded);
  } finally {
    py.globals.delete('syntax_source');
    py.globals.delete('syntax_filename');
  }
};

self.onmessage=({data})=>{
  const id=Number(data?.id);
  if(!Number.isSafeInteger(id))return;
  latestRequest=id;
  const source=typeof data.source==='string'?data.source:'';
  const filename=typeof data.filename==='string'&&data.filename?data.filename.slice(0,240):'lesson.py';
  self.postMessage({type:'status',id,status:loaded?'checking':'loading'});
  if(source.length>MAX_SOURCE_LENGTH){
    self.postMessage({id,status:'unavailable',diagnostics:[]});
    return;
  }
  compileQueue=compileQueue.catch(()=>{}).then(async()=>{
    if(id!==latestRequest)return;
    try {
      const py=await loaderPromise;
      if(id!==latestRequest)return;
      loaded=true;
      self.postMessage({type:'status',id,status:'checking'});
      const diagnostics=await compileOnly(py,source,filename);
      if(id===latestRequest)self.postMessage({id,status:'checked',diagnostics});
    } catch {
      if(id===latestRequest)self.postMessage({id,status:'unavailable',diagnostics:[]});
    }
  });
};
