+++
title = "A Switchboard for Agents"
slug = "switchboard-agent-channels"
aliases = ["/research/switchboard-agent-channels/"]
description = "A founder's Fieldbook on whether Switchboard should let customers' agents run Instagram creator outreach: one named buyer, a crowded transport layer, a hard platform constraint, and a capped pilot with kill criteria."
date = 2026-09-02
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# WIRING AGENTS<br>TO CREATORS

<div style="grid-column:1 / -1;width:100%;min-width:0;">
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>A founder's Fieldbook · 2 September 2026 · Seah Ying Cong</strong></p>
<p style="font-size:max(17px,1rem);line-height:1.58;">Picture a growth agent that has found a long list of creators worth talking to (an illustration, not a figure from the research). It can read their posts and draft something that sounds like a person. Then it hits a wall, because the place those creators actually answer, Instagram, will not let a business message a stranger through its official door.</p>
<figure style="max-width:560px;margin:1rem auto;"><img src="/images/switchboard-agent-channels/switchboard-cover.png" alt="A small robot plugs patch cables into a board that connects to three conversation bubbles." style="width:100%;height:auto;background:transparent;"><figcaption>One identity-bound switchboard, many conversations. Editorial illustration drawn in code; not a hand painting or a product screenshot.</figcaption></figure>
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>My decision:</strong> should Switchboard, my multi-channel message layer, grow from WhatsApp into Instagram, and later LinkedIn, so that customers' agents can operate real messaging identities? My answer from the notes is a conditional yes for one narrow thing, a capped Instagram creator-outreach pilot, and a no for a broad platform or a LinkedIn connector. The evidence behind that is thin in places, and this book says where.</p>
</div>

---

## 01 · A buyer wrote the spec

### One named person offered money for exactly this job

