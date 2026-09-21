#!/usr/bin/env python3
"""Loopback-only, explicitly paired, durable single-worker experiment service."""
import argparse
import hashlib
import fcntl
import hmac
import json
import mimetypes
import os
from pathlib import Path
import secrets
import shutil
import signal
import stat
import sqlite3
import threading
import time
import urllib.parse
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from sandbox import run as sandbox_run, cleanup_previous

MAX_SOURCE = 200_000
MAX_BODY = 250_000
ALLOWED_PUBLIC = {'https://seahyingcong.com', 'https://seahyc.github.io'}
TERMINAL = {'completed', 'failed', 'cancelled', 'interrupted'}

def encode(value):
    return json.dumps(value, separators=(',', ':'), allow_nan=False)

def regular(path, root):
    path = Path(path)
    return not path.is_symlink() and path.is_file() and path.resolve().is_relative_to(root.resolve())

def read_log(path):
    # Work's parent is immutable to candidates. O_NOFOLLOW closes file-swap races.
    try:
        fd = os.open(path, os.O_RDONLY | os.O_NOFOLLOW | os.O_NONBLOCK)
        with os.fdopen(fd, 'rb') as stream:
            info = os.fstat(stream.fileno())
            if not stat.S_ISREG(info.st_mode): return ''
            stream.seek(max(0, info.st_size - 24000))
            return stream.read(24000).decode('utf-8', errors='replace')
    except OSError:
        return ''

