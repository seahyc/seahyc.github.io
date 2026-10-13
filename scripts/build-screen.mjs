// Assemble projects-src/practice-screen/<id>/ into the two bundles the screen page loads:
// exercises.json (what the candidate sees) and validators.json (hidden, fetched only on Submit).
// `node scripts/build-screen.mjs --check` fails when the committed bundles are stale.
import {readdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'projects-src','practice-screen');
const out=path.join(root,'static','practice','screen');

async function walk(dir,base=dir){
 const files={};
 for(const entry of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  const full=path.join(dir,entry.name);
  if(entry.isDirectory())Object.assign(files,await walk(full,base));
  else if(!entry.name.startsWith('.')&&!entry.name.endsWith('.pyc'))files[path.relative(base,full).split(path.sep).join('/')]=await readFile(full,'utf8');
 }
 return files;
}

export async function bundle(only=[]){
 const exercises=[],validators={};
 for(const entry of (await readdir(source,{withFileTypes:true})).filter(e=>e.isDirectory()&&(!only.length||only.includes(e.name)))){
  const dir=path.join(source,entry.name);
  const meta=JSON.parse(await readFile(path.join(dir,'meta.json'),'utf8'));
  const stem=path.basename(meta.entry,'.py');
  exercises.push({id:meta.id,title:meta.title,family:meta.family,phase:meta.phase,order:meta.order,minutes:meta.minutes,summary:meta.summary,
   entry:meta.entry,visible:`tests/test_${stem}.py`,candidate:'tests/test_candidate.py',
   instructions:await readFile(path.join(dir,'instructions.md'),'utf8'),files:await walk(path.join(dir,'project'))});
  validators[meta.id]={source:await readFile(path.join(dir,'validators.py'),'utf8'),weights:meta.weights,critical:meta.critical};
 }
 exercises.sort((a,b)=>a.order-b.order);
 return {
  'exercises.json':JSON.stringify({title:'Cognition Screen sprint',exercises},null,1)+'\n',
  'validators.json':JSON.stringify(validators,null,1)+'\n'
 };
}

if(import.meta.url===`file://${process.argv[1]}`){
 const only=process.argv.slice(2).filter(a=>!a.startsWith('--'));
 const files=await bundle(only),check=process.argv.includes('--check');
 for(const [name,text] of Object.entries(files)){
  const target=path.join(out,name);
  if(check){const current=await readFile(target,'utf8').catch(()=>'');if(current!==text){console.error(`${name} is stale: run node scripts/build-screen.mjs`);process.exit(1);}}
  else await writeFile(target,text);
 }
 console.log(check?'screen bundles are current':`wrote ${Object.keys(files).join(', ')}`);
}
