+++
title = "Who Pays When the Browser Fights Back"
slug = "browser-market"
aliases = ["/research/browser-market/", "/learning/browser-market-2026/"]
description = "A founder's Fieldbook on a viral post about scraping, what it does and does not prove about a stateful anti-bot browser company, and a narrow, falsifiable path to test one portal workflow."
date = 2026-09-06
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# WHO PAYS WHEN THE BROWSER FIGHTS BACK

<div style="grid-column:1 / -1;width:100%;min-width:0;">
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>A founder's Fieldbook · 6 September 2026, claims re-checked 21 November 2026 · Seah Ying Cong</strong></p>
<p style="font-size:max(17px,1rem);line-height:1.58;">A popular indie founder spent weeks trying to replace a $99-a-month scraping service with his own AI-assisted code. It stayed unreliable over thousands of queries. He kept the subscription. I read that as the opening line of a company: whoever makes browsers that survive hostile websites should have a business.</p>
<p style="font-size:max(17px,1rem);line-height:1.58;">After checking it, I think the post says something smaller and more useful. People pay for an operated service even when they can code. It does not say there is an empty market for a new stateful anti-bot browser.</p>
<figure style="max-width:560px;margin:1rem auto;"><img src="/images/browser-market/cover-two-paths.png" alt="A person stands between a heap of tangled homemade gears and a tidy beehive, holding out a coin toward the hive." style="width:100%;height:auto;background:transparent;"><figcaption>Build it yourself, or pay someone who has maintained it. Watercolor-style plate drawn procedurally for this Fieldbook, an editorial metaphor and not evidence.</figcaption></figure>
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>My decision:</strong> do not build a generic anti-bot browser API. Test one narrower company: a connection to one customer-authorised portal workflow, sold by the accepted result. The evidence is thin. Everything beyond the first 90 days is a hypothesis with a stop rule.</p>
</div>

---

## 01 · One happy customer is not a market

### What the post supports, and what it leaves out

<figure><img src="/images/browser-market/one-customer.png" alt="One customer holds a coin beside a jar of bees; behind them three faint dotted outlines of absent people." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>One buyer is visible; the crowd is a hypothesis. Procedurally drawn watercolor-style metaphor.</figcaption></figure>

