# Make It Hit brief — Switchboard Creator

Updated: 2026-09-02

## Decision

Should YC spend a capped build cycle turning the existing Switchboard Instagram connector into a managed creator-outreach pilot, before adding native LinkedIn or building a broad omnichannel product?

## Verdict

**Conditional pass:** fund only a thin, concierge Instagram pilot. Do not fund the broad platform yet.

## Product archetype

`b2b-technical`, with a meaningful managed-service/operations component.

## Product hypothesis

Growth-agent builders and UGC-heavy B2C growth teams will pay for a managed Instagram sender runtime that lets their own agents research creators, send believable first-touch DMs, receive replies, and preserve relationship context without the customer operating browser automation, proxies, sessions, or recovery.

## Roles

- User: the customer's growth agent and its human operator.
- Champion: growth engineer, growth lead, or agent-agency founder.
- Buyer: head of growth, founder, or agency owner.
- Beneficiary: creator partnerships team and the consumer brand/app.
- Risk stakeholder: owner of the Instagram account and brand reputation.

## Best-fit initial segment

Teams that already have a vetted creator list, run recurring outreach, use agents in production, can connect a customer-controlled Instagram sender, and consider operating social-account automation outside their core competence.

## Explicit exclusions

- teams primarily needing creator discovery, payments, or a CRM;
- solo creators seeking a cheap bulk-DM desktop app;
- generic developers who want a free social API but have no live campaign;
- broad SMB omnichannel inbox buyers;
- teams requiring native LinkedIn before they can test Instagram.

## Existing assets

- Working Switchboard connectors for Instagram, Messenger, WhatsApp, Telegram, Lark, and Gmail.
- Instagram cold conversation start, profile/content context, MCP tools, event history, and people graph.
- OpenClaw integration and a real internal user.
- Cody Schneider's public $5K bounty, recurring-customer statement, and detailed product brief.
- Public competitor pricing and operational complaints.

## Constraints

- Instagram cold outreach requires unofficial account-session/private-web behavior and carries account, policy, and maintenance risk.
- No unqualified promises about ban prevention, deliverability, volume, or official Meta support.
- User-owned credentials and data should be revocable and portable.
- Do not build native LinkedIn during this gate.
- Pilot scope: one build cycle, one or two sender accounts, no full dashboard.

## Current gate

- G1 Scout: **pass for a pilot**, not for a market-size claim.
- G2 Shape: **conditional pass**; position is coherent but not yet proven in use.
- G3 Package: **provisional**; offer and price remain untested.
- G4 Simulate: **ready to design/run** after approval to recruit pilot customers.
- G5+ Demand, activation, retention, repeatability: **unknown**.

## Risk stack, highest first

1. Fulfillment: sender continuity, checkpoints, recovery, safe pacing, and platform changes.
2. Trust: whether customers will connect a valuable real account.
3. Willingness to pay: one bounty is not a repeatable market.
4. Differentiation: whether relationship-aware voice improves outcomes versus templates.
5. Retention: whether campaigns recur often enough to support subscription economics.
6. Acquisition: whether technical/open-source distribution reaches economic buyers rather than only builders.

## Decision rule

Advance only if two qualified teams connect real sender accounts and submit real creator lists, and at least one makes a recurring paid commitment after a live campaign. Otherwise preserve the work as open-source/personal infrastructure and do not build the hosted outreach company.

