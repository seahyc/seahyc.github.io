# Evidence ledger (re-verified 2026-11-21 unless noted)
| Claim | Status | Source | Proves / does not prove | Decision impact |
|---|---|---|---|---|
| Beeper Desktop API has REST, SDKs (TS, Go, Python, PHP), MCP; local, app must run; send-volume suspension warning; WebSocket experimental | verified | developers.beeper.com/desktop-api/ | Incumbent already serves agents; not usage | Rules out clone framing |
| MCP: Streamable HTTP localhost:23373, OAuth or bearer token, read-only token restricts to search/read tools, advises approval prompts | verified | developers.beeper.com/desktop-api/mcp | Scoped read exists; no recipient/hash/approval layer described | Narrows gap |
| beeper/cli MIT, JSON/NDJSON, signed webhooks, --read-only, installable headless server; 66 stars | verified | github.com/beeper/cli | Headless exists, maturity unknown | Rules out "no headless" claim in part; source note called it immature (issues not re-read) |
| bridge-manager Apache-2.0, official bridges listed, ~1.4k stars | verified | github.com/beeper/bridge-manager | Bridges self-hostable | Bridge moat claim |
| wacli MIT, ~2.9k stars, local SQLite, read-only mode | verified | github.com/openclaw/wacli | Strong single-network block | Stage 0 building block |
| Agent Messenger MIT, 258 stars, 12 apps, user mode "message as you" | verified | github.com/agent-messenger/agent-messenger | Direct competitor on user identity | Competition |
| Pantalk MIT, 212 stars, bot identity | verified | github.com/pantalk/pantalk | Crowded bot layer | Competition |
| a2a-gateway Apache-2.0, 13 stars | verified | github.com/eliasecchig/a2a-gateway | Adjacent | Minor |
| Chatwoot MIT, ~40.3k stars | verified | github.com/chatwoot/chatwoot | Different buyer | Minor |
| Unipile $55 flat up to 10 accounts, $5.50 each 11-50 | verified | unipile.com/pricing-api/ | Some pay for maintained connections | Pricing anchor |
| Beeper Plus $9.99/month | verified | beeper.com/pricing | Consumer anchor | Pricing |
| Beeper free = 5 accounts (1 per network) | verified by Gate 1 reviewer on help.beeper.com FAQ (pricing page does not state it) | help.beeper.com/en_US/beeper-plus/beeper-plus-and-beeper-plus-plus-faqs | | Low impact |
| Desktop API suspension warning | verified on developers.beeper.com/desktop-api/ (NOT on the MCP page; card 04 corrected) | | | |
| Five X posts (views, content) | not re-verified; relied on dated captures in source raw/ | raw/*.md | Interest and friction in a tiny sample | Demand is weak evidence |
| $15-30 prosumer, $99-299 team pricing | assumption from source insights.md | | none | Test, not forecast |
| Beeper app/cloud closed or open | not established | | | |

Gate 1 reviewer: X posts returned HTTP 402 to automated fetch; remain unverified captures. CLI README contains no 'immature' language; page does not call it immature.
