import {
    actualizarPuntosTotales,
    obtenerPuntosTotales
} from './modeloo';

import { 
    gestionarPartida,
    mensajeQueHubieraPasado,
    obtenerMensajeCuandoMePlanto,
    sumarPuntos,
    obtenerPuntosCarta,
    generarcarta,
    generarNumeroAleatorio
 } from './motorr';






 const obtenerUrlCarta = (carta: number): string => {
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

     const mostrarUrlCarta = (urlCarta: string): void => {
        const elementoImagen = document.getElementById('base');
        if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
            elementoImagen.src = urlCarta;
        }
    };

    const mostrarPuntuacion = () => {
        const elementoParrafo = document.getElementById('resultado');
        if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement) {
            elementoParrafo.textContent = `Puntos: ${obtenerPuntosTotales()}`;
        }
    };

 const mostrarMensaje = (mensaje: string) => {
        const elementoParrafo = document.getElementById('mensaje');
        if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement) {
            elementoParrafo.textContent = mensaje;
        }
    };

    
     const llamarCarta = ()  => {
        const numeroAleatorio = generarNumeroAleatorio();
        const carta = generarcarta(numeroAleatorio);
        const urlCarta = obtenerUrlCarta(carta);
        mostrarUrlCarta(urlCarta);
        const puntos = obtenerPuntosCarta(carta);
        const puntosAcumulados = sumarPuntos(puntos);
        actualizarPuntosTotales(puntosAcumulados);
        mostrarPuntuacion();
        gestionarPartida();
        
    }
const llamarNuevoJuego = () => {
      actualizarPuntosTotales(0);
      mostrarPuntuacion();
      mostrarMensaje('');
      mostrarUrlCarta('src/assets/back.jpg');
      desactivarBtnCarta(false);
      desactivarBtnPlantarse(false);
    
    }
const llamarPlantarse = () => {
        const mensaje = obtenerMensajeCuandoMePlanto();
        mostrarMensaje(mensaje);
        desactivarBtnCarta(true);
        desactivarBtnPlantarse(true);
      } 

const llamarQueHubieraPasado = () => {
        const numeroAleatorio = generarNumeroAleatorio();
        const carta = generarcarta(numeroAleatorio);
        const urlCarta = obtenerUrlCarta(carta);
        mostrarUrlCarta(urlCarta);
        const puntos = obtenerPuntosCarta(carta);
        const puntosAcumulados = sumarPuntos(puntos);
        actualizarPuntosTotales(puntosAcumulados);
        const mensaje = mensajeQueHubieraPasado();
        mostrarMensaje(mensaje);
      }
      





    const desactivarBtnCarta =(estaActivo: boolean) => {
        const btnPedirCarta = document.getElementById('pedirCarta');
        if (btnPedirCarta !== null && btnPedirCarta !== undefined && btnPedirCarta instanceof HTMLButtonElement){
          btnPedirCarta.disabled = estaActivo;
        }
      }
      
    const desactivarBtnPlantarse =(estaActivo: boolean) => {
        const btnPlantarse = document.getElementById('plantarse');
        if (btnPlantarse !== null && btnPlantarse !== undefined && btnPlantarse instanceof HTMLButtonElement){
          btnPlantarse.disabled = estaActivo;  
        }
      }

export const cargarPartida = () => {

const btnPedirCarta = document.getElementById('pedirCarta');
if (btnPedirCarta !== null && btnPedirCarta !==undefined && btnPedirCarta instanceof HTMLButtonElement){
        btnPedirCarta.addEventListener ('click', llamarCarta) ;
    } 
const btnEmpezarPartida = document.getElementById('empezarPartida');
if (btnEmpezarPartida !== null && btnEmpezarPartida !== undefined && btnEmpezarPartida instanceof HTMLButtonElement){
  btnEmpezarPartida.addEventListener ('click', llamarNuevoJuego );
}
const btnPlantarse = document.getElementById('plantarse');
if (btnPlantarse !== null && btnPlantarse !== undefined && btnPlantarse instanceof HTMLButtonElement){
  btnPlantarse.addEventListener ('click', llamarPlantarse);
}
const btnQueHubieraPasado = document.getElementById('mostrarQuehubieraPasado');
if (btnQueHubieraPasado !== null && btnQueHubieraPasado !== undefined && btnQueHubieraPasado instanceof HTMLButtonElement){
  btnQueHubieraPasado.addEventListener ('click', llamarQueHubieraPasado)
}
}




 


