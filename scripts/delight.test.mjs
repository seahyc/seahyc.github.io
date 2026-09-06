import test from 'node:test';
import assert from 'node:assert/strict';
import {typingKind} from '../static/practice/feedback.mjs';
test('typewriter distinguishes letters, carriage return and deletion',()=>{assert.equal(typingKind({key:'a'}),'key');assert.equal(typingKind({key:'Enter'}),'return');assert.equal(typingKind({key:'Backspace'}),'erase');});
test('navigation, shortcuts and composing text are silent',()=>{for(const e of [{key:'ArrowLeft'},{key:'Shift'},{key:'a',metaKey:true},{key:'v',ctrlKey:true},{key:'a',altKey:true},{key:'a',isComposing:true}])assert.equal(typingKind(e),null);});

import vm from 'node:vm';
import {readFileSync} from 'node:fs';
test('real sound handlers create key voices, respect mute, and silence shortcuts',()=>{
 const listeners={},buttons={},stats={started:0,stopped:0};let now=1000;
 const header={append:b=>buttons[b.id]=b};
 const document={hidden:false,querySelector:()=>header,getElementById:id=>buttons[id],createElement:()=>({handlers:{},setAttribute(){},addEventListener(k,f){this.handlers[k]=f;}}),addEventListener(k,f){listeners[k]=f;}};
 const parameter=()=>({setValueAtTime(){},exponentialRampToValueAtTime(){},value:0});
 const node=()=>({frequency:parameter(),gain:parameter(),Q:parameter(),playbackRate:parameter(),connect(){return this;},disconnect(){},start(){stats.started++;},stop(){stats.stopped++;}});
 class AudioContext{constructor(){this.state='running';this.currentTime=0;this.sampleRate=48000;this.destination={};}createBuffer(_,size){return{getChannelData:()=>new Float32Array(size)};}createBufferSource(){return node();}createOscillator(){return node();}createBiquadFilter(){return node();}createGain(){return node();}}
 const storage={value:'on',getItem(){return this.value;},setItem(_,v){this.value=v;}};
 const source=readFileSync(new URL('../static/practice/feedback.mjs',import.meta.url),'utf8').replaceAll('export function ','function ');
 vm.runInNewContext(source,{document,window:{addEventListener(){}},localStorage:storage,navigator:{userActivation:{isActive:true}},AudioContext,performance:{now:()=>now},Math,Set});
 assert.equal(stats.started,0,'install does not play sound');
 const key=e=>{now+=100;listeners.keydown({isTrusted:true,target:{closest:()=>({})},...e});};
 key({key:'a'});assert.equal(stats.started,2,'key strike combines mechanical noise and a low tone');
 key({key:'Enter'});assert.equal(stats.started,5,'return key adds a short bell');
 key({key:'v',metaKey:true});assert.equal(stats.started,5);
 buttons['sound-toggle'].handlers.click();assert.equal(storage.value,'off');
 key({key:'b'});assert.equal(stats.started,5,'mute suppresses typing');
});
