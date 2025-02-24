import {
    actualizarPuntosTotales,
    obtenerPuntosTotales
} from './modeloo';






export const obtenerUrlCarta = (carta: number): string => {
    switch (carta) {
        case 1:
          return 'src/assets/1_as-copas.jpg';
        case 2:
          return 'src/assets/2_dos-copas.jpg';
        case 3:
          return 'src/assets/3_tres-copas.jpg';
        case 4:
          return 'src/assets/4_cuatro-copas.jpg';
        case 5:
          return 'src/assets/5_cinco-copas.jpg';
        case 6:
          return 'src/assets/6_seis-copas.jpg';
        case 7:
          return 'src/assets/7_siete-copas.jpg';
        case 10:
          return 'src/assets/10_sota-copas.jpg';
        case 11:
          return 'src/assets/11_caballo-copas.jpg';
        case 12:
          return 'src/assets/12_rey-copas.jpg';
        default:
          return 'src/assets/back.jpg';
      }
    };

    export const mostrarUrlCarta = (urlCarta: string): void => {
        const elementoImagen = document.getElementById('base');
        if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
            elementoImagen.src = urlCarta;
        }
    };

    export const mostrarPuntuacion = () => {
        const elementoParrafo = document.getElementById('resultado');
        if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement) {
            elementoParrafo.textContent = `Puntos: ${obtenerPuntosTotales()}`;
        }
    };

    export const mostrarMensaje = (mensaje: string) => {
        const elementoParrafo = document.getElementById('mensaje');
        if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement) {
            elementoParrafo.textContent = mensaje;
        }
    };

 


