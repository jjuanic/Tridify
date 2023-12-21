const busquedaInput = document.getElementById('busquedaInput');
const buscarButton = document.getElementById('buscarButton');

buscarButton.addEventListener('click', (e) => {
e.preventDefault(); 
const busqueda = busquedaInput.value; 
localStorage.setItem("busqueda", busqueda);
window.location.href = '../busqueda.html';
});

const estadoSesion = document.getElementById("estadoSesion");

let inicioSesion = localStorage.getItem("inicioSesion")

if (inicioSesion === "true"){
  estadoSesion.style.color = "#44c49e"
  estadoSesion.innerText = "Sesion Iniciada"
} else {
    estadoSesion.style.color = "#d34146"
    estadoSesion.innerText = "Sesion no Iniciada"   
}

const botonRegistro = document.getElementById("registro");
const botonLogin = document.getElementById("login");
const botonCerrarSesion = document.getElementById("cerrarSesion");

botonRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '../registro.html';
});

botonCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem("inicioSesion", false);
    notificarCierreSesion();
    location.reload()

});


botonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    let emailForm = document.getElementById('email').value;
    let contraseñaForm = document.getElementById('contraseña').value;

    let usuariosLocal = JSON.parse(localStorage.getItem('usuarios'));

    let usuario = usuariosLocal.find(user => user.email == emailForm && user.contraseña == contraseñaForm);

    if (usuario) {
        localStorage.setItem('inicioSesion', true);
        notificarInicioSesion(emailForm);
    } else {
        notificarError();
    }

});

const notificarInicioSesion = (email) => {
    Swal.fire({
        icon: 'success',

        text: ``,
        showConfirmButton: false,
        timer: 3000 // Duración en milisegundos
    })
    let timerInterval;
    Swal.fire({
        icon: 'success',
        title: 'Inicio de sesión válido!',
        html: `Bienvenido ${antesArroba(email)}! <br> Volviendo a la página principal en <b></b> segundos.`,
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Math.ceil(Swal.getTimerLeft() / 1000)}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        window.location.href = '../index.html';
    });
}

const notificarError = () => {
    Swal.fire({
        icon: 'error',
        title: 'Datos invalidos!',
        text: `Cuenta no encontrada o datos ingresados incorrectamente.`,
        showConfirmButton: false,
        timer: 3000 // Duración en milisegundos
    })
}

const notificarCierreSesion = () => {
    Swal.fire({
        icon: 'success',
        title: 'Sesion cerrada correctamente',
        text: `Vuelva pronto!`,
        showConfirmButton: false,
        timer: 3000 // Duración en milisegundos
    })
}

const antesArroba = (cadena) => {
    // Encontrar la posición del arroba
    const posicionArroba = cadena.indexOf('@');

    // Verificar si existe el arroba en la cadena
    if (posicionArroba !== -1) {
        // Obtener la subcadena desde el inicio hasta la posición del arroba
        return cadena.substring(0, posicionArroba);
    }
}
