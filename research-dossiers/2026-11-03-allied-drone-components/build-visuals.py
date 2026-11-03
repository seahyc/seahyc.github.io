"""Build original, transparent Fieldbook diagrams. Standard library only."""
from pathlib import Path
from html import escape
import json
import xml.etree.ElementTree as ET

DOSSIER = Path(__file__).resolve().parent
ROOT = DOSSIER.parents[1]
OUT = ROOT / "static/images/allied-drone-components"
OUT.mkdir(parents=True, exist_ok=True)
INK = "#27231e"
RED = "#9d4c3f"
GREEN = "#566e5e"
MUTED = "#665f52"


def text(x, y, label, size=24, color=INK, anchor="start"):
    return (f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" '
            f'text-anchor="{anchor}">{escape(label)}</text>')


def line(x1, y1, x2, y2, color=MUTED, dash=""):
    return (f'<path d="M{x1},{y1} L{x2},{y2}" fill="none" stroke="{color}" '
            f'stroke-width="2" stroke-dasharray="{dash}"/>')


def arrow(y):
    return line(300, y, 300, y + 24) + '<path d="M294,' + str(y + 17) + ' l6,7 l6,-7" fill="none" stroke="' + MUTED + '" stroke-width="2"/>'


def box(y, title, detail, color=MUTED):
    return (f'<rect x="24" y="{y}" width="552" height="92" rx="8" fill="none" '
            f'stroke="{color}" stroke-width="2"/>' +
            text(300, y + 35, title, 28, INK, "middle") +
            text(300, y + 70, detail, 23, MUTED, "middle"))


def save(name, title, description, body, height):
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" '
           f'viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc">'
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(description)}</desc>'
           f'<g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>')
    path = OUT / name
    path.write_text(svg + "\n")
    root = ET.parse(path).getroot()
    sizes = [float(e.attrib["font-size"]) for e in root.iter() if "font-size" in e.attrib]
    assert min(sizes) >= 21
    assert not any(e.tag.endswith("rect") and e.attrib.get("width") == "600" for e in root.iter())
    print(f"{name}: XML valid; 600px canvas; minimum text {min(sizes):g}px; transparent canvas")


body = text(24, 40, "WHERE ELECTRICITY BECOMES THRUST", 27, RED)
rows = [
    ("Battery", "Stored energy → electrical input"),
    ("Electronic speed controller", "Switches power into timed currents"),
    ("Motor", "Electrical input → shaft work"),
    ("Propeller", "Shaft work → thrust"),
]
for i, (title, detail) in enumerate(rows):
    y = 74 + i * 122
    body += box(y, title, detail)
    if i < len(rows) - 1:
        body += arrow(y + 93)
body += text(24, 594, "Heat and losses occur along the chain.", 24)
body += text(24, 631, "A peak rating is not continuous capability.", 24, RED)
body += text(24, 674, "Original engineering synthesis · 3 Nov 2026", 22, MUTED)
body += text(24, 708, "Conditions to specify: cooling, load, duty cycle.", 22, MUTED)
save("power-chain.svg", "Power conversion and the ESC boundary",
     "Conceptual engineering synthesis, not a tested design. Battery energy is switched by the ESC into motor currents, shaft work and propeller thrust. Heat, cooling and duty cycle constrain useful continuous operation. Source: research-map.md and ledger E09–E12, 3 November 2026.", body, 736)

body = text(24, 40, "COUNTER-DRONE IS A CHAIN", 29, RED)
rows = [
    ("Detect", "Observe a possible aircraft"),
    ("Track", "Associate observations over time"),
    ("Identify", "Assess what the object could be"),
    ("Decide", "Apply lawful authority and judgement"),
    ("Defeat", "Only an authorized actor may act"),
]
for i, (title, detail) in enumerate(rows):
    y = 75 + i * 122
    body += box(y, title, detail, RED if i >= 3 else MUTED)
    if i < len(rows) - 1:
        body += arrow(y + 93)
