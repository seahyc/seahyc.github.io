# Evidence ledger — Switchboard agent channels

Source evidence ids E01–E22 are from the source folder's evidence.csv. Re-verification status is from reverification.md (2026-11-21). "Verified" means re-read on that date; "notes only" means I rely on the dated notes.

| # | Claim | Status | Source | Quality | Proves | Does not prove | Counterevidence | Decision impact |
|---|---|---|---|---|---|---|---|---|
| E01 | Cody offered $5K bounty + first recurring-customer commitment (2026-05-30) | notes only (X 402) | https://x.com/codyschneider/status/2060433376545546335 | primary, unverified now | one buyer's stated intent | repeatable demand; that the bounty is still open | none found | Core of the demand signal; weak because single |
| E02 | Brief rejects scripts/self-hosting; vendor owns sender, throttling, recovery | notes only (Notion blank) | Notion URL in index.md | primary, unverified now | what is purchased = operational ownership | other buyers share it | YC's own open-source preference | Defines wedge |
| E03 | Meta Send API needs user-initiated conversation | verified | developers.facebook.com Instagram messaging API doc | primary | official API cannot cold-DM | that unofficial access is allowed or safe | none | Structural opening and risk |
| E04 | Most LinkedIn permissions need approval | verified (messaging not named on page) | learn.microsoft.com getting-access | primary | gated access | that messaging is specifically blocked | none | Defer LinkedIn |
| E05 | Unipile covers 4 channels, reverse-engineered | verified (Telegram official per page) | unipile.com/pricing-api | primary | horizontal competitor | its Instagram reliability | none | Transport is not the moat |
| E06 | Unipile $55 min, $5.50/acct 11–50 | verified | same | primary | pricing | — | — | Price context |
| E07 | Salesrobot browser-cloud disconnects → bans/churn | notes only | x.com/saguppa/status/2072674164033601715 | single anecdote | session reliability affects support/retention | Instagram failure rates | — | Fulfilment is top risk |
| E08 | Dev says 50 Unipile accts = $275 | arithmetic verified | x.com/anujcodes_21/... | anecdote | per-account pricing pain | market-wide pain | — | Minor |
| E09 | DMnode launched 3 days after Cody | notes only (dates arithmetic: 30 May→2 Jun) | x.com/happywp/status/2061806544497356877 | primary, unverified now | surface copyable | DMnode traction (74 views observed) | — | No moat in API shape |
| E10 | DMnode $50/$500; terms disclaim delivery | verified | dmnode.com, /terms | primary | direct entrant, no guarantee | its reliability | — | Direct competitor |
| E11 | HeyReach $79/sender, $999 25 senders | verified | heyreach.io/pricing | primary | managed-sender price anchor | Instagram applicability | — | Price anchor |
| E12 | IGdm $8.99 (3), $19.99 unlimited | verified | igdm.me | primary | cheap local alternative | — | — | Price floor |
| E13 | Modash $299–599 monthly | partial: annual $199/$499 shown | modash.io/pricing | primary | adjacent spend | exact monthly rates | — | Used annual figure in book |
| E14 | Switchboard has IG start-chat, MCP, people graph | notes only (repo) | local repo | first-party | assets | campaign-scale reliability | — | Pilot, not platform |
| E15–E22 | Marketplace listings (appointment bot, UGC campaign $30–50/hr, assistant $5–6/hr, anti-bot listings, Freelancer, PeoplePerHour) | notes only | URLs in evidence.csv | perishable snapshots | labour funded; automation both wanted and banned | market size | E18, E19 explicit bans | Human-approved framing |

## Derived numbers (mine)
- $5/hr×30h×4.33 = $650; $6 → $779 (rounded $780). Excludes management.
- Price per sender: IGdm 8.99/3=2.997; DMnode Growth 500/25=20; Starter 50; HeyReach 79; Switchboard 499/1 (strategy: one active sender per workspace).

## Provider disagreement / reconciliation
See source-reconciliation.md.
