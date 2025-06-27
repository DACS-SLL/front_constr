<template>
  <v-form @submit.prevent="handleRegister">
    <v-text-field
      v-model="form.nombre"
      label="Nombre completo"
      prepend-inner-icon="mdi-account"
      variant="outlined"
      class="mb-4"
      required
    />

    <v-text-field
      v-model="form.email"
      label="Email"
      prepend-inner-icon="mdi-email"
      type="email"
      variant="outlined"
      class="mb-4"
      required
    />
    <v-text-field
      v-model="form.password"
      label="Contraseña"
      prepend-inner-icon="mdi-lock"
      type="password"
      variant="outlined"
      class="mb-4"
      required
    />
    <v-text-field
      v-model="form.confirmPassword"
      label="Confirmar Contraseña"
      prepend-inner-icon="mdi-lock-check"
      type="password"
      variant="outlined"
      class="mb-4"
      required
    />
    <v-select
      v-model="form.rol"
      :items="roles"
      item-title="label"
      item-value="value"
      label="Tipo de usuario"
      prepend-inner-icon="mdi-account"
      variant="outlined"
      class="mb-4"
      required
    />
    <v-btn type="submit" color="primary" block :loading="loading">
      Registrarse
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/authService'

const router = useRouter()
const loading = ref(false)
const form = ref({ email: '', password: '', confirmPassword: '', rol: null })
const roles = [
  { label: 'Postulante', value: 2 },
  { label: 'Empleador', value: 3 }
]

const handleRegister = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  if (form.value.password.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres.')
    return
  }


  console.log({
    email: form.value.email,
    nombre: form.value.nombre,
    contrasena: form.value.password,
    confirmar_contrasena: form.value.confirmPassword,
    rol_id: form.value.rol
  }) 


  try {
    loading.value = true
    await register({
        email: form.value.email,
        nombre: form.value.nombre,
        contrasena: form.value.password,
        confirmar_contrasena: form.value.confirmPassword,
        rol_id: form.value.rol
    })

    router.push('/')
  } catch (e) {
    alert('Error al registrar usuario')
  } finally {
    loading.value = false
  }
}
</script>
