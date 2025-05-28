import React, { useState } from 'react';

const FormularioGasto = ({ AgregarGasto, gastoEditar, actualizarGasto }) => {
  const [formulario, setFormulario] = useState({
    nombre: gastoEditar ? gastoEditar.nombre : '',
    cantidad: gastoEditar ? gastoEditar.cantidad : '',
    categoria: gastoEditar ? gastoEditar.categoria : '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(''); // limpiar error al cambiar input
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.nombre.trim()) {
      setError('El nombre es obligatorio y no puede estar vacío');
      return;
    }
    if (!formulario.cantidad || isNaN(formulario.cantidad) || Number(formulario.cantidad) <= 0) {
      setError('La cantidad debe ser un número positivo');
      return;
    }
    if (!formulario.categoria) {
      setError('Por favor selecciona una categoría');
      return;
    }

    // Aquí podrías validar si hay duplicados antes de agregar
    // Por ejemplo, si recibes la lista completa de gastos como prop para comparar

    if (gastoEditar) {
      actualizarGasto({
        ...gastoEditar,
        nombre: formulario.nombre.trim(),
        cantidad: Number(formulario.cantidad),
        categoria: formulario.categoria,
      });
    } else {
      AgregarGasto({
        id: Date.now(),
        nombre: formulario.nombre.trim(),
        cantidad: Number(formulario.cantidad),
        categoria: formulario.categoria,
      });
    }

    setFormulario({
      nombre: '',
      cantidad: '',
      categoria: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">{gastoEditar ? 'Editar Gasto' : 'Agregar Gasto'}</h2>

      {error && <p className="mb-4 text-red-600 font-semibold">{error}</p>}

      <label className="block mb-2">
        <span className="text-sm font-medium">Nombre</span>
        <input
          type="text"
          name="nombre"
          value={formulario.nombre}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        />
      </label>

      <label className="block mb-2">
        <span className="text-sm font-medium">Cantidad</span>
        <input
          type="number"
          name="cantidad"
          value={formulario.cantidad}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          min="0"
          step="0.01"
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium">Categoría</span>
        <select
          name="categoria"
          value={formulario.categoria}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Selecciona una categoría</option>
          <option value="comida">Comida</option>
          <option value="transporte">Transporte</option>
          <option value="entretenimiento">Entretenimiento</option>
          <option value="hogar">Hogar</option>
          <option value="otros">Otros</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {gastoEditar ? 'Guardar Cambios' : 'Agregar Gasto'}
      </button>
    </form>
  );
};

export default FormularioGasto;