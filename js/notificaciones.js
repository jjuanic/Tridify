const notificaciones = document.getElementById("notificaciones");

export const notificarSuccess = (nombreAlbum) =>{
    if (nombreAlbum.length > 30) {
    nombreAlbum = nombreAlbum.substring(0, 30) + "...";
  }

  // Div principal
  var alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-dismissible",
    "alert-success",
    "less-width"
  );

  // botón de cierre
  var closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "alert");

  // texto
  var strongElement = document.createElement("strong");
  strongElement.appendChild(
    document.createTextNode("Albúm agregado al carrito: ")
  );


  // nombre del album
  var textNode = document.createTextNode('"' + nombreAlbum + '"');

  // Agregar los elementos al div principal
  alertDiv.appendChild(closeButton);
  alertDiv.appendChild(strongElement);
  alertDiv.appendChild(document.createTextNode(textNode.textContent));

  // Agregar a el div de notificaciones
  notificaciones.appendChild(alertDiv);

    Swal.fire({
      icon: 'success',
      title: 'Álbum agregado',
      text: `Álbum "${nombreAlbum}" agregado al carrito.`,
      showConfirmButton: false,
      timer: 1800 // Duración en milisegundos
    });
}

export const notificarRemove = (nombreAlbum) =>{
  // div principal
  var alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-dismissible",
    "alert-danger",
    "less-width"
  );

  // boton de cierre
  var closeButton = document.createElement("button");
  closeButton.setAttribute("type", "button");
  closeButton.classList.add("btn-close");
  closeButton.setAttribute("data-bs-dismiss", "alert");

  // texto
  var strongElement = document.createElement("strong");
  strongElement.appendChild(
    document.createTextNode("Albúm eliminado del carrito: ")
  );

  // nombre del album
  var textNode = document.createTextNode('"' + nombreAlbum + '"');

  // Agregar los elementos al div principal
  alertDiv.appendChild(closeButton);
  alertDiv.appendChild(strongElement);
  alertDiv.appendChild(
    document.createTextNode(textNode.textContent)
  );

  // agregar a el div de notificaciones
  notificaciones.appendChild(alertDiv);

    Swal.fire({
      icon: 'success',
      title: 'Álbum eliminado',
      text: `Álbum "${nombreAlbum}" eliminado del carrito.`,
      showConfirmButton: false,
      timer: 2000 // Duración en milisegundos
    });
}
export const notificarError = () =>{
Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: `¡La base de datos no está funcionando!.`,
    showConfirmButton: false,
    timer: 2000 // Duración en milisegundos
  });
}

limpiarHistorial.addEventListener('click',(e)=> {
    e.preventDefault();
    Swal.fire({
        title: "Estás seguro de borrar el historial?",
        showDenyButton: true,
        confirmButtonText: "Si",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Notificaciones limpias!", "", "success");
          let alertNotificaciones = notificaciones.querySelectorAll('.alert-dismissible');
          alertNotificaciones.forEach(notificacion => {
          notificaciones.removeChild(notificacion);
        });
        } else if (result.isDenied) {
          Swal.fire("No se han eliminado las notificaciones", "", "info");
        }
      })})

limpiarCarrito.addEventListener('click',(e)=> {
   e.preventDefault();
        Swal.fire({
            title: "¿Estás seguro de borrar el carrito?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Borrar",
            denyButtonText: `No borrar`
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Carrito limpio!", "", "success");
              // limpiar carrito
              localStorage.removeItem('carrito');
              location.reload();
            } else if (result.isDenied) {
              Swal.fire("No se ha eliminado el carrito", "", "info");
            }
          })});

