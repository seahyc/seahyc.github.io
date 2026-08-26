+++
title = "Airbnb for AI Compute"
description = "An operator-first fieldbook on Darkbloom, heterogeneous hardware, cybercafés, and the next inference layer."
date = 2026-08-26
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
aliases = ["/research/distributed-inference/"]
+++

# AIRBNB FOR AI COMPUTE

## The cloud is moving into the rooms we already own

### An entrepreneur's field guide to Darkbloom, heterogeneous hardware, cybercafés, and the next inference layer

![Fieldbook plate: distributed inference supply](/images/darkbloom-fieldbook.png)

**Research edition · 26 August 2026**  
Prepared as an independent market investigation

> **Working thesis**  The opportunity is larger than idle Macs, but the winning company is unlikely to be a generic decentralized GPU marketplace. The stronger opportunity is a trust-aware operating layer for managed, distributed inference fleets.

---

## The signal in the noise

Hiten Shah’s observation is simple: computers people already own are becoming part of the inference layer. Darkbloom is the clearest live example—a network routing inference to hardware-verified Apple Silicon machines, with an OpenAI-compatible API and provider payouts.

The underlying market is not “cheap AI compute” in the abstract. It is the intersection of four forces:

1. **Inference demand is expanding faster than centralized capacity can comfortably absorb.**
2. **Inference prices are falling, making utilization and cost structure decisive.**
3. **Open-weight models are good enough for a widening set of repetitive workloads.**
4. **A growing number of organizations want stronger control over where sensitive prompts execute.**

The entrepreneurial question is therefore:

> Can distributed hardware provide sufficiently cheap, sufficiently trusted inference for workloads that do not need frontier quality or data-center-grade latency?

---

## 01 · What is already proven

### OpenRouter is a demand observatory

OpenRouter’s 2025 State of AI study analyzed more than **100 trillion tokens** across **300+ active models** and **70+ providers**, serving millions of developers and end users. More than half of usage originated outside the United States. Its data includes model, provider, token, timing, latency, streaming, cancellation, and tool-calling metadata.

That makes OpenRouter the most useful public window into real multi-model demand—not a survey of intentions, but observed API behavior.

OpenRouter currently says it routes requests across **80+ providers** and exposes providers to **10M+ developers**. Routing is performance-based: price, latency, throughput, uptime, and feature support determine traffic allocation.

**Implication:** the demand side already exists. The unanswered question is which portion of that demand will accept distributed execution.

### Darkbloom has crossed from demo to marketplace

OpenRouter’s public provider table currently lists Darkbloom with two models and live token activity. The numbers are live and may use rolling windows, so they should not be compared mechanically with Darkbloom’s cumulative public claims. But the important fact is qualitative: Darkbloom is receiving billable marketplace traffic rather than only serving free test requests.

OpenRouter’s provider onboarding says:

- providers are paid through monthly invoicing;
- high-performing providers receive more traffic;
- providers below 80% uptime may be used only as fallback;
- TTFT, throughput, and uptime are publicly tracked.

**Paid provider means:** OpenRouter has accepted Darkbloom as an upstream inference endpoint and is routing real customer requests to it. It does **not** mean OpenRouter guarantees demand, profitability, enterprise SLAs, or privacy equivalence with a hyperscaler.

> **Diligence flag**  OpenRouter’s public provider table currently labels Darkbloom “Retains prompts,” while Darkbloom markets operator-blind privacy. That may reflect different layers of the architecture or a classification mismatch, but it needs to be reconciled before selling strong confidentiality claims.

---

## 02 · The demand map

### The right customer does not need the best model

Distributed inference is most attractive when the job is valuable, repetitive, and tolerant of some latency.

| Workload | Model need | Latency tolerance | Fit |
|---|---|---:|---|
| Document extraction | Small to medium open models | High | **Excellent** |
| Support-ticket classification | Small specialized models | High | **Excellent** |
| Internal search and summarization | Medium models | Moderate | **Good** |
| Coding-agent sub-tasks | Medium reasoning models | Variable | **Good** |
| Synthetic-data generation | Open models | High | **Good** |
| Model evaluation | Many parallel calls | High | **Good** |
| Real-time voice | Small, fast models | Very low | Weak |
| Frontier chat | Best available models | Low | Weak |
| Model training | Large clusters | N/A | Poor |

The demand wedge is not “users accept worse AI.” It is:

