"""Reproducible planning scenarios. All prices/costs are invented assumptions, not quotes."""
import json, math
from pathlib import Path
p=Path(__file__).parent
cases=[]
for name,fee,eh,oh,other,cac,n in [('low',40000,200,100,4000,8000,6),('base',75000,140,60,3000,6000,12),('high',100000,100,40,2000,4000,20)]:
    direct=eh*150+oh*100+other+fee*.05
    contribution=fee-direct
    after_cac=contribution-cac
    row=dict(name=name,fee_usd=fee,engineer_hours=eh,operations_hours=oh,engineering_rate_usd=150,operations_rate_usd=100,other_direct_cost_usd=other,risk_rework_reserve_fraction=.05,cac_usd=cac,projects_per_year=n,direct_cost_usd=direct,contribution_before_cac_usd=contribution,contribution_after_cac_usd=after_cac,annual_residual_usd=n*after_cac-300000,annual_break_even_projects=math.ceil(300000/after_cac) if after_cac>0 else None,delivery_capacity_projects=min(3200/eh,1600/oh))
    assert n<=row['delivery_capacity_projects']
    cases.append(row)
b=cases[1]
sens=[]
for label,fee,eh,cac,n in [('base',75000,140,6000,12),('fee -20%',60000,140,6000,12),('engineer hours +50%',75000,210,6000,12),('CAC doubled',75000,140,12000,12),('projects halved',75000,140,6000,6)]:
    per=fee-(eh*150+60*100+3000+.05*fee)-cac
    sens.append(dict(case=label,contribution_after_cac_usd=per,annual_residual_usd=n*per-300000))
gas=[]
for name,capex_kw,cf,heat,fuel,vom,fixed in [('low_cost',2000,.90,8,3,10,120),('base',3000,.80,10,5,15,160),('high_cost',4000,.60,12,7,25,200)]:
    crf=.10*(1.10**15)/(1.10**15-1)
    annual_mwh=20*8760*cf
    capital=20000*capex_kw*crf
    fixedcost=20000*fixed
    variable=heat*fuel+vom
    cost=(capital+fixedcost)/annual_mwh+variable
    gas.append(dict(name=name,net_output_mw=20,capex_usd_per_kw=capex_kw,capacity_factor=cf,heat_rate_mmbtu_per_mwh=heat,delivered_fuel_usd_per_mmbtu=fuel,variable_om_usd_per_mwh=vom,fixed_om_usd_per_kw_year=fixed,annual_mwh=annual_mwh,crf=crf,annual_capital_charge_usd=capital,cost_before_excluded_firming_usd_per_mwh=cost,fuel_plus_1_usd_mmbtu_effect_usd_mwh=heat))
model=dict(date='2026-11-03',currency='USD',status='SCENARIOS ONLY: all commercial inputs invented for decision testing; no quotes, interviews or cost forecasts',wedge='Engineer-reviewed equipment and energisation readiness package, no equipment inventory or generation ownership',annual_central_fixed_cost_usd=300000,fixed_cost_boundary='Incremental non-delivery sales/product/management/insurance overhead. Delivery labor charged per project at loaded opportunity-cost rates; do not also include it in central fixed costs.',annual_delivery_hours_available=dict(engineering=3200,operations=1600),exclusions=['tax','financing','equipment purchase deposits','unlimited liability','cost of providing power','customer capex','unmodelled warranty claims beyond reserve'],equations=['direct = engineer_hours*150 + operations_hours*100 + other + 0.05*fee','per_project = fee - direct - CAC','annual_residual = projects * per_project - 300000','break_even_projects = ceil(300000/per_project), undefined if contribution <= 0'],cases=cases,sensitivities=sens,buyer_value_test=dict(fee_usd=75000,avoidable_days_assumed=30,required_customer_value_usd_per_avoidable_day=2500,status='A willingness-to-pay hurdle; not evidence that 30 days can be saved or that all delay loss is captured.'),onsite_gas_comparator=dict(status='Illustrative net 20MW system; low/base/high COST not forecast or specific OEM product. No nuclear LCOE estimated because public test milestones cannot establish it.',discount_rate=.10,life_years=15,equation='CRF=r*(1+r)^n/((1+r)^n-1); $/MWh=(kW*capex_per_kW*CRF + kW*fixed_OM)/(MW*8760*CF) + heat_rate*fuel + variable_OM',exclusions=['redundancy/N+1','battery buffering','gas lateral and firm pipeline reservation','land','interconnection and substation','emissions controls/allowances if outside plant quote','major overhaul beyond assumed O&M','construction delay/interest','tax and incentives','standby grid tariff','backup fuel','decommissioning'],cases=gas))
(p/'scenario-model.json').write_text(json.dumps(model,indent=2)+'\n')
lines=['# Scenario arithmetic','',model['status'],'','## Wedge — dollars per completed package','', '| Case | Fee | Direct | After CAC | Annual residual | Break-even projects |', '|---|---:|---:|---:|---:|---:|']
for c in cases:
    lines.append(f"| {c['name']} | {c['fee_usd']:,.0f} | {c['direct_cost_usd']:,.0f} | {c['contribution_after_cac_usd']:,.0f} | {c['annual_residual_usd']:,.0f} | {c['annual_break_even_projects']} |")
