let activeCleanup=()=>{};
export function clearCelebration(){activeCleanup();activeCleanup=()=>{};}
export function celebrate(target){
 clearCelebration();
 if(!target||document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const host=target.closest('.code-pane')||target,parent=document.createElement('div');parent.className='celebration-particles';parent.setAttribute('aria-hidden','true');host.append(parent);
 target.classList.add('is-celebrating');
 for(let i=0;i<28;i++){
  const piece=document.createElement('i');piece.className=`celebration-piece tone-${i%4}`;piece.style.setProperty('--flight-x',`${Math.cos(i*2.399)* (65+i*5)}px`);piece.style.setProperty('--flight-y',`${-90-(i%7)*16}px`);piece.style.setProperty('--spin',`${i%2?240:-280}deg`);piece.style.setProperty('--delay',`${(i%5)*18}ms`);parent.append(piece);
 }
 const rect=target.getBoundingClientRect(),hostRect=host.getBoundingClientRect();parent.style.top=`${rect.top-hostRect.top+rect.height/2}px`;
 const timer=setTimeout(clearCelebration,1400);
 activeCleanup=()=>{clearTimeout(timer);parent.remove();target.classList.remove('is-celebrating');};
}
if(typeof document!=='undefined')document.addEventListener('visibilitychange',()=>{if(document.hidden)clearCelebration();});
