+++
title = "The AI Inference Market"
description = "A strategic Fieldbook on the physical bottlenecks, software fault lines, and four possible blue-ocean wedges in AI inference."
date = 2026-09-01
layout = "research-swipe"
body_class = "research-swipe"
main_class = "main-research-swipe"
+++

# THE AI INFERENCE MARKET

## Where the stack stops being generic

### A Fieldbook on inference physics, disaggregation, and four claimed blue-ocean opportunities

**Research edition · 1 September 2026**<br>
Adapted from a supplied strategic market analysis; source citations were not included.

> **Working thesis** The worthwhile inference businesses are unlikely to be another general GPU cloud or generic API. The proposed opportunities sit at the trade-offs hyperscalers make for fleet throughput: deterministic real-time multimodal serving, productized distributed KV memory, sovereign appliances, and serving for architectures beyond today’s Transformer-centric stack.

> **Evidence boundary** This Fieldbook preserves the supplied analysis, but its market forecasts, benchmark figures, product claims, regulatory assertions, and company-specific numbers are **unverified** pending a source audit. Treat all numerical claims as leads—not decision-ready facts.

---

## 01 · The market is moving from training to serving

### A large market does not make a broad wedge defensible

The supplied analysis argues that AI’s economic centre of gravity is moving from centralized model training toward deployed inference across enterprise, edge, and consumer environments. Its strategic warning is sound in shape: a venture-backed entrant should not try to match hyperscalers at general-purpose clouds, silicon breadth, or multi-tenant throughput.

Instead, the question is where a general-purpose stack produces unacceptable latency, operational complexity, or waste. The answer has to be workload-specific—not inferred from a headline TAM.

| Supplied market claim | Status in this edition | Why it matters if verified |
|---|---|---|
| AI inference market: $98.32B–$120.01B in 2024–25 | Unverified forecast range | Enough room for valuable narrow segments |
| Long-term market: $378.37B–$736.42B by 2032–35 | Unverified forecast range | Does not prove a startup can capture margin |
| North America: 35.95%–49.80% share | Unverified | Centralized cloud and defense demand may dominate early spend |
| APAC: 18%–20% CAGR | Unverified | Sovereignty, industrial modernization, and local deployment may create a different entry point |
| Europe: 22%–25% share | Unverified | Compliance and industrial automation may prioritize control over raw throughput |

The manuscript also claims that GPUs command 50%–54% of the market, HBM 61.33% of advanced deployments, public cloud 43.72%–67.42% of deployments, and edge 18%–22%. These are useful hypotheses for segmentation, but no source, denominator, or publication date was supplied.

**Operator decision:** do not choose a wedge from regional growth forecasts. Interview named buyers whose workflow fails on one measurable constraint: p95 time-to-first-token, inter-token jitter, data-residency clearance, or repeated-prompt spend.

---

## 02 · The physics: prefill and decode want different machines

### TTFT and token cadence are different products

The manuscript’s most durable contribution is a simple model of LLM inference. End-user latency is approximately:

```text
response latency = TTFT + (number of generated tokens × TPOT)
```

Prefill processes the prompt and produces a key-value cache. It is highly parallel and generally compute-bound, so it governs time-to-first-token (TTFT). Decode produces each token autoregressively, repeatedly reading model weights and accumulated KV state. It is generally memory-bandwidth-bound, so it governs time-per-output-token (TPOT, also called inter-token latency).

| Phase | Dominant work | Binding resource | Customer-visible failure |
|---|---|---|---|
| Prefill | Parallel prompt processing and KV-cache creation | Compute | Slow first response |
| Decode | Sequential token generation and growing KV-cache reads | Memory bandwidth | Slow or jittery stream |

The “memory wall” is therefore not a rhetorical issue. It is why an architecture that excels at aggregate FLOPS can still feel slow for a person waiting on a live response. Any company claiming an inference advantage should publish TTFT, TPOT, p50/p95/p99, model, context length, output length, concurrency, hardware, and price—not a single tokens-per-second number.

---

## 03 · Hardware is a choice of which pain to own

### Flexibility, locality, and obsolescence trade places

