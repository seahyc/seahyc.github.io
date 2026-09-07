"""Exercise the worker's actual Python body with the native Python runtime."""
import asyncio
import json
import tempfile
from pathlib import Path

source=(Path(__file__).resolve().parents[1]/'static/practice/runner.mjs').read_text()
body=source.split('const result = await py.runPythonAsync(`',1)[1].split('`);',1)[0]
body=body.replace("report['output']=output.getvalue(); json.dumps(report)","report['output']=output.getvalue(); return report")

async def run(mode, files, **kwargs):
    with tempfile.TemporaryDirectory(prefix='worker-contract-') as temp:
        work=Path(temp);(work/'src').mkdir()
        for name,content in files.items():(work/'src'/name).write_text(content)
        code=body.replace('/practice',temp)
        namespace={'task_mode':mode,**kwargs}
        exec('async def check():\n'+''.join('    '+line+'\n' for line in code.splitlines()),namespace)
        return await namespace['check']()

async def main():
    tests='''import unittest
class Checks(unittest.TestCase):
    def test_ok(self): self.assertEqual(1+1,2)
    def test_fail(self): self.assertEqual(1,2)
    def test_subtest(self):
        with self.subTest(n=1): self.assertEqual(1,2)
    @unittest.skip("not applicable")
    def test_skip(self): pass
async def async_ok(): return None
async def async_fail(): raise ValueError("example failure")
ASYNC_TESTS=[async_ok,async_fail]
'''
    report=await run('tests',{'tests.py':tests})
    assert report['passed'] is False
    assert report['count']==6, report
    assert len(report['cases'])==6
    statuses={c['name'].split('.')[-1]:c['status'] for c in report['cases']}
    assert statuses=={'test_ok':'pass','test_fail':'fail','test_subtest':'fail','test_skip':'skip','async_ok':'pass','async_fail':'error'},statuses
    print('PASS actual Python test collector: success, failure, subtest, skip and async cases')
    for name,source,args,expected in [('sync_probe','def work(x): return x+1\n',[2],3),('async_probe','async def work(x): return x*2\n',[4],8)]:
        report=await run('probe',{name+'.py':source},probe_module=name,probe_function='work',probe_args_json=json.dumps(args))
        assert report['passed'] and report['value']==expected,report
    report=await run('probe',{'multiple_inputs.py':'def choose(items, minimum): return [x for x in items if x >= minimum]\n'},probe_script=object(),probe_module='multiple_inputs',probe_function='choose',probe_args_json='[[1, 4, 2], 3]')
    assert report['passed'] and report['value']==[4],report
    report=await run('probe',{'objects.py':'class Counter:\n    def __init__(self): self.value=0\n    def add(self,x): self.value+=x\n'},probe_script='from objects import Counter\nc=Counter()\nc.add(3)\nc.add(4)\nprint(c.value)')
    assert report['passed'] and report['value']=='7' and report['count']==0,report
    report=await run('probe',{'callbacks.py':'async def apply(fn, x): return fn(x)\n'},probe_script='from callbacks import apply\nprint(await apply(lambda x: x * 3, 4))')
    assert report['passed'] and report['value']=='12' and report['count']==0,report
    report=await run('probe',{'broken_input.py':'def work(x): raise ValueError("bad input")\n'},probe_script='from broken_input import work\nprint(work(1))')
    assert not report['passed'] and 'ValueError: bad input' in report['output'] and report['count']==0,report
    report=await run('probe',{},probe_script='print(')
    assert not report['passed'] and 'SyntaxError' in report['output'],report
    report=await run('probe',{},probe_script='print("x" * 40000)')
    assert report['passed'] and len(report['value'])<=30000,report
    print('PASS actual Python custom-input execution: JSON arguments, sync/async, class state, callbacks, errors, bounded output; no test credit')

asyncio.run(main())
