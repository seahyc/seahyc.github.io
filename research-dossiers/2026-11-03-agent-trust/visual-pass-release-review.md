# Independent release review — visual revision

Verdict: **pass**. Reviewed 3 November 2026 against the requested visual-only scope. No article, asset, shared-renderer or stylesheet edits were made by this reviewer. No git commands or Hugo builds were run by this reviewer.

## Source fidelity and substance

Compared the current article with `index-before-visual-pass.md`. Removing exactly the eight added figure blocks produces byte-for-byte equality with the prior article. All original image references remain. The existing facts, front matter, caveats, argument and numerical assumptions are unchanged.

Real command output:

```text
original prose/front matter unchanged: True
cards: 18
original artwork references retained: True
```

There are seventeen image-bearing cards and one pure evidence/model appendix with readable tables. Six unique watercolors cover identity versus permission (cover), abuse versus paid demand (01), incumbent distribution (03), agency existence versus representative authority (05), choosing the missing-fact checkpoint (07), and inspectable evidence links (08). These explain the adjacent claims rather than merely decorate them. The four new diagrams explain competitive overlap, leakage-resistant evaluation, operating-cost sensitivity and reachable harm. New sensitivity values match `scenario-model.json`; hypotheses remain labelled as proposals and invented model assumptions remain labelled as such.

## Actual rendered review

Independently launched local Playwright against `http://127.0.0.1:1435/learning/trust-when-agents-arrive/?review=visualpass`. Inspected every card's image loading, content bounds and table substitution at 390×844 and 1440×1000. Saved exact results in `review-visual-pass-results.json` and rendered captures in `review-visual-pass-<width>-card<n>.png`. Visually inspected the new watercolor cards 01/03/05/07 composited on actual paper cards at both widths, plus diagrams 09/11/13/15 and existing numerical charts 10/12/14 at phone width. No rectangular field, painted checkerboard, visible halo, clipped chart label or label collision was present. The new watercolors use the existing muted sage/coral/ochre hand-watercolor language. Card 13's values sit after bars on separate rows from category labels. Existing negative contribution on card 12 occupies its own line and does not collide with “Low”.

Real Playwright output:

```json
[
  {
    "width": 390,
    "cards": 18,
    "imageCards": 17,
    "tableOnly": ["17-evidence-and-model"],
    "unloaded": [],
    "overflow": [],
    "docOverflow": false,
    "errors": []
  },
  {
    "width": 1440,
    "cards": 18,
    "imageCards": 17,
    "tableOnly": ["17-evidence-and-model"],
    "unloaded": [],
    "overflow": [],
    "docOverflow": false,
    "errors": []
  }
]
```

## Required checker and alpha

Independently reran the required checker on final assets:

```text
cards 18 · visuals on cards 17 · svg 11 · raster 6 (need ≥6)
PASS
```

All eleven SVGs passed its browser-measured text overlap/clipping checks. All six rasters passed its edge/corner alpha checks. `sips -g hasAlpha static/images/agent-trust/*.png` returned `hasAlpha: yes` for each of authority-link.png, borrowed-badge.png, demand-gap.png, owned-trust-roots.png, permission-gate.png and right-checkpoint.png. Pillow inspection independently returned:

```text
authority-link.png alpha (0, 255) corners [0, 0, 0, 0]
borrowed-badge.png alpha (0, 254) corners [0, 0, 0, 0]
demand-gap.png alpha (0, 254) corners [0, 0, 0, 0]
owned-trust-roots.png alpha (0, 254) corners [0, 0, 0, 0]
permission-gate.png alpha (0, 252) corners [0, 0, 0, 0]
right-checkpoint.png alpha (0, 254) corners [0, 0, 0, 0]
```

## Review boundary

This is a visual revision review, not new Gate 1 research. The article's external sources were checked against the existing ledger; their live contents were not researched anew. Publication is explicitly owned by the parent and was not performed or verified here. The root's required three-viewport endings/hash regression is separate from this independent phone/desktop visual review; this reviewer makes no independent claim to have rerun the 737px regression, direct-hash sweep or every ending-reachability check. Shared engine files were outside this change and were not modified.
