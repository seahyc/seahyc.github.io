"""Original diagrams and model chart. No third-party artwork or measured startup data."""
from pathlib import Path
from html import escape
import json
D=Path(__file__).resolve().parent
OUT=D.parents[1]/'static/images/pair-bond-medicine'
OUT.mkdir(parents=True,exist_ok=True)
INK='#27231e'; MUTED='#6e665a'; GREEN='#527367'; RED='#9d4c3f'
def t(x,y,s,size=25,c=INK,anchor='start'):
 return f'<text x="{x}" y="{y}" font-size="{size}" fill="{c}" text-anchor="{anchor}">{escape(s)}</text>'
def line(x,y,X,Y,c=MUTED):
 return f'<path d="M{x},{y} L{X},{Y}" fill="none" stroke="{c}" stroke-width="2"/>'
def panel(y,a,b,c=GREEN):
 return f'<rect x="16" y="{y}" width="568" height="88" rx="8" fill="none" stroke="{c}" stroke-width="2"/>'+t(34,y+33,a,27,c)+t(34,y+65,b,23)
def flow(name,title,rows,note):
 b=t(16,33,title,27)
 for i,(a,z) in enumerate(rows):
  y=62+i*112;b+=panel(y,a,z)
  if i<len(rows)-1:
   b+=line(300,y+88,300,y+108)+line(294,y+102,300,y+108)+line(300,y+108,306,y+102)
 h=62+len(rows)*112+40
 b+=t(16,h-16,note,21,RED)
 save(name,title,note,b,h)
def save(name,title,desc,b,h):
 (OUT/(name+'.svg')).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc><g font-family="Arial,Helvetica,sans-serif">{b}</g></svg>')
flow('thesis','THE CLAIM MUST CROSS EACH BRIDGE',[
 ('Molecular action','A chemical changes a biological signal'),
 ('Useful human change','A defined patient outcome improves'),
 ('A relationship freely chosen','Both people benefit beyond the session')], 'Conceptual chain • no automatic causal transfer')
flow('translation','WHAT AN OXYTOCIN SIGNAL CAN PROVE',[
 ('Acute couple experiment','47 couples • laboratory conflict • 2009'),
 ('Separate translation warning','Autism RCT • 290 randomized • 2021'),
 ('Unanswered commercial question','Durable voluntary relationship benefit?')], 'Different populations and endpoints • not pooled')
flow('evidence','MDMA: KEEP THE ENDPOINT ATTACHED',[
 ('Controlled PTSD evidence','MAPP2 • 104 participants • 2023'),
 ('Conjoint pilot evidence','6 couples • uncontrolled • 2020'),
 ('Incremental couple benefit?','Active randomized study • no results posted')], 'PTSD symptom improvement ≠ divorce prevention')
flow('routes','FOUR DIFFERENT COMPANIES',[
 ('Rx asset → pharma','Human evidence + indication + rights'),
 ('Clinic → patient','Lawful care + clinical delivery capacity'),
 ('Infrastructure → authorised site','Real access + specific workflow budget'),
 ('Non-drug service → practice','Paid residual job + repeatable delivery')], 'Selected: capped non-drug learning service')
m=json.loads((D/'scenario-model.json').read_text())
b=t(16,34,'CONTRIBUTION PER ENROLLED COUPLE',27)+t(16,70,'USD • original scenarios • 3 Nov 2026',23,MUTED)
x0=240; scale=.9
for i,c in enumerate(m['cases']):
 y=124+i*102;v=c['after_acquisition_contribution_usd'];x=x0+min(v,0)*scale;w=abs(v)*scale
 b+=t(16,y+28,c['name'].title(),25)+f'<rect x="{x}" y="{y}" width="{w}" height="38" fill="{RED if v<0 else GREEN}"/>'+t(x0+v*scale+(10 if v>=0 else -10),y+29,f'{v:,.2f}',24,INK,'start' if v>=0 else 'end')
b+=line(x0,103,x0,377)
for v in [-200,0,300]:
 x=x0+v*scale;b+=line(x,400,x,407)+t(x,439,str(v),22,MUTED,'middle')
b+=line(60,400,510,400)+t(16,485,'After support, fees, refunds and acquisition.',23)+t(16,521,'Before $300,000 assumed annual fixed cost.',23)+t(16,557,'Negative contribution has no volume break-even.',22,RED)
save('economics','Scenario contribution after acquisition','Low −155.90, base 129.05, high 249.03 USD. Zero shown; no observed margins.',b,580)
flow('calendar','TWO CLOCKS IN THE FIRST QUARTER',[
 ('Days 1–30: challenge the job','Founder + clinical lead • compare incumbent'),
 ('Days 31–90: sell and deliver','3 paid scopes • target 2 renewals'),
 ('Days 120–150: finish observation','Late enrollees need full course + follow-up')], 'Proposed gates • renewal ≠ completed outcome')
flow('capital','CAPITAL FOLLOWS THE EVIDENCE',[
 ('First quarter: capped learning','Assumed $60k • founder / informed angels'),
 ('Months 4–12: repeat delivery','Additional $240k envelope • not self-funded'),
 ('Months 12–24: compare outcomes','Separate $150k–$500k evaluation assumption')], 'No tranche is committed • replace with scoped bids')
flow('gates','EARN THE NEXT STAGE OR STOP',[
 ('Incumbent already solves the job?','Distribute with permission, or stop building'),
 ('No paid renewal / contribution?','Stop expansion; finish promised follow-up'),
 ('Consent or safety failure unresolved?','Pause affected delivery for independent review')], 'Proposed decisions • not proof of efficacy or safety')
print('8 original substantive SVGs; text minimum 21px at 600px; no opaque canvas')
