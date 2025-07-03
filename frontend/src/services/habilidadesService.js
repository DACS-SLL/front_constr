import api from './apiService'

export const fetchHabilidades = () => api.get('/habilidades/').then(res => res.data)

export const asignarHabilidadesACurriculum = (habilidades) =>
  api.post('/curriculums/asignar-habilidades', {
    curriculum_id: JSON.parse(localStorage.getItem('user')).id,
    habilidades
  })
