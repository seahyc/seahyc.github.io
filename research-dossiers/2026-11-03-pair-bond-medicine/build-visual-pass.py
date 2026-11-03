"""Six original claim-specific diagrams; facts remain in the existing report.

Regenerate with python3 research-dossiers/2026-11-03-pair-bond-medicine/build-visual-pass.py.
No third-party artwork; financial examples are scenarios, not observations.
"""
from pathlib import Path
from html import escape

OUT = Path(__file__).resolve().parents[2] / 'static/images/pair-bond-medicine'
INK, MUTED, GREEN, RED = '#27231e', '#6e665a', '#527367', '#9d4c3f'


def text(x, y, value, size=25, color=INK, anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(value)}</text>'


def rule(y):
    return f'<path d="M20,{y}H580" stroke="{MUTED}" stroke-width="1" fill="none"/>'


def rect(x, y, w, h, color=GREEN):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="5" fill="none" stroke="{color}" stroke-width="2"/>'


def save(name, title, desc, body, height):
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><g font-family="Arial,Helvetica,sans-serif">{body}</g></svg>'
    (OUT / f'{name}.svg').write_text(svg)


# Card 01: what an asset transaction is purchasing, not a valuation model.
b = text(20, 34, 'WHAT A PSYCHIATRIC BUYER ACQUIRES', 26)
for i, (a, z) in enumerate([
    ('Defined indication', 'Depression or social anxiety'),
    ('Human development evidence', 'Programme-specific clinical progress'),
    ('Transferable asset rights', 'A drug programme a buyer can own'),
]):
    y = 62 + i * 111
    b += rect(20, y, 560, 89) + text(38, y + 34, a, 27, GREEN) + text(38, y + 67, z, 24)
b += text(20, 429, 'No demonstrated couples treatment follows.', 25, RED)
save('asset-rights', 'The psychiatric asset package', 'Conceptual reading of the Lilly and AbbVie transactions described on card 01; not a model of acquisition probability or service valuation.', b, 454)

# Card 07: direct labels prevent confusion between completed and planned samples.
b = text(20, 34, 'SEPARATE THERAPY FROM DRUG EFFECT', 25)
for y, title, lines, color in [
    (64, 'Conjoint drug pilot', ['6 couples • uncontrolled', 'Drug + therapy + attention together', 'Cannot isolate the added drug effect'], GREEN),
    (234, 'Earlier therapy comparison', ['40 couples • randomized', 'Conjoint PTSD therapy vs waitlist', 'Therapy can contribute to improvement'], GREEN),
    (404, 'Registered conjoint comparison', ['60 individuals planned • open-label', 'Randomized • no results posted', 'Planned sample ≠ completed couples'], RED),
]:
    b += rect(20, y, 560, 149, color) + text(38, y + 34, title, 27, color)
    for j, s in enumerate(lines):
        b += text(38, y + 68 + j * 31, s, 24)
b += text(20, 593, 'Design map • research cutoff: 3 Nov 2026', 23, MUTED)
save('conjoint-comparison', 'Which comparison answers which question?', 'Studies and registry described on card 07. No pooled effect size or cross-trial treatment ranking.', b, 619)

# Card 10: three distinct local pathways, not a permissiveness ranking.
b = text(20, 34, 'LEGAL ACCESS HAS A LOCAL SCOPE', 26)
for y, title, lines in [
    (65, 'United States', ['Approved injection ≠ compounded nasal drug', '503A and 503B have different conditions', 'No pharmacy or formulation cleared here']),
    (233, 'Australia', ['Restricted psychiatrist-led access', 'MDMA: PTSD • psilocybine: TRD', 'Protocol and product-specific permissions']),
    (401, 'Singapore', ['Prescription obstetric oxytocin injection', 'MDMA controlled • separate trial review', 'Exact exemptions unverified here']),
]:
    b += rule(y - 13) + text(20, y + 23, title, 28, GREEN)
    for j, s in enumerate(lines):
        b += text(20, y + 61 + j * 32, s, 24)
