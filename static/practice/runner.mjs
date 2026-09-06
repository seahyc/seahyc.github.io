// Each run uses a fresh worker and filesystem. Stop terminates the worker.
import { loadPyodide } from 'https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.mjs';
self.onmessage = async ({data}) => {
  try {
    const py = await loadPyodide();
    self.postMessage({type:'ready'});
    py.FS.mkdirTree('/practice/src');
    for (const [path,source] of Object.entries(data.files)) {
      if(!/^(src\/[a-zA-Z0-9_.-]+|DESIGN\.md)$/.test(path)) throw Error('Unsupported file path');
      py.FS.writeFile('/practice/'+path,source);
    }
    py.globals.set('task_mode',data.mode);
    const result = await py.runPythonAsync(`
import ast, contextlib, io, json, os, sys, traceback, unittest, importlib.util
os.chdir('/practice')
sys.path.insert(0, '/practice/src')
class BoundedOutput(io.TextIOBase):
    def __init__(self): self.parts=[]; self.size=0
    def write(self, s):
        if self.size < 30000:
            self.parts.append(s[:30000-self.size]); self.size += len(s)
        return len(s)
    def flush(self): pass
    def getvalue(self): return ''.join(self.parts)
output=BoundedOutput()
report={'passed':False,'kind':'runtime','count':0}
with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
    try:
        if task_mode == 'syntax':
            for name in sorted(os.listdir('src')):
                if name.endswith('.py'): ast.parse(open('src/'+name).read(), filename='src/'+name)
            print('Syntax is valid. Now test the behavior.')
            report.update(passed=True,kind='syntax')
        elif task_mode == 'main':
            import runpy
            runpy.run_path('src/main.py',run_name='__main__')
            report.update(passed=True,kind='main')
        else:
            spec=importlib.util.spec_from_file_location('exercise_tests','/practice/src/tests.py')
            module=importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            suite=unittest.defaultTestLoader.loadTestsFromModule(module)
            result=unittest.TextTestRunner(stream=output,verbosity=2).run(suite)
            async_total=0
            async_failed=0
            for async_test in getattr(module, 'ASYNC_TESTS', []):
                async_total += 1
                try:
                    await async_test()
                    print(async_test.__name__ + ' ... ok')
                except BaseException:
                    async_failed += 1
                    print(async_test.__name__ + ' ... FAIL')
                    traceback.print_exc(limit=5)
            count=result.testsRun+async_total
            if async_total: print('Async tests: %s run, %s failed' % (async_total, async_failed))
            report.update(passed=result.wasSuccessful() and async_failed==0 and count>0,kind='tests',count=count)
    except BaseException as error:
        report['kind']='syntax' if isinstance(error,SyntaxError) else 'runtime'
        traceback.print_exc(limit=5)
report['output']=output.getvalue()
json.dumps(report)
`);
    self.postMessage({type:'result',...JSON.parse(result)});
  } catch(error) { self.postMessage({type:'error',message:String(error)}); }
};
