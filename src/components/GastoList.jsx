import GastoItem from './GastoItem';

function GastoList({ gastos, onEliminar, onSeleccionarEditar }) { 
  if (gastos.length === 0) {
    return <p>No hay gastos registrados para mostrar.</p>;
  }

  return (
    <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2', borderBottom: '2px solid #ccc' }}>
          <th style={{ padding: '10px' }}>Descripción</th>
          <th style={{ padding: '10px' }}>Categoría</th>
          <th style={{ padding: '10px' }}>Fecha</th>
          <th style={{ padding: '10px' }}>Monto</th>
          <th style={{ padding: '10px' }}>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((gasto) => (
          <GastoItem 
          key={gasto.id} 
          gasto={gasto} 
          onEliminar={onEliminar} 
          onSeleccionarEditar={onSeleccionarEditar}
          />
        ))}
      </tbody>
    </table>
  );
}

export default GastoList;