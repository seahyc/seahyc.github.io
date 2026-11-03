# Membership scenario arithmetic · 3 November 2026

This replaces the previous affiliate/brand model. Every input is an original assumption, not measured demand or a forecast. Merchant revenue is zero in every scenario. USD per steady-state month.

`contribution/member = price − payment fee − tasks×(inference+data+QA+infrastructure) − support − distribution − churn×CAC`

`operating contribution = members×contribution/member − fixed`

`break-even = ceil(fixed/contribution/member)` only when contribution is positive.

|Case|Members|Price|Tasks/member|Task cost|Other variable/member including churn CAC|Contribution/member|Fixed|Operating|Break-even members|Initial CAC cash|
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
|low|200|5|3|0.42|4.80|-1.06|10000|-10212.00|None|5000|
|base|2000|8|4|0.21|2.97|4.19|20000|-11620.00|4774|40000|
|high|10000|10|5|0.14|1.75|7.55|45000|30500.00|5961|150000|

Base: $8 − ($0.32 payment + 4×$0.21 task cost + $0.75 support + $0.30 distribution + 8%×$20 churn replacement CAC) = $4.19 contribution/member. 2,000×$4.19−$20,000 = −$11,620. Initial acquisition cash $40,000 is separate; growth acquisition is additional.

|Base sensitivity|Operating contribution|Break-even members|
|---|---:|---:|
|base|-11620.00|4774|
|half members|-15810.00|4774|
|price $5|-17380.00|15268|
|double usage|-13300.00|5971|
|double inference|-12100.00|5064|
|double testing QA|-12420.00|5278|
|churn 16%|-14820.00|7723|
|CAC $40|-14820.00|7723|
|zero merchant revenue|-11620.00|4774|

Two-month base spend with no receipts = 2×[$20,000 + 2,000×$3.81] = $55,240. This is a stress, not a cash collection forecast, and excludes initial/growth acquisition beyond modeled replacements. Founder experiment budget is a different $45,000 capped validation allocation. High-case operating surplus is before tax, financing, guarantee reserves and founder distributions.

Revenue audit: membership buys access/service under the same product-selection method. A flat completed-purchase fee and affiliate receipts remain excluded until uniform effective economics/rebates, unpaid-candidate inclusion, written terms and neutrality tests pass. Aggregate brand insights remain excluded until separate consent, rights and reidentification protections plus willingness-to-pay are established; no ranking control or suppression rights. Sponsored placements, auctions and profitable-link ranking are prohibited, not upside cases.

Reproduce: `python3 research-dossiers/2026-11-03-agentic-commerce/calculate-scenarios.py`. Historical evidence-review.md preserves the former Gate 1 arithmetic; evidence-review-supplement.md evaluates this replacement.
