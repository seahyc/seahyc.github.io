from pathlib import Path
import subprocess,json
from PIL import Image
ROOT=Path(__file__).resolve().parents[2]; DOS=Path(__file__).resolve().parent
logs=[]
def run(args):
 p=subprocess.run(args,cwd=ROOT,text=True,capture_output=True)
 line='$ '+' '.join(args)+'\n'+p.stdout+p.stderr+f'exit_code={p.returncode}\n'
 logs.append(line);print(line,end='')
 assert p.returncode==0
run(['hugo','--destination','/tmp/fb-peptide-proof/site','--cacheDir','/tmp/fb-peptide-proof/cache','--noBuildLock','--quiet'])
run(['node',str(Path.home()/'.agents/skills/fieldbook/scripts/check-visuals.mjs'),'content/research/peptide-proof/index.md'])
imgs=sorted((ROOT/'static/images/peptide-proof').glob('*.png'))
run(['sips','-g','hasAlpha',*[str(p.relative_to(ROOT)) for p in imgs]])
for p in imgs:
 im=Image.open(p);a=im.getchannel('A');w,h=im.size
 vals=[a.getpixel(x) for x in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]]
 line=f'{p.name}: {im.mode}; corner alpha={vals}\n';logs.append(line);print(line,end='');assert vals==[0]*4
for r in json.loads((DOS/'qa-results.json').read_text()):
 assert r['cards']==r['endingsReachable']==r['directHashes']==18 and not r['failures'] and not r['pageErrors']
 line=json.dumps(r)+'\n';logs.append(line);print(line,end='')
sitemap=Path('/tmp/fb-peptide-proof/site/sitemap.xml').read_text()
assert sitemap.count('<loc>https://seahyingcong.com/learning/peptide-proof/</loc>')==1
canonical=Path('/tmp/fb-peptide-proof/site/learning/peptide-proof/index.html').read_text()
assert 'PEPTIDE PROOF' in canonical
line='PASS: one canonical sitemap entry /learning/peptide-proof/; private build; 18 cards / 18 unique visuals / 6 watercolors.\n';logs.append(line);print(line,end='')
(DOS/'verification.txt').write_text('\n'.join(logs))
