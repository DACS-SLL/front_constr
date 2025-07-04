<!-- src/views/LoginView.vue -->
<template>
  <v-app>
    <v-main class="bg-gradient d-flex align-center justify-center">
      <v-container fluid class="fill-height d-flex align-center justify-center">
        <v-card class="pa-8" max-width="400" elevation="12" rounded="lg">
          <div class="text-center mb-6">
            <v-icon size="64" color="primary">mdi-account-circle</v-icon>
            <h1 class="text-h5 mt-3">Iniciar Sesión</h1>
          </div>

          <LoginForm @submit="handleLogin" />

          <div class="text-center mt-4">
            <v-btn variant="text" @click="$router.push('/register')">
              ¿No tienes cuenta? Regístrate
            </v-btn>
          </div>
        </v-card>
      </v-container>

      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.message }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import LoginForm from '@/components/LoginForm.vue'


const router = useRouter()
const snackbar = ref({ show: false, message: '', color: 'success' })

const handleLogin = async ({ email, password, setLoading }) => {
  setLoading(true)
  try {
    const res = await login(email, password)
    localStorage.setItem('token', res.access_token)
    localStorage.setItem('token_type', res.token_type)

    console.log('Llamando a /api/auth/me con token:', `${res.token_type} ${res.access_token}`)

    const userRes = await fetch('https://backconstr-production.up.railway.app/auth/me', {
      headers: {
        Authorization: `${res.token_type} ${res.access_token}`
      }
    })

    console.log('Status de userRes:', userRes.status)

    if (!userRes.ok) {
      throw new Error('Error al obtener usuario actual')
    }

    const userData = await userRes.json()
    console.log('Usuario actual:', userData)
    localStorage.setItem('user', JSON.stringify(userData))


    snackbar.value = {
      show: true,
      message: 'Inicio de sesión exitoso.',
      color: 'success'
    }

    await router.push('/dashboard')
  } catch (error) {
    snackbar.value = {
      show: true,
      message: 'Email o contraseña incorrectos.',
      color: 'error'
    }
  } finally {
    setLoading(false)
  }
}

</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
