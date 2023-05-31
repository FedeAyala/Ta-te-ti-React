import { Cuadrado } from './Cuadrado';
export function GanadorModal({ ganador, reiniciarJuego }) {
  if (ganador === null) return null;

  const textoGanador = ganador === false ? 'Empate' : 'Ganó:';
  return (
    <section className="winner">
      <div className="text">
        <h2>{textoGanador}</h2>
        {ganador && (
          <header className="win">
            <Cuadrado>{ganador}</Cuadrado>
          </header>
        )}
        <footer>
          <button onClick={reiniciarJuego}>Empezar de Nuevo</button>
        </footer>
      </div>
    </section>
  );
}
