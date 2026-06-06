function GastoItem({ gasto, onEliminar, onSeleccionarEditar }) {
  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td style={{ padding: '10px' }}>{gasto.descripcion}</td>
      <td style={{ padding: '10px' }}><span style={{ background: '#e0e0e0', padding: '2px 6px', borderRadius: '4px' }}>{gasto.categoriaNombre}</span></td>
      <td style={{ padding: '10px' }}>{gasto.fecha}</td>
      <td style={{ padding: '10px' }}><strong>${gasto.monto}</strong></td>
      <td style={{ padding: '10px', display: 'flex', gap: '5px' }}>
        {/* NUEVO BOTÓN DE EDITAR */}
        <button 
          onClick={() => onSeleccionarEditar(gasto)} 
          style={{ backgroundColor: '#2980b9', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Editar
        </button>
        <button 
          onClick={() => onEliminar(gasto.id)} 
          style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}

export default GastoItem;