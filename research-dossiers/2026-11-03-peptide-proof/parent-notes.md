# Parent-supplied evidence · 3 November 2026

## Google Trends: US search interest, past 5 years (pulled by the parent)
Method: on 3 Nov 2026 the parent opened Google Trends Explore in YC's Dia browser and called Trends' own page endpoints
(`/trends/api/explore` → TIMESERIES widget → `/trends/api/widgetdata/multiline`) for geo=US, time "today 5-y", web search,
all categories. Weekly values were averaged by calendar year. Values are relative (0–100) **within each query set**, so
only compare terms inside the same set. Last week included: 1–7 Nov 2026 (2026 is a partial year).

Query set A — ["Ozempic","testosterone","peptides","loneliness","couples therapy"]
| Year | Ozempic | testosterone | peptides | loneliness | couples therapy |
|---|---|---|---|---|---|
| 2021 | 7 | 30 | 6 | 3 | 2 |
| 2022 | 17 | 38 | 7 | 3 | 3 |
| 2023 | 61 | 43 | 9 | 3 | 4 |
| 2024 | 72 | 45 | 10 | 4 | 4 |
| 2025 | 55 | 51 | 21 | 4 | 5 |
| 2026 | 43 | 62 | 61 | 6 | 6 |

Query set B — ["menopause","Ozempic","testosterone","peptides","HRT"]
| Year | menopause | Ozempic | testosterone | peptides | HRT |
|---|---|---|---|---|---|
| 2021 | 17 | 7 | 30 | 6 | 4 |
| 2022 | 22 | 17 | 38 | 7 | 6 |
| 2023 | 25 | 61 | 43 | 9 | 7 |
| 2024 | 27 | 72 | 45 | 10 | 8 |
| 2025 | 32 | 55 | 51 | 21 | 11 |
| 2026 | 35 | 43 | 62 | 61 | 15 |

What it proves: US search interest in "peptides" rose roughly tenfold from 2021 to 2026 relative to its own 2021 level
(6 → 61) and roughly tripled from 2025 to 2026 (21 → 61), in both query sets. What it does not prove: purchases, users,
spending, or which peptides; "peptides" also captures skincare and nutrition searches. Reproducible via the public
Trends UI: https://trends.google.com/trends/explore?date=today%205-y&geo=US&q=peptides
