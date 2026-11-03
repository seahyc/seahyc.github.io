"""Additional original evidence diagrams for the 3 Nov 2026 visual revision.

All numerical content comes from the existing article and scenario-model.json.
No chart implies observed customers or comparable usage-study denominators.
"""
from pathlib import Path
from html import escape
import json
import math

HERE = Path(__file__).resolve().parent
OUT = HERE.parents[1] / 'static/images/ai-advisory-bookshelf'
MODEL = json.loads((HERE / 'scenario-model.json').read_text())
INK, MUTED, GREEN, RED = '#27231e', '#6d665c', '#597365', '#9d4c3f'

def t(x, y, label, size=24, fill=INK, anchor='start'):
    assert size >= 21
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}">{escape(str(label))}</text>'

def line(x1, y1, x2, y2, color=MUTED):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="2"/>'

def arrow(y):
    return line(300, y, 300, y+22)+line(294, y+16, 300, y+22)+line(306, y+16, 300, y+22)

def box(y, title, subtitle):
    return (f'<rect x="20" y="{y}" width="560" height="88" rx="8" fill="none" stroke="{MUTED}" stroke-width="1.5"/>'
            +t(38,y+33,title,26)+t(38,y+67,subtitle,22,MUTED))

def save(name,title,desc,body,height):
    xml=(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{height}" viewBox="0 0 600 {height}" role="img" aria-labelledby="title desc">'
         f'<title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>'
         f'<g font-family="Arial, Helvetica, sans-serif">{body}</g></svg>')
    (OUT/name).write_text(xml)
    print(f'{name}: generated; 600px wide; min font 21px; transparent canvas')

b=t(20,36,'DIFFERENT QUESTIONS, DIFFERENT BASES',25,RED)
b+=t(20,76,'Anthropic · personal guidance study',24)
b+=box(98,'6% · personal guidance','Base: filtered conversation sample')
b+=box(206,'26% · professional or career matters','Base: personal-guidance conversations')
b+=box(314,'9% · sycophancy','Base: personal-guidance conversations')
b+=t(20,452,'OpenAI / NBER · consumer usage study',24)
b+=box(474,'29% · practical guidance','Base: consumer user messages')
b+=t(20,608,'These are not comparable market shares.',24,RED)
b+=t(20,644,'Studies linked in text · edition 3 Nov 2026',21,MUTED)
save('denominators.svg','Guidance usage has different denominators','Anthropic April 2026 personal-guidance study: approximately 6% of filtered conversations are personal guidance; within personal guidance 26% professional/career and 9% sycophancy. OpenAI/NBER study consumer user-message share: approximately 29% practical guidance, a broader category. These are not comparable market-size estimates. Primary source links are in adjacent article text.',b,674)

b=t(20,36,'A CONNECTOR IS ONLY ONE LINK',26,RED)
b+=box(74,'External collection','Search generated notes linked to sources')+arrow(162)
b+=box(194,'Host AI','Must actually call the search tool')+arrow(282)
b+=box(314,'Proposed evidence check','Open original context; test source support')+arrow(402)
b+=box(434,'Advice in the user’s conversation','Keep source words apart from application')
b+=t(20,568,'Retrieved note ≠ original passage',25,RED)
b+=t(20,605,'Tool access ≠ faithful tool use',25,RED)
b+=t(20,650,'Documented plumbing + proposed checking',21,MUTED)
save('tool-boundary.svg','Where retrieval ends and source checking begins','The Brains README documents generated-note search through MCP, not guaranteed original-passage verification. Readwise MCP documentation describes the bridge to AI clients. Source checking is the proposed product requirement in the existing article; host adoption and faithful use have not been tested. Edition 3 November 2026.',b,680)

b=t(20,36,'A CASE FILE, NOT AN EXPERT SCORE',26,RED)
for i,(a,z) in enumerate([
    ('Dated statement','What was recommended, and when?'),
    ('Dated action','What did the adviser actually do?'),
    ('Contemporaneous explanation','Which constraints or motives are recorded?'),
    ('Observed result','What happened; what else could explain it?'),
    ('Counterexamples and unknowns','Include failures and missing evidence')]):
    y=70+i*109
    b+=box(y,a,z)
    if i<4:b+=arrow(y+88)
