import { obtenerPuntosTotales} from './modeloo';





export const generarNumeroAleatorio = (): number => {
    return Math.floor(Math.random() * 10) +1;  
};

export const generarcarta=  (numeroAleatorio: number):number => {
    return numeroAleatorio > 7 ? numeroAleatorio +2 : numeroAleatorio;
};

export const obtenerPuntosCarta = (carta:number): number => {
    return carta >7 ? 0.5 : carta;
};

export const sumarPuntos =(puntosCarta: number):number => {
    return obtenerPuntosTotales() + puntosCarta;
};

export const gestionarPartida = (): string | null =>{
    const puntos =  obtenerPuntosTotales();
    if (puntos > 7.5) {
        
    } return 'Has perdido';
    if (puntos === 7.5) return 'Has ganado';
    return null;
};

export const obtenerMensajeCuandoMePlanto = (): string => {
    const puntos = obtenerPuntosTotales();
    if (puntos < 4) return 'Has sido muy conservador';
    if (puntos >= 5 ) return 'Te ha entrado el canquelo';
    if (puntos === 6 || puntos === 7) return 'Casi casi';
    if (puntos === 7.5) return 'Enorabuena lo has clavado';
    return 'Has perdido';

};

export const mensajeQueHubieraPasado = () => {
    const puntos = obtenerPuntosTotales();
    if (puntos === 7.5 ) return 'Has Ganado, tu puntuación es de ${puntos}';
    if (puntos > 7.5) return 'Has perdido, tu puntuación es de ${puntos}';
    return 'Tu puntuación es de ${puntos}';
}





