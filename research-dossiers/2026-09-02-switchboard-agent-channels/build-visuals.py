#!/usr/bin/env python3
"""Original SVG diagrams/charts for the switchboard-agent-channels fieldbook. Usage: build-visuals.py <outdir>"""
import sys
from xml.sax.saxutils import escape
OUT = sys.argv[1]
INK, MUT, RED, GRN, BLU, PAP = '#27231e', '#6b6157', '#9d4c3f', '#5d7a52', '#4f7391', '#f3eadb'
SERIF, SANS = 'Georgia,Times,serif', 'Arial,Helvetica,sans-serif'

def svg(name, h, body, title):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 {h}" width="600" height="{h}" role="img" aria-label="{escape(title)}"><title>{escape(title)}</title>{body}</svg>'
    open(f'{OUT}/{name}.svg', 'w').write(s)
K = 1.22  # phone legibility: text renders at ~0.58x at 390px
def T(x, y, s, size=18, fill=INK, anchor='start', weight='normal', font=SERIF):
    return f'<text x="{x}" y="{y}" font-family="{font}" font-size="{round(size*K,1)}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{escape(s)}</text>'
def box(x, y, w, h, lines, stroke=INK, fill='none', size=18, anchor='middle', dash=None, weight='normal', color=INK):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    o = f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}" stroke-width="2"{d}/>'
    lh = size + 6; top = y + (h - lh*len(lines))/2 + size*0.82
    tx = x + w/2 if anchor == 'middle' else x + 14
    for i, l in enumerate(lines): o += T(tx, round(top + i*lh), l, size, color, anchor, weight)
    return o
def arrow(x1, y1, x2, y2, c=INK):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{c}" stroke-width="2.5"/><polygon points="{x2},{y2} {x2-6},{y2-11} {x2+6},{y2-11}" fill="{c}"/>' if x1 == x2 else ''

# 01 brief anatomy (vertical pipeline)
b = T(300, 28, "What the buyer's brief asks the vendor to own", 20, anchor='middle', weight='bold')
rows = [("You submit", ["Vetted creator profiles,", "a message, campaign settings"], '#e8dcc6'),
        ("Vendor owns", ["Sender setup, pacing, health,", "recovery, deduplication, upkeep"], '#e9c9bf'),
        ("Target ends as", ["sent, failed, skipped or replied"], '#dbe6d2'),
        ("You receive", ["Reply and status events by API,", "webhook, export or inbox"], '#d3e0ea')]
y = 50
for lab, ls, f in rows:
    b += T(24, y+34, lab, 16, MUT, font=SANS, weight='bold') + box(210, y, 366, 74, ls, fill=f)
    if y < 300: b += arrow(393, y+74, 393, y+96)
    y += 96
b += box(24, 446, 552, 62, ["Not accepted: a one-off script, a repo, a browser bot", "the buyer has to run and maintain"], stroke=RED, color=RED, dash='6 4')
b += T(300, 536, "Source: buyer's public post and linked brief (paraphrased), 30 May 2026.", 15, MUT, 'middle')
svg('brief-anatomy', 556, b, "The buyer's brief as a pipeline: submit a list, vendor owns sending and recovery, targets end in states, replies return by webhook. One-off scripts are rejected.")

# 03 assets vs gaps
b = T(300, 28, "Switchboard: plumbing yes, operations no", 20, anchor='middle', weight='bold')
b += T(150, 66, "Already built", 18, GRN, 'middle', 'bold') + T(450, 66, "Still missing", 18, RED, 'middle', 'bold')
have = ["Instagram chat by handle", "Profile, stories, feed context", "Event log + search", "MCP tools for agents", "People graph across channels", "Proxy fails closed"]
miss = ["Multi-tenant workspaces", "Campaign + target state", "Dedup + suppression", "Sender pacing + health", "Hosted session + proxy fleet", "Reply webhooks, billing", "Relationship-aware voice"]
for i, t in enumerate(have): b += box(14, 82+i*50, 276, 42, [t], stroke=GRN, fill='#dbe6d2', size=17)
for i, t in enumerate(miss): b += box(310, 82+i*50, 276, 42, [t], stroke=RED, fill='#efd7cf', size=17)
b += T(300, 462, "From local repository inspection recorded in the research notes;", 15, MUT, 'middle') + T(300, 488, "I did not re-inspect the code.", 15, MUT, 'middle')
svg('assets-and-gaps', 496, b, "Two columns: six Switchboard capabilities that exist and seven product and operations pieces still missing.")

