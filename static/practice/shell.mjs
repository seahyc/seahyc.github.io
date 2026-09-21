// One navigation and layout preference shared by all workspace surfaces.
const root=new URL('./',import.meta.url),key='workspace-layout-v1';
const page=document.body.dataset.workspace;
let layout={sidebar:true,brief:true,output:true};
try{const saved=JSON.parse(localStorage.getItem(key)||'{}');for(const name of Object.keys(layout))if(typeof saved[name]==='boolean')layout[name]=saved[name];}catch{/* Leave unreadable storage untouched until a deliberate toggle. */}
const nav=document.createElement('nav');nav.id='workspace-nav';nav.setAttribute('aria-label','Workspace navigation');
function fileURL(){const url=new URL('./?library=1',root);try{const id=JSON.parse(localStorage.getItem('coding-practice-v1')||'{}').activeExerciseId;if(typeof id==='string'&&/^[a-z0-9-]+$/.test(id))url.hash=id;}catch{}return url;}
const links=[['queue','Queue','./path/','Next task and roadmap'],['files','Files','./?library=1','Task files and execution'],['experiments','Experiments','./lab/','Experiment projects and results']];
for(const [id,label,path,title] of links){const a=document.createElement('a');a.textContent=label;a.href=id==='files'?fileURL():new URL(path,root);a.title=title;a.dataset.destination=id;if(page===id)a.setAttribute('aria-current','page');a.addEventListener('click',event=>{if(id==='files')a.href=fileURL();if(id===page&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey){event.preventDefault();}});nav.append(a);}
const controls=document.createElement('div');controls.className='workspace-layout-controls';nav.append(controls);
const regions={sidebar:page==='files'?'.curriculum':page==='experiments'?'.shell > aside':null,brief:page==='files'?'.brief-pane':null,output:page==='files'?'.testing-pane':null};
const buttons={};
function apply(){for(const [name,selector] of Object.entries(regions)){if(!selector)continue;document.body.classList.toggle(`${name}-collapsed`,!layout[name]);const region=document.querySelector(selector);if(region)region.inert=!layout[name];const b=buttons[name];if(b){b.setAttribute('aria-expanded',String(layout[name]));b.title=`${layout[name]?'Hide':'Show'} ${name}`;}}
 requestAnimationFrame(()=>window.dispatchEvent(new Event('resize')));
}
for(const [name,selector] of Object.entries(regions)){if(!selector)continue;const region=document.querySelector(selector);if(!region)continue;if(!region.id)region.id=`workspace-${name}`;const b=document.createElement('button');b.id=`toggle-${name}`;b.type='button';b.textContent=name[0].toUpperCase()+name.slice(1);b.setAttribute('aria-controls',region.id);b.onclick=()=>{layout[name]=!layout[name];try{localStorage.setItem(key,JSON.stringify(layout));}catch{}apply();};buttons[name]=b;controls.append(b);}
if(page==='files'){
 const session=document.querySelector('.session-bar');
 if(session){const menu=document.createElement('details');menu.className='workspace-session-menu';const summary=document.createElement('summary');summary.textContent='Session';menu.append(summary,session);controls.append(menu);}
}
document.body.prepend(nav);apply();
window.addEventListener('storage',event=>{if(event.key==='coding-practice-v1'){nav.querySelector('[data-destination="files"]').href=fileURL();}});

// Execution results must be visible; this temporary reveal does not overwrite preferences.
window.addEventListener('workspace:run',()=>{if(page==='files'&&!layout.output){layout.output=true;apply();}});
