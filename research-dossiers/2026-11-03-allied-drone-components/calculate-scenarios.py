"""Reproducible planning arithmetic. Every input is invented, not a quote."""
from pathlib import Path
import json
import math

HERE = Path(__file__).resolve().parent

def calculate(c):
    q, p, y = c['accepted_units'], c['unit_price'], c['yield']
    landed = c['attempt_cost'] / y + c['acceptance_cost']
    reserve = p * c['warranty_fraction']
    contribution = p - landed - reserve
    nre_net = c['nre_projects'] * (c['nre_fee'] - c['nre_cost'])
    depreciation = c['tooling'] / 3
    hardware_revenue = q * p
    operating = q * contribution + nre_net - c['annual_fixed_cost']
    wc = max(0, q * landed * c['inventory_days'] / 365
             + hardware_revenue * c['receivable_days'] / 365
             - hardware_revenue * c['production_deposit_fraction'])
    nre_gap = c['nre_projects'] * max(0, c['nre_cost'] - c['nre_fee'] * .5)
    result = {
        'attempts_expected': q / y,
        'landed_and_acceptance_cost_per_accepted_unit': landed,
        'warranty_reserve_per_unit': reserve,
        'unit_contribution': contribution,
        'unit_contribution_margin': contribution / p,
        'hardware_revenue': hardware_revenue,
        'nre_revenue': c['nre_projects'] * c['nre_fee'],
        'nre_net_contribution': nre_net,
        'annual_operating_contribution_before_depreciation': operating,
        'annual_contribution_after_depreciation': operating - depreciation,
        'repeat_hardware_only_contribution_after_depreciation': q * contribution - c['annual_fixed_cost'] - depreciation,
        'first_year_cash_after_tooling_before_working_capital': operating - c['tooling'],
        'break_even_units_with_nre': math.ceil(max(0, c['annual_fixed_cost'] + depreciation - nre_net) / contribution),
        'break_even_units_without_nre': math.ceil((c['annual_fixed_cost'] + depreciation) / contribution),
        'break_even_price_at_volume_with_nre': (landed + (c['annual_fixed_cost'] + depreciation - nre_net) / q) / (1 - c['warranty_fraction']),
        'working_capital_screen': wc,
        'nre_preacceptance_gap_screen': nre_gap,
        'tooling_plus_working_capital_plus_nre_gap_screen': c['tooling'] + wc + nre_gap,
    }
    assert abs(hardware_revenue - q * (landed + reserve) + nre_net - c['annual_fixed_cost'] - operating) < .00001
    return result

cases = [
    dict(name='low', accepted_units=1000, unit_price=400, yield_=.8, attempt_cost=240, acceptance_cost=25,
         warranty_fraction=.04, nre_projects=1, nre_fee=50000, nre_cost=90000, annual_fixed_cost=400000,
         tooling=150000, inventory_days=120, receivable_days=90, production_deposit_fraction=0),
    dict(name='base', accepted_units=5000, unit_price=350, yield_=.92, attempt_cost=190, acceptance_cost=20,
         warranty_fraction=.025, nre_projects=3, nre_fee=75000, nre_cost=65000, annual_fixed_cost=500000,
         tooling=180000, inventory_days=90, receivable_days=60, production_deposit_fraction=.2),
    dict(name='high', accepted_units=15000, unit_price=300, yield_=.97, attempt_cost=160, acceptance_cost=15,
         warranty_fraction=.02, nre_projects=5, nre_fee=100000, nre_cost=70000, annual_fixed_cost=700000,
         tooling=250000, inventory_days=60, receivable_days=30, production_deposit_fraction=.3),
]
for c in cases:
    c['yield'] = c.pop('yield_')
    c['results'] = calculate(c)

