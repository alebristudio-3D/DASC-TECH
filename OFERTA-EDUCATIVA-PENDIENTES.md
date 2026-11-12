# Oferta educativa: entrega y datos pendientes

Actualización: 12 de noviembre de 2026.

## Entregado

- Orientación específica para seis licenciaturas/ingenierías y tres maestrías, con preguntas relevantes para cada programa.
- Solicitud de muestra académica por programa, sin presentar proyectos ficticios como evidencias existentes.
- Posgrados integrados a catálogo, comparación, ficha compartible y solicitudes de admisión.
- Comparación de nivel, enfoque y datos publicados; el catálogo no sustituye documentación oficial.
- Corrección de la descripción del test: explora carreras de distintas áreas, no determina un estilo fijo ni restringe resultados a DASC.
- Clasificación explícita de áreas para los filtros, evitando coincidencias accidentales por palabras.
- Diez fichas individuales de curso y acceso desde el catálogo de Educación Continua.
- Rutas de consulta de apertura, solicitud de aviso y capacitación empresarial.
- Formulario empresarial con objetivo, participantes, periodo y formato deseado.

Todos los formularios nuevos preparan WhatsApp como ejemplo. No registran listas de espera, reservan fechas, confirman grupos, cotizan ni envían correos. El usuario debe enviar el mensaje en WhatsApp. Se preservó el número de Educación Continua utilizado por el catálogo original; confirmar su vigencia antes de publicar.

## Validación necesaria antes del lanzamiento oficial

| Responsable sugerido | Información requerida |
|---|---|
| Coordinación académica | Nombre oficial, RVOE y modalidad aplicables a cada programa |
| Posgrados | Duración, materias por periodo, requisitos de ingreso y opciones/requisitos de obtención de grado |
| Cada coordinación | Proyectos, demostraciones y testimonios autorizados; autoría y contexto |
| Educación Continua | Temario, nivel, requisitos, equipo, horas/sesiones, modalidad, constancia, próximas aperturas y contacto |
| Administración/admisiones | Precios, cargos adicionales, apoyos, condiciones, fechas y disponibilidad |

Los datos no confirmados se solicitan al equipo en el sitio; no se publican valores estimados. Los ejes de posgrado se conservan como explicación del enfoque y se invita a solicitar el plan oficial.

## Evidencia a reunir

- Administración: caso de negocio y uso de sistemas de información.
- Mercadotecnia: investigación, campaña, piezas y evaluación, identificando simulaciones.
- Diseño: portafolio de interfaces, animación y experiencias interactivas.
- Sistemas: red, infraestructura o seguridad con pruebas.
- Software: aplicación con requisitos, desarrollo y pruebas.
- Industrial: diagnóstico, indicadores y evaluación de mejora.
- Posgrados: casos autorizados de decisión, calidad/productividad y gestión de proyectos TI.

No se publicaron trabajos ni testimonios nuevos porque no se proporcionaron materiales autorizados. La solicitud de muestra permite consultar disponibilidad sin asegurar su existencia.

## Mantenimiento

- Programas y posgrados: `assets/data/programas.json` alimenta herramientas de admisiones, comparación y ficha.
- Cursos: `assets/data/cursos.json` documenta el catálogo; las fichas actuales son HTML estático y sus cambios editoriales deben mantenerse consistentes con ese archivo.
- Cabecera y pie: actualizar `partials/` y ejecutar `node scripts/build-shared.cjs`.
- `scripts/upgrade-offer.cjs` es una migración editorial ya aplicada, protegida contra ejecución repetida.
- Para publicar evidencia real, reemplazar solicitudes genéricas de muestra con fichas de proyecto revisadas, manteniendo su procedencia y autorización.

## Comprobación realizada

22 páginas visitadas en navegador a 390 × 844, sin errores de JavaScript ni desbordamiento horizontal detectado. Comprobados filtros de maestrías/tecnología, preselección de posgrado en admisiones, comparación de las tres maestrías y mensajes de curso/empresa con WhatsApp interceptado sin envío. Revisión de enlaces locales sin destinos inexistentes. No equivale a auditoría de accesibilidad ni validación de datos institucionales.
