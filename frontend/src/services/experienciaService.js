import axios from 'axios'
import api from './apiService'

export const fetchExperiencias = (curriculumId) => api.get(`/experiencia/?curriculum_id=${curriculumId}`).then(res => res.data)

export const createExperiencia = (data) => api.post('/experiencia/', data)

export const updateExperiencia = (id, data) => api.put(`/experiencia/${id}`, data)

export const deleteExperiencia = (id) => api.delete(`/experiencia/${id}`)
