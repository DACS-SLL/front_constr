import api from './apiService'

export const fetchMiCurriculum = () =>
  api
    .get('/curriculums/', {
      params: { postulante_id: JSON.parse(localStorage.getItem('user')).id }
    })
    .then(res => res.data.length > 0 ? res.data[0] : null)

export const actualizarCurriculum = (id, data) => api.put(`/curriculums/${id}`, data)

export const uploadCurriculum = (formData, postulanteId) => {
  return api.post(`/curriculums/upload?postulante_id=${postulanteId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const crearCurriculum = (data) => {
  return api.post('/curriculums/', data).then(res => res.data)
}

export const getCurriculumByPostulante = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const postulanteId = user?.id

    if (!postulanteId) throw new Error('ID de postulante no disponible')

    const response = await api.get(`/curriculum/postulante/${postulanteId}`)
    return response.data
  } catch (error) {
    console.error('Error al obtener el curriculum:', error)
    return null
  }
}
