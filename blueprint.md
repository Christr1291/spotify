# Blueprint: Spotify Clone

## Visión General

Este proyecto es un clon de la interfaz de Spotify, diseñado para ser una aplicación web moderna, visualmente atractiva y funcional. Los usuarios pueden navegar por géneros musicales, buscar canciones, ver listas de canciones, reproducir música y añadir canciones a su biblioteca personal. El proyecto se construye sin frameworks, utilizando HTML, CSS y JavaScript moderno (Web Components, ES Modules), y sigue las mejores prácticas de diseño y accesibilidad.

---

## Diseño, Estilos y Funcionalidades Implementadas

### **1. Diseño y Estilos Generales (`style.css`)**

*   **Paleta de Colores:** Fondo oscuro (`#191414`), texto blanco, y acentos de color verde Spotify (`#1DB954`) y un azul vibrante para el header (`#5bd3ff`).
*   **Tipografía:** `Helvetica Neue` como fuente principal para una apariencia limpia y moderna.
*   **Layout:** Se utiliza Flexbox y Grid para la mayoría de los diseños, asegurando responsividad.
*   **Header Fijo:** Un encabezado de navegación que permanece visible en la parte superior.
*   **Footer Sencillo:** Un pie de página minimalista con el logo.
*   **Tarjetas de Género (`buscar.html`):** Tarjetas con imágenes de fondo y el nombre del género superpuesto con un gradiente, con un efecto de zoom al pasar el ratón.
*   **Formularios:** Estilos consistentes para los campos de entrada y botones en las páginas de registro e inicio de sesión.
*   **Lista de Canciones Moderna:** Un nuevo layout para las listas de canciones que incluye carátula, detalles de la canción y un botón de acción.
*   **Menú de Opciones:** Las canciones en la biblioteca tienen un menú de tres puntos con la opción de "Eliminar", que actualiza la vista dinámicamente.

### **2. Estructura de Páginas (HTML)**

*   **`index.html`:** Página de inicio con una sección "hero" llamativa.
*   **`registrate.html` / `inicia-sesion.html`:** Páginas con formularios para el registro e inicio de sesión.
*   **`buscar.html`:** Página para la exploración y búsqueda, mostrando los géneros musicales y un campo de búsqueda.
*   **`genero-*.html`:** Páginas de detalle para cada género, ahora refactorizadas para usar un Web Component.
*   **`biblioteca.html`:** Página que muestra la biblioteca personal del usuario.
*   **`perfil.html`:** Página que muestra la información del usuario y permite cerrar sesión.

### **3. Funcionalidad (JavaScript)**

*   **`songs.js`:**
    *   **Base de Datos de Canciones:** Un array de objetos que contiene la información de cada canción, incluyendo `id`, `title`, `artist`, `genre`, `cover` y la ruta al archivo de audio (`audio`).
*   **`main.js`:**
    *   **Gestión de Biblioteca:** Funciones globales (`getLibrary`, `addToLibrary`, `removeFromLibrary`) que usan `localStorage` para gestionar la colección de música del usuario.
    *   **Manejo de Botones (Delegación de Eventos):** Utiliza delegación de eventos para que los botones de "añadir a la biblioteca" y "descargar" funcionen de manera robusta.
*   **`library.js`:**
    *   **Reproducción de Audio:** Carga dinámicamente las canciones guardadas en `biblioteca.html` y crea un reproductor de audio (`<audio>`) para cada una.
    *   **Gestión de Biblioteca:** Maneja la eliminación de canciones y la actualización de la interfaz en tiempo real.
*   **`navigation.js`:**
    *   **Navegación Dinámica:** Genera la barra de navegación en todas las páginas, mostrando enlaces diferentes para usuarios autenticados y no autenticados.
    *   **Gestión de Sesión:** Incluye la lógica para "Cerrar Sesión", limpiando `localStorage` y redirigiendo al usuario.
*   **`search.js`:**
    *   **Búsqueda de Canciones:** Filtra las canciones por título o artista y muestra los resultados dinámicamente en la página `buscar.html`.

### **4. Sistema de Autenticación**

*   **Flujo de Registro y Sesión:** El sistema utiliza `localStorage` para simular la autenticación de usuarios, guardando la información de registro y manteniendo una sesión activa.

---

## Plan de Implementación Actual

### **Refactorización de Páginas de Género (Completado)**

1.  **Objetivo:** Eliminar el código repetido en las páginas de género (`genero-*.html`) mediante la creación de un Web Component reutilizable.
2.  **Creación de `javascript/genre-page.js`:**
    *   Se creó un nuevo archivo que define la clase `GenrePage`, un `HTMLElement` personalizado.
    *   El componente acepta un atributo `genre` para saber qué canciones cargar y un atributo `title` para el encabezado.
    *   Utiliza el Shadow DOM para encapsular su estructura y estilos, previniendo conflictos con el resto de la página.
    *   Carga dinámicamente el módulo `songs.js` para acceder a la lista de canciones.
3.  **Refactorización de las Páginas:**
    *   Se modificaron las siguientes páginas para reemplazar el código de la lista de canciones con la nueva etiqueta `<genre-page>`:
        *   `genero-rock.html`
        *   `genero-pop.html`
        *   `genero-hiphop.html`
        *   `genero-electronica.html`
        *   `genero-clasica.html`
4.  **Versionado:**
    *   Se actualizaron todas las referencias a archivos CSS y JS en los archivos HTML modificados a `v=2.4` para asegurar que los cambios se reflejen correctamente y evitar problemas de caché.
5.  **Resultado:** El código de las páginas de género ahora es mucho más limpio, conciso y fácil de mantener. La lógica de visualización de canciones por género está centralizada en un único componente.