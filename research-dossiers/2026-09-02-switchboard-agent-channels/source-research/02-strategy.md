# Strategy — Switchboard Creator

## April Dunford positioning canvas

- **For:** growth-agent builders and UGC-heavy consumer teams with a vetted creator list and a recurring outreach need.
- **Who currently:** use VAs/manual DMs, brittle browser scripts, local bulk-DM software, Unipile plus custom orchestration, or email-oriented creator CRMs.
- **This is:** managed Instagram creator outreach for agents.
- **That enables:** the customer's own agent to recruit and converse with creators through the business's real identity.
- **Because:** Switchboard combines authenticated channel access, campaign continuity, profile context, cross-channel identity, and relationship-aware voice.
- **Unlike:** raw messaging APIs, local automation, or dashboard-first creator CRMs.
- **Credible proof:** Switchboard already starts and reads Instagram conversations and resolves people across channels; Cody's bounty supplies a concrete pilot specification. Reliable campaign-scale operation remains to be proven.

## Category and wedge

Customer category: **Instagram creator outreach run by your agent.**

Technical category: **managed sender runtime for growth agents.**

Do not lead with “omnichannel inbox,” “one social API,” “Beeper for agents,” “lifecycle management,” or “verification.” These frames invite commodity comparison or describe internals rather than the job.

## Message hierarchy

### One-liner

Give your growth agent an Instagram sender fleet.

### Short pitch

Submit a creator list. Switchboard researches each profile, writes in your partnerships manager's real voice, sends at a conservative pace from your account, and streams every reply back to your agent—without your team operating browser automation or brittle sessions.

### Full argument

The official channel cannot perform arbitrary cold first-touch creator outreach. Local tools and scripts unlock it but leave the customer responsible for account health, pacing, session continuity, reply ingestion, and every platform change. Horizontal APIs expose transport but not campaign outcomes or relationship quality. Switchboard already has the identity-bound message data plane; the productized layer owns campaign continuity while the customer's agent owns targeting, reasoning, and response logic.

## Position-to-product contract

| Promised value | Product capability | First proof moment | Metric |
|---|---|---|---|
| Launch outreach without operating automation | Managed sender connection, campaign queue, pacing, health state, and recovery runbook | A real 50-target campaign completes over several days without customer intervention | target completion rate, customer interventions, recovery time |
| Messages sound like a real partnerships manager | Profile/content retrieval, prior-relationship context, person voice memory, channel-style rules, approval UI | Twenty messages are visibly personal and need few substantive edits | approval rate, edit distance/reason, positive reply rate |
| Customer's agent owns the workflow | MCP/API campaign start plus status/reply webhooks | OpenClaw creates a campaign and receives a real reply event | successful tool calls, callback latency, manual handoffs |
| Relationships survive channel changes | People graph maps Instagram and WhatsApp identities with portable history | A creator moves to WhatsApp and the agent continues with prior context | identity-resolution accuracy, duplicate-contact rate |
| Business identity is not held hostage | Customer-controlled credentials/trust root, encrypted local data, export and revoke paths | Customer can revoke hosted access and recover its history | revocation/export success and time |

## Product implication: believable personal tone

Tone is not a generic brand-style prompt. Model it as:

`message = person relationship + sender persona + channel norm + current campaign goal + recent profile evidence`

The first-session demo must show three creators receiving materially different messages and explain the source evidence behind each one. For replies, the agent must know what has already been said and whether the relationship is warm, skeptical, transactional, or friendly.

## Offer hypothesis

### Attraction offer

**50-Creator Live Pilot**

- one customer-controlled Instagram sender;
- one vetted list of up to 50 creators;
- profile-aware first messages and one optional follow-up;
- human campaign approval;
- conservative pacing, deduplication, suppression, sender-health monitoring;
- reply delivery to the customer's agent plus CSV export;
- fourteen-day operating window;
- no claim of guaranteed delivery, reply rate, or account safety.

Price hypothesis: **$500 paid pilot**, credited toward the first managed month. For Cody specifically, his published bounty can replace this price test only if the acceptance terms remain current; it does not validate other buyers.

### Continuity hypothesis

**$499/month per managed workspace**, including one active sender and a capped campaign volume; additional senders priced around the operational load. Exact limits must follow observed safe capacity and support cost, not marketing pressure.

### Open-source boundary

Open-source the local data plane, canonical event model, MCP surface, people graph, connector interface, and revocation/export path. Charge for hosted session/proxy operations, sender health/recovery, campaign execution, callbacks, and support.

## Objection map

| Objection | Honest response or test |
|---|---|
| “I can write this with Playwright.” | The pilot measures whether running and recovering it is distracting enough to delegate; do not argue with builders who prefer self-hosting. |
| “Why not Unipile?” | Unipile is a viable transport input. Switchboard must prove value in campaign continuity, relationship-aware voice, and agent workflow—not claim that a unified API is novel. |
| “Will my account get banned?” | No guarantee. Use customer-controlled accounts, conservative limits, visible health, explicit risk disclosure, and immediate revocation. |
| “DMnode already exists.” | Correct. Win only through working delivery, responsiveness, relationship data, and OpenClaw-native workflow; feature parity is insufficient. |
| “We need LinkedIn too.” | Use an adapter/partner for a paid cross-channel pilot; do not build native LinkedIn until it is repeatedly blocking revenue. |
| “Why pay if Switchboard is open source?” | Self-host the data plane freely. Pay only if someone else owning sender continuity and incidents is valuable. |

## Claim/proof ledger

### Supported now

- Switchboard can start Instagram conversations by handle, send/read messages, retrieve profile context, expose MCP tools, and resolve people across supported channels.
- A named buyer publicly specified the requested product and attached a bounty plus recurring-customer intent.
- Existing competitors charge for messaging infrastructure and managed sender operations.

### Provisional; test before claiming

- Switchboard can run reliable campaign-scale Instagram outreach.
- Relationship-aware voice improves positive replies or reduces editing.
- Customers beyond Cody will pay $499 monthly.
- User-owned trust roots materially increase purchase confidence.

### Prohibited

- “Official Meta integration” for cold first-touch DMs.
- “Ban-proof,” “risk-free,” “unlimited DMs,” or guaranteed deliverability/reply claims.
- Production customer outcomes or testimonials that have not occurred.

## Distribution hypothesis

Primary: a 90-second founder demo on X plus targeted, individually qualified outreach to growth-agent agencies and UGC-heavy B2C founders. The demo shows a campaign created by OpenClaw and a live reply, not infrastructure diagrams.

Secondary: an open-source Switchboard connector/MCP package that attracts technical champions, with an explicit managed-pilot path for teams that do not want operations.

Partner option: creator-discovery/CRM tools that have lists but cannot perform cold Instagram outreach. Treat this as later channel evidence, not an initial dependency.

Avoid broad paid acquisition until a real pilot activates and continues.

