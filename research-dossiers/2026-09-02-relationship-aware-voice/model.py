# Arithmetic used in the fieldbook. All inputs flagged as source or assumption.
from math import comb
def tail(n,k): return sum(comb(n,i) for i in range(k,n+1))/2**n
print("binomial one-sided P(X>=k | p=0.5)  [pure arithmetic]")
for n,k in [(20,14),(100,70)]:
    print(f"  n={n} k={k} ({k/n:.0%}) p={tail(n,k):.5f}")
print("SMB contribution model  [ASSUMPTIONS, not sourced except SGD3000 stated by one interviewee]")
price=3000
for name,cost,founder in [("low",1200,6000),("base",800,6000),("high",500,6000)]:
    contrib=price-cost
    be=-(-founder//contrib)
    print(f"  {name}: price={price} cost/customer={cost} contribution={contrib} customers to cover SGD{founder}/mo founder pay={be}")
print("price multiple vs respond.io plans [FX assumption 1 SGD = 0.70-0.80 USD]")
for plan,usd in [("Starter",79),("Growth",159),("Advanced",279)]:
    print(f"  {plan} ${usd}/mo yearly billing: stated WTP SGD3000 = USD{3000*.70:.0f}-{3000*.80:.0f} -> {3000*.70/usd:.1f}x-{3000*.80/usd:.1f}x")
