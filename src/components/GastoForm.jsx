import { useState, useEffect } from 'react';

function GastoForm({ onAgregar, onEditar, gastoAEditar, categories }) {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');

  // Este useEffect "escucha" si App nos mandó un gasto para editar.
  // Si cambia el gasto a editar, rellena los campos automáticamente en la pantalla.
  useEffect(() => {
    if (gastoAEditar) {
      setDescripcion(gastoAEditar.descripcion);
      setMonto(gastoAEditar.monto);
      setCategoria(gastoAEditar.categoria);
      setFecha(gastoAEditar.fecha);
    } else {
      // Si es null, resetea/limpia el formulario
      setDescripcion('');
      setMonto('');
      setCategoria('');
      setFecha('');
    }
  }, [gastoAEditar]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descripcion || !monto || !categoria || !fecha) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    const datosGasto = {
      descripcion,
      monto: Number(monto),
      categoria,
      fecha
    };

    // Si estamos en modo edición, llamamos a onEditar pasándole el ID.
    // Si no, llamamos al onAgregar tradicional.
    if (gastoAEditar) {
      onEditar(gastoAEditar.id, datosGasto);
    } else {
      onAgregar(datosGasto);
    }

    // Limpiamos los inputs
    setDescripcion('');
    setMonto('');
    setCategoria('');
    setFecha('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: gastoAEditar ? '#fff9db' : '#fff' }}>
      <h3>{gastoAEditar ? 'Editando Gasto' : 'Agregar Nuevo Gasto'}</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="¿En qué gastaste?"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <input
          type="number"
          placeholder="Monto ($)"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
          ))}
        </select>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: gastoAEditar ? '#f59f00' : '#228be6', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>
          {gastoAEditar ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default GastoForm;