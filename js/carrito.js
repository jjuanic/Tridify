//import { swalAgregar, swalEliminar} from "./notificaciones.js";

function contarRepeticiones(array, elemento) {
    let contador = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i] === elemento) {
            contador++;
        }
    }
    return contador;
  }

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
  


let botonPagar = document.getElementById("botonPagar");
let carrito = JSON.parse(localStorage.getItem('carrito'));
let cantidad = carrito.length

const contador = document.getElementById("elemCarrito");
let cont = document.createElement("nav-link");
cont.innerHTML='('+cantidad+')';
contador.appendChild(cont);
let total = 0;
carrito.forEach(album => {
    total=total+album.collectionPrice
    
});
total=Math.abs(total).toFixed(2) 
const precio = document.getElementById("precio");
precio.innerText=`Precio: $${total}`
let repeticiones = 0;

let albumsImpresos = []
let listaRepetidos = {}

carrito.forEach(album => {
    if (album.collectionName in listaRepetidos) {
        // Si el nombre del álbum ya está en la lista, incrementa una propiedad del objeto
        listaRepetidos[album.collectionName].cantidad++;
    } else {
        // Si es la primera vez que aparece el nombre del álbum, crea un nuevo objeto con una propiedad 'cantidad'
        listaRepetidos[album.collectionName] = { cantidad: 1 };
    }
});

carrito.forEach((album) => {

    if (!albumsImpresos.includes(album.collectionName)) {
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
    
    let unidades = document.createElement("p")
    unidades.classList.add("card-text")
    unidades.innerText = "Unidades: " + listaRepetidos[album.collectionName].cantidad;
    

    card.appendChild(cardTitle);
    card.appendChild(img);
    card.appendChild(description);
    card.appendChild(unidades)

    col.appendChild(card);
    albums.appendChild(col);
    albumsImpresos.push(album.collectionName);
    

    //// ========================================Boton Agregar========================================
    let botonAgregar = document.createElement("button");
    botonAgregar.classList.add("btn", "btn-success");
    botonAgregar.innerText = "Agregar unidad";
    botonAgregar.style.width = "100%";
    botonAgregar.addEventListener("click", (e) => {
        e.preventDefault();

        // agregamos al localStorage
        carrito.push(album);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        listaRepetidos[album.collectionName].cantidad++;

        cantidad = carrito.length;
        total = 0;
        carrito.forEach(album => {
            total = total + album.collectionPrice
        });;

        cont.innerHTML = '(' + cantidad + ')';
        precio.innerText = `Precio: $${Math.abs(total).toFixed(2)}`
        unidades.innerText = "Unidades: " + listaRepetidos[album.collectionName].cantidad;

        // enviamos una notificación
        Swal.fire({
            icon: 'success',
            title: 'Álbum agregado',
            text: `Álbum "${nombreAlbum}" agregado al carrito.`,
            showConfirmButton: false,
            timer: 1800 // Duración en milisegundos
          });
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

    // ========================================Boton Eliminar========================================
    let botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger");
    botonEliminar.innerText = "Eliminar unidad";
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

            listaRepetidos[album.collectionName].cantidad--;

            let nombreAlbum = album.collectionName;

            if (album.collectionName.length > 30) {
                nombreAlbum = album.collectionName.substring(0, 30) + "...";
            }

            // Actualizamos LocalStorage
            localStorage.setItem("carrito", JSON.stringify(carrito));

            cantidad = carrito.length;
            total = total - album.collectionPrice
            total = Math.abs(total).toFixed(2)

            precio.innerText = `Precio: $${total}`
            cont.innerHTML = '(' + cantidad + ')'
            unidades.innerText = "Unidades: " + listaRepetidos[album.collectionName].cantidad;

            if (listaRepetidos[album.collectionName].cantidad == 0) {
                col.removeChild(card);
            }
            // enviamos una notificación
            Swal.fire({
                icon: 'success',
                title: 'Álbum eliminado',
                text: `Álbum "${nombreAlbum}" eliminado del carrito.`,
                showConfirmButton: false,
                timer: 2000 // Duración en milisegundos
              })
        }
    });
        card.appendChild(botonEliminar);
}});

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

botonPagar.addEventListener('click', (e)=>{
    let inicioSesion = localStorage.getItem('inicioSesion')
    console.log(inicioSesion);

    if (inicioSesion === "true"){
        notifRedireccion()
    } else {
        notifSesionNoIniciada()
    }
})

const notifRedireccion = () => {
    let timerInterval;
    Swal.fire({
        title: "Pago a realizar!",
        html: "Lo llevaremos a la página del servicio de pago en <b></b> segundos.",
        timer: 4000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
                timer.textContent = `${Math.ceil(Swal.getTimerLeft()/1000)}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        window.location.href = '../pago.html';
    });
}

const notifSesionNoIniciada = () => {
    Swal.fire({
        icon: 'error',
        title: 'No inició sesión!',
        text: `Porfavor, ingrese con su cuenta registrada`,
        showConfirmButton: false,
        timer: 2000 // Duración en milisegundos
    })
}