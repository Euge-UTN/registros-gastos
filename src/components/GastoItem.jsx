function GastoItem({ gasto, onEliminar, onSeleccionarEditar }) {
  return (
    <tr className="border-b-2 border-gray-300 hover:bg-gray-50">
      <td className="px-4 py-2 border-r-2 border-gray-300">{gasto.descripcion}</td>
      <td className="px-4 py-2 border-r-2 border-gray-300">{gasto.categoria}</td>
      <td className="px-4 py-2 border-r-2 border-gray-300">{gasto.fecha}</td>
      <td className="px-4 py-2 border-r-2 border-gray-300 font-semibold">${gasto.monto}</td>
      <td className="px-4 py-2 flex gap-2">
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