class Workspace:
    def __init__(self, config):
        self.config = config
        self.home = Path(config['home']).expanduser().resolve()
        self.home.mkdir(parents=True, exist_ok=True, mode=0o700)
        os.chmod(self.home, 0o700)
        self.owner = (self.home / '.service.lock').open('a')
        try:fcntl.flock(self.owner,fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:raise RuntimeError('Another service owns this workspace.')
        self.jobs = self.home / 'jobs'; self.jobs.mkdir(exist_ok=True, mode=0o700)
        self.static = Path(config['static']).resolve()
        self.lab = self.static / 'practice/lab'
        self.port = int(config.get('port', 8765))
        self.origin = f'http://127.0.0.1:{self.port}'
        self.origins = ALLOWED_PUBLIC | {self.origin}
        self.lock = threading.RLock(); self.wake = threading.Event(); self.shutdown = threading.Event()
        self.cancels = {}; self.nonces = {}; self.started = time.time()
        token_file = self.home / 'token'
        if not token_file.exists():
            fd = os.open(token_file, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
            with os.fdopen(fd, 'w') as f: f.write(secrets.token_urlsafe(48))
        self.token = token_file.read_text().strip()
        self.db = sqlite3.connect(self.home/'jobs.sqlite3', check_same_thread=False)
        self.db.row_factory = sqlite3.Row
        self.db.execute('PRAGMA journal_mode=WAL')
        self.db.execute('CREATE TABLE IF NOT EXISTS jobs (id TEXT PRIMARY KEY, group_id TEXT, request TEXT, status TEXT, reason TEXT, created REAL, updated REAL, report TEXT, outcome TEXT)')
        for previous in self.db.execute("SELECT id FROM jobs WHERE status='running'").fetchall():
            if not cleanup_previous(self.jobs/previous['id']/'work'):
                raise RuntimeError('Previous worker cleanup not confirmed; service remains unavailable.')
        self.db.execute("UPDATE jobs SET status='interrupted', reason='Service restarted. Resume from a checkpoint where supported.',updated=? WHERE status='running'", (time.time(),))
        self.db.commit()
        self.worker = threading.Thread(target=self.loop, daemon=True); self.worker.start()

    def catalog(self):
        result = {}
        for package in ('systems', 'torch', 'jax', 'gym'):
            p = self.lab/'advanced'/package/'manifest.json'
            if not p.is_file(): continue
            definitions = json.loads(p.read_text())['assessments']
            for item in definitions:
                result[item['id']] = dict(item, package=package)
        return result

    def rows(self):
        with self.lock: return [self.summary(r) for r in self.db.execute('SELECT * FROM jobs ORDER BY created DESC LIMIT 100')]

    def row(self, job_id):
        with self.lock:
            row = self.db.execute('SELECT * FROM jobs WHERE id=?', (job_id,)).fetchone()
            if row is None: raise ValueError('Unknown job')
            return row

    def summary(self, row):
        req = json.loads(row['request'])
        return {'group_size':self.db.execute('SELECT count(*) FROM jobs WHERE group_id=?',(row['group_id'],)).fetchone()[0]} | {k:row[k] for k in ('id','group_id','status','reason','created','updated')} | {k:req.get(k) for k in ('assessment','package','scope','seed','sourceHash','resumeFrom','device')}

    def detail(self, job_id):
        row = self.row(job_id); result = self.summary(row)
        result['report'] = json.loads(row['report']) if row['report'] else None
        result['outcome'] = json.loads(row['outcome']) if row['outcome'] else None
        work = self.jobs/job_id/'work'
        log = work/'runner.log'
        result['log'] = read_log(log)
        result['artifacts'] = []
        if row['status'] in TERMINAL and work.exists():
            for path in work.rglob('*'):
                if len(result['artifacts']) >= 100: break
                if regular(path, work) and path.stat().st_size <= 256*1024**2:
                    result['artifacts'].append({'name':path.relative_to(work).as_posix(),'bytes':path.stat().st_size})
        return result

    def submit(self, payload):
        with self.lock:
            request_id = payload.get('requestId')
            if not isinstance(request_id,str) or len(request_id)>64 or not request_id or any(c not in '0123456789abcdef-' for c in request_id):
                raise ValueError('A UUID requestId is required.')
            payload_hash = hashlib.sha256(encode(payload).encode()).hexdigest()
            existing = self.db.execute('SELECT * FROM jobs WHERE group_id=? ORDER BY created', (request_id,)).fetchall()
            if existing:
                if json.loads(existing[0]['request']).get('payloadHash') != payload_hash:
                    raise ValueError('requestId already used with different input.')
                return {'groupId':request_id,'jobs':[self.summary(r) for r in existing]}
            if shutil.disk_usage(self.home).free < self.config.get('min_free_bytes', 8*1024**3):
                raise ValueError('Less than 8 GB free disk space. Free space before running more jobs.')
            if sum(p.stat().st_size for p in self.jobs.rglob('*') if regular(p,self.jobs)) > 2*1024**3:
                raise ValueError('Job archive reached 2 GB. Export and manage older artifacts before continuing.')
            source = payload.get('source')
            resumed = None
            if payload.get('resumeFrom'):
                previous = self.row(payload['resumeFrom']); old = json.loads(previous['request'])
                if old['package'] != 'gym' or previous['status'] not in TERMINAL: raise ValueError('Only a finished/interrupted Gymnasium job can resume.')
                resumed = self.jobs/previous['id']
                checkpoints = [p for p in (resumed/'work').rglob('checkpoint.pt') if regular(p,resumed/'work')]
                if len(checkpoints) != 1: raise ValueError('No unique checkpoint available.')
                payload = old | {'resumeFrom':previous['id'], 'seeds':[old['seed']]}
                source = (resumed/'input/candidate.py').read_text()
            definition = self.catalog().get(payload.get('assessment'))
            if not definition or definition['package'] != payload.get('package'): raise ValueError('Unknown assessment/package.')
            runtime = self.config['runtimes'].get(definition['package'])
            if not runtime or not Path(runtime['python']).is_file(): raise ValueError('This runtime is not installed.')
            scope = payload.get('scope', 'smoke')
            if scope not in ('smoke','full'): raise ValueError('This worker supports CPU smoke and full scopes only.')
            if definition['scopes'].get(scope,{}).get('unsupported'): raise ValueError('This scope is unsupported.')
            if payload.get('device','cpu') != 'cpu': raise ValueError('Only verified CPU execution is enabled.')
            if not isinstance(source,str) or len(source.encode()) > MAX_SOURCE: raise ValueError('Source must be at most 200 KB.')
            seeds = payload.get('seeds', [17])
            if not isinstance(seeds,list) or not 1<=len(seeds)<=3 or len(set(seeds))!=len(seeds) or any(type(s) is not int or not 0<=s<=2147483647 for s in seeds): raise ValueError('Provide one to three distinct integer seeds.')
            pending = self.db.execute("SELECT count(*) FROM jobs WHERE status IN ('queued','running')").fetchone()[0]
            if pending + len(seeds) > 6: raise ValueError('Queue holds at most six pending jobs.')
            group = request_id; ids=[]
            for seed in seeds:
                jid=uuid.uuid4().hex; folder=self.jobs/jid; inputs=folder/'input'; work=folder/'work'
                inputs.mkdir(parents=True,mode=0o700);work.mkdir(mode=0o700)
                package_root = resumed/'input' if resumed else self.lab/'advanced'/definition['package']
                names = (set(old['files']) - {'resume.pt'}) if resumed else set(definition['files']) | {'manifest.json'}
                for name in names:
                    if Path(name).name!=name or not regular(package_root/name,package_root): raise ValueError('Invalid package file.')
                    shutil.copyfile(package_root/name,inputs/name)
                (inputs/'candidate.py').write_text(source)
                if resumed: shutil.copyfile(checkpoints[0],inputs/'resume.pt')
                hashes={p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in inputs.iterdir() if p.is_file()}
                req=dict(payloadHash=payload_hash,assessment=definition['id'],package=definition['package'],scope=scope,seed=seed,device='cpu',sourceHash=hashes['candidate.py'],files=hashes,resumeFrom=payload.get('resumeFrom'),limits=dict(seconds=180 if scope=='smoke' else 900,memoryMB=4096,diskMB=256))
                (inputs/'submission.json').write_text(json.dumps(req,indent=2))
                for p in inputs.iterdir():p.chmod(0o400)
                now=time.time();self.db.execute('INSERT INTO jobs VALUES (?,?,?,?,?,?,?,?,?)',(jid,group,encode(req),'queued','',now,now,None,None));ids.append(jid)
            self.db.commit();self.wake.set()
            return {'groupId':group,'jobs':[self.summary(self.row(jid)) for jid in ids]}

    def cancel(self,jid):
        with self.lock:
            row=self.row(jid)
            if row['status']=='queued':
                self.db.execute("UPDATE jobs SET status='cancelled',reason='Cancelled before execution',updated=? WHERE id=?",(time.time(),jid));self.db.commit()
            elif row['status']=='running':self.cancels[jid].set()
            return self.summary(self.row(jid))

    def loop(self):
        while not self.shutdown.is_set():
            with self.lock:
                row=self.db.execute("SELECT * FROM jobs WHERE status='queued' ORDER BY created LIMIT 1").fetchone()
                if row:
                    cancel=threading.Event();self.cancels[row['id']]=cancel
                    self.db.execute("UPDATE jobs SET status='running',updated=? WHERE id=?",(time.time(),row['id']));self.db.commit()
            if not row:self.wake.wait(1);self.wake.clear();continue
            self.execute(row,cancel)

    def execute(self,row,cancel):
        jid=row['id'];req=json.loads(row['request']);folder=self.jobs/jid;inputs=folder/'input';work=folder/'work'
        runtime=self.config['runtimes'][req['package']]
        command=[runtime['python'],str(inputs/'evaluate.py'),'--assessment',req['assessment'],'--seed',str(req['seed']),'--scope',req['scope'],'--candidate',str(inputs/'candidate.py'),'--output',str(work/'result.json')]
        if req['package']=='gym':
            command += ['--artifacts',str(work/'artifacts'),'--device','cpu']
            if req.get('resumeFrom'):command += ['--resume',str(inputs/'resume.pt')]
        try:
            with (work/'runner.log').open('w') as log:
                def append(value):log.write(value);log.flush()
                outcome=sandbox_run(command,work,[Path(p) for p in runtime['read_roots']]+[inputs],cancel,req['limits']['seconds'],req['limits']['memoryMB'],append,max_disk_mb=req['limits']['diskMB'])
            path=work/'result.json';report=None
            if regular(path,work) and path.stat().st_size<=100000:
                report=json.loads(path.read_text())
                if report.get('sourceHash') != req['sourceHash'] or report.get('assessment')!=req['assessment'] or report.get('scope')!=req['scope'] or report.get('seed')!=req['seed']:raise ValueError('Report does not match immutable submission.')
                encode(report)
            reason=outcome['reason']
            status='completed' if reason=='completed' and outcome.get('exit_code')==0 and report else 'cancelled' if reason=='cancelled' else 'failed'
            # A completed process with a failed assessment is retained as failed evidence.
            if status=='completed' and report.get('status')=='failed':status='failed'
            if reason!='completed':report=None
        except Exception as exc:
            outcome={'reason':'failed','error':f'{type(exc).__name__}: {exc}'};reason=outcome['error'];status='failed';report=None
        with self.lock:
            self.db.execute('UPDATE jobs SET status=?,reason=?,updated=?,report=?,outcome=? WHERE id=?',(status,reason,time.time(),encode(report) if report else None,encode(outcome),jid));self.db.commit();self.cancels.pop(jid,None)

class Handler(BaseHTTPRequestHandler):
    server_version='Workspace/1'
    def setup(self):
        super().setup();self.connection.settimeout(10)
    def log_message(self,*args):pass  # Never log pairing URLs, authorization or source.
    @property
    def ws(self):return self.server.workspace
    def origin(self):return self.headers.get('Origin','')
    def valid_host(self):return self.headers.get('Host')==f'127.0.0.1:{self.ws.port}'
    def send(self,status,body,kind='application/json',cors=True,download=None):
        raw=body if isinstance(body,bytes) else encode(body).encode() if kind=='application/json' else body.encode()
        self.send_response(status);self.send_header('Content-Type',kind);self.send_header('Content-Length',str(len(raw)))
        self.send_header('Cache-Control','no-store');self.send_header('X-Content-Type-Options','nosniff');self.send_header('Referrer-Policy','no-referrer')
        if cors and self.origin() in self.ws.origins:self.send_header('Access-Control-Allow-Origin',self.origin());self.send_header('Vary','Origin')
        if download:self.send_header('Content-Disposition',"attachment; filename*=UTF-8''"+urllib.parse.quote(download,safe=''))
        self.end_headers();self.wfile.write(raw)
    def auth(self):
        if not self.valid_host():self.send(403,{'error':'Invalid host'});return False
        if self.origin() and self.origin() not in self.ws.origins:self.send(403,{'error':'Origin denied'},cors=False);return False
        supplied=self.headers.get('Authorization','').removeprefix('Bearer ')
        if not hmac.compare_digest(supplied,self.ws.token):self.send(401,{'error':'Pair this browser with the local runner.'});return False
        return True
    def do_OPTIONS(self):
        if not self.valid_host() or self.origin() not in self.ws.origins:self.send(403,{'error':'Origin denied'},cors=False);return
        self.send_response(204);self.send_header('Access-Control-Allow-Origin',self.origin());self.send_header('Access-Control-Allow-Methods','GET, POST, OPTIONS');self.send_header('Access-Control-Allow-Headers','Authorization, Content-Type');self.send_header('Access-Control-Allow-Private-Network','true');self.send_header('Vary','Origin');self.end_headers()
    def do_GET(self):
        if not self.valid_host():self.send(403,{'error':'Invalid host'});return
        parsed=urllib.parse.urlsplit(self.path);path=urllib.parse.unquote(parsed.path)
        if path=='/pair':return self.pair_page(parsed.query)
        if path.startswith('/api/'):
            if not self.auth():return
            try:
                if path=='/api/status':return self.send(200,{'version':1,'device':'cpu','sandbox':'macOS sandbox-exec','runtimes':list(self.ws.config['runtimes']),'catalog':list(self.ws.catalog()),'singleWorker':True,'limits':{'smokeSeconds':180,'fullSeconds':900,'memoryMB':4096,'diskMB':256}})
                if path=='/api/jobs':return self.send(200,{'jobs':self.ws.rows()})
                parts=path.split('/')
                if len(parts)>=4 and parts[2]=='jobs':
                    jid=parts[3];job=self.ws.row(jid)
                    if len(parts)==4:return self.send(200,self.ws.detail(jid))
                    if len(parts)>=6 and parts[4]=='artifacts':
                        if job['status'] not in TERMINAL:raise ValueError('Artifacts become available after execution stops.')
                        root=self.ws.jobs/jid/'work';target=root/('/'.join(parts[5:]))
                        if not regular(target,root) or target.stat().st_size>256*1024**2:raise ValueError('Artifact unavailable.')
                        return self.send(200,target.read_bytes(),'application/octet-stream',download=target.name)
                self.send(404,{'error':'Unknown endpoint'})
            except (ValueError,OSError) as e:self.send(400,{'error':str(e)})
            return
        # Same-origin fallback keeps pairing usable when public-site local-network access is blocked.
        if path=='/':self.send_response(302);self.send_header('Location','/practice/lab/');self.end_headers();return
        root=self.ws.static/'practice';target=self.ws.static/path.lstrip('/')
        if path.endswith('/'):target=target/'index.html'
        if not regular(target,root):self.send(404,{'error':'Not found'});return
        kind='text/javascript' if target.suffix=='.mjs' else mimetypes.guess_type(target.name)[0] or 'application/octet-stream'
        self.send(200,target.read_bytes(),kind,cors=False)
    def pair_page(self,query):
        params=urllib.parse.parse_qs(query);target=params.get('origin',[self.ws.origin])[0];challenge=params.get('challenge',[''])[0]
        if target not in self.ws.origins or len(challenge)>100:self.send(400,{'error':'Invalid pairing target'});return
        nonce=secrets.token_urlsafe(32)
        with self.ws.lock:
            self.ws.nonces={n:v for n,v in self.ws.nonces.items() if v[0]>time.time()}
            self.ws.nonces[nonce]=(time.time()+120,target,challenge)
        # No token exists in the page until the user explicitly clicks Pair.
        html='''<!doctype html><meta charset="utf-8"><title>Pair local runner</title><style>body{font:16px monospace;background:#0b0f14;color:#d5dfe9;max-width:650px;margin:60px auto;padding:24px}button{font:inherit;padding:12px}code{overflow-wrap:anywhere}</style><h1>Local experiment runner</h1><p>Pair this browser to submit Python jobs on this Mac. Jobs have filesystem/network restrictions and time, memory and output limits.</p><p id="target"></p><button id="pair">Pair browser</button><p id="status"></p><script>
const target=TARGET, challenge=CHALLENGE, nonce=NONCE;
document.querySelector('#target').textContent='Workspace: '+target;
document.querySelector('#pair').onclick=async()=>{const r=await fetch('/api/pair',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nonce})});const data=await r.json();if(!r.ok){document.querySelector('#status').textContent=data.error;return;}if(window.opener){window.opener.postMessage({type:'frontier-paired',challenge,token:data.token},target);document.querySelector('#status').textContent='Paired. Return to your workspace.';window.close();}else{sessionStorage.setItem('frontier-runner-token',data.token);location.href='/practice/lab/';}};
</script>'''.replace('TARGET',encode(target)).replace('CHALLENGE',encode(challenge).replace('<','\\u003c')).replace('NONCE',encode(nonce))
        self.send(200,html,'text/html',cors=False)
    def do_POST(self):
        if not self.valid_host():self.send(403,{'error':'Invalid host'});return
        try:
            length=int(self.headers.get('Content-Length','0'))
            if not 0<length<=MAX_BODY or self.headers.get('Content-Type','').split(';')[0]!='application/json':raise ValueError('Expected bounded JSON body.')
            payload=json.loads(self.rfile.read(length))
            if not isinstance(payload,dict):raise ValueError('Expected JSON object.')
            path=urllib.parse.urlsplit(self.path).path
            if path=='/api/pair':
                if self.origin()!=self.ws.origin:raise ValueError('Pairing requires the local confirmation page.')
                with self.ws.lock:item=self.ws.nonces.pop(payload.get('nonce',''),None)
                if not item or item[0]<time.time():raise ValueError('Pairing expired. Reopen the connection window.')
                return self.send(200,{'token':self.ws.token},cors=False)
            if not self.auth():return
            if path=='/api/jobs':return self.send(201,self.ws.submit(payload))
            parts=path.split('/')
            if len(parts)==5 and parts[2]=='jobs' and parts[4]=='cancel':return self.send(200,self.ws.cancel(parts[3]))
            self.send(404,{'error':'Unknown endpoint'})
        except (ValueError,OSError,KeyError,TypeError) as e:self.send(400,{'error':str(e)})

def main():
    p=argparse.ArgumentParser();p.add_argument('--config',type=Path,required=True);args=p.parse_args()
    ws=Workspace(json.loads(args.config.read_text()))
    server=ThreadingHTTPServer(('127.0.0.1',ws.port),Handler);server.workspace=ws
    print(f'Local workspace listening on {ws.origin}; pair via /pair. CPU worker only.',flush=True)
    def terminate(*_):raise KeyboardInterrupt
    signal.signal(signal.SIGTERM,terminate)
    try:server.serve_forever(poll_interval=.5)
    except KeyboardInterrupt:pass
    finally:
        ws.shutdown.set();ws.wake.set()
        with ws.lock:
            for event in ws.cancels.values():event.set()
        ws.worker.join(timeout=5);server.server_close()
if __name__=='__main__':main()
