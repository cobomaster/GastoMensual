import React, { useState } from 'react';
import FormularioGasto from './FormularioGasto';

const ListaGastosApp = () => {
  const [gastos, setGastos] = useState([]);

  const agregarGasto = (gasto) => {
    setGastos((prevGastos) => [...prevGastos, gasto]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FormularioGasto AgregarGasto={agregarGasto} />

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
                  €{gasto.cantidad.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListaGastosApp;
