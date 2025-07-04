import api from './apiService'

export const fetchMisPostulaciones = () => {
  const token = localStorage.getItem('token')
  return api.get('/postulaciones/mias', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Obtener postulaciones de una oferta específica
export const fetchPostulacionesPorOferta = (ofertaId) => {
  const token = localStorage.getItem('token')
  return api.get('/postulaciones', {
    params: { oferta_id: ofertaId },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
