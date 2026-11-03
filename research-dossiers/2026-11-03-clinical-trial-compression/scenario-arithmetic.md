# Unit economics and arithmetic

3 November 2026. **All commercial inputs are invented USD assumptions.** No prices, salaries, sales cycles or productivity claims are established by these scenarios. Run `python3 research-dossiers/2026-11-03-clinical-trial-compression/build-model.py` to recreate JSON and calculations.

One unit is a sponsor-accepted outpatient Phase II protocol-feasibility/startup-readiness package. Clinical care, drug supply, site grants, full trial monitoring and regulatory application fees remain with the sponsor/contracted provider and are outside both fee and cost. Include their coordination burden in delivery hours; never imply this fee purchases an entire trial.

| Input/output, USD unless stated | Low | Base | High |
|---|---:|---:|---:|
| Fee | 65,000 | 90,000 | 110,000 |
| Expert/operations hours | 520 | 360 | 260 |
| Loaded cost/hour | 125 | 120 | 110 |
| Other direct costs: data permissions, tools, insurance allocation, security/QA | 12,000 | 9,000 | 7,000 |
| Rework/cancellation reserve | 6,000 | 4,000 | 3,000 |
| Acquisition per won project, including failed opportunities | 12,000 | 9,000 | 7,000 |
| Direct delivery cost | 83,000 | 56,200 | 38,600 |
| Delivery margin before acquisition | -18,000 | 33,800 | 71,400 |
| Contribution after acquisition | -30,000 | 24,800 | 64,400 |
| Maximum projects at 3,600 annual delivery hours | 6 | 10 | 13 |
| Fixed annual overhead excluding above labor/costs | 180,000 | 180,000 | 180,000 |
| Break-even paid projects/year | impossible | 8 | 3 |
| Annual result at capacity | -360,000 | 68,000 | 657,200 |
| Project cash exposure before balance collected, with 50% deposit | 62,500 | 20,200 | 0 |

Base arithmetic: `360 × 120 + 9,000 + 4,000 = 56,200`; `90,000 − 56,200 − 9,000 = 24,800`; `ceil(180,000 / 24,800) = 8`; `floor(3,600 / 360) = 10`; `10 × 24,800 − 180,000 = 68,000`. Base break-even fee at full capacity: `56,200 + 9,000 + 180,000/10 = 83,200`. At 8 projects, `8 × 24,800 − 180,000 = 18,400`.

Capacity assumes a small expert team/contractor pool; hours are not all substitutable. A missing statistician or clinical lead may be binding even when total hours fit. Direct loaded labor already includes compensation and benefits; overhead covers non-delivery management, base QA/legal/admin and product maintenance, without charging project labor twice. Annual view is paid throughput at steady operation; it excludes first-year ramp, tax, financing, stock compensation and any acquired asset value. Deposits reduce project cash exposure but do not fund all annual overhead or eliminate nonpayment risk. Reserve is an assumption, not an actuarial liability estimate.

## Sensitivities around base

Hold rate at $120/hour, other direct $9,000, reserve $4,000, fixed overhead $180,000.

| Change | Projects/year | Contribution/project | Annual result |
|---|---:|---:|---:|
| Base | 10 | 24,800 | 68,000 |
| Fee $75,000 | 10 | 9,800 | -82,000 |
| Fee $105,000 | 10 | 39,800 | 218,000 |
| 480 hours/package, capacity drops | 7 | 10,400 | -107,200 |
| 260 hours/package, capacity rises | 13 | 36,800 | 298,400 |
| Acquisition $18,000 | 10 | 15,800 | -22,000 |
| Only 6 paid projects | 6 | 24,800 | -31,200 |

The dominant uncertainties are price, reusable expert hours, paid utilization and cost of winning work. Token cost is buried in other direct cost and cannot rescue a broken sales or review model.

## Customer value must clear its own gate

`avoidable cash = workflow days saved × critical-path fraction × documented avoidable daily cash`. No speculative drug NPV; no salary treated as avoidable unless actually avoided/redeployed and agreed by the buyer. Science, endpoint duration and clinical efficacy stay constant.

| Scenario | Workflow days saved | Fraction on trial critical path | Startup days saved | Avoidable $/day | Benefit | Benefit less fee |
|---|---:|---:|---:|---:|---:|---:|
| Low | 10 | 0 | 0 | 2,000 | 0 | -65,000 |
| Base | 30 | 0.5 | 15 | 4,000 | 60,000 | -30,000 |
| High | 40 | 0.75 | 30 | 6,000 | 180,000 | 70,000 |

Base supplier profit does **not** establish buyer ROI: base customer cash benefit fails to cover fee. At assumed $4,000 avoidable daily cash, the $90,000 fee requires 22.5 attributable critical-path days, before any customer integration cost. Do not assert these savings or charge from hypothetical avoided amendments. If customer-specific integration costs exist, subtract them too; the displayed net is an optimistic ceiling on value after fee.

## Software comparator

These are first-contract-year economics for a new CRO/sponsor customer, not calendar-year revenue after a sales cycle. Assumed annual fixed product/QA/commercial overhead is $400,000, excluding the listed customer costs. Renewal contributions exclude retention sales/upgrade validation and assume neither renewal nor churn; they are conditional upper bounds.

| USD per new customer | Low | Base | High |
|---|---:|---:|---:|
| Annual contract value | 75,000 | 120,000 | 180,000 |
| Onboarding/integration | 35,000 | 25,000 | 15,000 |
| Annual hosting/support | 20,000 | 18,000 | 15,000 |
| Acquisition | 30,000 | 25,000 | 20,000 |
| Customer-specific validation | 25,000 | 15,000 | 10,000 |
| First-year contribution | -35,000 | 37,000 | 120,000 |
| New contracts to cover fixed cost | impossible | 11 | 4 |

No enterprise ACV or procurement duration is verified. Building product first bets on repeated integrations, access rights, validation effort, renewals and sales conversion before any are known. Service-first instead exposes the real work and buyer acceptance, while risking low margins and bespoke delivery. Neither is automatically the higher-return company.
