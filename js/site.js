(function(){
  const menu = document.querySelector('.site-menu');
  const toggle = document.querySelector('.site-menu-toggle');
  const dropdownItems = Array.from(document.querySelectorAll('.site-has-dropdown'));
  const desktopQuery = window.matchMedia('(min-width: 1061px)');
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const prefersReducedMotion = reducedMotionQuery.matches;

  document.documentElement.classList.add('site-js');
  document.body.classList.add('is-enhanced');
  window.dataLayer = window.dataLayer || [];

  function gtag(){ window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function closeSubmenus(except){
    dropdownItems.forEach((item) => {
      if(item === except) return;
      item.classList.remove('is-open');
      const btn = item.querySelector('button');
      if(btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMenu(){
    if(menu) menu.classList.remove('is-open');
    document.body.classList.remove('menu-lock');
    if(toggle) toggle.setAttribute('aria-expanded', 'false');
    closeSubmenus();
  }

  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-lock', open);
      if(!open) closeSubmenus();
    });
  }

  dropdownItems.forEach((item) => {
    const btn = item.querySelector('button');
    if(!btn) return;
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const willOpen = !item.classList.contains('is-open');
      closeSubmenus(item);
      item.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });
  });

  document.addEventListener('click', (event) => {
    const header = document.querySelector('.site-header');
    if(header && header.contains(event.target)) return;
    closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') closeMenu();
  });

  if(desktopQuery.addEventListener){
    desktopQuery.addEventListener('change', () => closeMenu());
  }

  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-menu a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if(href === current) link.classList.add('active');
  });

  function track(eventName, payload){
    window.dataLayer.push({ event: eventName, ...payload });
    if(typeof window.gtag === 'function'){
      window.gtag('event', eventName, {
        event_category: payload.event_category || 'site',
        event_label: payload.click_label || payload.form_name || payload.program || payload.page_path
      });
    }
  }

  function setupMissionStrip(){
    const homeHero = document.querySelector('.dasc-home .dasc-hero');
    if(!homeHero || document.querySelector('.site-mission-strip')) return;
    const strip = document.createElement('section');
    strip.className = 'site-mission-strip';
    strip.setAttribute('aria-label', 'Misiones para explorar DASC');
    strip.innerHTML = [
      '<div class="site-container site-mission-strip__inner">',
      '<div class="site-mission-head"><span>Modo aventura academica</span><h2>Desbloquea tu ruta tecnologica.</h2><p>Explora programas, compara modalidades y agenda informes como una ruta de decision clara.</p></div>',
      '<div class="site-mission-grid">',
      '<a class="site-mission-card" href="oferta-educativa.html" data-track="mission_offer"><strong>01</strong><span>Explora carreras</span><i></i></a>',
      '<a class="site-mission-card" href="modalidad-hyflex.html" data-track="mission_hyflex"><strong>02</strong><span>Activa HyFlex</span><i></i></a>',
      '<a class="site-mission-card" href="https://wa.me/5212223606438?text=Hola%20DASC%2C%20quiero%20recibir%20orientaci%C3%B3n%20para%20elegir%20mi%20programa." data-track="mission_whatsapp" target="_blank" rel="noopener noreferrer"><strong>03</strong><span>Agenda asesoria</span><i></i></a>',
      '</div>',
      '</div>'
    ].join('');
    homeHero.insertAdjacentElement('afterend', strip);
  }

  function setTagList(container, tags){
    if(!container) return;
    container.replaceChildren();
    tags.forEach((tag) => {
      const item = document.createElement('b');
      item.textContent = tag;
      container.appendChild(item);
    });
  }

  function softSwap(element){
    if(!element || prefersReducedMotion) return;
    element.classList.remove('is-changing');
    void element.offsetWidth;
    element.classList.add('is-changing');
    window.setTimeout(() => element.classList.remove('is-changing'), 360);
  }

  function setupRouteLab(){
    const root = document.querySelector('[data-route-lab]');
    if(!root) return;

    const routes = {
      tech: {
        label: 'Perfil: crear tecnologia',
        title: 'Sistemas Computacionales e Ingenieria en Software',
        copy: 'Si te interesa programar, automatizar y crear soluciones digitales, esta ruta conecta bases tecnicas, pensamiento logico y proyectos aplicados.',
        tags: ['Programacion', 'Datos', 'Proyectos TI'],
        href: 'oferta-educativa.html#programas-dasc',
        activeSteps: 3
      },
      business: {
        label: 'Perfil: dirigir negocios',
        title: 'Administracion y Sistemas, Mercadotecnia Digital o Maestrias',
        copy: 'Para quien quiere liderar, vender, analizar informacion y tomar decisiones, esta ruta mezcla gestion, estrategia digital y herramientas tecnologicas.',
        tags: ['Negocios', 'Analitica', 'Liderazgo'],
        href: 'oferta-educativa.html#programas-dasc',
        activeSteps: 3
      },
      creative: {
        label: 'Perfil: disenar experiencias',
        title: 'Diseno Interactivo y Mercadotecnia Digital',
        copy: 'Si te atrae crear interfaces, contenidos, marcas y experiencias digitales, esta ruta combina creatividad, tecnologia y comunicacion visual.',
        tags: ['UX/UI', 'Contenido', 'Experiencia digital'],
        href: 'diseno-interactivo.html',
        activeSteps: 2
      },
      operations: {
        label: 'Perfil: optimizar procesos',
        title: 'Ingenieria Industrial y Maestria en Calidad y Productividad',
        copy: 'Para resolver problemas de productividad, mejora continua y operacion, esta ruta se enfoca en procesos, sistemas y resultados medibles.',
        tags: ['Procesos', 'Calidad', 'Productividad'],
        href: 'ingenieria-industrial.html',
        activeSteps: 2
      }
    };

    const buttons = Array.from(root.querySelectorAll('[data-route-profile]'));
    const label = root.querySelector('[data-route-label]');
    const title = root.querySelector('[data-route-title]');
    const copy = root.querySelector('[data-route-copy]');
    const tags = root.querySelector('[data-route-tags]');
    const link = root.querySelector('[data-route-link]');
    const result = root.querySelector('.site-route-result');
    const progress = Array.from(root.querySelectorAll('.site-route-progress span'));

    function render(key){
      const route = routes[key] || routes.tech;
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.routeProfile === key));
      progress.forEach((step, index) => step.classList.toggle('is-active', index < route.activeSteps));
      if(label) label.textContent = route.label;
      if(title) title.textContent = route.title;
      if(copy) copy.textContent = route.copy;
      if(link) link.href = route.href;
      setTagList(tags, route.tags);
      softSwap(result);
      track('route_profile_select', { program: key, page_path: location.pathname, event_category: 'journey' });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.routeProfile));
    });
  }

  document.addEventListener('click', (event) => {
    const a = event.target.closest('a');
    if(!a) return;
    const href = a.href || a.getAttribute('href') || '';
    const label = a.dataset.track || a.dataset.origin || a.dataset.waOrigin || a.textContent.trim().slice(0, 90);
    const payload = { click_label: label, click_url: href, page_path: location.pathname };
    if(href.includes('wa.me') || href.includes('api.whatsapp')){
      track('click_whatsapp', { ...payload, event_category: 'lead' });
    } else if(href.toLowerCase().includes('.pdf')){
      track('download_document', { ...payload, event_category: 'document' });
    } else {
      track('click_link', payload);
    }
    if(window.innerWidth <= 1060 && a.closest('.site-menu')) closeMenu();
  });

  document.addEventListener('submit', (event) => {
    const form = event.target.closest('form');
    if(!form) return;
    const name = form.getAttribute('name') || form.id || 'lead_form';
    track('submit_lead_form', { form_name: name, page_path: location.pathname, event_category: 'lead' });
  });

  function setupHeaderState(){
    const update = () => document.body.classList.toggle('site-scrolled', window.scrollY > 12);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function setupScrollReveal(){
    const targets = Array.from(document.querySelectorAll([
      'main section',
      '.site-card',
      '.dasc-card',
      '.dasc-program-card',
      '.dasc-hyflex-card',
      '.dasc-hyflex-benefit',
      '.dasc-hero-card',
      '.dasc-di-work article',
      '.dasc-work-grid article',
      '.dasc-career-card',
      '.dasc-session-card',
      '.site-route-lab',
      '.site-offer-advisor',
      '.site-hyflex-planner'
    ].join(','))).filter((el) => !el.closest('.site-menu'));

    targets.forEach((el, index) => {
      el.classList.add('site-reveal');
      el.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
    });

    if(prefersReducedMotion || !('IntersectionObserver' in window)){
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  function setupTabs(){
    document.querySelectorAll('[data-tabs]').forEach((tabs) => {
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"], .dasc-tab'));
      const panels = Array.from(tabs.querySelectorAll('[role="tabpanel"], .dasc-panel'));
      if(!buttons.length || !panels.length) return;

      function activate(button){
        const id = button.dataset.tab || button.getAttribute('aria-controls');
        buttons.forEach((btn) => {
          const active = btn === button;
          btn.classList.toggle('is-active', active);
          btn.setAttribute('aria-selected', String(active));
          btn.tabIndex = active ? 0 : -1;
        });
        panels.forEach((panel) => {
          const active = panel.id === id;
          panel.classList.toggle('is-active', active);
          panel.hidden = !active;
        });
      }

      buttons.forEach((button) => {
        button.addEventListener('click', () => activate(button));
        button.addEventListener('keydown', (event) => {
          if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
          event.preventDefault();
          const currentIndex = buttons.indexOf(button);
          let nextIndex = currentIndex;
          if(event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % buttons.length;
          if(event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
          if(event.key === 'Home') nextIndex = 0;
          if(event.key === 'End') nextIndex = buttons.length - 1;
          buttons[nextIndex].focus();
          activate(buttons[nextIndex]);
        });
      });

      const activeButton = buttons.find((btn) => btn.classList.contains('is-active') || btn.getAttribute('aria-selected') === 'true') || buttons[0];
      activate(activeButton);
    });
  }

  function setupCounters(){
    const candidates = Array.from(document.querySelectorAll([
      '.dasc-stat strong',
      '.dasc-hero-mini strong',
      '.dasc-trust-item strong',
      '.dasc-hyflex-trust-item strong',
      '.site-counter'
    ].join(',')));

    const counters = candidates.map((el) => {
      const raw = el.textContent.trim();
      const match = raw.match(/(\d+)/);
      if(!match) return null;
      const target = Number(match[1]);
      if(!Number.isFinite(target) || target <= 1) return null;
      return { el, raw, target };
    }).filter(Boolean);

    function run(counter){
      if(prefersReducedMotion){
        counter.el.textContent = counter.raw;
        return;
      }
      const duration = 900;
      const start = performance.now();
      const prefix = counter.raw.slice(0, counter.raw.indexOf(String(counter.target)));
      const suffix = counter.raw.slice(counter.raw.indexOf(String(counter.target)) + String(counter.target).length);
      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.el.textContent = `${prefix}${Math.round(counter.target * eased)}${suffix}`;
        if(progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if(!counters.length) return;
    if(!('IntersectionObserver' in window)){
      counters.forEach(run);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(!entry.isIntersecting) return;
        const counter = counters.find((item) => item.el === entry.target);
        if(counter) run(counter);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.45 });
    counters.forEach((counter) => observer.observe(counter.el));
  }

  function setupTechCanvas(){
    if(prefersReducedMotion) return;
    const heroes = Array.from(document.querySelectorAll('.dasc-home .dasc-hero, .dasc-oferta-page .dasc-hero, .dasc-hero, .dasc-di-hero, .dasc-hyflex-hero, .site-page-hero'))
      .filter((hero, index, list) => hero && list.indexOf(hero) === index && !hero.querySelector('.site-tech-canvas'));

    heroes.slice(0, 2).forEach((hero) => {
      const canvas = document.createElement('canvas');
      canvas.className = 'site-tech-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      hero.insertBefore(canvas, hero.firstChild);
      animateNetwork(canvas, hero);
    });
  }

  function animateNetwork(canvas, host){
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;
    let particles = [];
    let raf = 0;

    function resize(){
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.8);
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(260, Math.floor(rect.height));
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(window.innerWidth < 720 ? 34 : 58, Math.floor(width / 22));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.7 + 0.8
      }));
    }

    function draw(){
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255,255,255,.72)';
      ctx.strokeStyle = 'rgba(118,232,255,.26)';
      ctx.lineWidth = 1;

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if(p.x < -20) p.x = width + 20;
        if(p.x > width + 20) p.x = -20;
        if(p.y < -20) p.y = height + 20;
        if(p.y > height + 20) p.y = -20;
      });

      for(let i = 0; i < particles.length; i += 1){
        for(let j = i + 1; j < particles.length; j += 1){
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if(distance > 118) continue;
          ctx.globalAlpha = 1 - distance / 118;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if(document.hidden) cancelAnimationFrame(raf);
      else draw();
    });
  }

  function setupOfferProfiles(){
    const grid = document.querySelector('.dasc-program-grid');
    const cards = Array.from(document.querySelectorAll('.dasc-program-card'));
    if(!grid || !cards.length || document.querySelector('.site-profile-filter')) return;

    const profileMap = [
      { key: 'all', label: 'Todo' },
      { key: 'tech', label: 'Tecnologia' },
      { key: 'business', label: 'Negocios' },
      { key: 'creative', label: 'Creatividad' },
      { key: 'operations', label: 'Operacion' }
    ];

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      const profiles = [];
      if(/software|sistemas|computacionales|ti|datos|nube|programacion/.test(text)) profiles.push('tech');
      if(/administracion|mercadotecnia|negocio|finanzas|gestion|empresa/.test(text)) profiles.push('business');
      if(/diseno|creativ|interactivo|marca|campana|contenido/.test(text)) profiles.push('creative');
      if(/industrial|calidad|productividad|procesos|operacion/.test(text)) profiles.push('operations');
      card.dataset.profile = profiles.length ? profiles.join(' ') : 'business';
    });

    const controls = document.createElement('div');
    controls.className = 'site-profile-filter';
    controls.setAttribute('aria-label', 'Filtro por perfil de aspirante');
    controls.innerHTML = '<span>Perfil de interés</span>' + profileMap.map((profile, index) => (
      `<button type="button" class="${index === 0 ? 'is-active' : ''}" data-profile="${profile.key}">${profile.label}</button>`
    )).join('');

    const filterBar = document.querySelector('.dasc-filter-bar') || document.querySelector('.dasc-filter-buttons');
    (filterBar || grid).insertAdjacentElement(filterBar ? 'afterend' : 'beforebegin', controls);

    controls.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-profile]');
      if(!button) return;
      controls.querySelectorAll('button').forEach((btn) => btn.classList.toggle('is-active', btn === button));
      const profile = button.dataset.profile;
      cards.forEach((card) => {
        const show = profile === 'all' || (card.dataset.profile || '').split(' ').includes(profile);
        card.classList.toggle('site-profile-hidden', !show);
      });
      track('program_interest_filter', { program: profile, page_path: location.pathname, event_category: 'offer' });
    });
  }

  function setupOfferAdvisor(){
    const root = document.querySelector('[data-offer-advisor]');
    if(!root) return;

    const goals = {
      start: {
        kicker: 'Ruta sugerida',
        title: 'Licenciaturas con base tecnologica',
        copy: 'Si estas por iniciar tu formacion profesional, compara Administracion y Sistemas, Mercadotecnia Digital, Diseno Interactivo y Sistemas Computacionales.',
        tags: ['Base profesional', '3 anos', 'HyFlex'],
        href: '#programas-dasc',
        keywords: ['administracion', 'mercadotecnia', 'diseno', 'sistemas']
      },
      work: {
        kicker: 'Ruta para crecer',
        title: 'Maestrias y Educacion Continua',
        copy: 'Si ya trabajas y quieres mejorar tu perfil, revisa maestrias, cursos y programas con flexibilidad para combinar estudio y responsabilidades.',
        tags: ['Especializacion', 'Trabajo', 'Flexibilidad'],
        href: '#programas-dasc',
        keywords: ['maestria', 'educacion continua']
      },
      create: {
        kicker: 'Ruta creativa digital',
        title: 'Diseno Interactivo, Software y Sistemas',
        copy: 'Para crear productos digitales conviene mirar diseno de experiencias, programacion, interfaces y proyectos tecnologicos aplicados.',
        tags: ['Producto digital', 'UX/UI', 'Software'],
        href: '#programas-dasc',
        keywords: ['diseno', 'software', 'sistemas']
      },
      lead: {
        kicker: 'Ruta de liderazgo',
        title: 'Administracion, Mercadotecnia y Maestria en Administracion',
        copy: 'Si tu meta es dirigir equipos o negocios, enfocate en gestion, estrategia, comunicacion, datos y toma de decisiones.',
        tags: ['Direccion', 'Estrategia', 'Gestion'],
        href: '#programas-dasc',
        keywords: ['administracion', 'mercadotecnia']
      },
      process: {
        kicker: 'Ruta de mejora',
        title: 'Ingenieria Industrial y Calidad y Productividad',
        copy: 'Para mejorar procesos, costos, calidad y operacion, esta ruta conecta ingenieria, sistemas productivos y mejora continua.',
        tags: ['Procesos', 'Calidad', 'Operacion'],
        href: '#programas-dasc',
        keywords: ['industrial', 'calidad', 'productividad']
      }
    };

    const buttons = Array.from(root.querySelectorAll('[data-advisor-goal]'));
    const kicker = root.querySelector('[data-advisor-kicker]');
    const title = root.querySelector('[data-advisor-title]');
    const copy = root.querySelector('[data-advisor-copy]');
    const tags = root.querySelector('[data-advisor-tags]');
    const link = root.querySelector('[data-advisor-link]');
    const result = root.querySelector('.site-offer-advisor__result');
    const cards = Array.from(document.querySelectorAll('.dasc-program-card'));

    function render(goalKey, shouldTrack = true){
      const goal = goals[goalKey] || goals.start;
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.advisorGoal === goalKey));
      if(kicker) kicker.textContent = goal.kicker;
      if(title) title.textContent = goal.title;
      if(copy) copy.textContent = goal.copy;
      if(link) link.href = goal.href;
      setTagList(tags, goal.tags);
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const match = goal.keywords.some((keyword) => text.includes(keyword));
        card.classList.toggle('site-advisor-match', match);
      });
      softSwap(result);
      if(shouldTrack) track('offer_advisor_select', { program: goalKey, page_path: location.pathname, event_category: 'offer' });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.advisorGoal));
    });
    render('start', false);
  }

  function setupHyflexPlanner(){
    const root = document.querySelector('[data-hyflex-planner]');
    if(!root) return;

    const scenarios = {
      work: {
        kicker: 'Ruta recomendada',
        title: 'Combina clase en vivo con repaso asincrono.',
        copy: 'Ideal para quien trabaja: conserva contacto con docentes y usa grabaciones para reforzar temas cuando el horario laboral se cruza con la clase.',
        week: ['Online en vivo', 'Plataforma', 'Campus', 'Replay', 'Asesoria']
      },
      distance: {
        kicker: 'Ruta a distancia',
        title: 'Prioriza sesiones en linea y visitas clave al campus.',
        copy: 'Si vives lejos, puedes reducir traslados, conectarte a clases en vivo y usar campus para momentos importantes de seguimiento o practica.',
        week: ['Online en vivo', 'Replay', 'Plataforma', 'Online en vivo', 'Campus opcional']
      },
      variable: {
        kicker: 'Ruta flexible',
        title: 'Alterna formatos segun la carga de tu semana.',
        copy: 'Cuando tu horario cambia, HyFlex ayuda a mantener continuidad: usas clase en vivo cuando puedes y materiales grabados cuando necesitas recuperar ritmo.',
        week: ['Replay', 'Online en vivo', 'Plataforma', 'Campus', 'Entrega digital']
      }
    };

    const buttons = Array.from(root.querySelectorAll('[data-hyflex-scenario]'));
    const week = root.querySelector('[data-hyflex-week]');
    const kicker = root.querySelector('[data-hyflex-kicker]');
    const title = root.querySelector('[data-hyflex-title]');
    const copy = root.querySelector('[data-hyflex-copy]');
    const board = root.querySelector('.site-hyflex-planner__board');
    const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'];

    function render(scenarioKey, shouldTrack = true){
      const scenario = scenarios[scenarioKey] || scenarios.work;
      buttons.forEach((button) => button.classList.toggle('is-active', button.dataset.hyflexScenario === scenarioKey));
      if(kicker) kicker.textContent = scenario.kicker;
      if(title) title.textContent = scenario.title;
      if(copy) copy.textContent = scenario.copy;
      if(week){
        week.replaceChildren();
        scenario.week.forEach((item, index) => {
          const day = document.createElement('div');
          const strong = document.createElement('strong');
          const span = document.createElement('span');
          strong.textContent = days[index];
          span.textContent = item;
          day.append(strong, span);
          week.appendChild(day);
        });
      }
      softSwap(board);
      if(shouldTrack) track('hyflex_planner_select', { program: scenarioKey, page_path: location.pathname, event_category: 'hyflex' });
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => render(button.dataset.hyflexScenario));
    });
    render('work', false);
  }

  function setupHyflexVisual(){
    const target = document.querySelector('.dasc-hyflex-hero-card, .dasc-hyflex .dasc-hyflex-options');
    if(!target || document.querySelector('.site-hyflex-orbit')) return;
    const visual = document.createElement('div');
    visual.className = 'site-hyflex-orbit';
    visual.setAttribute('aria-hidden', 'true');
    visual.innerHTML = [
      '<div class="site-hyflex-core">HyFlex</div>',
      '<span style="--i:0">Campus</span>',
      '<span style="--i:1">Online</span>',
      '<span style="--i:2">Hibrido</span>',
      '<span style="--i:3">Replay</span>'
    ].join('');
    target.appendChild(visual);
  }

  function setupProgramMeters(){
    const selectors = [
      '#campo-laboral article',
      '#dasc-di-campo article',
      '.dasc-work-grid article',
      '.dasc-di-work article',
      '.dasc-career-grid article'
    ];
    const cards = Array.from(document.querySelectorAll(selectors.join(',')));
    cards.forEach((card, index) => {
      if(card.querySelector('.site-program-meter')) return;
      const meter = document.createElement('span');
      meter.className = 'site-program-meter';
      meter.style.setProperty('--meter', `${64 + ((index * 11) % 28)}%`);
      meter.innerHTML = '<i></i>';
      card.appendChild(meter);
    });
  }

  setupMissionStrip();
  setupHeaderState();
  setupTabs();
  setupScrollReveal();
  setupCounters();
  setupTechCanvas();
  setupOfferProfiles();
  setupRouteLab();
  setupOfferAdvisor();
  setupHyflexPlanner();
  setupHyflexVisual();
  setupProgramMeters();
})();
