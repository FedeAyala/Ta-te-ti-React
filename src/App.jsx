import { useState } from 'react';
import './App.css';
import { TURNOS } from './constants.js';
import { Cuadrado } from './components/Cuadrado';
import { comprobarGanador, comprobarFinJuego } from './logic/tablero';
import { GanadorModal } from './components/GanadorModal.jsx';
import { guardarPartida, reiniciarPartida } from './logic/storagePartida.js';
function App() {
  const [tablero, setTablero] = useState(() => {
    const tableroDelLocalStorage = window.localStorage.getItem('tablero');
    if (tableroDelLocalStorage) return JSON.parse(tableroDelLocalStorage);
    return Array(9).fill(null);
  });

  const [turno, setTurno] = useState(() => {
    const turnoDelLocalStorage = window.localStorage.getItem('turno');
    return turnoDelLocalStorage ?? TURNOS.X;
  });
  const [ganador, setGanador] = useState(null); //Null = no hay ganador;false =empate

  const reiniciarJuego = () => {
    setTablero(Array(9).fill(null));
    setTurno(TURNOS.X);
    setGanador(null);
    reiniciarPartida();
  };

  const actualizarTablero = (index) => {
    if (tablero[index] || ganador) return; //Retorno si el tablero en X posicion tiene algo
    //Actualizar tablero
    const nuevoTablero = [...tablero];
    nuevoTablero[index] = turno;
    setTablero(nuevoTablero);
    //Para actualizar estados siempre hay que hacer copias, en los arreglos.
    //Siempre debe ser inmutable
    //Actualizar Turno
    const nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);
    guardarPartida({ tablero: nuevoTablero, turno: nuevoTurno });
    //Revisar si hay ganador
    const nuevoGanador = comprobarGanador(nuevoTablero);

    if (nuevoGanador) {
      setGanador(nuevoGanador);
    } else if (comprobarFinJuego(nuevoTablero)) {
      setGanador(false);
    }
  };

  return (
    <main className="board">
      <h1>Ta Te Ti en React</h1>
      <section className="game">
        {tablero.map((cuadrado, index) => {
          return (
            <Cuadrado
              key={index}
              index={index}
              actualizarTablero={actualizarTablero}
            >
              {cuadrado}
            </Cuadrado>
          );
        })}
      </section>
      <section>
        <br />
        <h1>Turno De:</h1>
      </section>
      <section className="turn">
        <Cuadrado seleccionado={turno === TURNOS.X}>{TURNOS.X}</Cuadrado>
        <Cuadrado seleccionado={turno === TURNOS.O}>{TURNOS.O}</Cuadrado>
      </section>
      <GanadorModal ganador={ganador} reiniciarJuego={reiniciarJuego} />
    </main>
  );
}

export default App;
