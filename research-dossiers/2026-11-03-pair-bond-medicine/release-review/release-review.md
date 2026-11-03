pass

Independent Gate 2 release review · 3 November 2026. Read-only review of report, ledger, execution path, model, Gate 1 findings and actual rendered HTML at `http://127.0.0.1:1417/learning/can-we-build-better-bonds/`. Reviewer wrote only this review and evidence under `release-review/`. No publishing, git commands, shared engine or report edits.

## Narrative fidelity and execution

- Cover preserves the attribution boundary: Luckey claim is a posted transcription, not authenticated original audio; attention is not clinical proof.
- Cover and card 01 distinguish approximately $2.8bn upfront and up to $1bn contingent, completed acquisition versus announcement, BPL-003/TRD versus EMP-01/social anxiety. Matches E21/addendum; no $4.2bn combined IPR&D presented as acquisition price.
- Cards 02–05 preserve oxytocin limits: receptor-null vole findings are not proof of irrelevance; 47-couple acute laboratory effects are not divorce outcomes; Sikich 290 randomized is a separate pediatric-autism null, not a direct adult couples null. Prescription Pitocin rebuts unregulated premise; no chronic-dependence reassurance, no approved marriage indication, no exhaustive unread DSM classification asserted. Matches E02–E05/E11–E15/E23.
- Cards 06–08 give the strongest controlled MDMA case without transferring it to couples: MAPP2 n=104 and author-abstract numerical limits; six-couple uncontrolled protocol; NCT06044675 planned 60 individuals, not completed couples, no posted results. FDA rejection wording limited to confirmed safety-data reliability with printed page 2 link. No assumed US approval from the executive order or reported resubmission. Matches E06–E09/E16–E18/E32.
- Cards 09–11 evaluate all four requested routes and choose bounded non-drug service; legal access remains jurisdiction/product-specific; Australia AP access is not marketing approval; Singapore statutory-exemption gap stays disclosed. Doss functioning versus breakup distinction remains abstract-level and product-specific. Direct OurRelationship workflow competition is prominent. No TAM/distress denominator explicitly stated. Matches E10/E19/E20/E24/E27/E29.
- Cards 12–13 model every input as assumption, include acquisition and labour, expose losses and break-even. Base $129.05, low −$155.90 and high $249.03 match JSON; 2,325 break-even and 100-enrolment/$12,905 learning gate remain distinct. OurRelationship prices explicitly collected by research agent, not re-verified parent review. Four required Gate 1 public corrections survive.
- Seven of 21 cards (14–20) cover execution: conditional stages; founder/clinical lead/counsel/engineer/statistician responsibilities; first-quarter budget and timing; independent consent; practice owner buyer and later EAP procurement; clinical cofounder and measurement learning; funding and legal scope; salary/profit/exit distinctions; explicit stop/go and 12–24 month comparison. These track execution-path.md and do not assert outreach, pilots, quotes or financing already obtained.
- Strong bear case remains active: unreliable human oxytocin translation, no verified approved bonding indication, FDA safety-data skepticism, coercion/consent risk, incumbents doing exact proposed job, service below self-financing and no borrowed pharma valuation. A newcomer can follow possibility → evidence limits → company choice → economics → execution.

## Rendered checks

Command: `node research-dossiers/2026-11-03-pair-bond-medicine/release-review/check.mjs`.
Initial sandbox launch hit macOS MachPort permission denial; read-only outside-sandbox headless launch succeeded. Initial same-document hash loop raced animation; checker corrected to use a fresh `about:blank` → direct URL load for each hash. No renderer changes or claimed product failures from the checker race.

Real successful output:

```json
{
  "viewports": [
    {"width":390,"height":844,"cards":21,"images":10,"unloaded":[],"docOverflow":false,"errors":[],"overflow":[],"unreachable":[]},
    {"width":737,"height":862,"cards":21,"images":10,"unloaded":[],"docOverflow":false,"errors":[],"overflow":[],"unreachable":[]},
    {"width":1440,"height":1000,"cards":21,"images":10,"unloaded":[],"docOverflow":false,"errors":[],"overflow":[],"unreachable":[]}
  ],
  "hashesPassed":21,
  "hashesTotal":21,
  "indexCount":1
}
```