lines+=['','Base: 75,000 − (140×150 + 60×100 + 3,000 + 0.05×75,000) − 6,000 = 35,250. Annual: 12×35,250 − 300,000 = 123,000. Break-even: ceil(300,000/35,250) = 9 packages.','Base capacity: min(3,200/140, 1,600/60) = 22.86 packages/year; 12 assumed. These are delivery-hour assumptions, not a hiring plan. Idle staff cost can make this worse; revise to actual payroll/cash commitments before funding.','Fee that breaks even at 12 packages: (300,000/12 + 21,000 + 6,000 + 3,000 + 6,000)/0.95 = $64,210.53.','A $75,000 fee needs $2,500/day of buyer value if 30 truly avoidable days are established. No savings are currently measured.','', '## Sensitivities','']
for x in sens:lines.append(f"- {x['case']}: project contribution after CAC ${x['contribution_after_cac_usd']:,.0f}; annual residual ${x['annual_residual_usd']:,.0f}.")
lines+=['','## Gas comparator — incomplete cost, not firm power LCOE','']
for x in gas:lines.append(f"- {x['name']}: {x['annual_mwh']:,.0f} MWh/year; CRF {x['crf']:.8f}; capital charge ${x['annual_capital_charge_usd']:,.0f}/year; partial cost ${x['cost_before_excluded_firming_usd_per_mwh']:.2f}/MWh.")
lines+=['','A $1/MMBtu fuel increase adds $8/$10/$12 per MWh in the respective cases. At base, a 20 MW/80 MWh battery supplies only four rated hours before losses and reserve; 20 MW×24 hours =480 MWh for one day, with recharge energy still required. These are arithmetic identities, not system sizing advice.','Do not compare these incomplete gas costs to a full-service utility tariff or to vendor nuclear aspirations. Site-specific EPC, redundant capacity, storage, gas firmness, permits and outage penalties can reverse the choice.','', '## Cash / economic boundary','Labor is charged even if already employed. Fee cash collections and supplier payments must be measured separately. Base illustrative reserve for three months central fixed cost plus two packages direct cost: 300,000/4 + 2×33,750 = $142,500; add actual payroll, CAC timing, legal/insurance setup and bad-debt requirements. No equipment deposits are financed. No signed customer contracts exist.']
(p/'scenario-arithmetic.md').write_text('\n'.join(lines)+'\n')
for c in cases:print(c['name'], 'direct',c['direct_cost_usd'],'after_CAC',c['contribution_after_cac_usd'],'annual',c['annual_residual_usd'],'break_even',c['annual_break_even_projects'])
for g in gas: print('gas',g['name'],f"partial_USD_MWh={g['cost_before_excluded_firming_usd_per_mwh']:.2f}")
print('PASS: capacities, arithmetic and JSON serialization')
