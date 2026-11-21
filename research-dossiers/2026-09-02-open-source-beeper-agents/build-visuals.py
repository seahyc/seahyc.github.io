#!/usr/bin/env python3
"""Generates the SVG diagrams for the open-source-beeper-agents fieldbook. Run from anywhere."""
import textwrap, os
from xml.sax.saxutils import escape
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'static', 'images', 'open-source-beeper-agents')
os.makedirs(OUT, exist_ok=True)
INK, MUTE, LINE, FILL, ACC, WARN = '#2b2a28', '#6b665e', '#bdb6a8', '#f3eee3', '#2f6f5e', '#a8442f'
W = 360
CPL = 6.6  # px per char at 12.5px

def wrap(t, width_px, fs=12.5):
    return textwrap.wrap(t, max(8, int(width_px / (CPL * fs / 12.5))))

class Svg:
    def __init__(s): s.p = []; s.y = 0
    def text(s, x, y, t, fs=12.5, w=400, fill=INK, anchor='start', bold=False):
        lines = wrap(t, w, fs)
        for i, l in enumerate(lines):
            s.p.append(f'<text x="{x}" y="{y+i*(fs+3)}" font-size="{fs}" fill="{fill}" text-anchor="{anchor}" font-family="Georgia,serif"{" font-weight=\"700\"" if bold else ""}>{escape(l)}</text>')
        return len(lines) * (fs + 3)
    def box(s, x, y, w, title, body='', fill=FILL, stroke=LINE, tc=INK):
        h0 = s.text(x+12, y+22, title, 14, w-24, tc, bold=True) if title else 0
        hb = s.text(x+12, y+22+h0+2, body, 12.5, w-24, MUTE) if body else 0
        h = 22 + h0 + (hb + 2 if body else 0) + 12
        s.p.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="{fill}" stroke="{stroke}"/>')
        # redraw text above rect
        s.p.insert(len(s.p)-1, '') ; s.p.append(s.p.pop(len(s.p)-2)) if False else None
        return h
    def save(s, name, alt_h):
        body = ''.join(s.p)
        open(os.path.join(OUT, name), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {alt_h}" width="{W}" height="{alt_h}"><rect width="{W}" height="{alt_h}" fill="none"/>{body}</svg>')

def card(rects):
    """rects: list of (x,y,w,title,body,fill,stroke,tc) rows -> returns svg parts with rect drawn before text"""
    pass

def stack(name, items, title=None, arrows=False):
    """vertical list of boxes; draws rect first then text"""
    parts = []; y = 10
    if title:
        for tl_ in wrap(title, W-20, 14):
            parts.append(f'<text x="10" y="{y+14}" font-size="14" font-weight="700" fill="{INK}" font-family="Georgia,serif">{escape(tl_)}</text>'); y += 17
        y += 13
    for it in items:
        t, b = it[0], it[1]; fill = it[2] if len(it) > 2 else FILL; stroke = it[3] if len(it) > 3 else LINE
        tl = wrap(t, W-44-20, 14); bl = wrap(b, W-44-20) if b else []
        h = 16 + len(tl)*17 + (len(bl)*15.5+4 if bl else 0) + 10
        parts.append(f'<rect x="10" y="{y}" width="{W-20}" height="{h:.0f}" rx="8" fill="{fill}" stroke="{stroke}"/>')
        ty = y + 22
        for l in tl: parts.append(f'<text x="22" y="{ty}" font-size="14" font-weight="700" fill="{INK}" font-family="Georgia,serif">{escape(l)}</text>'); ty += 17
        for l in bl: parts.append(f'<text x="22" y="{ty}" font-size="12.5" fill="{MUTE}" font-family="Georgia,serif">{escape(l)}</text>'); ty += 15.5
        y += h + (14 if arrows else 8)
        if arrows: parts.append(f'<text x="{W/2}" y="{y-3}" font-size="14" fill="{MUTE}" text-anchor="middle" font-family="Georgia,serif">&#8595;</text>')
    H = int(y + 4)
    open(os.path.join(OUT, name), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{"".join(parts)}</svg>')

def bars(name, title, rows, unit, note, fmt=lambda v: f'{v:,}', color=ACC):
    """horizontal bars; label above each bar, value to the right of label line, so nothing collides"""
    parts = []; y = 22
    for tl_ in wrap(title, W-20, 14):
        parts.append(f'<text x="10" y="{y}" font-size="14" font-weight="700" fill="{INK}" font-family="Georgia,serif">{escape(tl_)}</text>'); y += 17
    y += 5; mx = max(r[1] for r in rows); bw = W - 20
    for lab, v, *c in rows:
        col = c[0] if c else color
        ll = wrap(lab, W-20-80)
        for i, l in enumerate(ll):
            parts.append(f'<text x="10" y="{y+i*15}" font-size="12.5" fill="{INK}" font-family="Georgia,serif">{escape(l)}</text>')
        parts.append(f'<text x="{W-10}" y="{y}" font-size="12.5" fill="{MUTE}" text-anchor="end" font-family="Georgia,serif">{escape(fmt(v)+" "+unit)}</text>')
        by = y + (len(ll)-1)*15 + 6
        parts.append(f'<rect x="10" y="{by}" width="{max(3, bw*v/mx):.0f}" height="12" rx="3" fill="{col}"/>')
        y = by + 12 + 22
    for l in wrap(note, W-20, 12):
        parts.append(f'<text x="10" y="{y}" font-size="12" fill="{MUTE}" font-family="Georgia,serif">{escape(l)}</text>'); y += 15
    H = int(y + 6)
    open(os.path.join(OUT, name), 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">{"".join(parts)}</svg>')

G = '#e4efe9'; R = '#f4e1da'
stack('cover.svg', [
 ('Who talks to the agent?', 'Bot-style tools: a person messages a bot identity. Crowded: Pantalk, A2A Gateway, OpenClaw channels.'),
 ('Who does the agent talk as?', 'User-identity tools: the agent reads and sends as you across WhatsApp, Telegram, Slack. Beeper and Agent Messenger already live here.', G, ACC),
 ('The thin layer underneath', 'Scoped access, recipient resolution, draft/approve/send, delivery proof. This is the bet, and it is a hypothesis.', R, WARN)], 'The question and where the gap might be', arrows=True)
stack('what-exists.svg', [
 ('Bridges, mostly open', 'bridge-manager (Apache-2.0) runs official bridges for Telegram, WhatsApp, Signal, Discord, Slack, Meta, LinkedIn, iMessage and more on your machine.'),
 ('Desktop API: REST, SDKs, MCP', 'Search, read, send, draft and control the client. Local, needs Beeper Desktop running. TypeScript, Go, Python, PHP SDKs.'),
 ('CLI (MIT): built for agents', 'JSON output, NDJSON event stream, signed webhooks, a --read-only mode, and an installable headless Beeper Server.'),
 ('Unknown: is the Beeper app and cloud open?', 'This edition did not establish whether the desktop UI or Beeper cloud is open source. Not verified either way.', R, WARN)], 'What Beeper already gives agents (checked 2026-11-21)')
bars('demand-signals.svg', 'Five X posts: reach is small, specificity is high', [
 ('swyx, Sep 2025: agentic notification manager', 7181), ('AlexReibman, Dec 2025: sublet workflow via MCP', 7230),
 ('giacomozucco, Jul 2026: self-host for E2EE', 1343), ('hudzah, Aug 2026: OAuth drops every other day', 540),
 ('batuhan, Aug 2025: queries need missing metadata', 410)], 'views',
 'Views as captured 2026-09-02 from a logged-in X session in the source folder; not re-verified by this edition. Five posts show interest, not a market size.')
bars('competitor-stars.svg', 'GitHub stars of adjacent projects', [
 ('Chatwoot (support inbox, different buyer)', 40300, WARN), ('wacli (WhatsApp only)', 2900), ('bridge-manager (Beeper)', 1400),
 ('Agent Messenger (user-identity, 12 apps)', 258), ('Pantalk (bot identity, 13 apps)', 212), ('beeper/cli (agents, MIT)', 66), ('a2a-gateway', 13)], 'stars',
 'Read from each repository page on 2026-11-21 (approximate). Stars measure attention, not paying users. Chatwoot is a different product and buyer.')
stack('bot-vs-user.svg', [
 ('Bot identity', 'Agent has its own account. People message it. Low blast radius; a wrong reply embarrasses the bot. Examples: Pantalk, A2A Gateway (default mode).'),
 ('User identity', 'Agent holds your sessions and writes as you. High value: it sees your real threads. High risk: a wrong send is you saying it. Examples: Beeper MCP, Agent Messenger user mode.', R, WARN),
 ('Docs already warn', 'Beeper: sending too many messages can lead to account suspension by the networks, and its MCP advises keeping approval prompts on for write tools.')], 'Two meanings of "agent messaging"')
stack('contract.svg', [
 ('1  Ingest and normalize', 'Keep the raw provider payload beside the normalized message.'),
 ('2  Scope and search', 'Read-only by default; separate grants for history, contacts, drafts, sends.'),
 ('3  Draft', 'The agent proposes text. Nothing leaves yet.'),
 ('4  Resolve recipient', 'Ambiguity is an error shown to the human, never an LLM guess.', R, WARN),
 ('5  Approve and send', 'Approval binds to a content hash, recipient and network.'),
 ('6  Verify', 'Check delivery state, reconcile when upstream disagrees, log it.', G, ACC)], 'Proposed contract (design hypothesis)', arrows=True)
stack('price-anchors.svg', [
 ('Beeper: free for 5 accounts, Plus $9.99/month', 'Plus allows 10 accounts, 3 per network (beeper.com/pricing; free tier from help.beeper.com FAQ). The consumer anchor is low.'),
 ('Unipile: $55/month flat for up to 10 linked accounts', 'Then $5.50 each for 11 to 50, falling to $3.50 above 5,000. Proves some teams pay for maintained connections.'),
 ('Proposed here: $15 to $30 prosumer, $99 to $299 team', 'The source note\'s guess. No buyer has been asked.', R, WARN)], 'Price anchors (checked 2026-11-21)')
stack('bear-case.svg', [
 ('Beeper ships the safety features', 'Scoped tokens and read-only already exist. Approval and recipient rules are an incremental step for them.', R, WARN),
 ('Unofficial protocols break and ban', 'WhatsApp, LinkedIn and Instagram bridges are reverse-engineered; upkeep never ends.', R, WARN),
 ('Open core, thin moat', 'Anyone can fork; compatibility data and signed releases must compound.', R, WARN),
 ('Self-hosters pay little and ask a lot', 'Beeper is free for 5 accounts; the willingness to pay for self-hosting is unproven.', R, WARN)], 'The strongest reasons to stop')
stack('stages.svg', [
 ('Stage 0, weeks 0 to 2: wrap, do not build', 'Beeper Desktop API plus wacli behind one read-only search. No new bridges.'),
 ('Stage 1, weeks 3 to 8: ten heavy users, read-only', 'Identity resolution and follow-up extraction. Measure weekly use.'),
 ('Stage 2, months 3 to 5: approval-bound sends for five users', 'Draft, resolve, approve, verify.'),
 ('Stage 3, months 6 to 12: paid layer', 'Signed releases, hosted encrypted relay, team policy and audit.', G, ACC)], 'A staged sequence, each gated', arrows=True)
stack('first-90.svg', [
 ('Days 1 to 14', 'Founder builds the read-only wrapper. Budget: founder time plus under $500 of tooling. Evidence: it answers three real "last conversation with X" queries.'),
 ('Days 15 to 45', 'Recruit ten users from Beeper and agent communities. Evidence: ten signed-up local installs and a weekly use log.'),
 ('Days 46 to 75', 'Add recipient resolution and commitment follow-ups. Evidence: count of cross-network matches and identity collisions.'),
 ('Days 76 to 90', 'Review the gate. Five weekly users who want to keep it, or stop.', G, ACC)], 'First 90 days (proposed)', arrows=True)
stack('team-capital.svg', [
 ('Team', 'Founder-engineer first. Add a security engineer before any hosted relay stores message content; a bridge maintainer who has shipped mautrix-style bridges is the key hire.'),
 ('Capital', 'Self-fund or a small angel round for Stages 0 to 2; no hosted infrastructure cost until Stage 3. Revenue from the $15 to $30 tier is untested.'),
 ('Legal and ethics', 'Sending as a person via unofficial protocols risks account bans and platform terms disputes; message data raises privacy duties. Get counsel before hosting.', R, WARN),
 ('How the founder gets paid', 'Salary from revenue after Stage 3; before that, nothing. No exit evidence exists in these sources.')], 'Team, capital, legal, payout (assumptions)')
stack('gates.svg', [
 ('Go at day 90', 'At least 5 of 10 users rely on it weekly, cross-network context changed a real decision, and users ask to keep it.', G, ACC),
 ('Stop at day 90', 'Only enthusiasm is for a nicer inbox, or Beeper MCP already satisfies the workflow.', R, WARN),
 ('Go to sends', 'Zero unresolved identity collisions across two weeks of read-only use, then 5 users with approval-bound sends.'),
 ('Falsifier', 'If auth failures like the OAuth drops hudzah reports occur more than weekly on your own runtime, durability is the product and you are not there.')], 'Gates set before building (numbers from the source note)')
print('ok')
