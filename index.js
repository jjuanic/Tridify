
songs = document.getElementById('songs');

const searchSongs = (artist) => {
    const url = `https://itunes.apple.com/search?term=${artist}&entity=musicTrack&sort=popular`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const json = data.results;
        json.forEach(song => {
        let songDiv = document.createElement('div');
        let songName = document.createElement('p');
        songName.innerText = song.trackName;
        
        let img = document.createElement('img');
        img.src = song.artworkUrl100;
        
        songDiv.appendChild(songName);
        songDiv.appendChild(img);

        songs.appendChild(songDiv);
        });
      console.log(data); 
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });
}

const searchAlbums = (artist) => {
    const url = `https://itunes.apple.com/search?term=${artist}&entity=album&sort=popular`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const json = data.results;
        json.forEach(song => {
        let songDiv = document.createElement('div');
        let songName = document.createElement('p');
        songName.innerText = song.collectionName
        
        let img = document.createElement('img');
        img.src = song.artworkUrl100;
        
        songDiv.appendChild(songName);
        songDiv.appendChild(img);

        songs.appendChild(songDiv);
        });
      console.log(data); 
    })
    .catch(error => {
      console.error('Hubo un problema con la solicitud:', error);
    });
}

searchAlbums('Porcupine Tree');
searchAlbums('The Beatles');