import { notificarRemove, notificarSuccess } from "./notificaciones.js";

function contarRepeticiones(carrito, album) {
  let contador = 0;
  carrito.forEach(albumCarrito => {
    if (albumCarrito.collectionName == album.collectionName){
      contador++
    }
  });
  return contador;
}

// Inicialización de las variables.
const albums = document.getElementById("contenedorAlbumes");
const contador = document.getElementById("elemCarrito");
const precio = document.getElementById("precio");

let cont = document.createElement("nav-link");
cont.innerHTML =0;
contador.appendChild(cont);
let carrito = []
let total = 0;
let cantidad = 1;

// Tratamiento del localStorage en caso de tener algo guardado en memoria.
let carritoLocal = localStorage.getItem('carrito');
if (carritoLocal != null) {
  carrito = JSON.parse(carritoLocal)

  carrito.forEach(album => {
    total=total+album.collectionPrice   
  });
  total=Math.abs(total).toFixed(2) // Redondeamiento de precios, para evitar errores muy pequeños en los cálculos.

  cantidad = carrito.length;
  cont.innerHTML='('+cantidad+')';
  precio.innerText=`Precio: $${total}`
} 
export const searchAlbums = (artist) => {
  const url = `https://itunes.apple.com/search?term=${artist}&entity=album&sort=popular&limit=57`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const json = data.results;

      json.forEach((album) => {
        // Columna
        let col = document.createElement("div");
        col.classList.add("col-md-2", "mb-4", "pr-md-4");

        //Tarjeta
        let card = document.createElement("div");
        card.classList.add("card");
        card.style.width = "100%";
        card.style.height = "100%";
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

        // buscamos si el álbum está en el carrito
        const busquedaAlbum = carrito.findIndex(
          (item) => item.collectionId === album.collectionId
        );

        //// ========================================Boton Agregar========================================
        let botonAgregar = document.createElement("button");
        botonAgregar.classList.add("btn", "btn-success");
        botonAgregar.innerText = "Agregar al Carrito";
        botonAgregar.style.width = "100%";
        botonAgregar.addEventListener("click", (e) => {
          e.preventDefault();

          // agregamos al localStorage
          carrito.push(album);
          localStorage.setItem("carrito", JSON.stringify(carrito));

          cantidad = carrito.length;
          total = 0;
          carrito.forEach(album => {
            total=total+album.collectionPrice
          });;

          total=Math.abs(total).toFixed(2) 
          cont.innerHTML='('+cantidad+')';
          precio.innerText=`Precio: $${total}`

          // enviamos una notificación
          notificarSuccess(album.collectionName)

          // ========================================Boton Eliminar========================================
          let botonEliminar = document.createElement("button");
          botonEliminar.classList.add("btn", "btn-danger");
          botonEliminar.innerText = "Eliminar del Carrito";
          botonEliminar.style.width = "100%";
          botonEliminar.style.marginTop = "2px";

          botonEliminar.addEventListener("click", (e) => {
            e.preventDefault();
            
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

              cantidad = carrito.length;
              total=total-album.collectionPrice
              total=Math.abs(total).toFixed(2)


              precio.innerText=`Precio: $${total}`
              cont.innerHTML='('+cantidad+')'

              card.appendChild(botonEliminar);

              let repeticiones = contarRepeticiones(carrito,album);
    
              if (repeticiones == 0) {
                card.removeChild(botonEliminar);
              }
              // enviamos una notificación
              notificarRemove(nombreAlbum)
            }
          });

          let repeticiones = contarRepeticiones(carrito,album)
          if(repeticiones == 1) {
            card.appendChild(botonEliminar);
          }
          
        });

        card.appendChild(botonAgregar);

        // botón que nos lleva a la información del álbum en la página de ITunes
        let pagina = album.collectionViewUrl;

        // ========================================Boton Info========================================
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

        // si está en el carrito, hay que agregarle un botón eliminar
        if (busquedaAlbum !== -1) {
          // ========================================Boton Eliminar========================================
          let botonEliminar = document.createElement("button");
          botonEliminar.classList.add("btn", "btn-danger");
          botonEliminar.innerText = "Eliminar del Carrito";
          botonEliminar.style.width = "100%";
          botonEliminar.style.marginTop = "2px";
          botonEliminar.style.marginBottom = "2px";

          botonEliminar.addEventListener("click", (e) => {
           e.preventDefault();
           
           // Buscamos el índice del álbum en el carrito
           const index = carrito.findIndex(
             (item) => item.collectionId === album.collectionId
           );

           if (index !== -1) {
             // Eliminamos el álbum
             carrito.splice(index, 1);

             // Actualizamos LocalStorage
             localStorage.setItem("carrito", JSON.stringify(carrito));

             cantidad = carrito.length;
             total=total-album.collectionPrice
             total=Math.abs(total).toFixed(2) 

             precio.innerText=`Precio: $${total}`
             cont.innerHTML='('+cantidad+')';

             var repeticiones = contarRepeticiones(carrito,album);
   
             if (repeticiones == 0) {
               card.removeChild(botonEliminar);
             }
       }})
         card.appendChild(botonEliminar);
       }
      });
    })
    .catch((error) => {
      console.error("Hubo un problema con la solicitud:", error);
      notificarError();
    });
};
