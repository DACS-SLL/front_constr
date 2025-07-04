import api from './apiService'

// Obtener resumen general del dashboard
export const fetchResumen = (rol) => {
  const res = api.get('/dashboard/resumen', { params: { rol } })
  return res.data
}

// Obtener actividad reciente
export const fetchActividad = (rol) => {
  const res = api.get('/dashboard/actividad', { params: { rol } })
  return res.data
}

// Obtener datos para gráficos
export const fetchChartData = (rol) => {
  const res = api.get('/dashboard/chart', { params: { rol } })
  return res.data
}

// Obtener datos de tabla reciente
export const fetchTablaReciente = (rol) => {
  const res = api.get('/dashboard/tabla-reciente', { params: { rol } })
  return res.data
}
