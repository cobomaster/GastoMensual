import React, { useState, useEffect } from 'react';
import FormularioGasto from './FormularioGasto';

const ListaGastosApp = () => {
  const [gastos, setGastos] = useState(() => {
    // Cargar los gastos guardados al inicio o empezar vacío
    const gastosGuardados = localStorage.getItem('gastos');
    return gastosGuardados ? JSON.parse(gastosGuardados) : [];
  });

  const [gastoEditar, setGastoEditar] = useState(null);

  // Guardar gastos en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos));
  }, [gastos]);

  const agregarGasto = (gasto) => {
    setGastos((prevGastos) => [...prevGastos, gasto]);
  };

  const actualizarGasto = (gastoActualizado) => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === gastoActualizado.id ? gastoActualizado : gasto
      )
    );
    setGastoEditar(null);
  };

  const eliminarGasto = (id) => {
    setGastos((prevGastos) => prevGastos.filter((gasto) => gasto.id !== id));
    if (gastoEditar && gastoEditar.id === id) {
      setGastoEditar(null);
    }
  };

  const editarGasto = (gasto) => {
    setGastoEditar(gasto);
  };

  return (
   <div className="app-container">
  <FormularioGasto
    AgregarGasto={agregarGasto}
    gastoEditar={gastoEditar}
    actualizarGasto={actualizarGasto}
  />

  <div className="lista-gastos-container">
    <h2>Lista de Gastos</h2>

    {gastos.length === 0 ? (
      <p className="lista-vacia">No hay gastos aún.</p>
    ) : (
      <ul className="lista-gastos">
        {gastos.map((gasto) => (
          <li key={gasto.id} className="gasto-item">
            <div className="gasto-detalles">
              <p>{gasto.nombre}</p>
              <p>{gasto.categoria}</p>
            </div>
            <span className="gasto-cantidad">€{Number(gasto.cantidad).toFixed(2)}</span>
            <div className="botones-gasto">
              <button
                onClick={() => editarGasto(gasto)}
                className="boton-editar"
                title="Editar gasto"
                type="button"
              >
                ✏️
              </button>
              <button
                onClick={() => eliminarGasto(gasto.id)}
                className="boton-eliminar"
                title="Eliminar gasto"
                type="button"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>
  );
};

export default ListaGastosApp;