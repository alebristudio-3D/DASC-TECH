(function () {
  'use strict';
  const root = document.querySelector('[data-route-lab]');
  if (!root) return;
  const host = root.querySelector('[data-route-app]');
  if (!host) return;
  const programs = {
    software: ['Ingeniería en Software','ingenieria-en-software','#c12f28','SE-SES/21/114/01/2886/2023/SIE','Desarrollo de aplicaciones, pruebas y calidad de software.'],
    systems: ['Sistemas Computacionales','sistemas-computacionales','#0099d6','20242490','Programación, redes e infraestructura tecnológica.'],
    admin: ['Administración y Sistemas','administracion-y-sistemas','#d0ab15','SE-SES/21/114/01/2888/2023/SIE','Administración de organizaciones y herramientas de sistemas.'],
    marketing: ['Mercadotecnia Digital','mercadotecnia-digital','#49b69f','20242491','Estrategia de marca, comunicación y mercadotecnia digital.'],
    design: ['Diseño Interactivo','diseno-interactivo','#bf1bcc','SE-SES/21/114/01/2881/2023/SIE','Diseño de interfaces, animación y experiencias digitales.'],
    industrial: ['Ingeniería Industrial','ingenieria-industrial','#969596','SE-SES/21/114/01/2887/2023/SIE','Procesos productivos, calidad, logística y mejora continua.'],
    masterAdmin: ['Maestría en Administración','maestria-en-administracion','#a17d36','SEP-SES/21/114/01/2238/2018','Dirección y gestión de organizaciones.'],
    masterQuality: ['Maestría en Calidad y Productividad','maestria-en-calidad-y-productividad','#028d39','20242492','Gestión de la calidad y mejora de la productividad.'],
    masterIT: ['Maestría en Innovación y Gestión de Proyectos de TI','maestria-en-innovacion-y-gestion-de-proyectos-de-ti','#425e9d','20242489','Innovación y gestión de proyectos tecnológicos.'],
    continuing: ['Educación Continua','educacion-continua','#003399','','Consulta los cursos vigentes, requisitos y disponibilidad con DASC.']
  };
  const interests = [['tech','Tecnología y sistemas'],['business','Negocios y comunicación'],['creative','Diseño y experiencias'],['operations','Procesos y calidad']];
  const goals = {
    first: {
      tech: [['build','Crear aplicaciones','software','systems'],['operate','Conectar y administrar sistemas','systems','software']],
      business: [['manage','Organizar y dirigir negocios','admin','marketing'],['communicate','Desarrollar marcas y campañas','marketing','admin']],
      creative: [['design','Crear interfaces, animación o experiencias','design','marketing'],['communicate','Comunicar y posicionar una marca','marketing','design']],
      operations: [['production','Mejorar producción y calidad','industrial'],['logistics','Optimizar logística y recursos','industrial']]
    },
    graduate: {
      tech: [['projects','Gestionar proyectos tecnológicos','masterIT'],['direction','Dirigir una organización','masterAdmin','masterIT']],
      business: [['direction','Profundizar en dirección de negocios','masterAdmin'],['quality','Mejorar calidad y productividad','masterQuality','masterAdmin']],
      creative: [['projects','Gestionar proyectos digitales','masterIT'],['practice','Actualizar habilidades de diseño','continuing']],
      operations: [['quality','Profundizar en calidad y productividad','masterQuality'],['direction','Dirigir equipos y organizaciones','masterAdmin','masterQuality']]
    },
    update: {
      tech: [['skills','Actualizar habilidades tecnológicas','continuing']],
      business: [['skills','Actualizar herramientas de negocio','continuing']],
      creative: [['skills','Actualizar habilidades creativas','continuing']],
      operations: [['skills','Actualizar herramientas de procesos','continuing']]
    }
  };
  let step = 0;
  const answers = { level: '', interest: '', goal: '' };
  const levels = [['first','Busco mi primera licenciatura o ingeniería'],['graduate','Ya tengo licenciatura y busco un posgrado'],['update','Busco cursos o actualización profesional']];
  function track(event, detail) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event, ...detail, page_path:location.pathname});
  }
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function render() {
    host.replaceChildren();
    const progress = element('ol', '', 'route-steps');
    progress.setAttribute('aria-label','Pasos de orientación');
    ['Formación','Intereses','Objetivo','Programas'].forEach((label, i) => {
      const item = element('li',`${i+1}. ${label}`);
      if (i===step) item.setAttribute('aria-current','step');
      if (i<step) item.className='is-complete';
      progress.append(item);
    });
    host.append(progress);
    const heading = element('h3', ['¿Qué formación buscas?','¿Qué área te interesa?','¿Qué te gustaría hacer?','Programas para explorar'][step]);
    heading.tabIndex=-1;
    host.append(heading);
    if (step<3) {
      const group = element('div','','route-choices');
      group.setAttribute('role','group'); group.setAttribute('aria-label',heading.textContent);
      const options = step===0 ? levels : step===1 ? interests : goals[answers.level][answers.interest];
      options.forEach(([value,label]) => {
        const button=element('button',label);
        button.type='button';button.dataset.routeAnswer=value;
        button.addEventListener('click', () => {
          const key=['level','interest','goal'][step];
          answers[key]=value;
          if(step===0){answers.interest='';answers.goal='';}
          if(step===1)answers.goal='';
          track('route_answer',{question:key,answer:value});
          step++; render();
        });
        group.append(button);
      });
      host.append(group);
    } else {
      const selectedGoal=goals[answers.level][answers.interest].find(item=>item[0]===answers.goal);
      const explanation=element('p',`${levels.find(x=>x[0]===answers.level)[1]}. Tu interés: ${interests.find(x=>x[0]===answers.interest)[1].toLowerCase()}. Tu objetivo: ${selectedGoal[1].toLowerCase()}.`,'route-summary');
      host.append(explanation);
      selectedGoal.slice(2).forEach((id,index)=>{
        const [name,slug,color,rvoe,why]=programs[id];
        const card=element('article','','route-program');card.style.setProperty('--route-accent',color);
        card.append(element('small',index===0?'Primera opción para revisar':'Otra opción relacionada'),element('h4',name),element('p',why));
        if(rvoe)card.append(element('p','RVOE publicado: '+rvoe,'route-rvoe'));
        const link=element('a',id==='continuing'?'Consultar Educación Continua':'Conocer programa y plan de estudios');link.href=slug+'.html';
        link.addEventListener('click',()=>track('route_program_open',{program:slug,level:answers.level,interest:answers.interest,goal:answers.goal}));card.append(link);host.append(card);
      });
      const note=element('p','Esta orientación inicial no es un diagnóstico vocacional ni confirma admisión, costos, horarios o modalidad. Revisa el plan y los requisitos del programa.','route-note');host.append(note);
      const links=element('div','','route-followup');
      const test=element('a','Profundizar con el test vocacional');test.href='test-vocacional.html';links.append(test);
      if(answers.interest==='tech'&&answers.level==='first'){const compare=element('a','Comparar Sistemas y Software');compare.href='comparar-sistemas-software.html';links.append(compare);}
      const contact=element('a','Consultar requisitos con admisiones');
      contact.href='https://wa.me/5212223606438?text='+encodeURIComponent('Hola DASC. En Ruta DASC elegí '+selectedGoal[1]+'. Quiero conocer requisitos, costos, horarios y modalidad de '+programs[selectedGoal[2]][0]+'. Origen: Ruta DASC.');contact.target='_blank';contact.rel='noopener noreferrer';links.append(contact);host.append(links);
      track('route_result',{programs:selectedGoal.slice(2).join(','),...answers});
    }
    const navigation=element('div','','route-navigation');
    if(step>0){const back=element('button','Volver');back.type='button';back.addEventListener('click',()=>{step--;render();});navigation.append(back);}
    if(step>0){const reset=element('button','Empezar de nuevo');reset.type='button';reset.addEventListener('click',()=>{step=0;answers.level=answers.interest=answers.goal='';render();});navigation.append(reset);}
    host.append(navigation);
    if(step>0||host.dataset.started==='true')heading.focus({preventScroll:true});
    host.dataset.started='true';
  }
  render();
})();