# 05 entry price chart
data = [("IGdm Pro, 3 accounts", 8.99, 0), ("DMnode Starter", 50, 0), ("Unipile, 10 accounts", 55, 0), ("HeyReach, 1 sender", 79, 0),
        ("Modash Essentials", 199, 0), ("Switchboard idea", 499, 1), ("DMnode Growth", 500, 0), ("HeyReach Agency", 999, 0)]
b = T(300, 26, "Entry monthly list price, USD, as published", 20, anchor='middle', weight='bold')
x0, sc = 232, 0.30; y = 52
for n, v, hyp in data:
    wbar = max(3, v*sc)
    b += T(222, y+20, n, 16, INK, 'end', font=SANS)
    fill = 'none' if hyp else BLU
    b += f'<rect x="{x0}" y="{y+4}" width="{wbar:.1f}" height="24" fill="{fill}" stroke="{RED if hyp else BLU}" stroke-width="2"' + (' stroke-dasharray="5 3"' if hyp else '') + '/>'
    lab = f"${v:,.2f}" if v < 10 else f"${v:,.0f}"
    b += T(x0+wbar+8, y+22, lab, 16, INK, font=SANS)
    y += 42
b += f'<line x1="{x0}" y1="46" x2="{x0}" y2="{y}" stroke="{INK}" stroke-width="1.5"/>'
b += T(300, y+24, "Bars start at $0. Units differ: seats, accounts, senders, workspaces.", 15, MUT, 'middle')
b += T(300, y+50, "Modash is the annual-billing rate. Dashed bar is my untested hypothesis.", 15, MUT, 'middle')
b += T(300, y+76, "Pages read 21 Nov 2026; prices change.", 15, MUT, 'middle')
svg('entry-prices', y+92, b, "Bar chart of published entry monthly prices from 8.99 dollars for IGdm Pro up to 999 dollars for HeyReach Agency, with an untested 499 dollar Switchboard hypothesis dashed.")

# 07 two markets
b = T(300, 28, "Two different markets in the marketplace scan", 20, anchor='middle', weight='bold')
b += box(14, 48, 276, 36, ["Automation builds"], fill='#d3e0ea', size=17, weight='bold')
b += box(310, 48, 276, 36, ["Relationship labour"], fill='#e9c9bf', size=17, weight='bold')
L = ["Buyers accept software", "Want: resumable chats,", "deterministic actions,", "CRM state, upkeep", "Budgets seen: $250 to", "$1,200 fixed, hourly", "Easiest near-term revenue"]
R = ["Buyers pay humans", "Want: research, follow-up,", "memory, a natural voice", "Some ban bots outright", "Budgets seen: $5 to $6/hr", "up to $1,500 fixed", "Validates tone, not autosend"]
for i, t in enumerate(L): b += T(30, 116+i*28, t, 17)
for i, t in enumerate(R): b += T(326, 116+i*28, t, 17)
b += T(300, 340, "Monthly cost of one outreach assistant, 30 h/week, USD", 17, anchor='middle', weight='bold')
sx = lambda v: 60 + v*(480/1000)
b += f'<rect x="{sx(0)}" y="356" width="{sx(499)-sx(0):.0f}" height="26" fill="none" stroke="{RED}" stroke-width="2" stroke-dasharray="5 3"/>'
b += T(sx(0)+6, 375, "$499 idea", 16, RED, font=SANS)
b += f'<rect x="{sx(0)}" y="394" width="{sx(650)-sx(0):.0f}" height="26" fill="{BLU}" opacity=".35"/><rect x="{sx(650)}" y="394" width="{sx(779)-sx(650):.0f}" height="26" fill="{BLU}"/>'
b += T(sx(779)+8, 414, "$650 to $780", 16, INK, font=SANS)
b += T(66, 444, "Assistant: $5 to $6/hr x 30 h x 4.33 weeks.", 15, MUT, font=SANS) + T(66, 468, "Excludes management time.", 15, MUT, font=SANS)
b += f'<line x1="{sx(0)}" y1="350" x2="{sx(0)}" y2="424" stroke="{INK}" stroke-width="1.5"/>'
b += T(300, 498, "Scan of live listings, 3 Sep 2026; counts are", 15, MUT, 'middle') + T(300, 522, "contaminated, scopes are the signal.", 15, MUT, 'middle')
svg('two-markets', 540, b, "Two columns contrasting automation-build buyers and creator-relationship labour buyers, plus a bar comparing a 499 dollar managed price idea to 650 to 780 dollars of monthly assistant labour.")

