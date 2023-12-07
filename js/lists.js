function elementoMasRepetido(lista) {
    let conteo = {};
  
    lista.forEach((elemento) => {
      if (conteo[elemento]) {
        conteo[elemento]++;
      } else {
        conteo[elemento] = 1;
      }
    });
  
    let elementoMasRepetido;
    let maxRepeticiones = 0;
  
    // Encontrar el elemento con más repeticiones
    for (let elemento in conteo) {
      if (conteo[elemento] > maxRepeticiones) {
        maxRepeticiones = conteo[elemento];
        elementoMasRepetido = elemento;
      }
    }
  
    return elementoMasRepetido;
  }

export {elementoMasRepetido};