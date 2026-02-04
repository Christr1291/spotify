class GenrePage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const genre = this.getAttribute('genre');
        const title = this.getAttribute('title') || genre;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css?v=2.4">
            <section class="song-list-section">
                <h2>GÉNERO: ${title.toUpperCase()}</h2>
                <div class="song-list-modern" id="song-list">
                    <!-- Las canciones se cargarán aquí dinámicamente -->
                </div>
            </section>
        `;

        this.loadSongs(genre);
    }

    loadSongs(genre) {
        // Import songs.js dynamically to access the 'songs' array
        import('./songs.js?v=2.4').then(module => {
            const songs = module.songs;
            const songListContainer = this.shadowRoot.getElementById('song-list');
            const filteredSongs = songs.filter(song => song.genre === genre);

            let songListHTML = '';
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

            songListContainer.innerHTML = songListHTML;

            // Re-attach event listeners for download buttons if main.js handles it globally
            // This might require a slight adjustment in main.js to handle shadow DOM
            songListContainer.querySelectorAll('.download-button').forEach(button => {
                button.addEventListener('click', (event) => {
                    const song = JSON.parse(event.currentTarget.dataset.song);
                    // This is a simplified download logic. In a real app, you'd handle this differently.
                    alert(`Descargando ${song.title}`);
                });
            });
        });
    }
}

customElements.define('genre-page', GenrePage);