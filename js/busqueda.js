import { searchAlbums } from "./albums.js";

const estadoSesion = document.getElementById("estadoSesion");

let inicioSesion = localStorage.getItem("inicioSesion")

if (inicioSesion === "true"){
  estadoSesion.style.color = "#44c49e"
  estadoSesion.innerText = "Sesion Iniciada"
} else {
    estadoSesion.style.color = "#d34146"
    estadoSesion.innerText = "Sesion no Iniciada"   
}

// Obtener elementos del DOM
const busquedaInput = localStorage.getItem('busqueda');
const busquedaDiv = document.getElementById('busquedaDiv');

const busquedaH1 = document.createElement('h1');
  busquedaH1.className= 'text-center';
  busquedaH1.style= "padding:2%";
  busquedaH1.innerText='Resultados de la busqueda de: '+JSON.stringify(busquedaInput);
busquedaDiv.appendChild(busquedaH1)

searchAlbums(busquedaInput);

const busquedaNueva = document.getElementById('busquedaInput');
const buscarButton = document.getElementById('buscarButton');

buscarButton.addEventListener('click', (e) => {
e.preventDefault(); 
const busqueda = busquedaNueva.value; 
localStorage.setItem("busqueda", busqueda);
window.location.href = '../busqueda.html';
});
  
