export const Cuadrado = ({
  children,
  seleccionado,
  actualizarTablero,
  index,
}) => {
  const className = `square ${seleccionado ? 'is-selected' : ''}`;

  const handleClick = () => {
    actualizarTablero(index);
  };
  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
