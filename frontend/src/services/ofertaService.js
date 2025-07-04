import api from './apiService'

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
  return api.post('/ofertas/', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export async function actualizarOferta(id, datos) {
  const token = localStorage.getItem('token')
  const response = await api.put(`/ofertas/${id}`, datos, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}


export const fetchPostulacionesPorOferta = (ofertaId) => {
  return api.get('/postulaciones', {
    params: { oferta_id: ofertaId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
}