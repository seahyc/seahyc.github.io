# Scenario arithmetic — explicitly invented inputs

All inputs are original planning assumptions in USD as of 3 November 2026. None is a prevailing market rate, bid, buyer willingness to pay, measured throughput or forecast. `python3 model.py` regenerates `scenario-model.json` and checks identities. This describes a possible future owned cell, not an authorization to purchase it. Start validation with incumbent/partner equipment; obtain lease quotes before modelling that route separately.

## Unit and operating denominator

One campaign delivers 20 accepted route kilometres of a defined sensor/coverage/uncertainty scope. This is linear route distance, not seabed area, navigation distance or perfectly observed cable length. A corridor kilometre with insufficient evidence is not accepted. Capture rate multiplied by acceptance yield represents effective output including rework. Survey days round up; weather standby and mobilisation days consume vessel/robot-crew days too. A simple deterministic scenario cannot resolve stochastic weather, correlated failures or fragmented booking windows.

All-in daily field cash: $4,000 charter (including vessel crew/fuel under the assumption) + $2,000 contracted robot/survey crew = $6,000 for **every** charged day. Fixed campaign cash: $4,000 mobilisation freight/travel/permits allocation + $4,000 data processing/review + $1,000 recovery/damage reserve = $9,000. Mobilisation days purchase vessel/crew occupancy; fixed mobilisation charge buys different logistics, so these are distinct assumed expenses. Contract terms could differ substantially.

Annual cash fixed: $100,000 cell insurance/storage/scheduled maintenance + $500,000 central founder/engineering/commercial/R&D cost = $600,000. Field contractors are outside that central headcount. Equipment $300,000, residual $0, three-year life gives $100,000 annual depreciation. Annual economic fixed = $700,000. Reserve is an allowance, not actuarially justified cover; no guaranteed recovery or liability cap follows.

| Invented case | Capture km/survey day | Accepted fraction | Survey days = ceil(20 / effective rate) | Standby + mob days | Total days | Price/accepted km | Revenue | Variable cost | Campaign contribution |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Low | 4 | 0.80 | 7 | 2 + 2 | 11 | $2,000 | $40,000 | $75,000 | −$35,000 |
| Base | 8 | 0.90 | 3 | 1 + 1 | 5 | $3,000 | $60,000 | $39,000 | $21,000 |
| High | 12 | 0.95 | 2 | 0 + 1 | 3 | $3,500 | $70,000 | $27,000 | $43,000 |

Variable cost = total days × $6,000 + $9,000. Contribution excludes all annual fixed costs. These favourable price and productivity assumptions move together in high case; that is a stress envelope, not an assigned probability or expected case.

| Case | Assumed campaigns/year | Field days/year | Annual revenue | Cash contribution after cash fixed, before capex | Economic contribution after depreciation | Full company cost/accepted km |
|---|---:|---:|---:|---:|---:|---:|
| Low | 6 | 66 | $240,000 | −$810,000 | −$910,000 | $9,583.33 |
| Base | 12 | 60 | $720,000 | −$348,000 | −$448,000 | $4,866.67 |
| High | 24 | 72 | $1,680,000 | $432,000 | $332,000 | $2,808.33 |

## Break-even and capacity

- Negative low job contribution has no volume break-even: scaling loses more.
- Base cash break-even = ceil(600,000 / 21,000) = 29 campaigns; economic break-even = ceil(700,000 / 21,000) = **34**, or 680 accepted km and 170 field days. At only 12 campaigns, required full-cost selling price = (39,000 + 700,000/12) / 20 = **$4,866.67/km**.
- High cash break-even = ceil(600,000/43,000) = 14; economic break-even = ceil(700,000/43,000) = **17**, or 340 accepted km and 51 field days.
- Assume 220 field days available annually. Arithmetic maximum floor(220/total campaign days) = 20/44/73 low/base/high campaigns. These are scheduling upper bounds before maintenance conflicts and seasonal clusters, **not** demand or promised utilisation. Base break-even fits this crude capacity envelope, but evidenced demand is zero so far.
- Do not compare 60/220 with Oceaneering's 65% ROV fleet utilisation: its denominator is a different asset/calendar accounting measure. Model separates available days from purchased work and accepted output.

