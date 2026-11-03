# Phase 2 release checks · 3 November 2026

Scope: narrative and artifacts for subsea-robotics only. Parent publishes. No git commands executed. No shared renderer or CSS edited. Canonical path: /learning/eyes-beneath-the-shipping-lanes/; aliases /research/subsea-robotics/ and /learning/subsea-robotics/.

## Gate 1 corrections applied first
E01 now describes ICPC’s lack of state-sabotage data, anecdotal absence of verified state cases since WWII, and <1% deliberate/unverifiable-intent global annual damage. Disagreement table now cites that counterweight explicitly. E26 identifies uncalibrated potentially optimistic $4,000 vessel day. model.py now emits 2×/3× charter stresses; scenario-model.json regenerated and arithmetic appended. Public model copied verbatim by build-visuals.py.

Actual model output:
```
low: days=11; campaign contribution=$-35,000; annual cash=$-810,000; annual economic=$-910,000; break-even campaigns=None; capacity=20
base: days=5; campaign contribution=$21,000; annual cash=$-348,000; annual economic=$-448,000; break-even campaigns=34; capacity=44
high: days=3; campaign contribution=$43,000; annual cash=$432,000; annual economic=$332,000; break-even campaigns=17; capacity=73
PASS: scenario arithmetic, capacity checks, and sensitivity outputs generated; commercial inputs remain unverified.
vessel day cost 2x (uncalibrated stress) 1000 -688000.0
vessel day cost 3x (uncalibrated stress) -19000 -928000.0
```

## Private build
`hugo --destination /tmp/fb-subsea-robotics/site --cacheDir /tmp/fb-subsea-robotics/cache --noBuildLock --quiet` returned exit 0 with empty stdout. Repeated after final assets and model links. Hugo version 0.156.0.

## Alpha
Actual command: `sips -g hasAlpha static/images/subsea-robotics/local-autonomy.png static/images/subsea-robotics/recovery.png`
```
/Users/yingcong/Code/seahyc.github.io/static/images/subsea-robotics/local-autonomy.png
  hasAlpha: yes
/Users/yingcong/Code/seahyc.github.io/static/images/subsea-robotics/recovery.png
  hasAlpha: yes
local-autonomy.png corners= [0, 0, 0, 0] alpha extrema= (0, 255)
recovery.png corners= [0, 0, 0, 0] alpha extrema= (0, 254)
```
PIL read-only decoded corners. ImageMagick paper-composite preview and actual rendered screenshots checked; final illustration has no rectangular edge. Built-in imagegen final recovery source exec-0314d3c8-5e5f-4813-ab30-c5edc69e2f03.png; no raster alpha editing.

## Browser verification method
Repo Playwright Chromium. Initial sandbox launch failed with MachPortRendezvous permission error; approved escalated run succeeded. Fixed copied checker: lastElementChild was a hidden separator; now last visible substantive element is measured. Every actual ending has nonempty text and real bounds. Fresh direct links use a unique query and networkidle, preventing overlapping same-document animation. Initial live-reload server was later frozen (--watch=false --disableLiveReload) because concurrent reports caused execution-context destruction during screenshots. Final report.json is authoritative.

18 cards,6 unique substantive visuals: two generated watercolor illustrations,four original explanatory SVGs. Minimum SVG text21px at600px width. Full card endings, source links, loaded assets, document and element overflow checked at390×844,737×862,1440×1000. Index count1 and direct hashes checked. Exact final summaries appended below.

## Boundary exception requiring parent awareness
The first `hugo server` invocation followed the supplied server example without an explicit destination. It reported “Serving pages from disk” and may have regenerated public/, outside the requested boundary. It was stopped and restarted with --destination /tmp/fb-subsea-robotics/server. No public cleanup/revert was attempted because this is a concurrently shared repository and such edits were forbidden. All subsequent builds/servers used private destinations. This exception prevents an unqualified claim that only allowed paths were affected.

## Final exact checker summary
```text
direct hashes: 18 / 18
index entries: 1
390x844: cards=18, uniqueImages=6, unloaded=0, errors=0, docOverflow=False, elementOverflows=0, emptyEndings=0, unreachable=0
737x862: cards=18, uniqueImages=6, unloaded=0, errors=0, docOverflow=False, elementOverflows=0, emptyEndings=0, unreachable=0
1440x1000: cards=18, uniqueImages=6, unloaded=0, errors=0, docOverflow=False, elementOverflows=0, emptyEndings=0, unreachable=0
```
Gate2 independent verifier: pass. See release-review.md. Preview server stopped after final review. Publication reserved for parent.
