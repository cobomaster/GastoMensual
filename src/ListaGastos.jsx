import React, { useState } from 'react';
import FormularioGasto from './FormularioGasto';

const ListaGastosApp = () => {
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastoEditar] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  // Añadir gasto nuevo
  const agregarGasto = (gasto) => {
    setGastos((prevGastos) => [...prevGastos, gasto]);
  };

  // Actualizar gasto editado
  const actualizarGasto = (gastoActualizado) => {
    setGastos((prevGastos) =>
      prevGastos.map((gasto) =>
        gasto.id === gastoActualizado.id ? gastoActualizado : gasto
      )
    );
    setGastoEditar(null); // limpiar edición
  };

  // Eliminar gasto
  const eliminarGasto = (id) => {
    setGastos((prevGastos) => prevGastos.filter((gasto) => gasto.id !== id));
    if (gastoEditar && gastoEditar.id === id) {
      setGastoEditar(null);
    }
  };

  // Al clicar editar, cargar gasto en formulario
  const editarGasto = (gasto) => {
    setGastoEditar(gasto);
  };

  // Filtrar gastos por categoría
  const gastosFiltrados =
    categoriaSeleccionada === 'todas'
      ? gastos
      : gastos.filter((gasto) => gasto.categoria === categoriaSeleccionada);

  // Calcular total filtrado
  const totalGastos = gastosFiltrados.reduce(
    (total, gasto) => total + Number(gasto.cantidad),
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <FormularioGasto
        AgregarGasto={agregarGasto}
        gastoEditar={gastoEditar}
        actualizarGasto={actualizarGasto}
      />

      <div className="max-w-md mx-auto mt-6">
        <label className="block mb-1 font-medium">Filtrar por categoría:</label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="todas">Todas</option>
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div className="mt-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Lista de Gastos</h2>

        {gastosFiltrados.length === 0 ? (
          <p className="text-center text-gray-600">
            No hay gastos para esta categoría.
          </p>
        ) : (
          <ul className="space-y-2">
            {gastosFiltrados.map((gasto) => (
              <li
                key={gasto.id}
                className="p-3 bg-white shadow rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{gasto.nombre}</p>
                  <p className="text-sm text-gray-600 capitalize">
                    {gasto.categoria}
                  </p>
                </div>
                <span className="text-blue-600 font-bold">
                  €{Number(gasto.cantidad).toFixed(2)}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => editarGasto(gasto)}
                    className="text-yellow-600 hover:text-yellow-800"
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

        <div className="mt-6 text-center font-bold text-lg">
          Total: €{totalGastos.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default ListaGastosApp;
