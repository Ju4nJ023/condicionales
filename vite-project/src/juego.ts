import './style.css'
type Carta = {
  nombre: string;
  valor: number;
};

let baraja: Carta[] = [];
let puntos = 0;
let jugando = false;
let cartasVisibles = false;

const mensajeEl = document.getElementById("mensaje")!;
const logEl = document.getElementById("log")!;
const pedirBtn = document.getElementById("pedir")!;
const plantarseBtn = document.getElementById("plantarse")!;
const iniciarBtn = document.getElementById("iniciar")!;
const mesa = document.getElementById("mesa")!;
const mostrarCartasBtn = document.getElementById("mostrarCartasBtn")!;




const cartaImagenes :{[key: string]: string} = {
  "1_as-copas": new URL('./assets/1_as-copas.jpg', import.meta.url).href,
  "2_dos-copas": new URL('./assets/2_dos-copas.jpg', import.meta.url).href,
  "3_tres-copas": new URL('./assets/3_tres-copas.jpg', import.meta.url).href,
  "4_cuatro-copas": new URL('./assets/4_cuatro-copas.jpg', import.meta.url).href,
  "5_cinco-copas": new URL('./assets/5_cinco-copas.jpg', import.meta.url).href,
  "6_seis-copas": new URL('./assets/6_seis-copas.jpg', import.meta.url).href,
  "7_siete-copas": new URL('./assets/7_siete-copas.jpg', import.meta.url).href,
  "10_sota-copas": new URL('./assets/10_sota-copas.jpg', import.meta.url).href,
  "11_caballo-copas": new URL('./assets/11_caballo-copas.jpg', import.meta.url).href,
  "12_rey-copas": new URL('./assets/12_rey-copas.jpg', import.meta.url).href,
  "back_as": new URL('./assets/back.jpg', import.meta.url).href,
};

function normalizarNombreCarta(nombre: string): string {
  const traducciones: { [key: string]: string } = {
    "As": "1_as",
    "2": "2_dos",
    "3": "3_tres",
    "4": "4_cuatro",
    "5": "5_cinco",
    "6": "6_seis",
    "7": "7_siete",
    "Sota": "10_sota",
    "Caballo": "11_caballo",
    "Rey": "12_rey",
  };

  const partes = nombre.split(" de ");
  const nombreCarta = traducciones[partes[0]] || "";
  const palo = partes[1]?.toLowerCase() || "";

  return `${nombreCarta}-${palo}`;
}


function crearBaraja(): Carta[] {
  const palos = [ "Copas",];
  const valores = [1, 2, 3, 4, 5, 6, 7, 0.5, 0.5, 0.5];
  const nombres = ["As", "2", "3", "4", "5", "6", "7", "Sota", "Caballo", "Rey"];

  let baraja: Carta[] = [];
  for (const palo of palos) {
    for (let i = 0; i < nombres.length; i++) {
      baraja.push({ nombre: `${nombres[i]} de ${palo}`, valor: valores[i] });
    }
  }
  return baraja;
}

function barajar(baraja: Carta[]): Carta[] {
  for (let i = baraja.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
  }
  return baraja;
}

function iniciarJuego(): void {
  baraja = barajar(crearBaraja());
  puntos = 0;
  jugando = true;

  // Mostrar mensaje inicial
  mensajeEl.textContent = "El juego ha comenzado. ¡Pide una carta!";
  logEl.innerHTML = "";

  // Habilitar botones
  pedirBtn.removeAttribute("disabled");
  plantarseBtn.removeAttribute("disabled");

  // Mostrar botón de pedir y opciones
  pedirBtn.style.display = "block";
  plantarseBtn.style.display = "inline-block";
  mostrarCartasBtn.style.display = "inline-block";

  // Ocultar el botón de iniciar
  iniciarBtn.style.display = "none";
  (document.getElementById("opciones") as HTMLElement).style.display = "block";

}

function pedirCarta(): void {

  if (baraja.length === 0) {
    mensajeEl.textContent = "No quedan más cartas en la baraja.";
    return;
  }

  const carta = baraja.pop()!; // Obtener la última carta de la baraja
  puntos += carta.valor; // Sumar su valor a los puntos del jugador

  mostrarCarta(carta.nombre);

  
  logEl.innerHTML += `<p>Has sacado: ${carta.nombre} (valor: ${carta.valor}). Puntos totales: ${puntos}</p>`;

  if (puntos > 7.5) {
    mensajeEl.textContent = "¡Te has pasado! Fin del juego.";
    terminarJuego();
  }
}

