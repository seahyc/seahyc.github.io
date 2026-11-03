"""Original conceptual diagrams and explicitly labelled scenario charts; stdlib only."""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'static/images/clinical-trial-compression'
OUT.mkdir(parents=True, exist_ok=True)
MODEL = json.loads((Path(__file__).parent / 'scenario-model.json').read_text())
BASE = next(x for x in MODEL['service_cases'] if x['name'] == 'base')
INK, MUTED, SAGE, RED = '#27231e', '#665f52', '#566e5e', '#9d4c3f'

def text(x, y, value, size=24, color=INK):
    return f'<text x="{x}" y="{y}" font-family="Georgia,serif" font-size="{size}" fill="{color}">{escape(value)}</text>'

def line(x1, y1, x2, y2, color=MUTED):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="2"/>'

def card(y, title, detail, color=SAGE):
    return f'<rect x="20" y="{y}" width="560" height="82" rx="8" fill="none" stroke="{color}" stroke-width="2"/>' + text(38, y+32, title, 26, color) + text(38, y+63, detail, 22)

def arrow(y):
    return f'<path d="M300 {y} v24 m-7 -7 l7 7 7 -7" fill="none" stroke="{MUTED}" stroke-width="2"/>'

def save(name, title, desc, body, height):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{body}</svg>'
    (OUT / f'{name}.svg').write_text(svg + '\n')

body = text(20, 35, 'Startup waits for all three branches', 28)
for y, label, end, color in [(110, 'Protocol readiness', 360, SAGE), (220, 'Site contracting', 510, RED), (330, 'Drug supply', 430, SAGE)]:
    body += text(20, y-20, label, 25, color) + line(30, y, end, y, color) + f'<circle cx="{end}" cy="{y}" r="6" fill="{color}"/>' + line(end, y, 550, y) + line(550, y, 550, 390)
body += text(20, 405, 'All ready → startup may proceed', 27, SAGE)
body += text(20, 460, 'Faster protocol work advances startup') + text(20, 492, 'only when the longest binding branch') + text(20, 524, 'changes. Other constraints can take over.')
body += text(20, 575, 'Conceptual dependencies; no time scale', 22, MUTED)
save('critical-path', 'Parallel startup dependencies', 'Conceptual parallel branches join at startup. Site contracting is drawn as binding. Branch lengths are illustrative, not measured durations.', body, 600)

body = text(20, 35, 'Different clocks, separate zero baselines', 27)
for i, (label, days) in enumerate([('Initiation', 130.0), ('Enrollment', 438.5), ('Protocol to database lock', 1027.9)]):
    y = 100 + i*125
    body += text(20, y, label, 26) + text(20, y+33, f'{days:,.1f} days', 23, SAGE) + line(20,y+44,20,y+74) + f'<rect x="20" y="{y+48}" width="{days/1027.9*530:.2f}" height="20" fill="{SAGE}"/>'
body += text(20, 465, '0', 21, MUTED) + text(20, 505, 'Historical Phase II means; do not add them.', 23, RED) + text(20, 545, 'Tufts · PMC9373886 · Table 6', 22, MUTED) + text(20, 577, '187 protocols in the overall study cohort', 22, MUTED)
save('clocks', 'Historical Phase II duration means', 'Three independent zero-based bars show initiation 130.0 days, enrollment 438.5 days, and protocol to database lock 1027.9 days. They are not additive. Table 6 of PMC9373886; overall cohort 187 protocols.', body, 610)

body = text(20, 35, 'Remote visits change location', 29) + text(20, 72, 'The evidence standard still applies.', 25, RED)
body += card(110, 'External observed controls', 'Outcomes observed outside this trial') + card(231, 'Predicted prognosis', 'A model estimates an untreated outcome') + card(352, 'Randomized comparison', 'Assignment creates a concurrent comparison')
body += text(20, 480, 'These are distinct evidence designs.', 25, RED) + text(20, 515, 'Suitability needs design-specific review.', 23) + text(20, 560, 'Separate methods; no blanket acceptance.', 22, MUTED)
save('design', 'Location and comparison design are separate choices', 'Remote visits do not lower the evidence standard. External observed controls, predicted prognosis and randomized comparisons are distinct and not automatically interchangeable.', body, 590)

body = text(20, 35, 'Proposed readiness package', 29)
for i, label in enumerate(['Evidence matrix', 'Clinical issue log', 'Site-confirmed feasibility', 'Named dependency owners']):
    y = 70+i*62
    body += f'<rect x="20" y="{y}" width="560" height="49" rx="6" fill="none" stroke="{SAGE}"/>' + text(38,y+33,label,25,SAGE)