> Users want good-enough intelligence, at high token volume, without sending every request through a conventional API provider.

Stanford’s AI Index documents dramatic declines in the cost of achieving a given level of model performance. That expands the addressable market for smaller models: more workflows can use a 7B–30B model without a visible quality failure.

### The likely early buyers

- AI startups with privacy-sensitive customer data
- Teams running open-weight models in production
- Batch-processing companies
- Developers building agents with heterogeneous task difficulty
- Enterprises needing regional or organizational control
- Model-evaluation and synthetic-data teams

The commercial wedge should begin with **batch and privacy-sensitive inference**, not real-time consumer chat.

---

## 03 · The supply map

### 100 million Macs is an upper bound, not a market size

Darkbloom cites more than 100 million Apple Silicon machines shipped since 2020. The useful supply is the intersection of memory, idle time, connectivity, willingness, and reliability.

| Filter | Scenario | Remaining pool |
|---|---:|---:|
| Apple Silicon shipped | 100M | 100M |
| Still active | 70–85% | 70–85M |
| Online during idle windows | 30–50% | 21–43M |
| Enough memory for useful hosted models | 10–30% | 2–13M |
| Owner willing to participate | 1–5% | 20K–650K |
| Reliable enough for paid traffic | 30–60% | 6K–390K |

There is no public measurement of this funnel. It is a scenario model. The practical conclusion is still clear: the addressable Mac supply is likely **tens of thousands to a few hundred thousand machines**, not 100 million.

The best early Mac providers are likely:

- high-memory Mac Studios;
- Mac minis used as servers;
- developer workstations left online overnight;
- university and office fleets;
- Apple-focused MSPs;
- homelab and self-hosting enthusiasts.

The average MacBook owner is unlikely to be the best initial provider. The rational provider already owns the hardware and has no important use for it during the serving window.

### Stock is not capacity

The same discipline must apply to non-Mac hardware. Public data gives us several useful but non-equivalent signals:

![A mismatched procession of computers carrying different-sized model blocks toward a shared coordinator.](/images/airbnb-ai-hardware-mix.png)

| Signal | What it tells us | What it does not tell us |
|---|---|---|
| Darkbloom's 100M+ Apple Silicon claim | Company-reported cumulative shipments | Current active, idle, willing, or reliable provider count |
| Steam Hardware Survey | Relative mix of gaming PCs that report to Steam | Global installed base or machines available for serving |
| Jon Peddie Research shipments | New discrete-board flow; 11.8M AIBs in Q1 2026 | Sell-through, survival, venue concentration, or idle hours |
| Marketplace listings | Hardware that an owner is willing to list | Actual utilization, uptime, or profitable demand |
| Cybercafé directories | Possible venue locations | GPU mix, ownership, operating hours, or willingness |

