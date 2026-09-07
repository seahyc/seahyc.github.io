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
    py.globals.set('task_mode', data.mode);
    if (data.mode === 'probe') {
      const probe = data.probe || {};
      if (typeof probe.script === 'string') {
        if (!probe.script.trim() || probe.script.length > 30000) throw Error('Use a Python example between 1 and 30000 characters');
        py.globals.set('probe_script', probe.script);
      } else {
        if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(probe.module || '') || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(probe.function || '') || !Array.isArray(probe.args)) throw Error('Invalid probe');
        py.globals.set('probe_script', null);
        py.globals.set('probe_module', probe.module);
        py.globals.set('probe_function', probe.function);
        py.globals.set('probe_args_json', JSON.stringify(probe.args));
      }
    }
    const result = await py.runPythonAsync(`
import ast, contextlib, io, json, os, sys, traceback, unittest, importlib, inspect
import importlib.util
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

class CaseResult(unittest.TextTestResult):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.cases=[]; self._case_by_test={}
    def _new_case(self, test):
        case={'name':test.id() if hasattr(test, 'id') else str(test), 'status':'pass', 'detail':''}
        self.cases.append(case); self._case_by_test[test]=case
        return case
    def startTest(self, test):
        super().startTest(test)
        if len(self.cases) < 100: self._new_case(test)
    def _set(self, test, status, detail):
        case=self._case_by_test.get(test)
        if case is None:
            if len(self.cases) >= 100: return
            case=self._new_case(test)
        if case['status'] != 'error' or status == 'error': case['status']=status
        if detail: case['detail']=str(detail)[:1500]
    def addSuccess(self, test):
        super().addSuccess(test); self._set(test, 'pass', '')
    def addFailure(self, test, err):
        super().addFailure(test, err); self._set(test, 'fail', self._exc_info_to_string(err, test))
    def addError(self, test, err):
        super().addError(test, err); self._set(test, 'error', self._exc_info_to_string(err, test))
    def addSkip(self, test, reason):
        super().addSkip(test, reason); self._set(test, 'skip', reason)
    def addSubTest(self, test, subtest, err):
        super().addSubTest(test, subtest, err)
        if err is not None: self._set(test, 'fail', self._exc_info_to_string(err, test))

output=BoundedOutput(); report={'passed':False,'kind':'runtime','count':0}
with contextlib.redirect_stdout(output), contextlib.redirect_stderr(output):
    try:
        if task_mode == 'syntax':
            for name in sorted(os.listdir('src')):
                if name.endswith('.py'): ast.parse(open('src/'+name).read(), filename='src/'+name)
            print('Syntax is valid. Now test the behavior.')
            report.update(passed=True,kind='syntax')
        elif task_mode == 'main':
            import runpy; runpy.run_path('src/main.py',run_name='__main__')
            report.update(passed=True,kind='main')
        elif task_mode == 'probe':
            if isinstance(globals().get('probe_script'), str):
                script_code=compile(probe_script, '<input experiment>', 'exec', flags=ast.PyCF_ALLOW_TOP_LEVEL_AWAIT)
                pending=eval(script_code, {'__name__':'__explorer__'})
                if inspect.isawaitable(pending): await pending
                report.update(passed=True,kind='probe',value=output.getvalue().strip())
            else:
                args=json.loads(probe_args_json)
                fn=getattr(importlib.import_module(probe_module), probe_function)
                value=fn(*args)
                if inspect.isawaitable(value): value=await value
                encoded=json.dumps(value, ensure_ascii=False, separators=(',', ':'), allow_nan=False)
                if len(encoded) > 10000: raise ValueError('Probe result is too large')
                report.update(passed=True,kind='probe',value=json.loads(encoded))
        else:
            spec=importlib.util.spec_from_file_location('exercise_tests','/practice/src/tests.py')
            module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
            suite=unittest.defaultTestLoader.loadTestsFromModule(module)
            result=unittest.TextTestRunner(stream=output,verbosity=2,resultclass=CaseResult).run(suite)
            async_total=0; async_failed=0
            for async_test in getattr(module, 'ASYNC_TESTS', []):
                async_total += 1; name=getattr(async_test, '__name__', str(async_test))
                case={'name':name,'status':'pass','detail':''}
                if len(result.cases) < 100: result.cases.append(case)
                try:
                    value=async_test()
                    if inspect.isawaitable(value): await value
                    print(name + ' ... ok')
                except unittest.SkipTest as error:
                    case['status']='skip'; case['detail']=str(error)[:1500]; print(name + ' ... skipped')
                except AssertionError:
                    async_failed += 1; case['status']='fail'; case['detail']=traceback.format_exc(limit=5)[:1500]; print(name + ' ... FAIL'); traceback.print_exc(limit=5)
                except BaseException:
                    async_failed += 1; case['status']='error'; case['detail']=traceback.format_exc(limit=5)[:1500]; print(name + ' ... ERROR'); traceback.print_exc(limit=5)
            count=result.testsRun+async_total
            if async_total: print('Async tests: %s run, %s failed' % (async_total, async_failed))
            report.update(passed=result.wasSuccessful() and async_failed==0 and count>0,kind='tests',count=count,cases=result.cases[:100])
    except BaseException as error:
        report['kind']='syntax' if isinstance(error,SyntaxError) else 'runtime'; traceback.print_exc(limit=5)
report['output']=output.getvalue(); json.dumps(report)
`);
    self.postMessage({type:'result',...JSON.parse(result)});
  } catch(error) { self.postMessage({type:'error',message:String(error)}); }
};
