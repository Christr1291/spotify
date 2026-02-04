document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.form-container');

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = registerForm.querySelector('input[type="email"]');
            const passwordInput = registerForm.querySelector('input[type="password"]');
            const nameInput = registerForm.querySelector('input[type="text"]');
            
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const name = nameInput.value.trim();

            if (!email || !password || !name) {
                alert('Por favor, completa todos los campos.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert('Este correo electrónico ya está registrado. Por favor, inicia sesión.');
                emailInput.value = '';
                passwordInput.value = '';
                nameInput.value = '';
                return;
            }
            
            const newUser = { name, email, password };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Iniciar sesión automáticamente después del registro
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));

            alert('¡Registro exitoso! Serás redirigido a la página principal.');

            // Redirigir a la página principal
            window.location.href = 'index.html';
        });
    }
});
