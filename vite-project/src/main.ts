import './style.css';

let puntosTotales = 0;

const generarNumeroAleatorio = (): number => {
   return Math.floor(Math.random() * 10) +1;  
}
const generarcarta= (numeroAleatorio : number): number =>{
    if (numeroAleatorio > 7){
        return numeroAleatorio +2;
    } 
    return numeroAleatorio;
}

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
    const elementoImagen= document.getElementById('base');
    if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
      elementoImagen.src = urlCarta;
    }
  };
 
  const obtenerPuntosCarta = (carta:number): number => {
    if(carta >7) {
      return 0.5;
    }
    return carta; 
  }

const sumarPuntos =(puntosCarta: number):number => {
  return puntosCarta + puntosTotales;
} 

const actualizarPuntosTotales =(puntos: number):void =>  {
  puntosTotales = puntos;

}

const mostrarPuntuacion = () => {
  const elementoParrafo = document.getElementById('resultado');
  if (elementoParrafo !== null && elementoParrafo !== undefined && elementoParrafo instanceof HTMLParagraphElement){ 
    elementoParrafo.textContent = `Puntos: ${puntosTotales}`; 
 }
}

const gestionarPartida = ( ) => {
  if (puntosTotales > 7.5){
    mostrarMensaje('Has Perdido');
    desactivarBtnCarta(true);
    desactivarBtnPlantarse(true);
  } else if (puntosTotales === 7.5 ){
    mostrarMensaje('Has Ganado');
    desactivarBtnCarta(true);
    desactivarBtnPlantarse(true);
  }
}

const obtenerMensajeCuandoMePlanto = () => {
  if (puntosTotales < 4){
    return 'Has sido muy conservador';
  } else if (puntosTotales === 5 || puntosTotales < 6){
    return 'te ha entrado el canguelo';
  } else if (puntosTotales === 6 || puntosTotales === 7 ){
    return 'casi casi';
  } else if (puntosTotales === 7.5) {
    return ' Enorabuena lo has clavado';
  }
  return 'Has perdido';
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

const mostrarMensaje = (mensaje: string) => {
  const elementoDiv = document.getElementById('mensaje');
  if (elementoDiv !== null && elementoDiv !== undefined && elementoDiv instanceof HTMLDivElement){
    elementoDiv.textContent = mensaje;
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

const mensajeQueHubieraPasado = (): string => {
  if (puntosTotales === 7.5){
    return `Has ganado, tu puntuacion es ${puntosTotales}`;
  } else if (puntosTotales > 7.5){
    return `Has perdido tu puntuacion es ${puntosTotales}`;
  }
  return `tu puntuacion es ${puntosTotales}`;
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