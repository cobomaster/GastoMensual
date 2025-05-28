import React, { useState } from 'react';
import FormularioGasto from './FormularioGasto';

const ListaGastosApp = () => {
  const [gastos, setGastos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  const agregarGasto = (gasto) => {
    setGastos((prevGastos) => [...prevGastos, gasto]);
  };

  const eliminarGasto = (id) => {
    setGastos((prevGastos) => prevGastos.filter((gasto) => gasto.id !== id));
  };

  // Filtrar gastos según la categoría seleccionada
  const gastosFiltrados = filtroCategoria
    ? gastos.filter((gasto) => gasto.categoria === filtroCategoria)
    : gastos;

  // Calcular total de gastos filtrados
  const totalGastos = gastosFiltrados.reduce((total, gasto) => total + Number(gasto.cantidad), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FormularioGasto AgregarGasto={agregarGasto} />

      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Lista de Gastos</h2>

        {/* Selector filtro de categoría */}
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="filtroCategoria">
            Filtrar por categoría
          </label>
          <select
            id="filtroCategoria"
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Todas las categorías</option>
            <option value="comida">Comida</option>
            <option value="transporte">Transporte</option>
            <option value="entretenimiento">Entretenimiento</option>
            <option value="hogar">Hogar</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        {gastosFiltrados.length === 0 ? (
          <p className="text-center text-gray-600">No hay gastos para mostrar.</p>
        ) : (
          <ul className="space-y-2">
            {gastosFiltrados.map((gasto) => (
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
                <button
                  onClick={() => eliminarGasto(gasto.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Eliminar gasto"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Mostrar total */}
        <div className="mt-6 text-center font-bold text-lg">
          Total gastos: €{totalGastos.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ListaGastosApp;