export type EstadoPartida = 'Has ganado' | 'Has perdido' | 'Continua jugando';

interface Partida {
    puntosTotales : number;
    estadoPartida : EstadoPartida;
    
}
export const partida : Partida = {
    puntosTotales: 0,
    estadoPartida: 'Continua jugando'
}


export const actualizarPuntosTotales = (puntos:  number): void => {
    partida.puntosTotales = puntos;
};

