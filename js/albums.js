
import { elementoMasRepetido } from "./lists";

albums = document.getElementById('contenedorAlbumes')

lista = []

const searchAlbums = (artist) => {
    const url = `https://itunes.apple.com/search?term=${artist}&entity=album&sort=popular`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const json = data.results;
        json.forEach(album => {

        // Columna
        let col = document.createElement('div');
        col.classList.add('col-md-2', 'mb-4', 'pr-md-4'); 

        //Tarjeta
        let card = document.createElement('div');
        card.classList.add("card");
        card.style.width = "100%"; 
        card.style.padding= "5%";

        //Nombre del Albúm
        let cardTitle = document.createElement('h5');
        cardTitle.innerText = album.collectionName
        
        //Imagén del Albúm
        let img = document.createElement('img');
        img.classList.add("card-img-top");
        img.src = album.artworkUrl100;
        img.alt = 'album cover';

        // Precio y Género
        let description = document.createElement('p');
        description.classList.add("card-text");
        description.innerText = 'Género: ' + album.primaryGenreName + "\n" + "Precio: " + album.collectionPrice;
        
        
        card.appendChild(cardTitle)
        card.appendChild(img)
        card.appendChild(description)

        col.appendChild(card);
        albums.appendChild(col);

        let botonAgregar = document.createElement('button');
        botonAgregar.classList.add("btn","btn-success");
        botonAgregar.innerText = 'Agregar a la Lista';  
        botonAgregar.style.width= '100%'
        botonAgregar.addEventListener('click', (e) => {
            e.preventDefault();
   
            albums.push(album);
   
            localStorage.setItem('Albums', JSON.stringify(albums));
        })


        card.appendChild(botonAgregar)

        const nombresDeArtistas = json.map((elemento) => elemento.artistName);
        const resultado = elementoMasRepetido(nombresDeArtistas);
        console.log(`El elemento más repetido es: ${resultado}`);
        });
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });
}