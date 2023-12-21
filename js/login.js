
const botonRegistro = document.getElementById("registro");

botonRegistro.addEventListener('click', (e) => {
    e.preventDefault(); 
    window.location.href = '../registro.html';
    });
      

// Obtener elementos del DOM
const busquedaInput = localStorage.getItem('busqueda');
const busquedaDiv = document.getElementById('busquedaDiv');
