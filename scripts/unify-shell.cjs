const fs=require('node:fs');
const path=require('node:path');
const {parseHTML}=require('linkedom');
const root=path.resolve(__dirname,'..');
const copy={
 'nosotros.html':['Conoce DASC','Una comunidad que conecta talento y tecnología.','Conoce nuestra historia, principios y forma de acompañar tu desarrollo académico.','Nuestra institución','admisiones.html','Conocer el campus'],
 'oferta-educativa.html':['Oferta educativa','Encuentra tu próxima etapa.','Explora licenciaturas, ingenierías, maestrías y cursos. Compara enfoques y elige tu siguiente paso.','Explora tus opciones','comparar-carreras.html','Comparar programas'],
 'modalidad-hyflex.html':['Modalidad HyFlex','Una formación conectada con tu vida.','Conoce los formatos de participación y sus condiciones para organizar tu experiencia de estudio.','Tu forma de estudiar','admisiones.html','Consultar mi modalidad'],
 'estudia-mientras-trabajas.html':['Estudia mientras trabajas','Conecta tus estudios con tu siguiente etapa.','Explora la modalidad y confirma horarios, prácticas y condiciones antes de elegir.','Tu forma de estudiar','admisiones.html','Consultar opciones'],
 'contacto.html':['Contacto','Conversemos sobre tu siguiente paso.','Encuentra los canales de atención, conoce la ubicación del campus y prepara tu consulta.','Estamos para orientarte','admisiones.html','Preparar mi consulta'],
 'educacion-continua.html':['Educación Continua','Nuevas habilidades. Más posibilidades.','Explora cursos de tecnología, productividad, diseño y negocios, o consulta capacitación para tu equipo.','Aprendizaje que continúa','capacitacion-empresas.html','Capacitar a mi equipo'],
 'admisiones.html':['Admisiones','Tu siguiente paso, con claridad.','Compara opciones, consulta condiciones y prepara una visita o sesión de orientación.','De explorar a decidir','comparar-carreras.html','Comparar programas'],
 'test-vocacional.html':['Orientación vocacional','Descubre posibilidades para tu futuro.','Explora tus intereses y encuentra carreras para investigar. El cuestionario es una orientación inicial, no un diagnóstico.','Explora tus intereses','oferta-educativa.html','Conocer la oferta'],
 'capacitacion-empresas.html':['Empresas','El siguiente reto de tu equipo.','Describe tus objetivos y prepara una consulta de capacitación para tu organización.','Aprendizaje en equipo','educacion-continua.html','Explorar cursos']
};
const heroSelector='.dasc-hero,.dasc-hyflex-hero,.dasc-contact-hero,.dasc-ec-hero,.dasc-reg-hero,.site-page-hero';
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let count=0;
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 const full=path.join(root,file);const source=fs.readFileSync(full,'utf8');
 const {document}=parseHTML(source);const main=document.querySelector('main');if(!main)continue;
 document.body.classList.add('dasc-shell');
 if(file!=='index.html'&&!main.querySelector('.unified-hero')){
  const oldHero=main.querySelector(heroSelector);const h1=main.querySelector('h1');if(!h1)continue;
  const title=h1.textContent.replace(/\s+/g,' ').trim();
  const paragraph=oldHero?.querySelector('p')||h1.nextElementSibling;
  const intro=paragraph?.tagName==='P'?paragraph.textContent.replace(/\s+/g,' ').trim():'';
  const fallback=file.startsWith('curso-')?['Educación Continua',title,intro,'Desarrolla una habilidad','educacion-continua.html','Explorar cursos']:['Explora DASC',title,intro,'Tu siguiente paso','oferta-educativa.html','Explorar programas'];
  const c=copy[file]||fallback;
  const hero=document.createElement('section');hero.className='unified-hero shell-page-hero';hero.setAttribute('aria-labelledby','shell-title');
  hero.innerHTML=`<div class="site-container"><nav class="unified-breadcrumb" aria-label="Ruta de navegación"><a href="index.html">DASC</a><span>/ ${escape(c[0])}</span></nav><div class="unified-hero-grid"><div><span class="tech-eyebrow">${escape(c[0])} / Puebla</span><h1 id="shell-title">${escape(c[1])}</h1><p>${escape(c[2])}</p><div class="unified-actions"><a href="${c[4]}">${escape(c[5])} ↗</a><a href="contacto.html">Hablar con DASC</a></div></div><aside class="shell-route-panel"><div class="shell-panel-bar"><span>DASC / CONECTA TU FUTURO</span><span>2027</span></div><h2>${escape(c[3])}</h2><div class="shell-steps"><span>01 / EXPLORA</span><span>02 / CONOCE</span><span>03 / AVANZA</span></div><p>Formación · Tecnología · Comunidad</p><a href="admisiones.html">Encuentra tu siguiente paso →</a></aside></div></div>`;
  if(oldHero){oldHero.remove();}else{h1.remove();if(paragraph?.tagName==='P'&&paragraph.parentNode)paragraph.remove();}
  main.prepend(hero);count++;
 }
 // Una sola portada, misma anchura y accesos. Se preservan formularios, planes y contenido.
 const unified=main.querySelector('.unified-hero');if(unified&&main.firstElementChild!==unified)main.prepend(unified);
 if(!document.querySelector('link[href^="css/coherent-shell.css"]')){const link=document.createElement('link');link.rel='stylesheet';link.href='css/coherent-shell.css?v=20261112';document.head.append(link);}
 for(const preload of document.querySelectorAll('link[rel="preload"][as="image"]')){if(file!=='index.html')preload.remove();}
 // Estado activo institucional, igual en todas las páginas.
 const nav=document.querySelector('.site-header');if(nav){nav.querySelectorAll('[aria-current]').forEach(a=>a.removeAttribute('aria-current'));nav.querySelectorAll('a.active').forEach(a=>a.classList.remove('active'));const active=[...nav.querySelectorAll('a')].find(a=>a.getAttribute('href')===file);if(active)active.setAttribute('aria-current','page');}
 fs.writeFileSync(full,document.toString());
}
console.log(`${count} portadas migradas a la estructura compartida.`);
