import os
OUT='/Users/yingcong/Code/seahyc.github.io/static/images/relationship-aware-voice'
F='font-family="Arial,Helvetica,sans-serif"'
INK='#27231e'; GREEN='#527367'; RED='#9d4c3f'; GREY='#6d6358'; GOLD='#8a6a1c'
def t(x,y,s,size=19,fill=INK,anchor='start',w=''):
    s=s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')
    return f'<text x="{x}" y="{y}" {F} font-size="{size}" fill="{fill}" text-anchor="{anchor}" {w}>{s}</text>'
B='font-weight="bold"'
def box(x,y,w,h,stroke=GREEN,fill='none',rx=8,dash=''):
    d=f' stroke-dasharray="{dash}"' if dash else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="2"{d}/>'
def arrow(x,y1,y2,col=GREY):
    return f'<path d="M{x} {y1} V{y2} m-6 -7 l6 7 l6 -7" fill="none" stroke="{col}" stroke-width="2"/>'
def svg(name,h,title,desc,body):
    s=f'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="{h}" viewBox="0 0 600 {h}" role="img" aria-labelledby="title desc"><title id="title">{title}</title><desc id="desc">{desc}</desc>{body}</svg>'
    s=s.replace('&amp;amp;','&amp;')
    open(os.path.join(OUT,name),'w').write(s)
    return h

H={}
# 1 demo
b=t(20,34,'ONE INTENT, THREE VOICES',26,RED)
b+=box(20,52,560,62,GREY)+t(36,78,'Intent: “I’m running 20 minutes late.',19)+t(36,101,'Apologize and ask if that still works.”',19)
rows=[('Partner · WhatsApp',['sorry love, got held up (crying face)','20 mins? I’ll grab dinner on the way']),
('Manager · Slack',['Running ~20m late—the previous call','overran. I’ll join at 3:20 and send','the notes first.']),
('Recruiter · LinkedIn',['Apologies, I’m running about 20 minutes','behind. Would 3:20 still work for you?','Completely understand if we should','reschedule.'])]
y=140
for lab,lines in rows:
    b+=arrow(300,y-24,y-4)
    hh=40+len(lines)*25
    b+=box(20,y,560,hh,GREEN)+t(36,y+28,lab,18,GREEN,w=B)
    for i,l in enumerate(lines): b+=t(36,y+56+i*25,l,19)
    y+=hh+30
H['demo.svg']=svg('demo.svg',y-14,'ONE INTENT, THREE VOICES','Illustrative demo of one intent rendered for three recipient and channel pairs.',b)

