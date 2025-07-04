// lib/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://backconstr-production.up.railway.app', // Cambia a tu URL de producción si aplica
  withCredentials: true
})

export default api

// Obtener todas las ofertas (con filtros si es necesario)
export const fetchOfertas = (params = {}) => {
  return api.get('/ofertas/', { params })
}

// Obtener una oferta específica
export const getOfertaById = (id) => {
  return api.get(`/ofertas/${id}`)
}

// Crear una nueva oferta
export const guardarOferta = (data) => {
  const token = localStorage.getItem('token')
  return axios.post('/api/ofertas/', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Actualizar estado u otros campos de una oferta
export async function actualizarOferta(id, datos) {
  return await fetch(`api/ofertas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(datos)
  }).then(res => {
    if (!res.ok) throw new Error('Error al actualizar oferta')
    return res.json()
  })
}
