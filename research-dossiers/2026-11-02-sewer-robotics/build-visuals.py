from pathlib import Path
from html import escape
import json
ROOT=Path(__file__).resolve().parents[2]; OUT=ROOT/'static/images/sewer-robotics-ai'; OUT.mkdir(exist_ok=True)
INK='#27231e';RED='#9d4c3f';GREEN='#566e5e';MUTED='#665f52'
def t(x,y,s,size=30,c=INK,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}" text-anchor="{anchor}">{escape(s)}</text>'
def line(x,y,X,Y):return f'<path d="M{x},{y} L{X},{Y}" fill="none" stroke="{MUTED}" stroke-width="3"/>'
def box(y,a,b):return f'<rect x="30" y="{y}" width="660" height="96" rx="10" fill="none" stroke="{MUTED}" stroke-width="2"/>'+t(360,y+38,a,32,INK,'middle')+t(360,y+77,b,27,MUTED,'middle')
def save(name,title,desc,b,h):
 (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="720" height="{h}" viewBox="0 0 720 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><g font-family="Arial,Helvetica,sans-serif">{b}</g></svg>')
b=t(20,40,'THE PRODUCT IS A COMPLETED DECISION',30,RED)
for i,(a,z) in enumerate([('Reach the pipe','Access • clean • launch'),('Capture useful evidence','Locate • illuminate • inspect'),('Earn acceptance','Review • classify • submit'),('Fund the right intervention','Repair • clean • verify')]):
 y=75+i*125;b+=box(y,a,z)
 if i<3:b+=line(360,y+96,360,y+123)
save('loop.svg','From access to intervention','Conceptual workflow. A robot and AI are components; accepted evidence and funded action create value.',b,590)
b=t(20,40,'ONE SEWER. SEVERAL DIFFERENT JOBS.',30,RED)
for i,(a,z) in enumerate([('Above the water','Camera: visible surface condition'),('Below murky water','Sonar: shape, not optical crack detail'),('Across soft deposits','Traction and tether drag bind progress'),('Back to the surface','Recovery must work after power loss')]):
 y=78+i*122;b+=box(y,a,z)
save('physics.svg','A sewer robot capability envelope','Engineering schematic, not measured sensor performance. Different sensing and recovery functions address different constraints.',b,595)
b=t(20,40,'CHOOSE WHAT THE COMPANY OWNS',30,RED)
for i,(a,z) in enumerate([('Sell the software','Customer owns field execution'),('Sell processed inspection data','Own review; depend on supplied footage'),('Operate the inspection service','Own crews, delivery and operational downside'),('Build proprietary robotics','Only after repeat paid physical bottlenecks')]):
 y=78+i*122;b+=box(y,a,z)
save('wedge.svg','Three company boundaries and a hardware gate','Original strategic comparison. Software vendor, data service and full-stack operator own different work and obligations. Proprietary robotics require validated repeat demand.',b,595)
model=json.loads((Path(__file__).parent/'scenario-model.json').read_text());b=t(20,40,'COST PER ACCEPTED METRE',32,RED)+t(20,80,'SGD • invented service-cell scenarios',28,MUTED)
for i,r in enumerate(model['cases']):
 y=135+i*112;v=r['all_in_cell_cost_per_accepted_m'];w=v/5*415
 b+=t(20,y+30,r['name'].title(),30)+f'<rect x="135" y="{y}" width="{w:.2f}" height="42" fill="{RED if v>2.5 else GREEN}"/>'+t(145+w,y+32,f'${v:.2f}',31)
# Zero based cost axis with assumed revenue line.
b+=line(135,472,550,472)
for v in range(6):
 x=135+v/5*415;b+=line(x,472,x,481)+t(x,515,str(v),26,MUTED,'middle')
x=135+2.5/5*415;b+=f'<path d="M{x},115 L{x},467" stroke="{INK}" stroke-width="2" stroke-dasharray="7 7"/>'+t(20,565,'Dashed line: assumed price $2.50/m',28)+t(20,609,'Inputs are not quotes or market rates.',28,RED)
save('economics.svg','Service-cell cost sensitivity','Low 4.54, base 2.10, high 1.36 Singapore dollars per accepted metre, versus assumed 2.50 price. Zero-based cost axis. Not market evidence.',b,640)
b=t(20,40,'PROPOSED PROOF BEFORE AUTONOMY',30,RED)
for i,(a,z) in enumerate([('0–3 months: baseline + buyer access','Observe full jobs; price alternatives'),('3–6 months: sell a narrow service','Competent operators; repeat orders; collections'),('6–12 months: improve physical execution','Fund one payload or sensor from evidence'),('12–24 months: replicate or stop','Repeat contribution; approvals; working capital')]):
 y=78+i*127;b+=box(y,a,z)
 if i<3:b+=line(360,y+96,360,y+125)
save('roadmap.svg','A conditional 12 to 24 month plan','Proposed stage gates, not a forecast of procurement or technical success.',b,615)
b=t(20,40,'THREE TESTS BEFORE BUILDING A FLEET',30,RED)
for i,(a,z) in enumerate([('Does the customer lose money here?','Observe full cost of failed or repeated jobs'),('Can existing products solve it?','Buy and benchmark before rebuilding'),('Does our intervention improve the whole job?','Accepted output • critical misses • recovery')]):
 y=82+i*141;b+=box(y,a,z)
 if i<2:b+=line(360,y+96,360,y+139)
b+=t(360,550,'Any failed gate → stop or change the thesis.',29,RED,'middle')
save('decision.svg','The founder decision tree','Original falsification sequence. A safer, cheaper incumbent is a valid reason not to build.',b,585)
for r in model['cases']:
 d=r['paid_days'];m=r['accepted_m_per_day'];cost=1400*d+50000
 assert r['annual_cell_contribution_after_depreciation']==2.5*m*d-cost
 print(r['name'],f'cost/m={cost/(m*d):.6f}',f'annual_after_depreciation={2.5*m*d-cost:.0f}')
print('base break-even accepted m/day',(1400+50000/180)/2.5)
print('six original SVGs; transparent canvases, no background rectangles')
