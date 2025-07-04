import axios from 'axios'

const api = axios.create({
  baseURL: 'https://backconstr-production.up.railway.app',
})

// Interceptor para añadir token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  const token_type = localStorage.getItem('token_type') || 'Bearer'
  
  if (token) {
    const fullToken = `${token_type} ${token}`
    config.headers.Authorization = fullToken
    console.log('🔐 Token enviado en Authorization:', fullToken)
  }

  return config
})

export default api
