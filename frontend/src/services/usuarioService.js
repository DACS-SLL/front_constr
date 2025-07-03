import api from './apiService'

export const obtenerPerfil = async () => {
  const res = await api.get('/usuarios/me')
  return res.data
}

export const actualizarPerfilUsuario = async (datos) => {
  const res = await api.put('/usuarios/me', datos)
  return res.data
}
