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

// ----- Formulario -----
const form = document.getElementById('authForm');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Intentar iniciar sesión primero
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        alert(`¡Bienvenido de nuevo, ${user.email}!`);
        modal.style.display = 'none';
        form.reset();
    })
    .catch((error) => {
        // Si no existe, crear cuenta
        if(error.code === 'auth/user-not-found'){
            auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(`Cuenta creada con éxito: ${user.email}`);
                modal.style.display = 'none';
                form.reset();
            })
            .catch((err) => {
                alert(`Error: ${err.message}`);
            });
        } else {
            alert(`Error: ${error.message}`);
        }
    });
});

// ----- Detectar usuario logueado -----
auth.onAuthStateChanged((user) => {
    if(user){
        // Mostrar email del usuario y opción de cerrar sesión
        authBtn.textContent = user.email + " | Cerrar sesión";
        authBtn.onclick = () => {
            auth.signOut().then(() => {
                authBtn.textContent = "Iniciar sesión / Registrarse";
                authBtn.onclick = () => modal.style.display = 'block';
            });
        };
    } else {
        authBtn.textContent = "Iniciar sesión / Registrarse";
        authBtn.onclick = () => {
            modal.style.display = 'block';
        };
    }
});
