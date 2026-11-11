(function () {
  'use strict';
  const root = document.querySelector('[data-admission-program]');
  const program = root?.dataset.admissionProgram || 'Oferta educativa';
  const params = new URLSearchParams(location.search);
  function event(name, detail = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: name, program, page_path: location.pathname, ...detail });
  }
  document.querySelectorAll('[data-admission-intent]').forEach(link => {
    const intent = link.dataset.admissionIntent;
    const message = `Hola DASC, ${intent === 'costos' ? 'solicito un desglose de inscripción, colegiaturas, cargos adicionales y condiciones de pago' : 'quiero solicitar una visita al campus; por favor confirmen fecha y horario'}. Programa: ${program}. Origen: ${location.pathname}.`;
    link.href = 'https://wa.me/5212223606438?text=' + encodeURIComponent(message);
    link.addEventListener('click', () => event('admissions_whatsapp_open', { intent }));
  });
  const lab = document.querySelector('[data-software-lab]');
  if (lab) {
    const checks = [...lab.querySelectorAll('input[type=checkbox]')];
    const composer = document.createElement('form');
    composer.className = 'software-composer';
    const input = document.createElement('input');
    input.type = 'text'; input.maxLength = 100; input.required = true;
    input.placeholder = 'Una tarea para tu aplicación'; input.setAttribute('aria-label', 'Nueva tarea');
    const add = document.createElement('button'); add.type = 'submit'; add.textContent = 'Agregar tarea';
    composer.append(input, add);
    lab.querySelector('.software-tickets').before(composer);
    composer.addEventListener('submit', e => {
      e.preventDefault();
      if (!input.value.trim()) return;
      const li = document.createElement('li'); const label = document.createElement('label');
      const check = document.createElement('input'); check.type = 'checkbox';
      label.append(check, document.createTextNode(input.value.trim())); li.append(label);
      lab.querySelector('.software-tickets').append(li); checks.push(check);
      input.value = ''; update(); event('software_demo_task_added');
    });
    const output = lab.querySelector('output');
    const progress = lab.querySelector('progress');
    function update() {
      const done = checks.filter(input => input.checked).length;
      progress.max = checks.length; progress.value = done;
      output.textContent = done === checks.length ? `Comprobación completa: ${done} tareas terminadas.` : `${done} de ${checks.length} tareas terminadas. Versión en desarrollo.`;
    }
    lab.addEventListener('change', () => { update(); event('software_demo_interaction', { completed: checks.filter(i => i.checked).length }); });
    lab.querySelector('button').addEventListener('click', () => { checks.forEach(input => { input.checked = false; }); update(); });
    update();
  }
  const form = document.querySelector('[data-admission-form]');
  const endpoint = window.DASC_ADMISSIONS?.endpoint;
  if (form && endpoint) {
    form.hidden = false;
    const status = form.querySelector('[role=status]');
    const button = form.querySelector('button[type=submit]');
    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form));
      button.disabled = true;
      status.textContent = 'Registrando tu solicitud…';
      try {
        const response = await fetch(endpoint, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, program, source: location.pathname, utm_source: params.get('utm_source') || '', utm_campaign: params.get('utm_campaign') || '', consent: data.consent === 'on' }),
          signal: AbortSignal.timeout(12000)
        });
        const result = await response.json();
        if (!response.ok || !result.id) throw new Error('not_saved');
        status.textContent = `Solicitud registrada. Folio: ${result.id}. Admisiones debe confirmar la disponibilidad y el siguiente paso.`;
        event('admission_request_saved', { intent: data.intent });
        form.reset();
      } catch {
        status.textContent = 'No se pudo registrar la solicitud. Puedes preparar tu consulta por WhatsApp o llamar al 222 630 9002.';
      } finally { button.disabled = false; }
    });
  }
  document.querySelectorAll('[data-save-quiz]').forEach(button => button.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('dasc:save-quiz', { detail: { action: button.dataset.saveQuiz } }));
  }));
})();
