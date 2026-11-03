# Scenario arithmetic — 3 November 2026

**All inputs are invented USD planning assumptions. Nothing here is a supplier quote, established affordable price, demand forecast or qualification result.**

One unit = one accepted ESC. Electrical compatibility, origin and buyer qualification remain unproven. A drone can use a different number/type of ESCs; no drone-count-to-revenue conversion is made.

Equations:
- Landed accepted-unit cost = attempt cost / yield + acceptance cost.
- Unit contribution = price × (1 − warranty fraction) − landed accepted-unit cost.
- NRE net = projects × (fee − project cost).
- Annual operating contribution = accepted units × unit contribution + NRE net − annual fixed cost.
- Annual contribution after depreciation = operating contribution − tooling / 3.
- Break-even accepted units = ceiling((fixed + tooling/3 − NRE net) / unit contribution).
- Break-even price = (landed accepted-unit cost + (fixed + tooling/3 − NRE net)/units) / (1 − warranty fraction).
- Working-capital screen = max(0, units × landed cost × inventory days/365 + hardware revenue × receivable days/365 − hardware revenue × production deposit fraction).
- Funding screen = tooling + working-capital screen + projects × max(0, project cost − 50% of NRE fee).

## Inputs and outputs

| Per steady year, USD unless stated | Low | Base | High |
|---|---:|---:|---:|
| Accepted ESC units | 1,000 | 5,000 | 15,000 |
| Price per accepted unit | 400 | 350 | 300 |
| Cost per attempt | 240 | 190 | 160 |
| Accepted yield | 0.8 | 0.92 | 0.97 |
| Acceptance cost/unit | 25 | 20 | 15 |
| Warranty share of revenue | 0.04 | 0.025 | 0.02 |
| NRE projects | 1 | 3 | 5 |
| NRE fee/project | 50,000 | 75,000 | 100,000 |
| NRE cost/project | 90,000 | 65,000 | 70,000 |
| Annual fixed cost | 400,000 | 500,000 | 700,000 |
| Upfront tooling | 150,000 | 180,000 | 250,000 |
| Inventory days | 120 | 90 | 60 |
| Receivable days | 90 | 60 | 30 |
| Production deposit share | 0 | 0.2 | 0.3 |
| Contribution/accepted unit | 59.00 | 114.73 | 114.05 |
| Unit contribution fraction | 0.15 | 0.33 | 0.38 |
| Hardware revenue | 400,000.00 | 1,750,000.00 | 4,500,000.00 |
| NRE net contribution | -40,000.00 | 30,000.00 | 150,000.00 |
| Operating contribution before depreciation | -381,000.00 | 103,641.30 | 1,160,773.20 |
| Contribution after depreciation | -431,000.00 | 43,641.30 | 1,077,439.86 |
| Hardware-only contribution after depreciation | -391,000.00 | 13,641.30 | 927,439.86 |
| Cash after tooling before WC | -531,000.00 | -76,358.70 | 910,773.20 |
| Break-even units with NRE | 8,306.00 | 4,620.00 | 5,554.00 |
| Break-even units without NRE | 7,628.00 | 4,882.00 | 6,869.00 |
| Break-even price with NRE | 848.96 | 341.05 | 226.70 |
| Tooling + WC + NRE-gap funding screen | 420,479.45 | 479,444.61 | 350,000.00 |

## One-variable sensitivities around base

| Change | Annual contribution after depreciation, USD | Funding screen, USD |
|---|---:|---:|
| Price falls 20% | -297,608.70 | 491,910.36 |
| Accepted volume falls 50% | -243,179.35 | 370,972.30 |
| Yield falls to 80% | -111,250.00 | 517,636.99 |
| Attempt cost rises 20% | -162,880.43 | 530,367.78 |
| Qualification cost doubles | -151,358.70 | 674,444.61 |
| No NRE projects | 13,641.30 | 396,944.61 |
| No production deposits; 120-day receivables | 43,641.30 | 1,117,115.84 |
| Illustrative 25% duty on attempt cost; no pass-through | -214,510.87 | 543,098.57 |

## Interpretation and limits

The base case only narrowly funds fixed cost and replacement; NRE is not a substitute for repeating hardware economics. Volume, accepted yield, delivered price and project scope are the largest controllable uncertainties. A small price cut can erase the company contribution while unit contribution stays positive.

The 25% duty is an arithmetic shock, not a determination that this ESC attracts that tariff. Classification, end use, origin and entry date need an importer/broker assessment; CBP guidance is in E21. No preferential allied rate is assumed.

The funding screen assumes overlapping inventory and receivables and no supplier credit; deposits can substantially offset this steady-state need. It excludes the operating burn of ramp/delay. Add a six-month zero-revenue base fixed-cost delay: 500,000 × 6/12 = USD250,000 extra runway, before any extra engineering. Cash collection, not accounting NRE, finances the company.

Replace every assumption with scoped CM/test/assessor bids, a buyer acceptance plan and dated customer/supplier terms before investment. Do not purchase equipment because these illustrative equations balance.

Price caveat: base USD350 is unanchored, below observed Scorpion $499.99; currency/spec equivalence unverified. Not evidence of obtainable price or cost advantage.
