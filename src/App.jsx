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

  // useEffect se ejecuta AUTOMÁTICAMENTE cuando la app se abre en el navegador
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

  // Función para agregar un gasto cuando el formulario se envíe
  const handleAgregar = async (nuevoGasto) => {
    try {
      const gastoGuardado = await servicioGastos.createGasto(nuevoGasto); // Envía el POST al backend
      setGastos([...gastos, gastoGuardado]); // Agrega el resultado al estado creando una copia limpia
    } catch (error) {
      alert("Error al guardar el gasto");
    }
  };

  // Función para actualizar el gasto en el backend y el estado (PUT)
  const handleEditar = async (id, datosActualizados) => {
    try {
      const mapeado = await servicioGastos.updateGasto(id, datosActualizados);
      
      // Actualizamos el estado reemplazando el viejo gasto por el modificado
      setGastos(gastos.map(g => g.id === id ? mapeado : g));
      
      // Limpiamos el estado de edición para que el formulario vuelva al modo "crear"
      setGastoAEditar(null);
    } catch (error) {
      alert("Error al actualizar el gasto");
    }
  };

  // Función para eliminar un gasto al hacer clic en su botón
  const handleEliminar = async (id) => {
    // Si el usuario toca "Cancelar", el signo ! invierte el resultado y corta la función
    if (!window.confirm("¿Estás seguro de eliminar el gasto?")) {
      return;
    }

    // Si toca "Aceptar", se ejecuta tu lógica original de forma segura
    try {
      await servicioGastos.deleteGasto(id); // Envía el DELETE al backend
      // Filtramos el estado para quitar el gasto borrado sin mutar el array original
      setGastos(gastos.filter(g => g.id !== id)); 
    } catch (error) {
      alert("Error al eliminar el gasto");
    }
  };

  // Lógica de filtrado: si hay una categoría seleccionada, filtramos la lista
  const gastosFiltrados = categoriaSeleccionada
    ? gastos.filter(g => g.categoria === categoriaSeleccionada)
    : gastos;

  return (
  <div style={{ 
    minHeight: '100vh', 
    backgroundColor: '#E5DAF2', 
    color: '#1e293b', 
    padding: '48px 16px', 
    fontFamily: 'system-ui, -apple-system, sans-serif' 
  }}>
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      
      {/* Título Principal */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', margin: '0' }}>
          Control de Gastos
        </h1>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
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
        <div style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid #e2e8f0', 
          padding: '20px', 
          borderRadius: '16px', 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
            <label style={{ 
              fontSize: '12px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em', 
              color: '#64748b',
              whiteSpace: 'nowrap'
            }}>
              Filtrar por Categoría:
            </label>
            <select 
              value={categoriaSeleccionada} 
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              style={{ 
                width: '224px', 
                backgroundColor: '#f8fafc', 
                border: '1px solid #e2e8f0', 
                color: '#334155', 
                fontSize: '14px', 
                borderRadius: '12px', 
                padding: '8px 12px', 
                outline: 'none',
                cursor: 'pointer'
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