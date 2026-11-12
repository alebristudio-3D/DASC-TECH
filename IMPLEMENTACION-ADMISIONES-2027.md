# Mejoras de admisiones — 12 de noviembre de 2026

## Implementado

- Admisiones: proceso, consulta de requisitos/costos y formulario de visita o sesión informativa con fecha preferida, nunca reserva confirmada.
- Test: formulario obligatorio, evaluación local equivalente al motor existente y mensaje de ejemplo para WhatsApp. Resultado visible después de completar formulario; enlace alternativo si se bloquea la ventana. No se verifica ni afirma envío.
- Comparador de hasta tres carreras, enlace compartible y guardado voluntario en el dispositivo, con borrado.
- Ficha de carrera para compartir e imprimir como PDF.
- Catálogo en `assets/data/programas.json`, tomado de páginas existentes. Requiere validación académica antes de lanzamiento oficial.
- Cabecera y pie en `partials/`. Ejecutar `node scripts/build-shared.cjs` después de actualizarlos: genera HTML estático, accesible sin depender de cargar el menú con JavaScript.
- Accesos en las seis carreras hacia admisiones, ficha y comparación.
- Eventos sin nombres, correos o respuestas individuales. La analítica externa permanece desactivada sin configuración aprobada.

## Conexiones posteriores

1. Validar nombres, RVOE, duración, requisitos, fechas, costos y disponibilidad con DASC.
2. Configurar `DASC_ADMISSIONS.endpoint` con el servicio real. El test conserva la ruta `/vocacional`; debe recibir `{id,result}`. Revisar este contrato al implementar el servicio.
3. La visita actual prepara WhatsApp. Para reservas reales integrar agenda, disponibilidad, confirmación y reprogramación; todavía no existen reservas ni recordatorios automáticos.
4. Para analítica configurar `window.DASC_ANALYTICS_ID` y habilitar `window.DASC_ANALYTICS_CONSENT` solo cuando corresponda. Validar recepción de eventos. `dataLayer` por sí solo no envía datos.
5. Integrar conversación recibida, visita realizada e inscripción pagada desde admisiones/CRM; no inferir esos hechos desde clics.
6. Mantener la versión de prueba sin indexar y revisar dominio, sitemap y canonical para el lanzamiento.

No se envían pruebas al WhatsApp institucional durante la validación automática.
