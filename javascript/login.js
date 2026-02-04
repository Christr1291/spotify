document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.form-container');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevenimos el envío tradicional

            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                alert('Por favor, ingresa tu correo y contraseña.');
                return;
            }

            // Obtenemos la lista de usuarios registrados
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Buscamos si existe un usuario con ese email y contraseña
            const validUser = users.find(user => user.email === email && user.password === password);

            if (validUser) {
                // Si las credenciales son correctas, marcamos la sesión como iniciada
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('activeUser', JSON.stringify(validUser)); // Guardamos el usuario activo

                alert('¡Inicio de sesión exitoso!');
                
                // Redirigimos al usuario a la página de inicio
                window.location.href = 'index.html';
            } else {
                // Si no, mostramos un error
                alert('Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.');
                // Limpiamos el campo de contraseña
                passwordInput.value = '';
            }
        });
    }
});
