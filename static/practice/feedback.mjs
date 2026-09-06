const STORAGE_KEY='coding-practice-sound';
let context,noise,enabled=readEnabled(),lastKeyAt=-Infinity,lastActionAt=-Infinity;
const voices=new Set();
function readEnabled(){try{return localStorage.getItem(STORAGE_KEY)!=='off';}catch{return true;}}
function syncToggle(){const button=document.getElementById('sound-toggle');if(!button)return;button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Sound on':'Sound off';button.title=enabled?'Mute typing and practice sounds':'Enable typing and practice sounds';}
function audio(){if(!enabled||document.hidden)return null;try{context ||= new AudioContext();if(context.state==='suspended')context.resume().catch(()=>{});return context;}catch{return null;}}
function track(source,end){voices.add(source);source.onended=()=>{voices.delete(source);source.disconnect();};source.start();source.stop(end);}
function hush(){for(const source of voices){try{source.stop();}catch{}}voices.clear();}
function tone(ctx,freq,start,duration,volume,type='sine'){
 const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type=type;oscillator.frequency.setValueAtTime(freq,start);
 gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(volume,start+.006);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
 oscillator.connect(gain).connect(ctx.destination);track(oscillator,start+duration+.015);
}
function keyStrike(ctx,kind,key){
 if(!noise){noise=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*.04),ctx.sampleRate);const channel=noise.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=Math.random()*2-1;}
 const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain(),now=ctx.currentTime;
 source.buffer=noise;source.playbackRate.value=.94+(String(key).charCodeAt(0)%9)*.015;filter.type='bandpass';filter.frequency.value=kind==='return'?950:kind==='erase'?1400:2100;filter.Q.value=.8;
 gain.gain.setValueAtTime(.045,now);gain.gain.exponentialRampToValueAtTime(.0001,now+.035);source.connect(filter).connect(gain).connect(ctx.destination);track(source,now+.05);
 tone(ctx,kind==='return'?130:185,now,.026,.021,'triangle');
 if(kind==='return')tone(ctx,980,now+.015,.10,.012);
}
export function typingKind(event){
 if(event.isComposing||event.metaKey||event.ctrlKey||event.altKey)return null;
 if(event.key==='Enter')return 'return';
 if(event.key==='Backspace'||event.key==='Delete')return 'erase';
 if(event.key==='Tab')return 'key';
 return event.key?.length===1?'key':null;
}
export function feedback(kind){
 if(!['click','run','pass','fail'].includes(kind))return;
 if(!context&&!navigator.userActivation?.isActive)return;
 const ctx=audio();if(!ctx)return;
 const now=performance.now();if(now-lastActionAt<45)return;lastActionAt=now;
 const start=ctx.currentTime+.003;
 if(kind==='click')tone(ctx,440,start,.035,.025,'triangle');
 else if(kind==='run'){tone(ctx,330,start,.07,.022);tone(ctx,495,start+.075,.08,.018);}
 else if(kind==='pass'){
  // A compact ascending arpeggio resolves into a warm major chord.
  [523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(ctx,f,start+i*.085,.18,i===3?.030:.023));
  [523.25,659.25,783.99].forEach(f=>tone(ctx,f,start+.34,.30,.012));
 }else tone(ctx,185,start,.075,.018,'triangle');
}
function install(){
 const header=document.querySelector('header');if(!header)return;
 const button=document.createElement('button');button.id='sound-toggle';button.type='button';button.className='sound-toggle';
 button.addEventListener('click',()=>{enabled=!enabled;try{localStorage.setItem(STORAGE_KEY,enabled?'on':'off');}catch{}if(!enabled)hush();syncToggle();if(enabled)feedback('click');});header.append(button);syncToggle();
 document.addEventListener('click',event=>{const target=event.target?.closest?.('button:not(:disabled), .button:not([aria-disabled="true"])');if(target&&target.id!=='sound-toggle'&&!['run','syntax','main','example-run'].includes(target.id))feedback('click');});
 document.addEventListener('keydown',event=>{
  if(!event.isTrusted||!event.target?.closest?.('.cm-content[contenteditable="true"]'))return;
  const kind=typingKind(event);if(!kind||performance.now()-lastKeyAt<32)return;
  const ctx=audio();if(!ctx)return;lastKeyAt=performance.now();keyStrike(ctx,kind,event.key);
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)hush();});
 window.addEventListener('storage',event=>{if(event.key===STORAGE_KEY){enabled=event.newValue!=='off';if(!enabled)hush();syncToggle();}});
}
if(typeof document!=='undefined')install();
