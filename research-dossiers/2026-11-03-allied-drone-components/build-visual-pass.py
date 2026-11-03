"""Build eight replacement Fieldbook diagrams; standard library only."""
from pathlib import Path
from html import escape
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "static/images/allied-drone-components"
OUT.mkdir(parents=True, exist_ok=True)
INK, RED, GREEN, MUTED, PAPER = "#27231e", "#9d4c3f", "#566e5e", "#665f52", "#e9e1d3"


def t(x, y, s, size=24, color=INK, anchor="start", weight="400"):
    return (f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" '
            f'text-anchor="{anchor}" font-weight="{weight}">{escape(str(s))}</text>')


def rect(x, y, w, h, fill="none", stroke=MUTED, rx=8, sw=2):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def ln(x1, y1, x2, y2, color=MUTED, sw=2, dash=""):
    return f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{color}" stroke-width="{sw}" stroke-dasharray="{dash}"/>'


def save(name, title, desc, body, height):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc">'
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>'
           f'<g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>')
    p = OUT / name
    p.write_text(svg + "\n", encoding="utf-8")
    root = ET.parse(p).getroot()
    sizes = [float(e.attrib["font-size"]) for e in root.iter() if "font-size" in e.attrib]
    assert sizes and min(sizes) >= 22
    assert root.attrib["width"] == "600"
    print(f"{name}: XML valid; 600px wide; height {height}px; minimum text {min(sizes):g}px")


# 02 — criteria are a logical conjunction, not a headline threshold.
b = t(24, 39, "MOTOR CONTROL · ALL CONDITIONS APPLY", 24, RED, weight="700")
b += t(24, 81, "9A901.a · motor", 27, INK, weight="700")
criteria = [("Rated voltage", "≥ 48 V"), ("Rated power", "≥ 3 kW"), ("Power density", "≥ 3 kW/kg"), ("Rated speed", "≤ 3,000 rpm"), ("Design purpose", "stated drone-propeller use")]
for i, (label, value) in enumerate(criteria):
    y = 103 + i * 48
    b += rect(24, y, 552, 40, "#f4efe6", PAPER)
    b += t(40, y + 27, label, 23)
    b += t(556, y + 27, value, 23, RED, "end", "700")
b += t(300, 363, "AND", 24, RED, "middle", "700")
b += rect(24, 379, 552, 86, "#f4efe6", RED)
b += t(40, 410, "9A901.b · linked ESC", 25, INK, weight="700")
b += t(40, 442, "≥48 V + ≥3 kW + designed for 9A901.a motors", 22, MUTED)
b += t(24, 505, "No separate density or speed test for ESC", 23, GREEN)
b += t(24, 544, "Export permission required · no destination ban named", 22, RED)
save("02-policy-scope.svg", "China motor criteria and linked ESC definition",
     "Diagram of MOFCOM Announcement 49 clauses 9A901.a-b, issued 19 October 2026 and effective 18 November 2026. The motor criteria are conjunctive and include stated drone-propeller design purpose. The linked ESC definition has voltage and power thresholds and design linkage, without separate density or speed thresholds. The announcement requires export permission and names no destination ban. Source: MOFCOM Announcement 49, https://www.mofcom.gov.cn/zcfb/zc/art/2026/art_b2fa4e60bcd24bdf8c658e476b808785.html; evidence ledger E01.", b, 566)

# 04 — intentionally unlike visual conditions, no false performance ranking.
b = t(24, 36, "PUBLISHED RATINGS", 24, RED, weight="700")
b += t(24, 66, "DIFFERENT TEST WINDOWS", 24, RED, weight="700")
b += rect(24, 80, 552, 165, "#f4efe6", PAPER)
b += t(44, 101, "SCORPION · Tribunus III", 26, INK, weight="700")
b += t(44, 143, "220 A · 60 seconds", 27, GREEN)
b += t(44, 181, "35 m/s airflow", 25)
b += t(44, 222, "$499.99 listed · currency unresolved", 22, MUTED)
b += rect(24, 260, 552, 180, "#f4efe6", PAPER)
b += t(44, 296, "APD · UHV guide", 26, INK, weight="700")
b += t(44, 338, "Full throttle · 180 seconds", 25, GREEN)
b += t(44, 376, "10 m/s airflow", 25)
b += t(44, 417, "Different vendor-published condition", 22, MUTED)
b += ln(300, 245, 300, 260, RED, 3)
b += t(24, 483, "Not a matched comparison", 27, RED, weight="700")
b += t(24, 522, "Vendor claims · no independent equivalence shown", 22)
b += t(24, 559, "Sources: Scorpion product page; APD UHV guide", 22, MUTED)
save("04-matched-comparison.svg", "Scorpion and APD published conditions are not matched",
     "Scorpion publishes a 220 A rating conditional on 60 seconds and 35 m/s airflow, and a $499.99 list price with currency unresolved in this research. APD's UHV guide specifies full throttle for 180 seconds at 10 m/s airflow. Conditions and documentation are not matched; this is not comparative proof of achieved performance. Sources: Scorpion Tribunus III product page https://www.scorpionsystem.com/catalog/speed_controllers/tribunus_esc/hv_tribunusIII_series/III_14_220/ and APD UHV documentation https://docs.powerdrives.net/products/uhv; ledger vendor records.", b, 580)

