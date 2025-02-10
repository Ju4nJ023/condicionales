import './style.css';

// Función para generar un número aleatorio de carta
const generarNumeroAleatorio = (): number => {
  const numerosCartas = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
  return numerosCartas[Math.floor(Math.random() * numerosCartas.length)];
};

// Elementos del DOM
const resultadoPantalla = document.getElementById('resultado');
const puntosPantalla = document.getElementById('puntos');
const elementoImagen = document.getElementById('imagenCarta');
const mensajeEl = document.getElementById('mensaje');
const cartasContainer = document.getElementById('cartasContainer');

// Función para obtener la URL de la carta
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

// Función para mostrar la URL de la carta en la imagen
const mostrarUrlCarta = (urlCarta: string): void => {
  if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
    elementoImagen.src = urlCarta;
  }
};

// Función para obtener los puntos de la carta
const obtenerPuntosCarta = (carta: number): number => {
  return carta > 7 ? 0.5 : carta;
};

// Variable para almacenar los puntos totales
let puntosTotales = 0;

// Función para actualizar los puntos en la pantalla
const actualizarPuntosTotales = (): void => {
  if (puntosPantalla) {
    puntosPantalla.innerHTML = `Puntos: ${puntosTotales}`;
  }
};

// Función para gestionar el estado de la partida
const gestionarPartida = (): void => {
  if (puntosTotales === 7.5) {
    alert('¡Has ganado!');
    reiniciarPartida();
  } else if (puntosTotales > 7.5) {
    alert(`¡Te has pasado! Puntuación final: ${puntosTotales}`);
    reiniciarPartida();
  }
};

// Función para reiniciar la partida
const reiniciarPartida = (): void => {
  console.log("🔄 Reiniciando partida...");

  // Resetear puntos
  puntosTotales = 0;
  actualizarPuntosTotales();

  // Resetear mensaje
  if (mensajeEl) {
    mensajeEl.textContent = "";
  }

  // Resetear imagen de la carta
  if (elementoImagen && elementoImagen instanceof HTMLImageElement) {
    elementoImagen.src = "src/assets/back.jpg";
  }

  // Asegurar que el contenedor de resultados se limpie
  if (resultadoPantalla) {
    resultadoPantalla.innerHTML = "";
  }

  document.getElementById("empezarPartida")?.classList.remove("hidden");
  document.getElementById("pedirCarta")?.classList.remove("visible");
  document.getElementById("plantarse")?.classList.remove("visible");
  document.getElementById("mostrarCarta")?.classList.remove("visible");

  // Limpiar las cartas en pantalla
  if (cartasContainer) {
    cartasContainer.innerHTML = "";
  }
  
};

// Función para pedir una carta
const pedirCarta = (): void => {
  const numeroAleatorio = generarNumeroAleatorio();
  const urlCarta = obtenerUrlCarta(numeroAleatorio);
  mostrarUrlCarta(urlCarta);

  if (resultadoPantalla) {
    resultadoPantalla.innerHTML = `<img src="${urlCarta}" alt="Carta aleatoria" style="width: 150px; height: auto;"/>`;
  }

  const puntosCarta = obtenerPuntosCarta(numeroAleatorio);
  puntosTotales += puntosCarta;
  actualizarPuntosTotales();

  if (mensajeEl) {
    mensajeEl.textContent = `Llevas ${puntosTotales} puntos.`;
  }

  gestionarPartida();
};

// Función para iniciar la partida
const iniciarPartida = (): void => {
  reiniciarPartida();
  console.log("🚀 Partida iniciada");

  // Obtener los botones
  document.getElementById("empezarPartida")?.classList.add("hidden");
  document.getElementById("pedirCarta")?.classList.add("visible");
  document.getElementById("plantarse")?.classList.add("visible");
  document.getElementById("mostrarCarta")?.classList.add("visible");

  
};

