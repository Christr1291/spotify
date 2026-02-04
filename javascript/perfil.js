document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        window.location.href = 'inicia-sesion.html';
        return;
    }

    document.getElementById('user-name').textContent = loggedInUser.name;
    document.getElementById('user-email').textContent = loggedInUser.email;

    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            alert('Has cerrado sesión. Serás redirigido a la página de inicio.');
            window.location.href = 'index.html';
        });
    }
});
