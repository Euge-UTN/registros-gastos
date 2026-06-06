import { useState, useEffect } from 'react'

function GastoForm({ onGuardar, categorias, gastoAEditar, setGastoAEditar }) {
  // Estados para controlar lo que el usuario escribe en cada input
  const [descripcion, setDescripcion] = useState('')
  const [monto, setMonto] = useState('')
  const [categoriaId, setCategoriaId] = useState('') // Ahora guardamos el ID ("1", "2"), no el texto
  const [fecha, setFecha] = useState('')

  // Este useEffect se activa cuando tocamos el botón "Editar" en la tabla
  useEffect(() => {
    if (gastoAEditar) {
      // Si hay un gasto para editar, rellenamos el formulario con esos datos
      setDescripcion(gastoAEditar.descripcion)
      setMonto(gastoAEditar.monto)
      setCategoriaId(gastoAEditar.categoriaId) // Cargamos su ID de categoría
      setFecha(gastoAEditar.fecha)
    } else {
      // Si no hay nada para editar, dejamos el formulario limpio de cero
      setDescripcion('')
      setMonto('')
      setCategoriaId('')
      setFecha('')
    }
  }, [gastoAEditar])

  // Función que se ejecuta al darle al botón de enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault() // Evitamos que la página se recargue por completo

    // Validación simple: que no quede ningún casillero en blanco
    if (!descripcion || !monto || !categoriaId || !fecha) {
      alert('Por favor, completa todos los campos del formulario')
      return
    }

    // Armamos el paquetito con los datos listos para mandar a App.jsx
    onGuardar({
      descripcion,
      monto: Number(monto), // Lo pasamos a número para poder hacer las cuentas matemáticas
      categoriaId,          // Mandamos el ID de la categoría
      fecha
    })

    // Limpiamos los inputs después de guardar
    setDescripcion('')
    setMonto('')
    setCategoriaId('')
    setFecha('')
  }

  return (
    <div style={{ 
      backgroundColor: gastoAEditar ? '#fffde7' : '#f9f9f9', // Si edita, se pone amarillito
      padding: '20px', 
      borderRadius: '8px', 
      border: gastoAEditar ? '1px solid #fbc02d' : '1px solid #ddd',
      marginBottom: '20px' 
    }}>
      <h3>{gastoAEditar ? '✏️ Editar Gasto' : '➕ Agregar Nuevo Gasto'}</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Descripción:</label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            placeholder="Ej. Pasaje de micro"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Monto ($):</label>
          <input 
            type="number" 
            value={monto} 
            onChange={(e) => setMonto(e.target.value)} 
            placeholder="Ej. 12000"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Categoría:</label>
          {/* El select ahora se maneja con el categoriaId */}
          <select 
            value={categoriaId} 
            onChange={(e) => setCategoriaId(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          >
            <option value="">Seleccione una categoría</option>
            {/* Recorremos las categorías que vienen de la BD para armar las opciones dinámicamente */}
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Fecha:</label>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <button type="submit" style={{ 
            padding: '10px 15px', 
            backgroundColor: gastoAEditar ? '#fbc02d' : '#4caf50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            {gastoAEditar ? 'Actualizar Gasto' : 'Guardar Gasto'}
          </button>

          {/* Si está en modo edición, le damos un botón para que pueda arrepentirse y cancelar */}
          {gastoAEditar && (
            <button 
              type="button" 
              onClick={() => setGastoAEditar(null)}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: '#9e9e9e', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default GastoForm