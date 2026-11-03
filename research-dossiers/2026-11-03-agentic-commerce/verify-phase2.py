from pathlib import Path
import subprocess
import sys
from PIL import Image

ROOT=Path(__file__).resolve().parents[2]
D=Path(__file__).resolve().parent
commands=[
 ['hugo','--destination','/tmp/fb-agentic-commerce/site','--cacheDir','/tmp/fb-agentic-commerce/cache','--noBuildLock','--quiet'],
 ['node','/Users/yingcong/.agents/skills/fieldbook/scripts/check-visuals.mjs','content/research/agentic-commerce/index.md'],
 ['node','research-dossiers/2026-11-03-agentic-commerce/check.mjs'],
 ['sips','-g','hasAlpha',*[str(p) for p in sorted((ROOT/'static/images/agentic-commerce').glob('*.png'))]],
]
log=[]
for cmd in commands:
 line='$ '+' '.join(cmd);print(line,flush=True);log.append(line)
 result=subprocess.run(cmd,cwd=ROOT,text=True,capture_output=True)
 output=result.stdout+result.stderr
 print(output,flush=True);print('exit_code='+str(result.returncode),flush=True)
 log.extend([output,'exit_code='+str(result.returncode)])
 (D/'phase2-verification.txt').write_text('\n'.join(log)+'\n')
 if result.returncode:sys.exit(result.returncode)
for p in sorted((ROOT/'static/images/agentic-commerce').glob('*.png')):
 im=Image.open(p).convert('RGBA');w,h=im.size
 corners=[im.getpixel(q)[3] for q in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]]
 edge=[im.getpixel((round((w-1)*i/40),y))[3] for i in range(41) for y in (0,h-1)]
 edge += [im.getpixel((x,round((h-1)*i/40)))[3] for i in range(41) for x in (0,w-1)]
 line=f'{p.name}: corners={corners}; edgeMax={max(edge)}; alpha_range={im.getchannel("A").getextrema()}'
 print(line);log.append(line)
 assert max(corners)==0 and max(edge)<=40
log.append('PASS build, visual coverage/collisions, all viewports, saved-file alpha')
(D/'phase2-verification.txt').write_text('\n'.join(log)+'\n')
print(log[-1])
