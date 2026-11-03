from pathlib import Path
from html import escape
import json
D=Path(__file__).resolve().parent
O=D.parents[1]/'static/images/insurance-ai-rollup'
M=json.loads((D/'scenario-model.json').read_text())
INK='#27231e'; GREEN='#566e5e'; RED='#9d4c3f'; MUTED='#665f52'
def t(x,y,s,size=25,c=INK):return f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}">{escape(s)}</text>'
def save(name,title,body,h):
 (O/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img"><title>{escape(title)}</title><g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>')
def rows(name,title,items,source):
 b=t(18,36,title,27,RED)
 for i,(a,z) in enumerate(items):
  y=70+i*104;b+=f'<rect x="18" y="{y}" width="564" height="88" rx="9" fill="none" stroke="{GREEN}"/>'+t(34,y+33,a,26)+t(34,y+66,z,23,MUTED)
 h=110+104*len(items);b+=t(18,h-15,source,21,MUTED);save(name,title,b,h)
rows('engine','WHAT THE BROKER OWNS', [('Client mandate','Understand risk and arrange cover'),('Insurer placement','Match appetite, negotiate, document'),('Service through renewal','Endorsements, claims support, retention'),('Net brokerage revenue','Commission / lawful fees; not premium')],'Conceptual synthesis • ledger E06–E18')
rows('denominators','THREE DIFFERENT DENOMINATORS', [('Singapore · 2025','S$6.09bn domestic general premium'),('Hong Kong · Sep 2026','814 licensed broker companies'),('Taiwan · 2025','NT$7.433bn non-life broker commission'),('Missing acquisition denominator','Available independent commercial EBITDA')],'GIA / HKIA / TII Table 20 • E01–E05')
rows('routes','CHOOSE THE COMPANY BOUNDARY', [('Own a specialty brokerage','Buy renewals; carry people and debt risk'),('Sell recovery services','Need rights, mandates and collected cash'),('Sell workflow software','Need buyers and economical support')],'Strategic comparison • hypotheses E37–E44')
rows('purchase','AN ANCHOR NEEDS REAL EQUITY', [('Assumed historical EBITDA · $1.6m','8× entry → $12.8m enterprise value'),('Other uses · $1.5m','Integration, fees and working cash'),('Total uses · $14.3m','$5.12m debt + $9.18m equity'),('At 14× entry, debt held fixed','Equity needed rises to $18.78m')],'USD • original scenarios • no seller/lender quote')
# Cash coverage dot plot. Zero axis; direct labels well apart.
b=t(18,35,'CASH COVERAGE IS THE CONSTRAINT',26,RED)+t(18,73,'After modeled tax / debt service, times',23,MUTED)
for i,c in enumerate(M['anchor_cases']):
 y=130+i*88;v=c['after_cash_tax_debt_service_coverage_before_other_cash_uses'];b+=t(18,y,c['name'].title(),25)+f'<rect x="120" y="{y-25}" width="{v/2.5*315:.2f}" height="31" fill="{GREEN if v>=1.5 else RED}"/>'+t(435,y,f'{v:.3f}×',25)
b+='<line x1="120" y1="345" x2="435" y2="345" stroke="#665f52"/>'
for v in [0,1,2]:b+=t(115+v/2.5*315,382,str(v),23)
b+=t(18,430,'Proposed minimum: 1.5× all cash obligations',23)+t(18,468,'Base headroom: only $40,400',26,RED)+t(18,506,'Before capex, extra working cash, earnouts',22,MUTED)+t(18,544,'USD • original model E41 • not lender CFADS',21,MUTED)
save('cash','Simplified cash debt service coverage',b,565)
rows('recovery','RECOVERY IS A CASH COHORT', [('1,000 files screened · base assumption','20% success × $10,000 collected each'),('$2m collected for the rights holder','20% assumed fee → $400k revenue'),('$300k cost before collection','$100k contribution; 12-month lag assumed'),('Break-even success · 15%','20% less collected cash → only $20k profit')],'USD • scenarios E43 • no legal fee approval')
# required revenue with fixed margin and zero baseline
b=t(18,36,'THE $1bn SCALE BURDEN',28,RED)+t(18,76,'Required net revenue · USD m',25)+t(18,112,'Assumed 25% EBITDA margin throughout',23,MUTED)
for i,m in enumerate([10,14,18]):
 r=1000/m/.25;y=175+i*99;b+=t(18,y,f'{m}×',26)+f'<rect x="95" y="{y-26}" width="{r/400*340}" height="33" fill="{GREEN}"/>'+t(450,y,f'{r:.1f}',26)
b+='<line x1="95" y1="413" x2="435" y2="413" stroke="#665f52"/>'
for v in [0,200,400]:b+=t(85+v/400*340,451,str(v),23)
b+=t(18,497,'Exit multiple is an assumption, not a bid.',23,RED)+t(18,537,'EV = EBITDA × multiple • scenario E38',21,MUTED)
save('scale','Net revenue required at hypothetical exit multiples',b,560)
rows('incumbents','VALUATION LABELS MATTER', [('Aon–USI · announced / pending','$17bn gross; ~22.5× standalone adjusted'),('Same proposed transaction','14.5× net / synergized adjusted EBITDA'),('TIH · completed May 2024','$15.5bn EV; ~18× core EBITDA'),('HUB / Acrisure financing','Common / preferred securities differ')],'Issuer / SEC disclosures • E21–E26 • USD')
rows('ninety-days','FIRST 90 DAYS · $150k CAP', [('Founder + operator · $25k','50-name map; 10 owner conversations'),('Counsel / compliance · $35k','Permissions, money and data perimeter'),('Claims / ops / engineer · $40k','100-file baseline; reviewed cost/error test'),('CFO + financing + reserve · $50k','$30k diligence / $10k terms / $10k reserve')],'USD • proposed budget E46 • not quotations')
rows('permissions','LOCAL AUTHORITY BEFORE SHARED AI', [('Singapore · MAS toolkit','Prior approval at ≥20% control trigger'),('Hong Kong · IA guidance','One-month change notification; s64ZZD'),('Taiwan · FSC Articles 14 / 16 / 45','Role reports, capital adjustment, membership'),('Every jurisdiction','Client funds and data remain controlled')],'Regulatory outline • E07–E20 + Phase 2 correction')
rows('waterfall','EV IS NOT PERSONAL CASH', [('$1,000m enterprise value','Less $300m net debt and $20m fees'),('$680m residual before preferences','5% participating common → $34m gross'),('Alternative promote, not additive','$400m hurdle; 15% pool; half → $21m'),('Secondary / recap require permission','Dilution, tax and senior claims still matter')],'USD • alternative scenario waterfalls E45')
rows('gates','EARN THE RIGHT TO BUY AGAIN', [('Access gate · first 90 days','3 sellers ready for diligence; 3 paid/budgeted'),('Purchase gate · before closing','Existing cash earnings; full downside ≥1.5×'),('Operating gate · full renewal cycle','≥95% normalized retained revenue'),('Expansion gate · after proof','Ownership map, positive return, local authority')],'Proposed stop/go rules • E46 • not benchmarks')
print('12 unique SVGs generated; transparent canvases; source/assumption labels included')
