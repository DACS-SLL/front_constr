<!-- src/components/dashboard/WelcomeBanner.vue -->
<template>
  <v-card class="mb-6 welcome-card" elevation="4" rounded="xl">
    <v-card-text class="d-flex align-center justify-space-between flex-wrap">
      <div class="text-section">
        <h2 class="text-h5 font-weight-bold mb-1">¡Bienvenido, {{ user?.nombre || 'Usuario' }}!</h2>
        <p class="text-subtitle-2 text-grey-darken-1">Rol: {{ capitalizar(user?.rol?.nombre) }}</p>
      </div>

      <v-avatar size="64" class="avatar-container">
        <v-icon size="36" color="white">mdi-account-circle</v-icon>
      </v-avatar>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/services/authService'

const user = ref({})

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
</style>