## One-variable sensitivities from base

| Change | Campaign contribution | Annual economic contribution | Interpretation |
|---|---:|---:|---|
| None | $21,000 | −$448,000 | Positive project, insufficient annual demand |
| Price −20% ($2,400/km) | $9,000 | −$592,000 | Price pressure directly hits contribution |
| Price +20% ($3,600/km) | $33,000 | −$304,000 | Better job price alone does not make 12 campaigns sufficient |
| One additional standby day | $15,000 | −$520,000 | $6,000 per campaign consumed |
| Capture rate halves | $3,000 | −$664,000 | Survey days rise from 3 to 6; crew and charter retained |
| Acceptance yield falls to 0.60 | $9,000 | −$592,000 | Survey days rise from 3 to 5; total days rise from 5 to 7 |
| Demand doubles to 24/year | $21,000 | −$196,000 | More profitable jobs still insufficient for assumed fixed base |
| Charter daily cost +50% | $11,000 | −$568,000 | $2,000 × 5 extra per campaign |

Yield sensitivity arithmetic: ceil(20/(8×0.60)) = **5 survey days**, total 7 with standby/mob; variable cost = 7×$6,000+$9,000 = $51,000, leaving $9,000 campaign contribution. Annual economic contribution = 12×$9,000−$700,000 = −$592,000.

Largest measurable levers: full campaign price, *removable* charged vessel days, accepted capture/re-survey performance and contracted annual campaign count. Improving model inference time has no model value unless it moves one of those terms. A further 10% contractor share on base revenue would cost $6,000/campaign and lower annual economic contribution by $72,000, to −$520,000; no revenue share included in default inputs.

## Capital, collections and loss stress

Assume 90-day customer receivables, steady billing and no advance payments. Working receivables proxy = annual revenue × 90/365: base $177,534.25. A starting cash inventory of $300,000 capex + $177,534.25 receivables + $300,000 six-month fixed cash = **$777,534.25**. This is not a sufficient fundraising plan: it omits initial ramp losses, customer concentration, contractual deposits, tax/finance and extreme events; the base loses $348,000 annual operating cash even before purchase capex.

High case simple steady-state capex payback = $300,000 / $432,000 = 0.694 years, **only under all high assumptions**, before financing/tax and extra working capital. Base and low have no positive company cash payback.

Incremental stress: an uninsured $300,000 replacement plus one lost $21,000 base campaign contribution reduces the base economic result by another $321,000 to −$769,000. This is cash-at-risk illustration alongside an economic metric, not an expected loss calculation or GAAP accounting. Insurance deductible, recovery vessel, collateral cable damage, salvage obligations, replacement lead time and uptime impacts need a real policy/contract review; the $1,000/campaign allowance does not certify adequacy.

## Data to replace assumptions

Commercial lead: customer scope, price, volume, cancellation/standby terms, commissions, acceptance and payment history. Survey lead: timestamped mobilise/capture/recover/rework/review logs, sensor performance by conditions and failure data. Operations lead: binding charter/crew/equipment/insurance quotes and maintenance schedule. Counsel: operating permissions, supplier origin and technical-data transfer constraints. No investment decision uses model inputs as evidence.

## Gate 1 charter-rate correction
The $4,000 vessel-day assumption is uncalibrated and potentially optimistic, not a cost benchmark. At 2× ($8,000/day), base campaign cost increases by $20,000 to $59,000; contribution falls to $1,000; annual economic contribution is −$688,000. Economic break-even requires 700 campaigns, beyond the 44-campaign crude capacity. At 3× ($12,000/day), cost rises by $40,000 to $79,000; contribution is −$19,000 and annual economic contribution −$928,000; no volume break-even exists. All other base inputs held constant. Obtain actual charter/standby terms before using the model for a decision.
