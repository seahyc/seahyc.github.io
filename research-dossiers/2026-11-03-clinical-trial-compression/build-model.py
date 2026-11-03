"""All commercial inputs are invented test assumptions in USD, not market quotes."""
import json, math
from pathlib import Path
P=Path(__file__).parent
cases=[]
for name,price,hours,rate,other,reserve,cac,days,fraction,daily in [
 ('low',65000,520,125,12000,6000,12000,10,0,2000),
 ('base',90000,360,120,9000,4000,9000,30,.5,4000),
 ('high',110000,260,110,7000,3000,7000,40,.75,6000)]:
 cost=hours*rate+other+reserve
 delivery=price-cost; contribution=delivery-cac
 capacity=math.floor(3600/hours); overhead=180000
 cases.append(dict(name=name,price=price,delivery_hours=hours,loaded_hourly_rate=rate,other_direct_cost=other,rework_and_cancellation_reserve=reserve,acquisition_cost_per_project=cac,direct_delivery_cost=cost,delivery_margin=delivery,delivery_margin_pct=delivery/price,contribution_after_acquisition=contribution,annual_delivery_hours=3600,annual_project_capacity=capacity,annual_fixed_overhead_excluding_direct_labor=overhead,break_even_projects=math.ceil(overhead/contribution) if contribution>0 else None,annual_result_at_capacity=capacity*contribution-overhead,workflow_days_saved=days,critical_path_fraction=fraction,critical_path_days_saved=days*fraction,avoidable_customer_cash_per_day=daily,customer_cash_benefit=days*fraction*daily,customer_cash_benefit_less_fee=days*fraction*daily-price,critical_path_days_to_cover_fee=price/daily))
sw=[]
for name,acv,onboard,support,cac,validation in [('low',75000,35000,20000,30000,25000),('base',120000,25000,18000,25000,15000),('high',180000,15000,15000,20000,10000)]:
 c=acv-onboard-support-cac-validation
 sw.append(dict(name=name,annual_contract_value=acv,onboarding_cost=onboard,annual_support_hosting= support,acquisition_cost=cac,customer_specific_validation_cost=validation,first_contract_year_contribution=c,annual_fixed_cost_excluding_above=400000,new_customers_to_cover_fixed=math.ceil(400000/c) if c>0 else None,renewal_contribution_before_retention_sales_cost=acv-support))
base=cases[1]; sensitivity=[]
for price,hours,cac,projects in [(90000,360,9000,10),(75000,360,9000,10),(105000,360,9000,10),(90000,480,9000,7),(90000,260,9000,13),(90000,360,18000,10),(90000,360,9000,6)]:
 c=price-hours*120-9000-4000-cac
 sensitivity.append(dict(price=price,hours=hours,cac=cac,projects=projects,contribution=c,annual_result=projects*c-180000))
model=dict(as_of='2026-11-03',currency='USD nominal; no inflation or FX conversion',status='SCENARIO ONLY: every commercial input is an assumption; outputs are arithmetic, not forecasts',unit='One sponsor-accepted Phase II outpatient protocol-feasibility and startup-readiness package; no drug supply, full CRO services, site grants or clinical care included',service_cases=cases,software_comparator_cases=sw,sensitivities=sensitivity,assumptions={'capacity':'3600 annual project-delivery hours across a small expert team/contractor pool; non-delivery work is outside capacity and paid through fixed overhead. Loaded labor is charged once in project costs; overhead excludes that labor. Validate actual role bottlenecks before hiring.','annual_view':'Full-year steady paid throughput, not first-year ramp; acquisition costs are allocated per won project including failed sales effort. No success fee or equity assumed.','customer_value':'Only documented avoidable cash attributable to critical-path time; excludes speculative drug NPV, unavoidable payroll and unproven efficacy gains. Clinical observation periods unchanged.','cash':'50% fee deposit, balance on acceptance; client pays its own clinical pass-throughs. Peak project cash exposure before final collection=max(0,direct_cost+CAC-0.5*fee). Fixed overhead and receivable risk additional.','software':'First contract year per new customer; not calendar-year revenue after a long sales cycle. Renewals not assumed and engineering runway is excluded from client unit cost but included in fixed cost.'},equations=['direct_delivery_cost=hours*loaded_rate+other_direct_cost+reserve','delivery_margin=fee-direct_delivery_cost','contribution=delivery_margin-CAC','annual_result=paid_projects*contribution-fixed_overhead','project_capacity=floor(delivery_hours_available/project_hours)','customer_cash_benefit=workflow_days_saved*critical_path_fraction*avoidable_daily_cash','software_first_year_contribution=ACV-onboarding-support-CAC-customer_validation'])
for c in cases:c['project_cash_exposure_before_balance']=max(0,c['direct_delivery_cost']+c['acquisition_cost_per_project']-.5*c['price'])
(P/'scenario-model.json').write_text(json.dumps(model,indent=2)+'\n')
for c in cases:print(c['name'], 'delivery margin',c['delivery_margin'],'contribution',c['contribution_after_acquisition'],'capacity',c['annual_project_capacity'],'break-even',c['break_even_projects'],'annual result',c['annual_result_at_capacity'],'customer net',c['customer_cash_benefit_less_fee'])
for c in sw:print('software',c['name'],'first contract contribution',c['first_contract_year_contribution'],'break-even customers',c['new_customers_to_cover_fixed'])
assert cases[1]['contribution_after_acquisition']==24800
assert cases[1]['annual_result_at_capacity']==68000
print('arithmetic assertions PASS')
