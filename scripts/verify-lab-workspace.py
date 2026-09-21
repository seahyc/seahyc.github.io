"""Build/check the exact public workspace download; never bundle reference solutions."""
import sys
from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]/'static/practice/lab'
files={name:root/'kit'/name for name in ('README.md','candidate.py','harness.py','test_candidate.py')}
files.update({'coach.py':root/'coach.py','program.json':root/'program.json'})
archive=root/'workspace.zip'
if '--write' in sys.argv:
    with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
        for name,p in sorted(files.items()):
            info=zipfile.ZipInfo(name,(2026,9,21,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED
            z.writestr(info,p.read_bytes())
with zipfile.ZipFile(archive) as z:
    assert set(z.namelist())==set(files),'Unexpected or missing workspace files'
    for name,p in files.items():assert z.read(name)==p.read_bytes(),f'Stale download: {name}'
print(f'PASS workspace archive exactly matches {len(files)} public source files; no fixtures included')
