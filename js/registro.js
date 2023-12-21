
const botonRegistro = document.getElementById("registro");

botonRegistro.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.getElementById('email').value
    let contraseña = document.getElementById('contraseña').value

    let emailValido = correoValido(email)

    if (email == '' || contraseña == '') {
        notifDatosObligatorios()
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
                localStorage.setItem('usuario', JSON.stringify(usuario))
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
    Swal.fire({
        icon: 'success',
        title: 'Cuenta creada satisfactoriamente!',
        text: `Volveremos a la pantalla de inicio de sesión.`,
        showConfirmButton: false,
        timer: 2000 // Duración en milisegundos
    });
}
