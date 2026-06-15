const DATA_PATHS = {
  taxonomy: "data/taxonomia.json",
  offer: "data/oferta-puebla.json"
};

const TRAIT_LABELS = {
  analisis: "analisis",
  argumentacion: "argumentacion",
  autonomia: "autonomia",
  ciencia: "ciencia aplicada",
  comunicacion: "comunicacion",
  creatividad: "creatividad",
  cuidado: "cuidado de personas",
  eficiencia: "mejora de procesos",
  experiencia: "experiencias de servicio",
  laboratorio: "laboratorio",
  liderazgo: "liderazgo",
  logica: "logica",
  negocio: "negocios",
  numeros: "numeros",
  organizacion: "organizacion",
  precision: "precision",
  procesos: "procesos",
  prototipo: "prototipos",
  servicio: "servicio",
  tecnica: "tecnica",
  tecnologia: "tecnologia",
  visual: "visualizacion"
};

const state = {
  taxonomy: null,
  offer: null,
  step: 0,
  responses: {},
  lastResult: null
};

const els = {
  app: document.querySelector(".app-card"),
  startView: document.querySelector("[data-start-view]"),
  quiz: document.querySelector("[data-quiz]"),
  results: document.querySelector("[data-results]"),
  start: document.querySelector("[data-start]"),
  next: document.querySelector("[data-next]"),
  back: document.querySelector("[data-back]"),
  restart: document.querySelector("[data-restart]"),
  status: document.querySelector("[data-load-status]"),
  stepLabel: document.querySelector("[data-step-label]"),
  stageTitle: document.querySelector("[data-stage-title]"),
  progressLabel: document.querySelector("[data-progress-label]"),
  progressBar: document.querySelector("[data-progress-bar]"),
  questionPanel: document.querySelector("[data-question-panel]"),
  resultSummary: document.querySelector("[data-result-summary]"),
  profileStrip: document.querySelector("[data-profile-strip]"),
  resultList: document.querySelector("[data-result-list]"),
  sourceList: document.querySelector("[data-source-list]")
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  setupReveal();
  bindEvents();

  try {
    const [taxonomy, offer] = await Promise.all([
      loadJson(DATA_PATHS.taxonomy),
      loadJson(DATA_PATHS.offer)
    ]);

    state.taxonomy = taxonomy;
    state.offer = offer;

    updateStats();
    renderSources();
    setStatus("Dataset local listo. Puedes iniciar el test.", "ready");
    els.start.disabled = false;
    els.start.textContent = "Iniciar test";
  } catch (error) {
    console.error(error);
    setStatus("No se pudo cargar el dataset. Revisa que la pagina se abra desde el servidor local o GitHub Pages.", "error");
    els.start.textContent = "Dataset no disponible";
  }
}

function bindEvents() {
  els.start.addEventListener("click", startQuiz);
  els.next.addEventListener("click", goNext);
  els.back.addEventListener("click", goBack);
  els.restart.addEventListener("click", restartQuiz);

  els.questionPanel.addEventListener("click", (event) => {
    const scaleButton = event.target.closest("[data-scale-value]");
    const choiceButton = event.target.closest("[data-choice-value]");
    const multiButton = event.target.closest("[data-multi-value]");

    if (scaleButton) {
      recordScale(scaleButton);
      return;
    }

    if (choiceButton) {
      recordChoice(choiceButton);
      return;
    }

    if (multiButton) {
      recordMulti(multiButton);
    }
  });
}

async function loadJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`No se pudo cargar ${path}: ${response.status}`);
  }
  return response.json();
}

function setStatus(message, type) {
  els.status.textContent = message;
  els.app.classList.remove("is-ready", "is-error");
  if (type === "ready") els.app.classList.add("is-ready");
  if (type === "error") els.app.classList.add("is-error");
}

