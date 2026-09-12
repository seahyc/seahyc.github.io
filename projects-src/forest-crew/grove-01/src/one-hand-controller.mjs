const STALE_MS=220,STOP_MS=220,POINT_DWELL_MS=300;
export const HAND_NAV={turnDeadzone:.065,turnFull:.20,reverseEnter:.10,reverseExit:.06};
const clamp=(v,lo=0,hi=1)=>Math.max(lo,Math.min(hi,v));
const emptyGait=()=>({left:0,right:0,leftLift:0,rightLift:0,stride:0,cadence:0,run:0});
const valid=h=>h&&h.id!==undefined&&['indexFlex','middleFlex','roll'].every(k=>Number.isFinite(h[k]));
const wrist=h=>({x:Number.isFinite(h.wristX)?h.wristX:.5,y:Number.isFinite(h.wristY)?h.wristY:.5});

// Finger rhythm owns motion. Hand position chooses direction; tilt never owns yaw.
export class OneHandController{
 forward=0;turn=0;anchor={x:.5,y:.5};decision="reset";
 constructor({staleMs=STALE_MS,pointDwellMs=POINT_DWELL_MS}={}){this.staleMs=staleMs;this.pointDwellMs=pointDwellMs;this.headingTarget=0;this.reset();}
 reset(){this.ownerId=null;this.anchor={x:.5,y:.5};this.offset={x:0,y:0};this.lastSeen=-Infinity;this.lastUpdate=null;this.lastMotion=-Infinity;this.lastStep=-Infinity;this.stepTimes=[];this.phase=0;this.steps=0;this.forward=0;this.turn=0;this.reverse=false;this.activity=0;this.pointSince=null;this.mode='lost';this.decision='reset';this.gait=emptyGait();this.previousFlex={index:0,middle:0};this.aim={x:.5,y:.5};}
 calibrate(hands,now,heading=this.headingTarget){const h=hands?.length===1&&valid(hands[0])?hands[0]:null;this.reset();if(Number.isFinite(heading))this.headingTarget=heading;if(!h||!Number.isFinite(now))return this.read(now);this.ownerId=String(h.id);this.anchor=wrist(h);this.previousFlex={index:h.indexFlex,middle:h.middleFlex};this.lastSeen=now;this.lastUpdate=now;this.mode='walk';this.decision='ready';return this.read(now);}
 stop(reason='stopped',hand=null){this.forward=0;this.turn=0;this.activity=0;this.pointSince=null;this.lastMotion=-Infinity;this.phase=0;this.gait=emptyGait();this.mode='walk';this.decision=reason;if(valid(hand))this.previousFlex={index:hand.indexFlex,middle:hand.middleFlex};}
 update(hands,now,{overUi=false}={}){
  const h=hands?.length===1&&valid(hands[0])?hands[0]:null;
  if(!h||!Number.isFinite(now)){this.stop('invalid-or-lost');return this.read(now,{overUi});}
  if(this.ownerId===null||String(h.id)!==this.ownerId||now-this.lastSeen>this.staleMs){this.calibrate([h],now);return this.read(now);}
  const dt=clamp(now-this.lastUpdate,0,100),movement=Math.abs(h.indexFlex-this.previousFlex.index)+Math.abs(h.middleFlex-this.previousFlex.middle);this.lastUpdate=now;this.lastSeen=now;this.previousFlex={index:h.indexFlex,middle:h.middleFlex};
  if(Number.isFinite(h.pointX)&&Number.isFinite(h.pointY))this.aim={x:clamp((.85-h.pointX)/.7),y:clamp((h.pointY-.12)/.7)};
  if(overUi){this.stop('ui-dwell',h);return this.read(now,{overUi:true});}
  if(h.open===true){this.stop('open-palm-recenter',h);this.anchor=wrist(h);this.offset={x:0,y:0};this.reverse=false;return this.read(now);}
  if(h.pointing===true&&movement<.015){this.forward=0;this.turn=0;this.activity=0;this.lastMotion=-Infinity;this.gait=emptyGait();this.pointSince??=now;this.mode=now-this.pointSince>=this.pointDwellMs?'hose':'walk';this.decision=this.mode==='hose'?'spraying':'point-dwell';return this.read(now);}
  this.pointSince=null;this.mode='walk';
  const w=wrist(h),alpha=1-Math.exp(-dt/85);this.offset.x+=alpha*((this.anchor.x-w.x)-this.offset.x);this.offset.y+=alpha*((w.y-this.anchor.y)-this.offset.y);
  if(this.reverse?this.offset.y<HAND_NAV.reverseExit:this.offset.y>HAND_NAV.reverseEnter)this.reverse=!this.reverse;
  const differential=h.indexFlex-h.middleFlex;
  if(movement>.018&&Math.abs(differential)>.015)this.lastMotion=now;
  const phase=differential>.055?1:differential<-.055?-1:0;
  if(phase&&phase!==this.phase){this.phase=phase;this.steps++;if(now-this.lastStep>=120){this.lastStep=now;this.stepTimes.push(now);}}
  this.stepTimes=this.stepTimes.filter(t=>now-t<2000);const cadence=this.stepTimes.length>1?clamp((this.stepTimes.length-1)*1000/(this.stepTimes.at(-1)-this.stepTimes[0]),0,5):0;
  const moving=now-this.lastMotion<=STOP_MS,raw=dt?clamp(movement*1000/dt/1.6):0;this.activity+=(1-Math.exp(-dt/(raw>this.activity?60:200)))*(raw-this.activity);
  const pace=moving?clamp(Math.sqrt(this.activity)*1.25,0,1):0;
  this.forward=pace*(this.reverse?-1:1);
  // Do not integrate a heading target: even residual pose filtering cannot keep
  // rotating once finger motion stops. Locomotion consumes this bounded yaw rate.
  this.turn=moving&&pace>.08?Math.sign(this.offset.x)*clamp((Math.abs(this.offset.x)-HAND_NAV.turnDeadzone)/(HAND_NAV.turnFull-HAND_NAV.turnDeadzone),0,1):0;
  if(this.turn)this.headingTarget+=this.turn*.9*dt/1000;
  const foot=clamp(differential/.16,-1,1);
  this.gait=moving?{left:foot,right:-foot,leftLift:clamp(foot),rightLift:clamp(-foot),stride:clamp(Math.max(Math.abs(foot),pace)),cadence,run:0}:emptyGait();
  this.decision=!moving?'ready':this.reverse?'backward':this.turn<-.05?'left':this.turn>.05?'right':'forward';return this.read(now);
 }
 read(now,{overUi=false}={}){const fresh=Number.isFinite(now)&&now-this.lastSeen<=this.staleMs&&this.ownerId!==null;if(!fresh){this.forward=0;this.turn=0;this.mode='lost';this.gait=emptyGait();}const enabled=fresh&&!overUi;return {tracked:fresh,forward:enabled&&this.mode==='walk'?this.forward:0,turn:enabled&&this.mode==='walk'?this.turn:0,headingTarget:null,gait:enabled&&this.mode==='walk'?{...this.gait}:emptyGait(),mode:fresh?this.mode:'lost',aim:{...this.aim},spraying:enabled&&this.mode==='hose',steps:this.steps};}
 diagnostics(now){const s=this.read(now);return {inputMode:'one-hand',ownerId:this.ownerId,decision:this.decision,mode:s.mode,tracked:s.tracked,lastSeenAge:Number.isFinite(this.lastSeen)?now-this.lastSeen:null,anchor:{...this.anchor},offset:{...this.offset},reverse:this.reverse,steps:this.steps,forward:s.forward,turn:s.turn,spraying:s.spraying};}
}