The supplied report frames the hardware landscape as a spectrum. General-purpose GPUs preserve broad compatibility; SRAM-heavy systems chase latency by putting memory closer to compute; fixed-function silicon pushes specialization still further.

| Architecture | Proposed strength | Trade-off the manuscript identifies |
|---|---|---|
| NVIDIA H100 / B200-class GPU with HBM | Flexible training and inference; enormous batch throughput | HBM-to-compute travel, power, and batching can tax individual latency |
| Cerebras wafer-scale SRAM | Large on-wafer bandwidth; low-latency execution | Supplied claim: WSE-3 has 44GB SRAM / 21PB/s; models beyond local capacity reintroduce network hops |
| Groq dataflow LPU | Deterministic, compiler-scheduled token generation | SRAM capacity and model partitioning limit the fit |
| d-Matrix in-memory compute | Less data movement and lower latency/power | Less general-purpose capability |
| Etched Transformer ASIC | Silicon specialized for Transformer math | Architecture lock-in if the dominant model family changes |
| Taalas model-etched silicon | Supplied claim: 17,000+ tokens/s for a fixed Llama 3 model | No update, fine-tuning, or repurposing path |

These descriptions are not a hardware buying guide. They are a lens for spotting a mismatch: general GPUs optimize flexibility and bulk throughput; SRAM-like approaches trade that away for latency; fixed-function approaches trade away future optionality. A viable startup has to own the operational consequence of the trade, not merely buy the alternative chip.

---

## 04 · The software bottleneck is memory orchestration

### Serving engines differ most where agent workloads repeat themselves

The manuscript describes an open-source serving landscape that converges around vLLM, SGLang, TensorRT-LLM, LMDeploy, and llama.cpp/Ollama. Its key claim is that the lucrative software layer is not model loading; it is KV-cache use, batching, guided decoding, and placement.

| Engine | Core approach described in the manuscript | Claimed fit | Claimed limitation to verify |
|---|---|---|---|
| vLLM | PagedAttention; fixed KV blocks such as 16 tokens | General production APIs and portability | CPU-side guided-decoding pressure; block-boundary prefix reuse |
| SGLang | RadixAttention; token-level radix-tree prefix cache | Multi-turn chat, RAG, structured JSON | Narrower hardware/community support; single-node cache scope |
| TensorRT-LLM | NVIDIA C++ kernel fusion and in-flight batching | Maximum fixed-silicon throughput | 25–40 minute compilation cited; lower agility |
| LMDeploy | C++ TurboMind backend | Quantized/Hopper performance | Smaller ecosystem integration |
| llama.cpp / Ollama | Dependency-light GGUF execution | Local, Apple Silicon, air-gapped use | No continuous batching for high-concurrency fleets |

Two claims deserve a direct benchmark before entering the business case: that vLLM applies grammar masking entirely on the CPU and degrades past batch size 8, and that SGLang’s token-level reuse can cut prefix-heavy costs by 30%–40%. They are directionally plausible but are workload-, version-, and configuration-dependent.

---

## 05 · Disaggregation only pays when the cache can move

### Separating prefill and decode replaces compute contention with network discipline

Sharing a GPU between a fresh prefill and an ongoing decode creates an interference problem: either pause a live stream or batch a large prefill beside small decodes and accept a worse TPOT. Prefill–decode (PD) disaggregation aims to use compute-heavy capacity for prefill and memory/bandwidth-oriented capacity for decode.

But a KV cache is large, and moving it is the whole game. The supplied analysis cites a 70B prefill producing more than 2.6GB of KV data, 100GB/s aggregate transfer needs, 0.944s TCP transfer latency, FlowKV cutting average latency 96% to 0.053s, and NVIDIA NIXL achieving sub-5ms RDMA transfer. None is source-backed here; the required experiment is more important than the exact number.

| Proposed mechanism | What it must prove in production |
|---|---|
| RDMA / NIXL-style transfer | End-to-end cache transfer is consistently below the saved compute time |
| Mooncake-like distributed KV pool | Cache-hit rate, locality, eviction behavior, and failure recovery improve goodput |
| CPU DRAM + NVMe memory tiering | The cheap tier does not turn p99 latency into an incident |
| Cross-node prefix reuse | Correctness, tenant isolation, and privacy survive cache sharing |

