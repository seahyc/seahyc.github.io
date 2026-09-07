function comparableTitle(value){
  return value
    .replace(/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,'$1')
    .replace(/\s+/g,' ')
    .trim();
}

export function withoutDuplicateTitle(source,title){
  const match=String(source).match(/^\uFEFF?[ \t]{0,3}#[ \t]+([^\r\n]+)[ \t]*(?:\r?\n|$)/);
  if(!match||comparableTitle(match[1])!==comparableTitle(String(title)))return source;
  return String(source).slice(match[0].length).replace(/^(?:[ \t]*\r?\n)+/,'');
}
