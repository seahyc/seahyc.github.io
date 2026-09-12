const STALE_MS=220,STOP_MS=240,POINT_DWELL_MS=250;
const FLEX_THRESHOLD=.055,TURN_EXIT=6*Math.PI/180,TURN_ENTER=10*Math.PI/180,TURN_FULL=32*Math.PI/180;
const clamp=(value,lo=0,hi=1)=>Math.max(lo,Math.min(hi,value));
const angleDelta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
const emptyGait=()=>({left:0,right:0,leftLift:0,rightLift:0,stride:0,cadence:0,run:0});
const validHand=hand=>hand&&hand.id!==undefined&&['indexFlex','middleFlex','roll'].every(key=>Number.isFinite(hand[key]));

/** A deliberately single-hand controller for players holding their phone. */
export class OneHandController{
 constructor({staleMs=STALE_MS,pointDwellMs=POINT_DWELL_MS}={}){this.staleMs=staleMs;this.pointDwellMs=pointDwellMs;this.headingTarget=0;this.reset();}
 reset(){this.ownerId=null;this.neutralRoll=0;this.filteredRoll=0;this.lastSeen=-Infinity;this.lastUpdate=null;this.lastMotion=-Infinity;this.lastStep=-Infinity;this.stepTimes=[];this.phase=0;this.steps=0;this.forward=0;this.turn=0;this.turnActive=false;this.pointSince=null;this.mode='lost';this.decision='reset';this.gait=emptyGait();this.neutralFlex={index:0,middle:0};this.previousFlex={index:0,middle:0};this.aim={x:.5,y:.5};}
 calibrate(hands,now,heading=this.headingTarget){
  const hand=Array.isArray(hands)&&hands.length===1&&validHand(hands[0])?hands[0]:null;this.reset();if(Number.isFinite(heading))this.headingTarget=heading;
  if(!hand||!Number.isFinite(now))return this.read(now);
  this.ownerId=String(hand.id);this.neutralRoll=hand.roll;this.filteredRoll=0;this.neutralFlex={index:hand.indexFlex,middle:hand.middleFlex};this.previousFlex={...this.neutralFlex};this.lastSeen=now;this.lastUpdate=now;this.mode='walk';this.decision='calibrated';return this.read(now);
 }
 stop(reason='stopped',hand=null){this.forward=0;this.turn=0;this.turnActive=false;this.pointSince=null;this.lastMotion=-Infinity;this.phase=0;this.gait=emptyGait();this.mode='walk';this.decision=reason;if(validHand(hand)){this.neutralFlex={index:hand.indexFlex,middle:hand.middleFlex};this.previousFlex={...this.neutralFlex};}}
 update(hands,now,{overUi=false}={}){
  const hand=Array.isArray(hands)&&hands.length===1&&validHand(hands[0])?hands[0]:null;
  if(!hand||!Number.isFinite(now)){this.stop('invalid-or-lost');return this.read(now,{overUi});}
  if(this.ownerId===null||String(hand.id)!==this.ownerId||now-this.lastSeen>this.staleMs){
   const changed=this.ownerId!==null&&String(hand.id)!==this.ownerId;this.calibrate([hand],now,this.headingTarget);this.stop(changed?'identity-recalibrated':'tracking-recalibrated');return this.read(now,{overUi});
  }
  const dt=Math.max(0,now-this.lastUpdate),movement=Math.abs(hand.indexFlex-this.previousFlex.index)+Math.abs(hand.middleFlex-this.previousFlex.middle);this.lastUpdate=now;this.lastSeen=now;
  if(Number.isFinite(hand.pointX)&&Number.isFinite(hand.pointY))this.aim={x:clamp((1-hand.pointX-.15)/.7),y:clamp((hand.pointY-.12)/.7)};
  if(overUi){this.stop('ui-dwell',hand);return this.read(now,{overUi:true});}
  if(hand.open===true){this.stop('open-palm-stop',hand);return this.read(now);}
  if(hand.pointing===true&&movement<.015){this.forward=0;this.turn=0;this.gait=emptyGait();this.pointSince??=now;this.previousFlex={index:hand.indexFlex,middle:hand.middleFlex};this.mode=now-this.pointSince>=this.pointDwellMs?'hose':'walk';this.decision=this.mode==='hose'?'spraying':'point-dwell';return this.read(now);}
  this.pointSince=null;this.mode='walk';
  const differential=(hand.indexFlex-this.neutralFlex.index)-(hand.middleFlex-this.neutralFlex.middle);
  const prior=(this.previousFlex.index-this.neutralFlex.index)-(this.previousFlex.middle-this.neutralFlex.middle);
  this.previousFlex={index:hand.indexFlex,middle:hand.middleFlex};
  if(movement>.018&&Math.abs(differential)>FLEX_THRESHOLD*.2)this.lastMotion=now;
  const nextPhase=differential>FLEX_THRESHOLD?1:differential< -FLEX_THRESHOLD?-1:0;
  if(nextPhase&&nextPhase!==this.phase){this.phase=nextPhase;this.steps++;if(now-this.lastStep>=120){this.lastStep=now;this.stepTimes.push(now);}}
  this.stepTimes=this.stepTimes.filter(time=>now-time<=2000);let cadence=0;
  if(this.stepTimes.length>=2){const intervals=this.stepTimes.slice(1).map((time,index)=>time-this.stepTimes[index]).filter(value=>value>=120&&value<=1200);if(intervals.length)cadence=clamp(1000/(intervals.reduce((a,b)=>a+b,0)/intervals.length),0,5);}
  const motionFresh=now-this.lastMotion<=STOP_MS,activity=dt>0?clamp((movement*1000/dt-.04)/1.6):0,target=motionFresh?clamp(Math.sqrt(activity)*(.82+cadence/10)):0;
  const paceAlpha=dt?1-Math.exp(-dt/(target>this.forward?70:140)):0;this.forward+=paceAlpha*(target-this.forward);if(!motionFresh)this.forward=0;
  const rawRoll=angleDelta(hand.roll,this.neutralRoll),rollAlpha=dt?1-Math.exp(-dt/110):0;this.filteredRoll+=rollAlpha*angleDelta(rawRoll,this.filteredRoll);
  const magnitude=Math.abs(this.filteredRoll);if(this.turnActive?magnitude<TURN_EXIT:magnitude>TURN_ENTER)this.turnActive=!this.turnActive;
  // sampleHand uses unmirrored camera coordinates. A positive palm roll leans
  // left in the mirrored preview, so it maps to a negative (left) yaw.
  this.turn=this.turnActive?-Math.sign(this.filteredRoll)*clamp((magnitude-TURN_EXIT)/(TURN_FULL-TURN_EXIT),0,1):0;
  this.headingTarget+=this.turn*.9*(dt/1000);
  const foot=clamp(differential/(FLEX_THRESHOLD*2),-1,1),stride=clamp(Math.max(Math.abs(differential)/(FLEX_THRESHOLD*2),activity));
  this.gait={left:foot,right:-foot,leftLift:clamp(foot),rightLift:clamp(-foot),stride,cadence:motionFresh?cadence:0,run:0};this.decision=this.forward>.01?'walking':this.turn?'turning':'rest';return this.read(now);
 }
 read(now,{overUi=false}={}){const fresh=Number.isFinite(now)&&now-this.lastSeen<=this.staleMs&&this.ownerId!==null;if(!fresh){this.forward=0;this.turn=0;this.mode='lost';this.gait=emptyGait();}const enabled=fresh&&!overUi,hose=enabled&&this.mode==='hose';return {tracked:fresh,forward:enabled&&this.mode==='walk'?clamp(this.forward):0,turn:enabled&&this.mode==='walk'?clamp(this.turn,-1,1):0,headingTarget:fresh?this.headingTarget:null,gait:enabled&&this.mode==='walk'?{...this.gait}:emptyGait(),mode:fresh?this.mode:'lost',aim:{...this.aim},spraying:hose,steps:this.steps};}
 diagnostics(now){const state=this.read(now);return {inputMode:'one-hand',ownerId:this.ownerId,decision:this.decision,mode:state.mode,tracked:state.tracked,lastSeenAge:Number.isFinite(this.lastSeen)?now-this.lastSeen:null,lastMotionAge:Number.isFinite(this.lastMotion)?now-this.lastMotion:null,neutralRoll:this.neutralRoll,rollOffset:this.filteredRoll,turnActive:this.turnActive,pointDwell:this.pointSince===null?0:clamp((now-this.pointSince)/this.pointDwellMs),steps:this.steps,forward:state.forward,turn:state.turn,spraying:state.spraying};}
}
