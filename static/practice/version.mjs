const version='recall-2026-09-06-1';
async function check(){
 try{const response=await fetch(new URL('./release.json',import.meta.url),{cache:'no-store'});if(!response.ok)return;const release=await response.json();if(release.version===version||document.getElementById('update-banner'))return;
 const banner=document.createElement('aside');banner.id='update-banner';banner.setAttribute('role','status');banner.className='update-banner';
 const message=document.createElement('span');message.textContent='A newer practice version is ready. Your saved work will stay here.';const button=document.createElement('button');button.textContent='Refresh';button.onclick=()=>{if(document.getElementById('save-status')?.textContent==='Not saved'){alert('Export your work before refreshing; the latest edit could not be saved.');return;}location.reload();};banner.append(message,button);document.body.prepend(banner);
 }catch{/* Offline practice should not be interrupted by an update check. */}
}
window.addEventListener('focus',check);setInterval(check,60000);check();
