"""Visual-pass additions. Original diagrams; no new empirical claims.
All scenario values read directly from the existing dossier model.
"""
from pathlib import Path
from html import escape
import json
D = Path(__file__).resolve().parent
OUT = D.parents[1] / 'static/images/clinical-trial-compression'
MODEL = json.loads((D / 'scenario-model.json').read_text())
INK, MUTED, SAGE, RED = '#27231e', '#665f52', '#566e5e', '#9d4c3f'

def t(x,y,s,size=24,color=INK):
    return f'<text x="{x}" y="{y}" font-family="Georgia,serif" font-size="{size}" fill="{color}">{escape(str(s))}</text>'
def ln(x,y,X,Y,color=MUTED,dash=''):
    return f'<path d="M{x} {y} L{X} {Y}" fill="none" stroke="{color}" stroke-width="2" stroke-dasharray="{dash}"/>'
def box(x,y,w,h,color=SAGE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="none" stroke="{color}" stroke-width="2"/>'
def down(x,y,h=28):
    return ln(x,y,x,y+h)+ln(x-6,y+h-7,x,y+h)+ln(x+6,y+h-7,x,y+h)
def save(name,title,desc,b,h):
    (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{b}</svg>\n')

b=t(20,36,'A task result has a boundary',29)
b+=box(20,65,560,142)+t(40,100,'Manufacturing batch-record review',26,SAGE)+t(40,144,'89% less human review time',28,SAGE)+t(40,181,'Company-reported; advisory system',23)
b+=down(300,219)+t(20,286,'Human quality decision remains',27)
b+=ln(20,312,580,312,RED,'7 6')+t(20,352,'No measured bridge to total trial time',26,RED)
b+=box(20,380,560,91,RED)+t(40,416,'Clinical milestones',26)+t(40,450,'Timing effect not established by this result',22)
b+=t(20,517,'Sources: Anthropic / Enveda reports',22,MUTED)+t(20,549,'Company evidence · checked 3 Nov 2026',22,MUTED)
save('ai-boundary','Task improvement is not whole-trial acceleration','The 89% company-reported human review-time reduction applies to manufacturing batch records. Human quality staff retain decisions. The result does not establish total clinical-trial acceleration.',b,575)

b=t(20,36,'Singapore: parallel paths, distinct gates',27)
b+=t(20,81,'CTA application',25,SAGE)+t(20,115,'30 working days',25,SAGE)+t(20,148,'Standard HSA clock',22)+t(20,181,'Stop clocks excluded',22)
b+=t(330,81,'Ethics review',25,SAGE)+t(330,115,'Runs in parallel',24)+t(330,148,'Separate review',22)+t(330,181,'and decision',22)
b+=ln(150,205,150,242)+ln(450,205,450,242)+ln(150,242,450,242)+down(300,242)
b+=box(20,291,560,94)+t(40,327,'Both reviews are not all of startup',26,RED)+t(40,362,'Site readiness must also be established',24)
b+=t(20,428,'Do not borrow the CTN route as a shortcut.',24)+t(20,464,'Sponsor responsibilities persist.',24)
b+=t(20,515,'Sources: HSA application + sponsor guidance',22,MUTED)+t(20,547,'Process diagram; lengths are not durations',22,MUTED)
save('approval-path','HSA and ethics review can run in parallel','The standard CTA turnaround is 30 working days excluding clarification stop clocks. Ethics review can run in parallel. Completion does not establish site readiness; CTN is a different route.',b,575)

# Two honest, common-scale diverging panels. Categories ABOVE each row;
# value labels BELOW each bar, so negatives cannot collide with categories.
b=t(20,36,'Supplier and buyer can disagree',29)+t(20,73,'USD per package · invented scenarios',23,MUTED)
zero=296; scale=0.0034
for panel,(key,title) in enumerate([('contribution_after_acquisition','Supplier: contribution after acquisition'),('customer_cash_benefit_less_fee','Buyer: cash benefit less fee')]):
    top=118+panel*377
    b+=t(20,top,title,25,SAGE if panel==0 else RED)
    b+=ln(zero,top+22,zero,top+287)
    for i,c in enumerate(MODEL['service_cases']):
        y=top+49+i*91; value=c[key]; end=zero+value*scale
        b+=t(20,y,c['name'].title(),23)
        b+=f'<rect x="{min(zero,end):.1f}" y="{y+10}" width="{abs(value*scale):.1f}" height="15" fill="{SAGE if value>=0 else RED}"/>'
        label=('−' if value<0 else '')+f'${abs(value):,.0f}'
        b+=t(min(450,max(30,end-40)),y+52,label,23,SAGE if value>=0 else RED)
    b+=t(zero-8,top+316,'0',21,MUTED)
b+=t(20,861,'Common zero and scale in both panels.',22,MUTED)+t(20,896,'Source: scenario-model.json · 3 Nov 2026',22,MUTED)+t(20,931,'Before fixed overhead / buyer integration costs',22,MUTED)
save('scenario-range','Scenario contribution differs for supplier and buyer','Invented low, base and high scenarios. Supplier contributions are minus 30000, 24800 and 64400 USD. Buyer cash benefits less fee are minus 65000, minus 30000 and 70000 USD. Identical diverging scales and zero baselines.',b,959)

b=t(20,36,'Measure every delivery attempt',29)
b+=box(20,65,560,74)+t(40,97,'Start with all assignments',26,SAGE)+t(40,125,'Include cancellations and failed deliveries',22)
b+=down(300,148)+t(20,209,'Separate the elapsed-time components',25)
for y,a,c in [(233,'Input waiting + active work',SAGE),(300,'Expert queue + corrections',SAGE),(367,'Contracts + authority + supply',RED)]:
    b+=box(20,y,560,51,c)+t(40,y+34,a,25,c)
b+=down(300,428)+t(20,489,'Accepted package → first patient',27)
b+=t(20,528,'Compare with a usual-workflow baseline.',24)+t(20,566,'Independently adjudicate critical misses.',24)
b+=t(20,616,'Proposed measurement design; no results yet.',22,MUTED)
save('measurement','Measure the accepted path rather than generated pages','A proposed measurement flow begins with all attempted deliveries, separates waiting, work, expert review, corrections and external dependencies, and compares accepted-package and first-patient milestones with a baseline while independently reviewing quality.',b,645)

b=t(20,36,'Two equations, two decisions',29)+t(20,77,'Author assumptions · USD · 3 Nov 2026',22,MUTED)
b+=box(20,105,560,206)+t(40,142,'Supplier contribution',28,SAGE)+t(40,187,'Fee − delivery − reserve − acquisition',24)+t(40,231,'Delivery includes hours × loaded rate',23)+t(40,272,'and other direct costs.',23)
b+=box(20,342,560,216,RED)+t(40,380,'Buyer avoidable cash benefit',28,RED)+t(40,426,'Workflow days saved',25)+t(40,464,'× fraction that advances the critical path',23)+t(40,502,'× documented avoidable cash per day',23)+t(40,538,'Then subtract the fee.',23)
b+=t(20,603,'Company viability also needs fixed overhead.',23)+t(20,639,'Buyer value also needs integration costs.',23)
b+=t(20,686,'Source: scenario-model.json; not market rates.',22,MUTED)
save('model-equations','Supplier and buyer economics use different equations','Supplier contribution subtracts delivery, reserve and acquisition from fee. Delivery comprises hours times loaded rate and other direct costs. Buyer cash benefit multiplies saved workflow days, critical-path fraction and avoidable daily cash, then subtracts the fee. Fixed overhead and buyer integration costs require separate consideration.',b,715)

b=t(20,36,'What each evidence layer earns',29)
for y,title,yes,no in [(75,'Regulators','Rules, routes and responsibilities','Not this company’s measured effect'),(205,'Observational studies','Burden in a defined historical cohort','Not current avoidable customer delay'),(335,'Company reports','Reported use or bounded task results','Not independent whole-trial proof'),(465,'Founder scenarios','Inspectable assumptions and arithmetic','Not demand, pricing or observed savings')]:
    b+=box(20,y,560,109)+t(40,y+32,title,27,SAGE)+t(40,y+66,yes,23)+t(40,y+96,no,22,RED)
b+=down(300,584)+t(20,650,'Next: actual timelines + paid acceptance',25)
b+=t(20,694,'Source: dossier evidence ledger · 3 Nov 2026',22,MUTED)
save('evidence-boundary','Evidence layers answer different questions','Regulators establish rules. Observational cohorts establish bounded historical burden. Company reports establish reported use and task results. Founder scenarios expose arithmetic. None establishes this startup’s customer-specific acceleration; actual timelines and paid acceptance are the proposed next evidence.',b,725)
print('Wrote 6 explanatory SVGs:')
for n in ['ai-boundary','approval-path','scenario-range','measurement','model-equations','evidence-boundary']:
    print(f'  static/images/clinical-trial-compression/{n}.svg')
