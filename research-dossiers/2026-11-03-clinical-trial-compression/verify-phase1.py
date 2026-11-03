"""Independent arithmetic and artifact integrity audit; no network or file writes."""
import json, math, hashlib
from pathlib import Path
p=Path(__file__).parent
m=json.loads((p/'scenario-model.json').read_text())
for c in m['service_cases']:
    direct=c['delivery_hours']*c['loaded_hourly_rate']+c['other_direct_cost']+c['rework_and_cancellation_reserve']
    contribution=c['price']-direct-c['acquisition_cost_per_project']
    cap=3600//c['delivery_hours']
    assert direct==c['direct_delivery_cost']
    assert c['delivery_margin']==c['price']-direct
    assert c['contribution_after_acquisition']==contribution
    assert c['annual_project_capacity']==cap
    assert c['annual_result_at_capacity']==cap*contribution-180000
    assert c['break_even_projects']==(math.ceil(180000/contribution) if contribution>0 else None)
    assert c['customer_cash_benefit']==c['workflow_days_saved']*c['critical_path_fraction']*c['avoidable_customer_cash_per_day']
    assert c['customer_cash_benefit_less_fee']==c['customer_cash_benefit']-c['price']
    assert c['project_cash_exposure_before_balance']==max(0,direct+c['acquisition_cost_per_project']-.5*c['price'])
    print('service',c['name'],'PASS; contribution',contribution,'capacity',cap,'annual',c['annual_result_at_capacity'],'customer_net',c['customer_cash_benefit_less_fee'])
for c in m['software_comparator_cases']:
    residual=c['annual_contract_value']-sum(c[k] for k in ['onboarding_cost','annual_support_hosting','acquisition_cost','customer_specific_validation_cost'])
    assert residual==c['first_contract_year_contribution']
    assert c['new_customers_to_cover_fixed']==(math.ceil(400000/residual) if residual>0 else None)
    print('software',c['name'],'PASS; first contract contribution',residual)
for c in m['sensitivities']:
    assert c['contribution']==c['price']-120*c['hours']-9000-4000-c['cac']
    assert c['annual_result']==c['projects']*c['contribution']-180000
print('sensitivity rows',len(m['sensitivities']),'PASS')
s=json.loads((p/'registry-summary.json').read_text()); raw=(p/'registry-sample.json').read_bytes()
assert hashlib.sha256(raw).hexdigest()==s['sha256']
assert len(json.loads(raw)['studies'])==s['returned_records']==10
assert s['api_totalCount']==json.loads(raw)['totalCount']
print('registry hash, count and saved sample PASS')
ledger=(p/'evidence-ledger.md').read_text()
assert all('| E%02d.'%i in ledger for i in range(1,28))
for f in ['research-map.md','evidence-ledger.md','market-evidence.md','scenario-model.json','scenario-arithmetic.md','competitor-source-notes.md','needs-browser.md']:
    assert (p/f).is_file() and (p/f).stat().st_size
print('required dossier files and 27 material-claim IDs PASS')
print('No public article, visual generation, Hugo build, deployment or git operation performed in Phase 1.')
