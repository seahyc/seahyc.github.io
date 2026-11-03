from pathlib import Path
from html import escape
import json
ROOT=Path(__file__).resolve().parents[2]
OUT=ROOT/'static/images/peptide-proof'
INK='#27231e'; MUTED='#696052'; GREEN='#526f62'; RED='#9d4c3f'
def t(x,y,s,size=25,c=INK,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}" text-anchor="{anchor}">{escape(s)}</text>'
def save(name,title,b,h):
 (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title"><title id="title">{escape(title)}</title><g font-family="Arial,Helvetica,sans-serif">{b}</g></svg>')
def rows(name,title,data,foot):
 b=t(24,37,title,28,RED)
 for i,(a,z) in enumerate(data):
  y=68+i*100
  b+=f'<rect x="24" y="{y}" width="552" height="82" rx="8" fill="none" stroke="{MUTED}" stroke-width="1.4"/>'+t(42,y+31,a,26,GREEN)+t(42,y+62,z,23)
 b+=t(24,91+len(data)*100,foot,21,MUTED)
 save(name,title,b,115+len(data)*100)
# Parent-observed Google Trends: weekly means, fixed query set A.
b=t(24,35,'Attention, measured relatively',28,RED)+t(24,73,'US “peptides” · relative web-search index',23)+t(24,108,'Fixed query set A · collected 3 Nov 2026',22,MUTED)
for i,(year,v) in enumerate([(2021,6),(2022,7),(2023,9),(2024,10),(2025,21),(2026,61)]):
 y=146+i*70
 b+=t(24,y+26,str(year)+('*' if year in [2021,2026] else ''),24)+f'<rect x="122" y="{y}" width="{v/70*330:.2f}" height="31" fill="{GREEN}"/>'+t(134+v/70*330,y+26,str(v),25)
b+=t(122,612,'0',22,MUTED)+t(452,612,'70',22,MUTED,'middle')+t(24,658,'*2021: observed portion; 2026: partial year.',21,MUTED)+t(24,690,'Source: Google Trends; not purchase volume.',21,MUTED)
save('attention','US relative search attention: 6 to 61, partial windows',b,715)
rows('chemistry','A molecule needs several questions',[
 ('HPLC separates detected components','Peak area depends on the method.'),('Calibrated assay estimates quantity','Reference standards anchor the amount.'),('Mass spectrometry adds identity evidence','Matching mass is not every structural answer.'),('Biological activity is another question','Chemical amount does not establish benefit.')], 'Synthesis: Agilent peptide methods; FDA Q2(R2).')
rows('proof-layers','Keep the claims separate',[
 ('Identity + content','What is present? How much?'),('Impurities + microbiology','What else did the specified methods detect?'),('Process + provenance','Where did it come from? What happened?'),('Eligibility + clinical evidence','Different questions; chemistry cannot settle them.')], 'Conceptual claim boundaries, not a release checklist.')
rows('policy','An advisory path is not approval',[
 ('July: advisory committee meeting','HHS later records favorable recommendations.'),('October: linked HHS policy PDF','Calls itself an interim enforcement policy.'),('30 October: Federal Register notice','Calls the policy draft and nonbinding.'),('Before accepting a customer case','Counsel checks form, route, state and pathway.')], 'Official sources; checked 3 Nov 2026. Not legal clearance.')
rows('accreditation','Competence has a defined scope',[
 ('Coordinator','Qualifies partners; owns its review and records.'),('Accredited laboratory','Assessed organization and specified scope.'),('Drug-quality responsibilities','Applicable CGMP duties need separate controls.'),('Pharmacy / quality unit','Retains its accountable release decision.')], 'ISO public description; FDA quality agreements.')
rows('competition','The buyer already has alternatives',[
 ('Direct qualified laboratory','Chemistry, methods and original reports.'),('Finnrick','Coordinates testing; public and private programs.'),('Internal pharmacy quality staff','Existing supplier and release knowledge.'),('Proposed entrant','Buyer-controlled custody + reviewed case record.')], 'Advertised roles; entrant value remains unproven.')
m=json.loads((Path(__file__).parent/'scenario-model.json').read_text())
b=t(24,36,'Contribution per case · USD',28,RED)+t(24,76,'Invented scenarios, not quoted prices',23,MUTED)
for i,r in enumerate(m['cases']):
 y=122+i*128;v=r['outputs']['contribution_per_case'];x0=175;scale=0.22
 b+=t(24,y,r['name'].title(),26,GREEN)+t(24,y+34,f"Price ${r['inputs']['price_per_case']:,} / variable ${r['outputs']['variable_cost_per_case']:,.2f}",23)
 x=x0+min(0,v)*scale
 b+=f'<rect x="{x}" y="{y+51}" width="{abs(v)*scale}" height="25" fill="{RED if v<0 else GREEN}"/>'
 label=('−' if v<0 else '')+'$'+f'{abs(v):,.2f}'
 b+=t(580,y+74,label,25,RED if v<0 else GREEN,'end')
b+=t(175,535,'0',22,MUTED,'middle')+t(24,582,'Contribution precedes fixed costs, tax, financing.',21,MUTED)+t(24,615,'Source: original scenario-model.json · 3 Nov 2026',21,MUTED)
save('economics','Case contribution: low minus 230, base 545, high 1142.50',b,640)
rows('sensitivity','How the base case breaks',[
 ('Base: $545 contribution / case','45 cases → $2,525 monthly operating result.'),('Price falls 20%','Contribution $185 → monthly loss $13,675.'),('Total lab cost rises 50%','Contribution $105 → monthly loss $17,275.'),('Review time doubles','Contribution $345 → monthly loss $6,475.')], 'USD planning scenarios; fixed costs included in results.')
rows('ninety-days','A proposed $80,000 discovery cap',[
 ('Counsel + insurance diligence · $15,000','Owner: founder and US counsel.'),('Scientific / QA design · $24,000','Owner: analytical and independent QA leads.'),('Cases / reserves · $18,000; ops · $8,000','Owner: lab partners and operations lead.'),('Founder runway / buyer work · $15,000','Two $5,000 prepayments remain a target.')], 'Invented USD budget; no equipment purchase.')
rows('buyers','Ask for a decision, then a payment',[
 ('Reach an owner or quality director','APC directory; introductions; owner events.'),('Review consented recent lot decisions','Compare the existing direct-lab workflow.'),('Name the accepting pharmacist','Agree scope, raw data and failure handling.'),('Prepaid pilot → priced renewal','Interest becomes evidence only when paid.')], 'Proposed route; no outreach or customer commitment.')
rows('cash','Margin does not finance receivables',[
 ('Discovery: $80,000 gross cap','Target receipts $10,000 → net burn $70,000.'),('After discovery: 30-day cash gap','45 cases × $1,255 = $56,475 advanced.'),('Plus fixed-cost reserve','2 months × $22,000 = $44,000.'),('Incremental cash screen: $100,475','Separate from earlier discovery spending.')], 'Invented USD assumptions; prepayments change the gap.')
rows('expansion','Three expansion gates, three businesses',[
 ('Own a lab only after repeat demand','Scope assessment + bids + capacity coverage.'),('Consumers need their own paid test','Direct contribution must cover acquisition.'),('Verified supply needs a new legal case','Licenses, actual products, transfers, conflicts.'),('Default: stay an evidence company','Do not attach a storefront to a test report.')], 'Proposed 12–24 month choices, not verified permissions.')
print('Wrote 12 unique explanatory SVGs; minimum font size 21px at 600px width.')
