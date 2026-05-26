import { useState } from 'react';

function GastoForm({ onAgregar, categories }) {
  // Creamos un estado local para capturar lo que el usuario escribe en cada input
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fecha, setFecha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Validación simple: que no envíen campos vacíos
    if (!descripcion || !monto || !categoria || !fecha) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }

    // Estructuramos el nuevo objeto gasto
    const nuevoGasto = {
      descripcion,
      monto: Number(monto), // Convertimos el texto del input a número para poder sumarlo después
      categoria,
      fecha
    };

    // Le pasamos este nuevo gasto a la función que nos mandó App.jsx
    onAgregar(nuevoGasto);

    // Limpiamos los inputs del formulario para que queden listos otra vez
    setDescripcion('');
    setMonto('');
    setCategoria('');
    setFecha('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Agregar Nuevo Gasto</h3>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="¿En qué gastaste? (Ej: Almuerzo)"
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
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}

export default GastoForm;