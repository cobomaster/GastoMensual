import React, { useState, useEffect } from 'react';

const FormularioGasto = ({ agregarGasto, gastoEditar, limpiarEditar }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    cantidad: '',
    categoria: '',
  });

  // Si hay gastoEditar, carga sus datos en el formulario
  useEffect(() => {
    if (gastoEditar) {
      setFormulario({
        nombre: gastoEditar.nombre,
        cantidad: gastoEditar.cantidad.toString(),
        categoria: gastoEditar.categoria,
        id: gastoEditar.id,
      });
    }
  }, [gastoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formulario.nombre || !formulario.cantidad || !formulario.categoria) {
      alert('Por favor, completa todos los campos');
      return;
    }

    const nuevoGasto = {
      ...formulario,
      cantidad: Number(formulario.cantidad),
      id: formulario.id ? formulario.id : Date.now().toString(),
    };

    agregarGasto(nuevoGasto);

    setFormulario({
      nombre: '',
      cantidad: '',
      categoria: '',
    });

    if (gastoEditar) limpiarEditar(); // Limpiar edición cuando se envía el formulario
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        {gastoEditar ? 'Editar Gasto' : 'Agregar Gasto'}
      </h2>
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
