import axios from 'axios'
import { getToken } from './authService'
import api from './apiService'

const API = 'http://localhost:8000/dashboard'


export const fetchResumen = (rol) => {
  return api.get(`/dashboard/resumen`, {
    params: { rol }
  })
}

export const fetchActividad = async (rol) => {
  return await api.get('/dashboard/actividad', { params: { rol } })
}

export const fetchChartData = async (rol) => {
  return await api.get('/dashboard/chart', { params: { rol } })
}

export const fetchTablaReciente = async (rol) => {
  return await api.get('/dashboard/tabla-reciente', { params: { rol } })
}


export async function getResumenDashboard(rol) {
  const response = await axios.get(`${API}/resumen?rol=${rol}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return response.data
}

export async function getChartData(rol) {
  const response = await axios.get(`${API}/chart?rol=${rol}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  return response.data
}

export async function getActividadReciente(rol) {
  const response = await axios.get(`${API}/actividad?rol=${rol}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  return response.data
}

export async function getTablaReciente(rol) {
  const response = await axios.get(`${API}/tabla-reciente?rol=${rol}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  return response.data
}
