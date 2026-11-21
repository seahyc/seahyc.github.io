# Switchboard: agent-operated social channels

Research date: 2026-09-02

## Question

Should Switchboard expand from WhatsApp into Instagram and LinkedIn as infrastructure that lets customers' agents operate real messaging identities?

## Verdict

**Conditional pass for an Instagram creator-outreach pilot. Do not build the broad multichannel platform or a LinkedIn connector yet.**

Switchboard already contains much of the difficult single-user Instagram data plane: authenticated Meta messaging, cold conversation start by handle, profile/content context, an append-only event log, MCP tools, and a cross-channel people graph. The missing product is a managed campaign runtime: sender health, conservative pacing, deduplication, suppression, reply routing, campaign state, hosted session/proxy operations, and a relationship-aware voice layer.

The best beachhead is UGC-heavy B2C teams and growth-agent builders recruiting creators over Instagram. WhatsApp is the handoff/conversion channel. LinkedIn is a later channel or an initial third-party adapter, only after customers demonstrate a cross-channel workflow.

## Primary sources

- [Cody Schneider's $5K bounty](https://x.com/codyschneider/status/2060433376545546335)
- [Cody's linked product request](https://x.com/codyschneider/status/2060435757207056835)
- [Public Notion product request](https://app.notion.com/p/graphed/Request-for-Product-Instagram-Creator-Outreach-Platform-5K-Bounty-061576da0bd4499299f8e34f27908593)
- [Meta Instagram Send API](https://www.postman.com/meta/instagram/folder/uxudqu0/send-api)
- [LinkedIn API access](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access)
- [Unipile pricing](https://www.unipile.com/pricing-api/)
- [HeyReach pricing](https://www.heyreach.io/pricing)
- [DMnode](https://dmnode.com/)
- [IGdm Pro pricing](https://igdm.me/?show=price)
- [Modash pricing](https://www.modash.io/pricing)

## Files

- `00-brief.md` — Make It Hit decision, current gate, constraints, and risk stack
- `02-strategy.md` — positioning, product contract, offer, claims, and distribution
- `03-experiments.csv` — gate-specific experiments and decision rules
- `04-decisions.md` — append-only strategic decision log
- `05-learnings.md` — established findings, hypotheses, and contradictions
- `marketplace-projects-2026-09-03.md` — live Upwork/Freelancer/PeoplePerHour demand scan
- `insights.md` — synthesis, positioning, counterpositioning, and pilot
- `evidence.csv` — observations separated from interpretation
- `experiments.csv` — falsifiable tests and decision rules
- `decisions.md` — current gate, build boundary, and kill criterion
- `raw/` — source notes from X
