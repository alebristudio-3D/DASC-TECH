# Sistema visual compartido

Actualización: 12 noviembre 2026.

La capa css/unified-system.css se carga al final para normalizar tipografía, contenedores, espaciado, botones, formularios, tarjetas y navegación. tech-campus.css conserva la dirección visual tecnológica.

Las nueve páginas de programas comparten unified-hero y unified-local-nav, con título, nivel, resumen, duración, RVOE y acciones equivalentes. El color de acento distingue programas sin cambiar el componente. Se retiran las cabeceras internas duplicadas y las precargas de imagen que ya no se utilizan.

Cabecera y pie institucionales siguen en partials/. Ejecutar node scripts/build-shared.cjs después de editarlos. El aviso de demostración se conserva y los campos simulados no se presentan como información oficial.

Verificación: 22 páginas en móvil, filtros, comparación, selección de maestría y formularios; captura de escritorio del nuevo encabezado. No se enviaron mensajes al equipo.