Levels says he spent weeks recreating ScrapingBee with AI help. Google search results for his Hotelist product are about 80% of his scraping. His replacement stayed unreliable over thousands of queries, so he will keep paying $99 a month. When someone suggested other providers he replied that he wanted to replace it, but is happy with ScrapingBee. [The post](https://x.com/levelsio/status/2095950432883368091), [the follow-up](https://x.com/levelsio/status/2095955322741387447)

That is direct customer behaviour, and it is worth more than the likes. It is also a single customer. Nobody inspected his failure logs, so the cause of the failure is unknown. His workload is search results, not multi-page flows with logins. He is satisfied with the incumbent, so he is not a switching signal. I could not re-open the posts on 21 November (the site returned HTTP 402), so the claims rest on the September captures.

<figure><img style="background:transparent;" src="/images/browser-market/evidence-ladder.svg" alt="Two columns. Supported: he keeps a 99 dollar subscription, 80 percent of scraping is Google results, he is happy. Not shown: why his version failed, unmet incumbent need, multi-page workflows, that others would switch." width="600" height="420"><figcaption>Original summary of the raw captures; paraphrased.</figcaption></figure>

Three replies matter as hypotheses. One argues that a person who builds everything in-house is a poor business customer. One practitioner says edge cases keep replacement hard, which is a claim about throughput I could not verify. One suggests Serper and ScrapeCreators as cheaper alternatives. None of them is evidence that a stateful anti-bot product is missing.

---

## 02 · The shelf is already stocked

### Four vendors already sell most of the generic pitch

<figure><img style="background:transparent;" src="/images/browser-market/shelf-matrix.svg" alt="Matrix of Browserbase, Steel, Bright Data and Skyvern against saved login, bot handling, replay, human takeover and resume mid-task. No vendor page describes resuming mid-task." width="600" height="432"><figcaption>Re-read on 21 November 2026 from vendor pages. Statements of capability, not benchmark results.</figcaption></figure>

I re-read the pages the first research relied on. Browserbase reports "35m+ browser sessions a month" and "10,000 customers", and sells Identity, live view and replay. Its April 2026 post describes signed agent identity built with Cloudflare, Fingerprint and 1Password, and the post names no count of sites that accept it, so its value depends on sites reading and validating the signature (my inference). Steel documents saved profiles, a stealth guide, proxies, recordings and traces. Bright Data lists multi-step flows and built-in unblocking at $8 per GB. [Browserbase](https://www.browserbase.com/), [identity post](https://www.browserbase.com/blog/identity), [Steel](https://steel.dev/docs), [Bright Data](https://brightdata.com/products/scraping-browser)

One correction matters. The earlier notes said Skyvern advertises checkpoints and saved progress. The article only supports session cookies, reusable templates, recordings, and a human Take Over and escalation. It does not describe resuming a half-finished filing. [Skyvern](https://www.skyvern.com/blog/how-to-automate-government-form-submissions-with-browser-automation/) That leaves a modest opening, and it is an inference from absent text rather than a tested gap.

The conclusion is plain: a new "browser that survives anti-bot and keeps its login" has to beat four funded sellers on a named workload. Novelty is not an argument.

---

## 03 · The money is real, but not this wedge's money

### A bootstrapped scraping API did sell for eight figures

<figure><img style="background:transparent;" src="/images/browser-market/customers-needed.svg" alt="Bars for customers needed to reach ten million dollars ARR: 8,418 at 99 dollars, 835 at 999, 334 at 2,500, 84 at 10,000 a month." width="600" height="364"><figcaption>Arithmetic, not a market estimate. Zero-based axis.</figcaption></figure>

ScrapingBee was described by its founder as mostly bootstrapped to $5M ARR with a team of four, then bought in an eight-figure all-cash deal. The announcement attributes the buyer to Oxylabs' group and shows only "Jun 19", with no year; one rendering of the interview page named a differently worded buyer, which I left unresolved. [TinySeed announcement](https://tinyseed.com/latest/scrapingbee-s2020-acquired-oxylabs-group), [founder interview](https://www.startupsfortherestofus.com/episodes/episode-783-bootstrapping-scrapingbee-to-5m-arr-and-an-8-figure-exit) The $99 plan Levels mentions is the Startup tier: 1,000,000 credits and 100 concurrent requests. [Pricing](https://www.scrapingbee.com/#pricing)

So company-scale outcomes exist in the category. The chart shows what $10M ARR takes: roughly 8,400 customers at $99, or about 330 at $2,500. Higher prices need higher proven value and more sales effort. A rival can undercut at the commodity end: DataForSEO lists $0.60 per 1,000 queued Google first-page results. [DataForSEO](https://dataforseo.com/pricing/serp/google-organic-serp-api)

None of this sizes my wedge. It only says the category is worth a careful test.

---

## 04 · The strongest bear case

### The people who can build it may be the people who won't pay

<figure><img style="background:transparent;" src="/images/browser-market/builders-and-buyers.svg" alt="In the survey, 46.7 percent run scraping in-house only, 41.7 percent mix, 5 percent external only; 58.3 percent raised proxy spending." width="600" height="462"><figcaption>Reconstructed from the Apify and Web Scraping Club survey text, December 2025.</figcaption></figure>

Apify's survey of "hundreds" of professionals found 46.7% use only in-house code and 5% rely only on external services; 58.3% spent more on proxies in the last year, and 88.7% reported higher costs on anti-bot-protected sites. The authors themselves note the sample comes from builder communities, so the buy share is understated. [Survey PDF](https://get.apify.com/hubfs/apify-state-of-web-scraping-report-2026.pdf)

I read two ways. Anti-bot pressure is real and growing, which supports demand for help. And the audience that talks about this online is the audience least likely to buy. A founder who sells to builders competes with their own weekend. A founder who sells to operators with a recurring chore faces a different buyer. The survey cannot say which.

If three operators with the same workflow will not pay in the first month, this thesis ends.

---

## 05 · The gap would be in the third kind of state

### Remembering a login is not remembering that the order went through

<figure><img style="background:transparent;" src="/images/browser-market/three-states.svg" alt="Three stacked boxes: browser state sold today, task state served by durable workflow tools, business state not seen on any page." width="600" height="426"><figcaption>Original conceptual diagram. The bottom box is a hypothesis.</figcaption></figure>

A browser vendor remembers cookies and a saved profile. A workflow engine remembers which step ran. Temporal, for one, sells durable execution so a workflow resumes after failure. [Temporal](https://temporal.io/) Neither tells you whether a supplier portal actually accepted the order, whether a saved draft is still there after a review pause, or whether a retry will create a duplicate.

That third kind of state belongs to one workflow in one portal. It is concrete, and it is where an operator loses money when automation goes wrong. It is also where a service company can hide: if every portal needs bespoke code, I have built a consultancy. So the test is repeatability, not demand alone.

---

## 06 · The wedge

### One authorised portal workflow, sold by accepted result

<figure><img style="background:transparent;" src="/images/browser-market/wedge-ranking.svg" alt="Five candidate wedges with strongest rival each; the one authorised portal workflow is highlighted." width="600" height="446"><figcaption>The source research ranked these for discovery. Ranks are priorities, not scores.</figcaption></figure>

The earlier research ranked five ideas, and I keep that order's logic while choosing row 2 for this book: fetch and reconcile supplier documents or order status across a small set of shared portals, for operations teams with recurring manual work. Value comes from checked outputs and resolved exceptions. The recruiting-data feed ranks first in the source, but Coresignal already lists 580 million postings with daily rescraping, so I would need a proven coverage gap on a buyer's own sample. [Coresignal](https://coresignal.com/solutions/jobs-data-api/)

The source thesis also ranks a communications runtime first for an "infrastructure company" shape. I left it out: Unipile already bills per connected account across WhatsApp, LinkedIn and email, and the earlier marketplace notes behind that ranking were not available to re-check. [Unipile](https://www.unipile.com/pricing-api/)

**Disproof condition:** an existing vendor solves the buyer's problem by ordinary configuration on the buyer's own workload.

---

## 07 · Will it be a company or a service?

### The test is maintenance that compounds

<figure><img src="/images/browser-market/edge-case-wall.png" alt="A person with a paintbrush patches a wall made of many differently coloured bricks, each brick an edge case." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Every portal is a different brick. Procedurally drawn watercolor-style metaphor.</figcaption></figure>

The source thesis names Supabase, Tailscale and Cloudflare as the shape wanted: ongoing operational responsibility for a recurring dependency. Their moats differ, so "for agents" or "one API" does not make a company durable. Code generation may also make setup and migration cheaper, so lasting value has to come from something that keeps accruing: customer-specific state, trust from long operation, or cost and reliability advantages.

The edge-case wall is my one hopeful reading of the practitioner claim: if maintaining many portals teaches me faster than a customer can, the maintenance compounds. Merely storing messages or accumulated bug fixes does not make a network effect. I will call it infrastructure only if the second and third workflow arrive faster than the first. Until then I should price it as a service.

---

## 08 · The staged path

### Four stages, each paid for by the last

<figure><img style="background:transparent;" src="/images/browser-market/stages.svg" alt="Four steps: find the job, paid pilots, repeatable workflow, runtime, each with a gate." width="600" height="446"><figcaption>Gates are my planning assumptions, set before any evidence so they can fail.</figcaption></figure>

**Stage 0, days 1-30: find the job.** No product. Fifteen buyer conversations. Pass if at least three buyers share a workflow, show a recent failure log and a monthly cost of at least $1,000 in labor and tools.

**Stage 1, days 31-90: paid pilots.** Run three supervised pilots on an existing browser vendor. Pass if all three prepay and results beat the buyer's baseline by at least 30%, with contribution margin of at least 50% after human exception work.

**Stage 2, months 4-12: repeatable workflow.** Productise the connector. Pass at ten paying customers, 80% renewal at 60 days, and onboarding in at most eight engineering hours, and a second workflow added in under four weeks.

**Stage 3, months 12-24: decide the shape.** Add a second and third workflow on the same state layer. Self-serve API and marketplace distribution only after reuse is proven.

---

## 09 · The first 90 days

### Spend about ten thousand dollars to learn one thing

<figure><img style="background:transparent;" src="/images/browser-market/first-90-days.svg" alt="Gantt chart over thirteen weeks: operator list, interviews, test on real workload, gate 0, counsel, three pilots, renewal and gate 1." width="600" height="440"><figcaption>Planning assumption, not a quote or a commitment.</figcaption></figure>

Weeks 1-2, build a list of 40 operators with recurring portal work and book 15 calls. Weeks 2-4, ask each one for the last failure and the last invoice. The weeks 3-4 step is the cheap, decisive one: run the buyer's own workload on Browserbase, Steel and Skyvern first. If configuration fixes it, I stop at week 4.

Weeks 5-6, pay a lawyer to review the authorisation template and each portal's terms (assumed $1,500 to $3,000). Weeks 5-10, run three supervised pilots with one contractor, logging every exception and the minutes it took. Weeks 11-13, ask for renewal. The deliverable is a margin sheet that shows cost per accepted result, not a demo.

---

## 10 · Buyers, credibility and team

### Reach operators, earn trust with their own numbers

<figure><img src="/images/browser-market/road-to-buyers.png" alt="Two people with a coin and a clipboard walk a winding road toward a building with a door; a signpost stands midway." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>A path to a buyer's door, one signpost at a time. Procedurally drawn watercolor-style metaphor.</figcaption></figure>

**Buyers (hypotheses).** Operations or finance teams that pull invoices, orders or statuses from several supplier portals, and agencies that do it for clients. Reach them through warm introductions, the public threads where this started, and vendor communities. Apify's Store is a later channel: under pay-per-event Apify keeps 20% and the developer receives the rest minus platform usage. [Apify docs](https://docs.apify.com/academy/actor-marketing-playbook/store-basics/how-actor-monetization-works) The commitment I ask for is a prepaid pilot, read access to the last 30 days of failures, and a named reviewer who accepts or rejects outputs. "Interesting" is not a commitment.

**Credibility.** Publish a benchmark on customer-approved workloads with accepted results, cost per accepted result, human minutes and a failure taxonomy against the buyer's current provider. Use design-partner references. Where portal owners cooperate, use signed agent identity, which helps only where a site can read and validate it (inference; the vendor post gives no count of such sites). Avoid the unverifiable throughput boasting I flagged earlier.

**Team.** The founder must learn the vertical's documents and exception types. First hire is an exceptions operator, because human work sets margin; then a vertical advisor; then a connector engineer. A co-founder who has run this workflow would help. Where to find them is my assumption, not research.

---

## 11 · Money, law and payout

### Pilots pay first; the legal line is authorisation

<figure><img style="background:transparent;" src="/images/browser-market/capital-path.svg" alt="Capital by stage: 5 to 12 thousand dollars, 100 to 300 thousand, 1 to 5 million, with ScrapingBee and Browserbase precedents." width="600" height="446"><figcaption>Stage amounts are assumptions. Precedents show shapes, not repeatability.</figcaption></figure>

**Capital.** Stages 0 and 1 should cost about $5,000 to $12,000, paid by savings then pilot fees. Stage 2 needs perhaps $100,000 to $300,000 from revenue, an angel or an accelerator. Stage 3 needs venture money only if reuse is proven. Precedents point two ways: ScrapingBee stayed small and sold for cash; Browserbase is reported, in secondary sources I did not fetch, to have raised about $67.5M including a $40M Series B at a $300M valuation. Any founder-ownership or nationality limits on funding were not researched.

**Law.** In the US, the Ninth Circuit held in hiQ v. LinkedIn that scraping publicly accessible pages likely does not violate the CFAA, while distinguishing systems behind passwords; it was a preliminary-injunction ruling and leaves contract and tort claims open. [Fenwick summary](https://www.fenwick.com/insights/publications/hiq-labs-scrapes-by-again-the-ninth-circuit-reaffirms-that-data-scraping-does-not-violate-the-cfaa-1) Singapore's Computer Misuse Act covers unauthorised access, and scraping has no special statute there. [Overview](https://singaporelegaladvice.com/law-articles/legal-scrape-crawl-websites-data-singapore/) My route is conservative: only customer-authorised accounts, written authorisation per portal, counsel review, and no claim of bypassing a protection. This is not legal advice.

**Payout.** Stage 0-1 pays little. Stage 2 can pay a salary from contribution. The only exit precedent here is an eight-figure all-cash sale whose founder split is unknown, so I project no number.

---

## 12 · Stop and go

### Set the failures before the evidence arrives

<figure><img src="/images/browser-market/gates-ahead.png" alt="Three arched gates in a row with green, amber and red lamps, and a small person walking toward them." style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Green, amber, red. Procedurally drawn watercolor-style metaphor.</figcaption></figure>

I stop, or change the vertical once, if any of these is true by day 90:

- Ordinary vendor configuration fixes the buyer's failures.
- Buyers want a one-off script handoff, not a monthly service.
- Cost per accepted result is not at least 30% lower than their baseline.
- Contribution margin is below 50% after exception labor, or customer-specific work takes more than 20% of engineering time.
- Fewer than three prepaid pilots. Two failed verticals end the thesis.

I go to Stage 2 only if none of these stop conditions fires and the Stage 1 pass thresholds above all hold at once. These numbers are not derived from the sources. They exist to be failed.

---

## 13 · Evidence ledger and what is thin

### What I checked, what I carried forward, what I could not check

| Item | Status | Note |
|---|---|---|
| Levels post and replies | Carried from 6 Sept capture | X returned HTTP 402 on 21 Nov; paraphrased |
| Browserbase, Steel, Bright Data, Skyvern pages | Re-read 21 Nov | Skyvern "checkpoints" claim corrected |
| ScrapingBee price, exit, ARR | Re-read 21 Nov | Exit year and buyer wording not resolved |
| Apify/Web Scraping Club survey | Re-read from PDF text | Self-selected builder sample |
| Coresignal, Unipile, DataForSEO, Temporal, Apify pay-per-event | Re-read 21 Nov | Vendor claims |
| Browserbase funding | Search summaries only | Secondary, totals differ across sources |
| hiQ and Singapore law | Secondary summaries | Not legal advice; statute penalties not quoted |
| TheirStack, Serper, Context.dev, Inngest, Monid, Nango, Composio, Supabase, Tailscale, Cloudflare | Not re-checked | Pointers from the source research only |

**What is thin.** The only demand evidence is one founder and four replies. There are no buyer interviews, billing records or failure logs. Competitor evidence is marketing text. The wedge's market size, price and margin are unknown. The communications-runtime branch rested on notes I could not open. All staged numbers, budgets and gates are my assumptions. The watercolor-style plates were drawn by code, not hand-painted or image-model generated.

**What would change my mind.** A buyer who already pays for the tools and can show a costly, recurring, unsolved failure would raise my confidence more than any amount of engagement on the original post. Three of them with the same workflow would justify Stage 1.

**Sources and dossier.** Full claim-by-claim ledger with what each source proves and does not prove: `research-dossiers/2026-09-06-browser-market/evidence-ledger.md`. Execution detail: `execution-path.md` in the same folder.
