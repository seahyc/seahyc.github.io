# Arithmetic and sensitivity audit
3 November 2026. Reproducible with `python3 research-dossiers/2026-11-03-insurance-ai-rollup/build-model.py`. All inputs are planning assumptions in USD, not quotations or public-market estimates. JSON stores unrounded results. 'm' means million USD unless specified.

## Broker acquisition
Historic net revenue8m, normalized EBITDA1.6m (20% assumed). Entry8x gives EV12.8m. Debt5.12m + equity9.18m =14.3m uses: EV12.8m + integration0.5m + fees0.3m + cash0.7m. Debt is40% of assumed purchaseEV,3.2x historical EBITDA; not a lender quote. At12x/14x entry holding debt fixed, equity rises to15.58m/18.78m. No reason has been established that a quality seller accepts8x.

Revenue =8 × retained revenue fraction × pricing/commission factor + new net revenue. Payroll is producer + service staff cost. Annual fixed cost1.8m includes local admin0.9, compliance/PI0.35, AI/data/security0.15, central management0.4. No recovery income credited. EBITDA = revenue ×(1−payroll fraction)−1.8. Interest0.512; principal0.512 annually; cash-tax proxy25% ×max(0, EBITDA−interest). Post-debt cash = EBITDA−interest−tax−principal.

| Case | Renewal fraction / pricing factor / new revenue | Payroll | Revenue | EBITDA | Margin | Post-debt cash | EBITDA / interest+principal |
|---|---|---:|---:|---:|---:|---:|---:|
| Low |90% /0.95 /0.4m |58% |7.24m |1.2408m |17.14% |0.0346m |1.212x |
| Base |96% /1.00 /0.8m |56% |8.48m |1.9312m |22.77% |0.5524m |1.886x |
| High |99% /1.05 /1.2m |54% |9.516m |2.57736m |27.08% |1.03702m |2.517x |

Base-payroll EBITDA break-even revenue=1.8/.44=4.0909m. After tax and debt service, cash break-even EBITDA=interest+principal/(1−tax rate)=0.512+0.512/.75=1.194667m; revenue=(1.8+1.194667)/.44=6.806061m. With new revenue0.8m and no pricing change this implies75.08% retained revenue merely to avoid negative simplified cash; it is NOT an acceptable retention target or covenanted coverage test. Low case fails the separate1.5x coverage gate despite slightly positive cash. At low-case EBITDA, maximum annual debt service for1.5x EBITDA coverage is0.8272m; actual lender cash/interest definitions and working-capital requirements may require less debt. After modelled cash tax, coverage is1.034x/1.539x/2.013x before additional capex, working capital and earnouts. Base headroom above1.5x debt service is onlyUSD40,400. These are simplified coverage screens, not a lender-defined CFADS covenant calculation.

Retention down5 percentage points at base costs EBITDA0.176m and simplified after-tax cash0.132m. Payroll up5 points costs EBITDA0.424m. Interest up2points costs0.1024m pre-tax per year. Every unmodeled0.1m cash integration/earnout/capex outlay reduces available cash by0.1m. Debt-service cash above is BEFORE additional earnouts, capex, regulatory-capital shortfall, acquisitions, distributions and extraordinary claims; not cash automatically available for founder dividends.

## AI bridge: hours are not cash
Assume2m eligible staff expense;25% work saved;40% of that translates into actual avoidable cost/paid capacity:2×.25×.4=0.2m gross. Subtract incremental software/security/review0.15m ->0.05m net. Zero realized cost avoidance makes net effect−0.15m. This conceptual bridge is NOT added on top of the anchor cases and is not measured evidence.

## Recovery cohort
All1000 reviewed files incur expense. Assume collected recovery per successUSD10,000 (not claim face value); fee15%/20%/25%, success10%/20%/30%, cost per screened file250/200/150, fixed cohort cost100,000. Revenue=files×success×collected amount×fee; contribution=revenue−files×cost−fixed.

| Case | Collected for rights holder | Agency revenue | All cohort cost | Contribution | Break-even success | Lag assumption |
|---|---:|---:|---:|---:|---:|---:|
| Low |1.0m |150k |350k |−200k |23.33% |18months |
| Base |2.0m |400k |300k |100k |15% |12months |
| High |3.0m |750k |250k |500k |10% |6months |

Break-even success=(files×per-file-cost+fixed)/(files×collected-per-success×fee). Front cohort-cost reserve350k/300k/250k precedes collections; longer lags also require ongoing cohorts/fixed overhead financing, not modelled by simply calling these annual profits. Base collected amounts20% lower cuts revenue80k and contribution to20k. Base cost per reviewed fileUSD100 higher erases100k contribution. No margin/retention advantage exists until mandated incremental collected cash exceeds full costs. Fees are hypothetical, not legal approval or 'industry standard'.

## Software alternative
Annual revenue=customers×monthly price×12; variable cost/customer/month=150 infrastructure+support hours×75; annual fixed240k. Cases5/15/30 customers, monthly prices1200/1800/2500 and support12/8/5hours give annual contribution−231k/−51k/+471k. Break-even134/20/11customers respectively (rounded up). Excludes CAC, one-time onboarding, tax and financing; gross support contribution is not software-company free cash flow. Market willingness to pay untested.

## Institutional scale and personal proceeds
EV = EBITDA×exit multiple. USD1bn at10/14/18x requires EBITDA100/71.4286/55.5556m. At assumed25% margin, required net revenue400/285.7143/222.2222m. Full10–18x and18–30% cross-sensitivities yield185.1852–555.5556m revenue. At14x/25%, net revenue285.7143m would imply placed premium2,380.95m at12% or1,587.30m at18% assumed revenue yield. These yields are illustrative; not universal Asian commissions and not applied to a TAM. Roughly44.64 historical1.6m-EBITDA anchor equivalents are needed for71.43m EBITDA BEFORE incremental shared overhead; this is a scale translation, not a44-deal plan. Flat EBITDA at10x rather than14x lowersEV28.57%.

Common proceeds=(EV−net debt−fees−senior claims)×effective ownership. Example1000−300−20=680m common pool only if no further preferences;3%/5%/10% yields20.4/34/68m pre-tax. For personal20–30m with3% common participation, required residual equity666.67–1000m; with5%,400–600m; with10%,200–300m. Gross pre-tax cash is not personal spendable post-tax cash.

Alternative promote:(680−400 sponsor capital/hurdle)×15%management pool×50%founder pool share=21m. It is an illustrative contractual waterfall, not an additional common-equity entitlement. Secondary300m common value×12%founder stake×25%holding sold=9m gross and9%remaining stake. Recap80m new debt−10m costs/reserves=70m distribution;10%founder gets7m but new annual interest8m at10%, with permission/solvency constraints. No recap assumed in operating cases or founder exit common example.
