const body = document.body;
const quizStage = document.querySelector("[data-quiz-stage]");
const revealItems = document.querySelectorAll(".reveal");
const careerCards = document.querySelectorAll("[data-career-card]");
const splashScreen = document.querySelector("[data-splash-screen]");

const WHATSAPP_NUMBER = "5212223606438";
const LEAD_WEBHOOK_URL = "";
const PRIVACY_NOTICE_URL = "https://dasc.edu.mx/aviso-de-privacidad/";
const scaleLabels = [
  { value: 1, label: "Nada" },
  { value: 2, label: "Poco" },
  { value: 3, label: "Algo" },
  { value: 4, label: "Bastante" },
  { value: 5, label: "Mucho" },
];

const analysisMessages = [
  "Midiendo afinidades por carrera",
  "Revisando estilo de aprendizaje",
  "Calculando modalidad y nivel de riesgo",
];

const signalLabels = {
  logic: "Logica",
  creativity: "Creatividad",
  business: "Negocio",
  process: "Procesos",
  technology: "Tecnologia",
  analysis: "Analisis",
  communication: "Comunicacion",
  organization: "Organizacion",
};

const careers = {
  software: {
    degree: "Ingenieria en Software",
    url: "ingenieria-en-software.html",
    profile: "Arquitecto Digital",
    description:
      "Tu perfil se inclina hacia la construccion de soluciones, la programacion y la resolucion de problemas con base tecnica.",
    sales:
      "Puedes crecer creando productos digitales, plataformas y herramientas que resuelvan necesidades reales.",
    points: [
      "Tienes buena afinidad con tecnologia y logica aplicada.",
      "Te favorecen entornos donde construir y mejorar es parte del dia a dia.",
      "Tu perfil conecta bien con retos tecnicos y desarrollo de producto.",
    ],
    next: ["Desarrollo web", "Apps moviles", "Producto digital"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Ingenieria en Software. Me gustaria recibir mas informacion.",
  },
  systems: {
    degree: "Sistemas Computacionales",
    url: "sistemas-computacionales.html",
    profile: "Gestor Tecnologico",
    description:
      "Tu afinidad esta en la tecnologia aplicada, la operacion tecnica y la implementacion de soluciones dentro de organizaciones.",
    sales:
      "Tu perfil puede destacar conectando herramientas, infraestructura y soporte con necesidades reales del negocio.",
    points: [
      "Te interesa que la tecnologia funcione bien y aporte valor.",
      "Aprendes mejor cuando puedes llevar lo tecnico a la practica.",
      "Tu perfil combina tecnologia con ejecucion operativa.",
    ],
    next: ["Infraestructura", "Soporte", "Implementacion"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Sistemas Computacionales. Me gustaria recibir mas informacion.",
  },
  industrial: {
    degree: "Ingenieria Industrial",
    url: "ingenieria-industrial.html",
    profile: "Optimizador Estrategico",
    description:
      "Tu perfil muestra fuerza en analisis, procesos, eficiencia y mejora continua.",
    sales:
      "Puedes aportar mucho detectando fallas, ordenando operaciones y mejorando resultados de forma medible.",
    points: [
      "Te motiva entender como funciona un sistema completo.",
      "Piensas en eficiencia, estructura y mejora continua.",
      "Tu mirada analitica es valiosa para operaciones y procesos.",
    ],
    next: ["Procesos", "Operaciones", "Mejora continua"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Ingenieria Industrial. Me gustaria recibir mas informacion.",
  },
  design: {
    degree: "Diseno Interactivo",
    url: "diseno-interactivo.html",
    profile: "Creador Visual",
    description:
      "Tu perfil combina sensibilidad visual, creatividad digital y gusto por construir experiencias atractivas.",
    sales:
      "Puedes crecer creando interfaces, contenido y experiencias que conecten con personas y marcas.",
    points: [
      "Aprendes bien con referentes visuales y practica creativa.",
      "Tu perfil necesita espacios donde la idea tambien se vea y se sienta bien.",
      "Tienes afinidad con entornos donde creatividad y tecnologia se cruzan.",
    ],
    next: ["Interfaces", "UX", "Contenido visual"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Diseno Interactivo. Me gustaria recibir mas informacion.",
  },
  marketing: {
    degree: "Mercadotecnia Digital",
    url: "mercadotecnia-digital.html",
    profile: "Impulsor de Marcas",
    description:
      "Tu perfil se acerca a la comunicacion, la creatividad y el entendimiento de audiencias, marcas y crecimiento.",
    sales:
      "Puedes destacar conectando mensajes, estrategias y resultados en entornos digitales.",
    points: [
      "Tu perfil combina creatividad con negocio y comunicacion.",
      "Te favorecen proyectos donde una idea tiene que conectar con personas.",
      "Puedes crecer en campanas, contenido, marca y analitica comercial.",
    ],
    next: ["Campanas", "Branding", "Contenido"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Mercadotecnia Digital. Me gustaria recibir mas informacion.",
  },
  admin: {
    degree: "Administracion y Sistemas",
    url: "administracion-y-sistemas.html",
    profile: "Lider Organizador",
    description:
      "Tu perfil tiene buena afinidad con liderazgo, estructura, organizacion y vision de negocio.",
    sales:
      "Puedes crecer coordinando equipos, decisiones y operaciones con una mirada clara de objetivos y resultados.",
    points: [
      "Tienes afinidad con organizacion, negocio y toma de decisiones.",
      "Te favorecen entornos donde ordenar y liderar hace diferencia.",
      "Tu perfil conecta bien con gestion, empresa y emprendimiento.",
    ],
    next: ["Gestion", "Liderazgo", "Emprendimiento"],
    whatsapp:
      "Hola, hice el test vocacional de DASC y mi resultado fue Administracion y Sistemas. Me gustaria recibir mas informacion.",
  },
};

const modalities = {
  hyflex: {
    name: "HyFlex",
    description:
      "Te conviene una modalidad que combine flexibilidad, acompanamiento y continuidad para estudiar sin soltar otras responsabilidades.",
  },
  presencial: {
    name: "Presencial con estructura",
    description:
      "Te favorece una modalidad con horarios claros, ritmo definido y acompanamiento cercano.",
  },
  flexible: {
    name: "Flexible con acompanamiento",
    description:
      "Te conviene avanzar con autonomia, apoyo y opciones digitales para mantener el ritmo sin perder seguimiento.",
  },
};

const learningProfiles = {
  visual: {
    name: "Visual",
    description:
      "Aprendes mejor cuando ves ejemplos, referentes claros, graficos o contenido visual.",
  },
  auditory: {
    name: "Auditivo",
    description:
      "Te ayuda escuchar explicaciones, conversar ideas y procesar informacion en dialogo.",
  },
  kinesthetic: {
    name: "Practico",
    description:
      "Aprendes mejor haciendo, practicando y resolviendo casos reales.",
  },
};

const motivationMessages = {
  stability:
    "Buscas una decision que abra estabilidad, crecimiento y oportunidades claras a futuro.",
  creativity:
    "Necesitas una carrera donde puedas construir ideas propias y expresarte con libertad.",
  entrepreneurship:
    "Te mueve liderar, emprender y abrir camino por tu cuenta en el futuro.",
  employability:
    "Valoras una opcion que te acerque pronto al mundo laboral y a experiencias reales.",
  impact:
    "Quieres que lo que estudies tenga utilidad real y genere impacto en personas o proyectos.",
};

const riskMessages = {
  low: {
    label: "Bajo",
    description:
      "Tu resultado muestra buena confianza para sostener una carrera si eliges una opcion alineada contigo.",
  },
  medium: {
    label: "Medio",
    description:
      "Hay algunas barreras que conviene atender desde el inicio. Una modalidad flexible y acompanamiento claro pueden ayudarte mucho.",
  },
  high: {
    label: "Alto",
    description:
      "Tu contexto necesita flexibilidad, seguimiento y una experiencia pensada para que avances sin soltar tus otras responsabilidades.",
  },
};

const steps = [
  {
    id: "interests",
    block: "Bloque 1 de 6",
    title: "Intereses y afinidades",
    subtitle: "Califica cada frase de 1 a 5 segun cuanto conecte contigo.",
    type: "scale",
    items: [
      {
        id: "interest_complex",
        label: "Me gusta resolver problemas complejos o tecnicos",
        careers: { software: 4, industrial: 2, systems: 2 },
        signals: { logic: 3, analysis: 2, technology: 1 },
      },
      {
        id: "interest_visual",
        label: "Disfruto crear cosas visuales o digitales",
        careers: { design: 4, marketing: 2 },
        signals: { creativity: 3, communication: 1 },
        learning: { visual: 1 },
      },
      {
        id: "interest_business",
        label: "Me interesa entender como funcionan los negocios",
        careers: { admin: 4, marketing: 3, industrial: 2 },
        signals: { business: 3, organization: 1 },
      },
      {
        id: "interest_process",
        label: "Me gusta organizar procesos o mejorar sistemas",
        careers: { industrial: 4, admin: 2, systems: 2 },
        signals: { process: 3, analysis: 2, organization: 1 },
      },
      {
        id: "interest_tech",
        label: "Me atrae programar o trabajar con tecnologia",
        careers: { software: 4, systems: 4, industrial: 1 },
        signals: { technology: 3, logic: 2 },
      },
      {
        id: "interest_data",
        label: "Me gusta analizar datos para tomar decisiones",
        careers: { industrial: 4, marketing: 2, admin: 2, systems: 1 },
        signals: { analysis: 3, business: 1 },
      },
    ],
  },
  {
    id: "learning",
    block: "Bloque 2 de 6",
    title: "Estilo de aprendizaje",
    subtitle: "Responde como aprendes mejor en la practica.",
    type: "scale",
    items: [
      {
        id: "learn_visual_examples",
        label: "Aprendo mejor viendo ejemplos, graficos o videos",
        learning: { visual: 3 },
        modality: { flexible: 1, hyflex: 1 },
        careers: { design: 1, marketing: 1 },
      },
      {
        id: "learn_visual_create",
        label: "Me gusta disenar, editar o crear contenido visual",
        learning: { visual: 3 },
        careers: { design: 3, marketing: 1 },
        signals: { creativity: 2, communication: 1 },
      },
      {
        id: "learn_auditory_explain",
        label: "Entiendo mejor cuando alguien me explica",
        learning: { auditory: 3 },
        modality: { presencial: 2 },
      },
      {
        id: "learn_auditory_discuss",
        label: "Prefiero clases donde se discuten ideas",
        learning: { auditory: 3 },
        careers: { admin: 1, marketing: 2 },
        modality: { presencial: 1, flexible: 1 },
      },
      {
        id: "learn_kinesthetic_practice",
        label: "Aprendo haciendo, practicando o experimentando",
        learning: { kinesthetic: 3 },
        careers: { systems: 2, industrial: 2, software: 1 },
        modality: { hyflex: 1 },
      },
      {
        id: "learn_kinesthetic_bored",
        label: "Me aburro si solo escucho o leo",
        learning: { kinesthetic: 2 },
        modality: { hyflex: 1, flexible: 1 },
      },
    ],
  },
  {
    id: "pedagogy",
    block: "Bloque 3 de 6",
    title: "Forma de estudiar",
    subtitle: "Aqui vemos el ritmo y formato que te ayudan a sostener el aprendizaje.",
    type: "scale",
    items: [
      {
        id: "ped_practical",
        label: "Prefiero clases practicas mas que teoricas",
        careers: { systems: 2, industrial: 2, software: 1, design: 1 },
        modality: { hyflex: 2 },
        learning: { kinesthetic: 1 },
      },
      {
        id: "ped_pace",
        label: "Me gusta aprender a mi ritmo",
        modality: { hyflex: 3, flexible: 2 },
      },
      {
        id: "ped_structure",
        label: "Necesito estructura y horarios claros para avanzar",
        modality: { presencial: 3 },
      },
      {
        id: "ped_online",
        label: "Me adapto bien a clases en linea",
        modality: { hyflex: 2, flexible: 2 },
      },
      {
        id: "ped_projects",
        label: "Me gusta trabajar en proyectos reales",
        modality: { hyflex: 2 },
        careers: {
          software: 1,
          systems: 1,
          industrial: 1,
          design: 1,
          marketing: 1,
          admin: 1,
        },
      },
    ],
  },
  {
    id: "motivation",
    block: "Bloque 4 de 6",
    title: "Motivacion y decision",
    subtitle: "Esto ayuda a personalizar el mensaje final y entender que buscas de una carrera.",
    type: "scale",
    items: [
      {
        id: "mot_stability",
        label: "Quiero una carrera que me de estabilidad economica",
        motivations: { stability: 3 },
        careers: { admin: 1, industrial: 1, systems: 1, software: 1 },
      },
      {
        id: "mot_creative",
        label: "Busco una carrera donde pueda ser creativo",
        motivations: { creativity: 3 },
        careers: { design: 3, marketing: 2 },
      },
      {
        id: "mot_entrepreneur",
        label: "Me interesa emprender en el futuro",
        motivations: { entrepreneurship: 3 },
        careers: { admin: 2, marketing: 2, design: 1 },
      },
      {
        id: "mot_work_soon",
        label: "Quiero trabajar lo antes posible",
        motivations: { employability: 3 },
        careers: { systems: 1, industrial: 1, marketing: 1 },
      },
      {
        id: "mot_impact",
        label: "Me importa hacer algo que tenga impacto",
        motivations: { impact: 3 },
        careers: { software: 1, industrial: 1, admin: 1, marketing: 1 },
      },
    ],
  },
  {
    id: "scct",
    block: "Bloque 5 de 6",
    title: "Autoeficacia, expectativas y barreras",
    subtitle: "Estas respuestas ayudan a detectar el nivel de apoyo que puede necesitar tu proceso.",
    type: "scale",
    items: [
      {
        id: "scct_finish",
        label: "Me siento capaz de terminar una carrera universitaria",
        scct: "confidence",
      },
      {
        id: "scct_difficult",
        label: "Creo que puedo aprender cosas dificiles si me esfuerzo",
        scct: "confidence",
      },
      {
        id: "scct_problem_solving",
        label: "Me considero bueno resolviendo problemas",
        scct: "confidence",
        careers: { software: 1, industrial: 1, systems: 1 },
      },
      {
        id: "scct_life",
        label: "Estudiar una carrera mejorara mi calidad de vida",
        scct: "expectation",
      },
      {
        id: "scct_job",
        label: "Creo que encontrare trabajo en el area que estudie",
        scct: "expectation",
      },
      {
        id: "scct_value",
        label: "Veo valor real en seguir estudiando",
        scct: "expectation",
      },
      {
        id: "scct_money",
        label: "El dinero es un obstaculo para estudiar",
        scct: "barrier",
        barrierLabel: "Presion economica",
      },
      {
        id: "scct_time",
        label: "El tiempo es un problema por trabajo u otras responsabilidades",
        scct: "barrier",
        barrierLabel: "Poco tiempo disponible",
        modality: { hyflex: 2 },
      },
      {
        id: "scct_load",
        label: "Me preocupa no poder con la carga academica",
        scct: "barrier",
        barrierLabel: "Duda sobre carga academica",
      },
      {
        id: "scct_support",
        label: "No tengo apoyo suficiente para estudiar",
        scct: "barrier",
        barrierLabel: "Apoyo limitado",
      },
    ],
  },
  {
    id: "context",
    block: "Bloque 6 de 6",
    title: "Contexto real",
    subtitle: "Estas preguntas ayudan a definir la modalidad que mejor embona con tu vida actual.",
    type: "choice",
    items: [
      {
        id: "ctx_work",
        label: "Trabajas actualmente?",
        options: [
          { value: "yes", label: "Si, tiempo completo o parcial", modality: { hyflex: 3, flexible: 1 }, risk: 2 },
          { value: "sometimes", label: "A veces o por temporadas", modality: { hyflex: 2, flexible: 1 }, risk: 1 },
          { value: "no", label: "No por ahora", modality: { presencial: 1 }, risk: 0 },
        ],
      },
      {
        id: "ctx_hours",
        label: "Cuantas horas reales tienes disponibles al dia para estudiar?",
        options: [
          { value: "lt2", label: "Menos de 2 horas", modality: { hyflex: 3, flexible: 1 }, risk: 3 },
          { value: "2to4", label: "Entre 2 y 4 horas", modality: { hyflex: 2, flexible: 1 }, risk: 1 },
          { value: "4to6", label: "Entre 4 y 6 horas", modality: { presencial: 1, hyflex: 1 }, risk: 0 },
          { value: "6plus", label: "Mas de 6 horas", modality: { presencial: 2 }, risk: -1 },
        ],
      },
      {
        id: "ctx_schedule",
        label: "Que ritmo te acomoda mas para estudiar?",
        options: [
          { value: "weekdays", label: "Entre semana con horarios definidos", modality: { presencial: 3 }, risk: 0 },
          { value: "saturday", label: "Sabados o bloques concentrados", modality: { hyflex: 2, flexible: 1 }, risk: 0 },
          { value: "flex", label: "Necesito flexibilidad para moverme", modality: { hyflex: 3, flexible: 2 }, risk: 1 },
        ],
      },
      {
        id: "ctx_keep_work",
        label: "Te interesa estudiar sin dejar de trabajar?",
        options: [
          { value: "yes", label: "Si, eso es muy importante para mi", modality: { hyflex: 4, flexible: 2 }, risk: 1 },
          { value: "maybe", label: "Seria ideal, pero depende", modality: { hyflex: 2, flexible: 1 }, risk: 0 },
          { value: "no", label: "No es una prioridad en este momento", modality: { presencial: 2 }, risk: 0 },
        ],
      },
    ],
  },
];

const leadCache = (() => {
  try {
    return JSON.parse(localStorage.getItem("dasc-vocacional-lead") || "{}");
  } catch {
    return {};
  }
})();

const state = {
  screen: "step",
  currentStep: 0,
  responses: {},
  results: null,
  lead: {
    name: leadCache.name || "",
    whatsapp: leadCache.whatsapp || "",
    email: leadCache.email || "",
    privacy: false,
  },
  analysisIndex: 0,
  analysisTimer: null,
  analysisTimeout: null,
};

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const getAverage = (values, fallback = 3) =>
  values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : fallback;

const setScrolledState = () => {
  body.dataset.scrolled = window.scrollY > 14 ? "true" : "false";
};

const revealVisibleItems = () => {
  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
};

const scrollToQuiz = () => {
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
  });
};

const clearAnalysis = () => {
  if (state.analysisTimer) {
    clearInterval(state.analysisTimer);
    state.analysisTimer = null;
  }
  if (state.analysisTimeout) {
    clearTimeout(state.analysisTimeout);
    state.analysisTimeout = null;
  }
};

const resetHighlights = () => {
  careerCards.forEach((card) => card.classList.remove("is-highlighted"));
};

const highlightCareer = (careerKey) => {
  resetHighlights();
  const card = document.querySelector(`[data-career-card="${careerKey}"]`);
  if (!card) {
    return;
  }

  card.classList.add("is-highlighted");
  card.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "center",
  });
};

const getWhatsAppLink = (message) => {
  const encoded = encodeURIComponent(message);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`
    : `https://wa.me/?text=${encoded}`;
};

const hideSplashScreen = () => {
  if (!splashScreen) {
    return;
  }

  splashScreen.classList.add("is-hidden");
};

const isStepComplete = (step) =>
  step.items.every((item) => state.responses[item.id] !== undefined);

const applyWeightedMap = (target, source, factor) => {
  if (!source) {
    return;
  }

  Object.entries(source).forEach(([key, value]) => {
    target[key] = (target[key] || 0) + value * factor;
  });
};

const getLeadPayload = (resultsOverride = state.results) => {
  const topCareer = resultsOverride?.ranking?.[0];
  const modality = resultsOverride ? modalities[resultsOverride.modalityKey] : null;

  return {
    submittedAt: new Date().toISOString(),
    lead: {
      name: state.lead.name.trim(),
      whatsapp: state.lead.whatsapp.trim(),
      email: state.lead.email.trim(),
    },
    result: resultsOverride
      ? {
          career: topCareer?.degree || "",
          profile: topCareer?.profile || "",
          modality: modality?.name || "",
          riskLevel: resultsOverride.riskLevel,
          learningProfile: learningProfiles[resultsOverride.learningKey]?.name || "",
          motivator: resultsOverride.motivatorKey,
          signals: resultsOverride.topSignals || [],
          barriers: resultsOverride.barrierFlags || [],
          alternatives: resultsOverride.ranking.slice(1, 3).map((item) => item.degree),
        }
      : null,
  };
};

const sendLeadToWebhook = async (payload) => {
  if (!LEAD_WEBHOOK_URL) {
    return { skipped: true };
  }

  const response = await fetch(LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el lead al webhook.");
  }

  return { skipped: false };
};

const getResults = () => {
  const careerScores = Object.keys(careers).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );
  const modalityScores = Object.keys(modalities).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );
  const modalityContextScores = Object.keys(modalities).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );
  const learningScores = Object.keys(learningProfiles).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );
  const motivationScores = Object.keys(motivationMessages).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );
  const signalScores = Object.keys(signalLabels).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {}
  );

  const confidenceValues = [];
  const expectationValues = [];
  const barrierValues = [];
  const barrierFlags = [];
  let contextRisk = 0;

  steps.forEach((step) => {
    step.items.forEach((item) => {
      const response = state.responses[item.id];
      if (response === undefined) {
        return;
      }

      if (step.type === "scale") {
        const numericValue = Number(response);
        const intensity = Math.max(numericValue - 1, 0);

        applyWeightedMap(careerScores, item.careers, intensity);
        applyWeightedMap(modalityScores, item.modality, intensity);
        applyWeightedMap(learningScores, item.learning, intensity);
        applyWeightedMap(motivationScores, item.motivations, intensity);
        applyWeightedMap(signalScores, item.signals, intensity);

        if (item.scct === "confidence") confidenceValues.push(numericValue);
        if (item.scct === "expectation") expectationValues.push(numericValue);
        if (item.scct === "barrier") {
          barrierValues.push(numericValue);
          if (numericValue >= 4 && item.barrierLabel) barrierFlags.push(item.barrierLabel);
        }
      }

      if (step.type === "choice") {
        const selectedOption = item.options.find((option) => option.value === response);
        if (!selectedOption) return;
        applyWeightedMap(careerScores, selectedOption.careers, 1);
        applyWeightedMap(modalityScores, selectedOption.modality, 1);
        applyWeightedMap(modalityContextScores, selectedOption.modality, 1);
        applyWeightedMap(learningScores, selectedOption.learning, 1);
        contextRisk += selectedOption.risk || 0;
      }
    });
  });

  const worksNow = state.responses.ctx_work;
  const studyHours = state.responses.ctx_hours;
  const studySchedule = state.responses.ctx_schedule;
  const keepWorking = state.responses.ctx_keep_work;
  const selfPaced = Number(state.responses.ped_pace || 0);
  const structured = Number(state.responses.ped_structure || 0);
  const onlineComfort = Number(state.responses.ped_online || 0);
  const practical = Number(state.responses.ped_practical || 0);
  const auditoryLearning =
    Number(state.responses.learn_auditory_explain || 0) +
    Number(state.responses.learn_auditory_discuss || 0);
  const visualLearning =
    Number(state.responses.learn_visual_examples || 0) +
    Number(state.responses.learn_visual_create || 0);

  if (
    worksNow === "no" &&
    (studyHours === "4to6" || studyHours === "6plus") &&
    studySchedule === "weekdays" &&
    keepWorking === "no"
  ) {
    modalityScores.presencial += 6;
    modalityContextScores.presencial += 4;
  }

  if (structured >= 4) {
    modalityScores.presencial += 3;
  }

  if (auditoryLearning >= 8) {
    modalityScores.presencial += 2;
  }

  if (selfPaced >= 4) {
    modalityScores.flexible += 3;
  }

  if (onlineComfort >= 4) {
    modalityScores.flexible += 3;
  }

  if (visualLearning >= 8) {
    modalityScores.flexible += 1;
  }

  if (
    studySchedule === "flex" ||
    (selfPaced >= 4 && onlineComfort >= 4) ||
    (worksNow === "sometimes" && keepWorking !== "no")
  ) {
    modalityScores.flexible += 3;
    modalityContextScores.flexible += 2;
  }

  if (
    worksNow === "yes" ||
    studyHours === "lt2" ||
    keepWorking === "yes"
  ) {
    modalityScores.hyflex += 3;
    modalityContextScores.hyflex += 3;
  }

  if (practical >= 4 && worksNow !== "no") {
    modalityScores.hyflex += 1;
  }

  if (studySchedule === "saturday") {
    modalityScores.hyflex += 2;
    modalityContextScores.hyflex += 2;
  }

  const ranking = Object.entries(careerScores)
    .map(([careerKey, score]) => ({
      careerKey,
      score,
      ...careers[careerKey],
    }))
    .sort((a, b) => b.score - a.score);

  const modalityKey = Object.entries(modalityScores)
    .sort(([keyA, scoreA], [keyB, scoreB]) => {
      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      const contextDelta =
        (modalityContextScores[keyB] || 0) - (modalityContextScores[keyA] || 0);
      if (contextDelta !== 0) {
        return contextDelta;
      }

      return keyA.localeCompare(keyB);
    })[0][0];
  const learningKey = Object.entries(learningScores).sort(([, a], [, b]) => b - a)[0][0];
  const motivatorKey = Object.entries(motivationScores).sort(([, a], [, b]) => b - a)[0][0];
  const topSignals = Object.entries(signalScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([key]) => signalLabels[key]);

  const confidenceAvg = getAverage(confidenceValues, 3);
  const expectationAvg = getAverage(expectationValues, 3);
  const barrierAvg = getAverage(barrierValues, 2);
  const riskIndex =
    (6 - confidenceAvg) * 1.4 +
    (6 - expectationAvg) * 1.0 +
    Math.max(barrierAvg - 1, 0) * 1.6 +
    contextRisk;

  let riskLevel = "low";
  if (riskIndex >= 10) riskLevel = "high";
  else if (riskIndex >= 6.5) riskLevel = "medium";

  return {
    ranking,
    modalityKey,
    learningKey,
    motivatorKey,
    topSignals,
    riskLevel,
    barrierFlags: [...new Set(barrierFlags)].slice(0, 3),
  };
};