The manuscript’s illustrative case—10,000 hourly chats × 2,000 shared prompt tokens = 20M potentially repeated prompt tokens—is a helpful sizing equation. Its asserted 498% capacity increase is not yet a forecast. Measure a customer’s real shared-prefix rate, cache-transfer time, and p95/p99 impact before selling savings.

---

## 06 · Map the stack before naming a blue ocean

### Commodity layers are not automatically bad businesses—just expensive places to differentiate

The report places raw H100s, model weights, and standard HTTP inference endpoints in the commodity/utility zone; vLLM/TensorRT-LLM and Kubernetes/Ray Serve in product/rental; PD disaggregation and RDMA cache connectors in custom-built; and global KV fabrics plus deterministic sub-50ms multimodal layers in genesis.

Its ERRC (eliminate–reduce–raise–create) lens is useful:

| Eliminate | Reduce | Raise | Create |
|---|---|---|---|
| Single-node KV ownership; unnecessary REST overhead; universal flexibility | TTFT, token jitter, sustained-workload OPEX | Determinism, SLO attainment, sovereign controls | Semantic WebRTC transport, turnkey memory fabrics, air-gapped appliances |

The hidden assumption is that hyperscalers will not solve the same problem because cache reuse reduces rented GPU-hours. That may be partly true, but a third party still needs a durable moat: integration depth, a compliance boundary, proprietary workload telemetry, or a hardware/software deployment capability that survives cloud price cuts.

---

## 07 · Opportunity 1: deterministic multimodal transport

### Build the clock, not another chat endpoint

For voice, robotics, and live vision, the manuscript cites a 500–800ms end-to-end conversational budget. It argues that batching and raw media transport consume that budget unpredictably; one supplied example says a WebP upload over a 5Mbps uplink takes about 1.1 seconds before inference begins.

The proposed product is a bare-metal inference and transport layer: semantic media handling over WebRTC, deterministic micro-batching, edge compression, and SRAM-oriented compute. The claimed goal is sub-50ms model response, with encode-and-transfer below 100ms even at 1Mbps.

**Smallest credible test:** instrument a single speech or camera-agent workload against a named cloud baseline. Split the latency budget into capture, encode, uplink, queue, prefill, decode, downlink, and playback. **Owner:** performance engineering. **Timeframe:** four weeks. **Go:** p95 end-to-end latency meets the customer’s budget at the intended packet-loss and uplink conditions. **Stop:** the latency win disappears after realistic security, observability, and deployment overhead.

---

## 08 · Opportunity 2: a commercial KV memory fabric

### Make the cache an operable product, not a heroic cluster configuration

The proposed product is a Kubernetes operator or sidecar that presents a distributed cache hierarchy—SRAM → HBM → DRAM → NVMe—to vLLM/SGLang workers, while owning replication, eviction, locality, and transfers through NVLink/RDMA.

The manuscript claims enterprises with 80% shared prompt context can see 5×–10× compute-cost reductions. Treat that as a claim to falsify. The actual value depends on prefix overlap, prompt variance, cache-hit age, KV size, network topology, isolation, and the price of operating the fabric.

**Smallest credible test:** deploy against one RAG/agent customer’s replay trace, not a synthetic benchmark. **Owner:** platform team. **Timeframe:** six weeks. **Go:** lower cost per completed task and no p99/SLO regression after cache, network, and operator overhead. **Stop:** cache misses, noisy neighbors, or security isolation erase the benefit.

---

## 09 · Opportunity 3: sovereign agentic appliances

### The edge product is an operational promise, not a rack SKU

The report targets defense, finance, healthcare, and governments that cannot send sensitive data through a public API. It places Singapore in focus, citing a $1.82B 2035 AI-data-centre market, a 200MW cap on new builds, SS 715:2025, liquid cooling pressure, and 71% of regulated deployments outside public cloud. These specific claims require official-source verification before publication as market facts.

