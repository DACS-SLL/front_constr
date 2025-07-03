import api from './apiService'

export async function fetchEducaciones(curriculumId) {
  const res = await api.get(`/educacion/?curriculum_id=${curriculumId}`)
  return res.data
}

export const createEducacion = async (data) => {
  const res = await api.post('/educacion/', data)
  return res.data
}

export const updateEducacion = async (id, data) => {
  const res = await api.put(`/educacion/${id}`, data)
  return res.data
}

export const deleteEducacion = async (id) => {
  const res = await api.delete(`/educacion/${id}`)
  return res.data
}
