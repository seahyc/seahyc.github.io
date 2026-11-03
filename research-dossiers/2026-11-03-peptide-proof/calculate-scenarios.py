"""Reproduce planning scenarios; all commercial inputs are invented, in USD.

No network, no installed dependencies. Writes only this dossier's model/output.
The public lab menus anchor plausibility only; none is a scoped quotation for
the proposed service or the HHS draft's full characterization requirements.
"""
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def case(name, price, lab, repeats, logistics, hours, support, volume, fixed):
    labor_rate, risk_allowance = 100, 60
    variable = lab * (1 + repeats) + logistics + hours * labor_rate + support + risk_allowance
    contribution = price - variable
    return {
        "name": name,
        "inputs": {
            "price_per_case": price,
            "lab_cost_per_initial_panel": lab,
            "repeat_panel_fraction": repeats,
            "logistics_per_case": logistics,
            "technical_review_hours": hours,
            "loaded_hourly_review_cost": labor_rate,
            "support_per_case": support,
            "risk_allowance_per_case": risk_allowance,
            "cases_per_month": volume,
            "fixed_expense_per_month": fixed,
        },
        "outputs": {
            "variable_cost_per_case": round(variable, 2),
            "contribution_per_case": round(contribution, 2),
            "contribution_margin": round(contribution / price, 6),
            "monthly_revenue": price * volume,
            "monthly_operating_result": round(volume * contribution - fixed, 2),
            "break_even_cases_per_month": math.ceil(fixed / contribution) if contribution > 0 else None,
            "price_for_30_percent_contribution": round(variable / 0.7, 2),
        },
    }


cases = [
    case("low", 1400, 950, 0.20, 80, 3, 50, 15, 18000),
    case("base", 1800, 800, 0.10, 65, 2, 50, 45, 22000),
    case("high", 2100, 650, 0.05, 50, 1.25, 40, 90, 30000),
]
base = cases[1]
i = base["inputs"]


def sensitivity(label, **changes):
    x = dict(i)
    x.update(changes)
    result = case(label, x["price_per_case"], x["lab_cost_per_initial_panel"],
                  x["repeat_panel_fraction"], x["logistics_per_case"],
                  x["technical_review_hours"], x["support_per_case"],
                  x["cases_per_month"], x["fixed_expense_per_month"])
    return {"name": label, "changed_inputs": changes, "outputs": result["outputs"]}


sensitivities = [
    sensitivity("price minus 20 percent", price_per_case=1440),
    sensitivity("lab cost plus 50 percent", lab_cost_per_initial_panel=1200),
    sensitivity("lab cost doubles", lab_cost_per_initial_panel=1600),
    sensitivity("lab cost triples", lab_cost_per_initial_panel=2400),
    sensitivity("review doubles", technical_review_hours=4),
    sensitivity("repeat fraction 30 percent", repeat_panel_fraction=0.30),
    sensitivity("volume halves", cases_per_month=22.5),
    sensitivity("fixed expense plus 10000", fixed_expense_per_month=32000),
]

model = {
    "date": "2026-11-03",
    "currency": "USD",
    "status": "invented planning scenarios, not quotes, forecasts or statistical bounds",
    "unit": "one standardized buyer lot-evidence case with a stipulated external laboratory panel",
    "scope_warning": "Panel is an assumption for a narrow qualified workflow. It does not price full HHS draft characterization, all methods, multiple sampled vials, finished product testing, stability or supplier audit. Quote these separately before offering the service.",
    "equations": {
        "variable": "lab_cost * (1 + repeat_fraction) + logistics + review_hours * loaded_hourly_rate + support + risk_allowance",
        "contribution": "price - variable",
        "monthly_result": "cases_per_month * contribution - fixed_expense",
        "break_even": "ceil(fixed_expense / contribution) when contribution > 0; otherwise impossible at this price",
        "working_capital": "monthly_cases * variable * collection_days / 30 (simplified upfront-cost screen)",
    },
    "cases": cases,
    "base_fixed_expense_allocation": {
        "founder_salary": 6000,
        "quality_supervision_and_systems": 7000,
        "sales_admin_security": 4000,
        "professional_fees_insurance_rent_allowance": 5000,
        "warning": "All invented; variable technical reviewers are costed per case separately. Risk allowance is not an insurance quote or a liability cap.",
    },
    "sensitivities": sensitivities,
    "capital": {
        "gross_discovery_budget_90_days": 80000,
        "pilot_prepay_target_two_buyers": 10000,
        "net_discovery_burn_if_both_pay_and_full_budget_spent": 70000,
        "post_discovery_base_receivables_days_assumed": 30,
        "post_discovery_base_variable_working_capital_screen": round(45 * base["outputs"]["variable_cost_per_case"], 2),
        "post_discovery_two_month_fixed_reserve": 44000,
        "post_discovery_incremental_cash_screen": round(45 * base["outputs"]["variable_cost_per_case"] + 44000, 2),
        "warning": "Discovery spending is sunk before the separate scale-up cash screen. No equipment capex priced. Prepayments, payables, growth, collections, tax and exact staffing cash timing alter this simplified screen.",
    },
    "exclusions": [
        "tax and financing",
        "owned-lab capex, accreditation fees and instrument depreciation",
        "large claims, recall and uninsurable liabilities",
        "supplier-audit travel and new-method development unless separately priced",
        "client inventory hold and sacrificed sample value",
        "consumer acquisition and product distribution",
        "full HHS draft characterization scope unless expressly quoted",
    ],
    "validation_needed": [
        "three matched laboratory bids with matrices/methods/sample counts and turnaround",
        "buyer-approved sampling and acceptance rules",
        "measured reviewer time and repeat investigations",
        "paid follow-on orders and collected receipts",
        "binding insurance terms and written legal scope",
    ],
}

assert sum(v for v in model["base_fixed_expense_allocation"].values() if isinstance(v, int)) == 22000
assert base["outputs"]["variable_cost_per_case"] == 1255
assert base["outputs"]["monthly_operating_result"] == 2525
assert base["outputs"]["break_even_cases_per_month"] == 41
assert sensitivities[2]["outputs"]["contribution_per_case"] < 0
(ROOT / "scenario-model.json").write_text(json.dumps(model, indent=2) + "\n")

lines = ["Planning scenarios: USD; inputs invented, not quotes."]
for row in cases:
    o = row["outputs"]
    be = o["break_even_cases_per_month"]
    lines.append(f'{row["name"]}: variable={o["variable_cost_per_case"]:.2f}; contribution={o["contribution_per_case"]:.2f}; margin={o["contribution_margin"]:.2%}; monthly_result={o["monthly_operating_result"]:.2f}; break_even={be if be else "impossible at price"}')
for row in sensitivities:
    o = row["outputs"]
    lines.append(f'{row["name"]}: contribution={o["contribution_per_case"]:.2f}; monthly_result={o["monthly_operating_result"]:.2f}')
lines.append(f'Base incremental post-discovery cash screen={model["capital"]["post_discovery_incremental_cash_screen"]:.2f}')
lines.append("PASS: arithmetic identities checked; no input validated by customer or lab quote.")
output = "\n".join(lines) + "\n"
(ROOT / "scenario-arithmetic.txt").write_text(output)
print(output, end="")