# 08 tone formula
b = T(300, 28, "A message is built from five inputs", 20, anchor='middle', weight='bold')
ins = ["Relationship with this person", "Sender persona", "Channel norms", "Campaign goal", "Recent profile evidence"]
for i, t in enumerate(ins): b += box(14, 50+i*52, 300, 42, [t], fill='#e8dcc6', size=17) + f'<line x1="314" y1="{71+i*52}" x2="388" y2="{71+i*52}" stroke="{INK}" stroke-width="1.5"/>'
b += f'<line x1="388" y1="71" x2="388" y2="279" stroke="{INK}" stroke-width="1.5"/><line x1="388" y1="175" x2="408" y2="175" stroke="{INK}" stroke-width="2.5"/><polygon points="420,175 407,168 407,182" fill="{INK}"/>'
b += box(420, 140, 166, 70, ["One message,", "human-approved"], fill='#dbe6d2', size=17)
b += box(14, 330, 572, 96, ["Counter-signal: some creator-relationship buyers", "ban AI-heavy messaging or any software.", "So: assistive memory plus human approval first."], stroke=RED, color=RED, size=17, dash='6 4')
b += T(300, 462, "Formula from the strategy notes; uplift is untested.", 15, MUT, 'middle')
svg('tone-inputs', 478, b, "Five inputs combine into one human-approved message. A counter-signal box notes buyers who ban AI messaging.")

# 10 timeline
b = T(300, 28, "Proposed first 90 days (week 0 to 13)", 20, anchor='middle', weight='bold')
wx = lambda w: 24 + w*(552/13)
items = [("Package the offer, shortlist 10 prospects", 0, 2, BLU), ("Marketplace probes, 3 tailored bids", 1, 5, BLU), ("Thin campaign layer on the connector", 2, 7, GRN), ("Live pilot, 14-day window", 7, 11, '#c58a2b'), ("Read results, decide", 11, 13, RED)]
y = 52
for t, a, z, c in items:
    b += T(24, y+16, t, 16, INK, font=SANS)
    b += f'<rect x="{wx(a):.0f}" y="{y+24}" width="{wx(z)-wx(a):.0f}" height="20" rx="4" fill="{c}"/>'
    y += 68
for w in (0, 4, 8, 13): b += T(wx(w), y+8, f"W{w}", 15, MUT, 'middle', font=SANS)
b += f'<line x1="24" y1="{y-14}" x2="576" y2="{y-14}" stroke="{INK}" stroke-width="1.5"/>'
b += T(300, y+34, "Only the 14-day window and the one-build-cycle cap come from the notes.", 15, MUT, 'middle') + T(300, y+62, "Week placements are my assumptions.", 15, MUT, 'middle')
svg('first-90-days', y+76, b, "Gantt-style timeline across 13 weeks: packaging, marketplace probes, building a campaign layer, a 14-day live pilot, then a decision.")

