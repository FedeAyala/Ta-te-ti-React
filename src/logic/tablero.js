import { COMBOS_GANADORES } from '../constants';
export const comprobarGanador = (tableroComprobar) => {
  //Comprueba todos los combos para ver quien ganó (X u O)
  for (const combo of COMBOS_GANADORES) {
    const [a, b, c] = combo;
    if (
      tableroComprobar[a] &&
      tableroComprobar[a] === tableroComprobar[b] &&
      tableroComprobar[a] === tableroComprobar[c]
    ) {
      return tableroComprobar[a];
    }
  }
  //No hay ganadores
  return null;
};

export const comprobarFinJuego = (tableroComprobar) => {
  return tableroComprobar.every((cuadrado) => cuadrado !== null);
};
