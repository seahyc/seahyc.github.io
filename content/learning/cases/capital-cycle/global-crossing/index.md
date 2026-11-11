---
title: "Global Crossing, April 2001"
slug: "global-crossing"
description: "A fibre builder spending five times its operating cash flow. Frozen on the day its FY2000 10-K was filed, then revealed."
date: 2026-11-11
layout: "case"
concept: "capital-cycle"
concept_title: "Capital cycle"
role: "Instance (lost)"
as_of: "2 April 2001"
status: "Prototype case 1 of 10"
data_grade: "Filed (SEC 10-K). Derived ratios are computed here."
reading_minutes: 12
years: [1998, 1999, 2000]
metrics:
  - {label: "Revenue (as restated in the FY2000 10-K)", values: ["424", "1,491", "3,789"], grade: "filed"}
  - {label: "Recurring adjusted EBITDA (company-defined, not GAAP)", values: ["364", "626", "1,469"], grade: "filed"}
  - {label: "Depreciation and amortisation", values: ["141", "451", "1,381"], grade: "filed"}
  - {label: "Operating loss", values: ["(20)", "(4)", "(1,396)"], grade: "filed"}
  - {label: "Cash from operations", values: ["349", "732", "911"], grade: "filed"}
  - {label: "Capex (purchases of property and equipment)", values: ["554", "1,962", "4,289"], grade: "filed"}
  - {label: "Property and equipment, net (year-end)", values: ["434", "4,941", "10,030"], grade: "filed"}
  - {label: "Goodwill and intangibles, net", values: ["none", "6,444", "11,481"], grade: "filed"}
  - {label: "Total assets", values: ["2,639", "19,217", "30,185"], grade: "filed"}
  - {label: "Long-term debt", values: ["1,066", "4,900", "6,271"], grade: "filed"}
  - {label: "Capex ÷ cash from operations", values: ["1.6×", "2.7×", "4.7×"], grade: "derived", derived: true}
  - {label: "Capex ÷ depreciation and amortisation", values: ["3.9×", "4.3×", "3.1×"], grade: "derived", derived: true}
  - {label: "Revenue ÷ net property and equipment", values: ["0.98", "0.30", "0.38"], grade: "derived", derived: true}
  - {label: "Recurring EBITDA ÷ capex", values: ["0.66", "0.32", "0.34"], grade: "derived", derived: true}
snapshot:
  - {label: "Cash and equivalents, 31 Dec 2000", value: "$1,477M, plus $146M restricted", source: "fy2000"}
  - {label: "Short-term borrowings", value: "$1,000M bridge loan, due 10 Apr 2002 or on closing of the ILEC sale", source: "fy2000"}
  - {label: "Unused capacity on revolving facilities", value: "about $532M", source: "fy2000"}
  - {label: "Senior notes issued 29 Jan 2001", value: "$1,000M at 8.70%, due 2007", source: "fy2000"}
  - {label: "2001 capex guidance", value: "$4.9 to $5.1 billion", source: "fy2000"}
  - {label: "Remaining cost of announced systems", value: "about $1.6 billion", source: "fy2000"}
  - {label: "Total liabilities, 31 Dec 2000", value: "$14,378M", source: "fy2000"}
  - {label: "Pro forma revenue", value: "$3,958M (2000) vs $3,761M (1999), up about 5%", source: "fy2000"}
  - {label: "Covenants", value: "Company reports compliance at 31 Dec 2000", source: "fy2000"}
