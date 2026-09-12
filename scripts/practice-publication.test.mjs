import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,cp,mkdir,writeFile,readFile,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {verifyPracticePublication} from './verify-practice-publication.mjs';
const repo=fileURLToPath(new URL('../',import.meta.url));

test('publishing preserves the public practice path and sitemap entries while removing private projects',async()=>{
 const output=await mkdtemp(path.join(tmpdir(),'practice-publication-'));
 try{
  await cp(path.join(repo,'static/practice'),path.join(output,'practice'),{recursive:true});
  for(const route of ['making/coding-practice','projects/coding-practice','making/project-orion-the-long-way-through','projects/project-orion','projects/orion']){
   await mkdir(path.join(output,route),{recursive:true});await writeFile(path.join(output,route,'index.html'),'project');
  }
  const urls=['/practice/path/','/making/coding-practice/','/projects/coding-practice/','/making/project-orion-the-long-way-through/','/projects/project-orion/','/projects/orion/','/writing/'];
  await writeFile(path.join(output,'sitemap.xml'),'<urlset>'+urls.map(url=>`<url><loc>https://seahyingcong.com${url}</loc></url>`).join('')+'</urlset>');
  execFileSync(process.execPath,['scripts/prune-private-projects.mjs',output],{cwd:repo});
  assert.ok(await verifyPracticePublication(output));
  await access(path.join(output,'making/coding-practice/index.html'));
  await access(path.join(output,'projects/coding-practice/index.html'));
  await assert.rejects(access(path.join(output,'making/project-orion-the-long-way-through/index.html')));
  await assert.rejects(access(path.join(output,'projects/orion/index.html')));
  await assert.rejects(access(path.join(output,'projects/project-orion/index.html')));
  const sitemap=await readFile(path.join(output,'sitemap.xml'),'utf8');
  assert.match(sitemap,/\/writing\//);assert.match(sitemap,/\/practice\/path\//);assert.match(sitemap,/\/making\/coding-practice\//);assert.match(sitemap,/\/projects\/coding-practice\//);assert.doesNotMatch(sitemap,/orion/);
  // Reproduce the former deployment failure: the final artifact check must catch it.
  await rm(path.join(output,'practice/path'),{recursive:true});
  await assert.rejects(verifyPracticePublication(output),/Missing published practice asset: practice\/path\/index.html/);
 }finally{await rm(output,{recursive:true,force:true});}
});