JPR reported 11.8 million PC add-in boards shipped in Q1 2026, while the Steam survey provides a live view of relative installed hardware among participating gamers. These are useful stock proxies, not a count of addressable inference nodes. [JPR Q1 2026](https://www.jonpeddie.com/news/q126-pc-graphics-add-in-board-shipments-decreased-0-6-from-last-quarter-to-12-million-units-with-a-cagr-to-2029-of-3-3/) [Steam Hardware Survey](https://store.steampowered.com/hwsurvey/videocard/)

The practical funnel is:

```text
Installed hardware
  × still working and locally accessible
  × enough memory for a useful model
  × available during a predictable window
  × owner permits remote work
  × network and thermal conditions pass
  × demand exists for that exact model and location
  × revenue exceeds incremental cost and risk
= profitable useful capacity
```

The last line is the market. Everything above it is merely inventory.

## 03A · What the hardware can actually do

### Intelligence follows memory, bandwidth, and workload—not the GPU name

“A GPU” is not a unit of useful AI work. A node’s practical capability is determined by model weights, KV cache, context length, quantization, memory bandwidth, runtime support, concurrency, and the workload’s latency requirement.

![A modest computer sorting documents, images, and evaluation checks while a frontier-model crown remains out of reach.](/images/airbnb-ai-useful-work.png)

| Hardware pool | Defensible capability envelope | Strong workloads | Weak or excluded workloads |
|---|---|---|---|
| 8GB consumer GPU | Small quantized models; embeddings; classifiers; image jobs | Embeddings, extraction, routing, image generation | Large-context 20B+ serving |
| 12–16GB RTX fleet | Small-to-mid quantized models, usually one or a few concurrent requests | Support automation, document work, evaluation, image/audio batch | Large models, high concurrency, strict p95 latency |
| 24GB RTX 3090/4090-class | Mid-size quantized models; higher throughput; some multimodal and image workloads | 7B–20B serving, image generation, batch synthetic data, evaluation | Frontier models, large KV-heavy contexts, confidential inference by default |
| 48–128GB Apple Silicon | Larger quantized models with unified memory; lower discrete-GPU-style throughput but high capacity | Private open-weight inference, long-context batch, developer workloads | Dense real-time serving if demand requires predictable high throughput |
| 96–256GB Apple Silicon / workstation | Larger MoE or quantized models, subject to runtime and memory pressure | Privacy-sensitive model serving, model experiments, batch inference | Assumed enterprise SLA without measured fleet reliability |
| H100/H200/B200 or equivalent | High-throughput, high-concurrency, attested or managed serving | Frontier inference, enterprise SLAs, training-adjacent work | Sunk-cost arbitrage; capex and facility costs dominate |

Apple’s current Mac Studio specifications illustrate why the Mac wedge exists: M4 Max configurations offer 48–128GB unified memory and up to 546GB/s bandwidth, while M3 Ultra configurations reach 96–256GB and 819GB/s. Nvidia’s RTX 4090 offers 24GB of VRAM and a 450W graphics power rating; the RTX 3060 offers 12GB and 170W. These specifications establish feasible model envelopes, not guaranteed tokens per second. [Apple Mac Studio specs](https://support.apple.com/en-us/122211) [RTX 4090 specs](https://www.nvidia.com/en-ph/geforce/graphics-cards/40-series/rtx-4090/) [RTX 3060 specs](https://www.nvidia.com/en-gb/geforce/graphics-cards/30-series/rtx-3060-3060ti/)

Darkbloom’s own calculator gives a useful example of the distinction: it models a 48GB Mac serving Gemma 4 26B at 123 tokens per second under an assumed 60% active rate and 2.5 concurrent requests. That is a provider projection under specified assumptions, not a universal benchmark for every Mac. [Darkbloom](https://www.darkbloom.dev/)

### The useful-work taxonomy

The competitor should sell workload classes, not abstract compute:

| Work class | What “useful” means | Hardware tolerance |
|---|---|---|
| Token generation | Accepted output tokens at target quality and latency | Sensitive to bandwidth, batching, KV cache, and uptime |
| Embeddings/classification | Completed items per dollar | Tolerant of small models and intermittent nodes |
| Image/audio generation | Completed assets per dollar | Often favors consumer Nvidia GPUs and batch queues |
| Evaluation/synthetic data | Valid test cases or records per hour | Highly tolerant of preemption and heterogeneous nodes |
| Private inference | Useful output under a defined trust policy | Requires managed or attested execution, not merely encryption in transit |

This is why a 12GB gaming GPU may be commercially valuable even when it cannot serve a large language model: image generation, speech, embeddings, and evaluation can still turn its idle window into useful work.

---

## 04 · The fleet-owner opportunity

### Cybercafés are more interesting than consumers

A commercial database estimates approximately **157,644 internet cafés in Asia**. This is not an official census and includes heterogeneous venues, but it is a useful directional indicator.

At 20–50 machines per venue, the theoretical fleet is roughly **3.2–7.9 million endpoints**. If only 10% are technically suitable and willing to participate, that still implies **320,000–790,000 potential endpoints**.

The number is not the main point. The operating model is:

- one owner;
- many machines;
- centralized deployment;
- existing power and broadband;
- sunk hardware cost;
- staff who already manage the fleet.

That makes a cybercafé a much more attractive supply customer than an individual consumer.

### The cybercafé constraint

Most gaming-center machines are Windows/Nvidia, not Apple Silicon. The machines are also occupied during peak gaming hours. The right product is therefore not “always-on cloud.” It is:

> **Overnight inference for gaming fleets, with immediate preemption when a paying player needs the machine.**

Best-fit workloads:

- batch inference;
- image generation;
- speech-to-text;
- evaluation;
- synthetic data;
- asynchronous document processing.

The first sale should be to the **operator**, not to the gamer.

### Other sunk-cost fleets

| Fleet | Why it matters | Sales difficulty |
|---|---|---:|
| Gaming centers | Dense Nvidia supply, centralized operator | Medium |
| Universities | Large labs, predictable schedules | High |
| Offices | Many idle workstations | High / fragmented |
| MSP-managed businesses | Aggregated distribution | Medium |
| Refurbishers | Can run used hardware between sales | Medium |
| Homelabs | Technical early adopters | Low per account, fragmented |

Salad reports **60,000 daily active GPUs** and **450,000 earning nodes**, while Vast operates a marketplace in which hosts list machines, set prices, and keep 75% of successful-job revenue. These are company-reported figures and should not be treated as an independently audited market census. They do, however, establish an important competitive fact: the generic “connect idle GPUs to buyers” layer already exists. [Salad](https://salad.com/) [Vast host FAQ](https://console.vast.ai/faq/)

---

## 05 · Beyond Mac

### The opportunity is bigger, but the privacy claim changes

Extending beyond Mac materially increases the potential supply pool, but “an order of magnitude” is not yet a defensible market estimate. Consumer Nvidia GPUs are common in gaming centers, homelabs, and existing GPU marketplaces; the relevant question is how much of that pool can be scheduled predictably, preempted cleanly, and sold at a margin after platform fees and support.

The tradeoff is that ordinary consumer GPUs do not offer the same hardware-backed confidentiality model as Apple Silicon or enterprise confidential GPUs.

NVIDIA’s formal confidential-computing support is concentrated in platforms such as H100, H200, B200, and selected RTX Pro products. The company describes GPU confidential computing as protecting code and data from even the computer or cloud-service owner. That is a different class of hardware from an ordinary RTX 3060, 3090, or 4090.

Therefore, a credible multi-platform network needs explicit trust tiers—and should avoid competing head-on with existing commodity marketplaces on price alone. Salad already markets large-scale consumer-GPU orchestration, while Akash and Vast already let providers list or lease heterogeneous hardware. [Salad](https://salad.com/) [Akash](https://akash.network/) [Vast](https://docs.vast.ai/host/hosting-overview)

| Tier | Hardware | Privacy promise | Workloads |
|---|---|---|---|
| Commodity | Consumer Nvidia/AMD/CPU | Operator-trusted, not operator-blind | Public and low-sensitivity batch jobs |
| Managed | Cybercafé, university, office fleet | Contractual and process isolation | Sensitive workloads with trusted operator |
| Attested | Apple Silicon, H100/H200/B200, selected secure platforms | Hardware-verified execution | Enterprise confidential inference |

The product should make the trust boundary visible on every request.

---

## 06 · The competitor opportunity

The opportunity is not “Darkbloom, but with more GPUs.” It is a choice among four businesses:

| Play | Existing competition | Where a new entrant can still win | Verdict |
|---|---|---|---|
| Commodity GPU marketplace | Vast, Akash | Better supply density in a specific geography or fleet segment | Hard, price-led |
| Distributed container cloud | Salad, Akash | Better developer experience, workload guarantees, or vertical specialization | Possible, but execution-heavy |
| Private Mac inference | Darkbloom | Better demand generation, enterprise controls, or multi-provider failover | Most differentiated |
| Fleet operating system | Few direct equivalents | Scheduling, preemption, trust policy, benchmarking, payouts, and utilization analytics for venue owners | Strongest wedge |

The strongest competitor is therefore not another consumer-node marketplace. It is the status quo: cybercafé operators earning revenue from players, GPU owners using Vast or Salad, and developers choosing a conventional API because reliability is worth more than a discount.

### Why cybercafés could be the wedge

Cybercafés and gaming centers are attractive because they aggregate many machines under one operator, already manage software images and maintenance, and have predictable demand valleys. But they are not automatically cheap supply. A gaming PC may be earning hourly gaming revenue, and the operator may reject inference if it causes heat, noise, wear, latency, or a delayed customer session.

The product must therefore sell **scheduled, preemptible capacity**, not permanent access:

- the operator defines gaming hours and blackout windows;
- the agent measures the lost-revenue opportunity cost;
- jobs are admitted only when the machine is idle;
- a local player session preempts inference immediately;
- the buyer receives a workload-specific reliability tier;
- the operator sees revenue net of electricity, platform fees, and interruptions.

This creates a sharper initial customer than “all cybercafés”: multi-site gaming operators, gaming hotels, esports venues, and managed PC fleets with centralized control.

### The non-Mac opportunity

Non-Mac expansion is economically larger but strategically less clean:

1. **Consumer Nvidia fleets** offer the largest practical pool and strong inference performance, but ordinary RTX hardware cannot make the same operator-blind privacy promise as Darkbloom’s attested Apple path.
2. **Managed venue fleets** offer better scheduling and accountability, but require sales, deployment, support, and revenue-sharing agreements.
3. **Refurbished datacenter or workstation fleets** offer better uptime and memory, but the entrant starts paying for capex and begins competing with established GPU clouds.
4. **Attested enterprise hardware** supports stronger confidentiality, but loses much of the sunk-cost arbitrage and is already served by specialized cloud providers.

The entrepreneurial opening is to expose this trade-off rather than hide it. Let buyers select `commodity`, `managed`, or `attested` execution, with different prices, latency guarantees, fallback rules, and data-retention policies.

## 07 · How to make the multi-platform version work

The opportunity is not a universal peer-to-peer marketplace on day one. It is a **trust-aware fleet operating system**.

### Core control plane

1. Discover hardware, memory, driver, model fit, and network quality.
2. Benchmark every node using real model workloads.
3. Assign a trust tier and publish the evidence.
4. Keep approved model versions warm on suitable nodes.
5. Schedule by trust, price, latency, location, and availability.
6. Preempt immediately when a fleet owner needs the machine.
7. Measure TTFT, tokens per second, uptime, errors, and temperature.
8. Reconcile usage and payouts at fleet level.

### Developer contract

Every request should specify:

```text
Model:              gemma-4-26b
Trust:              managed or attested
Retention:          zero retention
Latency:            best effort / p95 target
Region:             selectable
Fallback:           allowed or prohibited
Price ceiling:      per-million-token limit
```

This is more valuable than hiding all infrastructure behind a vague “decentralized” label.

### Cybercafé deployment flow

```text
Fleet owner installs agent
        ↓
Agent discovers and benchmarks PCs
        ↓
Operator defines gaming hours and quiet hours
        ↓
Models are downloaded and verified
        ↓
Inference runs only while machines are idle
        ↓
Player activity preempts the worker
        ↓
Fleet receives aggregated monthly payout
```

---

## 08 · Economics

Electricity is not the primary constraint.

At $0.15/kWh:

- 50W continuous draw costs about $5.40/month;
- 150W costs about $16.20/month;
- 300W costs about $32.40/month.

The larger costs are:

- hardware depreciation;
- component failure;
- heat and cooling;
- lost gaming revenue during busy periods;
- network congestion;
- support;
- privacy and liability.

The economics are best when the hardware is sunk cost. A fleet owner who already bought 50 gaming PCs may welcome overnight revenue. A consumer buying a new GPU solely to serve inference is making a speculative hardware investment.

The most attractive supply-side customer is therefore:

> An operator with many devices, low utilization windows, centralized control, and no need to buy new hardware.

### Geography changes the answer

Electricity is not a universal constant. The same machine can be marginally attractive in a low-cost-power market and uneconomic in a high-cost, air-conditioned venue.

![A cybercafe operator balancing an electricity meter, repair toolbox, worn fan, and a small stack of coins.](/images/airbnb-ai-operator-economics.png)

| Location example | Public tariff signal | 250W system, electricity only | 600W system, electricity only |
|---|---:|---:|---:|
| Singapore | S$0.3478/kWh incl. GST, Jul–Sep 2026 | S$0.087/h | S$0.209/h |
| Vietnam | VND 3,460/kWh for a published business tier | VND 865/h | VND 2,076/h |
| Manila example | ₱14.3496/kWh typical household rate, Apr 2026 | ₱3.59/h | ₱8.61/h |
| India commercial example | ₹4.50/kWh in one published commercial schedule | ₹1.13/h | ₹2.70/h |

These are directional examples, not a regional tariff table: commercial demand charges, taxes, air-conditioning, local utility schedules, and exchange rates can materially change the result. Singapore’s regulated tariff is especially punitive for a 24/7 consumer-GPU provider; Vietnam, Manila, and India can look cheaper on energy alone but may impose other reliability or cooling constraints. [Singapore EMA](https://www.ema.gov.sg/consumer-information/electricity/buying-electricity/buying-at-regulated-tariff) [Vietnam EVN](https://en.evn.com.vn/d/en-US/news/RETAIL-ELECTRICITY-TARIFF-Decision-No-2699QD-BCT-dated-11-October-2024-60-28-252) [Meralco April 2026](https://meralcomain.s3.ap-southeast-1.amazonaws.com/2026-04/english_press_release-_april_2026_rates.pdf) [India CEA tariff book](https://cea.nic.in/wp-content/uploads/fs___a/2026/03/Book_2025.pdf)

### The provider income model

For each node, calculate:

```text
provider contribution
= billed useful work
− platform and payment fees
− incremental electricity
− cooling and network overhead
− expected repairs and replacement reserve
− opportunity cost of unavailable gaming or office use
```

For an already-owned machine, capex may be sunk in the cash view, but it must remain in the economic view:

```text
economic hourly cost
= electricity
+ (purchase price − residual value) ÷ expected productive hours
+ expected repair reserve ÷ expected productive hours
+ owner opportunity cost
```

The most common analytical mistake is to compare token revenue with electricity alone. At low utilization, depreciation is not the dominant cash expense—but it determines whether the owner should keep the machine available, sell it, or use it for gaming. At high utilization, heat, fans, SSD writes, memory pressure, support, and replacement risk become real costs.

### What we can currently say about income

| Cohort | Publicly defensible useful-work signal | Public income signal | Current conclusion |
|---|---|---|---|
| 48GB Apple Silicon | Darkbloom models Gemma 4 26B at 123 tok/s under stated utilization assumptions | Darkbloom publishes **$16–$100/month** as a projection, including a base reward | Potentially attractive as sunk-cost private capacity; demand and reward-pool durability remain unproven |
| RTX 3060-class | 12GB VRAM, 170W graphics power; suited to small quantized models and batch work | No reliable public provider-income series | Likely useful for low-cost batch, but margin is highly tariff- and utilization-sensitive |
| RTX 4090-class | 24GB VRAM, 450W graphics power; suited to mid-size serving and image workloads | Vast exposes market-dependent host earnings; no universal income should be assumed | Stronger useful work, but electricity, cooling, and gaming opportunity cost are material |
| Cybercafé fleet | Many heterogeneous nodes with operator-controlled schedules | Must be measured at venue level | The opportunity is fleet contribution margin, not per-GPU headline earnings |

This is deliberately incomplete. The missing dataset is exactly what a pilot should collect: billed work by model, active hours, measured wall power, preemptions, thermal events, repairs, payout, and resale value. Until that telemetry exists, any precise claim about “what a 4090 earns” is an estimate or marketing claim, not a market fact.

### Worked scenario: why utilization matters more than watts

Assume a 4090-class gaming PC draws 600W while serving, electricity is S$0.3478/kWh, the operator reserves 15% of gross revenue for repairs and support, and the machine is otherwise a sunk asset. Electricity alone is about S$0.21 per active hour. But at 20% utilization, the machine is online 144 hours per month; at 60%, it is active 432 hours. A fixed monthly payout can therefore look attractive at the node level while producing poor contribution margin for the platform if demand is thin or jobs are frequently preempted.

The right KPI is not “earnings per online machine.” It is:

> **contribution margin per venue per month, divided by reliable useful hours delivered.**

The pilot must instrument active watts, temperature, fan speed, job preemption, gaming-session displacement, failure rate, payout, and resale value—not infer them from GPU list prices.

---

## 09 · The entrepreneurial opening

### Weak thesis

> We will aggregate idle devices and sell cheap tokens.

This is vulnerable to existing marketplaces, falling inference prices, and provider churn.

### Stronger thesis

> We will make distributed hardware usable for serious AI workloads by providing trust-aware routing, fleet operations, attestation, policy, and evidence.

The strongest initial product is probably:

## A trusted operating system for distributed inference fleets

Initial beachhead:

1. Gaming centers and cybercafés in Southeast Asia
2. Apple-focused MSPs
3. Universities and computer labs
4. Existing small GPU operators

Initial demand:

1. Batch inference
2. Open-weight model serving
3. Evaluation and synthetic-data workloads
4. Privacy-sensitive startup workloads

Only later should the network open to individual consumers.

---

## The field conclusion

Darkbloom’s Mac-only wedge is technically elegant, but the larger market is likely a heterogeneous fleet market. The important correction is that the raw marketplace layer is already competitive; the whitespace is operational and contractual.

The supply opportunity is larger beyond Mac because gaming centers, homelabs, MSPs, and GPU operators already hold large pools of potentially useful devices. The demand opportunity is credible because OpenRouter shows real multi-model usage at extraordinary scale. But the missing layer is not simply “more supply.” It is trust-aware orchestration that makes heterogeneous, preemptible fleets legible and economically usable.

The market will not be won by claiming that every idle computer is equivalent to a cloud server. It will be won by making the differences explicit:

- what hardware ran the job;
- who controlled it;
- what privacy guarantee applies;
- what performance was delivered;
- what happens when the node disappears;
- and how the operator gets paid.

> **Recommended next move:** validate a 10–20 venue pilot in Southeast Asia. Install the fleet agent in 200–500 gaming PCs, run only overnight batch workloads, and measure actual contribution margin, preemption behavior, provider retention, lost gaming revenue, and developer willingness to pay for each trust tier. The go/no-go metric is not gross token volume; it is contribution margin per venue after electricity, fees, support, and failed or preempted jobs.

---

## Sources and field notes

- [Darkbloom](https://www.darkbloom.dev/) — product, pricing, provider claims, privacy architecture
- [Darkbloom open-source repository](https://github.com/Layr-Labs/d-inference) — architecture, provider hardening, trust model
- [Eigen Labs: Project Darkbloom](https://www.eigenlabs.org/blog/project-darkbloom-unlocking-idle-compute-for-ai/) — project history and stated economics
- [OpenRouter State of AI](https://openrouter.ai/state-of-ai) — 100T-token empirical usage study
- [OpenRouter providers](https://openrouter.ai/providers) — live provider table and token activity
- [OpenRouter provider onboarding](https://openrouter.ai/providers/apply) — routing, uptime, payments, provider requirements
- [Salad](https://salad.com/) — distributed consumer-GPU supply claims
- [Vast.ai](https://vast.ai/) — marketplace GPU supply and usage model
- [Vast host FAQ](https://console.vast.ai/faq/) — host payout share and utilization caveats
- [Akash Network](https://akash.network/) — decentralized provider marketplace
- [Jon Peddie Research Q1 2026](https://www.jonpeddie.com/news/q126-pc-graphics-add-in-board-shipments-decreased-0-6-from-last-quarter-to-12-million-units-with-a-cagr-to-2029-of-3-3/) — discrete GPU shipment proxy
- [Steam Hardware Survey](https://store.steampowered.com/hwsurvey/videocard/) — relative gaming-hardware mix proxy
- [Apple Mac Studio specifications](https://support.apple.com/en-us/122211) — unified memory and bandwidth
- [NVIDIA RTX 4090 specifications](https://www.nvidia.com/en-ph/geforce/graphics-cards/40-series/rtx-4090/) — VRAM and power envelope
- [NVIDIA RTX 3060 specifications](https://www.nvidia.com/en-gb/geforce/graphics-cards/30-series/rtx-3060-3060ti/) — VRAM and power envelope
- [NVIDIA confidential computing](https://docs.nvidia.com/datacenter/cloud-native/confidential-containers/latest/supported-platforms.html) — supported confidential-GPU platforms
- [Asia internet-café database](https://rentechdigital.com/smartscraper/business-report-details/list-of-internet-cafes-in-asia) — directional venue-count estimate
- [Stanford AI Index](https://hai.stanford.edu/news/ai-index-2025-state-of-ai-in-10-charts) — declining inference cost
- [McKinsey: AI data-center demand](https://www.mckinsey.com/mgi/our-research/colocation-data-centers-the-infrastructure-race-behind-ai) — inference-capacity outlook
- [Singapore EMA tariff](https://www.ema.gov.sg/consumer-information/electricity/buying-electricity/buying-at-regulated-tariff) — local power-cost example
- [Vietnam EVN tariff](https://en.evn.com.vn/d/en-US/news/RETAIL-ELECTRICITY-TARIFF-Decision-No-2699QD-BCT-dated-11-October-2024-60-28-252) — business tariff example
- [Meralco April 2026 rates](https://meralcomain.s3.ap-southeast-1.amazonaws.com/2026-04/english_press_release-_april_2026_rates.pdf) — Manila power-cost example
- [India CEA tariff book](https://cea.nic.in/wp-content/uploads/fs___a/2026/03/Book_2025.pdf) — commercial tariff example
