EVERYTHING ALPACA – CORPORATE WEBSITE
====================================

Proyecto web corporativo de Everything Alpaca.
Desarrollado en React con enfoque en performance, diseño visual, animaciones suaves
y soporte multilenguaje completo (i18n).

Este documento describe la estructura, componentes y reglas del proyecto
para futuros desarrolladores.


----------------------------------------------------------------------
1. DESCRIPCIÓN GENERAL
----------------------------------------------------------------------

Este sitio web cumple funciones institucionales y comerciales:

- Presentación de marca Everything Alpaca
- Categorías principales de productos
- Productos destacados
- Información corporativa (Visión, Misión, Servicios, Wholesale)
- Página de sostenibilidad
- Enlaces directos a la tienda online oficial
- Soporte para 4 idiomas

El sitio NO es un e-commerce propio.
Funciona como sitio corporativo + vitrina visual, enlazando a la tienda oficial.


----------------------------------------------------------------------
2. TECNOLOGÍAS UTILIZADAS
----------------------------------------------------------------------

- React (Vite)
- React Router DOM
- react-i18next (internacionalización)
- Framer Motion (animaciones)
- CSS puro (sin frameworks)
- Lucide React (iconos)
- HTML5 / CSS3 / JavaScript ES6


----------------------------------------------------------------------
3. IDIOMAS SOPORTADOS
----------------------------------------------------------------------

Idiomas disponibles:

- Inglés (en)
- Español (es)
- Alemán (de)
- Italiano (it)

IMPORTANTE:
- Las traducciones usan claves (keys) fijas.
- NO cambiar nombres de keys.
- Solo modificar los textos (values).
- Si una key no existe, el texto NO se traducirá.


----------------------------------------------------------------------
4. ESTRUCTURA DE CARPETAS
----------------------------------------------------------------------

src/
|
|-- components/
|   |-- Navbar.jsx
|   |-- Footer.jsx
|   |-- Carousel.jsx
|   |-- Sections.jsx
|   |-- Products.jsx
|
|-- pages/
|   |-- Services.jsx
|   |-- Wholesale.jsx
|   |-- Us.jsx
|   |-- SustainabilityPage.jsx
|
|-- styles/
|   |-- navbar.css
|   |-- footer.css
|   |-- carousel.css
|   |-- sections.css
|   |-- products.css
|   |-- services.css
|   |-- wholesale.css
|   |-- us.css
|   |-- sustainability-page.css
|
|-- i18n/
|   |-- en.json
|   |-- es.json
|   |-- de.json
|   |-- it.json
|
|-- App.jsx
|-- main.jsx


----------------------------------------------------------------------
5. COMPONENTES PRINCIPALES
----------------------------------------------------------------------

5.1 Navbar
----------
Archivo: components/Navbar.jsx

Funciones:
- Navegación principal
- Dropdown de categorías
- Dropdown "US"
- Selector de idioma
- Menú responsive móvil
- Traducciones dinámicas

Usa claves:
- nav.*
- categories.*
- us.*


5.2 Carousel (Hero principal)
-----------------------------
Archivo: components/Carousel.jsx

Funciones:
- Slides animados
- Autoplay
- Loop infinito sin saltos
- Hover pausa autoplay
- Enlaces a productos específicos

No usa i18n actualmente (textos fijos).


5.3 Sections (Categorías principales)
-------------------------------------
Archivo: components/Sections.jsx

Muestra:
- Women
- Men
- Accessories

Comportamiento:
- Desktop: 3 columnas
- Mobile: 3 bloques verticales
- No es carrusel

Claves usadas:
- categories.women
- categories.men
- categories.accessories


5.4 Products (Productos destacados)
-----------------------------------
Archivo: components/Products.jsx

Funciones:
- Carrusel avanzado
- Drag + autoplay
- Hover con cambio de imágenes
- Precarga de imágenes (sin lag)
- Títulos traducidos por ID

Claves usadas:
- products.featuredTitle
- products.featuredSubtitle
- products.items.[productId]


5.5 Footer
----------
Archivo: components/Footer.jsx

Incluye:
- Logo
- Descripción institucional
- Redes sociales
- Links legales
- Copyright

Claves usadas:
- footer.description
- footer.rights
- footer.links.*


----------------------------------------------------------------------
6. PÁGINAS
----------------------------------------------------------------------

6.1 Services
------------
Archivo: pages/Services.jsx

Contenido:
- Hero con video
- Descripción de servicios
- 4 bloques de servicio
- CTA de contacto

Claves:
- pages.services.*


6.2 Wholesale
-------------
Archivo: pages/Wholesale.jsx

Contenido:
- Hero con video
- Programas para retailers
- Precios por volumen
- Soporte

Claves:
- pages.wholesale.*


6.3 Us (Vision & Mission)
------------------------
Archivo: pages/Us.jsx

Contenido:
- Hero
- About Us
- Mission
- Vision
- Información de contacto

Nota:
- El botón de contacto fue eliminado por decisión UX.

Claves:
- pages.us.*


6.4 Sustainability
------------------
Archivo: pages/SustainabilityPage.jsx

Contenido:
- Hero visual
- Enfoque sostenible
- Carrusel lateral automático
- Compromisos de la empresa

Claves:
- pages.sus.*


----------------------------------------------------------------------
7. SISTEMA DE TRADUCCIONES (i18n)
----------------------------------------------------------------------

Las traducciones funcionan con react-i18next.

Ejemplo:
t("pages.us.hero.title")

Reglas:
- Las keys DEBEN existir en los 4 idiomas.
- Si falta una key, se mostrará el texto literal.
- Nunca cambiar el nombre de una key existente.


----------------------------------------------------------------------
8. REGLAS IMPORTANTES PARA FUTUROS DESARROLLADORES
----------------------------------------------------------------------

1. NO cambiar keys de traducción
2. NO eliminar preload de imágenes
3. Revisar siempre mobile / tablet / desktop
4. Mantener useMemo y optimizaciones
5. No agregar frameworks CSS sin evaluación
6. Mantener enlaces a la tienda oficial
7. No convertir este proyecto en e-commerce


----------------------------------------------------------------------
9. COMANDOS DEL PROYECTO
----------------------------------------------------------------------

Instalar dependencias:
npm install

Modo desarrollo:
npm run dev

Build producción:
npm run build


----------------------------------------------------------------------
10. ESTADO DEL PROYECTO
----------------------------------------------------------------------

- Funcional: SI
- Responsive: SI
- Multilenguaje: SI
- Optimizado: SI
- Listo para escalar: SI


----------------------------------------------------------------------
11. EMPRESA
----------------------------------------------------------------------

Everything Alpaca
Diseñado y desarrollado con enfoque en:
- Identidad de marca
- Calidad visual
- Experiencia de usuario
- Performance

Este proyecto sirve como base sólida para futuras mejoras.
