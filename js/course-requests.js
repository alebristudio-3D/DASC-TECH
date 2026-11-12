(function(){
 'use strict';
 document.querySelectorAll('[data-course-request], [data-company-request]').forEach(form=>{
  form.addEventListener('submit',event=>{
   event.preventDefault();if(!form.reportValidity())return;
   const d=Object.fromEntries(new FormData(form));
   const company=form.hasAttribute('data-company-request');
   const course=document.querySelector('h1').textContent;
   const lines=company?['Empresa: '+d.company,'Contacto: '+d.name,d.email?'Correo: '+d.email:'','Objetivo: '+d.goal,'Participantes estimados: '+d.participants,'Periodo deseado: '+(d.period||'Por definir'),'Formato preferido: '+d.format]:['Curso: '+course,'Nombre: '+d.name,'Solicitud: '+d.intent,d.message?'Preferencias: '+d.message:''];
   const message=['EJEMPLO DE PRUEBA · DASC Educación Continua',...lines,'Disponibilidad y condiciones sujetas a confirmación.','Origen: '+location.pathname].filter(Boolean).join('\n');
   const url='https://wa.me/'+form.dataset.phone+'?text='+encodeURIComponent(message);
   window.open(url,'_blank','noopener,noreferrer');
   const status=form.querySelector('[role=status]');status.replaceChildren(document.createTextNode('Mensaje preparado. Debes enviarlo desde WhatsApp. No se guardó un registro ni se confirmó disponibilidad. '));
   const retry=document.createElement('a');retry.href=url;retry.target='_blank';retry.rel='noopener noreferrer';retry.textContent='Abrir WhatsApp';status.append(retry);
   window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:company?'company_demo_message_prepared':'course_demo_message_prepared',course:form.dataset.course||'',page_path:location.pathname});
  });
 });
})();
