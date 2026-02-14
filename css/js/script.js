// Modal login/registro
const authBtn = document.getElementById('authBtn');
const modal = document.getElementById('authModal');
const closeBtn = document.querySelector('.close');

authBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none';
    }
});

// Formulario de registro (solo ejemplo sin backend)
const form = document.getElementById('authForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    alert(`¡Bienvenido ${username}! (Funcionalidad real vendrá después)`);
    modal.style.display = 'none';
    form.reset();
});
