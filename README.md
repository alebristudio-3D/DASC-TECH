# DASC NEW WEB

Sitio estático completo HTML/CSS/JS para DASC Instituto Tecnológico Universitario.

## Ejecutar localmente

```bash
python -m http.server 8000
```

Abrir: http://localhost:8000

## Estructura

- Páginas HTML independientes listas para GitHub Pages.
- Menú institucional responsive con submenús de Oferta educativa y Alumnos.
- Estilos principales en `css/site.css`.
- Comportamiento y medición en `js/site.js`.
- Documentos públicos en `assets/documents/`.

## Medición

Reemplazar placeholders en los HTML o definir antes de `js/site.js`:

- `G-XXXXXXXXXX`
- `GTM-XXXXXXX`

Eventos incluidos: `click_whatsapp`, `click_link`, `submit_lead_form`.

## Accesos externos

- Aula Virtual: https://dasc.edu.mx/avirtual/login/index.php
- Consulta de calificaciones: https://dasc.edu.mx/integra/
