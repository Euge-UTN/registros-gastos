import { useState, useEffect } from 'react'
import GastoForm from './components/GastoForm'
import GastoList from './components/GastoList'
import Resumen from './components/Resumen'
import gastoService from './services/gastos'

function App() {
  // Guardo la lista de gastos y de categorías que vienen del servidor
  const [gastos, setGastos] = useState([])
  const [categorias, setCategorias] = useState([])
  
  // Estados para controlar los filtros de la pantalla y saber qué gasto se está editando
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [gastoAEditar, setGastoAEditar] = useState(null)
  
  const [cargando, setCargando] = useState(true)
  const [errorRed, setErrorRed] = useState(null)
  const [criterioOrden, setCriterioOrden] = useState('fecha')

  useEffect(() => {
    // Busca las categorías
    gastoService.getCategorias()
      .then(initialCategorias => {
        setCategorias(initialCategorias)
        
        // Busca los gastos
        return gastoService.getAll()
      })
      .then(initialGastos => {
        setGastos(initialGastos)
        setCargando(false) 
      })
      .catch(error => {
        console.error('Error al conectar con el servidor:', error)
        // Si el json-server está apagado, salta este aviso en la pantalla
        setErrorRed('No se pudo conectar con el servidor')
        setCargando(false)
      })
  }, [])

  const handleGuardarGasto = (gastoData) => {
    if (gastoAEditar) {
      gastoService.update(gastoAEditar.id, gastoData)
        .then(returnedGasto => {
          setGastos(gastos.map(g => g.id !== gastoAEditar.id ? g : returnedGasto))
          setGastoAEditar(null) 
        })
        .catch(() => setErrorRed('Error al actualizar el gasto.'))
    } else {
      // Creamos un gasto
      gastoService.create(gastoData)
        .then(returnedGasto => {
          setGastos(gastos.concat(returnedGasto))
        })
        .catch(() => setErrorRed('Error al guardar el gasto'))
    }
  }

  // Para borrar un gasto de la lista
  const handleEliminarGasto = (id) => {
    if (window.confirm('¿Seguro que quieres eliminar este gasto?')) {
      gastoService.remove(id)
        .then(() => {
          setGastos(gastos.filter(g => g.id !== id))
        })
        .catch(() => setErrorRed('Error al eliminar el gasto.'))
    }
  }

  const gastosFiltrados = categoriaFiltro === 'Todas'
    ? gastos
    : gastos.filter(g => g.categoriaId === categoriaFiltro)

  const gastosOrdenados = [...gastosFiltrados].sort((a, b) => {
    if (criterioOrden === 'monto') {
      return b.monto - a.monto // De mayor a menor precio
    } else {
      return new Date(b.fecha) - new Date(a.fecha) // Los más nuevos primero
    }
  })

  const gastosConNombreCategoria = gastosOrdenados.map(gasto => {
    const categoriaEncontrada =  categorias.find(c => c.id === gasto.categoriaId)
    return {
      ...gasto,
      categoriaNombre: categoriaEncontrada ? categoriaEncontrada.nombre : 'Sin categoría'
    }
  })

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Control de Gastos</h1>

      {/* Si algo sale mal con la red, se muestra este cartel */}
      {errorRed && (
        <div style={{ padding: '10px', backgroundColor: '#ffcccc', color: '#990000', borderRadius: '5px', marginBottom: '20px' }}>
          ⚠️ {errorRed}
        </div>
      )}

      {/* Si todavía está buscando los datos en el servidor, muestra un mensaje de espera */}
      {cargando ? (
        <div style={{ textAlign: 'center', fontSize: '18px', padding: '40px' }}>
          ⏳ Cargando datos del servidor...
        </div>
      ) : (
        <>
          {/* Si ya cargó todo, muestra los componentes de la página */}
          <Resumen gastos={gastosFiltrados} />
          
          <GastoForm 
            onGuardar={handleGuardarGasto} 
            categorias={categorias}
            gastoAEditar={gastoAEditar}
            setGastoAEditar={setGastoAEditar}
          />

          {/* Filtros y ordenamiento para manejar la tabla */}
          <div style={{ margin: '20px 0', display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            <div>
              <label>Filtrar por Categoría: </label>
              <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)}>
                <option value="Todas">Todas</option>
                {categorias.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Ordenar por: </label>
              <select value={criterioOrden} onChange={(e) => setCriterioOrden(e.target.value)}>
                <option value="fecha">Fecha (Más recientes)</option>
                <option value="monto">Monto (Mayor a menor)</option>
              </select>
            </div>
          </div>

          <GastoList 
            gastos={gastosConNombreCategoria} 
            onEliminar={handleEliminarGasto}
            onSeleccionarEditar={setGastoAEditar}
          />
        </>
      )}
    </div>
  )
}

export default App