base = {k: v for k, v in cases[1].items() if k != 'results'}
sensitivities = []
for label, changes in [
    ('Price falls 20%', {'unit_price': 280}),
    ('Accepted volume falls 50%', {'accepted_units': 2500}),
    ('Yield falls to 80%', {'yield': .8}),
    ('Attempt cost rises 20%', {'attempt_cost': 228}),
    ('Qualification cost doubles', {'nre_cost': 130000}),
    ('No NRE projects', {'nre_projects': 0}),
    ('No production deposits; 120-day receivables', {'production_deposit_fraction': 0, 'receivable_days': 120}),
    ('Illustrative 25% duty on attempt cost; no pass-through', {'attempt_cost': 237.5}),
]:
    trial = dict(base, **changes)
    sensitivities.append(dict(label=label, changed_inputs=changes, results=calculate(trial)))

model = dict(as_of='2026-11-03', currency='USD', unit='one accepted ESC; not one drone or motor set',
    status='All inputs are invented planning assumptions, not estimates, supplier quotes, market prices or forecasts.',
    timing='steady-year scenarios, not a first-year ramp; low/high are outcomes, not statistical bounds',
    attempt_cost_scope='Purchased parts, CM assembly, incoming freight and routine attempt-level process cost; excludes acceptance inspection and warranty reserve. No proven China-free BOM.',
    yield_scope='Accepted units / attempted units; rejected attempts have zero salvage and incur full attempt cost. Rework not separately charged; must replace with actual scrap/rework records.',
    fixed_cost_scope='Scenario allowance for small team, sales/admin, compliance maintenance, facility/test rental, insurance and general engineering; not a staffing quote. Customer-specific qualification cost is separate.',
    nre_cost_scope='Customer-specific engineering, agreed lab/witnessing, assessor and documentation work; excludes shared tooling. NRE is recognized once per project and never multiplied by hardware units.',
    tooling_scope='Owned fixtures/test equipment and CM setup; 3-year straight-line zero residual. Factory/real estate capex excluded because manufacturing is contracted.',
    exclusions=['tax', 'financing', 'unbounded product-liability losses', 'major redesign or recall beyond reserves', 'US manufacturing localization capex', 'duties except explicit sensitivity', 'demand ramp and customer concentration effects'],
    working_capital_scope='Simplified screen: inventory-days of landed+acceptance cost, plus receivables-days of hardware sales, minus production deposits; no supplier credit. Separate NRE preacceptance gap assumes 50% NRE paid up front. Not a dated cash forecast; no double-counting as an annual expense.',
    cases=cases, sensitivities=sensitivities)
model['price_anchor_caveat'] = 'Base USD350/unit is unanchored and below Scorpion displayed $499.99; currency/spec equivalence unverified. No demonstrated affordability or cost advantage.'
(HERE / 'scenario-model.json').write_text(json.dumps(model, indent=2) + '\n')

lines = ['# Scenario arithmetic — 3 November 2026', '',
    '**All inputs are invented USD planning assumptions. Nothing here is a supplier quote, established affordable price, demand forecast or qualification result.**', '',
    'One unit = one accepted ESC. Electrical compatibility, origin and buyer qualification remain unproven. A drone can use a different number/type of ESCs; no drone-count-to-revenue conversion is made.', '',
    'Equations:',
    '- Landed accepted-unit cost = attempt cost / yield + acceptance cost.',
    '- Unit contribution = price × (1 − warranty fraction) − landed accepted-unit cost.',
    '- NRE net = projects × (fee − project cost).',
    '- Annual operating contribution = accepted units × unit contribution + NRE net − annual fixed cost.',
    '- Annual contribution after depreciation = operating contribution − tooling / 3.',
    '- Break-even accepted units = ceiling((fixed + tooling/3 − NRE net) / unit contribution).',
    '- Break-even price = (landed accepted-unit cost + (fixed + tooling/3 − NRE net)/units) / (1 − warranty fraction).',
    '- Working-capital screen = max(0, units × landed cost × inventory days/365 + hardware revenue × receivable days/365 − hardware revenue × production deposit fraction).',
    '- Funding screen = tooling + working-capital screen + projects × max(0, project cost − 50% of NRE fee).', '',
    '## Inputs and outputs', '',
    '| Per steady year, USD unless stated | Low | Base | High |', '|---|---:|---:|---:|']
