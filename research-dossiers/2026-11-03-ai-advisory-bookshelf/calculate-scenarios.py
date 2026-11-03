"""Original planning scenarios; no provider quote or observed demand is implied."""
import json, math
from pathlib import Path
D = Path(__file__).resolve().parent
COMMON = {
    'currency': 'USD', 'as_of': '2026-11-03',
    'status': 'All commercial inputs are chosen assumptions; outputs are arithmetic, not forecasts.',
    'product_boundary': 'Paid curated evidence MCP; host AI subscription billed separately to user. No full generation included; variable service reserve covers retrieval and occasional checking.',
    'fixed_cash_monthly': {'hosting_monitoring': 200, 'editorial_source_maintenance': 1400, 'admin_rights_review_allowance': 400},
    'founder_opportunity_cost_monthly': 10000,
    'support_hourly_cost': 45,
    'payment_fee_fraction': 0.03, 'payment_fee_fixed_per_monthly_charge': 0.30,
    'annual_revenue_scale_screens': [1000000, 10000000, 100000000],
    'scale_screen_note': 'Chosen revenue thresholds, not TAM or investor criteria. No reachable payer population is known.',
    'exclusions': ['tax', 'VAT/GST', 'refunds and chargebacks beyond fee assumption', 'major litigation', 'contracted book rights beyond illustrative reserve', 'employee benefits beyond loaded hourly assumption', 'customer host AI subscription', 'unexpected security incident', 'growth acquisitions beyond replacement budget'],
    'rights_warning': 'A royalty reserve is not a licence offer or evidence permission can be bought at this price. No licensed books in initial public-source wedge; reserve tests later expansion.',
    'steady_state_warning': 'Constant churn and CAC, immediate collections, no expansion or annual billing. No discounted cash flows. Replacement-spend model assumes churned users can actually be replaced at assumed CAC.',
}
inputs = [
    dict(name='low', price_monthly=9, variable_service_cost=4, rights_reserve=0, support_minutes=10, acquisition_cash=90, onboarding_minutes=45, monthly_logo_churn=0.10),
    dict(name='base', price_monthly=19, variable_service_cost=1.5, rights_reserve=2, support_minutes=4, acquisition_cash=60, onboarding_minutes=30, monthly_logo_churn=0.05),
    dict(name='high', price_monthly=29, variable_service_cost=1, rights_reserve=3, support_minutes=2, acquisition_cash=30, onboarding_minutes=15, monthly_logo_churn=0.02),
]
def calculate(x):
    x = dict(x)
    x['payment_cost'] = x['price_monthly'] * COMMON['payment_fee_fraction'] + COMMON['payment_fee_fixed_per_monthly_charge']
    x['support_cost'] = x['support_minutes'] / 60 * COMMON['support_hourly_cost']
    x['onboarding_cost'] = x['onboarding_minutes'] / 60 * COMMON['support_hourly_cost']
    x['acquisition_plus_onboarding'] = x['acquisition_cash'] + x['onboarding_cost']
    x['contribution_before_acquisition_and_fixed'] = x['price_monthly'] - x['payment_cost'] - x['variable_service_cost'] - x['rights_reserve'] - x['support_cost']
    c = x['contribution_before_acquisition_and_fixed']
    x['contribution_margin'] = c / x['price_monthly']
    x['payback_months_ignoring_churn'] = x['acquisition_plus_onboarding']/c if c>0 else None
    x['simple_lifetime_contribution_before_acquisition'] = c/x['monthly_logo_churn'] if c>0 else None
    x['simple_lifetime_contribution_after_acquisition'] = c/x['monthly_logo_churn'] - x['acquisition_plus_onboarding'] if c>0 else None
    x['replacement_acquisition_per_active_payer_month'] = x['monthly_logo_churn'] * x['acquisition_plus_onboarding']
    x['net_per_payer_after_replacement'] = c - x['replacement_acquisition_per_active_payer_month']
    n = x['net_per_payer_after_replacement']
    fixed = sum(COMMON['fixed_cash_monthly'].values())
    x['cash_break_even_payers'] = math.ceil(fixed/n) if n>0 else None
    x['economic_break_even_payers'] = math.ceil((fixed+COMMON['founder_opportunity_cost_monthly'])/n) if n>0 else None
    x['at_1000_active_payers'] = dict(arr=1000*x['price_monthly']*12, monthly_net_after_replacement_and_cash_fixed=1000*n-fixed, monthly_net_after_replacement_and_founder=1000*n-fixed-COMMON['founder_opportunity_cost_monthly'])
    x['payers_for_annual_revenue_screens'] = {str(revenue):math.ceil(revenue/(12*x['price_monthly'])) for revenue in COMMON['annual_revenue_scale_screens']}
    return x
cases = [calculate(x) for x in inputs]
base = inputs[1]
sensitivity = []
for label, updates in [('base',{}),('support doubles',{'support_minutes':8}),('price falls to 9',{'price_monthly':9}),('churn doubles',{'monthly_logo_churn':0.10}),('rights reserve rises to 5',{'rights_reserve':5}),('CAC rises to 120',{'acquisition_cash':120}),('service reserve doubles',{'variable_service_cost':3})]:
    r=calculate({**base, **updates})
    sensitivity.append(dict(label=label,updates=updates, contribution=r['contribution_before_acquisition_and_fixed'], net_after_replacement=r['net_per_payer_after_replacement'], economic_break_even_payers=r['economic_break_even_payers']))
