"""Original planning sensitivity model. No quoted or measured market inputs."""
from pathlib import Path
from math import ceil
import json

HERE = Path(__file__).resolve().parent
COMMON = {
    'currency': 'USD', 'route_accepted_km': 20,
    'vessel_day_cost': 4000, 'contract_robot_crew_day_cost': 2000,
    'mobilisation_fixed_cost': 4000, 'processing_review_campaign_cost': 4000,
    'recovery_damage_reserve_campaign': 1000,
    'owned_vehicle_and_sensor_capex': 300000, 'asset_life_years': 3,
    'residual_value': 0, 'annual_cell_insurance_storage_maintenance': 100000,
    'annual_central_commercial_R_and_D': 500000,
    'annual_available_field_days': 220, 'receivable_days': 90,
}
CASES = [
    dict(name='low', price_per_accepted_km=2000, capture_km_per_survey_day=4,
         acceptance_yield=0.8, weather_standby_days=2, mobilisation_days=2, annual_campaigns=6),
    dict(name='base', price_per_accepted_km=3000, capture_km_per_survey_day=8,
         acceptance_yield=0.9, weather_standby_days=1, mobilisation_days=1, annual_campaigns=12),
    dict(name='high', price_per_accepted_km=3500, capture_km_per_survey_day=12,
         acceptance_yield=0.95, weather_standby_days=0, mobilisation_days=1, annual_campaigns=24),
]

def calculate(case):
    c = COMMON
    q = c['route_accepted_km']
    days = ceil(q / (case['capture_km_per_survey_day'] * case['acceptance_yield']))
    field_days = days + case['weather_standby_days'] + case['mobilisation_days']
    daily = c['vessel_day_cost'] + c['contract_robot_crew_day_cost']
    variable = daily * field_days + c['mobilisation_fixed_cost'] + c['processing_review_campaign_cost'] + c['recovery_damage_reserve_campaign']
    revenue = q * case['price_per_accepted_km']
    contribution = revenue - variable
    annual_n = case['annual_campaigns']
    depreciation = (c['owned_vehicle_and_sensor_capex'] - c['residual_value']) / c['asset_life_years']
    annual_cash_fixed = c['annual_cell_insurance_storage_maintenance'] + c['annual_central_commercial_R_and_D']
    annual_economic_fixed = annual_cash_fixed + depreciation
    cash = annual_n * contribution - annual_cash_fixed
    economic = cash - depreciation
    capacity = c['annual_available_field_days'] // field_days
    return {
        **case, 'survey_days': days, 'total_vessel_and_robot_crew_days': field_days,
        'campaign_revenue': revenue, 'campaign_variable_cost': variable,
        'campaign_contribution_before_fixed': contribution,
        'campaign_contribution_margin': contribution / revenue,
        'annual_revenue': revenue * annual_n, 'annual_field_days': field_days * annual_n,
        'annual_cash_operating_contribution_before_capex_tax_finance': cash,
        'annual_economic_contribution_after_depreciation': economic,
        'full_company_cost_per_accepted_km': (annual_n * variable + annual_economic_fixed) / (annual_n * q),
        'break_even_campaign_price_at_assumed_volume': variable + annual_economic_fixed / annual_n,
        'break_even_price_per_accepted_km_at_assumed_volume': (variable + annual_economic_fixed / annual_n) / q,
        'cash_break_even_campaigns': ceil(annual_cash_fixed / contribution) if contribution > 0 else None,
        'economic_break_even_campaigns': ceil(annual_economic_fixed / contribution) if contribution > 0 else None,
        'maximum_campaigns_at_assumed_field_days': capacity,
        'trade_receivables_proxy': annual_n * revenue * c['receivable_days'] / 365,
        'starting_cash_capex_plus_receivables_plus_six_month_cash_fixed': c['owned_vehicle_and_sensor_capex'] + annual_n * revenue * c['receivable_days'] / 365 + annual_cash_fixed / 2,
        'simple_capex_payback_years_if_positive_cash_contribution': c['owned_vehicle_and_sensor_capex'] / cash if cash > 0 else None,
    }

results = [calculate(case) for case in CASES]
base = CASES[1]
sensitivity = []
for label, overrides in [
    ('price minus 20 percent', dict(price_per_accepted_km=2400)),
    ('price plus 20 percent', dict(price_per_accepted_km=3600)),
    ('one extra standby day', dict(weather_standby_days=2)),
    ('capture throughput halves', dict(capture_km_per_survey_day=4)),
    ('acceptance yield falls to 60 percent', dict(acceptance_yield=0.6)),
    ('annual demand doubles', dict(annual_campaigns=24)),
]:
    r = calculate({**base, **overrides})
    sensitivity.append({'change': label, 'campaign_variable_cost': r['campaign_variable_cost'],
                        'campaign_contribution': r['campaign_contribution_before_fixed'],
                        'annual_economic_contribution': r['annual_economic_contribution_after_depreciation'],
                        'annual_field_days': r['annual_field_days']})