cues:
  - {id: "rev_growth", text: "Reported revenue up 154% ($1,491M to $3,789M)", weight: "low", why: "Much of the perimeter was acquired: Global Marine, Frontier and Racal Telecom in 1999, IXnet/IPC ($3.2B) in June 2000."}
  - {id: "proforma", text: "Pro forma revenue up only about 5% ($3,761M to $3,958M)", weight: "high", why: "Strips out the acquisitions. Demand growth on a like-for-like basis was small."}
  - {id: "capex_cfo", text: "2000 capex of $4,289M against $911M cash from operations", weight: "high", why: "The business funded about a fifth of its own build. The rest came from outside capital."}
  - {id: "gap", text: "2001 capex guidance of $4.9 to $5.1B against $1.6B of cash", weight: "high", why: "A funding gap of several billion dollars that only open capital markets could close."}
  - {id: "bridge", text: "A $1,000M bridge loan due April 2002", weight: "medium", why: "A dated obligation inside the forecast window."}
  - {id: "revolver", text: "Only about $532M unused on the revolving facilities", weight: "medium", why: "Little committed backstop relative to the gap."}
  - {id: "rev_ppe", text: "Revenue per dollar of net property and equipment fell from 0.98 to 0.38", weight: "medium", why: "Capital grew far faster than the revenue it supported. Acquisitions inflate this, so read it as a direction."}
  - {id: "goodwill", text: "Goodwill and intangibles were 38% of total assets", weight: "medium", why: "Not a cash problem, but it means book assets overstate what the network could earn."}
  - {id: "ebitda", text: "Recurring adjusted EBITDA margin of about 39%", weight: "low", why: "EBITDA ignores capex. It covered about a third of 2000 capex."}
  - {id: "covenant", text: "Reported compliance with covenants at year-end", weight: "low", why: "Accurate at that date, and no guide to the next 12 months."}
claims:
  - claim: "Demand is exploding, so build ahead of it."
    evidence: "Reported revenue rose 154% in 2000, but pro forma revenue rose about 5% ($3,761M to $3,958M). Most of the headline growth came from acquisitions."
    verdict: "Mostly acquired growth"
    tone: "contradicted"
    source: "fy2000"
  - claim: "Positive EBITDA means the business works."
    evidence: "Recurring adjusted EBITDA was $1,469M, a 39% margin. Capex was $4,289M, depreciation and amortisation $1,381M, and the operating loss $1,396M. EBITDA covered about 34% of capex."
    verdict: "Misleading on its own"
    tone: "contradicted"
    source: "fy2000"
  - claim: "The network is the asset."
    evidence: "Net property and equipment rose from $434M to $10,030M while revenue per dollar of it fell from 0.98 to 0.38. The FY2002 10-K says 'actual demand failed to keep pace with available supply, resulting in intense price pressure.'"
    verdict: "Contradicted by a later filing"
    tone: "contradicted"
    source: "fy2000, fy2002"
  - claim: "Capital markets will fund the gap."
    evidence: "$1.6B of cash against about $5.0B of 2001 capex guidance, about $532M of unused revolver, $1B of new notes in January 2001 and a $1B bridge due April 2002."
    verdict: "Fragile, and consistent with the filing"
    tone: "unverified"
    source: "fy2000"
  - claim: "We can slow spending if demand slips."
    evidence: "Cash paid for property and equipment was about $2.64B in 2001 against $4.9 to $5.1B guided, and about $281M in 2002. The company still filed for Chapter 11 on 28 January 2002."
    verdict: "Cuts came too late to prevent the filing"
    tone: "contradicted"
    source: "fy2002"
sources:
  - id: "fy1999"
    label: "Global Crossing Ltd, Form 10-K for FY1999"
    filed: "17 Mar 2000"
    accession: "0000950130-00-001357"
    url: "https://www.sec.gov/Archives/edgar/data/1061322/000095013000001357/0000950130-00-001357.txt"
    used: "FY1999 figures as first reported (revenue $1,665M, net loss $71M, net property and equipment $6,026M)."
  - id: "fy2000"
    label: "Global Crossing Ltd, Form 10-K for FY2000"
    filed: "2 Apr 2001"
    accession: "0000950130-01-001603"
    url: "https://www.sec.gov/Archives/edgar/data/1061322/000095013001001603/0000950130-01-001603-0001.txt"
    used: "Selected financial data, MD&A, cash flow statement (page F-7), debt note. The as-of source for the whole case."
  - id: "fy2002"
    label: "Global Crossing Ltd, Form 10-K for FY2002"
    filed: "8 Dec 2003"
    accession: "0001193125-03-090817"
    url: "https://www.sec.gov/Archives/edgar/data/1061322/000119312503090817/0001193125-03-090817.txt"
    used: "The reveal: Chapter 11 date, plan terms, 2001 and 2002 capital spending, industry commentary."
---

## 00 · What this case trains

In a capital cycle, a boom draws in capital, the capital builds capacity, capacity outruns demand, and prices fall. Telling at the time whether capital is earning its keep is hard, because every number looks fine until the cycle turns.

