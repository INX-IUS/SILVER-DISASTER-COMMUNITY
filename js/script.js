// ----- Inicializar Firebase -----
const firebaseConfig = {
  apiKey: "AIzaSyCtngjc0RO_mt896xHzJ_oXqWK3t2TxB68",
  authDomain: "silver-disaster.firebaseapp.com",
  projectId: "silver-disaster",
  storageBucket: "silver-disaster.firebasestorage.app",
  messagingSenderId: "848981259894",
  appId: "1:848981259894:web:0ceba653784c92afef5157"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// ----- Modal Login/Registro -----
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const modal = document.getElementById('authModal');
const closeBtn = document.querySelector('.close');
const form = document.getElementById('authForm');

loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    showLoginForm();
});

registerBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    showRegisterForm();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none';
    }
});

// ----- Funciones para mostrar login o registro -----
function showLoginForm() {
    document.getElementById('username').style.display = 'none';
    form.dataset.mode = 'login';
}
function showRegisterForm() {
    document.getElementById('username').style.display = 'block';
    form.dataset.mode = 'register';
}

// ----- Formulario -----
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    if(form.dataset.mode === 'login'){
        auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`¡Bienvenido de nuevo, ${user.email}!`);
            modal.style.display = 'none';
            form.reset();
        })
        .catch((error) => {
            if(error.code === 'auth/user-not-found'){
                alert("Usuario no encontrado. Usa el botón Registrarse.");
            } else if(error.code === 'auth/wrong-password'){
                alert("Contraseña incorrecta.");
            } else {
                alert(`Error: ${error.message}`);
            }
        });
    } else {
        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`Cuenta creada con éxito: ${email}`);
            modal.style.display = 'none';
            form.reset();
        })
        .catch((err) => {
            alert(`Error: ${err.message}`);
        });
    }
});

// ----- Detectar usuario logueado -----
auth.onAuthStateChanged((user) => {
    if(user){
        // Mostrar email del usuario y opción de cerrar sesión
        loginBtn.style.display = 'none';
        registerBtn.textContent = user.email + " | Cerrar sesión";
        registerBtn.onclick = () => {
            auth.signOut().then(() => {
                loginBtn.style.display = 'inline-block';
                registerBtn.textContent = "Registrarse";
                registerBtn.onclick = () => showRegisterForm();
            });
        };
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.textContent = "Registrarse";
        registerBtn.onclick = () => {
            showRegisterForm();
            modal.style.display = 'block';
        };
    }
});
