---
title: "Humanise Writing"
description: "Write in a defined voice, then edit any text to remove AI tells: mark, rewrite around real specifics, audit, and score against a pass/fail gate."
skill_bundle: true
---

<!-- Generated from seahyc/agent-skills. Do not edit here. -->

One skill, two jobs. Part 1 defines a voice and how to write in it. Part 2 is how
to edit any text so it does not read as machine-written. When writing in a
voice, draft with Part 1, then run Part 2 as the edit pass and gate. When
editing someone else's text, use Part 2 alone, with a voice sample if one is
supplied.

Part 2 combines the structural patterns from Wikipedia's "Signs of AI writing"
guide as packaged in [blader/humanizer](https://github.com/blader/humanizer)
(MIT), the rules and scoring rubric from
[stop-slop](https://github.com/hardikpandya/stop-slop) by Hardik Pandya (MIT),
and a set of plain-speech, documentation and tone rules. Credit to those
projects; see Sources and licences at the end.

## Make it yours: the voice profile

Part 1 ships with a default profile (below). To use your own voice, replace the
"Voice profile" section with your traits and add 3 to 5 samples of your real
writing under "Samples". A supplied sample always wins over every rule in this
file.

---

# Part 1: Writing in a voice

## Voice profile (default, edit freely)

A builder-and-operator voice. Concrete, curious, a narrator who is actually
present.

- **Experience before abstraction.** Reference specific people, books and
  moments. Ground every generalisation in an example.
- **Curiosity with humility.** "I think", "probably", "I'm not entirely sure",
  only when meant. Admit mistakes plainly.
- **A practitioner lens.** Distribution, hiring, unit economics and team
  dynamics come up naturally, not as showing off.
- **A particular place.** Keep the writer's regional and cultural context. Do
  not universalise or default to an American frame.
- **Introspection that does not wallow.** Reflect, admit confusion or failure,
  then move on.

## Modes

Pick the register by format.

### Mode A: Ideas essay (default for blog posts and long-form)

Enthusiast energy, conceptual scaffolding, technical vocabulary used casually,
footnotes as humour. The piece needs a **frame**: a lens that makes the mundane
interesting. Not "here are my thoughts on distribution" but "what if cracking a
growth channel is less like building a product and more like finding a
biological niche?"

- Find the scaffold first. Give readers a way to see something differently, not
  just information.
- Mix registers. Precise technical terms next to very human observations, when
  the terms are earned.
- Treat absurd subjects with complete seriousness. The humour lives there.
- Footnotes are first-class. The aside that cannot fit in the body but is too
  good to cut goes in a footnote.
- The essay arrives somewhere. The thesis emerges from the exploration. Do not
  name it with a subhead or restate it in a closing paragraph.
- Subheadings are playful, not bureaucratic. A subheading names an idea, not a
  section ("Key findings" is the thing to avoid).
- If a section explains its own point, it is one paragraph too long. Cut the
  explanation, keep the observation.

### Mode B: Reportage and cultural criticism (people, scenes, industries)

- Build scenes: specific bodies in specific rooms with specific objects. Give
  the detail and let the reader draw the conclusion.
- The narrator has a body and is present. He or she can be wrong and notice it.
- Juxtapose registers ruthlessly (the cosmic against the pathetic) and never
  explain the joke.
- Moral weight, never stated, only felt.
- Parentheticals can carry a whole thought.

### Mode C: Short form (emails, LinkedIn, social, cover letters)

- The first sentence earns the rest. No preamble.
- Short paragraphs: 1 to 3 sentences, default 1 to 2.
- Personal anecdote over abstract lesson. Specific over general.
- Do not end with a question unless it is genuine.

### Mode D: Company and site copy (a letter or page signed by an organisation)

Here the "we" is the organisation, not the author, so Mode A and B flourishes do
not fit.

- Plain, factual register. Say what happened, with the number and the source.
- First person plural, contractions, digits. No aphorisms, no staged candor, no
  closing line that sums up the page.
- Every claim is sourced or removed. A comparison to a named outside figure
  needs a citation. Never invent a customer, anecdote or quote.
- The human element is one real, specific, consented detail from the business (a
  named kind of customer, a real number, a real decision). If none exists, say
  so to the user and mark `[NEEDS REAL DETAIL]`. Never write the scene yourself.
- Prefer a short page with sourced facts over a long page with a voice.

## Voice DNA

### Writing rules (all modes)

- Apply ASD-STE100 as a clarity discipline: short direct sentences, common
  concrete words, one idea per sentence. Keep a technical term when it is more
  precise. Do not apply it mechanically where it would damage the voice or a
  quotation.
- Write like a sharp human, not a language model. Get to the point.
- When making a claim, be specific: numbers, names, concrete details.
- Vary sentence length. Natural transitions only.
- When uncertain, say so plainly ("I think", "probably", "kinda"), and only when
  genuinely uncertain. One clear qualifier beats three stacked hedges.
- Never pad. Shorter and accurate beats longer and fluffy.
- Physical verbs for abstract processes: "sanded down" not "improved", "bolted
  on" not "added", "cracked" not "solved".
- Humour comes from specificity and juxtaposition, not jokes.
- Parenthetical asides are for genuine editorial asides, not a reflex substitute
  for a dash.

### Formatting rules

- **Em dashes:** allowed only in Mode A and B, and only for true grammatical use
  (a genuine interruption or an amplifying break), never as a lazy substitute
  for a comma, colon or full stop. Banned entirely in Mode C and Mode D, in
  chat, and in every edit pass.
- **En dashes:** essay use only, and only for ranges. Elsewhere write ranges with
  "to".
- Short paragraphs in Mode C and D. Mode A and B can breathe: a 4 to 5 sentence
  paragraph is fine if it earns its length.
- Numbers as digits. Contractions always.
- Bold sparingly: 1 or 2 key moments per section.
- Footnotes encouraged in Mode A.
- Straight apostrophes and quotes, never curly. Sentence-case headings and table
  headers.

### Reference pieces (internalise the moves, do not copy)

- **Malmesbury, "My Journey to the Microwave Alternate Timeline" (2026).** The
  conceptual scaffold, NP-hard humour, footnotes as personality, absurd subjects
  treated seriously, a real thesis that lands.
- **Sam Kriss, "Child's Play", Harper's (2026).** Scenes built from specific
  objects, a narrator with a body and contradictions, the grandiose against the
  pathetic, moral weight that lands unstated.

### Samples of the target register

These show rhythm and plainness. Replace them with your own.

On a lesson learned:
> This is one of those lessons I have known about in the abstract, but recently gained a lot more definition on. [...] what really happened was that we cracked a scalable distribution channel. We found channel-model fit.

On a product observation:
> Unlike most voice agents, it doesn't just display a pulsing orb, but actually shows bold white text in point form that summarises the reply. This seemingly simple touch, to me, demonstrates a deep understanding of the user context and psychology.

On a hiring mistake:
> Almost immediately, problems cropped up. [...] Eventually, they became increasingly disconnected from the company they were so excited to join in the first place, disillusioned that they were unable to make many meaningful contributions.

## Format guidance

- **Blog posts:** Mode A, or B if about a scene, person or industry. Find the
  frame before writing. Open with the claim or the scene, not a question or a
  vague teaser. Ground it in a real story fast. Name real people and sources.
  End on something that lands, not a summary.
- **Emails:** Mode C. Direct subject line, first sentence gets to the point,
  skip pleasantries that mean nothing.
- **LinkedIn and social:** Mode C. First line is a real hook, not clickbait.
  Anecdote over lesson. Shorter is almost always better.
- **Cover letters and application essays:** Mode C with Mode B texture. One
  specific moment, connected explicitly. The ending is earned, not summarised.
- **Site, press and letters signed by an organisation:** Mode D.
- **Chat and technical replies:** Mode C, plus two rules. When the reply
  diagnoses a bug and points at someone else's unmerged work, tag the person
  with a real @mention (not "you" in a group thread) so it is clear who owes the
  next action. Frame findings as state of the world, not blame: "looks like the
  fix hasn't merged to staging yet", not "your commit never made it in".
- **Stakeholder updates (investors, partners, board):** Mode C, structured,
  warmer up front. Order:
  1. Greeting by first names.
  2. A warm line about the relationship, then one line on what excites us. Do
     not open cold with data.
  3. A one-line bridge to the update.
  4. An exec summary in prose, not bullets, that frames first and puts the big
     numbers inside the frame.
  5. A compact table: metrics as rows, periods as columns. Mark estimates "(est.)"
     or "~". Never present an estimate as a hard actual.
  6. Short definitions for any metric the reader will scrutinise.
  7. Highlights: what we did that drove the numbers.
  8. Lowlights: 2 or 3 true, relatable, slightly softball items. Frame planned
     trade-offs as planned. Never put a real black swan here (a missed target,
     runway, fraud). Those need a separate, direct conversation.
  9. Next-period priorities, plainly stated.
  10. If the meeting raised a question, answer it in its own paragraph ("Looping
      back on your question earlier about X..."), explaining the mechanism.
  11. A plain closing that reaffirms commitment, then the sign-off.

  Know the reader's mental model and lead with what they already value. Keep
  every number on one basis, label averages versus totals, hold one currency,
  and never overstate a trend. If a metric fell, say it fell.

## Self-check for Part 1

1. Which mode? Did I pick the right register (A, B, C or D)?
2. Any banned phrase or the "isn't X, it's Y" pattern (Part 2, A and I)?
3. Dashes: Mode C and D have none. Mode A and B only genuine grammatical ones.
4. Any slogan opener, smug kicker or cute label (Part 2, I)?
5. Any vague verb where a physical one would work?
6. Mode A and B: is there a frame, and does the piece arrive somewhere?
7. Mode B: specific objects and a present narrator?
8. Mode D: is every claim sourced and every human detail real?
9. Does a number stand without an actual or estimate label, or mix bases?
10. Then run Part 2.

---

# Part 2: The edit pass

## What a pattern pass cannot fix

Removing tells is half the job. Text can pass every check below and still read
as machine-written, because the real tell is **no specifics and no point of
view**: no named person, place, number, object or decision that only this writer
could know. Never invent one. When a paragraph has none, mark it
`[NEEDS REAL DETAIL: what kind of detail]` and ask the user. A short true detail
beats three polished generalities.

## Inputs

- The text.
- Optional: a voice sample (the user's real writing). If given, read it first and
  match sentence length, word choice, punctuation and openings. **The sample
  overrides the patterns below**, including the dash rule.
- Optional: the register (blog, letter, docs, chat, PR). With no sample, take
  voice from the register. Essays and personal writing may keep opinion,
  uncertainty, humour and asides. Reference, legal and technical text stays
  plain and neutral. For writing in a defined voice, the Part 1 mode is the
  register.

## Process

1. **Mark.** Read the whole text once. List every tell found, strongest first.
   Strong tells (staging, deep-sounding lines, forced triads, dramatic closers,
   inflated claims) justify an edit on one sighting. Weak tells (stacked hedges,
   hyphenated pairs, passive voice, curly quotes) need other tells nearby.
2. **Fix the facts first.** Keep every supported claim. Do not add a fact, name,
   number, date, quote or citation that is not in the source or from the user. A
   lost claim is an error unless a pattern calls for cutting it. An unsupported
   addition is an error.
3. **Rewrite around the point.** For each paragraph ask: what does this tell the
   reader to know or do? Write that. Use the plain word, a human subject doing
   something, and a physical verb. Do not patch flagged phrases one by one. Vary
   sentence length. If you cannot state the point concretely, cut the paragraph
   or mark it `[NEEDS REAL DETAIL]`.
4. **Audit.** Read it aloud. Ask "what still sounds AI-written?" Then search
   again for: contrasts, one-line closers, triads, repeated sentence openings,
   dashes, bold labels, quotable lines, headings that restate the next line.
5. **Score.** Rate 1 to 10 on each: **Directness** (statements, not
   announcements), **Rhythm** (varied, not metronomic), **Trust** (respects the
   reader), **Authenticity** (sounds human), **Density** (nothing cuttable).
   Below 35 out of 50: revise and re-score. Stop after 2 loops and tell the user
   what is still weak and why, usually missing specifics.
6. **Deliver.** Pasted text: the draft, remaining patterns, the final rewrite,
   the score. File mode: write only the final text, leave code, paths, commands,
   data and link targets unchanged, then a short summary. Embedded mode: the
   final text only.

## Patterns

### A. Staging instead of stating (strong)
- **Not X but Y.** "It's not X, it's Y", "less X, more Y", "not just X but Y",
  "this isn't X, this is Y", and denying a claim nobody made. Test: if a sentence
  has "isn't", "wasn't" or "aren't" followed by a correcting "It's" or "They're",
  kill it and state the positive claim.
- **One-line closers and dramatic fragments.** A short line that restates the
  paragraph or stages emphasis. End the paragraph on its last piece of
  information.
- **Quotable lines.** Ordinary points dressed as hidden truths or aphorisms. If
  it could be a pull-quote, rewrite it as a plain claim.
- **Staged run-up.** Announcing the point ("Here's the thing", "Let's dive in")
  or staging fake candor ("Where we could be wrong", "Honest limits") before
  saying it. Just say it.
- **Arguing with no one.** Rejecting objections or options that appear nowhere
  else in the text.
- **Rhetorical setups and false agency.** Questions the writer answers
  immediately; objects doing human things ("the data tells us"). Name the
  person.

### B. Rhythm by rule
- **Forced triads.** Groups of three whether or not the content has three parts.
  Use the real number; prefer two over three.
- **Repeated sentence openings.** First, Second, Third. Consecutive sentences
  with the same subject.
- **Matched sentence lengths.** Three in a row of similar length: break one.
- **Dashes as the universal connector.** Avoid em dashes and en dashes. Use a
  period or comma. Write ranges with "to" ("Jan to Sep 2026"). Exception: Mode A
  and B allow genuine grammatical em dashes.
- **Colon as a connector.** Fine before a list or an example. Not as a
  mid-sentence hinge or a comparison frame ("If you're coming from X: instead of
  A, you B"). Let the point stand on its own. Do not end a paragraph on a colon
  that promises data and then pivot to vision.
- **Stacked qualifiers.** One clear hedge beats four. (weak alone)
- **Hyphenated pairs everywhere.** (weak alone)
- **Passive voice and missing subjects.** Name who acts. Passive is fine only
  when the actor is unknown or irrelevant.

### C. Inflation and borrowed authority
- **Inflated significance.** Ordinary facts as pivotal, landmark, or promising a
  bright future. Generic conclusions.
- **Vague attribution and borrowed authority.** "Experts say", lists of prestige
  outlets. Name the source or delete.
- **Vague connection.** "Associated with", "linked to" where the source names the
  actual relationship.
- **Shallow -ing riders.** "highlighting", "ensuring", "reflecting", "showcasing"
  bolted onto a simple fact.
- **Sales language.** Advertising tone about a product, place or company.
- **Avoiding is/are/has.** "serves as", "stands as", "boasts", "features". Say
  "is" or "has".

### D. Vocabulary
- **AI words.** additionally, crucial, delve, enduring, enhance, foster, garner,
  interplay, intricate, landscape (abstract), pivotal, showcase, tapestry
  (abstract), testament, underscore, vibrant, robust, leverage, utilise. Use the
  plain word.
- **Abstract metaphor nouns.** substrate, wedge, vector, locus, vantage, nexus,
  primitive (as a noun), surface (as in "API surface"), bedrock, scaffolding,
  modality, paradigm, gold-plating, ratchet, endgame, north star, flywheel. Name
  the concrete thing.
- **Synonym cycling and false ranges.** Pick one word and repeat it. "From X to
  Y" only on a real scale.
- **Filler.** "In order to", "due to the fact that", "it is important to note".
- **Adverbs.** Cut them, or use a stronger verb.

### E. Plain speech
- **Say what it does, not how it feels.** "Fast, lightweight startup" names a
  feeling. "Starts in 120 ms" names a number. If the sentence could appear
  unchanged in another project's docs, it says nothing about this one.
- **Mannered prose.** Aphorisms, rhetorical fragments, personified code,
  figurative verbs where a literal phrase exists.
- **Dense sentences.** One idea per sentence. Split if the reader must back up.
- **Over-compression.** Dropped articles, arrows, symbol-speak. Write whole
  sentences.
- **Put the reader in the room.** "You" over "people". Specific scene over
  abstraction. Trust the reader: no hand-holding, no softening.

### F. Formatting
- Bold only for real emphasis, not decoration or a label that restates the line
  ("**Speed:** Speed improved"). A bold lead-in that names the item,
  ends in a period, and is followed by genuinely new detail is fine, not a tell.
- Sentence-case headings. No decorative emoji or arrows.
- Straight quotes and apostrophes.
- A heading is not repeated in the next sentence.

### G. Artifacts of the chat or the draft
- Chatbot residue: greetings, praise, offers, sign-offs.
- Writing about the document: narrating how the text was made or laid out ("This
  is the first edition", "which is why we published the methodology"). Say the
  thing the reader needs, not the thing about the thing.
- Knowledge-limit disclaimers followed by plausible filler.

### H. Wrong reader
- Re-explaining context the reader already has and burying the decision. Lead
  with the decision or result.

### I. Tone
- **No slogan openers.** "Q3 was about widening the base." reads sharp, arrogant
  and AI-coded. Open with the plain fact: "In Q3 we focused on growing the
  customer base."
- **No smug or declarative kickers** ("That's the trade we want.") and no cheesy
  closings ("we look forward to building it together"). End plainly and
  sincerely, or end on the last fact.
- **Soften blunt X-failed, Y-worked contrasts.** "Didn't move conversion much. A
  more targeted change worked better" beats a flat reversal.
- **No cute labels as lead-ins** ("Listings stay clean."). Say the claim.
- **Do not name comparables presumptuously** (a competitor's share-price story).
  Allude instead.
- **Keep one basis.** One currency, one denominator, averages labelled as
  averages, estimates labelled "(est.)". If a metric fell, say it fell.
- **Banned outright:** "In today's ...", "It's important/worth noting",
  delve, unpack, harness, leverage, utilise, landscape, realm, robust,
  game-changer, cutting-edge, straightforward, "in order to", Furthermore,
  Additionally, Moreover, "moving forward", "at the end of the day", "in other
  words", "let that sink in", "this changes everything", supercharge, unlock,
  future-proof, "in the age of AI".

## Technical and docs register

For READMEs, PR descriptions, runbooks and code comments, the tells are
different: feeling-words instead of mechanisms, and compression instead of
padding.

- Name the mechanism or the number. Not "a friendlier error" but "the error
  names the file and line". Not "built for scale" but "handles 10,000 requests
  a second on one core".
- Do not over-compress. "Config missing -> abort, no write" becomes "If the
  config file is missing, the tool stops and writes nothing."
- Active voice with a named actor: "the compiler validates queries", not
  "queries are validated".
- Spell out arrows and abbreviations on first use. Whole sentences with articles
  and verbs.

## Before and after

| Tell | Before | After |
|---|---|---|
| Not X but Y | "This isn't a pricing story. It's a retention story." | "Retention rose while prices stayed flat." |
| Forced triad | "faster, simpler, and more reliable" | "faster and more reliable" (if simpler is not true) |
| Quotable closer | "Those 10 years are why this data exists." | End the paragraph on what the 10 years taught. |
| Staged candor | "Where we could be wrong" | "Limits" |
| Inflated | "a pivotal moment for the industry" | the number and the date |
| Vague source | "Experts say signups are shifting." | "The Q2 report counted 127 signups, down from 153." |
| -ing rider | "...ensuring a seamless experience" | delete, or say what happens |
| Fancy is | "The platform serves as a hub" | "The platform is a hub" |
| Slogan opener | "Q3 was about widening the base." | "In Q3 we focused on growing the customer base." |

## Sources and licences

- Structural patterns after Wikipedia "Signs of AI writing" via blader/humanizer
  (MIT), and the mark, draft, audit loop.
- Reader-in-the-room rules and the 5-dimension score gate after hardikpandya/
  stop-slop (MIT).
- The voice modes, tone rules, banned phrases, and the plain-speech and
  docs-register rules are the author's own synthesis, adapted from earlier
  personal style notes and a team style checklist.
