import { describe } from "node:test";
import {  it, expect, vi } from 'vitest';
import { generarNumeroAleatorio, obtenerEstadoPartida,  obtenerMensajeCuandoMePlanto, generarcarta } from "../testing/motor";

import { obtenerUrlCarta } from "../testing/ui";
import {partida} from "./modelo";


describe( 'generarNumeroAleatorio', () => {
    it ('deberia devolver un numero aleatorio entre 0 y 10', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
        
        const numero = generarNumeroAleatorio();

        expect(numero).toBe (6);
    });
});

describe('generarcarta', () => {
    it ('deberia devolver un numero entre el 1 al 7 ', () => {
        const carta = generarcarta(7);

        expect(carta).toBe(7);
    });

    it ('Si el numero es superior a 7 deberia devolver el numero + 2', () => {
        const carta = generarcarta(8);

        expect(carta).toBe(10);
    });


});

describe  ('obtenerUrlCarta', () => {
    it  ('deberia devolver la url de la carta correspondiente', () => {
        vi.spyOn(Math, 'random').mockReturnValue(0);
        const numero = generarNumeroAleatorio();

     
        const url = obtenerUrlCarta(numero);

        
        expect(url).toBe('src/assets/1_as-copas.jpg');

    });
    it ('deberia devolver la url de la carta correspondiente cuando el numero es no valido', () => {
        vi.spyOn(Math, 'random').mockReturnValue(1.5);
        const numero = generarNumeroAleatorio();

        const url = obtenerUrlCarta(numero);

        expect(url).toBe('src/assets/back.jpg');
    });
        
});


describe( 'partida', () => {
    it ('deberia devolver "continua Jugando" si los puntos son menores a 7.5', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(5);
        
        const estado =obtenerEstadoPartida();
        
        expect(estado).toBe("Continua jugando");
        
    });
});

describe  ('obtenerEstadoPartida', () => {
    it ('deberia devolver "Has ganado" si los puntos son iguales a 7.5', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(7.5);

        const estado = obtenerEstadoPartida();

        expect(estado).toBe('Has ganado');
    
    });

    it ('devolver "Has perdido" si los puntos son mayores a 7.5', () => {

        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(8);

        const estado = obtenerEstadoPartida();

        expect(estado).toBe('Has perdido');

    });
});

describe ('obtenerMensajeCuandoMePlanto', () => {
    it ('deberia devolver "Has sido muy conservador" si los puntos son menores a 4', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(3);   

        const mensaje = obtenerMensajeCuandoMePlanto();

        expect(mensaje).toBe('Has sido muy conservador');
    });

    it ('deberia devolver "Te ha entrado el canquelo" si los puntos son mayores o iguales a 5', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(5);

        const mensaje = obtenerMensajeCuandoMePlanto();

        expect(mensaje).toBe('Te ha entrado el canquelo');
    });

    it ('deberia devolver "Casi casi" si los puntos son iguales a 6 o 7', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(6);

        const mensaje = obtenerMensajeCuandoMePlanto();

        expect(mensaje).toBe('Casi casi');
    });

    it ('deberia devolver "Enorabuena lo has clavado" si los puntos son iguales a 7.5', () => {
        vi.spyOn(partida, 'puntosTotales', "get").mockReturnValue(7.5);

        const mensaje = obtenerMensajeCuandoMePlanto();

        expect(mensaje).toBe('Enorabuena lo has clavado');
        });
   
});




