import './style.css';
import {finishAstronaut} from './astronaut-finish';
import {Vector3,Matrix,MeshBuilder,Mesh} from '@babylonjs/core';
import {createEnvironment} from './environment';
import {createLocomotion} from './locomotion';
import {createInputRuntime} from './input-runtime';
import {createFireSimulation} from './fire-simulation.mjs';
import {createFireEffects} from './fire-effects';
import {HOSE_ANCHOR} from './handwalk/avatar';

const $=(id:string)=>document.getElementById(id)!;
const params=new URLSearchParams(location.search),sceneReview=params.get('view')==='scene',qa=params.get('qa')==='1';
if(sceneReview)document.body.classList.add('scene-review');
const canvas=$('world') as HTMLCanvasElement;
const env=createEnvironment(canvas);
const movement=createLocomotion(env.scene,env.camera,env.colliders,env.spawn,env.canOccupy);
let input:ReturnType<typeof createInputRuntime>;
const fire=createFireSimulation({onEvent:(type:string,data:any)=>input?.record(type,data)} as any);
const effects=createFireEffects(env.scene);
const nozzle=MeshBuilder.CreateCylinder('hand-held hose nozzle',{height:.42,diameterTop:.075,diameterBottom:.11,tessellation:16},env.scene);nozzle.material=env.materials.chrome;nozzle.parent=movement.player;nozzle.position.set(HOSE_ANCHOR.x,HOSE_ANCHOR.y,HOSE_ANCHOR.z);nozzle.rotation.x=Math.PI/2;nozzle.isPickable=false;
let hosePath=Array.from({length:50},(_,i)=>new Vector3(-4.5+i/49*4.85,.06,-.55+i/49*-2));
let hose=MeshBuilder.CreateTube('ivory supply hose',{path:hosePath,radius:.045,tessellation:8,updatable:true,cap:Mesh.CAP_ALL},env.scene);hose.material=env.materials.ivory;hose.isPickable=false;env.shadows.addShadowCaster(hose);
const hoseStart=new Vector3(-4.5,.48,-.5),hoseEnd=new Vector3(Number.POSITIVE_INFINITY,0,0);
let nowSeconds=0,last=performance.now(),lastTrace=0,lastHud=0,lastHose=Number.NEGATIVE_INFINITY,ready=false,disposed=false,qaOverride:any=null,latestState:any=null,latestImpact:Vector3|null=null;
let nozzleVisible=true,lastAimValid='',lastMode='',lastComplete='',lastPatchCount='',lastRangeNote='',lastFps='',lastProgress='';
function reset(){movement.reset();fire.reset();$('completion').hidden=true;input?.record('scenario-reset',{scenario:'hose-baseline',seed:73011});}
input=createInputRuntime({canvas,container:$('controls'),getHeading:()=>movement.player.rotation.y,onEvent:(type)=>{if(type==='reset')reset();}});
function impactAt(aim:{x:number,y:number},origin:Vector3){
 const x=aim.x*env.engine.getRenderWidth(),y=aim.y*env.engine.getRenderHeight();
 const ray=env.scene.createPickingRay(x,y,Matrix.Identity(),env.camera,false);
 if(ray.direction.y>=-.008)return null;
 const distance=-ray.origin.y/ray.direction.y;if(distance<0||distance>120)return null;
 const point=ray.origin.add(ray.direction.scale(distance));point.y=.03;
 if(Vector3.Distance(origin,point)>14||!env.canOccupy(point.x,point.z))return null;
 return point;
}
function updateHose(now:number,origin:Vector3){
 if(now-lastHose<1000/30)return;
 const endX=origin.x,endY=origin.y-.08,endZ=origin.z-.2;
 const dx=endX-hoseEnd.x,dy=endY-hoseEnd.y,dz=endZ-hoseEnd.z;
 if(dx*dx+dy*dy+dz*dz<.0001)return;
 lastHose=now;hoseEnd.set(endX,endY,endZ);
 const bendX=endX,bendZ=endZ-.4;
 for(let i=0;i<hosePath.length;i++){
  const t=i/(hosePath.length-1);
  if(t<.82){const q=t/.82,s=Math.sin(q*Math.PI);hosePath[i].set(hoseStart.x+(bendX-hoseStart.x)*q-s*.9,hoseStart.y+(.065-hoseStart.y)*q-s*.17,hoseStart.z+(bendZ-hoseStart.z)*q+s*.8);}
  else{const q=(t-.82)/.18;hosePath[i].set(bendX,.065+((endY-.065)*q),bendZ+(endZ-bendZ)*q);}
 }
 hose=MeshBuilder.CreateTube('ivory supply hose',{path:hosePath,instance:hose});
}
function renderFrame(){
 const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;nowSeconds+=dt;
 if(!ready){env.scene.render();return;}
 const frame=qaOverride??input.frame(now);
 const state=movement.update(dt,{...frame,active:!sceneReview&&frame.active,toolActive:frame.mode==='hose'});
 if(sceneReview)env.setEstablishingView();
 const origin=Vector3.TransformCoordinates(new Vector3(HOSE_ANCHOR.x,HOSE_ANCHOR.y,HOSE_ANCHOR.z+.22),movement.player.getWorldMatrix());
 let impact=qaOverride?.impact?new Vector3(qaOverride.impact.x,.03,qaOverride.impact.z):impactAt(frame.aim,origin);
 const spraying=frame.spraying&&!sceneReview;
 const fireState=fire.update(dt,{active:frame.active&&!sceneReview,spraying,impact:impact?{x:impact.x,z:impact.z}:null,pressure:1});
 const visualImpact=impact??origin.add(env.camera.getForwardRay().direction.scale(12));if(!impact)visualImpact.y=-.32;effects.update(dt,nowSeconds,fireState,{active:spraying,origin,impact:visualImpact});latestImpact=impact;
 const aimValid=String(Boolean(impact));if(aimValid!==lastAimValid){lastAimValid=aimValid;document.body.dataset.aimValid=aimValid;}
 updateHose(now,origin);
 const showNozzle=frame.mode==='hose'||sceneReview;if(showNozzle!==nozzleVisible){nozzleVisible=showNozzle;nozzle.setEnabled(showNozzle);}env.update(nowSeconds);env.scene.render();
 latestState={...state,fire:fireState,input:frame,impact:impact?{x:impact.x,y:impact.y,z:impact.z}:null,frameMs:dt*1000};
 if(now-lastTrace>100){lastTrace=now;input.record('world-state',{position:state.position,yaw:state.yaw,speed:state.speed,displacement:state.displacement,blocked:state.blocked,gait:state.gait,camera:state.camera,fire:fireState,impact:latestState.impact,pressure:1,mode:frame.mode,dt,fps:env.engine.getFps(),quality:'grove-high',seed:73011});}
 if(now-lastHud>150){lastHud=now;const progress=`${fireState.progress*100}%`,patchCount=`${fireState.extinguished} / 3 fires out`,rangeNote=frame.mode==='hose'?(impact?'Water on target':'Aim lower or move closer'):'Supply connected',fps=`${Math.round(env.engine.getFps())} fps`,complete=String(fireState.complete);if(progress!==lastProgress){lastProgress=progress;$('progress-fill').style.width=progress;}if(patchCount!==lastPatchCount){lastPatchCount=patchCount;$('patch-count').textContent=patchCount;}if(rangeNote!==lastRangeNote){lastRangeNote=rangeNote;$('range-note').textContent=rangeNote;}if(fps!==lastFps){lastFps=fps;$('fps').textContent=fps;}if($('completion').hidden===fireState.complete)$('completion').hidden=!fireState.complete;if(frame.mode!==lastMode){lastMode=frame.mode;document.documentElement.dataset.mode=frame.mode;}if(complete!==lastComplete){lastComplete=complete;document.documentElement.dataset.complete=complete;}}
}
function syncRendering(){
 env.engine.stopRenderLoop(renderFrame);
 if(!document.hidden&&!disposed){last=performance.now();env.engine.runRenderLoop(renderFrame);}
}
document.addEventListener('visibilitychange',syncRendering);
syncRendering();
void Promise.all([movement.ready,env.assetsReady]).then(async()=>{finishAstronaut(movement.player.getChildMeshes());for(const mesh of movement.player.getChildMeshes()){mesh.receiveShadows=true;env.shadows.addShadowCaster(mesh);}ready=true;await env.scene.whenReadyAsync();$('loading').hidden=true;if(sceneReview)env.setEstablishingView();else await input.start();}).catch(error=>{$('loading').hidden=false;$('load-message').textContent=`Could not start: ${String(error)}`;console.error(error);});
window.addEventListener('resize',()=>env.engine.resize());
window.addEventListener('pagehide',()=>{disposed=true;document.removeEventListener('visibilitychange',syncRendering);env.engine.stopRenderLoop(renderFrame);input.dispose();effects.dispose();movement.dispose();env.dispose();});
if(qa){(window as any).__forestQA={ready:()=>ready,snapshot:()=>latestState,avatar:()=>movement.avatar.modelStatus(),input:()=>input.diagnostics(),reset,override:(value:any)=>{qaOverride=value;},clear:()=>{qaOverride=null;},aimFor:(x:number,z:number)=>{const point=Vector3.Project(new Vector3(x,.03,z),Matrix.Identity(),env.scene.getTransformMatrix(),env.camera.viewport.toGlobal(env.engine.getRenderWidth(),env.engine.getRenderHeight()));return {x:point.x/env.engine.getRenderWidth(),y:point.y/env.engine.getRenderHeight()};},scene:env.scene,renderSize:()=>({width:env.engine.getRenderWidth(),height:env.engine.getRenderHeight()})};}
