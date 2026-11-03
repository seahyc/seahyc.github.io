# Phase 2 completion · AI advisory bookshelf

Article: content/research/ai-advisory-bookshelf/index.md
Title: A Bookshelf That Argues Back
Canonical after parent publication: https://seahyingcong.com/learning/a-bookshelf-that-argues-back/
Topic aliases: /research/ai-advisory-bookshelf/ and /learning/ai-advisory-bookshelf/

Decision: conditional bounded side project; no venture commitment. No claim that the eventual market ceiling is known. The residual product is a cited decision journal for recurring pricing/packaging decisions by bootstrapped B2B founders. No validation experiment was executed.

All three Gate1 corrections applied first in dossier files. Independent Gate2 pass preserved in release-review.md.15 cards,6 unique substantive visuals (4 original SVGs,2 generated watercolor PNGs). Every rolling window of3 cards covered. Transparent PNGs have verified alpha and zero-alpha corners, rendered without rectangular backgrounds. Minimum SVG text22px at600px canvas width. First cover generation rejected; regenerated cutout used.

## Real command results

```
$ hugo --destination /tmp/fb-ai-advisory-bookshelf/site --cacheDir /tmp/fb-ai-advisory-bookshelf/cache --noBuildLock --quiet

exit_code=0
$ sips -g hasAlpha static/images/ai-advisory-bookshelf/advisers.png static/images/ai-advisory-bookshelf/founder-time.png
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/advisers.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/ai-advisory-bookshelf/founder-time.png
  hasAlpha: yes

exit_code=0
advisers.png: corner alpha=[0, 0, 0, 0]; size=1536x1024
founder-time.png: corner alpha=[0, 0, 0, 0]; size=1774x887
$ node research-dossiers/2026-11-03-ai-advisory-bookshelf/check.mjs
{
  "indexCount": 1,
  "aliases": [
    {
      "path": "/research/ai-advisory-bookshelf/",
      "canonical": true
    },
    {
      "path": "/learning/ai-advisory-bookshelf/",
      "canonical": true
    }
  ],
  "viewports": [
    {
      "width": 390,
      "height": 844,
      "cards": 15,
      "images": 6,
      "uniqueImages": 6,
      "unloaded": 0,
      "docOverflow": false,
      "errors": [],
      "overflows": [],
      "unreachable": [],
      "hashFailures": []
    },
    {
      "width": 737,
      "height": 862,
      "cards": 15,
      "images": 6,
      "uniqueImages": 6,
      "unloaded": 0,
      "docOverflow": false,
      "errors": [],
      "overflows": [],
      "unreachable": [],
      "hashFailures": []
    },
    {
      "width": 1440,
      "height": 1000,
      "cards": 15,
      "images": 6,
      "uniqueImages": 6,
      "unloaded": 0,
      "docOverflow": false,
      "errors": [],
      "overflows": [],
      "unreachable": [],
      "hashFailures": []
    }
  ]
}
exit_code=0 (captured final run)
15 cards;6 unique explanatory visuals;all13 rolling three-card windows covered
```

## Delivery boundaries

Build destination and cache private under /tmp/fb-ai-advisory-bookshelf; shared renderer/CSS, public/ and other topics untouched. No git commands, no publication. Parent publishes article, assets AND linked research-dossier source files, then verifies canonical URL. The local1416 server was stopped after independent review. Full written-file manifest: files-written.txt; it includes42 QA screenshots and2 JSON reports.
