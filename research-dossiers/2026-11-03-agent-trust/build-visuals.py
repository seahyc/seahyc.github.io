from pathlib import Path
from html import escape
import json
import argparse
parser=argparse.ArgumentParser()
parser.add_argument('--only',nargs='+',help='Regenerate only these SVG names (without extension).')
ONLY=parser.parse_args().only
HERE=Path(__file__).resolve().parent
OUT=HERE.parents[1]/'static/images/agent-trust'
OUT.mkdir(parents=True,exist_ok=True)
M=json.loads((HERE/'scenario-model.json').read_text())
INK='#27231e'; RED='#9d4c3f'; GREEN='#527367'; MUTED='#6d6358'
def t(x,y,s,size=25,c=INK,anchor='start'):
 return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" fill="{c}" text-anchor="{anchor}">{escape(s)}</text>'
def save(n,title,desc,b,h):
 if ONLY and n not in ONLY:return
 (OUT/(n+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{b}</svg>')
def boxes(n,title,rows,foot):
 b=t(20,35,title,28,RED)
 for i,(a,z) in enumerate(rows):
  y=65+i*108
  b+=f'<rect x="20" y="{y}" width="560" height="86" rx="8" fill="none" stroke="{GREEN}" stroke-width="2"/>'+t(38,y+33,a,26,GREEN)+t(38,y+65,z,22)
  if i<len(rows)-1:b+=f'<path d="M300 {y+87} v20 m-6 -6 l6 6 6 -6" fill="none" stroke="{MUTED}" stroke-width="2"/>'
 h=100+len(rows)*108;b+=t(20,h-12,foot,21,MUTED)
 save(n,title,'Conceptual synthesis; not a product benchmark.',b,h)
boxes('trust-layers','FOUR SEPARATE TRUST QUESTIONS',[
 ('Identity: who signed this request?','Signature → named key holder'),('Authority: whom may they represent?','Mandate → person / company / action'),('Intent: what are they trying to do?','Context → evidence of harmful behaviour'),('Policy: what happens next?','Allow / limit / review / checkpoint')], 'Identity is useful. It cannot settle all four questions.')
b=t(20,35,'REPORTED JOB SCAMS IN SINGAPORE',27,RED)+t(20,73,'Annual cases • calendar years • SPF',23,MUTED)
for i,(label,v) in enumerate([('2024',9043),('2025',5575)]):
 y=112+i*90;w=v/10000*360
 b+=t(20,y+30,label,25)+f'<rect x="100" y="{y}" width="{w}" height="38" fill="{GREEN}"/>'+t(110+w,y+29,f'{v:,}',24)
b+=f'<path d="M100 292 H460" stroke="{MUTED}"/>'
for v in [0,5000,10000]:b+=t(100+v/10000*360,328,f'{v:,}',22,MUTED,'middle')
b+=t(20,382,'H1 comparison, kept separate:',25,RED)+t(20,423,'2025: 2,717 → 2026: 2,247 cases',25)+t(20,466,'Reported harm fell; need remains.',24,GREEN)+t(20,507,'Source: SPF annual 2025 + mid-year 2026',21,MUTED)
save('reported-harm','Singapore job-scam cases declined','Zero-based annual count comparison. Half-year counts shown separately, never annualised. Reporting is not prevalence or platform exposure.',b,530)
boxes('wedge','THE FIRST USEFUL INTERVENTION',[
 ('Employer joins or changes representative','Link company + claimed recruiter authority'),('Listing or first contact is proposed','Compare mandate, history and action'),('Evidence is incomplete or suspicious','Limit reach; route a reviewable case'),('Customer decides; outcomes return','Appeals + sampled misses + updated policy')], 'Proposed workflow. No pilot has run.')
b=t(20,35,'RARE ABUSE MAKES ERRORS EXPENSIVE',27,RED)+t(20,73,'100,000 events • invented example',23,MUTED)+t(20,108,'0.1% abuse prevalence • 80% recall',23,MUTED)
for i,r in enumerate(M['base_rate_examples']):
 y=155+i*145;tp=r['true_positives'];fp=r['false_positives']
 b+=t(20,y,f"False-positive rate {r['false_positive_rate']*100:.2f}%",25)
 b+=f'<rect x="20" y="{y+20}" width="{tp*2.7}" height="30" fill="{GREEN}"/><rect x="{20+tp*2.7}" y="{y+20}" width="{fp*2.7}" height="30" fill="{RED}"/>'
 b+=t(20,y+84,f"80 true flags / {fp:.2f} false flags",24)+t(20,y+116,f"Precision: {r['precision']*100:.2f}%",24,GREEN)
b+=t(20,478,'Bar length = expected flagged events; zero origin.',21,MUTED)+t(20,516,'Source: original scenario-model.json, 3 Nov 2026',21,MUTED)
save('base-rates','Precision depends on prevalence and false positives','Green is true positive, red false positive, with direct labels. Scenario expected counts, not classifier results.',b,540)
b=t(20,35,'FEES AND RECURRING COSTS',28,RED)+t(20,73,'USD / customer / month • invented scenarios',22,MUTED)
# Revenue and cost are honest zero-based absolute comparisons.
for i,r in enumerate(M['cases']):
 y=112+i*120;p=r['monthly_price_usd'];cost=r['recurring_cost_usd']
 b+=t(20,y,r['name'].title(),25)
 b+=f'<rect x="105" y="{y-20}" width="{p/8000*320}" height="23" fill="{GREEN}"/>'+t(115+p/8000*320,y,f'${p:,.0f} fee',22)
 b+=f'<rect x="105" y="{y+17}" width="{cost/8000*320}" height="23" fill="{RED}"/>'+t(115+cost/8000*320,y+38,f'${cost:,.0f} cost',22)
 contribution=r['monthly_contribution_usd']
 b+=t(105,y+75,f"Contribution: {'−' if contribution<0 else ''}${abs(contribution):,.0f}",23)
b+=t(20,495,'Both bars start at $0; scale ends at $8,000.',21,MUTED)+t(20,534,'Direct costs + reserve; central overhead excluded.',21,MUTED)+t(20,571,'Source: original scenario-model.json, 3 Nov 2026',21,MUTED)
save('vendor-economics','Vendor fee versus recurring cost','Low contribution minus 1567; base plus 2717; high plus 6367 USD. Invented assumptions, no quotes.',b,595)
b=t(20,35,'CAN THE CUSTOMER JUSTIFY THE FEE?',27,RED)+t(20,73,'USD / month • invented buyer cases',23,MUTED)
for i,r in enumerate(M['buyer_cases']):
 y=115+i*90;v=r['benefit_before_fee_usd'];w=v/15000*350
 b+=t(20,y+28,r['name'].title(),25)+f'<rect x="100" y="{y}" width="{w}" height="38" fill="{GREEN if v>=10000 else RED}"/>'
 b+=t(100+w,y-12,f'${v:,.0f}',22,anchor='end') if r['name'].lower()=='base' else t(110+w,y+28,f'${v:,.0f}',22)
x=100+10000/15000*350
b+=f'<path d="M{x} 100 V365" stroke="{INK}" stroke-width="2" stroke-dasharray="6 6"/>'+t(20,407,'Dashed: proposed 2× fee hurdle = $10,000',23)+t(20,447,'Base: $6,500 benefit / $5,000 fee = 1.30×',23,RED)+t(20,490,'Zero-based scale, $0–$15,000. Before fee.',21,MUTED)+t(20,529,'Source: original scenario-model.json, 3 Nov 2026',21,MUTED)
save('buyer-economics','Buyer benefit versus proposed continuation hurdle','Only high scenario exceeds proposed two-times-fee threshold; base fails despite vendor profitability.',b,552)
boxes('roadmap','EARN EACH EXPANSION',[
 ('Months 0–3: prove access and paid value','Named buyer + comparator + observable outcome'),('Months 4–6: repeat with another buyer','Renewal + measured labour + cohort errors'),('Months 6–12: productise the common work','Evidence assembly + appeals + drift monitoring'),('Months 12–24: one adjacent expansion','Local sources + permissions + paid demand')], 'Proposed sequence; calendar is not proof of progress.')
# Visual-pass additions, 3 November 2026. Conceptual diagrams reuse only
# claims already present in the report; the sensitivity chart reads its model.
boxes('competitive-stack','COMPETE WITH THE EXISTING STACK',[
 ('Generic signals already have suppliers','Device / email / phone / IP / risk inputs'),
 ('Vertical tools already cover workflow','Business checks / linked cases / bulk actions'),
 ('The platform owns operating context','Advertiser history / outcomes / enforcement'),
 ('A newcomer must add useful decisions','Compare with a tuned incumbent process')],
 'Documented overlap does not establish efficacy.')
boxes('evaluation-design','TEST WITHOUT LEAKING THE ANSWER',[
 ('Use evidence available at decision time','Keep later complaints out of earlier inputs'),
 ('Hold out later periods and campaigns','Repeated templates must not cross the split'),
 ('Inspect allowed traffic as well as flags','An all-flagged queue cannot reveal misses'),
 ('Adjudicate outcomes independently','Match review effort and legitimate-user friction')],
 'Proposed evaluation design; no pilot was run.')
b=t(20,35,'HOW OPERATING PRESSURE ERODES VALUE',25,RED)
b+=t(20,73,'USD contribution / customer-month',23,MUTED)
b+=t(20,108,'Invented scenarios; not a forecast',23,MUTED)
labels=['Base','Fee −20%','Review share doubles','Support doubles','All three together']
for i,(label,r) in enumerate(zip(labels,M['sensitivities'])):
 y=155+i*94;v=r['monthly_contribution_usd'];w=v/3000*365
 b+=t(20,y,label,24,GREEN if i==0 else INK)
 b+=f'<rect x="20" y="{y+14}" width="{w}" height="25" fill="{GREEN if i==0 else RED}"/>'
 b+=t(35+w,y+35,f'${v:,.2f}',23)
b+=f'<path d="M20 592 H385" stroke="{MUTED}"/>'
for v in [0,1500,3000]:b+=t(20+v/3000*365,625,f'${v:,}',21,MUTED,'middle' if v else 'start')
b+=t(20,666,'All bars start at $0; central overhead excluded.',21,MUTED)
b+=t(20,703,'Source: scenario-model.json · 3 Nov 2026',21,MUTED)
save('hidden-costs','Operating pressure erodes vendor contribution',
 'Base 2716.67 USD; fee cut 1766.67; doubled review 1883.33; doubled support 2116.67; combined 333.33. All are invented scenarios.',b,728)
boxes('pilot-contract','LOCATE THE REACHABLE HARM',[
 ('Locate the contact before exposure','Does it begin inside the buyer’s workflow?'),
 ('Establish observable outcomes','Can the buyer see what happened afterward?'),
 ('Name the intervention authority','Who may limit reach, review or checkpoint?'),
 ('Agree the operating boundaries','Permissions / retention / appeals / provenance')],
 'Discovery questions; public totals cannot answer them.')
print(f"Wrote {', '.join(ONLY) if ONLY else '11 unique explanatory SVGs'}; 600px width; minimum text 21px.")
