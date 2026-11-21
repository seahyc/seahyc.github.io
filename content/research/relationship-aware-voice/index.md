+++
title = "Never Sound Like AI to Someone Who Knows You"
slug = "never-sound-like-ai-to-someone-who-knows-you"
aliases = ["/research/relationship-aware-voice/", "/learning/relationship-aware-voice/"]
description = "A founder’s Fieldbook on a relationship-aware message composer: what is sourced, what is my positioning, the cheapest decisive test, and the staged path from an open-source tool to a WhatsApp sales desk."
date = 2026-09-02
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# NEVER SOUND LIKE AI TO SOMEONE WHO KNOWS YOU

<div style="grid-column:1 / -1;width:100%;min-width:0;">
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>A founder’s Fieldbook · positioning dated 2 September 2026, web grounding added 21 November 2026 · Seah Ying Cong</strong></p>
<p style="font-size:max(17px,1rem);line-height:1.58;">I say “running late” differently to my wife, to my manager and to a recruiter. Every AI draft I have asked for says it one way, and I rewrite it before I send. That rewrite is the product I want to test.</p>
<figure style="max-width:560px;margin:1rem auto;"><img src="/images/relationship-aware-voice/cover.png" alt="One note splits into three differently coloured and shaped message bubbles." style="width:100%;height:auto;background:transparent;"><figcaption>One intent, three voices. Hand-drawn watercolor-style metaphor, not a product screenshot.</figcaption></figure>
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>How to read this.</strong> Almost everything about the product shape, copy and the test design is <em>my positioning</em>: a claim I am betting on, not a finding. I mark claims as <strong>Sourced</strong> (a public document I read), <strong>Interviews</strong> (my own two customer interviews, summarised in my notes, not independently checked), <strong>Positioning</strong> (my bet), <strong>Inference</strong> or <strong>Assumption</strong>. Nothing here has been built or measured.</p>
<p style="font-size:max(17px,1rem);line-height:1.58;"><strong>My decision:</strong> a conditional yes to prototype only the writing layer, for one person, locally, without sending. Do not build bridges, an inbox or agent governance yet. Whether it is a venture, I do not know.</p>
</div>

---

## 01 · The same sentence is three messages

### The demo that carries the whole idea

<figure><img src="/images/relationship-aware-voice/demo.svg" alt="One intent, 'I am running 20 minutes late', becomes three different drafts for a partner on WhatsApp, a manager on Slack and a recruiter on LinkedIn." width="600" height="561" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Positioning. The three drafts are examples I wrote, not output from a model, and they have not been tested on real users.</figcaption></figure>

**Positioning.** The product takes a bare intent and writes it the way I actually speak to this person on this channel. My positioning statement is: for people who use AI to write messages but rewrite everything before sending, this is a relationship-aware message composer that drafts the way you actually speak to this person on this channel.

The best-fit customer is narrow: an operator, founder, recruiter or other relationship-heavy professional who keeps important relationships across at least three messaging channels, already drafts with AI, regularly rewrites those drafts because they sound wrong for the recipient, and is comfortable granting local read access to their history. I exclude autonomous outbound sales, customer-service bots and anyone who wants a new inbox.

The first-session proof I am after is small: one draft for one familiar person that feels recognisably different from a generic AI draft. It is not a claim that any user will pay.

---

## 02 · Why a generic draft gets rewritten

### What the research does and does not say

<figure><img src="/images/relationship-aware-voice/generic.png" alt="A stack of identical grey notes is crossed out while a pencil rewrites a warmer one." style="max-width:560px;width:100%;height:auto;background:transparent;"><figcaption>The rewrite tax. Watercolor-style metaphor; it implies no measured effect size.</figcaption></figure>

My motivation is a personal annoyance, which is not evidence. Here is what I found that bears on it.

