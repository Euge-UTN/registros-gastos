import { useState, useEffect } from 'react';
import servicioGastos from './services/gastos';
import GastoForm from './components/GastoForm';
import GastoList from './components/GastoList';
import Resumen from './components/Resumen';

function App() {
  // Definimos los estados globales de la aplicación
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [gastoAEditar, setGastoAEditar] = useState(null);

  // useEffect se ejecuta automáticamente cuando la app se abre en el navegador
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const listaGastos = await servicioGastos.getGastos(); // Trae los gastos del backend
        const listaCategorias = await servicioGastos.getCategorias(); // Trae las categorías
        setGastos(listaGastos);
        setCategorias(listaCategorias);
      } catch (error) {
        console.error("Error al cargar los datos del servidor:", error);
      }
    };

    cargarDatosIniciales();
  }, []);

  // Función para agregar un gasto
  const handleAgregar = async (nuevoGasto) => {
    try {
      const gastoGuardado = await servicioGastos.createGasto(nuevoGasto); // Envía el POST al backend
      setGastos([...gastos, gastoGuardado]); 
    } catch (error) {
      alert("Error al guardar el gasto");
    }
  };

  // Función para actualizar el gasto en el backend y el estado (PUT)
  const handleEditar = async (id, datosActualizados) => {
    try {
      const mapeado = await servicioGastos.updateGasto(id, datosActualizados);
      
      setGastos(gastos.map(g => g.id === id ? mapeado : g));
      setGastoAEditar(null);
    } catch (error) {
      alert("Error al actualizar el gasto");
    }
  };

  // Función para eliminar un gasto al hacer clic en su botón
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar el gasto?")) {
      return;
    }
    try {
      await servicioGastos.deleteGasto(id); // Envía el DELETE al backend
      setGastos(gastos.filter(g => g.id !== id)); 
    } catch (error) {
      alert("Error al eliminar el gasto");
    }
  };

  const gastosFiltrados = categoriaSeleccionada
    ? gastos.filter(g => g.categoria === categoriaSeleccionada)
    : gastos;

  return (
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: '#f8fafc', 
    color: '#0f172a',
    padding: '48px 16px', 
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' 
  }}>
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      
      {/* Título Principal */}
      <header style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          color: '#0f172a', 
          margin: '0',
          letterSpacing: '-0.025em'
        }}>
          Control de Gastos
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Formulario de carga */}
        <GastoForm 
          onAgregar={handleAgregar} 
          onEditar={handleEditar} 
          gastoAEditar={gastoAEditar} 
          categories={categorias} 
        />
        
        {/* Panel de totales */}
        <Resumen gastos={gastosFiltrados} />

        {/* Selector de Filtros */}
          <div 
            className="tarjeta-moderna"
            style={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e2e8f0', 
              padding: '16px 24px', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
            }}
          >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
            <label style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: '#94a3b8',
              whiteSpace: 'nowrap'
            }}>
              Filtrar por Categoría
            </label>
            <select 
              value={categoriaSeleccionada} 
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              style={{ 
                width: '240px', 
                backgroundColor: '#ffffff', 
                border: '1px solid #cbd5e1', 
                color: '#334155', 
                fontSize: '14px', 
                borderRadius: '10px', 
                padding: '8px 12px', 
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
            >
              <option value="">Todas las categorías</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabla que muestra los resultados */}
        <GastoList 
          gastos={gastosFiltrados} 
          onEliminar={handleEliminar} 
          onSeleccionarEditar={setGastoAEditar} 
        />
      </div>
    </div>
  </div>
);
}

export default App;