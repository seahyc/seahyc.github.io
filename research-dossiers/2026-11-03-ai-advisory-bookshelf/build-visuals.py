"""Build original, transparent 600px evidence diagrams for this Fieldbook only."""
from pathlib import Path
from html import escape
from decimal import Decimal, ROUND_HALF_UP
import json
import xml.etree.ElementTree as ET

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / 'static/images/ai-advisory-bookshelf'
OUT.mkdir(parents=True, exist_ok=True)
MODEL = json.loads((HERE / 'scenario-model.json').read_text())
INK, MUTED, GREEN, RED = '#27231e', '#6d665c', '#597365', '#9d4c3f'
NS = '{http://www.w3.org/2000/svg}'

def text(x, y, value, size=24, fill=INK, anchor='start'):
    assert size >= 21
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}">{escape(value)}</text>'

def line(x1, y1, x2, y2, color=MUTED, width=2):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="{width}"/>'

def row(y, title, subtitle):
    return (f'<rect x="20" y="{y}" width="560" height="86" rx="8" fill="none" stroke="{MUTED}" stroke-width="1.5"/>'
            + text(40, y+33, title, 27) + text(40, y+66, subtitle, 23, MUTED))

def save(name, title, desc, body, height):
    xml = (f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc">'
           f'<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>'
           f'<g font-family="Arial, Helvetica, sans-serif">{body}</g></svg>')
    (OUT / name).write_text(xml)

b = text(20, 36, 'FROM A SOURCE TO A REVIEWABLE CHOICE', 25, RED)
steps = [('Find the original', 'Source, date and passage locator'),
         ('Check the surrounding context', 'Separate quotation from interpretation'),
         ('Compare the conditions', 'When would a contrary view be right?'),
         ('Record the choice', 'Assumptions, expected result, review date'),
         ('Return to the outcome', 'What happened? What is still unknown?')]
for i, (title, sub) in enumerate(steps):
    y = 66+i*112
    b += row(y, title, sub)
    if i < len(steps)-1:
        b += line(300, y+86, 300, y+108) + line(294, y+102, 300, y+108) + line(306, y+102, 300, y+108)
b += text(20, 646, 'Proposed workflow · not a measured result', 22, MUTED)
save('mechanism.svg', 'A proposed cited decision workflow', 'Five steps: original source, context check, conditional comparison, decision record and outcome review. Conceptual design, not product efficacy evidence.', b, 676)

b = text(20, 36, 'THE SHELF ALREADY HAS NEIGHBOURS', 26, RED)
for i, (title, sub) in enumerate([
    ('Google Expert Intelligence', 'Purchased-book context in Gemini Notebook'),
    ('Readwise MCP', 'Saved highlights and Reader documents'),
    ('Delphi', 'People-based replicas and comparisons'),
    ('The Brains', 'Public-source notes through MCP')]):
    b += row(68+i*110, title, sub)
b += text(20, 548, 'Documented offerings · efficacy not tested', 22, MUTED)
b += text(20, 582, 'Primary sources in adjacent text · 3 Nov 2026', 22, MUTED)
save('competition.svg', 'Existing suppliers occupy the bookshelf layers', 'Qualitative comparison of documented product scope, not a ranking. Google purchased books, Readwise saved reading, Delphi replicas and comparison, and The Brains public-source notes. Checked 3 November 2026.', b, 610)