const buildScaleRows = (step) =>
  step.items
    .map((item) => {
      const selected = Number(state.responses[item.id] || 0);
      return `
        <div class="scale-row">
          <div class="scale-row__content">
            <p class="scale-row__label">${item.label}</p>
          </div>
          <div class="scale-row__actions">
            ${scaleLabels
              .map(
                (option) => `
                  <button
                    class="scale-option ${selected === option.value ? "is-selected" : ""}"
                    type="button"
                    data-scale-item="${item.id}"
                    data-scale-value="${option.value}"
                    aria-label="${option.label}"
                  >
                    ${option.value}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

const buildChoiceRows = (step) =>
  step.items
    .map((item) => {
      const selected = state.responses[item.id];
      return `
        <div class="choice-block">
          <p class="choice-block__label">${item.label}</p>
          <div class="choice-block__options">
            ${item.options
              .map(
                (option) => `
                  <button
                    class="choice-option ${selected === option.value ? "is-selected" : ""}"
                    type="button"
                    data-choice-item="${item.id}"
                    data-choice-value="${option.value}"
                  >
                    ${option.label}
                  </button>
                `
              )
              .join("")}
          </div>
        </div>
      `;
    })
    .join("");

const buildStepView = () => {
  const step = steps[state.currentStep];
  const progress = Math.round(((state.currentStep + 1) / steps.length) * 100);
  const complete = isStepComplete(step);

  return `
    <section class="quiz-card">
      <div class="quiz-card__body question-layout">
        <div>
          <div class="question-meta">
            <span>${step.block}</span>
            <span class="quiz-meta-copy">${state.currentStep + 1} de ${steps.length}</span>
          </div>
          <div class="progress" aria-hidden="true">
            <span style="width:${progress}%"></span>
          </div>
          <div class="block-heading">
            <h2>${step.title}</h2>
            <p class="quiz-card__copy">${step.subtitle}</p>
          </div>
          ${
            step.type === "scale"
              ? `
                <div class="scale-legend" aria-hidden="true">
                  <span>1 = Nada</span>
                  <span>5 = Mucho</span>
                </div>
              `
              : ""
          }
        </div>
        <div class="${step.type === "scale" ? "scale-group" : "choice-group"}">
          ${step.type === "scale" ? buildScaleRows(step) : buildChoiceRows(step)}
        </div>
        <div class="quiz-card__footer">
          <button class="button button--text ${state.currentStep === 0 ? "is-hidden" : ""}" type="button" data-prev-step>
            Volver
          </button>
          <button class="button button--primary" type="button" data-next-step ${complete ? "" : "disabled"}>
            ${state.currentStep === steps.length - 1 ? "Ver analisis" : "Continuar"}
          </button>
        </div>
      </div>
    </section>
  `;
};

const buildAnalysisView = () => `
  <section class="quiz-card quiz-card--analysis">
    <div class="quiz-card__body">
      <span class="quiz-card__eyebrow">Procesando resultado</span>
      <div class="analysis-visual">
        <div class="analysis-ring" aria-hidden="true"></div>
        <div class="analysis-copy">
          <strong data-analysis-message>${analysisMessages[state.analysisIndex]}</strong>
          <span class="analysis-caption">Cruzando carrera, modalidad, barreras y contexto real.</span>
        </div>
      </div>
      <p class="quiz-card__copy">
        Estamos preparando tu resultado final.
      </p>
    </div>
  </section>
`;

const buildCaptureView = () => {
  const topCareer = state.results.ranking[0];
  const modality = modalities[state.results.modalityKey];
  const risk = riskMessages[state.results.riskLevel];

  return `
    <section class="quiz-card quiz-card--capture">
      <div class="quiz-card__body">
        <span class="quiz-card__eyebrow">Tu resultado esta listo</span>
        <div>
          <h2>Dejanos tus datos para ver tu resultado.</h2>
          <p class="quiz-card__copy">
            Tambien podras solicitar mas informacion de la opcion recomendada.
          </p>
        </div>
        <div class="capture-grid">
          <form class="form-grid" data-lead-form novalidate>
            <div class="field" data-field="name">
              <label for="lead-name">Nombre completo</label>
              <input id="lead-name" name="name" type="text" value="${escapeHtml(state.lead.name)}" placeholder="Ej. Mariana Lopez" />
              <span class="field-error" data-error-for="name"></span>
            </div>
            <div class="field" data-field="whatsapp">
              <label for="lead-whatsapp">WhatsApp</label>
              <input id="lead-whatsapp" name="whatsapp" type="tel" value="${escapeHtml(state.lead.whatsapp)}" placeholder="Ej. 5512345678" />
              <span class="field-error" data-error-for="whatsapp"></span>
            </div>
            <div class="field" data-field="email">
              <label for="lead-email">Correo (opcional)</label>
              <input id="lead-email" name="email" type="email" value="${escapeHtml(state.lead.email)}" placeholder="Ej. nombre@correo.com" />
              <span class="field-error" data-error-for="email"></span>
            </div>
            <label class="checkbox" data-field="privacy">
              <input id="lead-privacy" name="privacy" type="checkbox" />
              <span>
                Acepto el
                <a href="${PRIVACY_NOTICE_URL}" target="_blank" rel="noreferrer">aviso de privacidad</a>
              </span>
            </label>
            <span class="field-error" data-error-for="privacy"></span>
            <div class="quiz-card__footer">
              <button class="button button--text" type="button" data-prev-step-from-capture>Volver</button>
              <button class="button button--primary" type="submit">Ver resultado</button>
            </div>
          </form>
          <aside class="capture-summary">
            <h3>Vas a ver</h3>
            <ul>
              <li>Carrera recomendada: ${topCareer.degree}</li>
              <li>Modalidad sugerida: ${modality.name}</li>
              <li>Nivel de riesgo detectado: ${risk.label}</li>
              <li>Opciones relacionadas</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  `;
};

const buildAlternatives = (items) =>
  items
    .map(
      (item) => `
        <article class="career-match-card">
          <div class="career-match-card__top">
            <strong>${item.degree}</strong>
            <span>${item.profile}</span>
          </div>
          <p>${item.description}</p>
          <a class="button button--text" href="${item.url}">Ver carrera</a>
        </article>
      `
    )
    .join("");

const buildStatusCards = () => {
  const modality = modalities[state.results.modalityKey];
  const learning = learningProfiles[state.results.learningKey];
  const risk = riskMessages[state.results.riskLevel];

  return `
    <div class="status-grid">
      <article class="status-card">
        <span class="status-card__label">Modalidad ideal</span>
        <strong>${modality.name}</strong>
        <p>${modality.description}</p>
      </article>
      <article class="status-card">
        <span class="status-card__label">Como aprendes mejor</span>
        <strong>${learning.name}</strong>
        <p>${learning.description}</p>
      </article>
      <article class="status-card status-card--risk status-card--${state.results.riskLevel}">
        <span class="status-card__label">Riesgo de abandono</span>
        <strong>${risk.label}</strong>
        <p>${risk.description}</p>
      </article>
    </div>
  `;
};

const buildResultView = () => {
  const [topCareer, secondCareer, thirdCareer] = state.results.ranking;
  const modality = modalities[state.results.modalityKey];
  const motivatorMessage = motivationMessages[state.results.motivatorKey];
  const barrierText = state.results.barrierFlags.length
    ? `Puntos a cuidar: ${state.results.barrierFlags.join(", ")}.`
    : "No se detectaron barreras criticas.";
  const supportMessage =
    state.results.riskLevel === "high" || state.results.riskLevel === "medium"
      ? "Una modalidad flexible puede ayudarte a sostener mejor tu avance."
      : "Tu resultado sugiere buen ajuste con la opcion recomendada.";
  const leadName = state.lead.name.trim();
  const intro = leadName
    ? `${leadName}, tu resultado combina ${state.results.topSignals.slice(0, 2).join(" y ").toLowerCase()}.`
    : `Tu resultado combina ${state.results.topSignals.slice(0, 2).join(" y ").toLowerCase()}.`;
  const whatsappMessage = leadName
    ? `Hola, soy ${leadName}. Hice el test vocacional de DASC y mi resultado fue ${topCareer.degree}. Tambien me recomendaron la modalidad ${modality.name}. Me gustaria recibir mas informacion.`
    : topCareer.whatsapp;

  return `
    <section class="quiz-card quiz-card--result">
      <div class="quiz-card__body">
        <span class="quiz-card__eyebrow">Resultado completo</span>
        <div class="result-grid">
          <div class="result-card">
            <p class="result-overline">Tu carrera ideal es:</p>
            <div class="result-profile">
              <h3>${topCareer.degree}</h3>
              <p><strong>Perfil detectado: ${topCareer.profile}</strong></p>
            </div>
            <p>${intro} ${topCareer.description}</p>
            <p>${motivatorMessage}</p>
            <ul class="result-tags">
              ${state.results.topSignals.map((signal) => `<li>${signal}</li>`).join("")}
            </ul>
            <ul class="feature-list">
              ${topCareer.points.map((point) => `<li>${point}</li>`).join("")}
            </ul>
            <div class="result-actions">
              <a class="button button--primary" href="${getWhatsAppLink(whatsappMessage)}" target="_blank" rel="noreferrer">Solicitar informacion por WhatsApp</a>
              <a class="button button--secondary" href="${topCareer.url}">Ver plan de estudios</a>
              <button class="button button--text" type="button" data-restart-quiz">Hacer de nuevo el test</button>
            </div>
          </div>
          <div class="career-match-card">
            <div class="career-match-card__top">
              <strong>Modalidad y contexto</strong>
              <span>${modality.name}</span>
            </div>
            <p>${topCareer.sales}</p>
            <p>${barrierText}</p>
            <p>${supportMessage}</p>
            <ul class="feature-list">
              ${topCareer.next.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
        </div>
        ${buildStatusCards()}
        <div>
          <p class="result-overline">Otras opciones cercanas</p>
          <div class="result-grid">
            ${buildAlternatives([secondCareer, thirdCareer].filter(Boolean))}
          </div>
        </div>
      </div>
    </section>
  `;
};

const render = () => {
  if (!quizStage) return;
  if (state.screen === "step") {
    quizStage.innerHTML = buildStepView();
    return;
  }
  if (state.screen === "analysis") {
    quizStage.innerHTML = buildAnalysisView();
    clearAnalysis();
    state.analysisIndex = 0;
    state.analysisTimer = window.setInterval(() => {
      state.analysisIndex = (state.analysisIndex + 1) % analysisMessages.length;
      const target = document.querySelector("[data-analysis-message]");
      if (target) target.textContent = analysisMessages[state.analysisIndex];
    }, 900);
    state.analysisTimeout = window.setTimeout(() => {
      clearAnalysis();
      state.screen = "capture";
      render();
    }, 2500);
    return;
  }
  if (state.screen === "capture") {
    quizStage.innerHTML = buildCaptureView();
    const privacyInput = quizStage.querySelector("#lead-privacy");
    if (privacyInput) privacyInput.checked = state.lead.privacy;
    return;
  }
  if (state.screen === "result") {
    quizStage.innerHTML = buildResultView();
  }
};

const showErrors = (errors) => {
  ["name", "whatsapp", "email", "privacy"].forEach((key) => {
    const field = quizStage.querySelector(`[data-field="${key}"]`);
    const target = quizStage.querySelector(`[data-error-for="${key}"]`);
    if (field) field.classList.toggle("is-error", Boolean(errors[key]));
    if (target) target.textContent = errors[key] || "";
  });
};

const validateLead = (formData) => {
  const errors = {};
  const name = formData.get("name").trim();
  const whatsapp = formData.get("whatsapp").trim();
  const email = formData.get("email").trim();
  const privacy = formData.get("privacy") === "on";
  const whatsappDigits = whatsapp.replace(/\D/g, "");
  if (name.length < 3) errors.name = "Escribe tu nombre completo para continuar.";
  if (whatsappDigits.length < 10 || whatsappDigits.length > 15) {
    errors.whatsapp = "Ingresa un WhatsApp valido.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Revisa el formato del correo.";
  if (!privacy) errors.privacy = "Necesitas aceptar el aviso de privacidad.";
  return errors;
};

document.addEventListener("click", (event) => {
  const launch = event.target.closest("[data-launch-quiz], [data-start-quiz]");
  const scaleOption = event.target.closest("[data-scale-item]");
  const choiceOption = event.target.closest("[data-choice-item]");
  const nextStep = event.target.closest("[data-next-step]");
  const prevStep = event.target.closest("[data-prev-step]");
  const prevCapture = event.target.closest("[data-prev-step-from-capture]");
  const restart = event.target.closest("[data-restart-quiz]");
  const viewCareer = event.target.closest("[data-view-career]");

  if (launch) {
    clearAnalysis();
    resetHighlights();
    hideSplashScreen();
    state.screen = "step";
    state.currentStep = 0;
    state.responses = {};
    state.results = null;
    scrollToQuiz();
    render();
    return;
  }

  if (scaleOption) {
    state.responses[scaleOption.dataset.scaleItem] = Number(scaleOption.dataset.scaleValue);
    render();
    return;
  }

  if (choiceOption) {
    state.responses[choiceOption.dataset.choiceItem] = choiceOption.dataset.choiceValue;
    render();
    return;
  }

  if (nextStep) {
    const step = steps[state.currentStep];
    if (!isStepComplete(step)) return;
    if (state.currentStep === steps.length - 1) {
      state.results = getResults();
      state.screen = "analysis";
      render();
      return;
    }
    state.currentStep += 1;
    render();
    return;
  }

  if (prevStep) {
    state.currentStep = Math.max(0, state.currentStep - 1);
    render();
    return;
  }

  if (prevCapture) {
    state.screen = "step";
    state.currentStep = steps.length - 1;
    render();
    return;
  }

  if (restart) {
    clearAnalysis();
    resetHighlights();
    state.screen = "step";
    state.currentStep = 0;
    state.responses = {};
    state.results = null;
    render();
    scrollToQuiz();
    return;
  }

  if (viewCareer) {
    highlightCareer(viewCareer.dataset.viewCareer);
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target.closest("[data-lead-form]");
  if (!form) return;

  event.preventDefault();
  const formData = new FormData(form);
  const errors = validateLead(formData);
  showErrors(errors);
  if (Object.keys(errors).length > 0) return;

  state.lead = {
    name: formData.get("name").trim(),
    whatsapp: formData.get("whatsapp").trim(),
    email: formData.get("email").trim(),
    privacy: formData.get("privacy") === "on",
  };

  try {
    localStorage.setItem(
      "dasc-vocacional-lead",
      JSON.stringify({
        name: state.lead.name,
        whatsapp: state.lead.whatsapp,
        email: state.lead.email,
      })
    );
  } catch {}

  try {
    await sendLeadToWebhook(getLeadPayload());
  } catch (error) {
    console.error(error);
  }

  state.screen = "result";
  render();
});

setScrolledState();
window.addEventListener("scroll", setScrolledState, { passive: true });
revealVisibleItems();
render();