model={**COMMON,'formulas':{
    'contribution':'price - (0.03*price+0.30) - service - rights_reserve - support_minutes/60*45',
    'net_after_replacement':'contribution - monthly_churn*(cash_CAC + onboarding_minutes/60*45)',
    'cash_break_even':'ceil(2000/net_after_replacement); undefined if net <= 0',
    'economic_break_even':'ceil(12000/net_after_replacement); undefined if net <= 0',
    'simple_lifetime_contribution':'contribution/churn, before acquisition and fixed; geometric constant-churn approximation, not empirical LTV',
},'cases':cases,'base_sensitivities':sensitivity}
(D/'scenario-model.json').write_text(json.dumps(model, indent=2)+'\n')
lines=['# Scenario arithmetic · 3 November 2026','','Original planning assumptions in USD. These are not quotes, measured customer metrics or a forecast. Run `python3 research-dossiers/2026-11-03-ai-advisory-bookshelf/calculate-scenarios.py`.','','## Equations','','Monthly contribution C = price − (3% × price + 0.30) − service − rights reserve − support_minutes/60 × 45.','','Acquisition A = cash CAC + onboarding_minutes/60 × 45. Net per active payer after steady-state replacement N = C − monthly churn × A.','','Cash break-even = ceil(2,000/N). Economic break-even = ceil(12,000/N), including USD10,000/month founder opportunity cost. Undefined if N ≤ 0. Cash fixed budget = hosting 200 + editorial maintenance 1,400 + administration/rights review allowance 400. All chosen assumptions; fixed editorial capacity must be validated.','','| Case | Price/month | Service | Rights reserve | Support cost | Fees | C | CAC + onboarding A | Churn/month | N | Cash BE payers | Economic BE payers |','|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|']
for r in cases:
    lines.append(f"| {r['name']} | {r['price_monthly']:.2f} | {r['variable_service_cost']:.2f} | {r['rights_reserve']:.2f} | {r['support_cost']:.2f} | {r['payment_cost']:.2f} | {r['contribution_before_acquisition_and_fixed']:.2f} | {r['acquisition_plus_onboarding']:.2f} | {r['monthly_logo_churn']:.0%} | {r['net_per_payer_after_replacement']:.3f} | {r['cash_break_even_payers']} | {r['economic_break_even_payers']} |")
    print(f"{r['name']}: contribution=${r['contribution_before_acquisition_and_fixed']:.2f}; net after replacement=${r['net_per_payer_after_replacement']:.3f}; cash BE={r['cash_break_even_payers']}; economic BE={r['economic_break_even_payers']}")
lines += ['','None means no finite break-even under those assumptions. Replacement includes acquisition and onboarding of churned payers, so break-even does not conceal the retention cost. Growth acquisition is additional. Cash break-even excludes founder labour, which belongs in the economic view.','','## Base worked example','','19 − 0.87 − 1.50 − 2 − 3 = 11.63 contribution (61.21%). Acquisition + onboarding = 60 + 22.50 = 82.50. Churn replacement = 0.05 × 82.50 = 4.125/payer/month. Net = 7.505/payer/month. Cash BE = ceil(2,000/7.505) = 267; economic BE = ceil(12,000/7.505) = 1,599.','','Payback ignoring churn = 82.50/11.63 = 7.09 months; simple lifetime contribution before acquisition = 11.63/0.05 = 232.60; after acquisition/onboarding = 150.10 before fixed costs. Constant churn and no discounting make this a screening approximation. Do not label it measured LTV.','','At 1,000 base payers: ARR = 1,000 × 19 × 12 = 228,000; monthly net after replacement/cash fixed = 5,505; after founder opportunity cost = −4,495. No real cohort has been observed.','','## One-variable base sensitivities','','| Change | C/month | N after replacement | Economic BE payers |','|---|---:|---:|---:|']
for r in sensitivity: lines.append(f"| {r['label']} | {r['contribution']:.2f} | {r['net_after_replacement']:.3f} | {r['economic_break_even_payers']} |")
lines += ['','## Scale screens, not market sizing','','Base USD19/month requires 4,386 payers for USD1m annual revenue; 43,860 for USD10m; 438,597 for USD100m. These are arithmetic hurdles, not evidence that those buyers exist or that any revenue defines a venture. At 1,000 active payers and 5% churn, 50 replacements/month cost 4,125 in acquisition/onboarding before growth. If target decisions occur quarterly, monthly retention assumptions may be optimistic.','','## Bounds and falsifiers','','Low case loses money even before acquisition/fixed costs; volume does not rescue it. High case assumes higher willingness to pay alongside lower support/CAC/churn; it is a favourable joint scenario, not likely upside. Exclude unclear-rights books even if a reserve appears affordable. Actual legal terms can invalidate the model. Keep ingestion/audit time, connector failures and source updates in the cost log. Double cash fixed costs if a second domain needs a second editorial workload; do not assume catalogue expansion is free.','','Side project is conditional on a low founder time budget and an organic channel, not a synonym for guaranteed profitability. The USD10,000 opportunity cost is a chosen value of founder time, not YC salary. Replace every input with paid cohort evidence before using this as an investment case.']
(D/'scenario-arithmetic.md').write_text('\n'.join(lines)+'\n')
assert abs(cases[1]['contribution_before_acquisition_and_fixed']-11.63)<1e-8
assert cases[1]['economic_break_even_payers']==1599
assert cases[1]['cash_break_even_payers']==267
for r in cases:
    n=r['net_per_payer_after_replacement']; k=r['economic_break_even_payers']
    if k is not None:
        assert k*n >=12000 and (k-1)*n<12000
print('PASS: contribution identities and integer break-even boundaries; JSON and arithmetic written')
