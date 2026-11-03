# Visual revision verification · 3 November 2026

Private Hugo command: `hugo --destination /tmp/fb-ai-advisory-bookshelf/site --cacheDir /tmp/fb-ai-advisory-bookshelf/cache --noBuildLock --quiet`

Actual result: exit code 0; quiet output empty.

```text
cards 15 · visuals on cards 15 · svg 10 · raster 5 (need ≥5)
PASS
```

Actual viewport results from report.json:

```text
390x844: cards=15 images=15 unloaded=0 docOverflow=False pageErrors=0 hashFailures=0 overflows=0 unreachable=0
737x862: cards=15 images=15 unloaded=0 docOverflow=False pageErrors=0 hashFailures=0 overflows=0 unreachable=0
1440x1000: cards=15 images=15 unloaded=0 docOverflow=False pageErrors=0 hashFailures=0 overflows=0 unreachable=0
```

All 15 direct hash URLs loaded afresh at each viewport. A preliminary same-document hash iteration was replaced with fresh reloads to test the requested direct-load behavior.

`sips -g hasAlpha` actual output:

```text
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/advisers.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/disagreement.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/founder-time.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/rights.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/wedge.png
  hasAlpha: yes
```

PIL actual results: all five RGBA, corners [0, 0, 0, 0]. New files copied unmodified from built-in image_gen output. No rectangular background or halo seen on rendered paper at phone/desktop.

Narrative invariant PASS: stripping figures and normalizing whitespace yields original prose exactly.

Files written:

- content/research/ai-advisory-bookshelf/index.md
- static/images/ai-advisory-bookshelf/{disagreement,rights,wedge}.png
- static/images/ai-advisory-bookshelf/{denominators,tool-boundary,case-file,break-even,renewal-gate,falsifiers}.svg
- research-dossiers/2026-11-03-ai-advisory-bookshelf/{build-visual-pass.py,check-visual-pass.mjs,visual-coverage.md,pre-visual-pass.md,visual-pass-results.md,report.json,evidence-review-visual-pass.md}
- research-dossiers/2026-11-03-ai-advisory-bookshelf/{390,737,1440}-card*-{top,bottom}.png

Only permitted topic paths modified. No git commands. Independent review PASS; Hugo server stopped after review. Parent publishes.
