from pathlib import Path
from html import escape
import json
ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'static/images/pipeline-in-a-person'
INK='#27231e'; RED='#9d4c3f'; MUTED='#665f52'; GREEN='#566e5e'; PALE='#dfd5bf'

def text(x,y,value,size=32,color=INK,anchor='start',weight='normal'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}" font-weight="{weight}">{escape(value)}</text>'
def line(x1,y1,x2,y2,color=MUTED,arrow=False):
 return f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{color}" stroke-width="3"'+(' marker-end="url(#a)"' if arrow else '')+'/>'
def box(x,y,w,h,label,sub=None,color=INK):
 a=f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="none" stroke="{color}" stroke-width="2.5"/>'
 a+=text(x+w/2,y+(h/2+11 if not sub else 39),label,32,color,'middle')
 if sub:a+=text(x+w/2,y+77,sub,27,MUTED,'middle')
 return a

def save(name,title,desc,body,h):
 svg=f'''<svg xmlns="http://www.w3.org/2000/svg" width="720" height="{h}" viewBox="0 0 720 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><defs><marker id="a" markerWidth="9" markerHeight="9" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8" fill="none" stroke="{MUTED}" stroke-width="1.5"/></marker></defs><g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>'''
 (OUT/name).write_text(svg)

b=text(20,40,'RENT THE CAPACITY. OWN THE DECISION.',30,RED,weight='bold')
b+=box(140,80,440,110,'Founder + scientific lead','Question • criteria • interpretation')
b+=line(360,190,360,225)+line(125,225,595,225)
for x,label,sub in [(20,'AI design','Candidates'),(255,'Contract labs','Measurements'),(490,'Independent','Review')]:
 b+=line(x+105,225,x+105,262,arrow=True)+box(x,268,210,110,label,sub)
 b+=line(x+105,378,x+105,414)
b+=line(125,414,595,414)+line(360,414,360,450,arrow=True)
b+=box(90,458,540,112,'Transferable asset','Candidate + evidence + rights',GREEN)
b+=text(360,617,'Scientific responsibility stays at the centre.',29,MUTED,'middle')
save('distributed-lab.svg','The distributed therapeutic company','Conceptual operating model. Outsourced design and measurement require central scientific accountability.',b,650)

b=text(20,40,'A PATHWAY, NOT JUST A BINDING TARGET',30,RED,weight='bold')
b+=box(80,78,560,110,'C1 inhibitor deficiency','Loss of normal pathway restraint')
b+=line(360,188,360,235,arrow=True)
b+=box(80,245,560,100,'Excess kallikrein activity')
b+=line(360,345,360,399,arrow=True)
b+=box(80,410,560,110,'Excess bradykinin','Increased permeability / swelling')
b+=text(360,575,'Inhibitory antibody acts on kallikrein',31,GREEN,'middle',weight='bold')
b+=text(360,618,'It does not replace the missing inhibitor.',29,MUTED,'middle')
save('mechanism.svg','Hereditary angioedema mechanism','Simplified FDA-label pathway: insufficient C1 inhibitor regulation, excess kallikrein activity and bradykinin; lanadelumab inhibits kallikrein.',b,650)

b=text(20,40,'EACH RUNG EARNS A DIFFERENT CLAIM',30,RED,weight='bold')
for i,(label,sub) in enumerate([('Design','Plausible candidate'),('Binding','Attaches under measured conditions'),('Function','Changes relevant activity'),('Exposure','Active where it must work'),('Disease relevance','Meaningful effect in a suitable system'),('Transfer','Reproducible evidence and rights')]):
 y=74+i*117
 b+=text(35,y+47,str(i+1),37,RED,weight='bold')+box(90,y,605,96,label,sub)
 if i<5:b+=line(390,y+96,390,y+114,arrow=True)
save('evidence-ladder.svg','The evidence ladder','A proposed evidence framework. Each stage answers a distinct question and can stop or redirect the program.',b,795)

model=json.loads((Path(__file__).parent/'scenario-model.json').read_text())
b=text(20,40,'ILLUSTRATIVE CASH ENVELOPES',32,RED,weight='bold')
b+=text(20,82,'USD thousands • allocations, not vendor quotes',27,MUTED)
for i,(key,label) in enumerate([('low','Low'),('base','Base'),('high','High')]):
 total=sum(r[key] for r in model['rows'])/1000;y=130+i*117
 b+=text(20,y+28,label,32)+f'<rect x="135" y="{y}" width="{total/1500*430}" height="44" fill="{GREEN if i<2 else RED}"/>'
 b+=text(135+total/1500*430+14,y+32,f'{total:,.0f}',32,weight='bold')
b+=line(135,480,565,480)
for value in [0,500,1000,1500]:
 x=135+value/1500*430
 b+=line(x,480,x,490)+text(x,525,f'{value:,}',25,MUTED,'middle')
b+=text(20,590,'Includes expertise, assays, exposure, rights',29)
b+=text(20,632,'and rework. Excludes founder pay and trials.',29)
b+=text(20,681,'The high case is not a maximum.',29,RED)
save('budget.svg','Cash envelopes, not prices','Zero-based bar comparison: low 225, base 600, high 1500 thousand US dollars. Original scenarios, not quotes or guaranteed budgets.',b,720)

b=text(20,40,'A TARGET MUST SURVIVE EVERY GATE',30,RED,weight='bold')
for i,(label,sub) in enumerate([('Mechanism','Right direction and modality?'),('Function','Informative, transferable readout?'),('Differentiation','Better for a defined patient group?'),('Rights + finance','Transferable and next gate funded?')]):
 y=82+i*147
 b+=box(50,y,620,110,label,sub)
 if i<3:b+=line(360,y+110,360,y+140,arrow=True)
b+=text(360,732,'Any “no” → stop before synthesis.',32,RED,'middle',weight='bold')
save('wedge.svg','Proposed target selection gates','A proposed screening flow. Mechanism, function, differentiation, rights and finance must each pass before synthesis.',b,770)

b=text(20,40,'INVENTED INPUTS. REAL ARITHMETIC.',30,RED,weight='bold')
for i,(label,sub) in enumerate([('Start: spend $60k','All programmes in this scenario'),('30% pass function','Then spend $120k'),('25% of those pass translation','Then spend $300k'),('20% of those secure a sale','Assume $5m net upfront if sold')]):
 y=85+i*142
 b+=box(30,y,660,110,label,sub)
 if i<3:b+=line(360,y+110,360,y+136,arrow=True)
b+=text(360,704,'Joint sale probability: 1.5%',34,RED,'middle',weight='bold')
b+=text(360,751,'Expected spend: $118.5k',32,INK,'middle')
b+=text(360,796,'Expected proceeds: $75k',32,INK,'middle')
save('option-tree.svg','An invented sequential option model','Not a biotech success forecast. Conditional assumed gates 30 percent, 25 percent, 20 percent multiply to 1.5 percent; expected spend 118500 dollars.',b,835)

b=text(20,40,'PROPOSED 12–24 MONTH SEQUENCE',30,RED,weight='bold')
for i,(time,label,sub) in enumerate([('0–2 mo','Choose + price','Mechanism, comparator, bids, rights'),('2–6 mo','Test function','Repeatable comparator-relative result'),('6–12 mo','Test relevance','Exposure and disease evidence'),('12–24 mo','Challenge + transfer','Reproduce; partner, finance or stop')]):
 y=85+i*160
 b+=text(20,y+30,time,29,RED,weight='bold')+box(175,y,520,110,label,sub)
 if i<3:b+=text(435,y+143,'STOP / GO',24,MUTED,'middle')
b+=text(360,798,'Sale is not a scheduled milestone.',32,RED,'middle',weight='bold')
save('roadmap.svg','Proposed path of attack','Conditional phases with stop/go gates, not a timeline guarantee or experimental protocol.',b,835)
print('Wrote seven original transparent-canvas SVG diagrams/charts')
for key in ['low','base','high']:print(key,sum(r[key] for r in model['rows']))
s=model['staged_example']; spend=s['initial']+s['p_function']*s['functional_follow_on']+s['p_function']*s['p_translation_given_function']*s['translational_follow_on']; prob=s['p_function']*s['p_translation_given_function']*s['p_deal_given_translation']
print('expected_spend',spend,'joint_probability',prob,'expected_upfront',prob*s['net_upfront_if_sold'],'surplus',prob*s['net_upfront_if_sold']-spend)
assert spend==118500 and abs(prob-.015)<1e-10
