# Mejoras de experiencia — 12 de noviembre de 2026

Aplicadas sobre el head del PR 1: `81424a91e44d40fc5650e367892e13e224626abd`.
Preparadas localmente; no publicadas ni enviadas a GitHub.

## Cambios

- RVOE de maestría TI recuperado (`20242489`) en catálogo y resumen. Corregida también la extracción de la migración editorial.
- Planes de estudio en superficie clara con texto oscuro; eliminadas las correcciones negras incrustadas de los paneles afectados.
- Nueve programas con recorrido de decisión: interés, muestra académica que se puede solicitar y condiciones por confirmar; accesos a plan, comparación, ficha y admisiones.
- Retirados bloques de proyectos ficticios y datos académicos/comerciales simulados. El catálogo deja de mostrar precios, ingresos, horarios y duraciones de maestría inventados.
- Comparación con enfoque y muestra que se puede solicitar. En móvil, cada aspecto identifica los programas sin obligar a desplazarse horizontalmente. Guardado y borrado siguen siendo voluntarios y locales.
- Resumen sin desbordamiento de RVOE; controles de selección visibles; ficha imprimible; enlace para saltar al contenido; foco de menú restaurado al cerrar con Escape; estilos de movimiento reducido.
- Contacto flotante con contexto de la carrera. Los formularios siguen preparando WhatsApp y requieren que el visitante envíe el mensaje. No confirman citas ni pagos.
- Clics medibles sin incluir parámetros del mensaje, nombres ni correos en la URL registrada. Proveedor externo de analítica sigue desactivado sin configuración y consentimiento.
- Carga diferida y decodificación asíncrona de imágenes de contenido; eliminadas importaciones duplicadas de Montserrat. Conservados SEO en HTML, azul `#003399` y acentos por programa.
- Alternativas sin JavaScript en las herramientas de admisión, ficha y comparación.

## Validación

- `npm run check:site`: 44 páginas, enlaces/archivos/anclas locales y sintaxis JavaScript.
- Navegador: 16 rutas a 390 y 1280 px; sin desbordamiento horizontal ni errores de JavaScript en esas visitas.
- Quince comprobaciones funcionales: comparación, límite de tres, guardado/borrado, preselección, mensaje preparado, menú y foco, navegación de plan con flechas, RVOE, impresión y URL de analítica sin mensajes.
- Formularios probados interceptando la apertura de WhatsApp; no se enviaron mensajes.
- No es una certificación de accesibilidad ni una puntuación Lighthouse. No se midieron mejoras de conversión.

## Pendiente institucional

- Validar oficialmente nombres, acuerdos RVOE, modalidades y duración antes del lanzamiento.
- Proporcionar precios, fechas, disponibilidad, requisitos y planes de posgrado vigentes.
- Autorizar proyectos, fotografías y testimonios reales para sustituir solicitudes genéricas de evidencia.
- Conectar recepción/agenda, CRM, confirmación de pago e inscripción. Un clic o mensaje preparado no equivale a conversión.
- Configurar dominio/indexación y analítica aprobada en la publicación final. Se conserva la configuración de no indexar del prototipo.

No se integraron proveedores, agendas ni automatizaciones sin acceso o datos reales.
