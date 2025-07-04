import api from './apiService'

// Resumen
export const fetchResumen = (rol) => {
  return api.get('/dashboard/resumen', { params: { rol } })
}

// Actividad reciente
export const fetchActividad = async (rol) => {
  return await api.get('/dashboard/actividad', { params: { rol } })
}

// Datos para gráficos
export const fetchChartData = async (rol) => {
  return await api.get('/dashboard/chart', { params: { rol } })
}

// Tabla reciente
export const fetchTablaReciente = async (rol) => {
  return await api.get('/dashboard/tabla-reciente', { params: { rol } })
}