This case freezes Global Crossing on **2 April 2001**, the day it filed its FY2000 10-K. You see what a reader could see then. You commit to a call and a probability. Then the outcome and the numbers are shown.

If you already know how this ended, tick the box in the drill. The answer is saved but left out of your calibration score.

---

## 01 · The company on 2 April 2001

Global Crossing was formed in March 1997 to lay undersea fibre. Within three years it had grown by acquisition: Global Marine Systems (July 1999), Frontier (September 1999), Racal Telecom (November 1999) and IXnet/IPC ($3.2 billion, June 2000). The sale of its local phone business (the ILEC) to Citizens for $3.7 billion in cash was pending, and GlobalCenter was going to Exodus. Both appear in the filings as discontinued operations.

The thesis, in one line of my own summary and not a company quote: data traffic was growing, Global Crossing owned the pipes, and the way to win was to build more of them than anyone else.

---

## 02 · The numbers they filed

{{< case-metrics >}}

{{< case-chart "capex-vs-cash.svg" >}}

**Restatement note.** FY1999 was first reported with revenue of $1,665M, a net loss of $71M and net property and equipment of $6,026M. The FY2000 10-K restates 1999 to $1,491M, $111M and $4,941M. The ILEC and GlobalCenter moved to discontinued operations, and the FY2000 10-K says that restating GlobalCenter's goodwill life from 10 to 5 years added $40.6M to the 1999 loss, which fits the $71M to $111M change. This is why every case records which filing a number comes from.

**Snapshot at 31 December 2000.**

{{< case-snapshot >}}

---

## 03 · Decision point

It is 2 April 2001. Global Crossing has just filed. You are deciding what to do with a position in its debt or equity, and you also have to put a number on a specific risk. Use only what the case has shown so far.

{{< case-drill >}}

{{< reveal >}}

---

## 04 · What happened

**Within ten months of the filing:**

- On **28 January 2002**, Global Crossing Ltd and fifty-four subsidiaries filed voluntary Chapter 11 petitions in the US Bankruptcy Court for the Southern District of New York. Insolvency proceedings began in Bermuda the same day.
- Cash paid for property and equipment was about **$2.64B in 2001**, against $4.9 to $5.1B guided in April 2001, and about **$281M in 2002**.
- Under the plan, "holders of GCL common and preferred shares will not receive any distribution." Hutchison and ST Telemedia agreed to invest **$250M for 61.5%** of the reorganised company. Hutchison later withdrew after CFIUS signalled it would not approve its participation, and ST Telemedia took over the rights. Remaining creditors received 38.5% of the new equity, about $523M in cash and an interest in a liquidating trust.
- The company's own explanation, in the FY2002 10-K: "actual demand failed to keep pace with available supply, resulting in intense price pressure."

The $250M and the $30.2B of assets on the December 2000 balance sheet are not like-for-like: one is new post-reorganisation equity and the other is an old book value. They are set side by side to show how far book assets sat from what the market would pay.

Whether "fund the build" was wrong depends on your seat in the capital structure. Equity received nothing. Creditors recovered part of their claims in cash and equity.

---

## 05 · Claims ledger

The story told at the time, set against the numbers.

{{< case-ledger >}}

---

## 06 · Cues, ranked

{{< case-cues >}}

The ranking is **my own reading, not an interviewed expert's**. Treat it as a first draft to be argued with. In the real method this column comes from structured interviews with operators and credit investors who lived through the cycle.

---

## 07 · Calibration notes

*Surprising similarities and surprising dissimilarities* belong here once cases 2 to 4 of this concept exist. A single case is not a pattern. The comparisons planned for this concept are on the [Capital cycle page](/learning/cases/capital-cycle/).

What this case already suggests to check in every later one:

1. Is reported growth organic or acquired?
2. How many dollars of capex does a dollar of operating cash flow have to carry?
3. Whose capital pays for the gap, and what happens if that source closes?
4. Does revenue per dollar of capital rise or fall as the capital base grows?

{{< /reveal >}}

---

## Sources and data notes

{{< case-sources >}}

Figures were read from the filing text through a web fetch tool on 11 November 2026. Several were cross-checked against each other (for example, 2000 capex of $4,289M against investing cash flow of $4,427M, and the 1999 restatement arithmetic above), but each has not been compared against the printed page. Spot-check before relying on any single number. Derived ratios use the filed figures with no further adjustment.
