import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

export const getProdutos = async () => {
    const response = await api.get('/produtos');
    return response.data;
  };
  
  export const createProduto = async (produto) => {
    const response = await api.post('/produtos', produto);
    return response.data;
  };
  
  export const updateProduto = async (id, produto) => {
    const response = await api.put(`/produtos/${id}`, produto);
    return response.data;
  };
  
  export const deleteProduto = async (id) => {
    const response = await api.delete(`/produtos/${id}`);
    return response.data;
  };

  export const getProdutoById = async (id) => {
    const response = await api.get(`/produtos/${id}`);
    return response.data;
  }

export default api;