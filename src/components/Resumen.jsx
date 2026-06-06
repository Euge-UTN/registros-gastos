function Resumen({ gastos }) {
  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);
  const montoMasAlto = gastos.length > 0 
    ? Math.max(...gastos.map(g => g.monto)) 
    : 0;

  return (
    <div className="flex gap-8 bg-gray-50 border border-gray-200 padding p-6 rounded-xl my-6 shadow-sm">
      
      {/* Sección Total Gastado */}
      <div className="flex-1">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 m-0">
          Total Gastado
        </h4>
        <h2 className="text-4xl font-extrabold text-emerald-600 mt-2 m-0">
          ${total}
        </h2>
      </div>

      {/* Línea divisoria central */}
      <div className="border-l-2 border-gray-200 pl-8 flex-1">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 m-0">
          Gasto Más Alto
        </h4>
        <h2 className="text-4xl font-extrabold text-red-600 mt-2 m-0">
          ${montoMasAlto}
        </h2>
      </div>

    </div>
  );
}

export default Resumen;