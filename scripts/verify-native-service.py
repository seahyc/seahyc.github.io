#!/usr/bin/env python3
"""HTTP auth, immutable jobs, persistence and real sandbox execution regressions."""
import ast
import hashlib
import http.client
import json
import os
from pathlib import Path
import re
import signal
import socket
import subprocess
import sys
import tempfile
import time
import uuid

ROOT=Path(__file__).resolve().parents[1]
def reference():
    tree=ast.parse((ROOT/'scripts/verify-advanced-systems.py').read_text())
    return next(ast.literal_eval(n.value) for n in tree.body if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='REFERENCE' for t in n.targets))

def main():
    with tempfile.TemporaryDirectory(prefix='native-service-') as temp:
        home=Path(temp);sock=socket.socket();sock.bind(('127.0.0.1',0));port=sock.getsockname()[1];sock.close()
        config={'home':str(home/'private'),'static':str(ROOT/'static'),'port':port,'min_free_bytes':0,'runtimes':{'systems':{'python':sys.executable,'read_roots':[sys.prefix,sys.base_prefix]}}}
        cp=home/'config.json';cp.write_text(json.dumps(config));origin=f'http://127.0.0.1:{port}';process=None;token=''
        def request(path,method='GET',body=None,auth=True,origin_header='https://seahyingcong.com',host=None):
            headers={'Origin':origin_header}
            if auth:headers['Authorization']='Bearer '+token
            if host:headers['Host']=host
            if body is not None:headers['Content-Type']='application/json';body=json.dumps(body)
            conn=http.client.HTTPConnection('127.0.0.1',port,timeout=12)
            conn.request(method,path,body,headers);r=conn.getresponse();data=r.read();status=r.status;kind=r.getheader('Content-Type','');conn.close()
            return status,json.loads(data) if kind.startswith('application/json') else data.decode(errors='replace')
        def start():
            nonlocal process,token
            process=subprocess.Popen([sys.executable,str(ROOT/'runner/server.py'),'--config',str(cp)],stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
            for _ in range(100):
                if process.poll() is not None:raise AssertionError(process.stderr.read().decode())
                try:
                    token=(home/'private/token').read_text().strip()
                    if request('/api/status')[0]==200:return
                except (OSError,http.client.HTTPException):pass
                time.sleep(.05)
            raise AssertionError('service not listening')
        def stop():
            process.terminate();process.wait(timeout=10)
            assert process.returncode==0,process.stderr.read().decode()
            process.stderr.close()
        def submit(source,**kw):
            payload=dict(requestId=uuid.uuid4().hex,package='systems',assessment='reward-audit',source=source,seeds=[17],scope='full',device='cpu')|kw
            status,data=request('/api/jobs','POST',payload);assert status==201,(status,data)
            return payload,data
        def done(jid):
            for _ in range(400):
                status,data=request('/api/jobs/'+jid);assert status==200,data
                if data['status'] in ('completed','failed','cancelled','interrupted'):return data
                time.sleep(.05)
            raise AssertionError('job did not finish')
        try:
            start()
            duplicate=subprocess.run([sys.executable,str(ROOT/'runner/server.py'),'--config',str(cp)],capture_output=True,timeout=5)
            assert duplicate.returncode!=0 and b'Another service owns this workspace' in duplicate.stderr
            assert request('/api/status',auth=False)[0]==401
            assert request('/api/status',origin_header='https://evil.example')[0]==403
            assert request('/api/status',host='evil.example')[0]==403
            assert request('/api/jobs','OPTIONS')[0]==204
            assert request('/api/jobs','OPTIONS',origin_header='https://evil.example')[0]==403
            status,page=request('/pair?origin=https%3A%2F%2Fseahyingcong.com&challenge=%3C%2Fscript%3E',auth=False)
            assert status==200 and 'challenge="</script>"' not in page and token not in page
            nonce=json.loads(re.search(r'nonce=("[^"]+")',page)[1])
            assert request('/api/pair','POST',{'nonce':nonce},auth=False)[0]==400
            assert request('/api/pair','POST',{'nonce':nonce},auth=False,origin_header=origin)[1]['token']==token
            assert request('/api/pair','POST',{'nonce':nonce},auth=False,origin_header=origin)[0]==400
            print('PASS auth, origin/host guards, CORS, explicit one-use pairing and script escaping')
            source=reference();payload,result=submit(source,seeds=[17,29,43]);ids=[j['id'] for j in result['jobs']]
            assert request('/api/jobs','POST',payload)[1]['jobs'][0]['id']==ids[0]
            assert request('/api/jobs','POST',payload|{'source':source+'#changed'})[0]==400
            records=[done(jid) for jid in ids]
            if sys.platform=='darwin':
                assert all(r['status']=='completed' and r['report']['status']=='passed' for r in records),records
                assert all(r['report']['sourceHash']==hashlib.sha256(source.encode()).hexdigest() for r in records)
                status,artifact=request('/api/jobs/'+ids[0]+'/artifacts/result.json');assert status==200 and json.loads(artifact)['status']=='passed'
            else:
                assert all(r['status']=='failed' and r['outcome']['reason']=='unavailable' for r in records),records
            assert request('/api/jobs/'+ids[0]+'/artifacts/../../../../token')[0]==400
            link=home/'private/jobs'/ids[0]/'work/leak';link.symlink_to(home/'private/token')
            assert request('/api/jobs/'+ids[0]+'/artifacts/leak')[0]==400
            print('PASS immutable three-seed snapshots, real CPU grading (or fail-closed platform), idempotency and artifact confinement')
            if sys.platform=='darwin':
                _,slow=submit('import time\ntime.sleep(30)\n',seeds=[17,29,43]);a,b,c=[j['id'] for j in slow['jobs']]
                for _ in range(100):
                    if request('/api/jobs/'+a)[1]['status']=='running':break
                    time.sleep(.05)
                assert request('/api/jobs/'+a+'/artifacts/runner.log')[0]==400
                request('/api/jobs/'+b+'/cancel','POST',{});assert done(b)['status']=='cancelled'
                request('/api/jobs/'+a+'/cancel','POST',{});assert done(a)['status']=='cancelled'
                request('/api/jobs/'+c+'/cancel','POST',{});assert done(c)['status']=='cancelled'
                # An untrusted worker can replace its log, but never make the server read a secret.
                _,attack=submit("import os,time\nos.unlink('runner.log')\nos.symlink("+repr(str(home/'private/token'))+",'runner.log')\ntime.sleep(1)\n")
                attack_id=attack['jobs'][0]['id']
                for _ in range(20):
                    assert token not in request('/api/jobs/'+attack_id)[1]['log'];time.sleep(.05)
                done(attack_id)
                print('PASS queued/running cancellation, live artifact guard and log symlink attack')
            if sys.platform=='darwin':
                _,interrupted=submit('import time\ntime.sleep(30)\n')
                interrupted_id=interrupted['jobs'][0]['id']
                for _ in range(100):
                    if request('/api/jobs/'+interrupted_id)[1]['status']=='running':break
                    time.sleep(.05)
                time.sleep(.3)
                process.kill();process.wait(timeout=5);process.stderr.close();start()
                assert done(interrupted_id)['status']=='interrupted'
                print('PASS abrupt restart waits for guardian cleanup before releasing artifacts')
            stop();start()
            assert len(request('/api/jobs')[1]['jobs'])>=3
            assert request('/api/jobs/'+ids[0])[1]['report']==records[0]['report']
            print('PASS durable records and pairing survive service restart')
            stop();process=None
        finally:
            if process and process.poll() is None:process.kill();process.wait()
if __name__=='__main__':main()