Full per-card ending coordinates, last text, images, hashes and overflow observations are in report.json. Screenshots capture top views of cover, oxytocin evidence, cutouts, MDMA evidence, route comparison, economics, calendar, capital and final gates at all required widths; ending screenshots include cover and long economics/capital/final cards. Actual viewed 390px cover, table, both cutouts and 1440px cover: readable, no clipped heading or rectangular cutout background. Long cards scroll rather than losing their ending. Mobile table stacks semantically and remains within card width.

## Visual coverage and transparency

Ten unique visuals: eight substantive SVG diagrams/model chart and two editorial watercolors. The required minimum is seven. Visuals on cards 0,3,6,9,12,15,18 cover every rolling three-card window; extra visuals on 4,16,20 reinforce mechanism, consent and decisions. SVGs are original, units/sample and scenario boundaries attached; chart includes zero and losses. Two cutouts visibly blend into card paper without rectangle or checkerboard.

Real independent alpha output:

```text
session-bridge.png
  hasAlpha: yes
two-gates.png
  hasAlpha: yes
two-gates.png RGBA (1752, 897) corner alpha [1, 0, 0, 0] fully transparent fraction 0.3245776128444383
session-bridge.png RGBA (1752, 897) corner alpha [0, 0, 0, 0] fully transparent fraction 0.4674969329525613
```

One two-gates corner is alpha 1/255 (approximately 0.4% opacity), visually transparent, with other corners zero and large genuinely zero-alpha canvas; this is not a baked background. No raster-opacity release blocker found.

## Canonical destination and scope

One index link to `/learning/can-we-build-better-bonds/` observed. Both `/research/pair-bond-medicine/` and `/learning/pair-bond-medicine/` are Hugo refresh/canonical aliases to that destination, not duplicate report bodies. Report owns its content/assets only; no shared engine change was part of this work, so cross-report engine regression is not a required release gate. Parent is responsible for publication under the user's explicit no-git and parent-publishes constraint. This pass is readiness evidence, not a claim of live publication or clinical/legal endorsement.

## Final changed-card recheck · PASS

After initial review, lead added the research appendix to card 20, converted the same card-13 sensitivity values into a table, and clarified stage cash envelopes versus annual fixed costs on card 18. These changes match E30/execution-path.md and preserve all four parent corrections. The appendix identifies primary-source limits, disagreement resolutions and next evidence collection without introducing an unsourced clinical or market conclusion.

Command: `node research-dossiers/2026-11-03-pair-bond-medicine/release-review/recheck.mjs`.

Real result summary (full output: recheck.json; new top/bottom screenshots have `recheck` in their names):

```text
390x844: cards 13/18/20 overflow=[], errors=[], all images loaded, all endings reachable
737x862: cards 13/18/20 overflow=[], errors=[], all images loaded, all endings reachable
1440x1000: cards 13/18/20 overflow=[], errors=[], all images loaded, all endings reachable
card20 final text: ...scoped bids replace allocations; an independent statistician fixes the evaluation before outcomes are seen. The stop rules above govern further spending.
```

Actual DOM anchor interaction tested independently at every viewport: loaded card 13 directly, clicked the visible `Original unit model` anchor, waited 5.2 seconds, read URL and active slide. All three returned URL `#card-12-the-cost-of-helping-a-couple` and active slug `12-the-cost-of-helping-a-couple`. Actual inline source-card navigation works. `page.goto` calls between same-document hash URLs are not a reliable substitute for the click or fresh-document direct-load checks. No shared-reader edit or citation URL workaround required.

Final verdict remains **pass** for the amended report.

---
# Gate 2 (parent-run, cross-model) · PASS · 3 November 2026
Independent Claude release reviewer, read-only. Canonical /learning/can-we-build-better-bonds/ (aliases redirect). 21 cards; at 390x844, 737x862, 1440x1000: no errors/overflow, all endings reachable, 21/21 hashes, in-text card links work. Numbers and model outputs match the ledger; all four Gate 1 corrections confirmed in prose; Luckey's claims quoted as transcription and fact-checked; consent/coercion ethics covered. Execution path = cards 13–20 (8/21), faithful to execution-path.md. 7 qualifying visuals cover every 3-card window (+3 extras). PNG cutouts clean on live card. Index lists once; layouts/ and static/css unchanged. Evidence: /tmp/gate2-pair-bond-medicine/.