# 2 mechanism
b=t(20,34,'FOUR INPUTS, ONE DRAFT',26,RED)
ins=[('Baseline voice','your sent messages'),('Channel habits','WhatsApp vs Slack'),('This person','examples sent to them'),('The thread','plus your intent')]
for i,(a,c) in enumerate(ins):
    x=20+(i%2)*285; yy=56+(i//2)*96
    b+=box(x,yy,275,84,GREEN)+t(x+14,yy+34,a,21,GREEN,w=B)+t(x+14,yy+64,c,18)
b+=arrow(300,246,278)
b+=box(110,282,380,56,RED)+t(300,318,'One draft (+ optional alternate)',20,RED,'middle')
b+=arrow(300,340,372)
b+=box(110,376,380,56,GREY)+t(300,412,'You edit it and send it yourself',20,INK,'middle')
b+=f'<path d="M490 404 H575 V310 H495" fill="none" stroke="{GOLD}" stroke-width="2" stroke-dasharray="6 4"/><path d="M503 303 l-10 7 l10 7" fill="none" stroke="{GOLD}" stroke-width="2"/>'
b+=t(584,350,'edit',17,GOLD,'end')+t(584,374,'delta',17,GOLD,'end')
b+=t(20,470,'Dashed loop: your edits update only this',18,GREY)+t(20,494,'relationship’s local profile. Proposed, not built.',18,GREY)
H['mechanism.svg']=svg('mechanism.svg',512,'FOUR INPUTS, ONE DRAFT','Diagram of the proposed composer: four conditioning inputs produce one draft and an edit loop updates the relationship profile.',b)

# 3 landscape
cols=['Own','Per','Per','Learns']; cols2=['voice','channel','person','from edits']
b=t(20,34,'WHO ALREADY DOES WHAT',26,RED)
x0=248; cw=84
for i,(c,c2) in enumerate(zip(cols,cols2)):
    b+=t(x0+i*cw+cw/2,64,c,16,GREEN,'middle',w=B)+t(x0+i*cw+cw/2,88,c2,16,GREEN,'middle',w=B)
rows=[('Manual rewriting','nnnn'),('“Sound like me” prompt','dnnn'),('Gmail Help me write','dpnn'),('Grammarly voice profile','dnnn'),('Beeper API + MCP','nnnn'),('Proposed composer','hhhh')]
y=104
for name,cells in rows:
    b+=f'<line x1="20" y1="{y}" x2="580" y2="{y}" stroke="#d8cfc0" stroke-width="1"/>'
    b+=t(20,y+34,name,18,RED if name.startswith('Prop') else INK)
    for i,c in enumerate(cells):
        cx=x0+i*cw+cw/2; cy=y+28
        if c=='d': b+=f'<circle cx="{cx}" cy="{cy}" r="11" fill="{GREEN}"/>'
        elif c=='p': b+=f'<circle cx="{cx}" cy="{cy}" r="11" fill="none" stroke="{GREEN}" stroke-width="2"/><path d="M{cx} {cy-11} A11 11 0 0 1 {cx} {cy+11} Z" fill="{GREEN}"/>'
        elif c=='h': b+=f'<circle cx="{cx}" cy="{cy}" r="11" fill="none" stroke="{RED}" stroke-width="2" stroke-dasharray="3 3"/>'
        else: b+=f'<path d="M{cx-8} {cy} H{cx+8}" stroke="{GREY}" stroke-width="2"/>'
    y+=50
b+=f'<line x1="20" y1="{y}" x2="580" y2="{y}" stroke="#d8cfc0" stroke-width="1"/>'
y+=30
b+=f'<circle cx="32" cy="{y}" r="9" fill="{GREEN}"/>'+t(50,y+6,'documented in a source I read',17)
y+=30
b+=f'<circle cx="32" cy="{y}" r="9" fill="none" stroke="{GREEN}" stroke-width="2"/><path d="M32 {y-9} A9 9 0 0 1 32 {y+9} Z" fill="{GREEN}"/>'+t(50,y+6,'partial (email only)',17)
y+=30
b+=f'<circle cx="32" cy="{y}" r="9" fill="none" stroke="{RED}" stroke-width="2" stroke-dasharray="3 3"/>'+t(50,y+6,'hypothesis, untested',17)
y+=30
b+=f'<path d="M24 {y} H40" stroke="{GREY}" stroke-width="2"/>'+t(50,y+6,'not documented in what I read',17)
H['landscape.svg']=svg('landscape.svg',y+24,'WHO ALREADY DOES WHAT','Capability matrix of alternatives for personalised message drafting; marks reflect public documentation only.',b)

# 4 powers
b=t(20,34,'SEVEN POWERS AT MVP',26,RED)
pw=[('Counter-positioning',1),('Switching costs',2),('Process power',2),('Cornered resource',0),('Network economies',0),('Scale economies',0),('Branding',0)]
y=56
for n,v in pw:
    b+=t(20,y+22,n,19)
    for i in range(2):
        b+=f'<rect x="{300+i*44}" y="{y}" width="36" height="28" rx="4" fill="{GREEN if i<v else "none"}" stroke="{GREEN}" stroke-width="2"/>'
    y+=44
b+=t(20,y+20,'My rating: 0, 1 or 2 boxes. Verdict:',18,GREY)+t(20,y+46,'a wedge, not yet a venture thesis.',19,RED,w=B)
H['powers.svg']=svg('powers.svg',y+64,'SEVEN POWERS AT MVP','Author qualitative assessment of seven power types at MVP.',b)

# 5 test
b=t(20,34,'THE CHEAPEST DECISIVE TEST',26,RED)
b+=box(20,52,560,84,GREY)+t(36,80,'5 people × 3+ channels × 20 real intents',19)+t(36,106,'Local, read-only prototype.',18,GREY)+t(36,128,'No message is sent.',18,GREY)
b+=arrow(160,138,170)+arrow(440,138,170)
b+=box(20,174,270,92,GREEN)+t(36,204,'A · generic',20,GREEN,w=B)+t(36,230,'“write like me” +',18)+t(36,254,'recent thread',18)
b+=box(310,174,270,92,RED)+t(326,204,'B · conditioned',20,RED,w=B)+t(326,230,'baseline + channel +',18)+t(326,254,'this person’s examples',18)
b+=arrow(300,268,298)
b+=box(60,302,480,50,GREY)+t(300,334,'Blind pick of the more sendable draft',19,INK,'middle')
b+=arrow(160,354,384)+arrow(440,354,384)
b+=box(20,388,270,110,GREEN)+t(36,418,'Advance if',20,GREEN,w=B)+t(36,444,'B wins ≥70% of picks,',18)+t(36,468,'and time-to-send or',18)+t(36,490,'edits fall in a week',18)
b+=box(310,388,270,110,RED)+t(326,418,'Kill or reshape if',20,RED,w=B)+t(326,444,'thread context alone',18)+t(326,468,'does as well (A ≈ B)',18)
H['test.svg']=svg('test.svg',520,'THE CHEAPEST DECISIVE TEST','Flow of the proposed blind A versus B drafting test with advance and kill conditions.',b)

# 6 price
b=t(20,34,'INBOX PRICE VS ONE STATED BUDGET',24,RED)
b+=t(20,60,'US$ per month, yearly billing, bars from zero',17,GREY)
data=[('respond.io Starter',79,'$79'),('respond.io Growth',159,'$159'),('respond.io Advanced',279,'$279'),('One owner’s stated budget',2250,'≈$2,100–2,400')]
sc=230/2400; y=84
for n,v,l in data:
    b+=t(20,y+16,n,18)
    w=max(2,v*sc)
    b+=f'<rect x="20" y="{y+26}" width="{w:.1f}" height="30" fill="{RED if n.startswith("One") else GREEN}"/>'
    if w<180: b+=t(20+w+10,y+48,l,19)
    else: b+=t(20+w-10,y+48,l,19,'#fff','end')
    y+=78
b+=t(20,y+6,'Budget: SGD 3,000+/month, n=1, converted',17,GREY)+t(20,y+28,'at an assumed US$0.70–0.80 per SGD.',17,GREY)
H['price.svg']=svg('price.svg',y+44,'INBOX PRICE VERSUS STATED WILLINGNESS TO PAY','Bar comparison of respond.io plan prices and one interviewee stated willingness to pay, in US dollars per month.',b)

# 7 stages
b=t(20,34,'FOUR STAGES, EACH GATED',26,RED)
st=[('0 · Personal composer','local, open source, no sending','Gate: B wins ≥70%'),
('1 · Conversation audit','paid, 100 chats × 2 firms','Gate: owner sees new misses'),
('2 · Drafting layer','human-approved, in their inbox','Gate: acceptance, renewal'),
('3 · AI sales desk','stage-aware policy + console','Gate: renewals first')]
y=54
for i,(a,c,g) in enumerate(st):
    inset=i*30
    b+=box(20+inset,y,560-inset,104,GREEN if i<3 else RED)
    col=GREEN if i<3 else RED
    b+=t(36+inset,y+30,a,21,col,w=B)+t(36+inset,y+58,c,18)+t(36+inset,y+86,g,18,GREY)
    y+=118
b+=t(20,y+14,'Each stage must earn the next.',19,INK)
H['stages.svg']=svg('stages.svg',y+30,'FOUR STAGES, EACH GATED','Staged sequence from personal composer to AI sales desk with a gate for each stage.',b)

# 8 ninety
b=t(20,34,'THE FIRST NINETY DAYS',26,RED)
cl=[('Weeks 1–4','Build the test',['Read-only local','prototype','5 people, 3+ channels','20 intents each']),
('Weeks 5–8','Run it',['Blind A/B, pooled','Edit-time log','Ask 2 firms for','100 chats each']),
('Weeks 9–13','Decide, sell',['Apply the 70% gate','2 graded audits','Ask for a paid','pilot, or write','up the kill'])]
for i,(w,h,ls) in enumerate(cl):
    y=52+i*232 if False else 52
for i,(w,h,ls) in enumerate(cl):
    y0=52+i*196
    b+=box(20,y0,560,180,GREEN)+t(36,y0+32,w,21,GREEN,w=B)+t(200,y0+32,h,20,RED,w=B)
    for j,l in enumerate(ls): b+=t(36,y0+66+j*26,l,19)
b+=box(20,52+3*196-4,560,100,GREY)+t(36,52+3*196+26,'Evidence out: blind-choice table, edit log,',19)+t(36,52+3*196+52,'two graded audits, and a signed pilot',19)+t(36,52+3*196+78,'request or a documented kill.',19)
H['ninety.svg']=svg('ninety.svg',52+3*196+100,'THE FIRST NINETY DAYS','Three-phase thirteen week plan with actions and the evidence each produces.',b)

# 9 buyers
b=t(20,34,'BUYERS, TRUST AND PEOPLE',26,RED)
sec=[('Who to reach first',['Owner-led WhatsApp-first firms:','tuition, home services, clinics','Warm path: the two interviewees','Ask: 100 chats for a graded audit']),
('How a newcomer earns trust',['Publish the method and the numbers','Open-source the local composer','Show where the data boundary is','Design partners who grade outputs']),
('People to add',['Founder: product + eval design','Hire: conversation-quality grader','Advisor: inbox-product operator','Later: integration engineer'])]
y=54
for h,ls in sec:
    b+=box(20,y,560,150,GREEN)+t(36,y+32,h,21,GREEN,w=B)
    for j,l in enumerate(ls): b+=t(36,y+64+j*26,l,19)
    y+=166
H['buyers.svg']=svg('buyers.svg',y,'BUYERS, TRUST AND PEOPLE','Three panels listing first buyers and the ask, how credibility is built, and the first team roles.',b)

# 10 gates
b=t(20,34,'MONEY, PAYOUT, STOP RULES',26,RED)
rows=[('Stage 0','Money: savings','Paid: nothing','Stop: B under 70%, or A ≈ B'),
('Stage 1','Money: audit fees','Paid: audit fees','Stop: no new issue found'),
('Stage 2','Money: pilot fees, grant*','Paid: salary from fees','Stop: low acceptance, no renewal'),
('Stage 3','Money: recurring fees, angel','Paid: salary, equity','Stop: churn, no renewals')]
y=54
for r in rows:
    b+=box(20,y,560,122,GREEN)+t(36,y+30,r[0],21,GREEN,w=B)
    for j,c in enumerate(r[1:]): b+=t(36,y+58+j*26,c,19)
    y+=136
b+=t(20,y+10,'*Grant terms unverified; see text.',17,GREY)
H['gates.svg']=svg('gates.svg',y+28,'MONEY, PAYOUT AND STOP RULES','Per-stage money sources, founder payout and stop conditions.',b)
print(H)