// Función para plantarse
const plantarse = (): void => {
  const siguienteCarta = generarNumeroAleatorio();
  const urlSiguienteCarta = obtenerUrlCarta(siguienteCarta);
  const puntosSiguienteCarta = obtenerPuntosCarta(siguienteCarta);
  mostrarUrlCarta(urlSiguienteCarta);
 
  

  // Determinar el mensaje final según la puntuación
  let mensajeFinal = "";
  const puntosRedondeados = Math.floor(puntosTotales); // Redondeamos hacia abajo

  if (puntosRedondeados < 4) {
    mensajeFinal = "Has sido muy conservador.";
  } else if (puntosRedondeados === 5) {
    mensajeFinal = "Te ha entrado el canguelo eh?";
  } else if (puntosRedondeados === 6 || puntosRedondeados === 7) {
    mensajeFinal = "Casi casi...";
  } else if (puntosTotales === 7.5) {
    mensajeFinal = "¡Lo has clavado! ¡Enhorabuena!";
  } else {
    mensajeFinal = "Puntuación inesperada.";
  }


  if (mensajeEl) {
    mensajeEl.textContent = `${mensajeFinal} Te plantaste con ${puntosTotales} puntos. La siguiente carta habría sumado ${puntosSiguienteCarta} puntos.`;
  
  } 

  setTimeout(() => {
    reiniciarPartida();
  }, 3000);
};

// Función para mostrar todas las cartas
const mostrarTodasLasCartas = (): void => {
  if (!cartasContainer) return; // Si no existe el contenedor, salir

  // Limpiar el contenedor antes de mostrar las cartas
  cartasContainer.innerHTML = '';

  // Array con los valores de las cartas
  const valoresCartas: number[] = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

  // Recorrer los valores y mostrar cada carta
  valoresCartas.forEach((carta) => {
    const imagenCarta = obtenerUrlCarta(carta);

    // Crear un div para cada carta
    const cartaDiv = document.createElement('div');
    cartaDiv.className = 'carta';

    // Crear la imagen de la carta
    const imgElement = document.createElement('img');
    imgElement.src = imagenCarta;
    imgElement.alt = `Carta ${carta}`;

    // Crear un párrafo para mostrar el valor de la carta
    const valorCarta = document.createElement('p');
    const puntosCarta = obtenerPuntosCarta(carta);
    valorCarta.textContent = `Valor: ${puntosCarta}`;

    // Agregar la imagen y el valor al div de la carta
    cartaDiv.appendChild(imgElement);
    cartaDiv.appendChild(valorCarta);

    // Agregar la carta al contenedor
    cartasContainer.appendChild(cartaDiv);
  });
};

// Asignar eventos a los botones
const butonPedirCarta = document.getElementById('pedirCarta');
if (butonPedirCarta && butonPedirCarta instanceof HTMLButtonElement) {
  butonPedirCarta.addEventListener('click', pedirCarta);
}

const botonIniciar = document.getElementById('empezarPartida');
if (botonIniciar && botonIniciar instanceof HTMLButtonElement) {
  botonIniciar.addEventListener('click', iniciarPartida);
}

const botonPlantarse = document.getElementById('plantarse');
if (botonPlantarse && botonPlantarse instanceof HTMLButtonElement) {
  botonPlantarse.addEventListener('click', plantarse);
}

const mostrarCartasBtn = document.getElementById('mostrarCarta');
if (mostrarCartasBtn && mostrarCartasBtn instanceof HTMLButtonElement) {
  mostrarCartasBtn.addEventListener('click', mostrarTodasLasCartas);
}  
const asignarEvento = (id: string, handler: () => void) => {
  const btn = document.getElementById(id);
  if (btn && btn instanceof HTMLButtonElement) btn.addEventListener('click', handler);
};

asignarEvento('pedirCarta', pedirCarta);
asignarEvento('empezarPartida', iniciarPartida);
asignarEvento('plantarse', plantarse);
asignarEvento('mostrarCarta', mostrarTodasLasCartas);
