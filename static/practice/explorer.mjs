const MAX_INPUT_SIZE=30000;
const NAME=/^[A-Za-z_][A-Za-z0-9_]*$/;
const own=(value,key)=>Object.prototype.hasOwnProperty.call(value,key);

export function explorerMode(example){return example?.mode||'value';}

export function getInitialInput(example){
 const mode=explorerMode(example);
 if(mode==='python')return example.script;
 return JSON.stringify(mode==='arguments'?example.args:example.args[0],null,2);
}

export function makeProbe(example,input){
 if(typeof input!=='string')throw Error('Input must be text.');
 if(input.length>MAX_INPUT_SIZE)throw Error(`Input is too large (maximum ${MAX_INPUT_SIZE.toLocaleString()} characters).`);
 const mode=explorerMode(example);
 if(mode==='python'){
  if(!input.trim())throw Error('Enter a Python snippet to run.');
  return {script:input};
 }
 let parsed;
 try{parsed=JSON.parse(input);}catch(error){throw Error(`Invalid JSON: ${error.message}`);}
 if(mode==='arguments'&&!Array.isArray(parsed))throw Error('Arguments must be a JSON array containing the full argument list.');
 return {module:example.module,function:example.function,args:mode==='arguments'?parsed:[parsed]};
}

export function isInitialInput(example,input){
 if(explorerMode(example)==='python')return input===getInitialInput(example);
 try{return JSON.stringify(JSON.parse(input))===JSON.stringify(JSON.parse(getInitialInput(example)));}catch{return false;}
}

export function formatExplorerOutput(example,value){
 if(explorerMode(example)==='python')return String(value??'').trim()||'(no output)';
 const encoded=JSON.stringify(value,null,2);
 return encoded===undefined?String(value):encoded;
}

export function expectedForInput(example,input){
 return isInitialInput(example,input)?formatExplorerOutput(example,example.expected):'Custom input — predict the result';
}

export function explorerPresentation(example){
 const mode=explorerMode(example);
 if(mode==='python')return {label:'Try it (Python)',help:'Edit this short driver snippet. It can import and call your current code.',rows:8};
 if(mode==='arguments')return {label:'Arguments (JSON)',help:'Enter one JSON array containing every positional argument, in order.',rows:4};
 return {label:'Input (JSON)',help:'Enter any JSON value for the function’s single argument.',rows:4};
}

export function validateExplorerCatalog(exercises,examples){
 const issues=[],byId=new Map(exercises.map(exercise=>[exercise.id,exercise]));
 for(const exercise of exercises){
  const example=examples[exercise.id];
  if(!example){issues.push(`${exercise.id}: missing explorer metadata`);continue;}
  const mode=explorerMode(example);
  if(!['value','arguments','python'].includes(mode)){issues.push(`${exercise.id}: invalid mode ${JSON.stringify(example.mode)}`);continue;}
  if(typeof example.caption!=='string'||!example.caption.trim())issues.push(`${exercise.id}: caption must be a non-empty string`);
  if(!own(example,'expected'))issues.push(`${exercise.id}: expected is required`);
  if(mode==='python'){
   if(typeof example.script!=='string'||!example.script.trim())issues.push(`${exercise.id}: script must be a non-empty string`);
   else if(example.script.length>MAX_INPUT_SIZE)issues.push(`${exercise.id}: script exceeds ${MAX_INPUT_SIZE} characters`);
   if(typeof example.expected!=='string')issues.push(`${exercise.id}: Python expected output must be a string`);
   continue;
  }
  if(!NAME.test(example.module||''))issues.push(`${exercise.id}: invalid module`);
  if(!NAME.test(example.function||''))issues.push(`${exercise.id}: invalid function`);
  if(!Array.isArray(example.args))issues.push(`${exercise.id}: args must be an array`);
  else if(mode==='value'&&example.args.length!==1)issues.push(`${exercise.id}: value mode needs exactly one item in args`);
  const modulePath=`src/${example.module}.py`,source=exercise.files?.[modulePath];
  if(typeof source!=='string')issues.push(`${exercise.id}: module ${modulePath} is not an exercise file`);
  else if(NAME.test(example.function||'')&&!new RegExp(`(?:async\\s+)?def\\s+${example.function}\\s*\\(`).test(source))issues.push(`${exercise.id}: function ${example.function} is not defined in ${modulePath}`);
 }
 for(const id of Object.keys(examples))if(!byId.has(id))issues.push(`${id}: explorer metadata has no matching exercise`);
 if(issues.length)throw Error(`Invalid explorer catalog:\n${issues.join('\n')}`);
 return true;
}

export {MAX_INPUT_SIZE};