# 07 — separate product origin from item/channel authorization.
b = t(24, 40, "TWO DIFFERENT QUESTIONS", 25, RED, weight="700")
b += rect(24, 73, 250, 156, "#f4efe6", PAPER)
b += t(44, 111, "ORIGIN", 27, INK, weight="700")
b += t(44, 151, "Where was each", 23)
b += t(44, 181, "item produced?", 23)
b += t(44, 215, "Trace every branch", 22, MUTED)
b += rect(326, 73, 250, 156, "#f4efe6", PAPER)
b += t(346, 111, "AUTHORIZATION", 23, INK, weight="700")
b += t(346, 151, "Does this item and", 23)
b += t(346, 181, "channel need it?", 23)
b += t(346, 215, "Actual determination", 22, MUTED)
b += ln(274, 151, 326, 151, RED, 3)
b += t(300, 279, "US FCC", 25, RED, "middle", "700")
b += t(24, 326, "Foreign-production rules are not a blanket import ban.", 22)
b += rect(24, 354, 552, 85, "none", RED)
b += t(44, 386, "Proposed ESC coverage / authorization:", 22, RED, weight="700")
b += t(44, 417, "UNRESOLVED · ESC not expressly named in list", 22)
b += t(24, 482, "Get controlling, item-specific determination first.", 23, GREEN, weight="700")
b += t(24, 523, "No eligibility or legal outcome promised", 23, RED)
b += t(24, 562, "Sources: FCC DA 25-1086; FAQ updated 21 Jul 2026", 22, MUTED)
save("07-eligibility.svg", "Origin evidence and US authorization are separate determinations",
     "Conceptual distinction based on FCC DA 25-1086 and FCC Covered List FAQ updated 21 July 2026. Production location and item/channel authorization are different questions. The proposed ESC is not expressly named in the non-exhaustive critical-component list; whether it is covered or requires authorization is unresolved. The FAQ also has conflicting exemption dates. This graphic makes no legal determination or eligibility promise. Sources: https://docs.fcc.gov/public/attachments/DA-25-1086A1.pdf and https://www.fcc.gov/covered-list-faqs-uas-and-uas-critical-components; evidence ledger E04-E06.", b, 582)

# 10 — buyer categories with controller BOM only in latter potential path.
b = t(24, 41, "TWO BUYER LISTS · TWO DIFFERENT JOBS", 24, RED, weight="700")
b += rect(24, 72, 552, 161, "#f4efe6", PAPER)
b += t(44, 111, "CIVIL FACILITY", 26, INK, weight="700")
b += t(44, 152, "Detection · alert · escalation", 24)
b += t(44, 194, "Observation does not establish intent", 22, MUTED)
b += rect(24, 251, 552, 192, "#f4efe6", RED)
b += t(44, 290, "AUTHORIZED AIRCRAFT INTEGRATOR", 24, INK, weight="700")
b += t(44, 331, "May procure a physical mitigation system", 22)
b += t(44, 372, "Interceptor in system BOM?", 23, GREEN, weight="700")
b += t(44, 414, "Only then: potential ESC demand", 23, GREEN)
b += t(24, 480, "Detection-site counts do not size controller orders.", 22, RED, weight="700")
b += t(24, 520, "Authority depends on actor, system and jurisdiction.", 22)
b += t(24, 560, "Sources: FAA guidance; FBI testimony; 2026 rule", 22, MUTED)
save("10-buyer-paths.svg", "Civil detection buyers differ from authorized aircraft integrators",
     "Civil facilities may buy sensing, alerting and escalation; authorized mitigation integrators may buy physical systems. Only integrators whose selected system includes an interceptor might need an ESC. Detection does not determine intent or grant authority. Authority is actor- and jurisdiction-specific; this diagram is not legal advice. Sources: FAA UAS detection guidance https://www.faa.gov/airports/new_entrants/uas_detection_mitigation_response; FBI testimony 15 April 2026 https://www.fbi.gov/news/speeches-and-testimony/statement-of-special-agent-in-charge-douglas-olson-to-senate-appropriations; Federal Register rule 6 July 2026 https://www.govinfo.gov/content/pkg/FR-2026-07-06/pdf/2026-13609.pdf; ledger E18-E20.", b, 580)

