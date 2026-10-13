// Module worker: one Pyodide per page, a fresh directory per run.
// run    -> visible tests + your tests (what "Run tests" shows)
// submit -> the same, plus hidden validators, mutation of your solution, and static checks
import {loadPyodide} from 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs';

let ready,count=0;
async function boot(){
 const py=await loadPyodide();
 const harness=await (await fetch(new URL('./harness.py',import.meta.url))).text();
 py.FS.mkdirTree('/lib');py.FS.writeFile('/lib/harness.py',harness);
 py.runPython("import sys; sys.path.insert(0, '/lib')");
 return py;
}

const STATIC=`
import ast, json
def static_checks(source):
    try:
        tree = ast.parse(source)
    except SyntaxError as error:
        return {"syntaxError": f"line {error.lineno}: {error.msg}", "customError": False, "mutableGlobals": []}
    errors = {n.name for n in tree.body if isinstance(n, ast.ClassDef) and any(isinstance(b, ast.Name) and (b.id.endswith("Error") or b.id == "Exception") for b in n.bases)}
    raised = {(n.exc.func.id if isinstance(n.exc, ast.Call) and isinstance(n.exc.func, ast.Name) else getattr(n.exc, "id", None)) for n in ast.walk(tree) if isinstance(n, ast.Raise) and n.exc is not None}
    mutable = []
    for node in tree.body:
        if isinstance(node, (ast.Assign, ast.AnnAssign)):
            value = node.value
            targets = node.targets if isinstance(node, ast.Assign) else [node.target]
            names = [t.id for t in targets if isinstance(t, ast.Name)]
            literal = isinstance(value, (ast.List, ast.Dict, ast.Set, ast.ListComp, ast.DictComp, ast.SetComp))
            call = isinstance(value, ast.Call) and isinstance(value.func, ast.Name) and value.func.id in ("list", "dict", "set", "defaultdict", "OrderedDict", "deque", "Counter")
            if literal or call:
                mutable += [n for n in names if not n.isupper()]
    return {"customError": bool(errors & raised), "mutableGlobals": mutable}
`;

self.onmessage=async({data})=>{
 try{
  ready ||= boot();
  const py=await ready;
  self.postMessage({type:'ready'});
  const root=`/work/run${++count}`;
  for(const [name,text] of Object.entries(data.files)){
   if(!/^(src|tests)\/[A-Za-z0-9_.-]+\.py$|^DESIGN\.md$/.test(name))throw Error(`Unsupported file path ${name}`);
   const dir=root+'/'+name.split('/').slice(0,-1).join('/');py.FS.mkdirTree(dir);py.FS.writeFile(`${root}/${name}`,text);
  }
  if(data.mode==='submit'){py.FS.mkdirTree(root+'/tests');py.FS.writeFile(`${root}/tests/_validators.py`,data.validators);}
  py.globals.set('job',py.toPy({root,entry:data.entry,visible:data.visible,candidate:data.candidate,submit:data.mode==='submit',maxMutants:data.maxMutants||25}));
  if(data.mode==='submit')self.postMessage({type:'progress',message:'Running hidden validators and mutating your solution. This takes up to a minute.'});
  const result=await py.runPythonAsync(STATIC+`
import harness, json
job = job.to_py() if hasattr(job, "to_py") else job
report = harness.grade(job["root"], job["entry"], job["visible"], job["candidate"], "tests/_validators.py" if job["submit"] else None, job["maxMutants"])
report["static"] = static_checks(open(job["root"] + "/" + job["entry"]).read())
json.dumps(report)
`);
  self.postMessage({type:'result',report:JSON.parse(result)});
 }catch(error){self.postMessage({type:'error',message:String(error)});}
};
