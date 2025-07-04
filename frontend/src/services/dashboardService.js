import api from './apiService'

// Obtener resumen general del dashboard
export const fetchResumen = async (rol) => {
  const res = await api.get('/dashboard/resumen', { params: { rol } })
  return res.data
}

// Obtener actividad reciente
export const fetchActividad = async (rol) => {
  const res = await api.get('/dashboard/actividad', { params: { rol } })
  return res.data
}

// Obtener datos para gráficos
export const fetchChartData = async (rol) => {
  const res = await api.get('/dashboard/chart', { params: { rol } })
  return res.data
}

// Obtener datos de tabla reciente
export const fetchTablaReciente = async (rol) => {
  const res = await api.get('/dashboard/tabla-reciente', { params: { rol } })
  return res.data
}
