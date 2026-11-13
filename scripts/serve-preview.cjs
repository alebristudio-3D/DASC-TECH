const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const port=Number(process.env.PORT||8765);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.ico':'image/x-icon'};
http.createServer((req,res)=>{
 let file;
 try{file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname));}catch{res.writeHead(400).end();return;}
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(file.split(path.sep).some(p=>p.startsWith('.'))||file.includes(path.sep+'node_modules'+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(file,(error,body)=>{
  if(error){res.writeHead(404).end('Página no encontrada');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
 });
}).listen(port,'127.0.0.1',()=>console.log('Vista previa local: http://127.0.0.1:'+port));
