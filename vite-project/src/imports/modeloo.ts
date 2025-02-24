export let puntosTotales = 0;


export const actualizarPuntosTotales = (puntos:  number): void => {
    puntosTotales = puntos;
};

export const obtenerPuntosTotales = (): number => {
    return puntosTotales;
};
