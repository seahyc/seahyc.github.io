+++
title = "A Home for Software That Changes"
slug = "a-home-for-software-that-changes"
description = "The malleable software opportunity: a company-approved home where employees can reshape their tools—and a founder must earn the right to maintain them."
date = 2026-11-02
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# A HOME FOR SOFTWARE THAT CHANGES

<div style="grid-column: 1 / -1; width: 100%; min-width: 0;">
<p style="font-size: max(17px, 1rem); line-height: 1.58;"><strong>A founder’s Fieldbook · 2 November 2026 · Seah Ying Cong</strong></p>
<p style="font-size: max(17px, 1rem); line-height: 1.58;">Imagine a customer-operations manager changing her team’s software as easily as she changes a spreadsheet. She describes the exception queue she needs, tries it with safe examples, and shares it with her colleagues. Next month, when the process changes, she reshapes the tool herself.</p>
<p style="font-size: max(17px, 1rem); line-height: 1.58;">I want that future. The company should give her a place where doing this is ordinary: connected to approved data, bounded by real permissions, and supported after the first successful demo.</p>
<figure style="max-width: 600px; margin: 1.5rem auto;">
<img src="/images/malleable-software/promise.svg" alt="The proposed loop from an operator’s request through an approved company environment to a maintained team tool." width="600" height="400" style="width: 100%; height: auto;">
<figcaption style="font-size: max(15px, .85rem); line-height: 1.45;"><em>Original concept diagram. Proposed experience, not demonstrated demand.</em></figcaption>
</figure>
<p style="font-size: max(17px, 1rem); line-height: 1.58;"><strong>Working thesis:</strong> the opportunity is a maintained home for adaptable workplace software. Hosting and governance already have formidable suppliers. A new company must prove that it can make one class of employee-built tools survive real changes at a price customers will renew.</p>
</div>

## 01 · The possibility

### Let the person who knows the work shape the tool

Consider an illustrative workflow. A customer-operations team reviews account handovers. The CRM has the records, a spreadsheet holds local rules, and a manager keeps a mental list of exceptions. Someone copies fields between screens because the official application does not quite represent how this team works.

The promising product begins with that person’s knowledge. “Show handovers missing an owner, let me explain the exception, and prepare a correction for review.” The employee sees a working preview, supplies awkward examples, and adjusts the behavior. Engineering has approved a small set of data operations once; it does not need to build every new view.