# A retained full-charter day is an explicit assumption; no saving inferred from robot speed alone.
base_result = results[1]
sensitivity.append({'change': 'vessel day cost plus 50 percent',
                    'annual_economic_contribution': base_result['annual_economic_contribution_after_depreciation'] - 2000 * base_result['annual_field_days']})
for multiple in (2, 3):
    extra_day = COMMON['vessel_day_cost'] * (multiple - 1)
    contribution = base_result['campaign_contribution_before_fixed'] - extra_day * base_result['total_vessel_and_robot_crew_days']
    sensitivity.append({'change': f'vessel day cost {multiple}x (uncalibrated stress)',
                        'vessel_day_cost': COMMON['vessel_day_cost'] * multiple,
                        'campaign_contribution': contribution,
                        'annual_economic_contribution': base_result['annual_economic_contribution_after_depreciation'] - extra_day * base_result['annual_field_days'],
                        'economic_break_even_campaigns': ceil(700000 / contribution) if contribution > 0 else None,
                        'note': 'Not a market benchmark. Baseline charter is uncalibrated and potentially optimistic.'})
sensitivity.append({'change': 'one uninsured vehicle loss plus one base campaign contribution lost',
                    'annual_economic_contribution': base_result['annual_economic_contribution_after_depreciation'] - COMMON['owned_vehicle_and_sensor_capex'] - base_result['campaign_contribution_before_fixed'],
                    'note': 'Illustrative incremental cash replacement charge against economic result; not actuarial expected loss or accounting treatment.'})
model = {
    'as_of': '2026-11-03', 'status': 'All numerical commercial inputs invented planning assumptions, not quotes, market rates, forecasts, or field results.',
    'boundary': 'Future one-cell inspection operator with bought vehicle; founder chooses partner/leased baseline first. No weapon systems. All costs borne by operator; contractor commissions require additional input.',
    'common_assumptions': COMMON, 'cases': results, 'sensitivities_from_base': sensitivity,
    'exclusions_and_limits': ['tax', 'finance cost', 'contractor revenue share or sales commission', 'duties and FX', 'bespoke dock construction', 'extra fleet or staff when capacity exhausted', 'catastrophic liability above reserve', 'billing delays beyond receivable assumption', 'customer churn and seasonal scheduling conflicts'],
    'equations': {
        'survey_days': 'ceil(accepted_route_km / (capture_km_per_day * acceptance_yield))',
        'total_days': 'survey_days + weather_standby_days + mobilisation_days',
        'campaign_variable_cost': 'total_days*(vessel_day_cost+contract_robot_crew_day_cost)+mobilisation_fixed_cost+processing_review+recovery_reserve',
        'campaign_contribution': 'accepted_route_km*price_per_accepted_km-campaign_variable_cost',
        'annual_economic_contribution': 'annual_campaigns*campaign_contribution-annual_cash_fixed-depreciation',
        'economic_break_even_campaigns': 'ceil((annual_cash_fixed+depreciation)/campaign_contribution), undefined if contribution <= 0',
        'receivables_proxy': 'annual_revenue*receivable_days/365, steady billing and no customer prepayments assumed',
    },
}
(HERE / 'scenario-model.json').write_text(json.dumps(model, indent=2) + '\n')
assert [r['total_vessel_and_robot_crew_days'] for r in results] == [11, 5, 3]
assert [r['campaign_contribution_before_fixed'] for r in results] == [-35000, 21000, 43000]
assert [r['annual_economic_contribution_after_depreciation'] for r in results] == [-910000, -448000, 332000]
assert all(r['annual_field_days'] <= COMMON['annual_available_field_days'] for r in results)
assert results[1]['economic_break_even_campaigns'] == 34
assert results[2]['economic_break_even_campaigns'] == 17
for r in results:
    print(f"{r['name']}: days={r['total_vessel_and_robot_crew_days']}; campaign contribution=${r['campaign_contribution_before_fixed']:,.0f}; annual cash=${r['annual_cash_operating_contribution_before_capex_tax_finance']:,.0f}; annual economic=${r['annual_economic_contribution_after_depreciation']:,.0f}; break-even campaigns={r['economic_break_even_campaigns']}; capacity={r['maximum_campaigns_at_assumed_field_days']}")
print('PASS: scenario arithmetic, capacity checks, and sensitivity outputs generated; commercial inputs remain unverified.')
