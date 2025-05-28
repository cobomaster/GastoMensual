import React, { useState } from 'react';
import FormularioGasto from './FormularioGasto';

const ListaGastosApp = () => {
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastoEditar] = useState(null);

  const agregarGasto = (gasto) => {
    if (gasto.id && gastos.some((g) => g.id === gasto.id)) {
      // Editar gasto existente
      setGastos((prevGastos) =>
        prevGastos.map((g) => (g.id === gasto.id ? gasto : g))
      );
    } else {
      // Agregar gasto nuevo
      setGastos((prevGastos) => [...prevGastos, gasto]);
    }
    setGastoEditar(null); // Limpiar estado edición
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
    <div className="min-h-screen bg-gray-100 p-4">
      <FormularioGasto agregarGasto={agregarGasto} gastoEditar={gastoEditar} limpiarEditar={() => setGastoEditar(null)} />

      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Lista de Gastos</h2>

        {gastos.length === 0 ? (
          <p className="text-center text-gray-600">No hay gastos aún.</p>
        ) : (
          <ul className="space-y-2">
            {gastos.map((gasto) => (
              <li
                key={gasto.id}
                className="p-3 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{gasto.nombre}</p>
                  <p className="text-sm text-gray-600 capitalize">{gasto.categoria}</p>
                </div>
                <span className="text-blue-600 font-bold">
                  €{Number(gasto.cantidad).toFixed(2)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => editarGasto(gasto)}
                    className="text-green-600 hover:text-green-800"
                    title="Editar gasto"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => eliminarGasto(gasto.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Eliminar gasto"
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
