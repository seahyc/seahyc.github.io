# Generated illustration briefs and verification
2026-10-30. Built-in image_gen used; no CLI fallback. All4 originals RGBA with alpha extrema0..255; project WebPs retain alpha. Lead inspected all4 images. Editorial metaphors, not empirical evidence. Existing sourced diagrams retained; total10 visuals across21 cards, including one explanatory illustration in cards15–17.

Shared final prompt: hand-sketched hand-watercolor imperfect cheerful; uneven childlike ink contours, muted sage, ochre and brick-red translucent washes escaping outlines; no text or logos. Actual transparent alpha; no white, cream, paper texture, gradient, checkerboard, or baked background. Square composition.

- founder-labs.webp, cover: tiny founder at laptop orchestrates11 miniature contract laboratories with sample parcels and a central protein. Explains distributed biotech; number and scene illustrative, not a depiction of actual facilities.
- build-the-bridge.webp,02: engineer and biologist construct bridge from molecular design through vials/instruments towards patient benefit. Definite optimism is purposeful construction, not a promised cure.
- binding-function.webp,04: one key binds a protein-lock without action; another drives a lever changing downstream activity. Scientist compares them; conceptual metaphor, not atomic structure.
- evidence-enterprise.webp,15: scientist and expert assemble layers of sample, measured chart, notebook and transferable-rights folder into an enterprise that a research partner can assess. Diagram inside artwork is illustrative, no measured values.

Project files: static/images/pipeline-in-a-person/. Original generated PNGs preserved under /Users/yingcong/.codex/generated_images/01a18ab6-7c2a-73f1-b5b6-f850945e8d61/.

Shared reader root cause: edge-preview writes overwrote Swiper's transform/transition duration while a card navigation owned that transform, cancelling completion. New ownership guards defer preview writes and consume vertical momentum during navigation. Regression reproduces wheel during18→19 and verifies settled transform/hash plus subsequent navigation. Lead reran existing wheel/touch test and27 cross-report cases (9reports×3sizes); all passed.

Independent Gate2:PASS.21cards/10images at390x844,737x862,1440x1000;0page errors,0overflow cards,0unreachable endings; direct hashes correct; qualifying visuals per consecutive3-card group3,2,1,1,1,1,1. All4WebPs RGBA0..255 with clean paper integration.27cross-report cases across9Fieldbooks passed. Lead reran wheel-momentum and wheel/touch reader suite on final tree:PASS. Screenshot/report evidence /tmp/pipeline-revision-review/.
