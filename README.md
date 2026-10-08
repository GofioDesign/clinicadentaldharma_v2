# Clínica Dental Dharma · web v2

Nueva versión de [clinicadentaldharma.com](https://clinicadentaldharma.com): HTML y CSS sin WordPress, sin plantillas de Divi y sin herramientas de compilación. Cada página es un `index.html` que se puede abrir y editar a mano.

## Qué cambia respecto a la versión anterior

**Más ligera**
- Portada de 156 KB de HTML a 23 KB, y unos 160 KB en total en móvil (antes solo el vídeo de portada pesaba 4 MB).
- Una sola hoja de estilos (`css/estilos.css`), 3 archivos de fuente y casi nada de JavaScript.
- Imágenes en WebP con dos tamaños; el móvil descarga la pequeña.
- El mapa de Google solo se carga si el visitante pulsa «Ver mapa aquí».
- Se quitan el vídeo de portada y el selector de idioma (GTranslate), que eran lo más pesado.
- Lighthouse en local: 99–100 en rendimiento y 100 en accesibilidad, buenas prácticas y SEO.

**Más orientada a pedir cita**
- Botón «Pedir cita» siempre visible en la cabecera, y teléfono en escritorio. Ahora lleva a WhatsApp; se cambia en una sola línea (ver más abajo).
- En móvil, barra fija abajo con *Llamar*, *WhatsApp* y *Pedir cita*.
- Cada tratamiento abre con su botón de reserva, tiene un recuadro lateral de cita, un bloque final «Da el primer paso» y enlaces a otros tratamientos.
- El botón verde de WhatsApp abre con un mensaje ya escrito que dice el tratamiento («Hola, me gustaría pedir cita… para dentosofía»).
- Política de privacidad enlazada en el pie de todas las páginas.
- Portada con razones para confiar (25 años, sin tóxicos, sin metal, equipo completo), pasos de la primera visita y preguntas frecuentes.
- Datos estructurados de Google (clínica dental, horario, dirección, preguntas frecuentes) para que salgan en el buscador y en Maps.

Las direcciones de las páginas son las mismas que en la web actual, para no perder posicionamiento.

## Estructura

```
index.html                    portada
tratamientos/index.html       listado de tratamientos (tarjetas)
dentosofia/index.html …       una carpeta por tratamiento
_plantilla-articulo/          plantilla para páginas nuevas (no se indexa)
js/cita.js                    a dónde llevan los botones de cita (una sola línea)
politica-de-privacidad/       política de privacidad (falta añadir el NIF)
css/estilos.css               todos los estilos
img/                          imágenes, logos e iconos
fonts/                        Crimson Text y Poppins (licencia OFL)
404.html, sitemap.xml, robots.txt
```

## Añadir una página nueva

### 1. Copia la plantilla

Duplica la carpeta `_plantilla-articulo/` y ponle el nombre que tendrá la dirección: minúsculas, sin tildes ni eñes, con guiones. Por ejemplo `bruxismo-y-estres/` → `https://clinicadentaldharma.com/bruxismo-y-estres/`.

La carpeta va en la raíz, al lado de `dentosofia/`. Si la metes en otra subcarpeta se rompen las rutas de estilos e imágenes.

### 2. Edita su `index.html`

Busca `EDITAR` en el archivo: cada comentario dice qué cambiar.

- `<title>`, `description`, `og:title` y `og:description`: título y resumen para Google.
- `canonical` y `og:url`: cambia `NOMBRE-DE-LA-CARPETA` por el nombre de la carpeta.
- `robots`: cambia `noindex, nofollow` por `index, follow` cuando esté lista. Si no, Google no la mostrará.
- Migas, `<h1>` y entradilla.
- Imagen principal.
- El texto, dentro de `<article class="texto">`. Puedes usar `<p>`, `<h2>`, `<h3>`, listas `<ul><li>`, `<strong>`, enlaces e imágenes.

**Imágenes**: guárdalas en `img/`, de unos 960 px de ancho, en WebP o JPG (en [squoosh.app](https://squoosh.app) se convierten a WebP). En cada `<img>` cambia `src` (empezando por `../img/`), `width` y `height` (el tamaño real en píxeles) y `alt` (qué se ve en la foto).

### 3. Añade su tarjeta en «Tratamientos»

En `tratamientos/index.html`, dentro de `<div class="tarjetas">`, copia una tarjeta entera (desde `<a class="tarjeta"` hasta su `</a>`) y pégala donde quieras que aparezca. Cambia el enlace, la imagen, el título y el texto:

```html
<a class="tarjeta" href="../bruxismo-y-estres/">
  <img src="../img/bruxismo.webp" width="960" height="640" alt="" loading="lazy">
  <span class="tarjeta__texto"><h2>Bruxismo y estrés</h2><p>Una frase corta que explique qué es.</p><span class="tarjeta__mas">Ver tratamiento →</span></span>
</a>
```

Si también la quieres en la portada, haz lo mismo en el `index.html` de la raíz, con estas diferencias: el enlace sin `../` (`href="bruxismo-y-estres/"`), la imagen sin `../` (`src="img/bruxismo.webp"`) y el título con `<h3>` en vez de `<h2>`.

El menú de arriba no lista los tratamientos uno a uno (lleva a la página «Tratamientos»), así que **no hay que tocar las demás páginas**.

### 4. Añádela al sitemap

En `sitemap.xml`, antes de `</urlset>`:

```xml
  <url><loc>https://clinicadentaldharma.com/bruxismo-y-estres/</loc></url>
```

### 5. Revisa y publica

```sh
python -m http.server 8000      # y abre http://localhost:8000/bruxismo-y-estres/
git add -A
git commit -m "Nueva página: Bruxismo y estrés"
git push
```

## Cambiar a dónde llevan los botones de cita

Todos los botones «Reservar cita» y «Pedir cita» de la web toman su dirección de `js/cita.js`. Ahora mismo llevan a WhatsApp con el mensaje «Hola, quiero pedir una cita.».

Para cambiarlo en toda la web, abre `js/cita.js` y cambia solo la línea `var CITA_URL = '…';`. Por ejemplo, cuando Calendly vuelva a funcionar:

```js
var CITA_URL = 'https://calendly.com/clinicadentaldharma/consulta';
```

No hay que tocar ninguna página. (En el HTML los botones llevan el WhatsApp como dirección de reserva, por si el navegador no carga el JS.)

En una página nueva, para que un botón use esta dirección, añádele `data-cita`: `<a class="boton boton--cita" href="…" data-cita>`. La plantilla ya lo trae.

## Cambiar el horario o el teléfono

Estos datos están repetidos en todas las páginas. En VS Code, usa *Buscar en archivos* (Ctrl+Mayús+H) y *Reemplazar todo*:

| Dato | Busca | Dónde aparece |
| --- | --- | --- |
| Horario de lunes a jueves | `9:00 – 19:00` | tabla de horario y pie |
| Horario del viernes | `9:00 – 13:00` | tabla de horario y pie |
| Teléfono fijo | `822 70 90 25` y `+34822709025` | texto y enlaces `tel:` |
| Móvil / WhatsApp | `617 87 86 81`, `+34617878681` y `34617878681` | texto, `tel:` y `wa.me` |

El horario también está en los datos para Google del `index.html` de la raíz (`"opens": "09:00", "closes": "19:00"`): cámbialo allí a mano.

## Publicar en GitHub Pages

*Settings → Pages → Deploy from a branch → `main` / `(root)`*.

Mientras se prueba, la web se ve en `https://gofio-design.github.io/clinicadentaldharma_v2/` (la página de error 404 solo se verá bien con el dominio propio).

Para usar el dominio: en *Settings → Pages → Custom domain* escribe `clinicadentaldharma.com` (GitHub crea el archivo `CNAME`) y apunta el DNS del dominio a GitHub Pages. Marca *Enforce HTTPS* cuando esté disponible.

## Ver en local

```sh
python -m http.server 8000
```

y abre <http://localhost:8000>.
