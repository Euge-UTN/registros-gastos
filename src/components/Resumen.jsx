function Resumen({ gastos }) {
  // Usamos .reduce para sumar todos los montos de la lista actual [cite: 17]
  const total = gastos.reduce((suma, gasto) => suma + gasto.monto, 0);

  // Buscamos el número más grande dentro de los montos [cite: 18]
  const montoMasAlto = gastos.length > 0 
    ? Math.max(...gastos.map(g => g.monto)) 
    : 0;

  return (
    <div style={{ display: 'flex', gap: '30px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
      <div>
        <h4 style={{ margin: 0, color: '#555' }}>Total Gastado</h4>
        <h2 style={{ margin: '5px 0 0 0', color: '#27ae60' }}>${total}</h2>
      </div>
      <div style={{ borderLeft: '2px solid #ddd', paddingLeft: '30px' }}>
        <h4 style={{ margin: 0, color: '#555' }}>Gasto Más Alto</h4>
        <h2 style={{ margin: '5px 0 0 0', color: '#c0392b' }}>${montoMasAlto}</h2>
      </div>
    </div>
  );
}

export default Resumen;