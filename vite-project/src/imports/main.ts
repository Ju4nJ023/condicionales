import './style.css';

import { actualizarPuntosTotales
  } from './modeloo';

import { 
  generarNumeroAleatorio, 
  generarcarta, 
  obtenerPuntosCarta, 
  sumarPuntos, 
  gestionarPartida, 
  obtenerMensajeCuandoMePlanto, 
  mensajeQueHubieraPasado 
} from './motorr';

import { obtenerUrlCarta, mostrarUrlCarta, mostrarPuntuacion, mostrarMensaje } from './uii';






  
  

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