body += text(24, 721, "Detection does not establish hostile intent.", 24, RED)
body += text(24, 762, "Sensing itself can have legal constraints.", 23)
body += text(24, 805, "Conceptual workflow · 3 Nov 2026", 22, MUTED)
body += text(24, 839, "Sources: FAA guidance; FBI testimony; E18–E20", 22, MUTED)
save("counter-drone.svg", "Sensing, judgement and authorized effect",
     "Conceptual chain: detect, track, identify, decide, defeat. Detection-site buyers and authorized mitigation integrators are distinct. No range, accuracy or success-rate claims. Sources: FAA airport UAS guidance, FBI April 2026 testimony and ACMA guidance, ledger E18–E20.", body, 867)

model = json.loads((DOSSIER / "scenario-model.json").read_text())
body = text(24, 40, "DO REPEAT RELEASES PAY THE COMPANY?", 26, RED)
body += text(24, 80, "USD per steady year · invented scenarios", 24)
body += text(24, 115, "After fixed costs, NRE and tooling depreciation", 22, MUTED)
zero = 180
scale = 0.00033
for i, case in enumerate(model["cases"]):
    value = case["results"]["annual_contribution_after_depreciation"]
    y = 170 + i * 115
    body += text(24, y, f'{case["name"].title()}: {value:+,.0f}', 27)
    end = zero + value * scale
    body += f'<rect x="{min(zero,end):.3f}" y="{y+20}" width="{abs(end-zero):.3f}" height="34" fill="{RED if value < 0 else GREEN}"/>'
body += line(zero, 182, zero, 466, INK)
body += line(24, 475, 576, 475)
for value, label in [(-400000, "−400k"), (0, "0"), (1000000, "+1m")]:
    x = zero + value * scale
    body += line(x, 475, x, 484)
    body += text(x, 516, label, 22, MUTED, "middle")
body += text(24, 565, "Each case changes price, volume and costs.", 23)
body += text(24, 603, "These are outcomes, not confidence bounds.", 23, RED)
body += text(24, 649, "Source: scenario-model.json · 3 Nov 2026", 22, MUTED)
body += text(24, 684, "No quoted prices, measured yields or forecast.", 22, MUTED)
save("economics.svg", "Annual company contribution in three invented scenarios",
     "Zero-referenced comparison in US dollars per steady year after fixed cost, net customer engineering and tooling depreciation. Low minus 431,000, base plus 43,641, high plus 1,077,440. Inputs are invented planning assumptions; these cases are not statistical bounds or forecasts. Source: scenario-model.json, 3 November 2026.", body, 712)

body = text(24, 40, "RENT CAPACITY. EARN THE NEXT RELEASE.", 26, RED)
rows = [
    ("Months 0–3 · paid discovery", "Matched incumbent quotes + paid scope"),
    ("Months 3–6 · qualification lot", "Buyer-defined tests + traceable revision"),
    ("Months 6–12 · repeat releases", "Accepted units + returns + collected cash"),
    ("Months 12–24 · second buyer", "Reuse the product; fund any new scope"),
]
for i, (title, detail) in enumerate(rows):
    y = 75 + i * 122
    body += box(y, title, detail)
    if i < len(rows) - 1:
        body += arrow(y + 93)
body += text(24, 597, "Advance only when the previous gate passes.", 23, RED)
body += text(24, 642, "Proposed sequence, not procurement timing.", 23)
body += text(24, 687, "Source: research-map.md · 3 Nov 2026", 22, MUTED)
save("roadmap.svg", "A conditional twelve to twenty-four month company plan",
     "Proposed founder plan, not forecast. Compare incumbent quotes and collect paid qualification scope, deliver a buyer-defined lot, earn repeat accepted releases and collected cash, then prove transferability to another buyer. Source: research-map.md, 3 November 2026.", body, 715)

print("4 original SVGs built; no raster or third-party artwork used.")