**Sourced.** Researchers at Cornell ran a controlled study of 118 participants in India and the United States. Participants who received GPT-4o autocomplete suggestions wrote faster, but Indian participants had to edit the suggestions more and their writing drifted toward American norms. [Agarwal, Naaman and Vashistha, CHI 2025](https://arxiv.org/pdf/2409.11360); [Cornell Chronicle summary](https://news.cornell.edu/stories/2025/04/ai-suggestions-make-writing-more-generic-western). This shows that one-size-fits-all suggestions flatten style for a group. It does not show that people rewrite drafts for each relationship, and it studied cultural norms rather than recipients.

**Sourced.** In the LaMP benchmark, conditioning a model on a user’s own history improved results across its personalisation tasks, and choosing relevant profile items beat random ones. [Salemi et al., ACL 2024](https://arxiv.org/html/2304.11406v3). This supports retrieval from a user’s history as a technique. It does not test per-recipient message drafting, and its tasks are not chat replies.

**Sourced.** Hancock, Naaman and Levy define AI-mediated communication as a system that modifies, augments or generates messages on a communicator’s behalf. [Journal of Computer-Mediated Communication, 2020](https://socialmedialab.sites.stanford.edu/sites/g/files/sbiybj22976/files/media/file/hancock-jcmc-ai-mediated-communication.pdf). Khadpe and co-authors report two vignette studies (combined N=399) in which an AI-assistance label makes a message less diagnostic of the sender’s character: an AI-assisted apology reads as less warm than a self-written one, but an AI-assisted blame reads as less cold. [arXiv 2509.09645, AIES 2025](https://arxiv.org/abs/2509.09645). I read the abstract, not the full paper. The effect is a dampened signal, not a blanket penalty, and it concerns *labelled* assistance in vignettes, so it is thin support for my hypothesis below.

**Inference.** If recipients can sense an artificial voice, the cost of sounding like AI is highest with people who know you well. I have not seen a study that measures this directly. The decisive test in card 05 exists because this is still a hypothesis.

---

## 03 · One draft from four inputs

### The mechanism, and where it could fail

<figure><img src="/images/relationship-aware-voice/mechanism.svg" alt="Four inputs, baseline voice, channel conventions, relationship language and current context, produce one draft. The user edits and sends, and the edit updates the relationship profile." width="600" height="512" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Proposed design. No part of this pipeline has been built or measured.</figcaption></figure>

**Positioning.** The product builds a separate, evolving profile for each relationship and channel, using only my sent messages and my later edits:

`baseline voice + this channel's conventions + this relationship's language + current conversational context`

The flow is deliberately small. I open a conversation and type the intent, not the finished message. The product retrieves my sent examples for that person and channel and produces one draft, with an optional alternate and not six variants. I edit and send manually. The edit delta then updates that relationship’s profile locally.

**Assumption, with limits.** For a close contact, the sent history may hold enough examples. For a new contact, a recruiter or a rare channel, it will not, and the product must fall back to a channel profile and then to my baseline. I have not tested how sparse history degrades the draft. Identity resolution, meaning knowing that the same person is on WhatsApp and Slack, is a separate engineering problem that I treat as unsolved.

**Sourced boundary on the plumbing.** Beeper Desktop exposes a fully local API and a built-in MCP server on the user’s machine. Reading existing chats is local and unrestricted, history may be incomplete on a newly added account, and Beeper advises personal use only because sending too many messages might lead the networks to suspend the account. [Beeper Desktop API docs](https://developers.beeper.com/desktop-api/); [Beeper MCP docs](https://developers.beeper.com/desktop-api/mcp/). My design never sends, which sidesteps that warning for the prototype.

---

## 04 · Others are moving here, and I have no moat

### The honest alternatives and the honest power assessment

<figure><img src="/images/relationship-aware-voice/landscape.svg" alt="Matrix of alternatives against own-writing learning, per-channel, per-person and edit-learning, showing that none of the documented products conditions per person." width="600" height="548" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Reflects public documentation only. An empty cell means I did not find it documented, not that the capability is absent.</figcaption></figure>

**Sourced.** In May 2026 Google began rolling out a Gmail “Help me write” update that creates drafts matching “the tone and style of your previously written emails”, available on specified Workspace and Google AI plans. [Google Workspace Updates, 7 May 2026](https://workspaceupdates.googleblog.com/2026/05/improvements-to-help-me-write-in-gmail.html). Grammarly, now under the Superhuman brand, says its voice features detect your style and build a profile that evolves as you write, and that you can customise role and dialect. [Grammarly support](https://support.grammarly.com/hc/en-us/articles/23153676821773-Introducing-voice-features). Both are personal voice, which is exactly what my wedge claims generic tools lack.

**Inference.** The incumbents already learn *my* voice from *my* sent messages. My claimed difference is the unit of conditioning: person times channel, across apps. Neither source documents that, but a documented absence is thin protection. Gmail could extend its feature to recipients with little effort. A Beeper extension could do the same.

<figure><img src="/images/relationship-aware-voice/powers.svg" alt="Seven powers rated at MVP: counter-positioning weak, switching costs and process power possible, the rest absent or unproven." width="600" height="428" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>My qualitative rating, using the Seven Powers framework. It is a judgement, not a measurement.</figcaption></figure>

**Positioning verdict, which I will not soften.** There is no durable power at MVP. Switching costs and process power are possible only after the product has learned years of relationship-specific edits, and ethical exportability limits lock-in. The user’s history is a privileged input, but it belongs to the user. This is a compelling wedge and an open-source personal tool, not yet a defensible venture thesis.

**Bear case.** Big assistants add per-recipient conditioning, and the wedge becomes a feature. That is the strongest reason to treat the personal product as the cheapest way to learn, not the company.

---

## 05 · The cheapest decisive test

### Can per-person conditioning beat thread context alone?

<figure><img src="/images/relationship-aware-voice/test.svg" alt="Blind test design comparing a generic write-like-me draft with thread context against a relationship and channel conditioned draft, with advance and kill conditions." width="600" height="520" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Test design from my positioning file, plus an arithmetic note I added.</figcaption></figure>

**Positioning (the test).** Build a local prototype over the Beeper Desktop API that does not send messages. For five people across at least three channels, collect twenty real communication intents. Generate draft A with a generic “write like me” prompt plus recent thread context, and draft B with baseline voice, channel profile and relationship-specific examples. Blindly pick the more sendable draft, then edit the winner.

**Advance** if B wins at least 70% of blind choices and materially reduces time-to-send or editing over one week. **Kill or reshape** if recent thread context alone performs just as well. Willingness to pay is deliberately not the first gate.

**My arithmetic, not in the source.** The wording “twenty intents” is ambiguous. If the twenty are total, 14 wins out of 20 is 70% but a fair coin produces 14 or more about 5.8% of the time, so a single pass would not be strong evidence. If it means twenty per person, 70 wins in 100 would occur by chance about 0.004% of the time. I will pool picks and say so, but pooled picks from five people on overlapping contexts are not independent, so the quoted odds are optimistic and the gate is a screen, not proof. Raters should not know which draft is which, and I should not be the only rater.

**What would disprove the thesis.** B at or below parity with A, or a win that disappears once time-to-send is measured.

---

## 06 · The channel and the law can stop you

### The rules that shape what I may build

<figure><img src="/images/relationship-aware-voice/local.png" alt="A laptop holds a small padlocked jar of message bubbles inside a fence, while a crossed-out cloud sits outside." style="max-width:560px;width:100%;height:auto;background:transparent;"><figcaption>Keep the archive on the device. Watercolor-style metaphor of a design boundary I propose, not a verified privacy guarantee.</figcaption></figure>

**Sourced.** WhatsApp’s Terms of Service bar “bulk messaging, auto-messaging, auto-dialing, and the like” where impermissible, non-personal use without authorisation, and unauthorised or automated access, and say violations can lead to account suspension. [WhatsApp Terms of Service](https://www.whatsapp.com/legal/terms-of-service). I read no clause naming “unofficial apps” or “third-party clients” explicitly, and the Help Center page on unofficial apps was not checked; vendor blogs claim stronger bans, so I treat severity as uncertain. [Vendor overview](https://aiprofitlab.io/blog/en/2026-07-01-whatsapp-automation-rules/). Beeper’s own advice to use its API personally and sparingly is the safer primary source here. [Beeper Desktop API docs](https://developers.beeper.com/desktop-api/). My consequence: the personal product stays a human-in-the-loop drafter and never auto-sends.

**Sourced.** Meta’s terms for the WhatsApp Business Platform (section 4.7, “AI Providers”, page last modified 23 September 2026) say providers of AI technologies, including large language models, generative AI platforms and “general-purpose artificial intelligence assistants”, are “strictly prohibited” from using the platform when the AI is the primary offering; Meta alone decides who counts. A business may retain an AI provider as its Solution Provider, but platform data may not be used to train or improve AI models, and fine-tuning for the business’s exclusive use is allowed. [Meta Terms for WhatsApp Business Platform](https://www.facebook.com/legal/Meta-Terms-for-WhatsApp-Business-Platform). The dates (new users 15 October 2025, existing users 15 January 2026) and the carve-out for ancillary support and sales bots come from a vendor reading and are not in the terms text I read. [respond.io explainer](https://respond.io/blog/whatsapp-general-purpose-chatbots-ban). For the business version this is a real gate: a stage-aware sales desk must stay ancillary to the customer’s own service and avoid training on their data, and Meta’s discretion is the risk. Meta also moved to per-message pricing on 1 July 2025. [Meta pricing page](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing). A secondary source says service messages become billable from 1 October 2026; I could not confirm that, so I do not rely on it.

**Sourced.** Singapore’s PDPC issued Advisory Guidelines on personal data in AI recommendation and decision systems on 1 March 2024; the PDPC’s own text says they are advisory and not legally binding. [PDPC guidelines (PDF)](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/advisory-guidelines-on-the-use-of-personal-data-in-ai-recommendation-and-decision-systems.pdf). Law-firm summaries say they do not address generative AI; that text never mentions it, which is consistent but not a statement I verified as exclusion. [Bird & Bird summary](https://www.twobirds.com/en/insights/2024/singapore/pdpc-advisory-guidelines-on-the-use-of-personal-data-in-ai-recommendation-and-decision-systems). **Inference:** a tool that reads other people’s messages on my device and drafts for me sits in a grey area I have not had a lawyer assess. Counsel should review before any business customer’s chats are processed.

---

## 07 · The sibling market is a different company

### WhatsApp-first service firms and a stage-aware sales desk

<figure><img src="/images/relationship-aware-voice/shopfront.png" alt="A shopfront with a speech bubble at the top of a small staircase and a stick figure at the bottom step." style="max-width:560px;width:100%;height:auto;background:transparent;"><figcaption>A sale climbs stages. Watercolor-style metaphor; no stage data is shown.</figcaption></figure>

**Interviews, and a correction I owe.** My notes record two interviews. The Moses interview concerns **Respond.io Enterprise**, not SleekFlow: he found it effectively stateless for his consultative-sales agent workflow. The explicit SleekFlow replacement signal comes from a separate interview with Amos and Zames of Repair.sg: disappearing chats and shared-inbox bugs, 150–200 leads a day, a 30–60 second reply that can improve closing, agents losing context when they switch queues, and a stated willingness to pay SGD 3k+ a month if an AI solution actually works. These are two interviews. They cannot establish how common any of this is, and I have not re-verified the statements.

**Positioning.** The personal and SMB products share an engine (identity, memory, style learning) but not a market position. Personal: how I speak to this person here. SMB: how this business should speak to this customer, and what stage the sale is in. My category for the second is an AI sales desk for WhatsApp service businesses, starting as a conversation audit and drafting layer on top of the existing inbox, not a replacement. In the demo, a bare “how much is P4 Math?” should trigger a diagnostic question and withhold the full price list.

<figure><img src="/images/relationship-aware-voice/price.svg" alt="Bars comparing respond.io plan prices of 79, 159 and 279 US dollars a month against a stated willingness to pay of roughly 2,100 to 2,400 US dollars." width="600" height="440" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Respond.io prices: its pricing page on 20 November 2026. Willingness to pay: one interviewee, converted at an assumed 0.70–0.80 US dollars per SGD.</figcaption></figure>

**Sourced and inference.** Respond.io lists Starter, Growth and Advanced at US$79, US$159 and US$279 a month on yearly billing, with AI agents on Growth and above and WhatsApp fees extra. [respond.io pricing](https://respond.io/pricing). At my assumed exchange rate the stated willingness to pay is roughly 8 to 30 times those plans. That says an owner thinks reply quality is worth far more than an inbox seat; it is one person’s conditional statement, not a market price. SleekFlow is an established competitor in this space, with a reported US$7 million Series A+ in August 2024. [Funding announcement](https://www.media-outreach.com/news/singapore/2024/08/21/319195/sleekflow-secures-us7m-with-atinum-investment-to-propel-global-expansion-ai-tech-innovation/). The same press release gives US$15 million total raised while Crunchbase and PitchBook give higher figures, so I do not quote one total.

**Reach.** WhatsApp is used monthly by about 80% of Singaporeans according to DataReportal’s 2025 Singapore report as relayed by secondary sources. [We Are Social](https://wearesocial.com/sg/blog/2025/02/digital-2025-top-digital-and-social-media-trends-in-singapore/). That supports the channel, not the sales-desk demand.

**Counter-positioning, conditionally.** SleekFlow and respond.io are horizontal products that must stay configurable for many industries. A deliberately opinionated, narrow product can plausibly differ, but only while it stays narrow. A generic “AI shared inbox” would give that up.

---

## 08 · Execution: a ladder of four gated stages

### What I build first, and how each stage earns the next

<figure><img src="/images/relationship-aware-voice/stages.svg" alt="Four nested stages: personal composer, conversation audit, drafting layer and AI sales desk, each with a gate." width="600" height="556" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Proposed sequence. The Stage 0 and 1 gates come from my source files; the Stage 2 and 3 gates are my proposals.</figcaption></figure>

**Stage 0 · Personal composer (open source, local).** It runs the card-05 test. It earns evidence and a public artefact, not revenue. **Gate:** B wins at least 70% of pooled blind picks and time-to-send falls. If not, I stop or reshape, and I do not build the SMB layer on a voice claim that failed.

**Stage 1 · Conversation audit (paid service).** For each of Moses and Repair.sg, take 100 historical WhatsApp conversations and report open or closed status, inferred sales stage, missed or late follow-ups, premature pricing, a suggested next reply and an escalation recommendation. The owner or team lead grades accuracy and identifies revenue-relevant misses. **Gate:** the report finds important issues they had not already seen, and suggested replies consistently reflect their actual playbook.

**Stage 2 · Drafting layer.** Draft the next reply inside the existing inbox, human-approved, plus a daily owner report on response time, open conversations and stage leakage. **Gate (my proposal):** draft acceptance and stage accuracy rated by the customer, and a renewal.

**Stage 3 · AI sales desk.** Stage-aware policy and a supervisor console. Replacing the inbox is an expansion path, considered only if customers prefer the intelligence layer enough to leave their existing one.

**Precedent, with limits.** Beeper began as a multi-network messaging app and Automattic bought it in April 2024 for a widely reported but undisclosed $125 million, after buying Texts.com the previous year. [TechCrunch](https://techcrunch.com/2024/04/09/wordpress-com-owner-automattic-acquires-multi-service-messaging-app-beeper-for-125m/). That shows buyers pay for messaging plumbing. It does not show that a drafting layer can be bought or built into a company, and I did not find a clean precedent for service-to-product in this niche.

---

## 09 · Execution: the first ninety days

### Concrete actions, and what each produces

<figure><img src="/images/relationship-aware-voice/ninety.svg" alt="Three phases over thirteen weeks: build the test, run it and start audits, decide and sell." width="600" height="740" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Proposed plan. No outreach, recruitment or build has taken place.</figcaption></figure>

**Weeks 1–4 · build the test.** I build the read-only local prototype over the Beeper Desktop API. I recruit five participants who each use at least three channels, and I collect twenty real intents from each. Owner: me alone. Budget (assumption): model usage and a small participant thank-you; I have no sourced figure.

**Weeks 5–8 · run it and start the audit conversation.** Run the blind A/B with pooled picks and keep a one-week log of edits and time-to-send. In parallel I ask Moses and Repair.sg for 100 chats each for a graded audit. The commitment I ask for is small: chat exports and an hour of grading time, not a contract.

**Weeks 9–13 · decide and sell.** Apply the 70% gate. If it passes and an audit finds something new, ask one owner for a paid human-approved drafting pilot. If it fails, write up the null result.

**Evidence produced:** a blind-choice table, an edit-time log, two graded audits, and either a signed pilot request or a documented kill.

---

## 10 · Execution: buyers, credibility and people

### Who I reach, how a newcomer earns trust, and who I hire

<figure><img src="/images/relationship-aware-voice/buyers.svg" alt="Three panels: first buyers and the ask, how credibility is built, and the first team roles." width="600" height="552" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Proposals, not findings.</figcaption></figure>

**Buyers and reach.** The best-fit SMB customer is an owner-led service business where WhatsApp is the main lead channel, volume is at least dozens of enquiries a day, the sale needs diagnosis before a price, juniors cannot reproduce the owner’s judgement, and speed affects conversion. Examples in my notes are tuition, home services, clinics and beauty. Simple FAQ businesses and high-volume transactional shops are excluded. The warm paths are the two interviewees and their peers. The ask is always graded evidence first, then a pilot.

**Credibility.** A newcomer here has no track record, so the method must be public. I publish the blind-test design, the numbers and the null results, and open-source the local composer. I show exactly where the data boundary sits: the archive stays on the machine. For SMB I insist on design partners who grade outputs rather than merely try them. I would also ask whether SleekFlow or respond.io accept third-party integrations. I have not checked their partner programmes.

**Team and knowledge.** I must learn how consultative sales is actually structured in one vertical, how evaluation of conversation quality is done, and the WhatsApp Business Platform rules. First additions: a conversation-quality evaluator, an advisor with inbox-product experience, and later an integration engineer. I have no sourced hiring market data. A co-founder with sales-operations depth would complement my technical background (assumption).

---

## 11 · Execution: money, payout, stop rules and what I do not know

### How a founder gets paid at each stage

<figure><img src="/images/relationship-aware-voice/gates.svg" alt="Table of money sources, founder payout and stop rules for each stage, with an assumed break-even of three to four customers." width="600" height="626" style="max-width:600px;width:100%;height:auto;background:transparent;"><figcaption>Stop rules are proposals with numbers set in advance. The break-even is arithmetic on assumed costs.</figcaption></figure>

**Capital path.** Stage 0 costs savings and my time. Stage 1 revenue should come from audit fees; I set no price because I have no evidence for one. Singapore’s Enterprise Singapore replaced the EDG, PSG and MRA grants with an EDGE Grant on 30 September 2026; the EnterpriseSG page I read confirms that EDG, MRA and PSG ceased on 29 September 2026 in favour of the EDGE Grant and that the legacy page lists at least 30% Singaporean or PR ownership as a condition. [EnterpriseSG](https://www.enterprisesg.gov.sg/financial-support/productivity-solutions-grant). That same legacy page shows support of up to 50% of eligible costs capped at S$30,000, not the S$100,000 that blog summaries quote, and I have not found the EDGE Grant’s own terms, so I treat the amount as unknown. Angel or venture money comes later and only after renewals. Given card 04, I would not raise on the personal product alone.

**Founder payout.** Realistically, I am paid by service and pilot fees at Stages 1 and 2, then salary and equity at Stage 3. A return from a sale depends on the power question in card 04. **Illustrative arithmetic (assumed costs):** at SGD 3,000 a month per customer, SGD 500 to 1,200 cost to serve and a SGD 6,000 monthly founder wage, three to four paying firms cover the wage. Only the SGD 3,000 comes from an interview; the rest is assumption.

**Stop and go.** Stop at Stage 0 if B does not reach 70% pooled blind wins or A is about equal to B. Stop at Stage 1 if no owner finds a new issue. Stop at Stage 2 if acceptance is low, stage errors are material, or there is no renewal.

**What I do not know.**

| Question | Status |
|---|---|
| Do people rewrite AI drafts per recipient, and how much? | Personal observation; not studied |
| Does B beat A on blind choice? | Untested; cheapest test defined |
| Can incumbents add per-recipient conditioning? | Plausible; no evidence either way |
| Is SMB demand common? | Two interviews; segment prevalence unknown |
| Can stage accuracy be good enough? | Unknown; the central risk |
| Is the privacy and WhatsApp-terms position acceptable? | Not legally reviewed |
| What do consumers pay for a personal composer? | Not researched; deliberately not the first gate |

**Sources versus positioning, in one line.** Cards 02, 04, 06 and 07 hold the sourced facts. Cards 01, 03, 05 and 08 to 11 are my positioning and plan. The full ledger is in the research dossier for this Fieldbook.
