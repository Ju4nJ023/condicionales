import {
    actualizarPuntosTotales,
    partida, 
    

} from './modeloo';

import { 

    
    obtenerMensajeCuandoMePlanto,
    sumarPuntos, 
    obtenerPuntosCarta,
    generarcarta,
    generarNumeroAleatorio,
    obtenerEstadoPartida
    
 } from './motorr';



 export const gestionarPartida = (): void =>{
  const estado = obtenerEstadoPartida();

  console.log("Estado de la partida: ", obtenerEstadoPartida());


   if  (estado === 'Has ganado' ){
    mostrarMensaje(`Has ganado  con ${partida.puntosTotales} puntos`);
    desactivarBtnCarta(true);
    desactivarBtnPlantarse(true);
   }
   if (estado === 'Has perdido' ){
    mostrarMensaje(`Has perdido con ${partida.puntosTotales} puntos`);
    desactivarBtnCarta(true);
    desactivarBtnPlantarse(true);
   }
};



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
            elementoParrafo.textContent = `Puntos: ${partida.puntosTotales}`;
            mostrarMensaje(`Estos son tus puntos : ${partida.puntosTotales}`);
        }
    };


    const mostrarMensajeQueHubieraPasado = (mensaje: string) => {
      const elementoParrafo = document.getElementById('resultadoHubieraPasado');
      if (elementoParrafo instanceof HTMLParagraphElement) {
          elementoParrafo.textContent = mensaje;
      }
  };

 const mostrarMensaje = (mensaje: string) => {
        const elementoParrafo = document.getElementById('mensaje');
        if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement) {
            elementoParrafo.textContent = mensaje;
        } else {
            console.error("No se ha encontrado el elemento párrafo con id= 'mensaje'.verifica que el id sea correcto");
        }
    };

    
     const llamarCarta = ()  => {
        const numeroAleatorio = generarNumeroAleatorio();
        const carta = generarcarta(numeroAleatorio);
        const urlCarta = obtenerUrlCarta(carta);
        mostrarUrlCarta(urlCarta);
        const puntos = obtenerPuntosCarta(carta);
        actualizarPuntosTotales(sumarPuntos(puntos));
        mostrarPuntuacion();
        gestionarPartida();
        
    };
const llamarNuevoJuego = () => {
      actualizarPuntosTotales(0);
      mostrarPuntuacion();
      mostrarMensaje('');
      mostrarMensajeQueHubieraPasado('');
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
        const puntosSimulados = partida.puntosTotales + puntos;
        const mensaje = `Si hubieras pedido carta, tu puntuación sería de ${puntosSimulados} puntos`;
        mostrarMensajeQueHubieraPasado(mensaje); 
};


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




 


