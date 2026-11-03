# Scenario arithmetic — 3 November 2026

All inputs below are invented USD planning assumptions. No vendor quotation, customer budget, salary survey, performance test or loss attribution was obtained. Low/base/high describe economic outcomes, not probability bands.

Unit: one platform/month; 100,000 scored employer/listing/contact events. These are not 100,000 unique people or recruiters. Repeated events and clustered investigations can change labour cost.

## Equations
- Screening = events × $0.002 = $200.
- Enrichment = 2,000 selected checks × $0.10 = $200.
- Step-ups = 200 selected checks × $1 blended allowance = $200.
- Review = events × review share × 4 minutes / 60 × $25/hour.
- Support = support hours × $75/hour.
- Recurring contribution = price − screening − enrichment − step-ups − review − support − 5% revenue incident reserve.
- Recurring break-even price = costs excluding revenue reserve / 0.95.
- Onboarding = onboarding hours × $75, uncharged once.
- Acquisition/onboarding payback = ($10,000 + onboarding)/positive recurring contribution.
- Company break-even customers = ceiling($30,000 central monthly fixed / positive recurring contribution).

## Vendor-side results
| Case | Price | Review cases | Review cost | Support cost | Reserve | Contribution | Margin | Break-even price | Payback months | Customers for central break-even |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| low | 2000 | 1000 | 1666.67 | 1200 | 100 | -1566.67 | -78.33% | 3649.12 | none | none |
| base | 5000 | 500 | 833.33 | 600 | 250 | 2716.67 | 54.33% | 2140.35 | 4.34 | 12 |
| high | 8000 | 200 | 333.33 | 300 | 400 | 6366.67 | 79.58% | 1298.25 | 1.76 | 5 |

These are contribution margins, not audited software gross margins. Central break-even assumes identical customers, adequate demand, unchanged capacity and fixed overhead. Actual hiring makes costs step upward. Year-one contribution after acquisition and onboarding: low $-31800.00, base $20800.00, high $65200.00.

## Sensitivities
| Change from base | Monthly contribution | Margin |
|---|---:|---:|
| base | $2716.67 | 54.33% |
| price minus 20% | $1766.67 | 44.17% |
| review share doubles | $1883.33 | 37.67% |
| support doubles | $2116.67 | 42.33% |
| price minus 20%, review share doubles, support doubles | $333.33 | 8.33% |

Screening cost doubling subtracts another $200/month from base contribution. Each extra 100 four-minute reviews costs $166.67; each extra support hour costs $75. With price $5,000 and eight support hours, recurring contribution reaches zero near 2.13% review share (holding other inputs fixed).

## Buyer economics are a separate gate
Benefit before fee = net customer review hours removed × loaded rate + incremental reduction × platform-captured baseline harm cost − incremental friction cost.
Do not include all national victim losses. Count only buyer-borne support, refunds, documented revenue impact or other finance-approved costs; keep those distinct from separately measured review savings. Estimate causal incremental reduction against the best available comparator, not gross blocked traffic.

| Case | Net customer hours saved | Platform harm baseline | Incremental reduction | Friction cost | Benefit before fee | Benefit / $5,000 fee | Net after fee |
|---|---:|---:|---:|---:|---:|---:|---:|
| low | 80 | $5000 | 10% | $1000 | $1500 | 0.30× | $-3500 |
| base | 160 | $12000 | 25% | $500 | $6500 | 1.30× | $1500 |
| high | 240 | $20000 | 40% | $250 | $13750 | 2.75× | $8750 |

The base buyer benefit is only 1.30× the fee: it FAILS the proposed 2× continuation hurdle, despite positive vendor contribution. At base hours/friction, 2× benefit requires $26,000/month of platform-captured harm baseline at 25% incremental reduction, or a lower fee. A useful product can still be a bad purchase at the proposed price.

## Base-rate arithmetic, not a classifier benchmark
Precision = prevalence × recall / [prevalence × recall + (1−prevalence) × false-positive rate]. With 100,000 events, assumed 0.1% abuse prevalence and 80% recall:
- FPR 0.10%: 80 true positives, 99.90 false positives, precision 44.47%.
- FPR 0.01%: 80 true positives, 9.99 false positives, precision 88.90%.

These expected counts may be fractional; they are not observed incidents. Event-level metrics do not equal person-level denial rates. Evaluate good-employer approval and appeals separately. No conversion of a 0–100 score into a calibrated probability is assumed.

## Cash and falsifiers
Base uncharged onboarding is $1,800 and acquisition $10,000; payback is 4.34 months under steady-state assumptions. Payment delays and churn worsen it. Stop if realistic quotes or observed workload cannot support at least 50% recurring contribution AND the buyer’s independently validated 2× benefit threshold. No TAM is claimed; qualified named buyers, data permissions, repeatable integration and renewals must be counted first.
