<template>
  <v-card class="mb-6 welcome-card" elevation="4" rounded="xl">
    <v-card-text class="d-flex align-center justify-space-between flex-wrap">
      <div class="text-section">
        <h2 class="text-h5 font-weight-bold mb-1">¡Bienvenido, {{ user?.nombre || 'Usuario' }}!</h2>

        <div class="mt-2">
          <v-chip
            class="role-chip"
            :color="getRoleColor(user?.rol?.nombre)"
            small
            label
            outlined
          >
            <v-icon left small>{{ getRoleIcon(user?.rol?.nombre) }}</v-icon>
            {{ capitalizar(user?.rol?.nombre) || 'Sin rol definido' }}
          </v-chip>
        </div>
      </div>

      <!-- Acciones: logout y avatar -->
      <div class="d-flex align-center ga-4">
        <v-btn
          color="white"
          variant="outlined"
          icon
          @click="logout"
          class="logout-btn"
        >
          <v-icon color="red">mdi-logout</v-icon>
        </v-btn>

        <v-avatar size="64" class="avatar-container" @click="$router.push('/editar-perfil')" style="cursor: pointer;">
          <v-icon size="36" color="white">mdi-account-circle</v-icon>
        </v-avatar>
      </div>
    </v-card-text>

  </v-card>

  <v-dialog v-model="confirmLogout" max-width="400">
  <v-card>
    <v-card-title class="text-h6">¿Cerrar sesión?</v-card-title>
    <v-card-text>¿Estás seguro que deseas salir?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" text @click="confirmLogout = false">Cancelar</v-btn>
      <v-btn color="red" text @click="confirmarLogout">Salir</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = ref({})

const confirmLogout = ref(false)

const logout = () => {
  confirmLogout.value = true
}

const confirmarLogout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/')
}

onMounted(async () => {
  try {
    const res = await fetchCurrentUser()
    user.value = res.data
  } catch (err) {
    console.error('Error al cargar el usuario', err)
  }
})

const capitalizar = (texto) => {
  if (!texto) return ''
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
}

// Función para asignar colores según el rol
const getRoleColor = (role) => {
  if (!role) return 'grey'
  const roleLower = role.toLowerCase()
  if (roleLower.includes('admin')) return 'deep-purple'
  if (roleLower.includes('empleador')) return 'blue'
  if (roleLower.includes('postulante')) return 'green'
  return 'teal'
}

// Función para asignar iconos según el rol
const getRoleIcon = (role) => {
  if (!role) return 'mdi-account-question'
  const roleLower = role.toLowerCase()
  if (roleLower.includes('admin')) return 'mdi-shield-crown'
  if (roleLower.includes('empleador')) return 'mdi-account-tie'
  if (roleLower.includes('postulante')) return 'mdi-account'
  return 'mdi-account'
}
</script>

<style scoped>
.welcome-card {
  background: linear-gradient(90deg, #3f51b5 0%, #5c6bc0 100%);
  color: white;
  padding: 16px;
}

.text-section h2,
.text-section p {
  margin: 0;
}

.avatar-container {
  background-color: rgba(255, 255, 255, 0.15);
}

.role-chip {
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.3) !important;
  color: white !important;
}

.logout-btn {
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>