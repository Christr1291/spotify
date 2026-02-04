// --- Funciones Globales de la Biblioteca ---

// Función para obtener la biblioteca desde localStorage
const getLibrary = () => {
    // Se renombró la clave a 'spotifyLibrary' en la v2.1 para evitar conflictos, pero mantengamos compatibilidad
    return JSON.parse(localStorage.getItem('spotifyLibrary')) || JSON.parse(localStorage.getItem('myMusicLibrary')) || [];
};

// Función para añadir una canción a la biblioteca
const addToLibrary = (song) => {
    const library = getLibrary();
    const isAlreadyInLibrary = library.some(item => item.id === song.id);

    if (!isAlreadyInLibrary) {
        library.push(song);
        localStorage.setItem('spotifyLibrary', JSON.stringify(library));
        console.log(`Canción "${song.title}" añadida a la biblioteca.`);
        return true;
    } else {
        console.log(`La canción "${song.title}" ya está en tu biblioteca.`);
        return false;
    }
};

// Función para eliminar una canción de la biblioteca por su ID
const removeFromLibrary = (songId) => {
    let library = getLibrary();
    const updatedLibrary = library.filter(song => song.id !== songId);
    localStorage.setItem('spotifyLibrary', JSON.stringify(updatedLibrary));
    console.log(`Canción con ID "${songId}" eliminada de la biblioteca.`);
};


// --- Lógica de Delegación de Eventos ---

document.addEventListener('click', (event) => {
    const downloadButton = event.target.closest('.download-button');

    if (downloadButton && !downloadButton.disabled) {
        try {
            // --- LÓGICA CORREGIDA ---
            // 1. Obtener solo el ID del botón.
            const songDataFromAttr = JSON.parse(downloadButton.dataset.song);
            const songId = songDataFromAttr.id;

            // 2. Buscar la información autorizada en la base de datos global.
            if (typeof window.songs === 'undefined') {
                console.error('La base de datos de canciones (window.songs) no está disponible.');
                return;
            }
            const authoritativeSongData = window.songs.find(s => s.id === songId);

            // 3. Si se encuentra, añadir esa información correcta a la biblioteca.
            if (authoritativeSongData) {
                const wasAdded = addToLibrary(authoritativeSongData);

                if (wasAdded) {
                    downloadButton.disabled = true;
                    downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
                    downloadButton.style.cursor = 'default';
                    downloadButton.title = 'Añadido a tu biblioteca';
                }
            } else {
                console.error(`Error: No se encontró la canción con ID "${songId}" en la base de datos global.`);
            }
            // --- FIN DE LA CORRECCIÓN ---

        } catch (error) {
            console.error('Error al procesar los datos de la canción:', error);
        }
    }
});
