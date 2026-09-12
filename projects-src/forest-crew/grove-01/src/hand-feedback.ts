type Point={x:number;y:number};
const links=[[0,1,2,3,4],[0,5,6,7,8],[0,9,10,11,12],[0,13,14,15,16],[0,17,18,19,20],[5,9,13,17,0]];
export function drawHandFeedback(ctx:CanvasRenderingContext2D,hands:{landmarks:Point[]}[],{single,anchor,decision,fresh}:{single:boolean;anchor:Point;decision:string;fresh:boolean}){
 const w=320,h=240;ctx.clearRect(0,0,w,h);ctx.lineWidth=1.4;
 if(single){const x=(1-anchor.x)*w,y=anchor.y*h;ctx.strokeStyle='rgba(207,232,211,.26)';ctx.setLineDash([3,5]);ctx.beginPath();ctx.moveTo(x-64,y);ctx.lineTo(x+64,y);ctx.moveTo(x,y-32);ctx.lineTo(x,y+40);ctx.stroke();ctx.setLineDash([]);ctx.beginPath();ctx.arc(x,y,16,0,Math.PI*2);ctx.stroke();ctx.font='600 14px system-ui';ctx.textAlign='center';ctx.fillStyle='rgba(221,238,217,.65)';ctx.fillText('←',Math.max(14,x-70),y+5);ctx.fillText('→',Math.min(306,x+70),y+5);ctx.fillText('BACK',x,Math.min(222,y+51));}
 for(const [index,hand] of hands.entries()){
  const points=hand.landmarks;if(points?.length!==21||!points.every(p=>Number.isFinite(p.x)&&Number.isFinite(p.y)))continue;
  ctx.lineWidth=3.2;ctx.strokeStyle=ctx.fillStyle=fresh?(index?'#9ccddf':'#d5efb5'):'#64746a';
  for(const chain of links){ctx.beginPath();chain.forEach((n,i)=>{const p=points[n];i?ctx.lineTo((1-p.x)*w,p.y*h):ctx.moveTo((1-p.x)*w,p.y*h);});ctx.stroke();}
  for(const p of points){ctx.beginPath();ctx.arc((1-p.x)*w,p.y*h,3.5,0,Math.PI*2);ctx.fill();}
 }
 ctx.fillStyle=fresh?'#e1f0d6':'#99ad9e';ctx.textAlign='left';ctx.font='600 17px system-ui';
 const label=!fresh?'SHOW YOUR HAND':decision==='backward'?'↓ BACKWARD':decision==='left'?'← LEFT':decision==='right'?'RIGHT →':decision==='forward'?'↑ FORWARD':decision==='spraying'?'WATER ON':decision==='open-palm-recenter'?'CENTER RESET':'WALK YOUR FINGERS';
 ctx.fillText(single?label:fresh?'HANDS TRACKED':'SHOW YOUR HANDS',12,23);
}
