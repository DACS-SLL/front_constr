import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import OfertasView from '@/views/OfertasView.vue'
import OfertaDetalleView from '@/views/OfertaDetalleView.vue'
import PostulacionView from '@/views/PostulacionView.vue'
import MisPostulacionesView from '@/views/MisPostulacionesView.vue'
import PerfilView from '@/views/PerfilView.vue'
import EditarComponent from '@/components/perfil/PerfilUsuario.vue'
import AdminUserList from '@/components/gestionUsers/AdminUserList.vue'
import AdminStats from '@/views/AdminStats.vue'
import NuevaOferta from '@/views/NuevaOferta.vue'
import VerPostulanteView from '@/views/VerPostulanteView.vue'
import { getToken } from '../services/authService'

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/ofertas', component: OfertasView, meta: { requiresAuth: true } },
  { path: '/ofertas/:id', component: OfertaDetalleView, meta: { requiresAuth: true } },
  { path: '/admin/usuarios', component: AdminUserList, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/admin/reportes', component: AdminStats, meta: { requiresAuth: true, roles: ['admin'] } },
  { path: '/nueva-oferta', component: NuevaOferta, meta: { requiresAuth: true, roles: ['empresa'] } },
  { path: '/postulantes', component: VerPostulanteView, meta: { requiresAuth: true } },
  {
  path: '/postulacion/:id',
  name: 'Postulacion',
  component: PostulacionView,
  meta: { requiresAuth: true }
  },
  {
  path: '/mis-postulaciones',
  name: 'MisPostulaciones',
  component: MisPostulacionesView,
  meta: { requiresAuth: true }
  },
  {
  path: '/perfil',
  name: 'Perfil',
  component: PerfilView,
  meta: { requiresAuth: true, roles: ['postulante'] }
  },
  {
  path: '/editar-perfil',
  name: 'EditarPerfil',
  component: EditarComponent,
  meta: { requiresAuth: true, roles: ['postulante', 'admin', 'empresa'] }
 }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = getToken()
  if (to.meta.requiresAuth && !token) {
    next('/')
  } else {
    next()
  }
})

export default router