for key, label in [('accepted_units','Accepted ESC units'),('unit_price','Price per accepted unit'),('attempt_cost','Cost per attempt'),('yield','Accepted yield'),('acceptance_cost','Acceptance cost/unit'),('warranty_fraction','Warranty share of revenue'),('nre_projects','NRE projects'),('nre_fee','NRE fee/project'),('nre_cost','NRE cost/project'),('annual_fixed_cost','Annual fixed cost'),('tooling','Upfront tooling'),('inventory_days','Inventory days'),('receivable_days','Receivable days'),('production_deposit_fraction','Production deposit share')]:
    lines.append('| ' + label + ' | ' + ' | '.join(f'{c[key]:,.4f}'.rstrip('0').rstrip('.') for c in cases) + ' |')
for key, label in [('unit_contribution','Contribution/accepted unit'),('unit_contribution_margin','Unit contribution fraction'),('hardware_revenue','Hardware revenue'),('nre_net_contribution','NRE net contribution'),('annual_operating_contribution_before_depreciation','Operating contribution before depreciation'),('annual_contribution_after_depreciation','Contribution after depreciation'),('repeat_hardware_only_contribution_after_depreciation','Hardware-only contribution after depreciation'),('first_year_cash_after_tooling_before_working_capital','Cash after tooling before WC'),('break_even_units_with_nre','Break-even units with NRE'),('break_even_units_without_nre','Break-even units without NRE'),('break_even_price_at_volume_with_nre','Break-even price with NRE'),('tooling_plus_working_capital_plus_nre_gap_screen','Tooling + WC + NRE-gap funding screen')]:
    lines.append('| ' + label + ' | ' + ' | '.join(f'{c["results"][key]:,.2f}' for c in cases) + ' |')
lines += ['', '## One-variable sensitivities around base', '', '| Change | Annual contribution after depreciation, USD | Funding screen, USD |', '|---|---:|---:|']
for s in sensitivities:
    r=s['results']
    lines.append(f'| {s["label"]} | {r["annual_contribution_after_depreciation"]:,.2f} | {r["tooling_plus_working_capital_plus_nre_gap_screen"]:,.2f} |')
lines += ['', '## Interpretation and limits', '',
    'The base case only narrowly funds fixed cost and replacement; NRE is not a substitute for repeating hardware economics. Volume, accepted yield, delivered price and project scope are the largest controllable uncertainties. A small price cut can erase the company contribution while unit contribution stays positive.', '',
    'The 25% duty is an arithmetic shock, not a determination that this ESC attracts that tariff. Classification, end use, origin and entry date need an importer/broker assessment; CBP guidance is in E21. No preferential allied rate is assumed.', '',
    'The funding screen assumes overlapping inventory and receivables and no supplier credit; deposits can substantially offset this steady-state need. It excludes the operating burn of ramp/delay. Add a six-month zero-revenue base fixed-cost delay: 500,000 × 6/12 = USD250,000 extra runway, before any extra engineering. Cash collection, not accounting NRE, finances the company.', '',
    'Replace every assumption with scoped CM/test/assessor bids, a buyer acceptance plan and dated customer/supplier terms before investment. Do not purchase equipment because these illustrative equations balance.']
lines += ['', 'Price caveat: base USD350 is unanchored, below observed Scorpion $499.99; currency/spec equivalence unverified. Not evidence of obtainable price or cost advantage.']
(HERE / 'scenario-arithmetic.md').write_text('\n'.join(lines) + '\n')
for c in cases:
    r = c['results']
    print(f'{c["name"]}: contribution/unit={r["unit_contribution"]:.4f}; annual_after_depreciation={r["annual_contribution_after_depreciation"]:.2f}; break_even_with_NRE={r["break_even_units_with_nre"]}; funding_screen={r["tooling_plus_working_capital_plus_nre_gap_screen"]:.2f}')
print('PASS: revenue/cost reconciliation for 3 cases; 8 sensitivity cases calculated')
