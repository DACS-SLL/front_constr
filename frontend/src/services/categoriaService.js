import api from './apiService'

export const fetchCategorias = () => {
  return api.get('/categorias/')
}