The product proposal is a 1U/2U, air-gapped appliance: secure preconfigured serving, OpenAI-compatible APIs, SGLang/TensorRT-LLM as appropriate, and edge silicon such as d-Matrix or enterprise NVIDIA. The manuscript says sustained utilization can make on-premises 8×–18× cheaper per token than cloud APIs; this is not portable without a full capex, energy, support, depreciation, and utilization model.

**Smallest credible test:** install one appliance inside a named regulated buyer’s sandbox. **Owner:** solutions engineering plus security. **Timeframe:** eight weeks. **Go:** passes the buyer’s data-path review and delivers an agreed cost per useful task at measured utilization. **Stop:** support burden, clearance lead time, or low utilization makes the appliance uneconomic.

---

## 10 · Opportunity 4: serving beyond today’s Transformer default

### A future architecture is not yet a market; build the orchestration proof first

The report argues serving stacks are path-dependent on Transformer self-attention and PagedAttention, while SSMs such as Mamba/Jamba and recurrent hybrids have fixed-size hidden states instead of a large growing KV cache. It pairs this with speculative decoding: a small draft model proposes tokens, a large target verifies them, and an orchestrator allocates them across memory tiers and hardware.

Its cited InferenceBench result—up to 8.08× speedup over naive baselines—is unverified here. More importantly, any gain has to survive real arrival patterns, quality constraints, model updates, synchronization cost, and a customer’s budget.

**Smallest credible test:** serve one production-like speculative-decoding workload and one non-Transformer/hybrid candidate under a fixed dollar and SLO budget. **Owner:** serving research team. **Timeframe:** six weeks. **Go:** better completed-task cost and p95 latency than tuned current-stack baselines. **Stop:** orchestration complexity exceeds the measurable gain.

---

## 11 · What the headline omits

### The opportunity is a test plan, not a monopoly claim

The supplied conclusion treats hyperscaler incentives and hardware rigidity as durable white space. That inference may be right in individual workloads, but its stronger claims—mathematically guaranteed latency, 5×–10× cost savings, 8×–18× appliance advantage, “instant” premium-market capture, and monopoly on a next architecture—are not supported by a source ledger.

| Claim class | What is known from the supplied material | What must be obtained before a build decision |
|---|---|---|
| Market sizing / regional splits | Forecast ranges and shares, no cited publisher or methodology | Dated source, market definition, denominator, and forecast assumptions |
| Hardware and engine performance | Named products and mechanisms | Reproducible benchmark configuration, version, hardware topology, p50/p95/p99 |
| KV economics | Illustrative transfer/cache calculations | Customer trace, cache-hit rate, network cost, multi-tenant isolation result |
| Sovereign appliance economics | Claimed cloud multiple and Singapore context | Full capex/opex model, utilization, security review, local regulation source |
| Architecture shift | A plausible direction of research | Evidence that a buyer will pay for a specialized serving layer now |

**Recommended decision:** begin with the KV-memory-fabric test only if you can secure a design partner with prefix-heavy RAG/agent traffic and high enough spend to observe meaningful savings. It has the shortest path from a measurable bottleneck to a commercial proof. The real-time transport and sovereign appliance paths have stronger deployment and go-to-market dependencies; the alternative-architecture path is best treated as research until workload demand arrives.

### Appendix · source ledger and publication boundary

| Material | Provenance | Confidence | Falsification path |
|---|---|---|---|
| Strategic thesis and all numbers in this Fieldbook | User-supplied pasted report, titled *The AI Inference Market: Strategic Gaps and Blue Ocean Opportunities for Emerging Challengers*; no bibliography or links supplied | Low for numbers; medium for the high-level architecture framing | Audit every material claim against primary documentation, reproducible benchmarks, filings, and buyer telemetry |
| Fieldbook cover illustration | Original, generated for this Fieldbook | Not factual evidence | Editorial only; no empirical claim |

**Publication status:** indexed locally in the Fieldbooks library; not deployed. A research audit should produce a dated source ledger, assumptions sheet, benchmark notebook, and a replacement for every unverified executive claim before this is presented as an evidence-led market analysis.
