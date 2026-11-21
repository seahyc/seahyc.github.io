# Relationship-aware messaging for small businesses

## Source correction

The Moses interview concerns **Respond.io Enterprise**, not SleekFlow. Moses said WhatsApp and Respond.io were effectively stateless for his desired agent workflow: no useful conversation-stage abstraction, insufficient hooks/memory, and no way to express a complex consultative sales process.

The explicit SleekFlow replacement signal appears in the separate Amos and Zames / Repair.sg interview:

- disappearing chats and shared-inbox bugs;
- SleekFlow remains necessary because the fallback is WhatsApp Web;
- 150–200 leads per day;
- response within 30–60 seconds can materially improve closing;
- queue switching causes agents to lose conversational context;
- willingness to pay SGD 3k+/month if an AI solution actually works.

These are complementary evidence for the same market, but not the same interview.

## Product conclusion

The personal and SMB products share an engine but not a market position.

| Layer | Personal product | SMB product |
|---|---|---|
| Voice | How I speak to this person here | How this business should speak to this customer |
| Memory | Relationship history | Customer, account, service and operational history |
| State | Current conversational context | Consult → qualify → explain → quote → close → fulfil |
| Desired outcome | Send quickly without sounding like AI | Respond quickly without sacrificing sales judgment |
| Buyer | Individual | Owner or sales/support leader |
| Product surface | Composer overlay | Shared WhatsApp sales desk and supervisor console |

Trying to sell both under one message would weaken each. They may share architecture, identity resolution, conversation memory and style learning.

## April Dunford positioning

### Best-fit customer

Owner-led service businesses where:

- WhatsApp is the primary lead and sales channel;
- the business receives at least dozens of inquiries daily;
- the sale requires diagnosis, qualification or explanation before pricing;
- average frontline staff cannot consistently reproduce the owner's judgment;
- response speed materially affects conversion;
- the owner currently samples chats manually or discovers missed conversations after the fact.

Examples: tuition and enrichment, home services, clinics, beauty/wellness and high-consideration local services.

Exclude simple FAQ businesses, low-volume merchants and high-volume transactional commerce where ordinary automation already works.

### Competitive alternatives

- SleekFlow or Respond.io shared inbox plus manual agents
- WhatsApp Web and spreadsheets
- No-code chatbot flows and FAQ upload
- Outsourced customer-support agents
- Generic LLM/RAG bot layered over WhatsApp
- Owner manually reviewing and coaching conversations

### Differentiated capability

A stage-aware AI sales desk that knows:

- who the customer is and what has already happened;
- what stage the sale is in;
- what information must be collected before progressing;
- what the best next action is;
- how the business's best salesperson would phrase it;
- when text should become a call or human escalation.

### Customer value

Every customer is handled with the context and judgment of the owner's best salesperson, even when the actual team is busy, junior or handing the conversation between people.

### Category

**AI sales desk for WhatsApp service businesses**

The initial product should integrate with existing inboxes. Replacing SleekFlow/Respond.io is an expansion path, not the MVP.

## Positioning statement

For WhatsApp-first service businesses whose junior sales teams reply quickly but inconsistently, this is an AI sales desk that understands each customer and moves the conversation through the right sales stage. Unlike shared inboxes and chatbot flows, it preserves context, follows the owner's real sales playbook, and knows when not to send the price list yet.

## Customer-facing copy

### Headline

**Every WhatsApp lead, handled like your best salesperson.**

### Subhead

It remembers the customer, knows what stage the sale is in, and drafts the next reply—so your team responds in seconds without rushing to the wrong answer or losing the conversation.

### Alternative headline

**Your shared inbox stores messages. This one knows what should happen next.**

### CTA

**Audit yesterday's WhatsApp conversations**

This CTA provides value before asking the customer to automate anything.

## Ten-second demo

Incoming message:

> “Hi, how much is P4 Math?”

Generic shared-inbox automation:

> “Our P4 Math programme is $___ per term. Here is our price list.”

Stage-aware response:

> “Happy to share. Is your child currently struggling with a particular area, or are you looking for broader exam preparation? I’ll recommend the most suitable class before sending the fees.”

Sidebar:

```text
Lead: New parent
Stage: Consultation
Known: P4 · referred by existing parent
Missing: learning need · preferred location
Do not: send complete price list yet
Next: diagnose → recommend programme → quote
```

The demo is not “AI writes nicer text.” It is “the inbox understands the sale.”

## Counterpositioning

SleekFlow and Respond.io are horizontal inbox/workflow products. Their product must remain:

- configurable across many industries;
- understandable to non-technical administrators;
- centered on seats, channels, broadcasts and visual workflows;
- predictable rather than deeply opinionated about how one business sells.

The proposed product deliberately makes the opposite choices:

- starts with complex consultative service sales;
- expresses business logic as executable policy, not only flowchart blocks;
- models customer and sales state explicitly;
- learns from the owner's best conversations;
- prioritizes decision quality and close progression over channel breadth.

This is plausible counterpositioning only while the product remains narrow and opinionated. A generic “AI-powered shared inbox” would surrender it.

## MVP

Do not replace the inbox initially.

1. Import or receive conversations from Respond.io, SleekFlow or WhatsApp Business.
2. Classify open/closed and sales stage.
3. Identify missed leads, overdue replies and premature quotes.
4. Draft the next response in the company's relationship-aware voice.
5. Produce a daily owner report: response time, open conversations, stage leakage and quality problems.
6. Keep sending human-approved until draft acceptance and stage accuracy are proven.

The wedge is a **conversation audit and drafting layer**. The system of record can move later if customers prefer the intelligence layer enough to replace their existing inbox.

## Evidence status

- **Language:** strong first-party pain from Moses and Repair.sg.
- **Behavior:** strong—enterprise Respond.io usage, SleekFlow usage despite bugs, manual chat sampling, templates/TextExpander, internal AI experiments.
- **Economics:** promising—thousands of daily messages, material sales staffing costs, and explicit SGD 3k+/month willingness to pay from Repair.sg if the product works.
- **Repeatability:** unknown; two interviews cannot establish segment prevalence.
- **Feasibility:** unknown; stage accuracy and domain diagnosis remain the central product risks.

## Cheapest decisive test

Run a retrospective conversation audit, not a chatbot pilot.

For each of Moses and Repair.sg, take 100 historical WhatsApp conversations and produce:

- open/closed status;
- inferred sales/service stage;
- missed or late follow-up;
- premature pricing or incorrect next action;
- suggested next response;
- escalation recommendation.

Have the owner or team lead grade accuracy and identify revenue-relevant misses. Advance only if the report finds important issues they did not already see and the suggested replies consistently reflect the company's actual playbook.
