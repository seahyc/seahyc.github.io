#!/usr/bin/env python3
"""Build five phone-legible, source-labelled Power for AI diagrams (stdlib only)."""
from pathlib import Path
import json
import html

ROOT = Path(__file__).resolve().parents[2]
DOSSIER = ROOT / "research-dossiers/2026-11-03-power-for-ai"
OUT = ROOT / "static/images/power-for-ai"
MODEL = json.loads((DOSSIER / "scenario-model.json").read_text())

INK = "#17324d"
BLUE = "#176b87"
TEAL = "#168777"
GOLD = "#bd7911"
RED = "#a73a3a"
MUTED = "#536777"
RULE = "#9aabb4"

def esc(s):
    return html.escape(str(s), quote=True)

def svg(title, body, footer, desc=""):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" role="img" aria-labelledby="title desc">
<title id="title">{esc(title)}</title><desc id="desc">{esc(desc or title)}</desc>
<g font-family="Arial, Helvetica, sans-serif" fill="{INK}">
<text x="24" y="40" font-size="26" font-weight="700" text-anchor="start">{esc(title)}</text>
{body}
<text x="24" y="590" font-size="21" fill="{MUTED}" text-anchor="start">{esc(footer)}</text>
</g></svg>'''

def text(x,y,s,size=22,fill=INK,weight="400",anchor="middle"):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" font-weight="{weight}" text-anchor="{anchor}">{esc(s)}</text>'

def box(x,y,w,h,label,sub,color=BLUE):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="none" stroke="{color}" stroke-width="3"/>'
            + text(x+w/2,y+31,label,22,color,"700") + text(x+w/2,y+59,sub,21,MUTED))

def line(x1,y1,x2,y2,color=RULE,width=3,arrow=False,dash=""):
    marker=' marker-end="url(#arrow)"' if arrow else ''
    ds=f' stroke-dasharray="{dash}"' if dash else ''
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{width}"{marker}{ds}/>'

def save(name, content):
    (OUT / name).write_text(content + "\n")

def power_chain():
    b=''
    rows=[('Source → electricity','Fuel or heat; conversion; net output'),('Grid → service','Network capacity; studies; firm terms'),('Equipment → site','Transformer; switchgear; commissioning'),('Electricity → computing','Reliable supply for the required load')]
    for i,(a,z) in enumerate(rows):
        y=85+i*108
        b+=box(24,y,552,82,a,z,TEAL if i==3 else BLUE)
        if i<3:b+=line(300,y+83,300,y+105)
    b+=text(300,540,'Every dependency must be ready.',23,RED,'700')
    return svg('AI power is a chain of gates',b,'Original conceptual synthesis · 3 Nov 2026.')

def equipment():
    b=''
    b+=text(300,84,"Different equipment, different evidence",22,MUTED)
    # Separate cards deliberately use no shared time axis.
    b+=f'<rect x="24" y="108" width="552" height="136" rx="12" fill="none" stroke="{BLUE}" stroke-width="3"/>'
    b+=text(44,139,"DOE · distribution transformers",22,BLUE,"700","start")
    b+=text(44,183,"2019   3–6 months",24,INK,"700","start")
    b+=text(44,219,"2023   12–30 months",24,INK,"700","start")
    b+=f'<rect x="24" y="270" width="552" height="136" rx="12" fill="none" stroke="{GOLD}" stroke-width="3"/>'
    b+=text(44,301,"Wood Mackenzie · public 2025 webinar",22,GOLD,"700","start")
    b+=text(44,348,"Large / GSU power transformer",23,INK,"700","start")
    b+=text(44,382,"2–3 years · provider estimate",23,INK,"700","start")
    b+=text(300,450,"Not a current quote; not SKU-specific.",22,RED,"700")
    b+=text(300,490,"Availability was described as improving.",21)
    b+=text(300,526,"Use site-specific vendor and utility dates.",21)
    return svg("Transformer lead times differ",b,"Sources: DOE (2019/2023); WoodMac (2025).", "DOE historical distribution transformer data and separate Wood Mackenzie large transformer provider estimate.")

def nuclear():
    b=''
    stages=[("Zero-power","criticality"),("Sustained","heat"),("Net electricity","metered"),("Site permissions","specific"),("Repeat dependable","delivery")]
    ys=[105,190,275,360,445]
    for i,(a,c) in enumerate(stages):
        b+=box(126,ys[i],348,72,a,c,TEAL if i==0 else BLUE)
        if i<4: b+=line(300,ys[i]+73,300,ys[i+1]-5,RULE,2,False,"5 6")
    b+=text(300,550,"Evidence gates, not a regulatory sequence.",21,RED,"700")
    return svg("Criticality is an early gate",b,"Basis: DOE test milestones · as of 3 Nov 2026.","Conceptual chain from zero-power criticality to repeat dependable site delivery; intermediate gates need not occur in this strict order.")

def economics():
    cases=MODEL["cases"]
    vals=[int(c["annual_residual_usd"]) for c in cases]
    # Fixed zero-based scale: -450k to +1.15m maps to y=420..145.
    top,bottom=140,420
    y=lambda v: bottom-(v+450000)/(1600000)*(bottom-top)
    b=line(70,y(0),550,y(0),INK,2)
    b+=text(52,y(0)+7,"$0",21,INK,"700","end")
    colors=[RED,BLUE,TEAL]
    for i,(c,v,col) in enumerate(zip(cases,vals,colors)):
        x=130+i*155; yy=y(v); h=abs(y(0)-yy)
        b+=f'<rect x="{x}" y="{min(yy,y(0))}" width="78" height="{max(3,h)}" fill="{col}" opacity="0.88"/>'
        label = f'{v:+,}'.replace('-', '−')
        b+=text(x+39 if v>=0 else x-16,yy-10 if v>=0 else yy+7,label,21,col,"700","middle" if v>=0 else "end")
        b+=text(x+39,458,c["name"].upper(),21,INK,"700")
    b+=text(300,493,"Annual residual · overhead: $300,000/year",21,INK,"700")
    b+=text(300,522,"Assumed completed packages/year: 6 / 12 / 20",21)
    b+=text(300,548,"and $300k overhead; all inputs are invented.",21,RED,"700")
    return svg("Scenario residuals are not forecasts",b,"Original scenarios · USD/year · 3 Nov 2026.","Bar chart uses a zero line and scenario annual residuals of negative 384000, positive 123000, and positive 1100000 dollars.")

def roadmap():
    b=''
    phases=[("0–3 months","Paid validation","Audit histories; compare tools;","sell bounded pilots"),
            ("3–6 months","Repeat delivery","Collect fees; measure hours;","keep the same scope"),
            ("6–12 months","Automate repeats","Reconcile shared evidence;","integrate existing tools"),
            ("12–24 months","Expand one path","New region or onsite module;","revalidate requirements")]
    for i,(period,title,l1,l2) in enumerate(phases):
        y=86+i*112; color=[BLUE,TEAL,GOLD,INK][i]
        b+=f'<rect x="24" y="{y}" width="552" height="94" rx="12" fill="none" stroke="{color}" stroke-width="3"/>'
        b+=text(42,y+31,period,22,color,"700","start")
        b+=text(205,y+31,title,22,INK,"700","start")
        b+=text(205,y+59,l1,21,MUTED,"400","start")
        b+=text(205,y+84,l2,21,MUTED,"400","start")
    b+=text(300,548,"Proposed evidence gates; conditional on validation.",21,RED,"700")
    return svg("Readiness service: prove it in steps",b,"Original proposed plan · 3 Nov 2026.","Proposed 0 to 24 month evidence gates for validating a readiness service, not an established plan or forecast.")

def deals():
    b=''
    rows=[('Existing plant offtake','Preserve supply; check additionality'),('Restart / uprate','Recover or add output; prove completion'),('New reactor development','Build plant; secure fuel; deliver power')]
    for i,(a,z) in enumerate(rows):
        b+=box(24,110+i*125,552,90,a,z,[BLUE,GOLD,TEAL][i])
    b+=text(300,530,'A contract category is not proof of delivery.',23,RED,'700')
    return svg('Read the deal before counting MW',b,'Sources: Meta; Constellation; Kairos · 2026.', 'Original classification of nuclear procurement announcements, not a quantitative chart.')

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, fn in [("power-chain.svg",power_chain),("equipment.svg",equipment),
                     ("nuclear-gates.svg",nuclear),("economics.svg",economics),
                     ("roadmap.svg",roadmap),("deal-map.svg",deals)]:
        save(name,fn())
        print(f"wrote {OUT / name}")

if __name__ == "__main__":
    main()
