from pathlib import Path
from html import escape
out=Path('/Users/yingcong/Code/seahyc.github.io/static/images/malleable-software');out.mkdir(parents=True,exist_ok=True)
INK='#27231e';RED='#9d4c3f';GREEN='#527367';MUTED='#81766a'
def txt(x,y,s,size=25,color=INK,anchor='start'):
 return f'<text x="{x}" y="{y}" font-family="Georgia,serif" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(s)}</text>'
def box(y,title,sub,color=GREEN):
 return f'<rect x="25" y="{y}" width="550" height="82" rx="8" fill="none" stroke="{color}" stroke-width="2"/>'+txt(45,y+32,title,27,color)+txt(45,y+62,sub,22)
def arrow(y):return f'<path d="M300 {y} v24 m-7 -7 l7 7 7 -7" fill="none" stroke="{MUTED}" stroke-width="2"/>'
def save(name,title,body,h):
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title>{body}</svg>'
 (out/f'{name}.svg').write_text(svg)
save('promise','An employee changes a tool inside a maintained company environment',box(12,'Operator: “change this workflow”','Describe → preview → revise')+arrow(100)+box(133,'Company: approved operating space','Identity · data scope · version history')+arrow(221)+box(254,'Team: a tool that survives change','Named owner · behavior checks · repair')+txt(300,380,'Proposed product, not demonstrated demand',21,MUTED,'middle'),400)
save('boundaries','Three separate boundaries for employee-built software',box(10,'1. Generated app is untrusted','Isolated runtime; no raw secrets')+arrow(98)+box(131,'2. Trusted host checks each action','Person + record + operation + approval')+arrow(219)+box(252,'3. Business system stays authoritative','Read approved data; stage bounded writes')+txt(300,370,'Browser outputs and logs need controls too',22,RED,'middle'),390)
body=txt(20,35,'The competitive bar is already high',29)
rows=[('Retool','Build elsewhere → governed deployment'),('Cloudflare OS','Personal apps → resource Gatekeepers'),('Power Platform / AppSheet','Low-code + administration + lifecycle'),('Replit / Lovable / Airtable','AI creation + managed platform controls')]
for i,(a,b) in enumerate(rows):
 y=65+i*82
 body+=f'<path d="M20 {y+70} H580" stroke="{MUTED}" stroke-width="1"/>'+txt(20,y+23,a,27,GREEN)+txt(20,y+54,b,22)
body+=txt(20,435,'Documented / advertised; not hands-on tested',22,RED)
save('competition','Existing alternatives already combine creation, hosting and governance',body,455)
save('lifecycle','A maintained release loop includes business checks and recovery',box(10,'Describe a change + examples','Keep the previous working version')+arrow(98)+box(131,'Preview against safe test records','Check permissions AND business rules')+arrow(219)+box(252,'Approve a version; watch its behavior','On drift: freeze writes, investigate, repair')+txt(300,380,'Rollback code ≠ undo external side effects',24,RED,'middle'),400)
body=txt(20,35,'Support hours decide the margin',29)+txt(20,69,'Scenario: $1,500 revenue / customer / month',23,MUTED)
for i,(hours,value,margin) in enumerate([(2,1200,80),(6,900,60),(16,150,10)]):
 y=110+i*95
 body+=txt(20,y,f'{hours} support hours → ${value:,} contribution',25)+f'<rect x="20" y="{y+12}" width="{value/1200*440}" height="18" fill="{GREEN if i<2 else RED}"/>'+txt(480,y+29,f'{margin}%',25)
body+=txt(20,415,'Assumed: $150 infra + $75 / support hour',22,MUTED)+txt(20,447,'Before acquisition, R&D and central overhead',22,MUTED)
save('economics','Illustrative contribution at two six and sixteen recurring support hours',body,470)
save('roadmap','An evidence-gated path from pilot to a reusable platform',box(10,'0–3 months: prove the job','Paid pilots; compare existing alternatives')+arrow(98)+box(131,'4–12 months: repeat one workflow','Measure renewals, repairs and onboarding')+arrow(219)+box(252,'13–24 months: earn the platform','Expand only if common policy + tests recur')+txt(300,380,'Stop expansion when service effort stays bespoke',22,RED,'middle'),400)
print('Wrote',len(list(out.glob('*.svg'))),'original explanatory SVGs')
