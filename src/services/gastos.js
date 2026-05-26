import axios from 'axios';

// Esta es la dirección donde corre tu servidor de json-server
const baseUrl = 'http://localhost:3001';

// 1. Conseguir la lista completa de gastos (GET)
const getGastos = async () => {
  const response = await axios.get(`${baseUrl}/gastos`);
  return response.data;
};

// 2. Conseguir las categorías de la base de datos (GET)
const getCategorias = async () => {
  const response = await axios.get(`${baseUrl}/categorias`);
  return response.data;
};

// 3. Guardar un nuevo gasto en el servidor (POST)
const createGasto = async (nuevoGasto) => {
  const response = await axios.post(`${baseUrl}/gastos`, nuevoGasto);
  return response.data;
};

// 4. Borrar un gasto del servidor usando su ID (DELETE)
const deleteGasto = async (id) => {
  const response = await axios.delete(`${baseUrl}/gastos/${id}`);
  return response.data;
};

// Exportamos las funciones para que App.jsx las pueda usar
export default {
  getGastos,
  getCategorias,
  createGasto,
  deleteGasto
};