# 11 — alternative routes to solving the buyer problem.
b = t(24, 41, "THE BUYER HAS FOUR ALTERNATIVES", 25, RED, weight="700")
alts = [("Controller incumbents", "Buy an existing qualified part"),
        ("Integrated propulsion", "Buy controller + motor system"),
        ("Assessors", "Qualify incumbent sourcing"),
        ("Domestic capacity", "Source from OEM-backed makers")]
for i, (head, detail) in enumerate(alts):
    y = 67 + i * 101
    b += rect(24, y, 552, 84, "#f4efe6", PAPER)
    b += t(44, y + 34, head, 25, INK, weight="700")
    b += t(44, y + 68, detail, 22, MUTED)
b += t(24, 496, "A new supplier must beat the buyer's best route.", 22, RED, weight="700")
b += t(24, 533, "PDW: up-to $820m conditional commitment; not capacity", 22)
b += t(24, 570, "Sources: company claims · PDW announcement", 22, MUTED)
b += t(24, 608, "Snapshot: 3 Nov 2026", 22, MUTED)
save("11-competition.svg", "Existing alternatives compete with a new component supplier",
     "Competition includes established controller suppliers; integrated propulsion makers; independent assessors that can qualify existing sources; and domestic OEM-backed manufacturing capacity. PDW announced an up-to-US$820 million conditional loan commitment for domestic components, including intended external supply. This is not disbursed funding or operating capacity. Sources: Scorpion and APD offers; Vertiq product https://www.vertiq.co/81-08-g2; DIU assessor page https://www.diu.mil/latest/diu-seeking-recognized-assessors-to-support-blue-uas-ndaa-compliance; PDW announcement https://www.pdw.ai/posts/pdw-receives-conditional-820-million-loan-commitment-from-us-department-of-war-to-power-americas-drone-arsenal; report section 11 and ledger E08-E15.", b, 635)

# 13 — exact base scenario identity; visible components reconcile to result.
b = t(24, 40, "BASE CASE · ONE ACCEPTED ESC", 25, RED, weight="700")
b += t(24, 80, "Invented steady-year planning assumptions · USD", 22, MUTED)
b += rect(24, 100, 552, 75, "#f4efe6", PAPER)
b += t(44, 132, "Price − attempt cost / yield − acceptance", 22)
b += t(44, 163, "− warranty reserve = unit contribution", 22)
b += t(556, 202, "$350 − $190/0.92 − $20 − 2.5%×$350", 22, INK, "end")
b += t(556, 238, "= $114.7283 → $114.73 / accepted unit", 22, GREEN, "end", "700")
b += ln(44, 258, 556, 258, RED, 3)
b += t(44, 296, "5,000 accepted × $114.7283", 23)
b += t(556, 296, "$573,641", 23, INK, "end")
b += t(44, 335, "+ net NRE: 3 × ($75k − $65k)", 23)
b += t(556, 335, "+$30,000", 23, GREEN, "end")
b += t(44, 374, "− fixed $500k − depreciation $60k", 23)
b += t(556, 374, "−$560,000", 23, RED, "end")
b += rect(24, 397, 552, 55, "none", RED)
b += t(44, 433, "Annual contribution after depreciation", 22, INK, weight="700")
b += t(556, 433, "+$43,641", 23, GREEN, "end", "700")
b += t(24, 490, "Without NRE: +$13,641 · not a forecast", 22, RED)
b += t(24, 531, "Inputs all invented · base case · 3 Nov 2026", 22, MUTED)
b += t(24, 568, "Source: scenario-model.json · annual, not first-year cash", 22, MUTED)
save("13-hardware-economics.svg", "Exact base scenario unit and annual contribution arithmetic",
     "Exact arithmetic from scenario-model.json, as of 3 November 2026. One accepted ESC: unit contribution = price $350 - attempt cost $190 divided by yield 0.92 - acceptance cost $20 - warranty fraction 2.5% times price $350 = $114.7282608696, shown rounded to $114.73. At 5,000 accepted units this is $573,641.304; net NRE is 3 projects times ($75,000 fee - $65,000 cost) = $30,000. Annual fixed expense $500,000 plus tooling depreciation $60,000 equals $560,000. Annual contribution after depreciation = $43,641.304. Without NRE: $13,641.304. All inputs are invented scenario assumptions, not estimates, supplier quotes, market prices, or forecasts. Source: research-dossiers/2026-11-03-allied-drone-components/scenario-model.json.", b, 586)