function startQuiz() {
  if (!state.taxonomy || !state.offer) return;

  state.step = 0;
  state.responses = {};
  state.lastResult = null;
  els.startView.hidden = true;
  els.results.hidden = true;
  els.quiz.hidden = false;
  renderStep();
  els.quiz.scrollIntoView({ behavior: "smooth", block: "start" });
}

function restartQuiz() {
  startQuiz();
}

function goBack() {
  if (state.step === 0) {
    els.quiz.hidden = true;
    els.startView.hidden = false;
    els.startView.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  state.step -= 1;
  renderStep();
}

function goNext() {
  const block = getCurrentBlock();
  if (!isComplete(block)) return;

  if (state.step >= state.taxonomy.blocks.length - 1) {
    showResults();
    return;
  }

  state.step += 1;
  renderStep();
}

function renderStep() {
  const block = getCurrentBlock();
  const total = state.taxonomy.blocks.length;
  const current = state.step + 1;

  els.stepLabel.textContent = `Bloque ${current} de ${total}`;
  els.stageTitle.textContent = block.title;
  els.back.textContent = state.step === 0 ? "Inicio" : "Regresar";

  els.questionPanel.innerHTML = `
    <p class="block-copy">${escapeHtml(block.subtitle || "")}</p>
    ${renderBlock(block)}
  `;

  updateStepControls();
}

function renderBlock(block) {
  if (block.type === "scale") return renderScale(block);
  if (block.type === "choice") return renderChoice(block);
  if (block.type === "multi") return renderMulti(block);
  return `<p>Este bloque no esta disponible.</p>`;
}

function renderScale(block) {
  const responses = getBlockResponses(block.id);

  return `
    <div class="scale-stack" role="group" aria-label="${escapeAttr(block.title)}">
      ${block.items.map((item) => `
        <div class="scale-row">
          <p>${escapeHtml(item.label)}</p>
          <div class="scale-options" role="group" aria-label="Nivel para ${escapeAttr(item.label)}">
            ${[1, 2, 3, 4, 5].map((value) => {
              const selected = Number(responses[item.id]) === value;
              return `
                <button
                  class="scale-btn${selected ? " is-selected" : ""}"
                  type="button"
                  data-scale-item="${escapeAttr(item.id)}"
                  data-scale-value="${value}"
                  aria-pressed="${selected ? "true" : "false"}"
                  aria-label="${value} de 5">
                  ${value}
                </button>
              `;
            }).join("")}
          </div>
        </div>
      `).join("")}
    </div>
    <p class="helper-text">1 significa baja afinidad, 5 significa alta afinidad.</p>
  `;
}

function renderChoice(block) {
  const responses = getBlockResponses(block.id);

  return `
    <div class="choice-stack">
      ${block.items.map((item) => `
        <section class="choice-item" aria-labelledby="${escapeAttr(item.id)}-label">
          <p class="item-question" id="${escapeAttr(item.id)}-label">${escapeHtml(item.label)}</p>
          <div class="choice-stack" role="group" aria-label="${escapeAttr(item.label)}">
            ${item.options.map((option, index) => {
              const selected = responses[item.id] === option.value;
              return `
                <button
                  class="option-card${selected ? " is-selected" : ""}"
                  type="button"
                  data-choice-item="${escapeAttr(item.id)}"
                  data-choice-value="${escapeAttr(option.value)}"
                  aria-pressed="${selected ? "true" : "false"}">
                  <span>${String.fromCharCode(65 + index)}</span>
                  <strong>${escapeHtml(option.label)}</strong>
                </button>
              `;
            }).join("")}
          </div>
        </section>
      `).join("")}
    </div>
  `;
}

function renderMulti(block) {
  const item = block.items[0];
  const responses = getBlockResponses(block.id);
  const selectedValues = Array.isArray(responses[item.id]) ? responses[item.id] : [];

  return `
    <section class="choice-item" aria-labelledby="${escapeAttr(item.id)}-label">
      <p class="item-question" id="${escapeAttr(item.id)}-label">${escapeHtml(item.label)}</p>
      <div class="choice-stack" role="group" aria-label="${escapeAttr(item.label)}">
        ${item.options.map((option, index) => {
          const selected = selectedValues.includes(option.value);
          return `
            <button
              class="option-card${selected ? " is-selected" : ""}"
              type="button"
              data-multi-item="${escapeAttr(item.id)}"
              data-multi-value="${escapeAttr(option.value)}"
              aria-pressed="${selected ? "true" : "false"}">
              <span>${selected ? "OK" : String.fromCharCode(65 + index)}</span>
              <strong>${escapeHtml(option.label)}</strong>
            </button>
          `;
        }).join("")}
      </div>
      <p class="helper-text" data-multi-helper>Elige de ${block.min} a ${block.max}. Seleccionadas: ${selectedValues.length}.</p>
    </section>
  `;
}

function recordScale(button) {
  const block = getCurrentBlock();
  const responses = getBlockResponses(block.id);
  responses[button.dataset.scaleItem] = Number(button.dataset.scaleValue);
  renderStep();
}

function recordChoice(button) {
  const block = getCurrentBlock();
  const responses = getBlockResponses(block.id);
  responses[button.dataset.choiceItem] = button.dataset.choiceValue;
  renderStep();
}

function recordMulti(button) {
  const block = getCurrentBlock();
  const responses = getBlockResponses(block.id);
  const itemId = button.dataset.multiItem;
  const value = button.dataset.multiValue;
  const selected = Array.isArray(responses[itemId]) ? [...responses[itemId]] : [];
  const existingIndex = selected.indexOf(value);

  if (existingIndex >= 0) {
    selected.splice(existingIndex, 1);
  } else if (selected.length < block.max) {
    selected.push(value);
  }

  responses[itemId] = selected;
  renderStep();
}

function updateStepControls() {
  const block = getCurrentBlock();
  const complete = isComplete(block);
  const total = state.taxonomy.blocks.length;
  const percent = Math.round(((state.step + getBlockProgress(block)) / total) * 100);

  els.next.disabled = !complete;
  els.next.textContent = state.step >= total - 1 ? "Ver resultado" : "Siguiente";
  els.progressLabel.textContent = `${percent}%`;
  els.progressBar.style.width = `${percent}%`;
}

function getBlockProgress(block) {
  const responses = getBlockResponses(block.id);

  if (block.type === "scale" || block.type === "choice") {
    const answered = block.items.filter((item) => responses[item.id] !== undefined && responses[item.id] !== "").length;
    return answered / block.items.length;
  }

  if (block.type === "multi") {
    const item = block.items[0];
    const selected = Array.isArray(responses[item.id]) ? responses[item.id].length : 0;
    return Math.min(selected / block.min, 1);
  }

  return 0;
}

function isComplete(block) {
  const responses = getBlockResponses(block.id);

  if (block.type === "scale") {
    return block.items.every((item) => Number.isFinite(Number(responses[item.id])));
  }

  if (block.type === "choice") {
    return block.items.every((item) => typeof responses[item.id] === "string" && responses[item.id].length > 0);
  }

  if (block.type === "multi") {
    const item = block.items[0];
    const selected = Array.isArray(responses[item.id]) ? responses[item.id] : [];
    return selected.length >= block.min && selected.length <= block.max;
  }

  return false;
}

function showResults() {
  const scored = scoreResponses();
  state.lastResult = scored;

  els.quiz.hidden = true;
  els.results.hidden = false;
  renderProfile(scored);
  renderRecommendations(scored);
  els.results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scoreResponses() {
  const taxonomy = state.taxonomy;
  const offer = state.offer;
  const routeScores = Object.fromEntries(taxonomy.routes.map((route) => [route.id, 0]));
  const traits = {};
  const learning = {};
  const motivation = {};

  taxonomy.blocks.forEach((block) => {
    const responses = getBlockResponses(block.id);

    if (block.type === "scale") {
      block.items.forEach((item) => {
        const value = Number(responses[item.id]);
        if (!Number.isFinite(value)) return;
        const factor = Math.max(0, Math.min(1, (value - 1) / 4));
        addWeighted(routeScores, item.routes, factor);
        addWeighted(traits, item.traits, factor);
      });
      return;
    }

    if (block.type === "choice") {
      block.items.forEach((item) => {
        const option = item.options.find((entry) => entry.value === responses[item.id]);
        if (!option) return;
        addWeighted(routeScores, option.routes, 1);
        addWeighted(traits, option.traits, 1);
        addWeighted(learning, option.learning, 1);
        addWeighted(motivation, option.motivation, 1);
      });
      return;
    }

    if (block.type === "multi") {
      const item = block.items[0];
      const selected = Array.isArray(responses[item.id]) ? responses[item.id] : [];
      selected.forEach((value) => {
        const option = item.options.find((entry) => entry.value === value);
        if (!option) return;
        addWeighted(routeScores, option.routes, 1);
        addWeighted(traits, option.traits, 1);
        addWeighted(learning, option.learning, 1);
        addWeighted(motivation, option.motivation, 1);
      });
    }
  });

  const programCount = countProgramsByRoute(offer.programs);
  const ranked = taxonomy.routes
    .map((route) => ({
      route,
      score: routeScores[route.id] || 0,
      programs: offer.programs.filter((program) => program.route_id === route.id)
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      const availability = (programCount[b.route.id] || 0) - (programCount[a.route.id] || 0);
      if (availability !== 0) return availability;
      return a.route.title.localeCompare(b.route.title, "es");
    });

  return {
    ranked: ranked.slice(0, 3),
    traits,
    learning,
    motivation,
    routeScores
  };
}

function renderProfile(scored) {
  const topTraits = getTopEntries(scored.traits, 4).map(([trait]) => labelTrait(trait));
  const learningKey = getTopEntries(scored.learning, 1)[0]?.[0];
  const motivationKey = getTopEntries(scored.motivation, 1)[0]?.[0];
  const learningData = state.taxonomy.learning_styles[learningKey] || null;
  const motivationText = state.taxonomy.motivations[motivationKey] || "Perfil mixto: tus respuestas combinan varias motivaciones.";

  els.resultSummary.textContent = "El resultado ordena rutas por afinidad relativa. No es una decision cerrada: es un mapa para investigar mejor.";
  els.profileStrip.innerHTML = `
    <article class="profile-chip">
      <small>Habilidades detectadas</small>
      <strong>${escapeHtml(topTraits.length ? topTraits.join(", ") : "perfil mixto")}</strong>
    </article>
    <article class="profile-chip">
      <small>Aprendizaje sugerido</small>
      <strong>${escapeHtml(learningData ? learningData.label : "Mixto")}</strong>
    </article>
    <article class="profile-chip">
      <small>Motivacion dominante</small>
      <strong>${escapeHtml(motivationText)}</strong>
    </article>
  `;
}

function renderRecommendations(scored) {
  const topScore = Math.max(scored.ranked[0]?.score || 1, 1);

  els.resultList.innerHTML = scored.ranked.map((entry, index) => {
    const route = entry.route;
    const programs = sortPrograms(entry.programs);
    const fit = Math.max(1, Math.round((entry.score / topScore) * 100));
    const visiblePrograms = programs.slice(0, 7);
    const matchedSignals = getMatchedSignals(route, scored.traits);

    return `
      <article class="result-card" style="--route-color: ${escapeAttr(route.color || "#003399")}">
        <div class="result-top">
          <div class="result-title">
            <span class="rank-badge">${index + 1}</span>
            <h3>${escapeHtml(route.title)}</h3>
            <p>${escapeHtml(route.summary)}</p>
          </div>
          <div class="fit-meter" aria-label="Afinidad relativa ${fit} por ciento">
            <strong>${fit}%</strong>
            <span>afinidad relativa</span>
          </div>
        </div>

        <div class="reason-grid">
          <div class="reason-box">
            <h4>Por que encaja</h4>
            <p>${escapeHtml(route.why)}</p>
          </div>
          <div class="reason-box">
            <h4>Senales del perfil</h4>
            <p>${escapeHtml(matchedSignals.length ? matchedSignals.join(", ") : route.future)}</p>
          </div>
        </div>

        ${programs.length ? renderPrograms(visiblePrograms, programs.length) : renderNoPrograms()}
      </article>
    `;
  }).join("");
}

function renderPrograms(programs, total) {
  const extra = total - programs.length;

  return `
    <div class="program-list">
      <h4>Instituciones de Puebla capital donde validar</h4>
      ${programs.map((program) => `
        <div class="program-item">
          <div>
            <strong>${escapeHtml(program.program)}</strong>
            <small>${escapeHtml(program.institution)} · ${escapeHtml(program.level)} · ${escapeHtml(program.modality || "Modalidad por confirmar")}</small>
          </div>
          <a href="${escapeAttr(program.source_url)}" target="_blank" rel="noopener">Validar</a>
        </div>
      `).join("")}
      ${extra > 0 ? `<p class="more-note">Hay ${extra} opcion${extra === 1 ? "" : "es"} adicional${extra === 1 ? "" : "es"} en el dataset para esta ruta.</p>` : ""}
    </div>
  `;
}

function renderNoPrograms() {
  return `
    <div class="warning-box">
      <h4>Oferta por confirmar</h4>
      <p>Esta ruta encaja con tu perfil, pero el dataset inicial todavia no tiene una institucion validada en Puebla capital. Conviene investigarla directamente antes de descartarla.</p>
    </div>
  `;
}

function renderSources() {
  if (!state.offer?.sources?.length || !els.sourceList) return;

  els.sourceList.innerHTML = state.offer.sources.map((source) => `
    <a href="${escapeAttr(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.label)}</a>
  `).join("");
}

function updateStats() {
  const routeCount = state.taxonomy.routes.length;
  const programCount = state.offer.programs.length;
  const institutionCount = new Set(state.offer.programs.map((program) => program.institution)).size;

  setStat("routes", routeCount);
  setStat("programs", programCount);
  setStat("institutions", institutionCount);
}

function setStat(name, value) {
  const element = document.querySelector(`[data-stat="${name}"]`);
  if (element) element.textContent = String(value);
}

function addWeighted(target, weights, factor) {
  if (!weights) return;

  Object.entries(weights).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + Number(value) * factor;
  });
}

function getCurrentBlock() {
  return state.taxonomy.blocks[state.step];
}

function getBlockResponses(blockId) {
  if (!state.responses[blockId]) state.responses[blockId] = {};
  return state.responses[blockId];
}

function countProgramsByRoute(programs) {
  return programs.reduce((accumulator, program) => {
    accumulator[program.route_id] = (accumulator[program.route_id] || 0) + 1;
    return accumulator;
  }, {});
}

function sortPrograms(programs) {
  return [...programs].sort((a, b) => {
    const institution = a.institution.localeCompare(b.institution, "es");
    if (institution !== 0) return institution;
    return a.program.localeCompare(b.program, "es");
  });
}

function getMatchedSignals(route, traits) {
  const signals = Array.isArray(route.signals) ? route.signals : [];
  const matched = signals.filter((signal) => (traits[signal] || 0) > 0);
  const fallback = getTopEntries(traits, 3).map(([trait]) => trait);
  return (matched.length ? matched : fallback).map(labelTrait);
}

function getTopEntries(bucket, limit) {
  return Object.entries(bucket || {})
    .filter(([, value]) => Number(value) > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"))
    .slice(0, limit);
}

function labelTrait(value) {
  if (!value) return "";
  return TRAIT_LABELS[value] || value.replace(/-/g, " ");
}

function setupReveal() {
  const revealNodes = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealNodes.forEach((node) => observer.observe(node));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
