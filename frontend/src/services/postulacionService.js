import api from './apiService'
import axios from 'axios'

export const fetchMisPostulaciones = () => {
  const token = localStorage.getItem('token')
  return api.get('/postulaciones/mias', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Obtener postulaciones de una oferta específica (con URL completa)
export const fetchPostulacionesPorOferta = (ofertaId) => {
  const token = localStorage.getItem('token')
  const baseURL = 'https://backconstr-production.up.railway.app'

  return axios.get(`${baseURL}/postulaciones`, {
    params: { oferta_id: ofertaId },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}