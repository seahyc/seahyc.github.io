"""Deterministic native downloads. Public starter files only, never reference answers."""
import sys,zipfile,json
from pathlib import Path
root=Path(__file__).resolve().parents[1]/'static/practice/lab/advanced'
for package in ['jax','torch','systems','gym']:
 directory=root/package
 manifest=json.loads((directory/'manifest.json').read_text())
 names={'manifest.json'}
 for a in manifest['assessments']:names.update(a['files'])
 assert all('/' not in n and not n.startswith('.') for n in names)
 files={name:directory/name for name in names};files['coach.py']=root.parent/'coach.py';names=set(files)
 archive=directory/'workspace.zip'
 if '--write' in sys.argv:
  with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
   for name in sorted(names):
    info=zipfile.ZipInfo(name,(2026,9,21,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
    z.writestr(info,files[name].read_bytes())
 with zipfile.ZipFile(archive) as z:
  assert set(z.namelist())==names
  for name in names:assert z.read(name)==files[name].read_bytes(),f'{package}/{name} stale download'
 print(f'PASS {package} archive: {len(names)} exact public source files')
