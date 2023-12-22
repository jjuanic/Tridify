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

let usuarios = []

let usuariosLocales = localStorage.getItem('usuarios');
if (usuariosLocales != null) {
    usuarios = JSON.parse(usuariosLocales)}

botonRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('email').value
    let contraseña = document.getElementById('contraseña').value

    let emailValido = correoValido(email)

    if (email == '' || contraseña == '') {
        notifDatosObligatorios();
          
    } else {
        if (!emailValido) {
            notifEmailInvalido()
        } else {
            if (contraseña.length < 8) {
                notifContraseñaCorta()
            } else {

                let usuario = {
                    email: email,
                    contraseña: contraseña
                }

                usuarios.push(usuario)
                localStorage.setItem('usuarios', JSON.stringify(usuarios))

                notifRegistro()
            }
        }
    }
})

function correoValido(correo) {
    // un shoutout para mi profe de sintaxis andresito pascal
    // caracteres menos espacio y @ -> @ -> caracteres menos espacio y @ -> . -> caracteres menos espacio y @ 
    const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expresionRegular.test(correo);
}


const notifDatosObligatorios = () => {
    Swal.fire({
        icon: 'error',
        title: 'Faltan datos obligatorios!',
        text: `Ingrese algún usuario o contraseña.`,
        showConfirmButton: false,
        timer: 2000 // Duración en milisegundos
    })
}

const notifEmailInvalido = () => {
    Swal.fire({
        icon: 'error',
        title: 'Email invalido!',
        text: `Revise el formato del correo electrónico ingresado.`,
        showConfirmButton: false,
        timer: 2000 // Duración en milisegundos
    })
}

const notifContraseñaCorta = () => {
    Swal.fire({
        icon: 'error',
        title: 'Contraseña invalida!',
        text: `Ingrese al menos 8 caracteres.`,
        showConfirmButton: false,
        timer: 2000 // Duración en milisegundos
    })
}

const notifRegistro = () => {
    let timerInterval;
    Swal.fire({
        icon: 'success',
        title: "Cuenta creada!",
        html: "Volveremos a la página de login en <b></b> segundos.",
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Math.ceil(Swal.getTimerLeft()/1000)}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        window.location.href = '../login.html';
    });
}
