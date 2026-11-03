from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'static/images/agentic-commerce'
OUT.mkdir(parents=True, exist_ok=True)
INK, GREEN, RED, MUTED = '#27231e', '#527367', '#9d4c3f', '#73685c'

def t(x, y, s, size=24, color=INK, anchor='start'):
    return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(str(s))}</text>'

def rect(x,y,w,h,color=GREEN):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="none" stroke="{color}" stroke-width="2"/>'

def arrow(x,y,X,Y):
    return f'<path d="M{x} {y} L{X} {Y}" fill="none" stroke="{MUTED}" stroke-width="2"/><circle cx="{X}" cy="{Y}" r="3" fill="{MUTED}"/>'

def save(name,title,body,h=440):
    (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img"><title>{escape(title)}</title>{body}</svg>')

def rows(name,title,items,foot='Proposed design · 3 November 2026'):
    b=t(20,35,title,28)
    for i,(a,z) in enumerate(items):
        y=62+i*88
        b+=rect(20,y,560,74)+t(36,y+29,a,25,GREEN)+t(36,y+59,z,22)
    h=100+88*len(items)
    b+=t(20,h-12,foot,21,MUTED)
    save(name,title,b,h)

b=t(20,35,'Hard rules before preferences',28)
for x,a,z in [(20,'Hard: must pass','Host · OS · display path'),(315,'Soft: tradeoffs','Size · looks · confidence')]:
    b+=rect(x,65,265,100)+t(x+14,100,a,25,GREEN)+t(x+14,139,z,21)
b+=arrow(150,180,150,207)+arrow(450,180,450,207)
b+=rect(20,223,560,85)+t(35,255,'Evidence: pass / fail / unknown',25)+t(35,288,'Unknown facts trigger a question or abstention',22)
b+=arrow(300,319,300,346)+t(300,382,'Shortlist + total + reasons + sources',25,GREEN,'middle')
save('constraints','Proposed ranking sequence',b,408)

rows('demand','Interest is not a payable task',[
    ('Survey: stated willingness','Worldpay · intent, not observed purchases'),
    ('Referral: visited a retailer','Adobe · observed channel, selected cohort'),
    ('Our task: improved a real decision','Unmeasured · must beat the best alternative'),
    ('Our business: earned renewal','Unmeasured · paid utility, not traffic')], 'Evidence classes · sources linked in card 03')

rows('competition','The stack already has owners',[
    ('Consumer interface','ChatGPT · Google · Perplexity · Amazon'),
    ('Catalog and merchant journey','Shopify UCP Catalog · merchant systems'),
    ('Product evidence','Keepa MCP · labs · manufacturer guides'),
    ('Payment and authorization','Stripe · AP2 · Visa · Mastercard')], 'Documented offerings ≠ measured adoption')

b=t(20,35,'Costco: fees are revenue, not profit',28)+t(20,70,'FY2026 · USD billions · zero baseline',22,MUTED)
for i,(a,v,c) in enumerate([('Membership-fee revenue',5.907,GREEN),('Net income: whole company',9.226,RED)]):
    y=112+i*116
    b+=t(20,y,a,24)+f'<rect x="20" y="{y+16}" width="{v/10*450:.1f}" height="29" fill="{c}"/>'+t(500,y+40,f'{v:.3f}',24,c)
b+=t(20,371,'Different accounting lines; do not subtract',22)+t(20,405,'Source: Costco FY2026 Form 10-K',21,MUTED)
save('precedents','Costco membership fees and company net income are different accounting measures',b,430)

rows('revenue','Can anyone pay to rank?',[
    ('Membership → core test','Buyer pays for access; same selection method'),
    ('Flat completed-purchase fee → conditional','Same effective fee; unpaid goods stay eligible'),
    ('Affiliate → conditional, excluded from model','Rebate variable excess; no commission inputs'),
    ('Brand insight → optional, excluded','Consent + cohorts; no placement or suppression')], 'Sponsored ranking and offer auctions: rejected')

rows('routing','A listing is only the first step',[
    ('Discover → configure','Registry presence is not invocation'),
    ('Eligible task → optional call','Measure all eligible tasks, including skips'),
    ('Useful answer → repeat use','Compare errors, unknowns, cost and latency'),
    ('Buyer payment → retained utility','No merchant purchase is needed for value')], 'Proposed funnel · not observed conversion')

rows('intent','A rejection needs a denominator',[
    ('Exposed candidate + exact configuration','A product never seen was not rejected'),
    ('Reason + actor + evidence time','Hard failure ≠ preference ≠ agent mistake'),
    ('Consented later outcome','A receipt does not establish product quality'),
    ('Fresh held-out comparison','Does this graph beat public specifications?')], 'Proposed evidence asset · exclusivity unproven')

rows('payments','Use rails; own the approved decision',[
    ('Research and quote','Exact variant · destination · unknown costs'),
    ('Trusted approval surface','Payee · ceiling · expiry · user confirmation'),
    ('Partner execution','ACP/UCP or issuing; enforce actual controls'),
    ('Reconcile and remedy','Capture changes · delivery · refund · dispute')], 'Later option · no payment integration tested')

model=json.loads((Path(__file__).parent/'scenario-model.json').read_text())
b=t(20,35,'Membership: three assumed months',28)+t(20,71,'USD / month · after fixed operating costs',22,MUTED)
for i,c in enumerate(model['cases']):
    y=113+i*165; v=c['outputs']['monthly_operating_contribution']
    b+=t(20,y,f"{c['name'].title()}: {c['members']:,} members × ${c['monthly_price']}",24)
    zero=225; end=zero+v/31000*300
    b+=f'<rect x="{min(zero,end):.1f}" y="{y+13}" width="{abs(end-zero):.1f}" height="25" fill="{GREEN if v>0 else RED}"/>'
    b+=f'<path d="M{zero} {y+10} V{y+42}" stroke="{MUTED}" stroke-width="2"/>'+t(zero,y+68,'0',21,MUTED,'middle')
    b+=t(20,y+103,('−' if v<0 else '+')+f'${abs(v):,.0f} operating contribution',23,GREEN if v>0 else RED)
b+=t(20,605,'3 Nov 2026 · original assumed inputs',21,MUTED)+t(20,640,'Zero merchant revenue in every case',21,MUTED)
save('economics','Original membership scenarios, not a forecast',b,665)

rows('distribution','Earn routing before claiming default',[
    ('Days 1–30: independent builder owners','Ask for real tasks + instrumented comparison'),
    ('Days 31–90: optional tool selection','API and MCP; no forced-call instruction'),
    ('Consumer: pay for a bounded trial','Test membership; permit easy cancellation'),
    ('Months 4–12: keep the useful cohort','Renewal and correct answers, not installs')], 'Proposed channel · no partners committed')

rows('trust-team','Make neutrality reproducible',[
    ('Founder: incentives and spending','No revenue contract can alter selection'),
    ('Engineer: rule engine + evidence log','No commission field in ranking inputs'),
    ('Hardware reviewer: fixtures and failures','Blinded grading; buy or borrow test units'),
    ('Counsel + independent auditor','Rights matrix; counterfactual ranking replay')], 'Proposed team and accountability')

rows('capital','First experiment: USD45,000 cap',[
    ('$15k stipend + $12k engineering','Founder capital; release spending by gate'),
    ('$6k devices + $5k counsel','Validate facts and permitted source use'),
    ('$2k data + $3k grading + $2k reserve','No assumed grants or merchant subsidy'),
    ('Residual cash only after obligations','Salary ≠ dividends ≠ a secondary or exit')], 'Original 90-day budget · not supplier quotes')

rows('rights','Access and reuse are separate gates',[
    ('Catalog request → fresh facts','Shopify restrictions still apply'),
    ('Published review → link or license','RTINGS membership is not resale permission'),
    ('User history → purpose and consent','Minimize; retention limit; delete/export'),
    ('Reviews → real experience','FTC disclosure and deception rules apply')], 'Counsel review required before pilot')

rows('gates','Pre-register reasons to stop',[
    ('Rights + baseline advantage','No unauthorized dependency; beat alternatives'),
    ('Routing + paid demand','Optional calls; buyers renew without ranking deals'),
    ('Cost + contribution','Count failures, support, churn and acquisition'),
    ('Outcome graph + expansion','Fresh unseen cases must improve with permission')], 'Proposed falsifiers · no results observed')

rows('selection','How we choose and keep choosing',[
    ('Eligible universe → hard predicates','Unpaid products eligible; exact variants'),
    ('Evidence → independent fixture','Vendor facts ≠ tests ≠ owner experience'),
    ('Shortlist → buyer tradeoffs + total','Explain exclusions and unknown cost fields'),
    ('Refresh → outcomes → corrections','Quotes each call; claims weekly or on change'),
    ('Appeal → same evidence rules','No paid admission, suppression or placement')], 'Proposed cadence · testing and rights still required')

rows('master-plan','The consumer-fiduciary Master Plan',[
    ('1. Curate a narrow category','Day 90: 30 payers + held-out utility gate'),
    ('2. Win optional agent routing','Month 6: 3 builders · 100 payers · 70% kept'),
    ('3. Earn permissioned outcomes','Month 12: ≥20% fewer hard-error tasks'),
    ('4. Guarantee a bounded purchase','3 break-even months + funded claims reserve'),
    ('5. Open the method and outcome schema','Month 24 option; adoption remains unproven')], 'Original proposed stages · no merchant subsidy assumed')

rows('outcomes','Outcomes must earn the moat',[
    ('Buy → confirm exact variant and setup','Explicit separate consent; no raw chat resale'),
    ('Day 30 / 60 / 90 → confirmed use','Track nonresponse, returns and exposure'),
    ('Fresh tasks → independent comparison','Public specs alone vs permissioned outcomes'),
    ('Month 12 gate → useful learning','500 members; ≥20% fewer hard-error tasks')], 'All intervals and targets are proposed assumptions')

rows('guarantee','Earn responsibility before guaranteeing',[
    ('Scoped criteria + exact approval','Variant · payee · ceiling · expiry'),
    ('Priced cover + loss allocation','Partner terms; reserve for claims and returns'),
    ('Operating cash can support obligations','Three break-even months before new pilot'),
    ('Open method + interoperable records','No exclusivity; platforms may still decline')], 'Later proposed route · not a launched guarantee')

rows('faq','The questions govern the company',[
    ('Why this pick?','Criteria + evidence + total + exclusions'),
    ('Who pays?','Members; no paid rank or catalog admission'),
    ('What if it is wrong?','Correct research; no launch purchase guarantee'),
    ('Why build at all?','Stop if native answers and retention win')], 'Proposed launch FAQ · not actual customer statements')

print('Wrote 19 original explanatory SVGs; all text >=21px at 600px width.')
