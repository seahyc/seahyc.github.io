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
    print('PASS actual Python custom-input execution: sync and async return values')

asyncio.run(main())
