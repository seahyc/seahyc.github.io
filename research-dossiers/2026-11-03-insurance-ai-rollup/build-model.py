from pathlib import Path
import json, math
D=Path(__file__).resolve().parent
M={'as_of':'2026-11-03','currency':'USD','units':'millions unless specified','status':'All operating inputs and valuation ranges are original planning assumptions, NOT market quotations, forecasts, commitments or estimates of addressable market. Public precedents are not used as transaction pricing inputs.'}
anchor={'historical_net_revenue':8,'historical_ebitda':1.6,'entry_multiple':8,'purchase_ev':12.8,'debt_at_close':5.12,'integration_cash':.5,'transaction_fees':.3,'working_cash':.7,'total_uses':14.3,'equity_required':9.18,'interest_rate':.10,'annual_principal':.512,'cash_tax_rate':.25,'fixed_costs':{'local_admin':.9,'compliance_PI':.35,'AI_data_security':.15,'central_management':.4}}
M['anchor']=anchor
M['anchor_cases']=[]
for name,ret,rate,new,payroll in [('low',.9,.95,.4,.58),('base',.96,1,.8,.56),('high',.99,1.05,1.2,.54)]:
 r=8*ret*rate+new; e=r*(1-payroll)-1.8;i=5.12*.1;tax=max(0,e-i)*.25;cash=e-i-tax-.512
 M['anchor_cases'].append(dict(name=name,retained_revenue_fraction=ret,premium_commission_rate_factor=rate,new_net_revenue=new,producer_and_service_payroll_fraction=payroll,net_revenue=r,EBITDA=e,EBITDA_margin=e/r,interest=i,cash_tax=tax,annual_principal=.512,post_debt_cash=cash,EBITDA_debt_service_coverage=e/(i+.512),after_cash_tax_debt_service_coverage_before_other_cash_uses=(e-tax)/(i+.512)))
M['entry_price_sensitivity']=[{'entry_multiple':x,'purchase_EV':1.6*x,'debt_fixed':5.12,'other_uses':1.5,'equity_required':1.6*x+1.5-5.12} for x in [8,12,14]]
M['one_variable_sensitivities']={'base_retention_minus_5_percentage_points_EBITDA_delta':-8*.05*.44,'base_retention_minus_5_points_cash_delta':-8*.05*.44*.75,'interest_plus_2_percentage_points_annual_pretax_cost':5.12*.02,'producer_service_payroll_plus_5_points_EBITDA_delta':-8.48*.05,'flat_base_EBITDA_exit_multiple_14_to_10_EV_drop_fraction':1-10/14}
M['anchor_break_even']={'EBITDA_revenue_at_base_payroll':1.8/.44,'post_tax_debt_service_cash_revenue_at_base_payroll':(1.8+.512+.512/.75)/.44,'minimum_revenue_retention_at_base_rate_and_new_revenue':((1.8+.512+.512/.75)/.44-.8)/8}
M['AI_bridge']={'eligible_staff_cost':2,'hours_saved_fraction':.25,'cash_realization_fraction':.4,'gross_cash_saving':.2,'incremental_software_security_review':.15,'net_cash_saving':.05,'note':'Do not add to anchor cases: already inclusive. At zero cash realization net saving is -0.15. Time freed is not automatically payroll saved.'}
M['claims_cases']=[]
for name,files,yield_,fee,cost,months in [('low',1000,.10,.15,250,18),('base',1000,.20,.20,200,12),('high',1000,.30,.25,150,6)]:
 # average collected third-party recovery per successful file; not claim face value
 rec=files*yield_*10000; rev=rec*fee; variable=files*cost; fixed=100000; contribution=rev-variable-fixed
 M['claims_cases'].append(dict(name=name,files=files,collectible_success_fraction=yield_,collected_per_success_USD=10000,fee_fraction=fee,collection_lag_months=months,collected_recovery_USD=rec,revenue_USD=rev,variable_cost_USD=variable,fixed_cost_USD=fixed,contribution_USD=contribution,break_even_success_fraction=(variable+fixed)/(files*10000*fee),precollection_cost_reserve_USD=variable+fixed))
