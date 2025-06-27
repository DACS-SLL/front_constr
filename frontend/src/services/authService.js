import axios from 'axios'

const API = 'http://localhost:8000/auth'

export async function login(email, password) {
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', password)

  const response = await axios.post(`${API}/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  localStorage.setItem('token', response.data.access_token)
  return response.data
}
export async function register(data) {
  return axios.post(`${API}/register`, data)
}

export function logout() {
  localStorage.removeItem('token')
}

export function getToken() {
  return localStorage.getItem('token')
}

export async function fetchCurrentUser() {
  const token = getToken()
  return axios.get('http://localhost:8000/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
}