b = text(20, 36, 'WHAT REMAINS AFTER REPLACING CHURN?', 25, RED)
b += text(20, 73, 'USD per active payer per month', 24)
b += text(20, 106, 'Chosen scenarios · before fixed costs', 23, MUTED)
# Domain [-20, 25], includes true zero. All bars share one linear scale.
x0, x1, y0, y1 = 72, 552, 156, 390
scale = lambda v: x0+(v+20)/45*(x1-x0)
zero = scale(0)
b += line(zero, y0-8, zero, y1+8, INK, 2)
for i, case in enumerate(MODEL['cases']):
    value = case['net_per_payer_after_replacement']
    price = case['price_monthly']
    payment = MODEL['payment_fee_fraction']*price+MODEL['payment_fee_fixed_per_monthly_charge']
    contribution = price-payment-case['variable_service_cost']-case['rights_reserve']-case['support_minutes']/60*MODEL['support_hourly_cost']
    net = contribution-case['monthly_logo_churn']*(case['acquisition_cash']+case['onboarding_minutes']/60*MODEL['support_hourly_cost'])
    assert abs(net-value) < 1e-9
    rounded = Decimal(str(value)).quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    # JSON floats near half-cent are normalised to exact intended three-decimal arithmetic.
    rounded = Decimal(f'{value:.3f}').quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)
    y = 170+i*78
    b += text(20, y-10, case['name'].title(), 24)
    left, right = sorted([zero, scale(value)])
    b += f'<rect x="{left:.3f}" y="{y}" width="{right-left:.3f}" height="28" fill="{RED if value<0 else GREEN}"/>'
    b += text(570, y+23, f'{rounded:+}', 24, INK, 'end') if value < 0 else text(scale(value), y+59, f'+{rounded}', 24, INK, 'middle')
b += line(x0, 430, x1, 430)
for value in [-20,-10,0,10,20]:
    x = scale(value)
    b += line(x, 430, x, 438) + text(x, 467, str(value), 22, MUTED, 'middle')
b += text(20, 511, 'After fees, service, rights reserve, support', 22, MUTED)
b += text(20, 543, 'and churn × acquisition/onboarding costs.', 22, MUTED)
b += text(20, 582, 'Source: original scenario model · 3 Nov 2026', 22, MUTED)
b += text(20, 614, 'Inputs unvalidated; reserves are not licences.', 22, RED)
save('economics.svg', 'Monthly contribution after replacing churned payers', 'Zero-based linear axis from minus 20 to plus 25 USD per active payer-month. Low minus 15.445; base 7.505; high 21.505. Display rounded to cents. Original chosen scenarios, not forecasts. Excludes fixed cash costs and founder opportunity cost.', b, 642)

b = text(20, 36, 'EARN EACH NEXT STAGE', 27, RED)
for i, (title, sub) in enumerate([
    ('Months 0–3 · compare and charge', 'Test against the strongest accessible substitute'),
    ('Months 3–6 · observe renewal', 'One decision type; audit source context'),
    ('Months 6–12 · build case records', 'Include failures, missing facts and real costs'),
    ('Months 12–24 · expand conditionally', 'Only with repeat paid demand and contribution')]):
    y = 68+i*112
    b += row(y, title, sub)
    if i < 3:
        b += line(300, y+86, 300, y+110)
b += text(20, 554, 'Failed gate → narrow, archive or stop.', 24, RED)
b += text(20, 589, 'Proposed calendar · no forecast of success', 22, MUTED)
save('roadmap.svg', 'A conditional path from side project to stronger evidence', 'Proposed 0 to 24 month stages with stop gates. Comparison, renewal, case records and expansion only after repeat paid demand and positive contribution. No outcomes have been collected.', b, 620)

for name in ['mechanism.svg','competition.svg','economics.svg','roadmap.svg']:
    tree = ET.parse(OUT/name)
    root = tree.getroot()
    assert root.attrib['width'] == '600'
    texts = list(root.iter(NS+'text'))
    assert min(float(t.attrib['font-size']) for t in texts) >= 21
    assert all(0 <= float(t.attrib['x']) <= 600 and 0 <= float(t.attrib['y']) <= float(root.attrib['height']) for t in texts)
    assert not any(r.attrib.get('x','0') == '0' and r.attrib.get('y','0') == '0' and r.attrib.get('width') == '600' for r in root.iter(NS+'rect'))
    print(f'{name}: XML valid; width 600; min font {min(float(t.attrib["font-size"]) for t in texts):g}px; transparent canvas; text anchors in bounds')
for case in MODEL['cases']:
    print(f'{case["name"]}: net after replacement {case["net_per_payer_after_replacement"]:.3f} USD/payer-month; independently recomputed')
