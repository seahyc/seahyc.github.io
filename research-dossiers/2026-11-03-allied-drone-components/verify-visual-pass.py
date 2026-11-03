from pathlib import Path
import subprocess, json
from PIL import Image
root=Path(__file__).resolve().parents[2]
dossier=Path(__file__).resolve().parent
log=[]
def run(args,cwd=root):
 r=subprocess.run(args,cwd=cwd,text=True,capture_output=True)
 log.extend(['$ '+' '.join(map(str,args)),r.stdout.rstrip(),r.stderr.rstrip(),f'exit={r.returncode}'])
 assert r.returncode==0
run(['hugo','--destination','/tmp/fb-allied-drone-components/site','--cacheDir','/tmp/fb-allied-drone-components/cache','--noBuildLock','--quiet'])
run(['node',str(Path.home()/'.agents/skills/fieldbook/scripts/check-visuals.mjs'),'content/research/allied-drone-components/index.md'])
assets=root/'static/images/allied-drone-components'
names=['proof-bench.png','origin-tree.png','acceptance-decision.png','controller-wedge.png','qualification-package.png','stop-go-gate.png']
run(['sips','-g','hasAlpha',*names],assets)
for name in names:
 im=Image.open(assets/name);a=im.getchannel('A');W,H=im.width-1,im.height-1
 corners=[a.getpixel(p) for p in [(0,0),(W,0),(0,H),(W,H)]]
 edge=max([a.getpixel((round(W*i/40),y)) for i in range(41) for y in [0,H]]+[a.getpixel((x,round(H*i/40))) for i in range(41) for x in [0,W]])
 assert max(corners)<=12 and edge<=40
 log.append(f'{name}: corners={corners}; sampled edgeMax={edge}; PASS')
data=json.loads((dossier/'visual-pass-report.json').read_text())
for r in data['report']:
 assert r['count']==18 and r['images']==18 and r['uniqueImages']==18
 assert not r['docOverflow'] and not r['errors'] and not r['unloaded']
 assert not any(c['overflow'] or not c['bottom']['reachable'] for c in r['cards'])
 log.append(f"{r['width']}x{r['height']}: cards=18 images=18 overflow=0 unreachable=0 unloaded=0 errors=0 PASS")
assert all(h['expected']==h['actual'] for h in data['hashes'])
log.append(f"Direct hashes: {len(data['hashes'])} checked; failures=0")
log.append('18 cards / 18 unique visuals / 12 SVG / 6 watercolor cutouts')
text='\n'.join(x for x in log if x)+'\n'
(dossier/'visual-pass-verification.txt').write_text(text)
print(text)
