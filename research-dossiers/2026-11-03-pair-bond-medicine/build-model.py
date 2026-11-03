"""Original planning arithmetic; no clinical, customer, price or cost estimates."""
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parent
cases = [
    dict(name="low", price_usd=249, support_hours=3, loaded_support_usd_hour=80,
         platform_payment_usd=20, refund_fraction=.10, acquisition_usd=120),
    dict(name="base", price_usd=299, support_hours=1, loaded_support_usd_hour=65,
         platform_payment_usd=15, refund_fraction=.05, acquisition_usd=75),
    dict(name="high", price_usd=349, support_hours=.5, loaded_support_usd_hour=65,
         platform_payment_usd=12, refund_fraction=.03, acquisition_usd=45),
]
fixed = 300000

def calc(c):
    c = dict(c)
    c["support_cost_usd"] = round(c["support_hours"] * c["loaded_support_usd_hour"], 2)
    c["refund_reserve_usd"] = round(c["price_usd"] * c["refund_fraction"], 2)
    c["delivery_contribution_usd"] = round(c["price_usd"] - c["support_cost_usd"] - c["platform_payment_usd"] - c["refund_reserve_usd"], 2)
    c["after_acquisition_contribution_usd"] = round(c["delivery_contribution_usd"] - c["acquisition_usd"], 2)
    c["after_acquisition_margin_fraction"] = c["after_acquisition_contribution_usd"] / c["price_usd"]
    c["annual_break_even_paid_couples"] = math.ceil(fixed / c["after_acquisition_contribution_usd"]) if c["after_acquisition_contribution_usd"] > 0 else None
    return c

cases = [calc(c) for c in cases]
base = cases[1]
sensitivities = []
for label, changes in [
    ("price minus 20 percent", dict(price_usd=base["price_usd"]*.8)),
    ("support doubles", dict(support_hours=2)),
    ("acquisition doubles", dict(acquisition_usd=150)),
    ("refunds 15 percent", dict(refund_fraction=.15)),
    ("support 3h and acquisition 150", dict(support_hours=3, acquisition_usd=150)),
]:
    c = calc(dict(base, **changes))
    sensitivities.append(dict(test=label, contribution_usd=c["after_acquisition_contribution_usd"], annual_break_even_paid_couples=c["annual_break_even_paid_couples"]))

model = dict(
    date="2026-11-03", currency="USD", unit="one enrolled couple, one eight-week non-drug programme",
    status="All inputs are explicit founder planning assumptions, not quotes, forecasts, willingness-to-pay observations or clinical results.",
    price_context=dict(source="https://www.ourrelationship.com/", observed="USD249 coached, USD99 self-guided collected by research agent on 3 November 2026, not re-verified by parent review; not checkout guarantees or our achievable price"),
    annual_fixed_company_cost_usd=fixed, cases=cases, sensitivities=sensitivities,
    first_90_days_budget_usd=dict(founder_draw=9000, clinical_lead_and_safeguarding=12000, engineering=12000, legal_privacy_insurance_scoping=8000, research_statistics=5000, discovery_tools_travel=3000, contingency=11000),
    first_90_days_budget_total_usd=60000,
    volume_scenarios=[dict(paid_couples_per_year=n, gross_revenue_usd=n*base["price_usd"], contribution_before_fixed_usd=round(n*base["after_acquisition_contribution_usd"],2), operating_result_before_tax_usd=round(n*base["after_acquisition_contribution_usd"]-fixed,2)) for n in [300,3000,30000]],
    formulas=["delivery contribution = price - support hours * loaded wage - platform/payment - price * refund fraction", "after-acquisition contribution = delivery contribution - fully loaded acquisition allocation", "annual break-even = ceil(annual fixed company cost / positive after-acquisition contribution)", "operating result = paid enrolled couples * after-acquisition contribution - annual fixed company cost"],
    boundaries=["No TAM or distress denominator established. Month-12 100-enrollment gate is learning, not self-financing: base contribution 12905 before fixed costs versus 2325 annual break-even enrollments.", "Every paid enrollment incurs acquisition and expected delivery cost, including dropouts; refunds reserved separately.", "Support allowance includes screening, onboarding, reminders, outcome collection and routine escalation; severe cases can exceed it.", "Fixed cost is incremental central product, clinical governance, legal/security, sales management and administration; variable staff acquisition and support are outside it. Do not double-count the same hours.", "No recurring subscription or retention-derived LTV is assumed; referral conversion and sponsorship remain unvalidated.", "Excluded: tax, financing, founder equity value, extraordinary liability, major trial budget, pharmaceutical R&D and clinic capex.", "First-90-day budget is a separate cash spending envelope, not added to annual fixed cost mechanically. Replace all allocations with scoped quotes; pilot income is not precommitted funding.", "At 30000 couples fixed costs will change; constant-fixed scenario is arithmetic only, not a scale forecast."]
)
assert sum(model["first_90_days_budget_usd"].values()) == 60000
assert base["after_acquisition_contribution_usd"] == 129.05
(ROOT / "scenario-model.json").write_text(json.dumps(model, indent=2) + "\n")
lines = ["# Scenario arithmetic", "", "Generated by build-model.py. All inputs assumed; USD per enrolled couple unless stated.", "", "| Case | Price | Support cost | Platform/payment | Refund reserve | Acquisition | Delivery contribution | After acquisition | Annual break-even couples |", "|---|---:|---:|---:|---:|---:|---:|---:|---:|"]
for c in cases:
    lines.append(f'| {c["name"]} | {c["price_usd"]:.2f} | {c["support_cost_usd"]:.2f} | {c["platform_payment_usd"]:.2f} | {c["refund_reserve_usd"]:.2f} | {c["acquisition_usd"]:.2f} | {c["delivery_contribution_usd"]:.2f} | {c["after_acquisition_contribution_usd"]:.2f} | {c["annual_break_even_paid_couples"] or "none"} |')
lines += ["", "Annual fixed company cost assumed $300,000. Negative unit contribution has no volume break-even.", "", "| Change from base | Contribution | Annual break-even couples |", "|---|---:|---:|"]
for s in sensitivities:
    lines.append(f'| {s["test"]} | {s["contribution_usd"]:.2f} | {s["annual_break_even_paid_couples"] or "none"} |')
lines += ["", "## Equations and interpretation", ""] + model["formulas"] + ["", "## Boundaries", ""] + model["boundaries"]
(ROOT / "scenario-arithmetic.md").write_text("\n".join(lines) + "\n")
for c in cases:
    print(f'{c["name"]}: price={c["price_usd"]:.2f} delivery={c["delivery_contribution_usd"]:.2f} after_acquisition={c["after_acquisition_contribution_usd"]:.2f} break_even={c["annual_break_even_paid_couples"]}')
for s in sensitivities:
    print(s["test"], f'{s["contribution_usd"]:.2f}', s["annual_break_even_paid_couples"])
print("first_90_days_budget=60000; assertions passed")
