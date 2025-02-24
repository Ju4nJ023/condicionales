
import {
   setNumeroParaAcertar,
   setNumeroDeIntentos,


} from '../imports/modelo';

import {
    generarNumeroAleatorio,
    
    comprobarNumero
} from '../imports/motor';

import {
    muestraNumeroDeIntentos,
    handleCompruebaClick
    
   
} from '../imports/ui';

const inicializarNuevPartida = () => {
    setNumeroParaAcertar(generarNumeroAleatorio());
    setNumeroDeIntentos(0);
    muestraNumeroDeIntentos();

}

document.addEventListener("DOMContentLoaded", inicializarNuevPartida);

const botonComprobar = document.getElementById("comprobar");
botonComprobar.addEventListener("click", handleCompruebaClick);

