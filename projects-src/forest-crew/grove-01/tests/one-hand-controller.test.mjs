import test from 'node:test';
import assert from 'node:assert/strict';
import {OneHandController} from '../src/one-hand-controller.mjs';

const hand=(overrides={})=>({id:'hand-a',indexFlex:.2,middleFlex:.2,roll:0,pointX:.3,pointY:.4,indexReach:1,middleReach:1,open:false,pointing:false,...overrides});

test('alternating index and middle flex creates assisted forward gait',()=>{
 const controller=new OneHandController();controller.calibrate([hand()],0,1);
 let result;for(const [time,indexFlex,middleFlex] of [[100,.31,.19],[220,.19,.31],[340,.31,.19],[460,.19,.31]])result=controller.update([hand({indexFlex,middleFlex})],time);
 assert.ok(result.forward>0);assert.ok(result.gait.stride>0);assert.ok(result.steps>=3);
});

test('mirrored left and right roll turn in the matching world direction outside the deadzone',()=>{
 const controller=new OneHandController();controller.calibrate([hand({roll:.2})],0,2);
 assert.equal(controller.update([hand({roll:.24})],100).turn,0);
 let result=controller.update([hand({roll:.65})],220);result=controller.update([hand({roll:.65})],340);
 assert.ok(result.turn<0);assert.ok(result.headingTarget<2);
 const right=new OneHandController();right.calibrate([hand({roll:.2})],0,2);right.update([hand({roll:-.25})],220);result=right.update([hand({roll:-.25})],340);assert.ok(result.turn>0);assert.ok(result.headingTarget>2);
});

test('point dwell sprays with one hand and UI dwell suppresses every action',()=>{
 const controller=new OneHandController();controller.calibrate([hand()],0);
 assert.equal(controller.update([hand({pointing:true})],100).spraying,false);
 assert.equal(controller.update([hand({pointing:true})],200).spraying,false);
 assert.equal(controller.update([hand({pointing:true})],360).spraying,true);
 assert.deepEqual(controller.read(360).aim,{x:clampForTest((1-.3-.15)/.7),y:clampForTest((.4-.12)/.7)});
 const stopped=controller.update([hand({pointing:true})],400,{overUi:true});assert.equal(stopped.spraying,false);assert.equal(stopped.forward,0);assert.equal(stopped.turn,0);
});

test('a moving finger-walk pose does not enter pointing hose stance',()=>{
 const controller=new OneHandController();controller.calibrate([hand()],0);
 for(const [time,indexFlex,middleFlex] of [[100,.12,.55],[220,.48,.18],[340,.12,.55],[460,.48,.18]]){
  const result=controller.update([hand({indexFlex,middleFlex,pointing:true})],time);assert.equal(result.spraying,false);
 }
 assert.ok(controller.read(460).forward>0);
});

test('open palm, stale tracking, and identity changes stop without steering jumps',()=>{
 const controller=new OneHandController();controller.calibrate([hand()],0,3);
 controller.update([hand({indexFlex:.32,middleFlex:.18,roll:.6})],100);
 assert.deepEqual(controller.update([hand({open:true})],140),expectStopped(controller.update([hand({open:true})],140)));
 const stale=controller.read(361);assert.equal(stale.tracked,false);assert.equal(stale.forward,0);assert.equal(stale.turn,0);
 const changed=controller.update([hand({id:'hand-b',roll:-1})],400);assert.equal(changed.forward,0);assert.equal(changed.turn,0);assert.equal(changed.headingTarget,controller.headingTarget);
});

function expectStopped(value){assert.equal(value.forward,0);assert.equal(value.turn,0);assert.equal(value.spraying,false);return value;}
function clampForTest(value){return Math.max(0,Math.min(1,value));}
