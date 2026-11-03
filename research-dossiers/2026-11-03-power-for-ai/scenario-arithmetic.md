# Scenario arithmetic

SCENARIOS ONLY: all commercial inputs invented for decision testing; no quotes, interviews or cost forecasts

## Wedge — dollars per completed package

| Case | Fee | Direct | After CAC | Annual residual | Break-even projects |
|---|---:|---:|---:|---:|---:|
| low | 40,000 | 46,000 | -14,000 | -384,000 | None |
| base | 75,000 | 33,750 | 35,250 | 123,000 | 9 |
| high | 100,000 | 26,000 | 70,000 | 1,100,000 | 5 |

Base: 75,000 − (140×150 + 60×100 + 3,000 + 0.05×75,000) − 6,000 = 35,250. Annual: 12×35,250 − 300,000 = 123,000. Break-even: ceil(300,000/35,250) = 9 packages.
Base capacity: min(3,200/140, 1,600/60) = 22.86 packages/year; 12 assumed. These are delivery-hour assumptions, not a hiring plan. Idle staff cost can make this worse; revise to actual payroll/cash commitments before funding.
Fee that breaks even at 12 packages: (300,000/12 + 21,000 + 6,000 + 3,000 + 6,000)/0.95 = $64,210.53.
A $75,000 fee needs $2,500/day of buyer value if 30 truly avoidable days are established. No savings are currently measured.

## Sensitivities

- base: project contribution after CAC $35,250; annual residual $123,000.
- fee -20%: project contribution after CAC $21,000; annual residual $-48,000.
- engineer hours +50%: project contribution after CAC $24,750; annual residual $-3,000.
- CAC doubled: project contribution after CAC $29,250; annual residual $51,000.
- projects halved: project contribution after CAC $35,250; annual residual $-88,500.

## Gas comparator — incomplete cost, not firm power LCOE

- low_cost: 157,680 MWh/year; CRF 0.13147378; capital charge $5,258,951/year; partial cost $82.57/MWh.
- base: 140,160 MWh/year; CRF 0.13147378; capital charge $7,888,427/year; partial cost $144.11/MWh.
- high_cost: 105,120 MWh/year; CRF 0.13147378; capital charge $10,517,902/year; partial cost $247.11/MWh.

A $1/MMBtu fuel increase adds $8/$10/$12 per MWh in the respective cases. At base, a 20 MW/80 MWh battery supplies only four rated hours before losses and reserve; 20 MW×24 hours =480 MWh for one day, with recharge energy still required. These are arithmetic identities, not system sizing advice.
Do not compare these incomplete gas costs to a full-service utility tariff or to vendor nuclear aspirations. Site-specific EPC, redundant capacity, storage, gas firmness, permits and outage penalties can reverse the choice.

## Cash / economic boundary
Labor is charged even if already employed. Fee cash collections and supplier payments must be measured separately. Base illustrative reserve for three months central fixed cost plus two packages direct cost: 300,000/4 + 2×33,750 = $142,500; add actual payroll, CAC timing, legal/insurance setup and bad-debt requirements. No equipment deposits are financed. No signed customer contracts exist.
