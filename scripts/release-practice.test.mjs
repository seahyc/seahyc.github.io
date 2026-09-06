import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,readFile,writeFile} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {releasePractice} from './release-practice.mjs';

async function fixture(){
 const root=await mkdtemp(path.join(os.tmpdir(),'release-practice-'));
 await mkdir(path.join(root,'path'));
 await writeFile(path.join(root,'version.mjs'),"const version='old';\nexport const poll=()=>fetch(new URL('./release.json',import.meta.url),{cache:'no-store'});\n");
 await writeFile(path.join(root,'release.json'),'{"version":"old"}\n');
 await writeFile(path.join(root,'index.html'),'<link href="app.css?v=old"><script src="./app.mjs?v=old"></script><script src="https://cdn.example/app.mjs?v=cdn"></script>');
 await writeFile(path.join(root,'app.mjs'),"import './state.mjs?v=old';\nconst data=fetch('./data.json?v=old');\nconst release=fetch(new URL('./release.json',import.meta.url),{cache:'no-store'});\nconst cdn='https://cdn.example/theme.css?v=cdn';\n");
 await writeFile(path.join(root,'path','index.html'),'<link href="../app.css"><script src="nested.mjs"></script>');
 await writeFile(path.join(root,'notes.txt'),'leave app.css unchanged');
 await writeFile(path.join(root,'image.bin'),Buffer.from([0,255,1,2]));
 return root;
}

test('two releases replace every local asset tag consistently',async()=>{
 const root=await fixture();
 await releasePractice(root,'first-tag');
 await releasePractice(root,'second.2');
 const html=await readFile(path.join(root,'index.html'),'utf8'),app=await readFile(path.join(root,'app.mjs'),'utf8'),nested=await readFile(path.join(root,'path','index.html'),'utf8');
 for(const text of [html,app,nested]){assert.doesNotMatch(text,/v=old|v=first-tag/);}
 assert.match(html,/app\.css\?v=second\.2/);assert.match(html,/\.\/app\.mjs\?v=second\.2/);
 assert.match(app,/\.\/state\.mjs\?v=second\.2/);assert.match(app,/\.\/data\.json\?v=second\.2/);
 assert.match(nested,/\.\.\/app\.css\?v=second\.2/);assert.match(nested,/nested\.mjs\?v=second\.2/);
 assert.match(html,/https:\/\/cdn\.example\/app\.mjs\?v=cdn/);assert.match(app,/https:\/\/cdn\.example\/theme\.css\?v=cdn/);
 assert.match(app,/new URL\('\.\/release\.json',import\.meta\.url\),\{cache:'no-store'\}/);assert.doesNotMatch(app,/release\.json\?/);
 const version=await readFile(path.join(root,'version.mjs'),'utf8');assert.match(version,/^const version="second\.2";/);assert.match(version,/new URL\('\.\/release\.json',import\.meta\.url\),\{cache:'no-store'\}/);assert.doesNotMatch(version,/release\.json\?/);
 assert.deepEqual(JSON.parse(await readFile(path.join(root,'release.json'),'utf8')),{version:'second.2'});
 assert.equal(await readFile(path.join(root,'notes.txt'),'utf8'),'leave app.css unchanged');
 assert.deepEqual(await readFile(path.join(root,'image.bin')),Buffer.from([0,255,1,2]));
});

test('rejects unsafe tags and unrelated directories',async()=>{
 const root=await fixture(),unrelated=await mkdtemp(path.join(os.tmpdir(),'not-practice-'));
 await assert.rejects(releasePractice(root,'bad tag'),/Tag must/);
 await assert.rejects(releasePractice(root,'../escape'),/Tag must/);
 await assert.rejects(releasePractice(unrelated,'valid-tag'),/version\.mjs and release\.json/);
 await assert.rejects(releasePractice(path.parse(root).root,'valid-tag'),/specific directory/);
});
