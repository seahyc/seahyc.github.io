from pathlib import Path
root=Path(__file__).resolve().parents[2]
p=root/'content/research/allied-drone-components/index.md'
s=p.read_text()
assets={
1:('acceptance-decision.png','An engineer checks a replacement controller against test records even though its connector fits.','Original watercolor metaphor: physical fit leaves the acceptance decision open; no test result is implied.'),
2:('02-policy-scope.svg','Motor criteria form a conjunction; the ESC definition is linked, and licensing does not establish a destination ban.','Published-control logic, summarized from the MOFCOM source below; classify the actual item and export leg.'),
4:('04-matched-comparison.svg','Scorpion and APD publish ratings under different duration and airflow conditions.','Vendor test conditions are different; this comparison establishes neither equivalent endurance nor relative value. Sources linked below.'),
5:('controller-wedge.png','Electronics assembly sits beside a motor with rotor magnets, illustrating the different manufacturing tasks.','Original watercolor: the proposed ESC experiment avoids rotor-magnet manufacturing, while semiconductor and PCB provenance remain unresolved.'),
7:('07-eligibility.svg','Assembly origin and buyer-specific authorization require separate determinations.','Conceptual eligibility checks from the FCC documents below; this controller’s coverage and authorization remain unresolved.'),
8:('qualification-package.png','A controller travels with its revision, firmware and test records to a receiving engineer.','Original watercolor of the proposed deliverable. Traceability supports a buyer decision; it does not confer a self-issued approval.'),
10:('10-buyer-paths.svg','Civil sensing customers and authorized aircraft integrators follow different procurement paths.','Conceptual buyer map: a detection site count cannot establish controller demand. Legal sources and qualifications appear below.'),
11:('11-competition.svg','Controller suppliers, integrated propulsion makers, assessors and domestic capacity can each close a different gap.','Competitive alternatives, rather than an empty shelf. Published offerings and announcements below do not prove available capacity or comparable cost.'),
13:('13-hardware-economics.svg','Base scenario separates unit contribution, fixed expense, depreciation and net qualification income.','USD, original invented base scenario as of 3 November 2026; calculations from the model linked below, not achieved margins.'),
14:('14-demand-denominators.svg','Aircraft ordered and accepted use different denominators; neither establishes startup controller receipts.','Aircraft counts in the official 2 November 2026 snapshot linked below; no attach rate or component revenue is inferred.'),
16:('stop-go-gate.png','A founder can stop a new board at a gate and choose an existing supplier, or proceed only with paid repeat demand.','Original watercolor of a deliberate stop/go decision. Finding that an incumbent solves the problem is a successful discovery outcome.'),
17:('17-evidence-types.svg','Published facts, vendor claims, inferences, invented scenarios and missing customer evidence remain distinct.','Method map for this report: evidence status determines what the reader may conclude. No private validation has occurred.')}
parts=s.split('\n---\n')
assert len(parts)==18
for card,(name,alt,caption) in assets.items():
 if f'/images/allied-drone-components/{name}' in parts[card]: continue
 lines=parts[card].splitlines()
 pos=next(i for i,line in enumerate(lines) if line.startswith('### '))+1
 fig=f'\n<figure style="max-width:600px;margin:1rem auto"><img style="background:transparent" src="/images/allied-drone-components/{name}" alt="{alt}"><figcaption>{caption}</figcaption></figure>\n'
 lines.insert(pos,fig)
 parts[card]='\n'.join(lines)
p.write_text('\n\n---\n\n'.join(x.strip() for x in parts)+'\n')
print('18 cards; added 12 unique explanatory figures; existing prose and six figures retained')
