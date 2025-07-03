import api from './apiService'

// Obtener todos los usuarios
export async function fetchUsuarios() {
  const res = await api.get('/usuarios/')
  return res.data
}

// Cambiar el rol de un usuario
export const cambiarRolUsuario = (usuarioId, nuevoRol) => {
  return api.put(`/usuarios/${usuarioId}/rol`, { rol: nuevoRol })
}

// Bloquear o activar un usuario
export async function bloquearUsuario(usuarioId, nuevoEstado) {
  const res = await api.put(`/usuarios/${usuarioId}/estado`, { activo: nuevoEstado })
  return res.data
}

export async function getReportesAdmin() {
  const [
    r1,
    r2,
    r3,
    r4,
    r5
  ] = await Promise.all([
    api.get('/admin/reports/ofertas-por-empresa'),
    api.get('/admin/reports/postulantes-por-oferta'),
    api.get('/admin/reports/postulantes-por-categoria'),
    api.get('/admin/reports/ofertas-por-estado'),
    api.get('/admin/reports/promedio-postulaciones')
  ])

  return {
    ofertasPorEmpresa: r1.data,
    postulantesPorOferta: r2.data,
    postulantesPorCategoria: r3.data,
    ofertasPorEstado: r4.data,
    promedioPostulaciones: r5.data.promedio_postulaciones_por_oferta
  }
}

