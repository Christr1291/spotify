document.addEventListener('DOMContentLoaded', () => {
    const libraryContainer = document.getElementById('library-container');
    const emptyMessage = document.getElementById('empty-library-message');

    // --- NUEVO: Migrador de datos ---
    const migrateLibraryData = () => {
        // Asegurarse de que la base de datos de canciones global (window.songs) esté disponible.
        if (typeof window.songs === 'undefined') {
            console.error('La base de datos de canciones no está disponible para la migración.');
            return;
        }

        const library = getLibrary();
        let dataWasMigrated = false;

        const updatedLibrary = library.map(librarySong => {
            // Encontrar la canción correspondiente en la base de datos global 'songs'
            const masterSongData = window.songs.find(s => s.id === librarySong.id);

            // Si la canción existe en la base de datos y la ruta de audio no coincide, actualizarla.
            if (masterSongData && librarySong.audio !== masterSongData.audio) {
                librarySong.audio = masterSongData.audio;
                dataWasMigrated = true;
            }
            return librarySong;
        });

        if (dataWasMigrated) {
            // Si se hizo algún cambio, guardar la biblioteca actualizada en localStorage.
            localStorage.setItem('spotifyLibrary', JSON.stringify(updatedLibrary));
            console.log('¡Migración de datos completada! Las rutas de audio han sido corregidas.');
        }
    };
    // --- FIN del Migrador ---

    const loadLibrary = () => {
        const library = getLibrary();
        libraryContainer.innerHTML = '';

        if (library.length === 0) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            library.forEach(song => {
                const songElement = createSongPlayerElement(song);
                libraryContainer.appendChild(songElement);
            });
        }
    };

    const createSongPlayerElement = (song) => {
        const item = document.createElement('div');
        item.className = 'song-item-modern song-player';
        item.id = `song-${song.id}`;

        const cover = document.createElement('img');
        cover.src = song.cover;
        cover.alt = song.title;
        cover.className = 'song-cover-art';
        item.appendChild(cover);

        const details = document.createElement('div');
        details.className = 'song-details';
        const title = document.createElement('span');
        title.className = 'song-title-modern';
        title.textContent = song.title;
        details.appendChild(title);
        const artist = document.createElement('span');
        artist.className = 'song-artist-modern';
        artist.textContent = song.artist;
        details.appendChild(artist);
        item.appendChild(details);

        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.setAttribute('controlsList', 'nodownload noplaybackrate');
        audioPlayer.src = song.audio; // Usará la ruta, ya sea la antigua o la recién corregida.
        item.appendChild(audioPlayer);

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'song-options';

        const optionsButton = document.createElement('button');
        optionsButton.className = 'options-button';
        optionsButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>';
        
        const dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'options-dropdown';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar de la biblioteca';
        deleteButton.addEventListener('click', () => {
            removeFromLibrary(song.id);
            const songElementToRemove = document.getElementById(`song-${song.id}`);
            if (songElementToRemove) {
                songElementToRemove.remove();
            }
            if (getLibrary().length === 0) {
                emptyMessage.style.display = 'block';
            }
        });

        dropdownMenu.appendChild(deleteButton);
        optionsContainer.appendChild(optionsButton);
        optionsContainer.appendChild(dropdownMenu);
        item.appendChild(optionsContainer);

        optionsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.options-dropdown.show').forEach(menu => {
                if (menu !== dropdownMenu) menu.classList.remove('show');
            });
            dropdownMenu.classList.toggle('show');
        });

        return item;
    };

    window.addEventListener('click', () => {
        document.querySelectorAll('.options-dropdown.show').forEach(menu => {
            menu.classList.remove('show');
        });
    });

    if (typeof getLibrary === 'function') {
        // --- NUEVO: Ejecutar el migrador ANTES de cargar la biblioteca ---
        migrateLibraryData();
        loadLibrary();
    } else {
        console.error('Error crítico: La función getLibrary() no se encontró.');
    }
});
