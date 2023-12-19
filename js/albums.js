const albums = document.getElementById("contenedorAlbumes");
const notificaciones = document.getElementById("notificaciones");
const contador = document.getElementById("elemCarrito");
const precio = document.getElementById("precio");
let cont = document.createElement("p");
cont.innerHTML =0;
contador.appendChild(cont);
let carrito = [];
let total = 0;




export const searchAlbums = (artist) => {
  const url = `https://itunes.apple.com/search?term=${artist}&entity=album&sort=popular&limit=57`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const json = data.results;

      let cantidad = 0;

      json.forEach((album) => {
        // Contador para saber cuantos albumes iguales se agregan
        let clicks = 0;

        // Columna
        let col = document.createElement("div");
        col.classList.add("col-md-2", "mb-4", "pr-md-4");

        //Tarjeta
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "100%";
        card.style.padding = "5%";

        //Nombre del Albúm

        let nombreAlbum = album.collectionName;

        if (album.collectionName.length > 30) {
          nombreAlbum = album.collectionName.substring(0, 30) + "...";
        }

        let cardTitle = document.createElement("h5");
        cardTitle.innerText = nombreAlbum;

        //Imagén del Albúm
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        const biggerImg = album.artworkUrl100.replace(
          "100x100bb",
          "1200x1200bb"
        );
        img.src = biggerImg;
        img.alt = "album cover";

        // Precio y Género
        let description = document.createElement("p");
        description.classList.add("card-text");

        let nombreArtista = album.artistName;

        if (album.artistName.length > 25) {
          nombreArtista = album.artistName.substring(0, 25) + "...";
        }

        description.innerText =
          "Artista: " +
          nombreArtista +
          "\n" +
          "Género: " +
          album.primaryGenreName +
          "\n" +
          "Precio: " +
          album.collectionPrice;

        card.appendChild(cardTitle);
        card.appendChild(img);
        card.appendChild(description);

        col.appendChild(card);
        albums.appendChild(col);

        // Boton Agregar
        let botonAgregar = document.createElement("button");
        botonAgregar.classList.add("btn", "btn-success");
        botonAgregar.innerText = "Agregar al Carrito";
        botonAgregar.style.width = "100%";
        botonAgregar.addEventListener("click", (e) => {
          e.preventDefault();
          // aumentamos el contador
          clicks = clicks + 1;
          cantidad = cantidad + 1;
          total = total + album.collectionPrice;
          precio.innerText=`Precio: $${total.toFixed(2)}`

          //actualizamos la cantidad del carrito
          cont.innerHTML=cantidad;
          

          carrito.push(album);

          let nombreAlbum = album.collectionName;

          if (album.collectionName.length > 30) {
            nombreAlbum = album.collectionName.substring(0, 30) + "...";
          }

          localStorage.setItem("carrito", JSON.stringify(carrito));

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
          var textNode = document.createTextNode(nombreAlbum);

          // Agregar los elementos al div principal
          alertDiv.appendChild(closeButton);
          alertDiv.appendChild(strongElement);
          alertDiv.appendChild(document.createTextNode(textNode.textContent));

          // Agregar a el div de notificaciones
          notificaciones.appendChild(alertDiv);

            Swal.fire({
              icon: 'success',
              title: 'Álbum agregado',
              text: `Álbum ${nombreAlbum} agregado al carrito.`,
              showConfirmButton: false,
              timer: 1800 // Duración en milisegundos
            });

          // Boton Eliminar
          let botonEliminar = document.createElement("button");
          botonEliminar.classList.add("btn", "btn-danger");
          botonEliminar.innerText = "Eliminar del Carrito";
          botonEliminar.style.width = "100%";
          botonEliminar.style.marginTop = "2px";

          botonEliminar.addEventListener("click", (e) => {
            e.preventDefault();
            clicks = clicks - 1;
            cantidad = cantidad - 1;
            total = total - album.collectionPrice;;
            precio.innerText=`Precio: $${total.toFixed(2)}`
            console.log(total);

            // actualizamos la cantidadd del carrito
            cont.innerHTML=cantidad
            


            // Buscamos el índice del álbum en el carrito
            const index = carrito.findIndex(
              (item) => item.collectionId === album.collectionId
            );

            if (index !== -1) {
              // Eliminamos el álbum
              carrito.splice(index, 1);

              let nombreAlbum = album.collectionName;

              if (album.collectionName.length > 30) {
                nombreAlbum = album.collectionName.substring(0, 30) + "...";
              }

              // Actualizamos LocalStorage
              localStorage.setItem("carrito", JSON.stringify(carrito));

              // Si tenemos más de un album igual, no eliminamos el botón de eliminar
              if (clicks == 0) {
                card.removeChild(botonEliminar);
              }

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
              var textNode = document.createTextNode(nombreAlbum);

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
                  text: `Álbum ${nombreAlbum} eliminado del carrito.`,
                  showConfirmButton: false,
                  timer: 2000 // Duración en milisegundos
                });
            }
          });

          // si tenemos un álbum agregado, agregamos el botón de eliminar
          if (clicks == 1) {
            card.appendChild(botonEliminar);
          }
        });

        card.appendChild(botonAgregar);

        // botón que nos lleva a la información del álbum en la página de ITunes
        let pagina = album.collectionViewUrl;

        let BotonInfo = document.createElement("button");
        BotonInfo.classList.add("btn", "btn-info");
        BotonInfo.innerText = "Detalles";
        BotonInfo.style.width = "100%";
        BotonInfo.style.marginTop = "2px";
        BotonInfo.addEventListener("click", (e) => {
          e.preventDefault();
          window.open(pagina, "_blank");
        });

        card.appendChild(BotonInfo);
      });
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud:", error);
    });
};



limpiarHistorial.addEventListener('click',(e)=> {
    let alertNotificaciones = notificaciones.querySelectorAll('.alert-dismissible');
    alertNotificaciones.forEach(notificacion => {
        notificaciones.removeChild(notificacion);
      });
})