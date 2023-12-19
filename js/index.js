import { searchAlbums } from "./albums.js";

// busqueda inicial de la página
searchAlbums("albums");

const busquedaInput = document.getElementById('busquedaInput');
const buscarButton = document.getElementById('buscarButton');

buscarButton.addEventListener('click', (e) => {
e.preventDefault(); 
const busqueda = busquedaInput.value; 
localStorage.setItem("busqueda", busqueda);
window.location.href = '../busqueda.html';
});