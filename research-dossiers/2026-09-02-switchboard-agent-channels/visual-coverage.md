# Visual coverage — 16 cards (cover + 01–15)

Required watercolor/raster cutouts: ceil(16/3)=6. Delivered: 7 rasters. The 7 rasters were regenerated on 21 November 2026 with Codex built-in image generation (transparent_background=true); see image-prompts.md. They replace earlier Pillow-drawn procedural rasters (build-watercolors.py, superseded, kept only for history). Real alpha verified with sips and the checker.

| Card | Visual | Job | Type |
|---|---|---|---|
| Cover | switchboard-cover.png | Thesis: one switchboard connecting an agent to channels | generated watercolor (Codex imagegen) |
| 01 | brief-anatomy.svg | What buyer's brief asks vendor to own | diagram |
| 02 | one-way-door.png | Official API inbound-only | generated watercolor (Codex imagegen) |
| 03 | assets-and-gaps.svg | Built vs missing | diagram |
| 04 | sender-tightrope.png | Session continuity as risk | generated watercolor (Codex imagegen) |
| 05 | entry-prices.svg | Competitor entry prices | chart, zero baseline |
| 06 | copyable-castle.png | Copyable surface vs moat | generated watercolor (Codex imagegen) |
| 07 | two-markets.svg | Software vs labour markets, $499 vs $650–780 | chart/diagram |
| 08 | tone-inputs.svg | Voice inputs and counter-signal | diagram |
| 09 | liability-storm.png | Risk | generated watercolor (Codex imagegen) |
| 10 | first-90-days.svg | Proposed timeline | diagram |
| 11 | demand-funnel.svg | MIH-01 thresholds | chart |
| 12 | price-per-sender.svg | Derived $/sender | chart, zero baseline |
| 13 | learning-stack.png | Knowledge gaps | generated watercolor (Codex imagegen) |
| 14 | stage-gates-diagram.svg + stage-gates.png | Gates | diagram + generated watercolor |
| 15 | tables | Appendix | table exception |

Raster alpha: all 7 hasAlpha=yes; checker corners/edges clean. check-visuals.mjs: PASS.
