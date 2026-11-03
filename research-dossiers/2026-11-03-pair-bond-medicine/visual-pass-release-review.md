# Independent Gate 2 visual revision review · 3 November 2026

Verdict: **pass** for the visual revision.

I did not edit the report, its assets or generation scripts. I inspected the actual locally rendered canonical report at `http://127.0.0.1:1437/learning/can-we-build-better-bonds/`, using Chromium through Playwright at 390×844 and 1440×1000. For each new card visual (01, 02, 05, 07, 08, 10, 11, 13, 14, 17, 19), I scrolled its full image into view, saved a screenshot, and opened the screenshot for perceptual review. Screenshots are `review-visual-{390,1440}-{card}.png` in this dossier. Final jurisdiction screenshots have `-10-final` suffixes. I also inspected the repaired economics chart on card 12 at both widths (`review-visual-{390,1440}-12.png`).

The required checker was run independently twice, including after the final jurisdiction correction. Actual final output:

```text
cards 21 · visuals on cards 21 · svg 14 · raster 7 (need ≥7)
PASS
```

All 22 new-figure render captures reported `loaded: true`. The new visuals remained within the card width: on the phone, each image spanned x=22.5 to367.5 (345px wide); desktop images were 600px wide. Every full image fit vertically after scrolling into view.

## Findings

- Five new watercolor assets explain distinct nearby claims: molecule versus voluntary partner choice; research versus clinical supply; reliable safety records as an approval constraint; conditional service stages; and paid practice commitment with a clinical owner and renewal date. They are not repeated decoration. Captions identify them as generated metaphors rather than clinical evidence.
- Watercolor edges composite cleanly on the paper card at phone and desktop widths. No opaque rectangle, painted checkerboard or visible halo was found. The visual language matches the existing muted, hand-watercolor cutouts.
- Six new diagrams preserve the corresponding ledger boundaries: E21/E22 asset rights and indication-specific evidence; E06/E08/E09 controlled versus uncontrolled conjoint evidence; E13/E19/E20 local access; E10 functioning versus breakup endpoints; E30 model economics and founder proceeds.
- One initial fidelity defect was found in the Australia diagram: “psilocybine: depression” was broader than the text and E19's treatment-resistant depression. The parent changed it to “psilocybine: TRD” and regenerated. I inspected final renders at both widths; adjacent prose spells out treatment-resistant depression. This is resolved.
- Economics card 12 is repaired: the Low category sits above its bar; −155.90 is inside the negative bar in white; the zero line remains explicit. At 390px, category, value and axis labels are distinct and readable. There is no overlap or clipping. Base and High values sit beyond their bars.
- Scenario diagrams visibly retain their hypothetical status. The pilot chart uses an honest zero baseline and a common dollar scale; enrolment break-even is a separate textual measure. Compensation, operating surplus and equity-exit proceeds are separated rather than presented as comparable investment returns.
- No new treatment efficacy, approval, current demand, acquisition probability or observed financial return is implied by the new assets.

## Scope and limits

This is an independent review of the revised visuals and their fidelity to the existing dossier, not new primary-source research or a clinical/legal opinion. Parent verification separately covers the private Hugo build, all three required viewport sizes, every card ending, direct hashes and page errors. No renderer or stylesheet change was reviewed because none was part of this revision. No git commands were run.
