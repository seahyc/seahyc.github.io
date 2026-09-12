import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

// Run against the final artifact, after every publishing/pruning step.
export async function verifyPracticePublication(publicDir){
 const root=path.resolve(publicDir);
 const required=['index.html','app.mjs','runner.mjs','editor.bundle.mjs','explorer.mjs','examples.json','curriculum.json','ramp.json','variations.json','learning-model.mjs','learning-state.mjs','skill-catalog.mjs','mastery.mjs','state.mjs','release.json','design-system.css','workspace.css','path/index.html','path/app.mjs','path/model.mjs','path/roadmap.mjs','path/sessions.json','path/layout.css'];
 for(const relative of required){
  const file=path.join(root,'practice',relative);
  if(!(await stat(file).catch(()=>null))?.isFile())throw Error(`Missing published practice asset: practice/${relative}`);
 }
 const html=await readFile(path.join(root,'practice/path/index.html'),'utf8');
 if(!html.includes('id="next"')||!html.includes('id="roadmap"'))throw Error('Published path is missing its next-step or roadmap interface');
 return required.length;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 try{console.log(`Published practice verified: ${await verifyPracticePublication(process.argv[2]||'public')} required routes/assets`);}
 catch(error){console.error(error.message);process.exitCode=1;}
}