# 11 funnel
b = T(300, 28, "Demand test thresholds, set before running", 20, anchor='middle', weight='bold')
fun = [("Prospects approached", 10, "10"), ("Qualified replies", 3, "3 or more"), ("Agree to connect a real sender", 2, "2 or more"), ("Accept paid-pilot terms", 1, "1 or more")]
y = 54; x0 = 24; sc = 40
for n, v, lab in fun:
    b += T(24, y+16, n, 16, INK, font=SANS) + f'<rect x="{x0}" y="{y+30}" width="{v*sc}" height="26" fill="{BLU}"/>' + T(x0+v*sc+10, y+50, lab, 17, INK, font=SANS)
    b += f'<line x1="{x0}" y1="{y+30}" x2="{x0}" y2="{y+56}" stroke="{INK}" stroke-width="1.5"/>'
    y += 76
b += box(24, y+6, 552, 74, ["Fail if fewer than 2 teams will connect a sender,", "or everyone asks only for source code."], stroke=RED, color=RED, dash='6 4')
b += T(300, y+110, "Bars start at zero. Thresholds are the research notes' gate MIH-01.", 15, MUT, 'middle')
svg('demand-funnel', y+124, b, "Funnel bars: 10 prospects, at least 3 qualified replies, at least 2 agree to connect a sender, at least 1 accepts paid terms.")

# 12 per-sender price
data = [("IGdm Standard", 3.00, 0), ("DMnode Growth", 20, 0), ("DMnode Starter", 50, 0), ("HeyReach Growth", 79, 0), ("Switchboard idea", 499, 1)]
b = T(300, 26, "Price per sender per month, USD (derived)", 20, anchor='middle', weight='bold')
x0, sc = 200, 0.60; y = 52
for n, v, hyp in data:
    wbar = max(3, v*sc)
    b += T(190, y+20, n, 16, INK, 'end', font=SANS)
    b += f'<rect x="{x0}" y="{y+4}" width="{wbar:.1f}" height="24" fill="{"none" if hyp else BLU}" stroke="{RED if hyp else BLU}" stroke-width="2"' + (' stroke-dasharray="5 3"' if hyp else '') + '/>'
    b += T(x0+wbar+8, y+22, f"${v:,.2f}" if v < 10 else f"${v:,.0f}", 16, INK, font=SANS)
    y += 42
b += f'<line x1="{x0}" y1="46" x2="{x0}" y2="{y}" stroke="{INK}" stroke-width="1.5"/>'
for i, t in enumerate(["Plan price divided by senders: $8.99 / 3, $500 / 25.", "DMnode lists self-serve sending; mine is concierge", "and human-approved. That is the claim to test.", "Bars start at $0."]):
    b += T(300, y+26+i*26, t, 15, MUT, 'middle')
svg('price-per-sender', y+130, b, "Bar chart of derived monthly price per sender: IGdm 3 dollars, DMnode Growth 20, DMnode Starter 50, HeyReach 79, and an untested Switchboard idea at 499.")

# 13 gates ladder
b = T(300, 28, "Four gates, each with a number set in advance", 20, anchor='middle', weight='bold')
g = [("Offer", "MIH-01", "3 replies, 2 connect, 1 accepts"), ("Fulfilment", "MIH-02", "90% of 50 targets reach a valid end state"), ("Voice", "MIH-03", "fewer edits, more positive replies"), ("Pay", "MIH-04", "1 customer pays the next month")]
for i, (n, code, rule) in enumerate(g):
    x = 14 + i*30; y = 50 + i*100
    b += box(x, y, 560-i*30, 80, [f"{n}  ({code})", rule], fill=['#dbe6d2', '#e8dcc6', '#d3e0ea', '#efd7cf'][i], size=17, anchor='start', stroke=INK)
b += box(14, 460, 572, 76, ["Kill: only a repo wanted, no real account connected,", "or no one pays after a good campaign."], stroke=RED, color=RED, dash='6 4', size=17)
b += T(300, 566, "From the research notes' experiment table; the voice test is small-sample.", 15, MUT, 'middle')
svg('stage-gates-diagram', 580, b, "Four sequential gates with pre-set thresholds and a kill condition.")
