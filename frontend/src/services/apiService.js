import axios from 'axios'
import { getToken } from './authService'

const api = axios.create({
  baseURL: 'http://localhost:8000/',
})

// Interceptor para añadir token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  const token_type = localStorage.getItem('token_type') || 'Bearer'
  if (token) {
    config.headers.Authorization = `${token_type} ${token}`
  }
  return config
})

export default api
