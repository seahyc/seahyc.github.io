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
 y=130+i*135;v=r['annual_economic_contribution_after_depreciation']/1000
 b+=t(15,y,r['name'].title(),25)+f'<rect x="{x0+min(v,0)*scale}" y="{y+16}" width="{abs(v)*scale}" height="31" fill="{RED if v<0 else GREEN}"/>'+t(15,y+77,f'{v:+,.0f} after company costs'.replace('-', '−'),23)
b+=f'<path d="M{x0},104V515" stroke="{INK}" stroke-width="2"/>'+t(x0-7,545,'0',23)+t(15,590,'Includes cash fixed costs + depreciation.',23)+t(15,625,'Source: original model · 3 Nov 2026',21,MUTED)
save('economics.svg','Annual economic contribution, USD thousands, original scenarios',b,650)
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

# Visual revision: one claim-specific plate per formerly unillustrated card.
rows('DAMAGE IS NOT ATTRIBUTION',[
 ('Condition inspection','What changed along this corridor?'),
 ('Protection and monitoring','Can a harmful event be deterred or noticed?'),
 ('Attribution','Who caused it, and what proves intent?'),
 ('Repair readiness','How will service be restored?')], 'Conceptual product boundaries · card 01 sources', 'failure-products.svg')
rows('FROM INFRASTRUCTURE TO REVENUE',[
 ('Useful observation','Can the chosen sensor answer the question?'),
 ('Permission and operating window','Can we lawfully and safely reach the site?'),
 ('Accepted evidence','Does the result meet the engineer’s scope?'),
 ('Profitable paid work','Does payment cover the complete job?')], 'Proposed commercial filter · not a market count', 'permission-funnel.svg')
rows('LET THE QUESTION CHOOSE THE SENSOR',[
 ('Seabed geometry','Sonar: corridor shape and observable features'),
 ('Visible external condition','Optics: useful only when visibility permits'),
 ('Burial depth','Requires appropriate additional sensing'),
 ('Internal electrical health','Outside this proposed external survey offer')], 'Proposed scope · HUGIN architecture / card 05', 'sensor-envelope.svg')
rows('COMPARE AN OFFER, NOT A DEMO',[
 ('Capture and reporting','BeeX: autonomous capture to reporting'),
 ('Integrated survey stack','HUGIN: vehicle plus multiple sensors'),
 ('Resident operations','Sabertooth: docking, charging, data transfer'),
 ('Inspection workflow','EIVA: onboard survey and inspection software')], 'Supplier-described offers · not a ranking', 'incumbent-offers.svg')
# Separate row headers and value lanes avoid category/value collisions.
b=t(15,35,'THE VESSEL RATE CHANGES THE JOB',26,RED)+t(15,76,'USD thousands per campaign · scenario',23,MUTED)
for i,(rate,v) in enumerate([(4,21),(8,1),(12,-19)]):
 y=130+i*145
 b+=t(15,y,f'Vessel: ${rate:,}k/day',25)
 x0=300;scale=8
 b+=f'<rect x="{x0+min(v,0)*scale}" y="{y+20}" width="{abs(v)*scale}" height="28" fill="{GREEN if v>0 else RED}"/>'
 b+=t(15,y+83,f'Job contribution: {v:+,}k'.replace('-', '−'),23)
b+='<path d="M300,145V475" stroke="#27231e" stroke-width="2"/>'+t(295,512,'0',23)+t(15,555,'Other base inputs held constant.',23)+t(15,591,'Original model · 3 Nov 2026 · not quotes',21,MUTED)
save('vessel-stress.svg','Vessel day price stress and campaign contribution in USD thousands',b,620)
rows('CASH TIED UP BEFORE THE NEXT JOB',[
 ('Equipment: $300,000','Assumed vehicle and sensor purchase'),
 ('Invoices: about $177,534','Base steady billing; 90-day receivables'),
 ('Fixed cash: $300,000','Half a year of assumed company expenses'),
 ('Partial inventory: about $777,534','Excludes ramp losses, tax and financing')], 'USD · invented base model · 3 Nov 2026', 'cash-inventory.svg')
b=t(15,35,'CABLE LOSSES: FREQUENCY ≠ SEVERITY',24,RED)+t(15,76,'Share of claims by count · AXIS cohort',23,MUTED)
for i,(name,v) in enumerate([('Turbines',57),('Inter-array cable',14),('Export cable',6)]):
 y=130+i*110;b+=t(15,y,name,25)+f'<rect x="15" y="{y+19}" width="{v*7}" height="30" fill="{GREEN if i==0 else RED}"/>'+t(30+v*7,y+44,f'{v}%',25)
b+=t(15,470,'Mean export-cable claim: US$18.8m',25)+t(15,510,'Loss dates: Jan 2021–Sep 2025',22,MUTED)+t(15,548,'JNRC / AXIS · 2026 claims bulletin',21,MUTED)+t(15,582,'Not fleet failure rates or preventability.',21,MUTED)
save('claims-cohort.svg','Wind claims by count and average export cable claim size',b,610)
rows('PRECOMMIT TO THE STOP DECISION',[
 ('Day 45: access and alternatives','8 interviews / 3 job packs / 2 priced options'),
 ('Day 60: agree the envelope','Coverage, permissions, insurance, recovery'),
 ('Days 60–120: matched comparison','6 campaigns; target ≥20% lower full cost'),
 ('Month 6: paid repeat or stop','2 repeat scopes; collection; feasible break-even')], 'Founder screening targets · not certification', 'stop-gates.svg')
print('Visual revision: 8 additional SVGs; minimum text 21 px; no new factual claims')
