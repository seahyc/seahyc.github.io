import {readdir,readFile,stat,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const SOURCE_EXTENSIONS=new Set(['.html','.mjs','.js']);
const ASSET_REFERENCE=/(["'`])((?:(?!\1).)*?\.(?:mjs|css|json)(?:\?[^"'`\s#]*)?(?:#[^"'`\s]*)?)\1/g;

function validateTag(tag){
 if(typeof tag!=='string'||!/^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/.test(tag))throw Error('Tag must use 1–128 letters, numbers, dots, underscores, or hyphens.');
 return tag;
}
function stampReference(reference,tag){
 if(/^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(reference))return reference;
 const hashIndex=reference.indexOf('#'),hash=hashIndex<0?'':reference.slice(hashIndex),withoutHash=hashIndex<0?reference:reference.slice(0,hashIndex);
 const queryIndex=withoutHash.indexOf('?'),pathname=queryIndex<0?withoutHash:withoutHash.slice(0,queryIndex);
 if(path.posix.basename(pathname)==='release.json')return pathname+hash;
 return `${pathname}?v=${tag}${hash}`;
}
function stampSource(source,tag){return source.replace(ASSET_REFERENCE,(match,quote,reference)=>`${quote}${stampReference(reference,tag)}${quote}`);}
async function sourceFiles(root){
 const found=[];
 async function visit(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
   const target=path.join(directory,entry.name);
   if(entry.isSymbolicLink())continue;
   if(entry.isDirectory())await visit(target);
   else if(entry.isFile()&&!entry.name.endsWith('.bundle.mjs')&&SOURCE_EXTENSIONS.has(path.extname(entry.name)))found.push(target);
  }
 }
 await visit(root);return found;
}

export async function releasePractice(practiceDir,rawTag){
 const tag=validateTag(rawTag),root=path.resolve(practiceDir||'');
 const info=await stat(root).catch(()=>null);
 if(!info?.isDirectory()||root===path.parse(root).root)throw Error('Practice path must be an existing, specific directory.');
 const versionFile=path.join(root,'version.mjs'),releaseFile=path.join(root,'release.json');
 if(!(await stat(versionFile).catch(()=>null))?.isFile()||!(await stat(releaseFile).catch(()=>null))?.isFile())throw Error('Practice path must contain version.mjs and release.json.');
 let changed=0;
 for(const file of await sourceFiles(root)){
  if(file===versionFile)continue;
  const before=await readFile(file,'utf8'),after=stampSource(before,tag);
  if(after!==before){await writeFile(file,after);changed++;}
 }
 const versionSource=await readFile(versionFile,'utf8'),versionPattern=/\bconst\s+version\s*=\s*(["'`])[^"'`]*\1\s*;/;
 if(!versionPattern.test(versionSource))throw Error('version.mjs must declare a string const version.');
 await writeFile(versionFile,stampSource(versionSource.replace(versionPattern,`const version=${JSON.stringify(tag)};`),tag));
 await writeFile(releaseFile,JSON.stringify({version:tag},null,2)+'\n');
 return {version:tag,changed};
}

if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
 const [, ,practiceDir,tag]=process.argv;
 try{const result=await releasePractice(practiceDir,tag);console.log(`Stamped ${result.changed} source files for ${result.version}.`);}
 catch(error){console.error(`release-practice: ${error.message}`);process.exitCode=1;}
}
