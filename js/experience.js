(function(){
 'use strict';
 // Context stays in the message; analytics events contain only a known program slug.
 const program=location.pathname.split('/').pop()?.replace(/\.html$/,'');
 const hero=document.querySelector('body.program-palette .unified-hero');
 if(hero){
  document.querySelectorAll('a.site-wa,a[data-track="footer_whatsapp"]').forEach(link=>{
   const message='Hola DASC, solicito información de '+hero.querySelector('h1').textContent.trim()+'. Quiero confirmar modalidad, horarios, requisitos, costo total y próximo ingreso.';
   link.href='https://wa.me/5212223606438?text='+encodeURIComponent(message);
  });
 }
 document.querySelectorAll('.program-jump a,.decision-guide a').forEach(link=>link.addEventListener('click',()=>{
  window.dataLayer=window.dataLayer||[];
  window.dataLayer.push({event:'program_decision_step',program,step:link.getAttribute('href').split('?')[0],page_path:location.pathname});
 }));
 // A scrollable comparison is reachable by keyboard and remains understandable on mobile.
 const comparison=document.querySelector('[data-comparison]');
 if(comparison){comparison.setAttribute('aria-label','Comparación de programas');comparison.tabIndex=0;}
})();
