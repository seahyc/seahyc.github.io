// Each execution gets a fresh, disposable Python process in a Web Worker.
import {loadPyodide} from 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs';
self.onmessage=async({data})=>{
 let python;
 try{
  self.postMessage({type:'phase',text:'Loading Python runtime…'});
  python=await loadPyodide({stdout:()=>{},stderr:()=>{}});
  python.FS.mkdirTree('/experiment');
  for(const [name,source] of Object.entries(data.files)){
   if(!/^[a-zA-Z0-9_.-]+$/.test(name))throw Error('Invalid workspace path.');
   python.FS.writeFile('/experiment/'+name,source);
  }
  python.FS.writeFile('/experiment/candidate.py',data.source);
  python.globals.set('assessment',data.assessment);
  python.globals.set('seed',data.seed);
  python.globals.set('scope',data.scope);
  python.globals.set('kit',data.kit);
  self.postMessage({type:'phase',text:'Running seeded experiment…'});
  const result=await python.runPythonAsync(`
import sys, json, importlib.util
sys.dont_write_bytecode = True
sys.path.insert(0, '/experiment')
path = '/experiment/harness.py' if kit else '/experiment/evaluate.py'
spec = importlib.util.spec_from_file_location('experiment_evaluator', path)
evaluator = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = evaluator
spec.loader.exec_module(evaluator)
result = evaluator.run(assessment, seed, '/experiment/candidate.py') if kit else evaluator.run(assessment, seed, scope, '/experiment/candidate.py')
json.dumps(result, allow_nan=False)
`);
  self.postMessage({type:'result',report:JSON.parse(result)});
 }catch(error){self.postMessage({type:'error',error:String(error.message||error).slice(0,4000)});}
};