function plantarse(): void {
  let mensajeFinal = "";
  const puntosRedondeados = Math.floor(puntos); 

  if (puntosRedondeados < 4) {
    mensajeFinal = "Has sido muy conservador.";
  } else if (puntosRedondeados === 5) {
    mensajeFinal = "Te ha entrado el canguelo eh?";
  } else if (puntosRedondeados === 6 || puntosRedondeados === 7) {
    mensajeFinal = "Casi casi...";
  } else if (puntos === 7.5) {
    mensajeFinal = "¡Lo has clavado! ¡Enhorabuena!";
  } else {
    mensajeFinal = "Puntuación inesperada.";
  }
  mensajeEl.textContent = `${mensajeFinal} Te plantaste con ${puntos} puntos.`;
  
 
  terminarJuego();
}

function terminarJuego(): void {
  jugando = false;
  pedirBtn.style.display = "none";
  plantarseBtn.style.display = "none";
  mostrarCartasBtn.style.display = "none";
  iniciarBtn.style.display = "block";
  mesa.innerHTML = "";
}


function toggleCartas() {
  const mesa = document.getElementById("mesa");
  if (!mesa) {
    console.error("No se ha encontrado el elemento con el id 'mesa'.");
    return;
  }

  if (cartasVisibles) {
    // Ocultar cartas
    mesa.innerHTML = ""; // Vaciar el contenedor de cartas
    cartasVisibles = false; // Actualizar estado
  } else {
    // Mostrar cartas
    mostrarTodasLasCartas();
    cartasVisibles = true; // Actualizar estado
  }
}


function mostrarCarta(cartaNombre: string): void {
  if (!mesa) return;

  const img = document.createElement("img");

  // Normaliza el nombre de la carta
  const nombreNormalizado = normalizarNombreCarta(cartaNombre);

  if (cartaImagenes[nombreNormalizado]) {
    img.src = cartaImagenes[nombreNormalizado]; // Usa la imagen asociada a la carta
  } else {
    console.error(`No se encontró la imagen para la carta: ${cartaNombre}`);
    img.src = cartaImagenes["back_as"]; // Imagen por defecto (reverso de la carta)
  }

  img.alt = `Carta ${cartaNombre}`;
  img.classList.add("carta");


  mesa.innerHTML = "";
  mesa.appendChild(img);
}


function mostrarTodasLasCartas(): void {
  if (!mesa) return;

  // Limpiar el contenido de la mesa
  mesa.innerHTML = "";

  // Recorre todas las cartas de la baraja
  for (const cartaKey in cartaImagenes) {
    if (cartaKey !== "back_as") { // Ignora la imagen de la parte trasera

      // Contenedor para cada carta
      const cartaContainer = document.createElement("div");
      cartaContainer.classList.add("carta-container");

      // Imagen de la carta
      const img = document.createElement("img");
      img.src = cartaImagenes[cartaKey];
      img.alt = `Carta ${cartaKey}`;
      img.classList.add("carta");

      // Texto del valor de la carta
      const valorCarta = document.createElement("p");
      valorCarta.textContent = `Valor: ${obtenerValorCarta(cartaKey)}`;
      valorCarta.classList.add("valor-carta");

      // Agregar la imagen y el texto al contenedor
      cartaContainer.appendChild(img);
      cartaContainer.appendChild(valorCarta);

      // Agregar el contenedor de la carta a la mesa
      mesa.appendChild(cartaContainer);
    }
  }
}

function obtenerValorCarta(cartaKey: string): number {
  if (cartaKey.startsWith("1_as")) return 1;
  if (cartaKey.startsWith("2_")) return 2;
  if (cartaKey.startsWith("3_")) return 3;
  if (cartaKey.startsWith("4_")) return 4;
  if (cartaKey.startsWith("5_")) return 5;
  if (cartaKey.startsWith("6_")) return 6;
  if (cartaKey.startsWith("7_")) return 7;
  if (cartaKey.startsWith("10_") || cartaKey.startsWith("11_") || cartaKey.startsWith("12_")) return 0.5;

  return 0; // Valor predeterminado para casos no manejados
}

const boton = document.getElementById("mostrarCartasBtn");
if (boton) {
  boton.addEventListener("click", toggleCartas);
}


// Asignar eventos
iniciarBtn.addEventListener("click", iniciarJuego);
pedirBtn.addEventListener("click", pedirCarta);
plantarseBtn.addEventListener("click", plantarse);