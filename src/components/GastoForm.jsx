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
    <form 
      onSubmit={handleSubmit} 
      className={`mb-6 p-5 border rounded-2xl transition-all duration-300 shadow-sm ${
        gastoAEditar 
          ? 'bg-amber-50 border-amber-300 shadow-amber-100/70' 
          : 'bg-white border-slate-200'
      }`}
    >
      <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-1.5">
        {gastoAEditar ? 'Editando Gasto' : 'Agregar Nuevo Gasto'}
      </h3>
      
      <div className="flex flex-row flex-wrap gap-3 items-center">
        {/* Input Descripción */}
        <input
          type="text"
          placeholder="¿En qué gastaste?"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="flex-1 min-w-[180px] bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-sm placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
        />
        
        {/* Input Monto */}
        <input
          type="number"
          placeholder="Monto ($)"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          className="w-28 bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-sm placeholder-slate-400 outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
        />
        
        {/* Select Categorías */}
        <select 
          value={categoria} 
          onChange={(e) => setCategoria(e.target.value)}
          className="w-48 bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
          ))}
        </select>
        
        {/* Input Fecha - Corregido el contraste para el ícono del calendario */}
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-44 bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 text-sm outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all color-scheme-light"
          style={{ colorScheme: 'light' }} // Fuerza al navegador a dibujar el calendario en modo claro
        />
        
        {/* Botón Guardar / Actualizar */}
        <button 
          type="submit" 
          className={`px-5 py-2 text-sm font-semibold rounded-xl text-white shadow-sm transition-all transform hover:-translate-y-0.5 cursor-pointer ml-auto sm:ml-0 ${
            gastoAEditar 
              ? 'bg-amber-500 hover:bg-amber-600 active:bg-amber-700' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
          }`}
        >
          {gastoAEditar ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default GastoForm;