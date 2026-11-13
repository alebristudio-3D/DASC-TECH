const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const {parseHTML}=require(path.join(root,'node_modules/linkedom'));
const files=fs.readdirSync(root).filter(f=>f.endsWith('.html'));
const issues=[],anchors=[];
for(const file of files){const {document}=parseHTML(fs.readFileSync(path.join(root,file),'utf8'));
 if(!document.querySelector('#contenido'))issues.push(file+': missing skip target');
 if(document.querySelectorAll('h1').length!==1)issues.push(file+': h1 count '+document.querySelectorAll('h1').length);
 if(document.querySelector('[data-demo-academics],[data-demo-projects]'))issues.push(file+': demo facts');
 for(const el of document.querySelectorAll('a[href],script[src],link[href],img[src]')){
  const raw=el.getAttribute('href')||el.getAttribute('src');if(!raw||/^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw))continue;
  const url=new URL(raw,'http://local/'+file);const local=path.join(root,decodeURIComponent(url.pathname));
  if(!fs.existsSync(local)){issues.push(file+': missing '+raw);continue;}
  if(url.hash&&url.pathname.endsWith('.html')){const doc=parseHTML(fs.readFileSync(local,'utf8')).document;if(!doc.getElementById(decodeURIComponent(url.hash.slice(1))))anchors.push(file+': '+raw);}
 }
 for(const s of document.querySelectorAll('script:not([src])'))if(!s.type||s.type==='text/javascript'){try{new vm.Script(s.textContent);}catch(e){issues.push(file+': '+e.message);}}
}
for(const f of fs.readdirSync(path.join(root,'js')).filter(f=>/\.(js|cjs)$/.test(f))){try{new vm.Script(fs.readFileSync(path.join(root,'js',f),'utf8'));}catch(e){issues.push(f+': '+e.message);}}
console.log(JSON.stringify({pages:files.length,issues,anchors},null,2));if(issues.length||anchors.length)process.exitCode=1;
