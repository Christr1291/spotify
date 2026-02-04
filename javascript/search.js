document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    let searchResultsContainer = document.querySelector('.search-results');

    if (!searchResultsContainer) {
        searchResultsContainer = document.createElement('section');
        searchResultsContainer.className = 'search-results song-list-section';
        const mainContent = document.querySelector('.main-content');
        const genreSection = document.querySelector('.genre-section');
        mainContent.insertBefore(searchResultsContainer, genreSection);
    }
    searchResultsContainer.style.display = 'none'; 

    const performSearch = () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const genreSection = document.querySelector('.genre-section');

        if (!searchTerm) {
            searchResultsContainer.innerHTML = '';
            searchResultsContainer.style.display = 'none';
            if(genreSection) genreSection.style.display = 'block';
            return;
        }

        if (typeof window.songs === 'undefined') {
            console.error('La base de datos de canciones (window.songs) no está disponible.');
            searchResultsContainer.innerHTML = '<h2>Error</h2><p>La base de datos de canciones no está cargada.</p>';
            searchResultsContainer.style.display = 'block';
            if(genreSection) genreSection.style.display = 'none';
            return;
        }

        const filteredSongs = window.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) || 
            song.artist.toLowerCase().includes(searchTerm)
        );

        if(genreSection) genreSection.style.display = 'none';
        searchResultsContainer.style.display = 'block';


        if (filteredSongs.length > 0) {
            let songListHTML = '<h2>Resultados de la búsqueda</h2><div class="song-list-modern">';
            filteredSongs.forEach(song => {
                const songData = JSON.stringify(song);
                songListHTML += `
                    <div class="song-item-modern">
                        <img src="${song.cover}" alt="${song.title}" class="song-cover-art">
                        <div class="song-details">
                            <span class="song-title-modern">${song.title}</span>
                            <span class="song-artist-modern">${song.artist}</span>
                        </div>
                        <button class="download-button" data-song='${songData}'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 14V3"/></svg>
                        </button>
                    </div>
                `;
            });
            songListHTML += '</div>';
            searchResultsContainer.innerHTML = songListHTML;
        } else {
            searchResultsContainer.innerHTML = '<h2>Resultados de la búsqueda</h2><p>No se encontraron canciones o artistas que coincidan con tu búsqueda.</p>';
        }

        if (typeof window.attachDownloadEventListeners === 'function') {
            window.attachDownloadEventListeners();
        }
    };

    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});
