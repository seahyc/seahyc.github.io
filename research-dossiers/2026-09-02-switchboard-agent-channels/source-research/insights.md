# Insights

## 1. Cody's request is unusually strong demand evidence

On May 30, 2026, Cody Schneider offered a $5K bounty and promised to be the first recurring customer for a reliable Instagram creator-outreach product. The linked brief is specific enough to function as a buying spec:

- submit vetted Instagram profiles, a message/template, and campaign settings;
- send personalized first-touch DMs, with optional follow-up;
- track sent, failed, skipped, and replied outcomes;
- deliver reply/status events through an API, webhook, export, or inbox;
- manage sender setup, throttling, health, recovery, deduplication, and platform changes;
- support multiple campaigns and clients;
- do not hand the customer a one-off script, repo, browser bot, or maintenance burden.

His shorthand is **“HeyReach for Instagram DMs.”** The bounty only pays for a working real-world pilot with an ongoing engineering owner.

This is stronger than a feature request: it includes an economic commitment, desired API shape, rejected alternatives, and operating requirements.

## 2. Switchboard is closer than it first appears

The existing repository already has:

- WhatsApp, Telegram, Lark, Gmail, Instagram, and Messenger connectors;
- Instagram/Messenger messaging through a Matrix/mautrix-meta backend;
- cold Instagram conversation start by handle or numeric ID;
- Instagram profile, stories, feed, and following-feed context;
- canonical message events, append-only history, SQLite/FTS, MCP tools, and a cross-platform people graph;
- send, read, search, react, backfill, start-chat, and people-resolution operations;
- residential-proxy fail-closed behavior for private-web Instagram/X access.

The major gaps are product and operations, not basic Instagram transport:

- multi-tenant workspaces, role-scoped agent credentials, and account isolation;
- campaign, target, state, deduplication, suppression, and follow-up models;
- sender capacity, warmup/ramping, health monitoring, replacement, and recovery;
- hosted session/proxy fleet and an incident owner;
- reply webhooks, analytics, billing, permissions, and compliance controls;
- a relationship-aware voice layer that adapts to the person and channel;
- LinkedIn transport.

## 3. The structural market gap

The official Instagram Send API is designed for conversations initiated by the Instagram user; it does not provide arbitrary cold first-touch DMs from a professional account. LinkedIn's broad messaging access is also restricted and approval-gated. Therefore the desired workflow requires an authenticated account-session/private-web layer or browser automation.

That creates an unavoidable tradeoff:

- **official APIs:** more stable and policy-aligned, but cannot perform the job;
- **account-session/private-web access:** performs the job, but carries checkpoints, bans, protocol breakage, IP/session continuity requirements, and ongoing maintenance.

The market is not missing an endpoint. It is missing a vendor willing and able to own that operational liability.

## 4. Competitive map

| Product | What it sells | Why it does not fully answer the job |
|---|---|---|
| Unipile | One reverse-engineered API across LinkedIn, WhatsApp, Instagram, Telegram | Horizontal transport primitives; per-account pricing; customer still owns campaign logic, sender policy, voice, and outcome operations |
| DMnode | API-first Instagram campaigns shaped almost exactly like Cody's brief | Very new; public proof of reliable production use is thin; terms acknowledge third-party infrastructure and no delivery guarantee |
| IGdm Pro | Cheap local Instagram bulk-DM desktop app | Customer operates the desktop, account risk, uptime, and recovery; weak agent/runtime surface |
| HeyReach | Managed LinkedIn outreach, API/MCP, sender and agency operations | Strong reference model but LinkedIn-specific |
| Modash | Creator discovery, CRM, email outreach, tracking, and payments | Validates buyer spend but uses email rather than Instagram cold-DM transport |
| Switchboard today | User-owned multi-channel message bus, agent tools, identity graph | Strong data plane; missing hosted campaign and sender-operations product |

DMnode appeared three days after Cody's post. That is evidence that the API surface and landing page are easy to copy. Durable advantage must come from protocol recovery, sender-health data, delivery operations, and accumulated relationship context—not the `POST /campaigns` shape.

## 5. Positioning

### Beachhead

UGC-heavy B2C apps, consumer brands, and growth-agent agencies that already have creator lists and want their own agents to recruit creators through Instagram.

