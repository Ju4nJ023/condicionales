import { EstadoPartida, partida} from './modelo';





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
    return partida.puntosTotales + puntosCarta;
};

export const obtenerEstadoPartida = (): EstadoPartida  => {
    if (partida.puntosTotales === 7.5) {
      return 'Has ganado';

    }else if (partida.puntosTotales > 7.5) {
     return 'Has perdido';
}
return 'Continua jugando';
}


export const obtenerMensajeCuandoMePlanto = (): string => {
    
    if (partida.puntosTotales < 4) return 'Has sido muy conservador';
    if (partida.puntosTotales === 6 || partida.puntosTotales === 7) return 'Casi casi';
    if (partida.puntosTotales === 7.5) return 'Enorabuena lo has clavado';
    if (partida.puntosTotales >= 5 ) return 'Te ha entrado el canquelo';
    return 'Has perdido';

};







