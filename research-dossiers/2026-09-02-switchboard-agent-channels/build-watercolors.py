#!/usr/bin/env python3
"""SUPERSEDED (21 Nov 2026): the PNGs this script drew were replaced by Codex built-in imagegen output; see image-prompts.md. Kept for history only.
Procedural rough 'watercolor' cutouts with a real alpha channel.
These are NOT generative-model paintings: wobbly ink lines + blurred translucent washes drawn with Pillow."""
import random, math, sys
from PIL import Image, ImageDraw, ImageFilter
OUT = sys.argv[1]
W, H, S = 800, 600, 3
INK = (58, 52, 45, 255)
COL = dict(terra=(217,136,111), sage=(157,181,138), mustard=(227,194,107), blue=(134,167,196), rose=(217,139,160))

def wob(pts, amt=2.2, seg=14):
    out = []
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        n = max(2, int(math.hypot(x1-x0, y1-y0)/seg))
        for i in range(n):
            t = i/n
            out.append((x0+(x1-x0)*t+random.uniform(-amt, amt), y0+(y1-y0)*t+random.uniform(-amt, amt)))
    out.append(pts[-1]); return out

class Canvas:
    def __init__(s, seed):
        random.seed(seed)
        s.wash = Image.new('RGBA', (W*S, H*S), (0,0,0,0)); s.ink = Image.new('RGBA', (W*S, H*S), (0,0,0,0))
        s.wd = ImageDraw.Draw(s.wash); s.idr = ImageDraw.Draw(s.ink)
    def P(s, pts): return [(x*S, y*S) for x, y in pts]
    def poly(s, pts, col, alpha=120, off=4, line=True, closed=True):
        c = COL[col]
        for k in range(2):
            o = [(x+random.uniform(-off, off)+k*2, y+random.uniform(-off, off)) for x, y in pts]
            s.wd.polygon(s.P(wob(o+[o[0]], 3)), fill=c+(alpha//(k+1),))
        if line: s.line(pts+([pts[0]] if closed else []))
    def line(s, pts, w=3):
        s.idr.line(s.P(wob(pts)), fill=INK, width=int(w*S), joint='curve')
    def ellipse(s, cx, cy, rx, ry, col=None, alpha=120, line=True):
        pts = [(cx+rx*math.cos(a), cy+ry*math.sin(a)) for a in [i*math.pi/14 for i in range(29)]]
        if col: s.poly(pts[:-1], col, alpha, line=False)
        if line: s.line(pts)
    def rect(s, x, y, w, h, col=None, alpha=120): s.poly([(x,y),(x+w,y),(x+w,y+h),(x,y+h)], col, alpha) if col else s.line([(x,y),(x+w,y),(x+w,y+h),(x,y+h),(x,y)])
    def curve(s, p0, p1, p2, n=24, w=3):
        pts = [((1-t)**2*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0], (1-t)**2*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1]) for t in [i/n for i in range(n+1)]]
        s.line(pts, w)
    def save(s, name):
        wash = s.wash.filter(ImageFilter.GaussianBlur(2.5*S))
        img = Image.alpha_composite(wash, s.ink).resize((W, H), Image.LANCZOS)
        px = img.load()
        for y in range(H):
            for x in range(W):
                if x < 20 or y < 20 or x > W-21 or y > H-21: px[x, y] = (0,0,0,0)
        img.save(f'{OUT}/{name}.png')
    def robot(s, x, y, k=1.0):
        s.rect(x, y, 70*k, 56*k, 'blue'); s.ellipse(x+20*k, y+26*k, 6*k, 6*k); s.ellipse(x+50*k, y+26*k, 6*k, 6*k)
        s.line([(x+35*k, y), (x+35*k, y-18*k)]); s.ellipse(x+35*k, y-24*k, 6*k, 6*k, 'terra'); s.rect(x+10*k, y+60*k, 50*k, 50*k, 'blue')
    def person(s, x, y, col='rose', k=1.0):
        s.ellipse(x, y, 16*k, 16*k, 'mustard'); s.poly([(x-18*k, y+20*k), (x+18*k, y+20*k), (x+24*k, y+90*k), (x-24*k, y+90*k)], col)
        s.line([(x-12*k, y+90*k), (x-14*k, y+125*k)]); s.line([(x+12*k, y+90*k), (x+14*k, y+125*k)])

# 1 cover: robot plugs patch cables from a switchboard into three conversation bubbles
c = Canvas(1)
c.poly([(250,120),(520,110),(530,400),(245,410)], 'mustard', 110)
for r in range(3):
    for k in range(4): c.ellipse(300+k*62, 175+r*80, 14, 14, 'terra', 140)
c.robot(80, 230, 1.0)
c.curve((150, 300), (200, 440), (301, 175), w=3); c.curve((150, 320), (240, 500), (362, 255), w=3)
for i, (col, y) in enumerate([('rose', 90), ('sage', 260), ('blue', 430)]):
    c.poly([(600,y),(740,y-5),(745,y+85),(660,y+90),(630,y+115),(635,y+90),(600,y+85)], col, 130)
    c.line([(620,y+25),(720,y+22)], 2); c.line([(620,y+50),(700,y+48)], 2)
