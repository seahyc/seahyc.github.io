from pathlib import Path
from html import escape
import json,shutil
D=Path(__file__).resolve().parent; O=D.parents[1]/'static/images/subsea-robotics';O.mkdir(exist_ok=True)
INK='#27231e';RED='#9d4c3f';GREEN='#566e5e';MUTED='#665f52'
def t(x,y,s,size=25,c=INK):return f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}">{escape(s)}</text>'
def save(name,title,b,h=490):
 (O/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img"><title>{escape(title)}</title><g font-family="Arial, sans-serif">{b}</g></svg>')
def rows(title,items,foot,name):
 b=t(15,36,title,27,RED)
 for i,(a,z) in enumerate(items):
  y=85+i*101;b+=t(15,y,a,26)+t(15,y+36,z,23,MUTED)
  if i<len(items)-1:b+=f'<path d="M30,{y+46}v28" stroke="{GREEN}" stroke-width="2"/>'
 b+=t(15,85+len(items)*101,foot,21,MUTED);save(name,title,b,125+len(items)*101)
rows('THE UNDERWATER CONTROL LOOP',[
 ('Surface: plan and locate','GPS fix + mission bounds + abort rules'),
 ('Submerged: sense and decide','Navigation + local observations + uncertainty'),
 ('Sparse acoustic messages','Status and commands; no broadband assumption'),
 ('Return: review and compare','Recover raw data; qualify accepted coverage')], 'Conceptual synthesis · NOAA / WHOI / NOC', 'mechanism.svg')
m=json.loads((D/'scenario-model.json').read_text());shutil.copyfile(D/'scenario-model.json',O/'scenario-model.json')
b=t(15,35,'A JOB CAN PAY. THE COMPANY MAY NOT.',25,RED)+t(15,75,'USD thousands / year · invented scenarios',23,MUTED)
# Diverging axis: zero origin explicit, common linear scale.
x0=385;scale=.34
for i,r in enumerate(m['cases']):
 y=130+i*105;v=r['annual_economic_contribution_after_depreciation']/1000
 b+=t(15,y,r['name'].title(),25)+f'<rect x="{x0+min(v,0)*scale}" y="{y+16}" width="{abs(v)*scale}" height="31" fill="{RED if v<0 else GREEN}"/>'+t(15,y+77,f'{v:+,.0f} after company costs',23)
b+=f'<path d="M{x0},104V455" stroke="{INK}" stroke-width="2"/>'+t(x0-7,485,'0',23)+t(15,530,'Includes cash fixed costs + depreciation.',23)+t(15,565,'Source: original model · 3 Nov 2026',21,MUTED)
save('economics.svg','Annual economic contribution, USD thousands, original scenarios',b,590)
rows('THREE DIFFERENT WAYS TO BE PAID',[
 ('Inspection service','Accepted evidence + repeat scoped work'),
 ('Qualified component','OEM design win + reliability qualification'),
 ('Defence system','Sponsor + eligibility + integration + support')], 'Buyer categories, not interchangeable markets.', 'buyers.svg')
rows('PROOF BEFORE A PROPRIETARY FLEET',[
 ('Months 0–2: earn access','Owner + contractor + scope + competing quotes'),
 ('Months 2–6: prove accepted savings','Matched campaigns + all attempts + paid repeat'),
 ('Months 6–12: remove one bottleneck','Fund autonomy only from measured job friction'),
 ('Months 12–24: replicate or stop','Second owner; contribution; rights; recovery')], 'Proposed gates · not a procurement forecast', 'roadmap.svg')
print('4 original SVGs written; minimum text 21 px at 600 px width; model copied verbatim')
