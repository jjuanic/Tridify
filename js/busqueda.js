import { searchAlbums } from "./albums.js";

// Obtener elementos del DOM
const busquedaInput = localStorage.getItem('busqueda');

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
  
