
import api from './apiService'

export const fetchMisPostulaciones = () => {
  return api.get('/postulaciones/mias')
}

// Obtener postulaciones de una oferta específica
export const fetchPostulacionesPorOferta = (ofertaId) => {
  return api.get('/postulaciones', {
    params: { oferta_id: ofertaId }
  })
}