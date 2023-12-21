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