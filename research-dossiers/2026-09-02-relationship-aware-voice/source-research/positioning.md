# Relationship-aware voice — product positioning

## Decision

Whether the open-source communications project should be a Beeper clone, an agent-safety layer, or a relationship-aware writing product.

## Verdict

**Conditional advance:** prototype the relationship-aware writing layer. Do not build bridges, an inbox, or generalized agent governance yet.

The first proof required is that drafts conditioned on **person × channel** are consistently more sendable than a generic personal-voice prompt plus recent thread context.

## April Dunford positioning

### Competitive alternatives

- Write every message manually
- Ask ChatGPT or Claude to “make this sound like me”
- Paste the recent conversation into an AI assistant
- Use a global writing assistant such as Grammarly
- Use Beeper MCP and manually prompt over message history
- Save separate prompts for professional and personal messages

### Differentiated capability

The product constructs a separate, evolving voice profile for each **relationship and channel**, using only the user's sent messages and subsequent edits.

It combines:

`your baseline voice + this channel's conventions + this relationship's language + current conversational context`

### Customer value

- Express an intent in seconds without producing generic AI prose
- Stop rewriting drafts for warmth, directness, slang, code-switching and formality
- Preserve the distinct way the user relates to a spouse, friend, colleague, report, recruiter or customer
- Increase communication output without flattening the user's relationships into one artificial persona

### Best-fit customer

An operator, founder, recruiter or relationship-heavy professional who:

- maintains important relationships across at least three messaging channels;
- already uses AI to draft messages;
- regularly rewrites those drafts because they sound wrong for the recipient;
- is comfortable granting local read access to conversation history;
- values speed but refuses to sound automated.

Exclude autonomous outbound sales, customer-service bots and users seeking a new inbox.

### Category

**Relationship-aware message composer**

Not an inbox, chatbot, grammar checker or autonomous messaging agent.

### Positioning statement

For people who use AI to write messages but rewrite everything before sending, this is a relationship-aware message composer that drafts the way you actually speak to this person on this channel. Unlike generic AI writers, it learns that your voice is not one voice: it changes naturally by relationship and context.

## Customer-facing copy

### Headline

**Never sound like AI to someone who knows you.**

### Subhead

Say what you mean. It drafts exactly how you'd say it to *this person*, *here*—whether that's your partner on WhatsApp, your team on Slack, or a recruiter on LinkedIn.

### CTA

**Try it on one conversation**

### Short pitch

Generic AI learns one version of your voice. You don't have one. You are warm and shorthand-heavy with your partner, direct with your team, and polished with a new contact. This composer learns each relationship locally and turns a bare intent into a message you can actually send.

## Ten-second demo

Intent: **“I'm running 20 minutes late. Apologize and ask if that still works.”**

| Recipient and channel | Draft |
|---|---|
| Partner · WhatsApp | “sorry love, got held up 😭 20 mins? I’ll grab dinner on the way” |
| Manager · Slack | “Running ~20m late—the previous call overran. I’ll join at 3:20 and send the notes first.” |
| Recruiter · LinkedIn | “Apologies, I’m running about 20 minutes behind. Would 3:20 still work for you? Completely understand if we should reschedule.” |

The visual demo is one intent entering at the top and three unmistakably different, believable messages appearing below.

## Product shape

Start as a composer overlay or Beeper extension, not a universal inbox.

1. User opens a conversation.
2. Types the intent, not the finished message.
3. Product retrieves the user's sent-message examples for that person and channel.
4. It produces one draft, with an optional alternate—not six variants.
5. User edits and sends manually.
6. The edit delta updates that relationship's voice profile locally.

The first-session proof is a draft for one familiar person that immediately feels recognizably different from a generic AI draft.

## Position-to-product contract

| Promised value | Product mechanism | First proof | Metric |
|---|---|---|---|
| Sounds right for this person | Relationship-specific retrieval and style profile | Side-by-side generic versus relationship-aware draft | Blind preference |
| Sounds right on this channel | Channel-conditioned examples and conventions | Same intent rendered across WhatsApp, Slack and LinkedIn | Draft acceptance by channel |
| Improves with use | Learn from user's edits, not just sent output | Second similar message needs fewer changes | Edit distance and time-to-send |
| Keeps private history controlled | Local processing and derived profiles | Product works without uploading the message archive to a product cloud | Data-boundary inspection |

## Honest Seven Powers assessment

There is no durable power at MVP.

- **Counter-positioning:** weak. Generic writing tools are optimized for one global voice and cloud context, but Beeper or a major assistant could add relationship conditioning.
- **Switching costs:** potentially meaningful after the system has learned years of relationship-specific edits, but ethical exportability limits lock-in.
- **Process power:** possible if the product develops a superior longitudinal edit-learning and cross-channel identity-resolution process.
- **Cornered resource:** the user's private history is privileged input but belongs to the user and should remain portable.
- **Network economies:** absent and possibly undesirable; the product should not require the recipient to use it.
- **Scale economies, branding and captured resource:** unproven.

Therefore this is currently a compelling wedge and open-source personal tool, not yet a defensible venture thesis.

## Cheapest decisive test

Build a local prototype over Beeper Desktop API without sending messages.

For five people across at least three channels, collect twenty real communication intents. Generate:

- A: generic “write like me” plus recent thread context
- B: baseline voice + channel profile + relationship-specific examples

Blindly choose which draft is more sendable, then edit the winner.

Advance if B wins at least 70% of blind choices and materially reduces time-to-send or editing over one week. Kill or reshape if recent thread context alone performs just as well.

Willingness to pay is deliberately not the first gate. The immediate decision is whether relationship-specific conditioning produces a product-level difference users can feel.
