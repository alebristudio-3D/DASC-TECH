# Sistema visual compartido

Actualización: 12 noviembre 2026.

La capa css/unified-system.css se carga al final para normalizar tipografía, contenedores, espaciado, botones, formularios, tarjetas y navegación. tech-campus.css conserva la dirección visual tecnológica.

Las nueve páginas de programas comparten unified-hero y unified-local-nav, con título, nivel, resumen, duración, RVOE y acciones equivalentes. El color de acento distingue programas sin cambiar el componente. Se retiran las cabeceras internas duplicadas y las precargas de imagen que ya no se utilizan.

Cabecera y pie institucionales siguen en partials/. Ejecutar node scripts/build-shared.cjs después de editarlos. El aviso de demostración se conserva y los campos simulados no se presentan como información oficial.

Verificación: 22 páginas en móvil, filtros, comparación, selección de maestría y formularios; captura de escritorio del nuevo encabezado. No se enviaron mensajes al equipo.

## Corrección de composición global

Se migraron 33 portadas adicionales al mismo componente institucional. Las 43 páginas raíz comparten una única cabecera y pie; inicio conserva su explorador como variante de la misma composición. Nosotros, contacto, HyFlex y servicios ya no utilizan sus portadas anteriores. Se normalizan fondos, anchuras, tarjetas y llamadas a la acción; se elimina la superposición del bloque de confianza de Nosotros. El orientador independiente recibe la navegación y estilos institucionales sin cambiar su cuestionario.

Mantenimiento: npm ci y npm run sync:shell. El generador usa linkedom fijado a 0.18.9.

Validación: 40 páginas en 390 y 1440 px, sin errores JavaScript ni desbordamiento; 43 páginas raíz con título único, portada y anclas internas verificadas. Pruebas de filtros y formularios mantenidas sin enviar mensajes.
