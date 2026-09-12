import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderQuality} from '../src/render-quality.mjs';
test('Retina renders above CSS resolution instead of stretching a smaller image',()=>{
 const q=renderQuality({width:1440,height:900,dpr:2,maxSamples:4});
 assert(q.pixelRatio>1.7);assert(q.hardwareScaling<1);assert(1440*900*q.pixelRatio**2<=4_000_001);assert.equal(q.samples,2);assert.equal(q.fxaa,false);
});
test('high-density portrait and landscape phones retain 2x clarity within a bounded buffer',()=>{
 for(const [width,height] of [[390,844],[844,390]]){
  const q=renderQuality({width,height,dpr:3,mobile:true});assert.equal(q.pixelRatio,2);assert.equal(q.hardwareScaling,.5);assert.equal(q.ambientOcclusion,false);assert(width*height*q.pixelRatio**2<1_600_000);
 }
});
test('large displays and invalid DPR never render below CSS resolution',()=>{
 for(const dpr of [1,2,3,NaN,0])assert(renderQuality({width:3840,height:2160,dpr}).hardwareScaling<=1);
});
