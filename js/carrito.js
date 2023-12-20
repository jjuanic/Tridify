// import { notificarRemove, notificarSuccess } from "./notificaciones.js";
function contarRepeticiones(array, elemento) {
    let contador = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === elemento) {
            contador++;
        }
    }
    return contador;
  }


let carrito = JSON.parse(localStorage.getItem('carrito'));
let cantidad = carrito.length

const contador = document.getElementById("elemCarrito");
let cont = document.createElement("nav-link");
cont.innerHTML =cantidad;
contador.appendChild(cont);
let total = 0;
carrito.forEach(album => {
    total=total+album.collectionPrice
    
});
total=Math.abs(total).toFixed(2) 
const precio = document.getElementById("precio");
precio.innerText=`Precio: $${total}`
console.log(cantidad);
let repeticiones = 0;

let albumsImpresos = []

carrito.forEach((album) => {
    repeticiones = contarRepeticiones(carrito,album)
    if (!albumsImpresos.includes(album.collectionName)){
    

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
    albumsImpresos.push(album.collectionName);
    

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
            total = total + album.collectionPrice
        });;
        console.log(total, cantidad);
        cont.innerHTML = '(' + cantidad + ')';
        precio.innerText = `Precio: $${Math.abs(total).toFixed(2)}`

        // enviamos una notificación
        notificarSuccess(album.collectionName)
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
    repeticiones = contarRepeticiones(carrito,album)

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
            total = total - album.collectionPrice
            total = Math.abs(total).toFixed(2)

            console.log(total, cantidad);

            precio.innerText = `Precio: $${total}`
            cont.innerHTML = '(' + cantidad + ')'

            
            if (repeticiones == 0) {
                col.removeChild(card);
            }
            // enviamos una notificación
            notificarRemove(nombreAlbum)
        }
    });
        card.appendChild(botonEliminar);
}});