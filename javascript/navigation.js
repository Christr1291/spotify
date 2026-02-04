document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.getElementById('main-nav');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // If not logged in and on the homepage, redirect to the registration page.
    if (!loggedInUser && currentPage === 'index.html') {
        window.location.href = 'registrate.html';
        return; // Stop further execution.
    }
    
    // If a logged-in user is on login/register, send them to the homepage.
    if (loggedInUser && (currentPage === 'registrate.html' || currentPage === 'inicia-sesion.html')) {
        window.location.href = 'index.html';
        return;
    }

    // Protected pages that require a user to be logged in.
    const protectedPages = ['biblioteca.html', 'perfil.html', 'buscar.html'];
    if (!loggedInUser && protectedPages.includes(currentPage)) {
        window.location.href = 'inicia-sesion.html';
        return; // Stop further execution.
    }

    // --- Render Navigation Bar ---
    let navLinks = '';

    if (loggedInUser) {
        // --- Authenticated User Nav ---
        // They can see everything, including Search.
        navLinks = `
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="buscar.html">Buscar</a></li>
                <li><a href="biblioteca.html">Biblioteca</a></li>
                <li><a href="perfil.html">Perfil</a></li>
            </ul>
        `;
    } else {
        // --- Unauthenticated User Nav ---
        // This code will only run on `registrate.html` and `inicia-sesion.html`
        // because of the redirects above.
        // Do not show "Buscar".
        navLinks = `
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="registrate.html">Regístrate</a></li>
                <li><a href="inicia-sesion.html">Inicia Sesión</a></li>
            </ul>
        `;
    }

    if (navElement) {
        navElement.innerHTML = navLinks;

        // Clean up redundant links on auth pages for unauthenticated users
        if (!loggedInUser) {
            const currentLink = navElement.querySelector(`a[href="${currentPage}"]`);
            if (currentLink) {
                currentLink.parentElement.remove();
            }
        }
    }
});
