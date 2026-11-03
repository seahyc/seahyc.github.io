#!/usr/bin/env python3
"""Build six explanatory Power for AI SVG diagrams (stdlib only)."""
from pathlib import Path
import html

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "static/images/power-for-ai"
INK, BLUE, TEAL, GOLD, RED, MUTED = "#17324d", "#176b87", "#168777", "#bd7911", "#a73a3a", "#536777"

def esc(v): return html.escape(str(v), quote=True)
def text(x, y, value, color=INK, size=22, weight=400, anchor="middle"):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}">{esc(value)}</text>'
def box(y, title, detail, color=BLUE):
    return (f'<rect x="28" y="{y}" width="544" height="74" rx="12" fill="none" stroke="{color}" stroke-width="3"/>'
            + text(300,y+31,title,color,23,700) + text(300,y+59,detail,MUTED,21))
def make(title, body, footer, desc):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-labelledby="title desc">
<title id="title">{esc(title)}</title><desc id="desc">{esc(desc)}</desc>
<g font-family="Arial, Helvetica, sans-serif"><text x="28" y="42" font-size="26" font-weight="700" fill="{INK}">{esc(title)}</text>{body}
<text x="28" y="584" font-size="21" fill="{MUTED}">{esc(footer)}</text></g></svg>'''
def save(name, content):
    (OUT/name).write_text(content+"\n")
    print(f"wrote {OUT/name}")

def queue():
    body = box(83,"2000–2020 generation capacity requested","Historical cohort · reported by end of 2025",BLUE)
    body += box(182,"13% operating","Reported outcome",TEAL)
    body += box(281,"75% withdrawn","Reported outcome",GOLD)
    body += box(380,"Remaining outcomes","Not classified in this summary",MUTED)
    body += text(300,494,"Not an AI-load queue or project success probability.",RED,21,700)
    return make("A queue is a request",body,"Source: LBNL, Queued Up 2026 · cohort through 2025.","Outcomes for the historical generation-capacity cohort requested 2000 to 2020. Other outcomes are not classified here.")

def project():
    rows=[("Test authorisation","Permission to conduct a defined test"),("Fueled operation","Operation evidence"),("Sustained heat","Thermal output evidence"),("Net electricity","Measured export evidence"),("Site permissions","Project-specific approvals"),("Customer contract","Commercial commitment"),("Delivery","Electricity delivered")]
    body=''
    for i,(a,b) in enumerate(rows):
        y=75+i*65
        body+=f'<rect x="28" y="{y}" width="544" height="56" rx="9" fill="none" stroke="{[BLUE,TEAL,BLUE,TEAL,GOLD,BLUE,TEAL][i]}" stroke-width="2.5"/>'
        body+=text(44,y+24,a,INK,21,700,"start")+text(556,y+45,b,MUTED,21,400,"end")
    return make("Keep project evidence in separate fields",body,"Source: Power for AI · evidence cutoff 3 Nov 2026.","A project record contains distinct evidence fields. No combined or inferred progress status is assigned.")

def smr():
    body=box(104,"Design approval","Evidence about a design",BLUE)
    body+=text(300,216,"≠",RED,30,700)
    body+=box(248,"Project permissions","Evidence for a specific site",GOLD)
    body+=text(300,360,"≠",RED,30,700)
    body+=box(392,"Delivery","Evidence of dependable electricity",TEAL)
    body+=text(300,505,"Each answers a different customer question.",MUTED,21,700)
    return make("SMR evidence has separate boundaries",body,"Source: company disclosures · reviewed 3 Nov 2026.","Design approval, site-specific permissions and delivered dependable power are distinct evidence categories.")

def cost():
    body=box(92,"Illustration includes","Capital · fuel · operations · model assumptions",BLUE)
    body+=box(202,"Partial cost output","Scenario arithmetic, not a full firm-power cost",TEAL)
    body+=text(300,325,"Boundary",RED,22,700)
    body+=box(352,"Excluded reliability costs","Redundancy · storage · firm pipeline",GOLD)
    body+=box(452,"Excluded site costs","Gas lateral · land · interconnection · tariff",GOLD)
    return make("A partial cost is not a delivered tariff",body,"Source: original model · 3 Nov 2026.","Conceptual boundary between included model components and excluded reliability and site costs. No new figures.")

def bear():
    body=box(91,"Manufacturers expand","Equipment scarcity may ease",BLUE)
    body+=box(198,"Utility processes improve","Project handling may get better",TEAL)
    body+=box(305,"Customers standardise","Fewer bespoke workflows",GOLD)
    body+=box(412,"Incumbent EPCs deliver","Existing capability may be enough",MUTED)
    body+=text(300,532,"Startup value must survive all four changes.",RED,21,700)
    return make("The bear case tests durable value",body,"Source: Power for AI · author’s bear case, 3 Nov 2026.","Four plausible changes that could weaken a startup thesis and the need for durable customer value.")

def model():
    body=box(100,"Original assumptions","Fees · hours · costs · volume · overhead",BLUE)
    body+=text(300,228,"↓",MUTED,28,700)
    body+=box(258,"Calculated outputs","Contribution · annual residual · sensitivities",TEAL)
    body+=text(300,386,"≠",RED,30,700)
    body+=box(414,"Unverified real-world inputs","Customer demand · delivery effort · reliability",GOLD)
    body+=text(300,526,"Arithmetic is not validation.",RED,21,700)
    return make("Model outputs stop at the evidence boundary",body,"Source: original model · assumptions dated 3 Nov 2026.","Original assumptions generate calculated outputs, but customer and operating inputs remain unverified.")

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    for name,fn in [("queue-outcomes.svg",queue),("project-record.svg",project),("smr-boundaries.svg",smr),("cost-boundary.svg",cost),("bear-case.svg",bear),("model-boundary.svg",model)]: save(name,fn())
if __name__=="__main__": main()
