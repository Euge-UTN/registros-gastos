import GastoItem from './GastoItem';

function GastoList({ gastos, onEliminar, onSeleccionarEditar }) { 
  if (gastos.length === 0) {
    return <p>No hay gastos registrados para mostrar.</p>;
  }

  return (
    <table className="min-w-full border-2 border-gray-300 divide-y-2 divide-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left font-bold border-r-2 border-gray-300">Descripción</th>
          <th className="px-4 py-2 text-left font-bold border-r-2 border-gray-300">Categoría</th>
          <th className="px-4 py-2 text-left font-bold border-r-2 border-gray-300">Fecha</th>
          <th className="px-4 py-2 text-left font-bold border-r-2 border-gray-300">Monto</th>
          <th className="px-4 py-2 text-left font-bold"></th>
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