# 14 — display aircraft denominator with deliberately zero ESC-revenue encoding.
b = t(24, 40, "AIRCRAFT SNAPSHOT ≠ COMPONENT REVENUE", 24, RED, weight="700")
b += t(24, 82, "Official leaderboard snapshot · 2 Nov 2026", 23, MUTED)
b += t(24, 139, "30,000", 35, INK, weight="700")
b += t(24, 172, "ordered aircraft", 22)
b += rect(24, 188, 552, 24, "#ddd5c8", PAPER)
b += rect(24, 188, 552, 24, GREEN, GREEN, 4)
b += t(24, 260, "23,840", 35, INK, weight="700")
b += t(24, 293, "accepted aircraft", 22)
b += rect(24, 309, 552, 24, "#ddd5c8", PAPER)
b += rect(24, 309, 438.272, 24, GREEN, GREEN, 4)
b += t(24, 365, "Both bars count aircraft only", 24, GREEN, weight="700")
b += rect(24, 393, 552, 95, "none", RED)
b += t(44, 431, "ESC revenue attributable from this snapshot", 22)
b += t(300, 477, "$0 evidenced", 22, RED, "middle", "700")
b += t(24, 531, "No ESC attach rate, eligibility or startup sales inferred.", 22)
b += t(24, 570, "Source: dronedominance.mil leaderboard · E24", 22, MUTED)
save("14-demand-denominators.svg", "Official aircraft orders and acceptances do not establish ESC sales",
     "Official Gauntlet I leaderboard snapshot displayed as current on 2 November 2026: 30,000 aircraft ordered, of which 23,840 accepted. The chart deliberately shows zero evidenced ESC revenue: the aircraft denominator does not establish ESC attach rate, component eligibility, procurement route, or startup sales. It is not a claim of zero total market revenue. Source: official leaderboard https://dronedominance.mil/leaderboard.html; evidence ledger E24, captured 3 November 2026. Original order rows and bonus fulfillment have distinct status; do not interpret as audited payment ledger.", b, 588)

# 17 — evidence taxonomy, emphasizing what is absent.
b = t(24, 41, "WHAT KIND OF EVIDENCE IS THIS?", 25, RED, weight="700")
rows = [
    ("PRIMARY · published", "Policy, regulator, official programme facts", GREEN),
    ("VENDOR · published claim", "Offer / rating / origin claim; not audited", MUTED),
    ("INFERRED · proposed wedge", "ESC choice; buyer value not established", RED),
    ("INVENTED · scenario", "All financial inputs; no forecast", RED),
    ("MISSING · private evidence", "Quotes · interviews · tests · paid NRE", INK),
]
for i, (head, detail, color) in enumerate(rows):
    y = 66 + i * 89
    b += rect(24, y, 552, 74, "#f4efe6", PAPER)
    b += t(42, y + 30, head, 23, color, weight="700")
    b += t(42, y + 61, detail, 22, MUTED)
b += t(24, 533, "No interviews, quotes, hardware tests or submissions", 22, RED, weight="700")
b += t(24, 573, "Sources: evidence-ledger.md · snapshot 3 Nov 2026", 22, MUTED)
save("17-evidence-types.svg", "Evidence types and missing private validation",
     "Evidence taxonomy for the Fieldbook, cross-checked against evidence-ledger.md and report section 17 as of 3 November 2026. Primary published facts establish what official documents say. Vendor claims establish published offers and claims, not audited provenance, inventory, fulfillment, or comparative value. The proposed ESC wedge is an inference; buyer demand and achievable price remain hypotheses. Financial inputs are invented scenarios. Private evidence remains missing: no interviews, quotations, paid engineering, hardware tests, or regulatory submissions have occurred. Sources: evidence-ledger.md entries E01-E26 and allied-drone-components/index.md section 17.", b, 591)

print("8 replacement SVGs built; no raster or third-party artwork used.")
