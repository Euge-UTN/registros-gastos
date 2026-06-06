import axios from 'axios'

// La dirección base de nuestro servidor local de json-server
const baseUrl = 'http://localhost:3001'

// GET: Para traer todos los gastos de la base de datos
const getAll = () => {
  return axios.get(`${baseUrl}/gastos`).then(response => response.data)
}

// GET NUEVO: Para traer la lista de categorías que agregamos al db.json
const getCategorias = () => {
  return axios.get(`${baseUrl}/categorias`).then(response => response.data)
}

// POST: Para guardar un gasto nuevito de paquete
const create = (nuevoObjeto) => {
  return axios.post(`${baseUrl}/gastos`, nuevoObjeto).then(response => response.data)
}

// PUT: Para pisar los datos de un gasto viejo con los cambios nuevos de la edición
const update = (id, nuevoObjeto) => {
  return axios.put(`${baseUrl}/gastos/${id}`, nuevoObjeto).then(response => response.data)
}

// DELETE: Para borrar el gasto de la base de datos usando su ID
const remove = (id) => {
  return axios.delete(`${baseUrl}/gastos/${id}`).then(response => response.data)
}

// Exportamos todas las funciones juntas para que App.jsx las pueda usar con "gastoService.función"
export default { getAll, getCategorias, create, update, remove }