b += text(20, 588, 'No general bonding-drug permission follows.', 25, RED)
save('local-access', 'Access is specific to jurisdiction and product', 'Summary of the FDA, TGA, Singapore NDF, CNB and HSA sources cited on card 10; not a compliance clearance.', b, 615)

# Card 11: two endpoints from one trial, deliberately not a causal flow.
b = text(20, 34, 'BETTER FUNCTIONING ≠ FEWER BREAKUPS', 25)
b += text(20, 75, '742 low-income couples • six months', 25, MUTED)
b += rule(99)
b += text(20, 143, 'Relationship functioning', 28, GREEN)
b += text(20, 181, 'Improved in the randomized study', 25)
b += rule(217)
b += text(20, 264, 'Breakup frequency', 28, RED)
b += text(20, 302, 'No significant reduction reported', 25)
b += rule(340)
b += text(20, 383, 'Different endpoints. Both matter.', 27)
b += text(20, 421, 'Doss et al. • abstract-level evidence', 23, MUTED)
b += text(20, 455, 'Does not validate the proposed service.', 24, RED)
save('endpoint-split', 'Useful benefit and staying together differ', 'The single study described on card 11 reports relationship functioning and breakup frequency separately. No effect magnitude reconstructed.', b, 482)

# Card 13: zero-baseline dollars; enrolments remain a separate metric.
b = text(20, 34, 'LEARNING VOLUME IS NOT BREAK-EVEN', 25)
b += text(20, 72, 'Original USD scenarios • 3 Nov 2026', 24, MUTED)
b += text(20, 120, '100 paid enrolments: contribution', 26, GREEN)
b += f'<rect x="20" y="140" width="{540 * 12905 / 300000:.3f}" height="30" fill="{GREEN}"/>'
b += text(20, 205, '$12,905 before fixed costs', 25, GREEN)
b += text(20, 260, 'Assumed annual fixed costs', 26)
b += f'<rect x="20" y="280" width="540" height="30" fill="{MUTED}"/>'
b += text(20, 345, '$300,000 per year', 25)
b += text(20, 386, 'Bars start at $0 • same dollar scale', 23, MUTED)
b += rule(413)
b += text(20, 454, 'Base annual break-even: 2,325 enrolments', 26)
b += text(20, 490, 'At $129.05 contribution per enrolment', 24)
b += text(20, 535, 'Drug development is outside this model.', 24, RED)
save('pilot-scale', 'The pilot contribution and annual cost base', 'Original scenarios on cards 12 and 13. The pilot contribution is not revenue or funding; bars compare dollar magnitudes, not matched annual cohorts.', b, 562)

# Card 19: an equation ledger, not three comparable investment returns.
b = text(20, 34, 'THREE DIFFERENT KINDS OF PROCEEDS', 25)
for y, title, lines in [
    (68, 'Funded compensation', ['$9,000 quarter draw from the cash cap', 'Planned pay • not business profit']),
    (212, 'Hypothetical operating surplus', ['3,000 paid annual enrolments', '$387,150 contribution − $300,000 fixed', '= $87,150 before tax and other exclusions']),
    (390, 'Arbitrary equity-exit illustration', ['30% × $50 million = $15 million gross', 'Before preferences, tax and costs', 'No valuation or probability is asserted']),
]:
    b += rule(y - 17) + text(20, y + 20, title, 27, GREEN)
    for j, s in enumerate(lines):
        b += text(20, y + 59 + j * 33, s, 24)
b += text(20, 586, 'Scenarios • not three comparable returns', 24, RED)
save('founder-proceeds', 'Compensation, operating surplus and exit proceeds', 'Original scenarios from card 19; annual operating surplus is not automatically distributed as a dividend. No acquisition multiple is inferred.', b, 615)

print('Wrote 6 original SVGs: asset-rights, conjoint-comparison, local-access, endpoint-split, pilot-scale, founder-proceeds')
print('Canvas 600px wide; minimum text 23px; no opaque background')