### Competitive alternatives

Manual DMs, VA teams, local browser tools, one-off Playwright scripts, Unipile plus custom orchestration, creator CRM email outreach, and simply not doing the campaign.

### Differentiated value

Switchboard can combine proactive delivery with profile research, cross-channel relationship memory, and per-person/per-channel voice. The agent does not merely send a template: it knows what the creator posts, whether the business has spoken with them before, which channel they prefer, and how the partnerships manager plausibly sounds in that relationship.

### Category

Customer-facing: **Instagram creator outreach run by your agent.**

Developer-facing: **a managed sender runtime for growth agents.**

Avoid leading with “omnichannel inbox,” “one API,” “lifecycle management,” “verification,” or “Beeper for agents.” Those describe implementation rather than the job.

### Copy

**Give your growth agent an Instagram sender fleet.**

Submit a creator list. Switchboard researches each profile, writes a first message in your brand's real voice, sends at a safe pace from your accounts, and streams every reply back to your agent—without your team maintaining browsers, proxies, or brittle sessions.

CTA: **Run a 50-creator pilot.**

## 6. Concrete demo

1. Upload 20 vetted creator handles and a short brand/campaign brief.
2. Switchboard shows each creator's recent content, prior relationship, and a different personal opener.
3. The operator approves the campaign once.
4. The agent sends paced first-touch Instagram DMs from the connected sender.
5. A live campaign view changes targets from queued to sent, replied, interested, declined, skipped, or failed.
6. Positive replies appear immediately in the customer's agent; it proposes a reply in the right personal/channel voice or routes to a human.
7. If the creator moves to WhatsApp, the same relationship memory follows without pretending it is a brand-new person.

The demo's visible outcome is a creator replying to a message that sounds human and context-aware. Sender health, audit history, and session recovery remain supporting proof.

## 7. Seven Powers / counterpositioning

- Meta and LinkedIn cannot broadly support cold account-based outreach without contradicting their platform and abuse-control policies.
- Creator CRMs are optimized for seats, dashboards, and email workflows; owning unofficial Instagram sender infrastructure increases their platform risk and can reduce dashboard engagement.
- Horizontal APIs such as Unipile are optimized to be neutral primitives. Owning campaign outcomes, brand voice, suppression policy, and spam liability would pull them into a different business.
- Cheap local tools win on price and privacy, but cannot credibly promise that the vendor will wake up, repair a broken session, and resume the campaign.
- Switchboard's potential process power is the accumulated recovery playbook, sender-health history, per-channel safety policy, and identity/relationship graph across channels.

This is not yet a moat. It becomes one only through repeated production campaigns and recovery events.

## 8. Open-source and hosted boundary

Open-source the inspectable data plane: canonical event schema, local message store, MCP surface, identity graph, customer-held encryption/trust root, and connector interface.

Charge for the work customers explicitly do not want to own: hosted sender/session/proxy operations, health/recovery, campaign execution, callbacks, and support. A customer-held trust root makes the business identity revocable and portable; the commercial superpower is that the agent remains able to do the job without the customer babysitting the channel.

Some fragile protocol-adapter and recovery techniques may be better operated as a managed service than published as a static connector that accelerates countermeasures.

## 9. Cheapest decisive pilot

Do not build LinkedIn first. Repackage the existing Instagram path into one concierge pilot:

- one customer-controlled sender;
- 50–100 vetted creators;
- one campaign endpoint or CLI;
- profile-aware first messages;
- deduplication and suppression;
- conservative pacing and a visible account-health state;
- reply callback plus CSV export;
- no dashboard beyond a minimal campaign table.

Pass only if at least two teams connect a real sender and provide a real creator list, and at least one commits to an ongoing managed fee after a monitored pilot. If buyers only request a repo or self-hosted script, retain Switchboard as open-source infrastructure rather than building a hosted outreach company.

## 10. Sequencing

1. Instagram creator outreach: prove delivery, replies, and willingness to delegate sender operations.
2. WhatsApp handoff: preserve the same person and voice after creator/customer conversion.
3. LinkedIn: initially use a provider adapter if a paying workflow requires it; build native transport only after repeated demand proves that the economics justify its distinct reliability stack.

