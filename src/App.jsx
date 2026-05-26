import { useState, useEffect } from 'react';
import servicioGastos from './services/gastos';
import GastoForm from './components/GastoForm';
import GastoList from './components/GastoList';
import Resumen from './components/Resumen';

function App() {
  // Definimos los estados globales de la aplicación [cite: 22]
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  // useEffect se ejecuta AUTOMÁTICAMENTE cuando la app se abre en el navegador [cite: 24, 25]
  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const listaGastos = await servicioGastos.getGastos(); // Trae los gastos del backend [cite: 24]
        const listaCategorias = await servicioGastos.getCategorias(); // Trae las categorías [cite: 25]
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
      const gastoGuardado = await servicioGastos.createGasto(nuevoGasto); // Envía el POST al backend [cite: 27]
      setGastos([...gastos, gastoGuardado]); // Agrega el resultado al estado creando una copia limpia [cite: 29]
    } catch (error) {
      alert("Error al guardar el gasto");
    }
  };

  // Función para eliminar un gasto al hacer clic en su botón
  const handleEliminar = async (id) => {
    try {
      await servicioGastos.deleteGasto(id); // Envía el DELETE al backend [cite: 28]
      // Filtramos el estado para quitar el gasto borrado sin mutar el array original [cite: 29]
      setGastos(gastos.filter(g => g.id !== id)); 
    } catch (error) {
      alert("Error al eliminar el gasto");
    }
  };

  // Lógica de filtrado: si hay una categoría seleccionada, filtramos la lista [cite: 19]
  const gastosFiltrados = categoriaSeleccionada
    ? gastos.filter(g => g.categoria === categoriaSeleccionada)
    : gastos;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Control de Gastos</h1>
      
      {/* Formulario de carga */}
      <GastoForm onAgregar={handleAgregar} categories={categorias} />
      
      {/* Panel de totales */}
      <Resumen gastos={gastosFiltrados} />

      {/* Selector de Filtros */}
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
      <GastoList gastos={gastosFiltrados} onEliminar={handleEliminar} />
    </div>
  );
}

export default App;