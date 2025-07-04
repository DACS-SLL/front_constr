import api from './apiService'

// Obtener resumen general del dashboard
export const fetchResumen = (rol) => {
  return api.get('/dashboard/resumen', { params: { rol } })
}

// Obtener actividad reciente
export const fetchActividad = (rol) => {
  return api.get('/dashboard/actividad', { params: { rol } })
}

// Obtener datos para gráficos
export const fetchChartData = (rol) => {
  return api.get('/dashboard/chart', { params: { rol } })
}

// Obtener datos de tabla reciente
export const fetchTablaReciente = (rol) => {
  return api.get('/dashboard/tabla-reciente', { params: { rol } })
}