b+=t(20,660,'Sequence does not establish causation.',24,RED)
b+=t(20,697,'Proposed evidence specification · 3 Nov 2026',21,MUTED)
save('case-file.svg','A proposed case-file anatomy','Original conceptual diagram of the existing proposed evidence specification in market-evidence.md. Dated statement, action, explanation, result and counterexamples/unknowns do not establish causal expertise. No expert rankings or efficacy claims are made.',b,727)

base=next(c for c in MODEL['cases'] if c['name']=='base')
sens={c['label']:c for c in MODEL['base_sensitivities']}
values=[('Base · cash costs only',base['cash_break_even_payers']),('Base · includes founder time',base['economic_break_even_payers']),('Support time doubles',sens['support doubles']['economic_break_even_payers']),('Monthly churn doubles',sens['churn doubles']['economic_break_even_payers'])]
assert values[0][1]==math.ceil(2000/base['net_per_payer_after_replacement'])
assert values[1][1]==math.ceil(12000/base['net_per_payer_after_replacement'])
b=t(20,36,'PAYERS NEEDED TO BREAK EVEN',27,RED)
b+=t(20,75,'Original scenarios · active paying customers',22,MUTED)
# Labels sit above bars, values beyond bars. A zero-based 0–4000 scale
# leaves space after even the longest bar and never reuses label space.
for i,(label,value) in enumerate(values):
    y=120+i*102
    b+=t(20,y,label,23)
    width=value/4000*460
    b+=f'<rect x="20" y="{y+15}" width="{width}" height="26" fill="{GREEN if i<2 else RED}"/>'
    b+=t(30+width,y+37,f'{value:,}',23)
b+=line(20,535,480,535)
for value in [0,1000,2000,3000,4000]:
    x=20+value/4000*460
    b+=line(x,535,x,542)+t(x,571,f'{value:,}',21,MUTED,'middle')
b+=t(20,614,'First bar excludes founder opportunity cost.',22,MUTED)
b+=t(20,650,'Other bars include it; one input changes at a time.',22,MUTED)
b+=t(20,690,'Scenario model · 3 Nov 2026 · not observed',21,RED)
save('break-even.svg','Founder time and retention change the break-even hurdle','Original scenario-model.json outputs dated 3 November 2026. Base cash break-even 267 payers; including USD10000 monthly founder opportunity cost 1599; doubling support time alone yields 2664; doubling monthly churn alone yields 3551. All commercial inputs are chosen assumptions, not observed unit economics. Shared absolute scale starts at zero.',b,720)

b=t(20,36,'THE DAY-75 DEMAND GATE',27,RED)
b+=t(20,76,'Chosen hurdles · not achieved results',24,MUTED)
b+=box(110,'6 of 12 participants pay US$19','For the first month of the proposed trial')
b+=box(224,'4 renew once','Without bundled consulting')
b+=box(338,'4 return independently','For another decision')
b+=box(452,'Median support ≤4 min / payer / month','Report tail effort and founder time too')
b+=t(20,590,'Pass → another bounded experiment',24,GREEN)
b+=t(20,628,'Fail → archive or keep as an unpaid tool',24,RED)
b+=t(20,673,'Proposed research-map gates · 3 Nov 2026',21,MUTED)
save('renewal-gate.svg','Proposed demand and operating hurdles at day 75','Original proposed gates from research-map.md, not industry benchmarks or completed milestones. Six of twelve participants pay USD19, four renew without consulting, four return for an independent decision; median recurring support at most four minutes per payer-month, reporting tail support and founder time. Passing earns only another bounded test.',b,703)

b=t(20,36,'MAKE THE COMPANY EARN ITS PLACE',26,RED)
for i,(a,z) in enumerate([
    ('No gain over the strongest substitute','Stop the generic bookshelf thesis'),
    ('Fabricated or unsupported attribution','Pause release; repair and re-audit'),
    ('Unresolved source rights','Exclude affected sources'),
    ('Costs consume contribution','Stop paid expansion; narrow the scope')]):
    b+=box(76+i*112,a,z)
b+=t(20,584,'Useful personal tool ≠ proven business',25,GREEN)
b+=t(20,626,'Stop rules proposed before the trial.',23,MUTED)
b+=t(20,665,'Research-map falsifiers · 3 Nov 2026',21,MUTED)
save('falsifiers.svg','Falsification rules for the standalone bookshelf business','Original proposed stop rules from research-map.md. Stop generic thesis without improvement over strongest accessible substitute; pause release for fabricated quotations or unsupported attribution; exclude unclear-rights sources; stop paid expansion if recurring costs and acquisition consume contribution. No trial or commercial validation has occurred.',b,695)