c.curve((520, 160), (570, 130), (610, 140)); c.curve((520, 255), (580, 300), (610, 300)); c.curve((520, 340), (570, 440), (610, 470))
c.save('switchboard-cover')

# 2 one-way mailbox
c = Canvas(2)
c.line([(400,300),(400,540)], 5); c.poly([(300,160),(500,160),(510,260),(290,260)], 'blue', 130)
c.rect(300, 250, 200, 60, 'blue', 130); c.line([(330,200),(470,200)], 4)
c.poly([(420,195),(470,200),(425,220)], 'terra', 150, line=False)
c.curve((110, 205), (200, 150), (320, 200), w=4); c.line([(300,190),(322,202),(296,214)], 4)
c.person(650, 250, 'sage'); c.rect(595, 330, 50, 34, 'mustard'); c.line([(595,330),(620,350),(645,330)], 2)
c.curve((590, 345), (500, 420), (470, 340), w=2)
c.line([(540,380),(580,440)], 5); c.line([(580,380),(540,440)], 5)
c.save('one-way-door')

# 3 tightrope with a robot and a dropping plug
c = Canvas(3)
c.poly([(40,150),(150,140),(160,560),(40,570)], 'sage', 120); c.poly([(650,150),(760,160),(760,570),(640,560)], 'sage', 120)
c.curve((150, 160), (400, 330), (650, 170), n=30, w=4)
c.robot(365, 150, 0.75); c.line([(300,215),(500,215)], 3)
c.curve((260, 360), (300, 420), (340, 520), w=3); c.poly([(325,520),(355,520),(355,560),(325,560)], 'terra', 160)
c.line([(300,500),(280,470)], 3); c.line([(375,500),(395,470)], 3)
for dx in (-30, 0, 30): c.line([(560+dx,420),(556+dx,450)], 3)
c.save('sender-tightrope')

# 4 castle with a dotted twin: copyable surface vs durable moat
c = Canvas(4)
c.poly([(130,260),(330,260),(330,500),(130,500)], 'mustard', 120)
for x in (130, 180, 230, 280): c.rect(x, 225, 40, 35)
c.poly([(200,500),(260,500),(260,420),(200,420)], 'terra', 140)
c.curve((60, 520), (230, 590), (400, 520), w=4); c.curve((60, 560), (230, 640), (400, 560), w=4)
c.poly([(80,515),(380,515),(370,570),(90,572)], 'blue', 110, line=False)
for x in range(470, 700, 22): c.line([(x,300),(x+10,300)], 2); c.line([(x,500),(x+10,500)], 2)
for y in range(300, 500, 22): c.line([(470,y),(470,y+10)], 2); c.line([(690,y),(690,y+10)], 2)
c.line([(470,300),(470,500)], 1); c.curve((690, 270), (640, 230), (560, 250), w=2)
c.person(560, 360, 'rose', 0.7)
c.save('copyable-castle')

# 5 storm over a small sender
c = Canvas(5)
c.ellipse(300, 150, 150, 70, 'blue', 150); c.ellipse(420, 130, 130, 75, 'blue', 130); c.ellipse(200, 170, 100, 55, 'blue', 120)
c.poly([(350,220),(310,300),(350,300),(300,390),(400,280),(355,280),(390,220)], 'mustard', 200)
for i in range(9): c.line([(160+i*55, 260+(i%3)*25),(150+i*55, 300+(i%3)*25)], 3)
c.rect(520, 340, 90, 150, 'sage', 130); c.ellipse(565, 465, 8, 8, None)
c.robot(130, 360, 0.8)
c.curve((220, 440), (380, 520), (520, 440), w=2)
c.save('liability-storm')

# 6 ladder to a boom gate
c = Canvas(6)
for i in range(4):
    c.rect(120+i*130, 440-i*85, 130, 85+i*85, ['sage','mustard','blue','rose'][i], 130)
c.line([(630,200),(630,120)], 5); c.poly([(630,120),(740,100),(740,130),(630,150)], 'terra', 150)
c.line([(640,120),(680,115)], 3); c.line([(700,110),(735,105)], 3)
c.curve((140, 430), (200, 350), (240, 350), w=2); c.curve((270, 345), (330, 260), (390, 260), w=2); c.curve((400, 255), (470, 170), (520, 170), w=2)
c.person(170, 300, 'blue', 0.55)
c.save('stage-gates')

# 7 learning desk: person beside a stack of books and a lantern (what must be learned)
c = Canvas(7)
for i, (w, col) in enumerate([(260, 'terra'), (230, 'sage'), (200, 'mustard'), (170, 'blue')]):
    c.rect(300-w/2+20, 500-(i+1)*62, w, 62, col, 140)
c.line([(210,470),(210,300)], 3); c.poly([(180,300),(240,300),(225,250),(195,250)], 'mustard', 180)
for a in range(-2, 3): c.line([(210+a*14, 235),(210+a*26, 205)], 2)
c.person(560, 250, 'rose', 1.0)
c.curve((545, 330), (480, 300), (440, 330), w=3)
c.rect(405, 330, 70, 14, 'sage', 140)
c.save('learning-stack')
