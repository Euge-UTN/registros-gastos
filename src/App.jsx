import { useState, useEffect } from 'react';
import servicioGastos from './services/gastos';
import GastoForm from './components/GastoForm';
import GastoList from './components/GastoList';
import Resumen from './components/Resumen';

function App() {
  // Estados globales de la aplicación
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [gastoAEditar, setGastoAEditar] = useState(null);

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
    try {
      await servicioGastos.deleteGasto(id);
      setGastos(gastos.filter(g => g.id !== id)); 
    } catch (error) {
      alert("Error al eliminar el gasto");
    }
  };

  const gastosFiltrados = categoriaSeleccionada
    ? gastos.filter(g => g.categoria === categoriaSeleccionada)
    : gastos;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Control de Gastos</h1>
      
      {/* Formulario de carga */}
      <GastoForm 
        onAgregar={handleAgregar} 
        onEditar={handleEditar} 
        gastoAEditar={gastoAEditar} 
        categories={categorias} 
      />
      
      <Resumen gastos={gastosFiltrados} />

      <div style={{ margin: '20px 0', padding: '10px', background: '#f5f5f5', borderRadius: '5px' }}>
        <label><strong>Filtrar por Categoría: </strong></label>
        <select value={categoriaSeleccionada} onChange={(e) => setCategoriaSeleccionada(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
          ))}
        </select>
      </div>

      {/* Tabla que muestra los resultados */}
      <GastoList 
        gastos={gastosFiltrados} 
        onEliminar={handleEliminar} 
        onSeleccionarEditar={setGastoAEditar} 
      />
    </div>
  );
}

export default App;