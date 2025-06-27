// lib/axios.js
import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000',  // o VERCEL_URL si usas producción
  withCredentials: true
})

export const fetchOfertas = (params = {}) => {
  return axios.get('/api/ofertas/', { params })
}