M['claims_caveats']=['All screened files incur cost, not only successes.','Assumes a signed mandate from actual recovery-right holder, permitted fee structure, no double charging, and fees on incremental collected cash only.','A cohort, not annual steady-state: collection lags require funding before revenue.','Legal/expert/evidence preservation costs must fit the assumed all-in per-file cost; overruns reduce contribution dollar for dollar.','No retention uplift or brokerage cross-sell is credited; neither measured.']
M['software_cases']=[]
for name,n,price,h in [('low',5,1200,12),('base',15,1800,8),('high',30,2500,5)]:
 rev=n*price*12;var=n*(150+h*75)*12;fixed=240000
 M['software_cases'].append(dict(name=name,customers=n,monthly_price_USD=price,monthly_infra_per_customer_USD=150,monthly_support_hours=h,support_USD_per_hour=75,annual_fixed_USD=fixed,annual_revenue_USD=rev,annual_operating_contribution_USD=rev-var-fixed,break_even_customer_count=math.ceil(fixed/(12*(price-150-h*75)))))
M['institutional_exit_sensitivities']=[]
for multiple in [10,14,18]:
 for margin in [.18,.25,.30]:
  e=1000/multiple;r=e/margin
  M['institutional_exit_sensitivities'].append(dict(exit_EV=1000,multiple=multiple,EBITDA_margin=margin,required_EBITDA=e,required_net_revenue=r,placed_premium_at_assumed_12pct_revenue_yield=r/.12,placed_premium_at_assumed_18pct_revenue_yield=r/.18))
M['regional_depth_test']={'method':'For each jurisdiction enumerate owners, permission, commercial net revenue, normalized EBITDA, seller willingness, price, client/producer transferability; then sum non-overlapping available EBITDA. Never use license counts or insurer premiums as broker earnings.','illustrative_needed_anchor_equivalents_at_14x':(1000/14)/1.6,'note':'Not a deal count forecast. No valid independently owned commercial pool estimate obtained.'}
M['founder_waterfalls']={'status':'Assumptions only; actual sponsor preference, hurdle, catch-up, vesting, leaver, dilution and approval terms govern. All personal figures pre-tax.','simple_common_equity':[],'promote_example':{'exit_EV':1000,'net_debt':300,'exit_fees':20,'distributable_equity':680,'sponsor_return_of_capital_and_hurdle':400,'residual_profit':280,'management_pool_fraction':.15,'founder_fraction_of_pool':.5,'founder_proceeds':21,'note':'Pool applies to residual AFTER hypothetical preference/hurdle; no separate founder common shares credited.'},'secondary_example':{'common_equity_value':300,'founder_ownership':.12,'fraction_of_holding_sold':.25,'gross_cash':9,'remaining_ownership':.09},'dividend_recap_example':{'new_debt':80,'fees_reserves':10,'distributable':70,'founder_common_ownership':.10,'founder_cash':7,'additional_annual_interest_at_10pct':8,'note':'Requires lender permission, regulatory/solvency assessment, distributable reserves and board approval; increases leverage. Client money cannot fund it.'}}
for ownership in [.03,.05,.10]:
 M['founder_waterfalls']['simple_common_equity'].append({'exit_EV':1000,'net_debt':300,'exit_fees':20,'common_equity_after_assumed_no_preferences':680,'founder_ownership':ownership,'proceeds':680*ownership})
M['personal_target_equity_required']=[{'target_cash':cash,'effective_common_ownership':p,'equity_required':cash/p} for cash in [20,30] for p in [.03,.05,.10]]
M['exclusions']=['No FX conversion or summed cross-market TAM.','Acquisition costs/retention/AI are assumptions pending target records.','Anchor EBITDA excludes depreciation/amortization; tax is simplified cash-tax proxy, not tax advice.','No ongoing acquisition funding in anchor post-debt cash; no earnout liability assumed there.','Add earned seller payments, capex, extra integration, regulatory capital shortfalls and distributable-reserve restrictions before actual dividends.','No claim of credit availability or institutional exit demand.']
(D/'scenario-model.json').write_text(json.dumps(M,indent=2)+'\n')
for c in M['anchor_cases']:print('anchor',c['name'],'revenue',round(c['net_revenue'],4),'EBITDA',round(c['EBITDA'],4),'post-debt cash',round(c['post_debt_cash'],4),'coverage',round(c['EBITDA_debt_service_coverage'],3))
for c in M['claims_cases']:print('claims',c['name'],'cohort contribution USD',round(c['contribution_USD']),'break-even success',round(c['break_even_success_fraction'],4))
for c in M['software_cases']:print('software',c['name'],'annual contribution USD',round(c['annual_operating_contribution_USD']),'break-even customers',c['break_even_customer_count'])
print('14x / 25% exit: EBITDA',1000/14,'net revenue',1000/14/.25)
assert abs(anchor['total_uses']-anchor['debt_at_close']-anchor['equity_required'])<1e-9
assert all(c['net_revenue']>c['EBITDA'] for c in M['anchor_cases'])
print('PASS: sources-and-uses and scenario arithmetic assertions')