On 30 May 2026 Cody Schneider, who builds agent infrastructure, publicly offered a **$5,000 bounty** and said he would be the first recurring customer for a reliable Instagram creator-outreach product. His linked brief reads like a purchase order: submit vetted profiles and a message, send paced first-touch DMs, track sent, failed, skipped and replied, and return events by API, webhook or export. [His post](https://x.com/codyschneider/status/2060433376545546335), [the brief](https://app.notion.com/p/graphed/Request-for-Product-Instagram-Creator-Outreach-Platform-5K-Bounty-061576da0bd4499299f8e34f27908593)

<figure><img src="/images/switchboard-agent-channels/brief-anatomy.svg" alt="The buyer's brief as a pipeline: submit a list, the vendor owns sending and recovery, targets end in states, replies return by webhook. One-off scripts are rejected." width="600" height="556" style="background:transparent;"><figcaption>The purchase is operational ownership, not an endpoint. Paraphrased from the post and brief as recorded in my notes.</figcaption></figure>

What he does not want matters most. He rejects a one-off script, a repo, or a browser bot he has to babysit. He wants a vendor to own sender setup, throttling, recovery and platform changes. His shorthand was "HeyReach for Instagram DMs."

**What this proves:** one buyer, with money attached, specified the job. **What it does not prove:** that a second buyer exists. The post reached about 48.8K views, 88 replies and 602 bookmarks when my notes captured it, so the signal was public, yet the notes record no second buyer coming out of it. I could not re-open the post or the brief when I rebuilt this book (the X page returned a payment wall, the Notion page rendered empty), so these details rest on my dated notes, not a fresh read.

---

## 02 · The official door opens inward

### Meta's API will not start a conversation for you

Instagram's own messaging API is built around the user speaking first. Meta's developer documentation says conversations begin when an Instagram user messages the business, and a business can reply inside a window that is usually 24 hours, stretching to 7 days in a few cases. A professional account cannot use it for arbitrary cold first-touch DMs. [Meta Instagram messaging docs](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api)

<figure><img src="/images/switchboard-agent-channels/one-way-door.png" alt="A mailbox whose slot only accepts letters from inside, while a person outside holds an envelope." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Official channel: inbound-initiated only. Editorial illustration drawn in code, not a hand painting.</figcaption></figure>

LinkedIn is similar in spirit. Its developer page says most permissions and partner programs need explicit approval, and only a few open permissions (sign-in, profile, email, posting) are self-service. [LinkedIn API access](https://learn.microsoft.com/en-us/linkedin/shared/authentication/getting-access)

**My inference, not a quoted fact:** the job Cody wants therefore needs an authenticated account session, private web behaviour or browser automation. That likely sits uneasily with platform terms. I have not done a legal read of those terms.

---

## 03 · The plumbing is mostly built

### Switchboard already does the hard single-user part

From my inspection of the repository, recorded in the notes, Switchboard can already start an Instagram conversation by handle, read and send messages, pull profile and feed context, log every event append-only, search it, expose MCP tools, and resolve one person across WhatsApp, Instagram and other channels. It also fails closed on the residential proxy used for private-web Instagram access.

<figure><img src="/images/switchboard-agent-channels/assets-and-gaps.svg" alt="Two columns: six Switchboard capabilities that exist and seven product and operations pieces still missing." width="600" height="496" style="background:transparent;"><figcaption>Built: the data plane. Missing: the campaign runtime and the operations around it. Repository claims are first-party and were not re-run.</figcaption></figure>

What is missing is not a transport. It is a product that holds state across days: workspaces, a campaign and target model, deduplication, suppression, pacing, sender health, a hosted session fleet, reply webhooks, billing, and someone on call. That is why a pilot, not a platform, is the right size.

---

## 04 · The product is the liability

### Anyone can send a DM. Few want to own what happens next

If the official API cannot do it, every vendor in this space is operating an unofficial layer, and that layer breaks. One operator of a LinkedIn automation tool said that browser-cloud disconnects stopped campaigns and caused flags, bans, angry support and churn, and that moving to Unipile shifted support from broken accounts to setup questions. [Operator's post](https://x.com/saguppa/status/2072674164033601715)

<figure><img src="/images/switchboard-agent-channels/sender-tightrope.png" alt="A small robot balances on a sagging rope between two cliffs while a plug falls below." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Session continuity is the tightrope. Editorial illustration drawn in code, not a measurement.</figcaption></figure>

This is one operator's account, on LinkedIn, in a different architecture. It supports a narrow reading: session reliability drives support load and retention for tools like this. It does not tell me the failure rate for Instagram, or for Switchboard.

**The gap I think is real:** the market is less missing an endpoint than missing a vendor willing to carry the account-risk liability and answer the pager. That is an inference from the structure above.

---

## 05 · Everyone sells a slice

### Prices tell you who is solving which part

I re-read each pricing page on 21 November 2026. Unipile sells one API across LinkedIn, WhatsApp, Instagram and Telegram (it says LinkedIn, WhatsApp and Instagram work through reverse engineering), from about $55 a month for 10 accounts, then $5.50 an account up to 50. HeyReach sells managed LinkedIn sending from $79 a sender. IGdm Pro is an $8.99 desktop app. DMnode sells API-first Instagram campaigns at $50 and $500. Modash sells creator discovery and email workflow at $199 and up on annual billing. [Unipile](https://www.unipile.com/pricing-api/), [HeyReach](https://www.heyreach.io/pricing), [IGdm](https://igdm.me/?show=price), [DMnode](https://dmnode.com/), [Modash](https://www.modash.io/pricing)

<figure><img src="/images/switchboard-agent-channels/entry-prices.svg" alt="Bar chart of published entry monthly prices from 8.99 dollars for IGdm Pro up to 999 dollars for HeyReach Agency, with an untested 499 dollar Switchboard hypothesis dashed." width="600" height="480" style="background:transparent;"><figcaption>Published entry prices, USD per month. Units differ and Modash is annual billing. The dashed bar is my untested idea.</figcaption></figure>

| Product | What it sells | Why it does not fully answer the job |
|---|---|---|
| Unipile | Horizontal transport, four channels | Customer still owns campaign logic, pacing, voice |
| DMnode | Instagram campaigns shaped like the brief | Brand new; no public proof of reliable production use; its terms say availability and delivery are not guaranteed |
| IGdm Pro | Local bulk-DM app | Customer runs the machine and carries recovery |
| HeyReach | Managed LinkedIn outreach, API and MCP | LinkedIn only |
| Modash | Creator CRM, email outreach | Different transport; shows buyers already spend |

---

## 06 · A copyable surface needs a deeper moat

### DMnode appeared three days after the bounty

Cody posted on 30 May. DMnode announced itself on 2 June as API-first Instagram outreach for agents, with dry runs, suppressions, sender capacity, approval gates, reply routing, MCP and webhooks. [DMnode launch post](https://x.com/happywp/status/2061806544497356877) That launch post drew very little attention (74 views when my notes observed it), so I read it as proof the feature list is easy to copy, not as proof of a competing business.

<figure><img src="/images/switchboard-agent-channels/copyable-castle.png" alt="A solid castle with a moat beside a dotted outline of an identical castle." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>The shape of the API can be duplicated in days; the recovery record cannot. Editorial illustration drawn in code, not a hand painting.</figcaption></figure>

So the `POST /campaigns` shape is not a moat. The only durable edge I can imagine is slower to build: a log of how sessions break and get repaired, sender-health history, per-channel safety rules, and a relationship graph that spans channels. **That is a hypothesis.** Nothing in the notes shows Switchboard has accumulated any of it at campaign scale.

---

## 07 · Two markets hide in the listings

### Software buyers and relationship-labour buyers want different things

On 3 September 2026 my notes scanned live Upwork, Freelancer and PeoplePerHour listings. They split cleanly. One group buys software: an Instagram DM qualification system with resumable conversations and deterministic actions, an automation agency seeking a white-label partner, a brand paying $30 to $50 an hour for a managed UGC outreach campaign. The other group pays humans, as little as $5 to $6 an hour for an outreach assistant, and some explicitly reject bots or AI-heavy messaging.

<figure><img src="/images/switchboard-agent-channels/two-markets.svg" alt="Two columns contrasting automation-build buyers and creator-relationship labour buyers, plus a bar comparing a 499 dollar managed price idea to 650 to 780 dollars of monthly assistant labour." width="600" height="540" style="background:transparent;"><figcaption>Labour comparison is my arithmetic from one listing's stated rate. Listing counts are noisy; the scopes are the signal.</figcaption></figure>

Two things follow. First, creator outreach is already bought as recurring labour, which is useful evidence that the pain is funded. Second, the human-approved framing is forced by the market: a pitch of "a bot replaces your relationship manager" meets a stated ban. These are snapshots of a few listings, perishable, and I did not re-open them.

---

## 08 · Voice is the bet that might not pay

### Relationship-aware tone is the differentiator I cannot yet prove

Transport can be copied, so my notes make tone the experience differentiator. The idea is that a message is built from the relationship with this person, the sender's persona, channel norms, the campaign goal and recent profile evidence, instead of a template with a name merged in.

<figure><img src="/images/switchboard-agent-channels/tone-inputs.svg" alt="Five inputs combine into one human-approved message. A counter-signal box notes buyers who ban AI messaging." width="600" height="478" style="background:transparent;"><figcaption>The model of a message from my strategy notes. Uplift versus plain templates is untested.</figcaption></figure>

The risks are plain. More research and approval steps can erase the speed advantage. High-value creator-relationship buyers explicitly distrust AI-heavy writing. So the first version keeps a human approving each campaign, and I claim no reply-rate uplift until a blind comparison on a real campaign shows one. If it adds review burden without better replies, I demote voice to an optional layer.

---

## 09 · What the headline omits

### A bounty is not a market

The headline is "a buyer offered $5,000." The unflattering version is below.

<figure><img src="/images/switchboard-agent-channels/liability-storm.png" alt="A small robot stands under a storm cloud with lightning and rain beside a small building." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Fulfilment and platform risk dominate. Editorial illustration drawn in code, not a hand painting.</figcaption></figure>

| Risk, highest first | Why it matters |
|---|---|
| Fulfilment | Sender continuity, checkpoints, safe pacing, platform change |
| Trust | Will a customer connect a valuable real account? |
| Willingness to pay | One bounty is not a repeatable market |
| Differentiation | Does relationship-aware voice beat templates? |
| Retention | Do campaigns recur enough for a subscription? |
| Acquisition | Does open-source reach economic buyers, not only builders? |

Add that Cody explicitly rejects self-hosting while I personally prefer open tools, so the product has to separate customer-owned data from paid operations. And broadening to more channels adds a separate unofficial stack and a separate policy risk for each. Nothing here shows a customer, a payment or a retained user for Switchboard itself.

---

## 10 · The first ninety days

### Package, probe, build the thin layer, run one live pilot

This card and the next four are my proposal, not findings. Only the scope limits come from the notes: one build cycle, one or two customer-controlled sender accounts, no full dashboard, a 14-day pilot window, up to 50 creators, human approval, and no promises about ban prevention, deliverability or reply rate.

<figure><img src="/images/switchboard-agent-channels/first-90-days.svg" alt="Gantt-style timeline across 13 weeks: packaging, marketplace probes, building a campaign layer, a 14-day live pilot, then a decision." width="600" height="468" style="background:transparent;"><figcaption>Proposed schedule. Week placements are my assumptions; the 14-day window and the build cap come from the notes.</figcaption></figure>

What I would build: a campaign endpoint or CLI, profile-aware first messages, deduplication and suppression, conservative pacing with a visible account-health state, a reply callback plus CSV export, and a minimal campaign table. Reuse the existing Instagram connector. Do not build LinkedIn, a general dashboard or a sender marketplace. In parallel, the notes propose three tailored marketplace bids as a cheap acquisition test: an Instagram qualification build, a managed UGC campaign and an agency partnership, each with one working demo clip and a disclosed-automation proposal. Owner for all of it is me; budget is not specified in the sources.

---

## 11 · Who I would ask, and for what

### A named buyer type, a real account, a recurring fee

The best-fit customers in the notes are growth-agent builders, agency owners and UGC-heavy B2C teams that already have a vetted creator list, run recurring outreach and already use agents. Excluded: teams wanting creator discovery or a CRM, solo creators wanting cheap bulk DMs, and anyone who needs native LinkedIn before they can try Instagram.

<figure><img src="/images/switchboard-agent-channels/demand-funnel.svg" alt="Funnel bars: 10 prospects, at least 3 qualified replies, at least 2 agree to connect a sender, at least 1 accepts paid terms." width="600" height="482" style="background:transparent;"><figcaption>Gate MIH-01 thresholds from my notes. Bars start at zero.</figcaption></figure>

The ask is concrete: a real creator list and a connected sender, for a **$500 paid pilot** credited toward a first managed month. Reach is a short founder demo of an agent creating a campaign and receiving a live reply, plus individually qualified outreach to 10 prospects, with no paid traffic. Cody is the obvious first conversation, but his bounty only stands in for the price test if its terms are still current, and one buyer cannot validate the rest. I have not contacted anyone.

---

## 12 · Price, open core and the thin capital story

### Charge for operations; keep the data plane open

The notes propose open-sourcing the data plane (event model, message store, MCP surface, people graph, connector interface and an export-and-revoke path) and charging for what customers do not want to own: hosted sessions and proxies, sender health and recovery, campaign execution, callbacks and support. The price hypothesis is **$500 for the pilot**, then **$499 a month** per managed workspace with one active sender and a capped volume.

<figure><img src="/images/switchboard-agent-channels/price-per-sender.svg" alt="Bar chart of derived monthly price per sender: IGdm 3 dollars, DMnode Growth 20, DMnode Starter 50, HeyReach 79, and an untested Switchboard idea at 499." width="600" height="392" style="background:transparent;"><figcaption>Derived: plan price divided by senders. Different services are being compared; the premium is a claim to test.</figcaption></figure>

Read the chart as a warning. On a per-sender basis $499 sits far above every listed alternative, including DMnode's $500 plan that lists 25 sender accounts. The justification, a concierge, human-approved, relationship-aware service, is exactly what the pilot must prove; the notes' own alternative test is $200 to $500 a month.

**Capital: not researched.** The sources contain no cost model, no hosting or proxy cost, no support cost and no funding plan. The only revenue figures are the one-off $5,000 bounty, the $500 pilot and the $499 monthly price. I will not invent a cost base. The first job of the pilot is to measure the real cost of running one sender safely.

---

## 13 · Credibility, team and the legal gap

### What a newcomer must learn, and what I did not research

<figure><img src="/images/switchboard-agent-channels/learning-stack.png" alt="A person stands beside a tall stack of books under a lamp." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>The unlearned parts are operational. Editorial illustration drawn in code, not a hand painting.</figcaption></figure>

**Credibility** would come from a working demonstration rather than a claim: a real campaign with a real reply, a public incident log, honest limits (no "ban-proof", no "unlimited DMs", no "official Meta integration"), and an export-and-revoke path customers can test. The open data plane is itself a trust device, although I have not tested whether customers care.

**What I must learn:** how Instagram checkpoints and session loss actually behave at campaign scale, safe pacing, proxy and session operations, and how creators react to automated outreach. **Team:** the notes name no hire or co-founder. A person who has run social-account infrastructure on call would be the gap, but that is my reading.

**Legal and regulatory:** not researched. The notes flag platform-policy and account risk, and the book assumes cold outreach through unofficial access likely breaches platform terms. I have not checked anti-spam, data-protection or marketing-consent rules in any country, so I make no claim about what is allowed. **Personal payout:** not modelled; the sources contain no founder-compensation or exit analysis.

---

## 14 · Gates and kill criteria

### Four gates with numbers set before running, and one way to stop

<figure><img src="/images/switchboard-agent-channels/stage-gates-diagram.svg" alt="Four sequential gates with pre-set thresholds and a kill condition." width="600" height="580" style="background:transparent;"><figcaption>Thresholds are from the research notes' experiment table; the voice comparison is a small sample with no significance claim.</figcaption></figure>

<figure><img src="/images/switchboard-agent-channels/stage-gates.png" alt="A small figure climbs four stair-like blocks toward a boom gate." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Each step has to be earned before the next is built. Editorial illustration drawn in code, not a hand painting.</figcaption></figure>

The numbers are staged. The offer gate asks that, of 10 prospects, at least 3 reply with a real campaign, at least 2 agree in principle to connect a sender, and at least 1 accepts paid terms. My overall bar for building further is stricter: two qualified teams connect real senders and submit real lists, and at least one commits to a recurring fee after a live campaign. At least 90% of eligible targets should reach sent or an explained safe skip, with no unplanned customer interventions and every reply delivered. **Stop** if teams only want a repo, refuse to connect real accounts, or will not pay a managed fee after a good campaign: then Switchboard stays personal and open-source infrastructure and I do not build the hosted outreach company. If every qualified buyer demands native LinkedIn, I would first consider a provider adapter, not native development. Cap the whole test at one build cycle, one sender and about 50 targets.

---

## 15 · Appendix: evidence, reconciliation and gaps

### How the notes were reconciled, and what I re-checked

Dating: the book carries the research date, 2 September 2026. The marketplace scan is from 3 September, and the price and documentation re-checks were done on 21 November 2026, so the page mixes three dates.

The source folder held numbered files (00 to 05) and un-numbered duplicates. `04-decisions.md` is a superset of `decisions.md` (it adds the 3 September marketplace decision), and `03-experiments.csv` (four gate experiments) supersedes `experiments.csv` (four earlier tests with looser thresholds, such as a $200 to $500 price range). Where they differ I used the numbered files and say so above. Full reconciliation, the claim ledger and the execution path are in the internal dossier.

| Claim | Re-checked 21 Nov 2026? | Result |
|---|---|---|
| Meta: user must message first, window usually 24h | Yes, Meta developer docs | Confirmed (7 days in some cases) |
| LinkedIn: most permissions need approval | Yes | Confirmed |
| Unipile: four channels; reverse engineering; about $55 min, $5.50 per account | Yes | Confirmed (page lists EUR 49 / USD 55; it says Telegram uses an official API, which my notes had lumped in) |
| A developer's "$275 for 50 accounts" | Arithmetic | $55 + 40 x $5.50 = $275, consistent |
| HeyReach $79 per sender, $999 for 25 senders | Yes | Confirmed |
| IGdm $8.99 for 3 accounts, $19.99 unlimited | Yes | Confirmed (a $29.99 tier also exists) |
| Modash $299 to $599 monthly | Partly | Page states annual-billing $199 and $499; monthly figures implied, not stated |
| DMnode $50 and $500, terms disclaim delivery | Yes | Confirmed |
| Cody's $5K bounty and brief; Notion spec | No | X returned a payment wall, Notion rendered empty |
| DMnode launch date, Salesrobot and Anuj posts | No | Not re-opened |
| Upwork, Freelancer, PeoplePerHour listings | No | Perishable; not re-opened |
| Switchboard capabilities | No | First-party repo claims, not re-run |

**Thin or absent in the sources:** any second buyer; any Switchboard campaign, payment, activation or retention data; costs and funding; legal review; hiring plan; founder payout. **What would disprove the thesis:** the gate failures on the previous card.
