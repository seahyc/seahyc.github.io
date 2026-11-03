# Scenario arithmetic · 3 November 2026

Original planning assumptions in USD. These are not quotes, measured customer metrics or a forecast. Run `python3 research-dossiers/2026-11-03-ai-advisory-bookshelf/calculate-scenarios.py`.

## Equations

Monthly contribution C = price − (3% × price + 0.30) − service − rights reserve − support_minutes/60 × 45.

Acquisition A = cash CAC + onboarding_minutes/60 × 45. Net per active payer after steady-state replacement N = C − monthly churn × A.

Cash break-even = ceil(2,000/N). Economic break-even = ceil(12,000/N), including USD10,000/month founder opportunity cost. Undefined if N ≤ 0. Cash fixed budget = hosting 200 + editorial maintenance 1,400 + administration/rights review allowance 400. All chosen assumptions; fixed editorial capacity must be validated.

| Case | Price/month | Service | Rights reserve | Support cost | Fees | C | CAC + onboarding A | Churn/month | N | Cash BE payers | Economic BE payers |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| low | 9.00 | 4.00 | 0.00 | 7.50 | 0.57 | -3.07 | 123.75 | 10% | -15.445 | None | None |
| base | 19.00 | 1.50 | 2.00 | 3.00 | 0.87 | 11.63 | 82.50 | 5% | 7.505 | 267 | 1599 |
| high | 29.00 | 1.00 | 3.00 | 1.50 | 1.17 | 22.33 | 41.25 | 2% | 21.505 | 94 | 559 |

None means no finite break-even under those assumptions. Replacement includes acquisition and onboarding of churned payers, so break-even does not conceal the retention cost. Growth acquisition is additional. Cash break-even excludes founder labour, which belongs in the economic view.

## Base worked example

19 − 0.87 − 1.50 − 2 − 3 = 11.63 contribution (61.21%). Acquisition + onboarding = 60 + 22.50 = 82.50. Churn replacement = 0.05 × 82.50 = 4.125/payer/month. Net = 7.505/payer/month. Cash BE = ceil(2,000/7.505) = 267; economic BE = ceil(12,000/7.505) = 1,599.

Payback ignoring churn = 82.50/11.63 = 7.09 months; simple lifetime contribution before acquisition = 11.63/0.05 = 232.60; after acquisition/onboarding = 150.10 before fixed costs. Constant churn and no discounting make this a screening approximation. Do not label it measured LTV.

At 1,000 base payers: ARR = 1,000 × 19 × 12 = 228,000; monthly net after replacement/cash fixed = 5,505; after founder opportunity cost = −4,495. No real cohort has been observed.

## One-variable base sensitivities

| Change | C/month | N after replacement | Economic BE payers |
|---|---:|---:|---:|
| base | 11.63 | 7.505 | 1599 |
| support doubles | 8.63 | 4.505 | 2664 |
| price falls to 9 | 1.93 | -2.195 | None |
| churn doubles | 11.63 | 3.380 | 3551 |
| rights reserve rises to 5 | 8.63 | 4.505 | 2664 |
| CAC rises to 120 | 11.63 | 4.505 | 2664 |
| service reserve doubles | 10.13 | 6.005 | 1999 |

## Scale screens, not market sizing

Base USD19/month requires 4,386 payers for USD1m annual revenue; 43,860 for USD10m; 438,597 for USD100m. These are arithmetic hurdles, not evidence that those buyers exist or that any revenue defines a venture. At 1,000 active payers and 5% churn, 50 replacements/month cost 4,125 in acquisition/onboarding before growth. If target decisions occur quarterly, monthly retention assumptions may be optimistic.

## Bounds and falsifiers

Low case loses money even before acquisition/fixed costs; volume does not rescue it. High case assumes higher willingness to pay alongside lower support/CAC/churn; it is a favourable joint scenario, not likely upside. Exclude unclear-rights books even if a reserve appears affordable. Actual legal terms can invalidate the model. Keep ingestion/audit time, connector failures and source updates in the cost log. Double cash fixed costs if a second domain needs a second editorial workload; do not assume catalogue expansion is free.

Side project is conditional on a low founder time budget and an organic channel, not a synonym for guaranteed profitability. The USD10,000 opportunity cost is a chosen value of founder time, not YC salary. Replace every input with paid cohort evidence before using this as an investment case.