That is the attraction of **malleable software**: people can continually adapt tools to their circumstances. Ink & Switch’s research argues for this gradual movement from user to creator, including shared creation and tools that compose. Generating an isolated app is only part of the vision. The resulting tool must remain understandable and changeable where the work happens. [Ink & Switch, June 2025](https://www.inkandswitch.com/essay/malleable-software/)

My founder question is concrete: **should we build the company-approved home for those tools, beginning with customer-operations exception workflows?** The workflow and customer segment are proposals. We have not yet established demand.

## 02 · What changed

### Writing an extension is becoming easier than operating one

Natural language offers a new way to express small software changes. Existing builders already turn descriptions into applications, tables, interfaces, and workflows. Airtable’s Omni, for example, documents creating and revising supported app components through conversation. That establishes a product direction; it does not tell us how many employees can independently create a reliable tool. [Airtable app building](https://www.airtable.com/platform/app-building)

Jeremy Morrell proposes an architectural complement: keep a dependable core application, then let generated extensions handle particular needs inside constrained execution environments. This avoids asking the central product to absorb every local variation. His essay is a useful engineering argument, rather than evidence of a new market’s size. [Morrell’s extensible-software essay](https://jeremymorrell.dev/blog/extensible-software-in-the-age-of-llms/)

The bottleneck can move. After the first app works, someone must decide which records it may read, whether its answer is correct, who can share it, and what happens when its creator leaves.

**My inference:** cheaper authoring could create more software whose lifetime exceeds its author’s attention. Whether that becomes a profitable new business depends on the frequency and cost of those problems. More generated code alone does not establish either.

## 03 · The mechanism

### Put authority beneath the generated code

A useful operating environment separates the employee’s app from the authority to affect company systems. The app can rearrange a view or calculate a result. The trusted platform decides whether a particular person may perform a particular operation on a particular record.

![Three separate boundaries: untrusted app, trusted action authorization, authoritative business system.](/images/malleable-software/boundaries.svg)

*Proposed architecture, informed by documented capability-based runtime controls. It has not been implemented or security-tested for this Fieldbook.*

A **capability** is a narrow permission made callable: “read these approved account fields” or “prepare an owner-change request.” It is more restrictive than giving generated code a general CRM credential. The host keeps secrets and enforces the operation’s scope.

Cloudflare Dynamic Workers documents disabling outbound networking and supplying explicit bindings to trusted operations. Those primitives are available to buy or build upon. Their availability reduces the need to invent another execution engine. [Egress controls](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/) · [Custom bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/)

The difficult product work is making the permissions match the organization’s meaning: the current actor, allowed fields, records, actions, sharing rules, and approval boundaries.

## 04 · The hard reality

### A sandbox can contain a perfectly wrong answer

Isolation and business correctness answer different questions. An app may stay inside every permission boundary and still put the wrong accounts into an escalation queue. A required review may exist, while the preview hides the consequence the reviewer needs to understand.

For the handover example, I would require an explicit business rule: every account in the approved input appears exactly once, an account without an owner is visibly flagged, and proposed corrections do not silently change source records. Test cases should include duplicates, missing fields, stale data, and records the viewer cannot access.

Static code checks and automated security scans can catch useful classes of mistakes. They do not establish that this queue represents the company’s process correctly. Lovable’s own documentation makes a calibrated distinction: its security tools support development, while app owners retain responsibility for use-case security and review. [Lovable security overview](https://docs.lovable.dev/features/security)

The platform also needs to constrain browser rendering, exported files, logs, model calls, and sharing. Blocking server-side Internet access does not by itself make every output safe. A narrow API is helpful only when its implementation checks the right authority and its results cannot travel through a less restricted path.

## 05 · The closest alternative

### Cloudflare already built much of the imagined home

Cloudflare OS is unusually close to this idea. Its public launch describes modifiable full-stack personal apps, isolated execution, durable app state, and sharing. Service-specific Gatekeepers mediate access to external systems and retain credentials. The design also considers what happens after an agent reads sensitive information, including who may view the resulting work. [Cloudflare OS launch](https://blog.cloudflare.com/cloudflare-os/)

This matters more than another list of sandbox providers. A founder cannot reasonably claim that nobody has assembled a workspace, generated apps, permissions, and hosting. An openly available implementation also gives capable enterprise teams another starting point. [Public repository](https://github.com/cloudflare/cloudflare-os)

These sources establish an offered architecture. They do not establish the maturity, deployment effort, connector fit, or service guarantees a particular buyer will experience. Those need a real evaluation.

I would make that evaluation part of customer discovery. If Cloudflare OS plus modest configuration satisfies the target department, the opportunity may be implementation and support. That can be a worthwhile business, but a venture platform thesis would still need evidence of reusable product value beyond the underlying platform.

## 06 · The competitive map

### The buyer already has places to go

![A comparison of documented propositions from Retool, Cloudflare OS, enterprise low-code suites, and AI app builders.](/images/malleable-software/competition.svg)

*Capability comparison as of 2 November 2026. These are vendor-documented propositions, not a hands-on scorecard or feature-parity claim.*

Retool’s June announcement directly challenges the independent-hosting wedge: applications built with other tools can deploy into Retool and inherit resource permissions and audit trails. Its October 28 app-builder release adds current evidence of source-control and environment-management investment. Compatibility and migration effort still need testing. [June announcement](https://retool.com/newsroom/retool-extends-enterprise-governance-to-vibe-coded-apps) · [October GA](https://docs.retool.com/changelog/app-builder-ga)

Replit advertises enterprise identity, audit and execution controls. Lovable advertises separate editing, approval, and publishing permissions. These are serious competing propositions, even though a feature page cannot prove correct behavior in a buyer’s environment. [Replit Enterprise](https://replit.com/enterprise) · [Lovable security](https://lovable.dev/security)

The implication is uncomfortable and useful: **hosting, a prompt box, single sign-on, and logs are an entry ticket.** A new company needs a buyer-specific reason to exist after those alternatives are on the table.

## 07 · The distribution problem

### An existing procurement relationship is a product feature

Microsoft’s Managed Environments already offers centralized administration and controls; Power Platform pipelines address governed movement from development toward production. Google AppSheet licensing includes Core in many Workspace plans, with additional organization features at other tiers. These are not claims that every ordinary suite seat includes every enterprise control. [Managed Environments](https://learn.microsoft.com/en-us/power-platform/admin/managed-environment-overview) · [Pipelines](https://learn.microsoft.com/en-us/power-platform/alm/pipelines) · [AppSheet licensing](https://support.google.com/appsheet/answer/16563370?hl=en)

My inference is that the startup’s real competitor is often an incumbent plus an internal administrator. The buyer already understands that supplier’s identity system, purchasing process, and support route. A cleaner demo must overcome switching and operational costs.

There is also an organizational tension. The employee wants a tool today. IT wants a manageable estate. A department leader wants the work to improve without inheriting an informal software team. Security may approve the platform without owning the budget.

The founder must identify all three roles: **creator, economic sponsor, and operating owner.** Selling only to the enthusiastic creator risks an orphaned experiment. Selling only to security risks a control product that nobody chooses to use.

## 08 · The initial customer

### Start where exceptions are frequent and consequences are bounded

My proposed starting segment is a service company with roughly **100–1,000 employees**, an operations department, and a backlog of small internal tools. That size range is a prospecting assumption, not measured market evidence. Singapore and Southeast Asia would be an access strategy for initial interviews, rather than a claim of uniquely favorable regional demand.

Begin with a customer-operations exception queue: handovers lacking required information, inconsistent ownership, or records needing human review. The first version reads approved fields and stages suggested corrections. It does not autonomously move money, make employment decisions, or rewrite the system of record.

This wedge is attractive as a hypothesis because an operator can explain the rules, show existing manual work, and inspect errors. The same class of queue may recur across teams. It is unattractive if each company needs a fundamentally different integration and maintenance service.

The likely sponsor is the operations leader, paired with a business-systems or platform owner who can approve data access and accept the running tool. Validate that pairing against actual budget decisions. A CISO’s concern does not establish purchasing intent, and public vendor materials do not establish willingness to pay.

## 09 · The product contract

### Make the next change as legible as the first build

![The proposed release loop: describe a change, preview safe examples, approve a version, detect drift, and repair.](/images/malleable-software/lifecycle.svg)

*Original process design. Version rollback cannot reverse a message already sent or a record already changed; external effects need separate recovery procedures.*

The employee’s path should be simple: open the existing tool, describe what should change, inspect examples, and share the approved version. Permissions requests should name the real operation and scope: “read handover status for this team,” rather than an opaque list of technical privileges.

Behind that experience, each tool needs a named business owner, authorized users, version history, examples of expected behavior, data dependencies, spending limits, and a way to suspend it. When a field changes or an integration fails, the owner should see what stopped and which work needs attention.

The proposed promise is **a maintained workflow with a visible owner and recovery path**. The platform should make claims only within a defined support scope. “AI will fix it” is not an operating contract. Repairs need the same permission and behavior checks as other changes; consequential writes should stop when those checks fail.

## 10 · Where to build

### Own the workflow’s meaning before owning its compute

I would initially use an existing runtime and a narrowly approved set of connectors. The product would own the workflow definition, examples, authorization mapping, release record, and repair process. Choosing a new language or building a new isolation engine would consume effort before proving those are customer bottlenecks.

There are two different companies hiding in this architecture. One sells a workplace platform to enterprise IT and department leaders. The other sells an embedded extension layer to SaaS vendors, letting those vendors’ customers customize a product. The second buyer cares about developer integration, tenant boundaries, and its own product roadmap. It deserves a separate sales motion and validation effort.

This Fieldbook chooses the first. A practical pilot may even run on an incumbent platform. If the startup cannot add enough value there, moving to proprietary hosting will not repair the proposition.

Keep the initial supported surface small: one workflow family, a limited data schema, explicit read operations, and approval-gated changes. Arbitrary imported applications expand the support promise dramatically. Generality should follow repeated customer evidence rather than arrive as a launch requirement.

## 11 · What the headline omits

### Someone still pays for the software estate

The attractive headline is “every employee becomes a builder.” The omitted questions determine the company: how many resulting tools are used repeatedly, how much time they save, how often they break, and how many people must help them survive.

App count is a poor success metric. A hundred unused tools can create more inventory and access-review work than value. A small number of frequently used tools with clear owners may be a much healthier estate.

Measure the whole workflow: operator time, manager review, engineering interventions, security review, connector upkeep, incident response, and retirement. Track false positives and missed cases in the exception queue. Savings that merely transfer work to a platform engineer are not savings for the company.

There is a plausible repeatability advantage in reusable connectors, permission patterns, and behavior tests. There is also a plausible services trap: every local exception becomes a custom support obligation. Neither outcome is established by the current research. The evidence we need is actual change and repair history, followed by paid use.

## 12 · The economic test

### Human maintenance can erase cheap-compute margins

Suppose a customer pays **$1,500 per month**. Assume **$150** for runtime, model usage, and observability, and a fully loaded recurring support cost of **$75 an hour**. All are illustrative inputs; none is a verified customer quote or measured workload cost.

![Illustrative contribution falls from $1,200 to $900 to $150 as recurring support rises from two to six to sixteen hours.](/images/malleable-software/economics.svg)

*Scenario arithmetic, USD/customer/month. Contribution excludes acquisition, R&D, central overhead, tax, and an incident reserve.*

The equation is revenue minus infrastructure minus recurring support. At two support hours, contribution is **$1,200, or 80%**. At six, it is **$900, or 60%**. At sixteen, **$150, or 10%**. These are contribution scenarios, not reported software gross margins.

This suggests a starting offer to test: a department subscription covering a bounded set of maintained workflows, with explicit usage limits and separately priced onboarding. Charging mainly for generated apps could encourage the wrong behavior. The renewal conversation should concern useful work and the cost of keeping it reliable.

## 13 · Sensitivity and scale

### Earn repeatability before describing a market size

In the six-hour scenario, doubling the infrastructure allowance to $300 reduces contribution to **$750, or 50%**. Cutting the monthly price to $1,000 while retaining the original costs leaves **$400, or 40%**. Raising it to $2,000 leaves **$1,400, or 70%**. Those are arithmetic sensitivities, not a pricing recommendation.

Add an assumed 20-hour onboarding project at $75/hour: **$1,500** before recurring support. If that onboarding is uncharged, twelve months at the $900 contribution case leaves **$9,300**. Subtract an illustrative $6,000 acquisition cost and $3,300 remains before other fixed costs. Cash payback on acquisition plus onboarding is about **8.3 months**, assuming immediate steady revenue and no churn.

A bottom-up market model should count companies with a qualifying workflow, reachable sponsors, approved data access, acceptable implementation effort, and demonstrated willingness to renew. Multiplying all knowledge workers by a hypothetical subscription would skip every binding condition.

The scalable asset would be recurring workflow structure: adapters, permission contracts, tests, and recovery procedures that transfer between customers. If support does not decline with reuse, plan and price a specialist service honestly.

## 14 · The first proof

### Ask for working history, then ask for money

For the first 30 days, I would interview **12 people across four target companies**, requesting the last three small internal tools they actually used. These are proposed research targets. Observe the last change, last failure, owner handover, and repair effort. Include companies already using Retool, Power Platform, AppSheet, or AI builders.

Then offer a **90-day paid pilot in three firms** for one bounded workflow family. Record the existing process first. Compare the proposal against configuring the customer’s current supplier, including procurement, implementation, approval, and maintenance costs. A faster greenfield demo is an insufficient comparison.

Proposed continuation gates: at least **two of three firms renew at $1,500/month**, each renewing firm uses at least two tools repeatedly, recurring support is at most four hours per firm per month, and net operator time falls by at least 30% after review and repair effort. These are demanding founder-selected thresholds, not industry benchmarks.

Deliberately test forbidden reads, writes, and sharing paths. Any observed boundary violation pauses rollout. Passing a finite test set is a necessary pilot gate, not a security guarantee. Log creator dependence too: a workflow maintained entirely by the founder has not demonstrated employee malleability.

## 15 · A 12–24 month attack plan

### Work backward from a tool that survives its creator

![Three phases from paid pilots to repeatable workflows and, conditionally, a broader platform.](/images/malleable-software/roadmap.svg)

*Proposed sequence. Expansion depends on observed customer results, not the passage of time.*

**Months 0–3:** the founder owns discovery and the incumbent comparison. A technical lead owns a narrow permission boundary and adversarial tests. Department sponsors own the baseline work measurements. Deliver three paid pilots with named operating owners and recorded change histories.

**Months 4–12:** repeat the winning workflow family. Track renewal cohorts, onboarding hours, creator independence, time to approve a change, repair burden, and failed business checks. Expand connector scope only when it unlocks repeated demand. The milestone is repeatable delivery with improving contribution, rather than a large app catalog.

**Months 13–24:** consider a broader platform if several customers reuse the same policy, testing, and ownership machinery. Add adjacent departments through existing sponsors. A cross-runtime layer becomes attractive only if customers insist on keeping multiple builders and will pay for common maintenance above them.

The ambition is substantial: a company in which useful software can evolve close to the work. The route starts with one recurring job and evidence that the operating burden can be shared economically.

## 16 · The bear case and the decision

### A valuable future does not guarantee a new platform company

The strongest objection is that incumbents absorb the remaining job. Retool already competes on governed deployment across builders. Cloudflare supplies a close architectural starting point. Suite vendors have distribution; app builders keep adding lifecycle controls. They can also add the behavior checks and ownership workflows proposed here.

A second objection is that the customer’s real need is process clarity or a skilled administrator. If employees cannot specify examples, sponsors will not own outcomes, or integrations remain bespoke, the startup may become a software agency with platform branding. A third is simple economics: small tools can be valuable without supporting enterprise acquisition and support costs.

I would stop the broad platform thesis if existing products solve the chosen job acceptably, if paid pilots do not renew, or if human repair effort stays too high. A narrower implementation business or an embedded SaaS component might still merit its own investigation.

**My decision: pursue the narrow paid experiment.** Commit to the future of adaptable workplace software; remain willing to change the product and company structure. The right to build a platform comes from demonstrating that employees can change useful tools while the organization can continue to trust and operate them.

## 17 · Evidence and open questions

### What this edition establishes—and what it leaves open

This edition combines public primary sources with a founder’s proposed product, economics, and validation plan. Private conversations and an existing Gemini Deep Research report were discovery inputs. They are not published evidence, customer endorsements, or proof of purchasing intent. No private message text or company operational data is reproduced.

**Established from public documentation:** malleable software is an articulated design direction; constrained execution primitives exist; multiple vendors already offer app creation, hosting, governance, and lifecycle machinery. Product pages establish advertised features, not independently tested effectiveness.

**Still unverified:** target-company demand, employee completion rates, adoption, willingness to pay, actual infrastructure bills, maintenance frequency, security effectiveness, connector effort, retention, and competitor total cost. No customer interviews, hands-on competitor trials, production deployment, or penetration test were conducted for this research. No paywalled claim is needed for the argument.

**Source and assumption trail:** the directly linked sources sit beside their claims. All scenario amounts are USD and explicitly assumed; support hours are per customer per month. Contribution = subscription − runtime/model/observability allowance − support hours × loaded hourly cost. The next evidence should be app histories, measured baseline workflows, an incumbent comparison, and paid renewals.

The unanswered question is precise: **when a team reshapes its software, who can keep the resulting tool dependable—and will the team pay enough for that responsibility to become a repeatable business?**
