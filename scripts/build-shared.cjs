const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const programs=JSON.parse(fs.readFileSync(path.join(root,'assets/data/programas.json'),'utf8'));
const header=fs.readFileSync(path.join(root,'partials/header.html'),'utf8');
const footer=fs.readFileSync(path.join(root,'partials/footer.html'),'utf8');
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 let html=fs.readFileSync(path.join(root,file),'utf8');
 const newline=html.includes('\r\n')?'\r\n':'\n';
 html=html.replace(/<header class="site-header">[\s\S]*?<\/header>/,header.replaceAll('class="active"','class=""').replace(`href="${file}"`,`aria-current="page" href="${file}"`));
 html=html.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/,footer);
 if(!html.includes('js/admissions-tools.js'))html=html.replace('</body>','<script src="js/measurement.js" defer></script><script src="js/admissions-tools.js" defer></script></body>');
 if(!html.includes('css/admissions-tools.css'))html=html.replace('</head>','<link rel="stylesheet" href="css/admissions-tools.css"></head>');
 const p=programs.find(p=>p.slug+'.html'===file);
 if(p&&!html.includes('data-program-actions'))html=html.replace('</main>',`<section class="site-container admission-tools" data-program-actions><h2>Prepara tu siguiente paso</h2><p>Consulta el proceso, solicita costos o prepara una visita. Las fechas y condiciones se confirman con admisiones.</p><div class="admission-actions"><a class="site-btn" href="admisiones.html?program=${p.slug}">Admisiones y visita</a><a class="site-btn" href="ficha-carrera.html?program=${p.slug}">Ficha para compartir con tu familia</a><a class="site-btn" href="comparar-carreras.html?programs=${p.slug}">Comparar carreras</a></div></section></main>`);
 fs.writeFileSync(path.join(root,file),html.replace(/\r\n/g,'\n').split('\n').map(line=>line.trimEnd()).join(newline)); 
}
console.log('Cabecera, pie y accesos actualizados.');

const engine=fs.readFileSync(path.join(root,'js/vocacional-engine.cjs'),'utf8').replace("const data=require('../assets/data/vocacional-abierto.json');",'window.DASCEvaluate = function(data, answers) {').replace('function evaluate(answers){','').replace('module.exports={evaluate,data};',';');
fs.writeFileSync(path.join(root,'js/vocacional-demo-engine.js'),engine);
