# Revisión visual, privacidad y pendientes — 13 de noviembre de 2026

## Corregido en la copia local

- Contraste por componente: llamadas a la acción, tarjetas de inicio, beneficios HyFlex, posgrados, becas, Educación Continua y plan de Diseño. Se retiraron colores negros incrustados dentro de esos bloques; las superficies ahora definen fondo y texto conjuntamente.
- Botones de consulta que antes decían «Registrarme» sin registrar nada.
- Horarios generales sin validación retirados de las dos páginas HyFlex; se solicita confirmar el horario por programa.
- Preferencias de privacidad: necesarias, analítica y vídeos; rechazo accesible, edición posterior, caducidad de 180 días, retirada y borrado del comparador.
- Analítica requiere permiso del visitante además de la configuración institucional. No se reproducen eventos acumulados antes del permiso. Al retirarlo se desactiva, se eliminan cookies analíticas accesibles y se recarga para descargar el proveedor.
- Vídeos bloqueados hasta recibir permiso; dominio de YouTube con modo de privacidad. Retirar el permiso elimina los reproductores.
- Fuentes Montserrat y FullCalendar locales, con licencias. Eliminadas las importaciones remotas de fuentes.
- Eliminado el guardado antiguo de nombre, correo y teléfono del test; se borra también la clave heredada en esta versión.
- Información de privacidad junto a formularios y confirmación requerida en formularios de contacto heredados.
- Descripción precisa de WhatsApp: abrir una URL con el texto ya lo comunica al servicio; enviarlo al destinatario es un paso posterior.

## Aviso institucional revisado

Fuente consultada: https://dasc.edu.mx/aviso-de-privacidad/ (13/11/2026). Incluye ARCO, revocación, transferencias, menores y cookies. No se modificó esa página externa.

Antes de actualizarlo, DASC debe validar:

1. La razón social responsable y el canal ARCO vigente; evitar asumir que el nombre comercial identifica por sí solo a la persona jurídica.
2. Inventario concreto de cookies, almacenamiento, proveedores, finalidades y plazos, sustituyendo la descripción genérica.
3. Tratamiento real de datos del test, WhatsApp y futuros servicios de registro; separar consulta solicitada y promoción opcional.
4. Procedimientos de autorización para imagen, salud y biométricos; no apoyarlos únicamente en aceptación general del aviso.
5. Cómo se acredita la representación de menores y cómo se les ofrece una explicación adecuada.
6. Conservación, supresión y accesos reales en los sistemas institucionales; no prometer políticas que todavía no se ejecutan.
7. Fecha y versión del aviso; comunicar cambios relevantes.

La información local de privacidad describe el funcionamiento técnico verificado y enlaza al aviso institucional; no pretende reemplazarlo.

## Marco consultado

Ley Federal de Protección de Datos Personales en Posesión de los Particulares, texto consultado en Cámara de Diputados: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf . Los artículos 7–8 tratan consentimiento y datos sensibles; 14–16, información y aviso; 18, seguridad; y 31, plazos ARCO. La publicación definitiva del aviso requiere validar su correspondencia con las operaciones reales.

## Lo que falta para lanzamiento

| Prioridad | Pendiente | Evidencia de cierre |
|---|---|---|
| Alta | Validar razón social, canal ARCO, tratamiento de menores y autorización de las prácticas declaradas | Aviso institucional aprobado y procedimiento operativo |
| Alta | Configurar registro/CRM y seguridad del servicio si se quiere recepción automática | Solicitud de prueba recibida, control de accesos y borrado comprobados |
| Alta | Confirmar RVOE, modalidades, planes de posgrado, precios, horarios, fechas y disponibilidad | Catálogo firmado o autorizado por las áreas responsables |
| Alta | Unificar teléfonos institucionales | El aviso público y el prototipo muestran contactos diferentes; asignar canales por área |
| Media | Validar calendarios y becas vigentes | Fuente, fecha de actualización y contacto responsable |
| Media | Evidencia de instalaciones, docentes, proyectos y testimonios | Material real y autorizaciones de uso |
| Media | Medición comercial hasta inscripción con pago confirmado | Datos del CRM; no inferirlo desde clics |
| Media | Configurar proveedor analítico e inventario real | ID aprobado, permisos probados y cookies/duración documentadas |
| Media | Publicación final y SEO | Dominio, HTTPS, canonical, sitemap y decisión de indexación verificadas |

## Límites de la validación

- 46 páginas comprobadas: enlaces, anclas, recursos locales y sintaxis JavaScript sin incidencias detectadas.
- 44 páginas recorridas a 1280 px y a 390 px, con comprobación de desbordamiento y errores de JavaScript; se excluyen los dos accesos que redirigen a sistemas externos.
- 16 comprobaciones de privacidad aprobadas: rechazo, permiso, retirada, persistencia, caducidad, borrado, teclado, bloqueo de vídeos y analítica, y almacenamiento deshabilitado.
- Inspección visual adicional de HyFlex, posgrados, Diseño y Reglamento. Corregidos errores de puntuación en tres encabezados.

La revisión automática de contraste calcula colores y degradados; no reemplaza comprobar imágenes, estados interactivos y todos los navegadores. Se realizan capturas y comprobaciones funcionales adicionales. No se afirma certificación de accesibilidad ni cumplimiento legal integral.

El equipo de prueba inyecta una conexión de Kaspersky; se distingue de las solicitudes originadas por el código de la web. Las pruebas de privacidad interceptan terceros y no envían mensajes ni eventos reales a proveedores.
