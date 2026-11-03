"""Original planning scenarios. No vendor prices or observed customer inputs."""
from pathlib import Path
import json
from math import ceil
ROOT = Path(__file__).resolve().parent
common = dict(events_per_month=100000, screening_cost_per_event_usd=.002,
              enrichment_checks=2000, enrichment_cost_usd=.10,
              stepups=200, stepup_cost_usd=1,
              review_minutes=4, reviewer_loaded_hourly_usd=25,
              support_loaded_hourly_usd=75, incident_reserve_revenue_share=.05,
              monthly_central_fixed_usd=30000, acquisition_cost_usd=10000)
def case(name, price, review_share, support_hours, onboarding_hours):
    reviews = common['events_per_month'] * review_share
    screening = common['events_per_month'] * common['screening_cost_per_event_usd']
    enrichment = common['enrichment_checks'] * common['enrichment_cost_usd']
    stepups = common['stepups'] * common['stepup_cost_usd']
    review = reviews * common['review_minutes'] / 60 * common['reviewer_loaded_hourly_usd']
    support = support_hours * common['support_loaded_hourly_usd']
    reserve = price * common['incident_reserve_revenue_share']
    cost = screening + enrichment + stepups + review + support + reserve
    contribution = price-cost
    onboarding = onboarding_hours * common['support_loaded_hourly_usd']
    return dict(name=name, monthly_price_usd=price, manual_review_share=review_share,
                support_hours=support_hours, onboarding_hours=onboarding_hours,
                reviews_per_month=reviews,
                costs_usd=dict(screening=screening, enrichment=enrichment,
                               stepups=stepups, review=review, support=support, incident_reserve=reserve),
                recurring_cost_usd=cost, monthly_contribution_usd=contribution,
                contribution_margin=contribution/price,
                recurring_break_even_price_usd=(cost-reserve)/.95,
                onboarding_cost_usd=onboarding,
                cash_payback_months=(10000+onboarding)/contribution if contribution>0 else None,
                year_one_contribution_after_acquisition_onboarding_usd=12*contribution-10000-onboarding,
                central_fixed_break_even_customers=ceil(30000/contribution) if contribution>0 else None)
cases=[case('low',2000,.01,16,40),case('base',5000,.005,8,24),case('high',8000,.002,4,16)]
base=cases[1]
sensitivity=[]
for label, price, review, support in [
    ('base',5000,.005,8),('price minus 20%',4000,.005,8),
    ('review share doubles',5000,.01,8),('support doubles',5000,.005,16),
    ('price minus 20%, review share doubles, support doubles',4000,.01,16)]:
    r=case(label,price,review,support,24)
    sensitivity.append(dict(label=label,monthly_contribution_usd=r['monthly_contribution_usd'],margin=r['contribution_margin']))
# Buyer captures operational savings and its own exposure, not all victim losses.
buyer_cases=[]
for label,hours,captured_harm,reduction,friction in [
    ('low',80,5000,.10,1000),('base',160,12000,.25,500),('high',240,20000,.40,250)]:
    benefit=hours*25+captured_harm*reduction-friction
    buyer_cases.append(dict(name=label,net_customer_review_hours_saved=hours,
        customer_loaded_hourly_usd=25,baseline_monthly_platform_captured_harm_cost_usd=captured_harm,
        incremental_reduction_fraction=reduction,incremental_good_user_friction_cost_usd=friction,
        benefit_before_fee_usd=benefit,fee_usd=5000,benefit_to_fee=benefit/5000,
        net_benefit_after_fee_usd=benefit-5000))
base_rate=[]
for fpr in [.001,.0001]:
    bad=100000*.001; good=100000-bad; tp=bad*.8; fp=good*fpr
    base_rate.append(dict(events=100000,abuse_prevalence=.001,recall=.8,false_positive_rate=fpr,
                          true_positives=tp,false_positives=fp,precision=tp/(tp+fp)))
model=dict(date='2026-11-03',currency='USD',unit='one platform customer per month',
    status='Invented planning assumptions and arithmetic; not quotations, measured performance, forecasts or market prices.',
    scope='Employer/listing/contact risk workflow; 100000 billable risk events, not people, per month.',
    common_inputs=common,cases=cases,sensitivities=sensitivity,buyer_cases=buyer_cases,base_rate_examples=base_rate,
    exclusions=['tax','financing','FX','bad debt','extra security certification/legal costs','catastrophic liability beyond illustrative reserve'],
    central_cost_scope='30000/month illustrative R&D, sales, founder/management and security overhead; direct support and review already charged per customer; no double counting.',
    assumptions_notes=['No per-event price extrapolation from SEON or other vendor menus.',
        'Four-minute reviews are risk-event cases; repeated events for one recruiter must be deduplicated in measured workload.',
        'Stepup includes a blended placeholder for vendor verification, not a guaranteed liveness or phone tariff.',
        'Positive payback assumes immediate steady billing, no churn, no payment delay and no acquisition failures.',
        'Incident reserve is an allocation, not insurance or a maximum liability.'])