body += arrow(310) + card(345, 'Qualified sponsor acceptance', 'Explicit scope, open issues and sign-off')
body += text(20, 475, 'Outside this package', 26, RED) + text(20, 511, 'Clinical care · drug supply · full monitoring', 22) + text(20, 546, 'Regulator decisions remain external.', 23)
save('wedge', 'Proposed package boundary and acceptance', 'Four readiness deliverables feed qualified sponsor acceptance. Clinical care, drug supply, full monitoring and regulator decisions are outside the proposed package.', body, 580)

body = text(20, 35, 'Base scenario · USD assumptions', 28) + text(20, 78, 'Supplier contribution per package', 26, SAGE)
rows = [('Fee', BASE['price']), ('Less direct delivery', -BASE['direct_delivery_cost']), ('Less acquisition', -BASE['acquisition_cost_per_project']), ('Contribution', BASE['contribution_after_acquisition'])]
for i,(label,value) in enumerate(rows):
    y=123+i*49
    body += text(20,y,label,24) + text(420,y,f'{value:,.0f}',24,SAGE if value>0 else MUTED)
body += line(20,285,580,285) + text(20,329,'Buyer cash value is a separate test',26,RED)
for i,(label,value) in enumerate([('Avoidable cash benefit',BASE['customer_cash_benefit']),('Less fee',-BASE['price']),('Benefit less fee',BASE['customer_cash_benefit_less_fee'])]):
    y=376+i*49
    body += text(20,y,label,24)+text(420,y,f'{value:,.0f}',24,RED if value<0 else SAGE)
body += text(20,541,'Supplier profit does not establish buyer ROI.',23,RED) + text(20,582,'Source: scenario-model.json; not market quotes.',21,MUTED)
save('economics','Supplier contribution and buyer value diverge','Base scenario assumptions: fee 90000, direct delivery 56200, acquisition 9000, contribution 24800. Separately buyer cash benefit 60000 less fee 90000 equals negative 30000; before any customer integration cost.',body,610)

body = text(20,35,'Different commercial roles',29)
for i,(name,role) in enumerate([('CROs','Trial execution'),('Medidata','Trial lifecycle'),('Paradigm','Provider workflow'),('TriNetX','Data'),('Unlearn','Predicted prognosis'),('Antidote','Recruitment'),('Formation Bio','Asset ownership')]):
    y=87+i*66
    body += text(20,y,name,25,SAGE)+text(260,y,role,24)+line(20,y+18,580,y+18)
body += text(20,575,'Documented offerings; not a feature comparison.',22,MUTED)
save('competition','Documented offerings occupy different roles','A role map, not a competitive feature or performance ranking: CROs execution, Medidata lifecycle, Paradigm provider workflow, TriNetX data, Unlearn prognosis, Antidote recruitment, Formation Bio asset ownership.',body,610)

body = text(20,35,'Proposed sequence · evidence gates',28)
for i,(title,detail) in enumerate([('Months 0–3: access + paid pilots','Confirm lawful access and a paying buyer'),('Months 3–6: quality + milestone test','Measure critical-path movement and quality'),('Months 6–12: repeat delivery','Test repeatability and contribution'),('Months 12–24: software buyers','Only if reusable; seek unrelated buyers')]):
    y=65+i*120
    body += card(y,title,detail)
    if i<3: body+=arrow(y+88)
body += text(20,590,'A proposed test sequence, not a forecast.',23,MUTED)
save('roadmap','Proposed evidence-gated development path','Months zero to three access and paid pilots; three to six quality and milestone testing; six to twelve repeat delivery; twelve to twenty-four unrelated software buyers only if reusable.',body,620)

body = text(20,35,'Three gates before expansion',29)
for i,(title,detail) in enumerate([('1. Lawful access + paid buyer','Rights, workflow access and a real budget'),('2. Critical-path movement + quality','Accepted evidence; no degraded safeguards'),('3. Buyer value + contribution','Buyer benefit and viable delivery economics')]):
    y=75+i*130
    body += card(y,title,detail)
    if i<2: body+=arrow(y+90)
body += arrow(425) + card(465,'Any failed gate: stop or reposition','Proceed only after the failed gate is resolved',RED)
body += text(20,595,'Proposed decision rule; no gate is proven.',23,MUTED)
save('decision','Three gates for proceeding','Require lawful access and a paid buyer, critical-path movement with quality, and buyer value plus contribution. Failure at any gate means stop or reposition.',body,625)
print('Wrote 8 original explanatory SVGs:')
for name in ['critical-path','clocks','design','wedge','economics','competition','roadmap','decision']:
    print(f'  static/images/clinical-trial-compression/{name}.svg')
