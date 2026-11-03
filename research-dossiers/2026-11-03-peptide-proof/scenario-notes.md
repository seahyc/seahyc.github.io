# Arithmetic and scope — USD planning scenarios

All commercial inputs are invented. Lab price menus are anchors for basic advertised panels, not quotes for the company's qualified service or for the HHS draft's entire characterization scope. A case is a stipulated lot-evidence workflow, not a promise that one vial represents a lot. Actual sample counts, materials sacrificed and method scope must be priced before contracting.

Run `python3 research-dossiers/2026-11-03-peptide-proof/calculate-scenarios.py` from the repository. It writes only scenario-model.json and scenario-arithmetic.txt beside itself. No dependencies or network. The script checks arithmetic identities; it does not validate assumptions.

## Base arithmetic

Price $1,800/case. Lab allowance $800, expected repeat panels 10%, logistics $65, technical review 2 hours at loaded $100/hour, support $50, risk allowance $60.

Variable cost = $800 × 1.10 + $65 + 2 × $100 + $50 + $60 = **$1,255**.

Contribution = $1,800 − $1,255 = **$545/case**, or **30.28%**. With 45 cases/month and $22,000 fixed monthly expense, operating result = 45 × $545 − $22,000 = **$2,525/month**, before tax and financing. Fixed expense includes a hypothetical $6,000 founder salary; it excludes instrument ownership. Contribution is not net profit and is not lab gross margin.

Break-even = ceil($22,000 / $545) = **41 cases/month**. Price required for 30% direct contribution = $1,255 / 0.70 = **$1,792.86**. These thresholds depend on identical scoped cases and adequate reviewer capacity; neither is established.

## Three cases

| Invented case | Price/case | Variable/case | Direct contribution/case | Cases/month | Fixed/month | Operating result/month | Break-even cases/month |
|---|---:|---:|---:|---:|---:|---:|---:|
| Low | $1,400 | $1,630.00 | −$230.00 | 15 | $18,000 | −$21,450 | Impossible at this price |
| Base | $1,800 | $1,255.00 | $545.00 | 45 | $22,000 | $2,525 | 41 |
| High | $2,100 | $957.50 | $1,142.50 | 90 | $30,000 | $72,825 | 27 |

Low/base/high change price, panel cost, repeat fraction, review time, logistics, volume and fixed expense together. They are coherent thought experiments, not probability bounds or a statistical forecast. The favorable case requires more demand, efficient methods and premium pricing simultaneously. Do not present its outcome as expected profit.

## One-variable sensitivities around base

| Change | Contribution/case | Operating result/month |
|---|---:|---:|
| Price reduced 20% | $185 | −$13,675 |
| Lab allowance +50% | $105 | −$17,275 |
| Lab allowance doubles | −$335 | −$37,075 |
| Lab allowance triples | −$1,215 | −$76,675 |
| Review hours double | $345 | −$6,475 |
| Repeat-panel fraction rises to 30% | $385 | −$4,675 |
| Volume halves (22.5 expected cases) | $545 | −$9,737.50 |
| Fixed expense increases $10,000 | $545 | −$7,475 |

Expanded molecular characterization may require substantially more analytical work; no amount is asserted without a quote. Doubling/tripling the lab allowance is a sensitivity, not a cost estimate for that scope. The decisive collection is three comparable written bids, with method/matrix, sample count, validation, raw data, subcontracting and timing held constant. If the all-in price the buyer accepts cannot cover the resulting cost, stop.

## Cash is separate from margin

Discovery has an $80,000 gross 90-day cap. Two $5,000 pilot prepayments would reduce net burn to $70,000 if both pay and the full budget is spent. Those are targets, not receipts.

After discovery, a separate simplified scale-up screen assumes 30-day collections and all variable cash advanced: 45 × $1,255 = **$56,475** working capital. Add two months of base fixed expense ($44,000): **$100,475 incremental cash**, after the earlier discovery spending. This is not a dated cash forecast and should not be added to expenses when computing profit. Customer prepayments and vendor credit can reduce the gap; growth, delays and investigations can increase it.

The $60/case risk allowance is deliberately only an allowance. It does not price a severe claim or guarantee affordable insurance. Owned-lab capex, accreditation, instrument depreciation, new-method development, audits, taxes, financing, recall and consumer/product-distribution costs are outside this model. The pharmacy also bears sacrificed material and inventory-hold costs; test the buyer's total burden, not just the startup invoice.