(ROOT/'scenario-model.json').write_text(json.dumps(model,indent=2)+'\n')
lines=['# Scenario arithmetic — 3 November 2026','',
'All inputs below are invented USD planning assumptions. No vendor quotation, customer budget, salary survey, performance test or loss attribution was obtained. Low/base/high describe economic outcomes, not probability bands.', '',
'Unit: one platform/month; 100,000 scored employer/listing/contact events. These are not 100,000 unique people or recruiters. Repeated events and clustered investigations can change labour cost.', '',
'## Equations',
'- Screening = events × $0.002 = $200.',
'- Enrichment = 2,000 selected checks × $0.10 = $200.',
'- Step-ups = 200 selected checks × $1 blended allowance = $200.',
'- Review = events × review share × 4 minutes / 60 × $25/hour.',
'- Support = support hours × $75/hour.',
'- Recurring contribution = price − screening − enrichment − step-ups − review − support − 5% revenue incident reserve.',
'- Recurring break-even price = costs excluding revenue reserve / 0.95.',
'- Onboarding = onboarding hours × $75, uncharged once.',
'- Acquisition/onboarding payback = ($10,000 + onboarding)/positive recurring contribution.',
'- Company break-even customers = ceiling($30,000 central monthly fixed / positive recurring contribution).', '',
'## Vendor-side results',
'| Case | Price | Review cases | Review cost | Support cost | Reserve | Contribution | Margin | Break-even price | Payback months | Customers for central break-even |',
'|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|']
for r in cases:
    c=r['costs_usd']; pay=r['cash_payback_months']; be=r['central_fixed_break_even_customers']
    lines.append(f"| {r['name']} | {r['monthly_price_usd']:.0f} | {r['reviews_per_month']:.0f} | {c['review']:.2f} | {c['support']:.0f} | {c['incident_reserve']:.0f} | {r['monthly_contribution_usd']:.2f} | {r['contribution_margin']:.2%} | {r['recurring_break_even_price_usd']:.2f} | {f'{pay:.2f}' if pay is not None else 'none'} | {be if be is not None else 'none'} |")
lines += ['', 'These are contribution margins, not audited software gross margins. Central break-even assumes identical customers, adequate demand, unchanged capacity and fixed overhead. Actual hiring makes costs step upward. Year-one contribution after acquisition and onboarding: '+', '.join(f"{r['name']} ${r['year_one_contribution_after_acquisition_onboarding_usd']:.2f}" for r in cases)+'.', '', '## Sensitivities', '| Change from base | Monthly contribution | Margin |', '|---|---:|---:|']
for r in sensitivity: lines.append(f"| {r['label']} | ${r['monthly_contribution_usd']:.2f} | {r['margin']:.2%} |")
lines += ['', 'Screening cost doubling subtracts another $200/month from base contribution. Each extra 100 four-minute reviews costs $166.67; each extra support hour costs $75. With price $5,000 and eight support hours, recurring contribution reaches zero near 2.13% review share (holding other inputs fixed).', '',
'## Buyer economics are a separate gate',
'Benefit before fee = net customer review hours removed × loaded rate + incremental reduction × platform-captured baseline harm cost − incremental friction cost.',
'Do not include all national victim losses. Count only buyer-borne support, refunds, documented revenue impact or other finance-approved costs; keep those distinct from separately measured review savings. Estimate causal incremental reduction against the best available comparator, not gross blocked traffic.', '',
'| Case | Net customer hours saved | Platform harm baseline | Incremental reduction | Friction cost | Benefit before fee | Benefit / $5,000 fee | Net after fee |', '|---|---:|---:|---:|---:|---:|---:|---:|']
for r in buyer_cases: lines.append(f"| {r['name']} | {r['net_customer_review_hours_saved']} | ${r['baseline_monthly_platform_captured_harm_cost_usd']} | {r['incremental_reduction_fraction']:.0%} | ${r['incremental_good_user_friction_cost_usd']} | ${r['benefit_before_fee_usd']:.0f} | {r['benefit_to_fee']:.2f}× | ${r['net_benefit_after_fee_usd']:.0f} |")
lines += ['', 'The base buyer benefit is only 1.30× the fee: it FAILS the proposed 2× continuation hurdle, despite positive vendor contribution. At base hours/friction, 2× benefit requires $26,000/month of platform-captured harm baseline at 25% incremental reduction, or a lower fee. A useful product can still be a bad purchase at the proposed price.', '',
'## Base-rate arithmetic, not a classifier benchmark',
'Precision = prevalence × recall / [prevalence × recall + (1−prevalence) × false-positive rate]. With 100,000 events, assumed 0.1% abuse prevalence and 80% recall:']
for r in base_rate: lines.append(f"- FPR {r['false_positive_rate']:.2%}: {r['true_positives']:.0f} true positives, {r['false_positives']:.2f} false positives, precision {r['precision']:.2%}.")
lines += ['', 'These expected counts may be fractional; they are not observed incidents. Event-level metrics do not equal person-level denial rates. Evaluate good-employer approval and appeals separately. No conversion of a 0–100 score into a calibrated probability is assumed.', '', '## Cash and falsifiers',
'Base uncharged onboarding is $1,800 and acquisition $10,000; payback is 4.34 months under steady-state assumptions. Payment delays and churn worsen it. Stop if realistic quotes or observed workload cannot support at least 50% recurring contribution AND the buyer’s independently validated 2× benefit threshold. No TAM is claimed; qualified named buyers, data permissions, repeatable integration and renewals must be counted first.']
(ROOT/'scenario-arithmetic.md').write_text('\n'.join(lines)+'\n')
for r in cases:
    assert abs(sum(r['costs_usd'].values())+r['monthly_contribution_usd']-r['monthly_price_usd'])<1e-8
    print(f"{r['name']}: contribution USD {r['monthly_contribution_usd']:.2f}; margin {r['contribution_margin']:.2%}; break-even customers {r['central_fixed_break_even_customers']}")
print('Buyer base benefit/fee:',buyer_cases[1]['benefit_to_fee'],'(fails proposed 2x hurdle)')
print('Wrote scenario-model.json and scenario-arithmetic.md; arithmetic checks passed.')
