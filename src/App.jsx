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
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-950">
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Título Principal*/}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 drop-shadow-sm">
            Control de Gastos
          </h1>
        </header>

        <div className="space-y-8">
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
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center shadow-sm">
            <div className="w-full sm:w-auto flex items-center gap-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                Filtrar por Categoría:
              </label>
              <select 
                value={categoriaSeleccionada} 
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full sm:w-56 bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer shadow-inner"
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