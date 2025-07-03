<template>
  <v-container>
    <v-skeleton-loader
      v-if="cargando"
      type="card"
      class="mx-auto"
      max-width="600"
    />
    <v-card v-else class="mx-auto pa-4" max-width="600" elevation="4" rounded="xl">
      <v-card-title>Editar Perfil</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValido">
          <v-text-field
            v-model="usuario.nombre"
            label="Nombre"
            :rules="[v => !!v || 'El nombre es obligatorio']"
            required
          />
          <v-text-field
            v-model="usuario.email"
            label="Email"
            :rules="[v => !!v || 'El email es obligatorio']"
            required
          />
          <v-text-field
            v-model="usuario.contrasena"
            label="Nueva Contraseña"
            type="password"
            :rules="[v => !v || v.length >= 8 || 'Mínimo 8 caracteres']"
            hint="Opcional. Solo si deseas cambiarla."
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="guardarCambios" :disabled="!formValido">Guardar Cambios</v-btn>
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="mensajeVisible" color="success" timeout="3000">
      {{ mensaje }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { obtenerPerfil, actualizarPerfilUsuario } from '@/services/usuarioService'

const usuario = ref({
  nombre: '',
  email: '',
  contrasena: ''
})

const cargando = ref(true)
const formValido = ref(false)
const mensaje = ref('')
const mensajeVisible = ref(false)

const router = useRouter()

onMounted(async () => {
  try {
    const data = await obtenerPerfil()
    usuario.value.nombre = data.nombre
    usuario.value.email = data.email
  } catch (err) {
    mensaje.value = 'Error al cargar el perfil'
    mensajeVisible.value = true
  } finally {
    cargando.value = false
  }
})

const guardarCambios = async () => {
  console.log('Guardando cambios:', usuario.value)
  try {
    const payload = {
      nombre: usuario.value.nombre,
      email: usuario.value.email
    }

    if (usuario.value.contrasena && usuario.value.contrasena.trim() !== '') {
      payload.contrasena = (usuario.value.contrasena).toString()
    }


    await actualizarPerfilUsuario(payload)
    mensaje.value = 'Perfil actualizado correctamente'
    mensajeVisible.value = true
    usuario.value.contrasena = ''

    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
  } catch (err) {
    mensaje.value = 'Error al actualizar el perfil'
    mensajeVisible.value = true
  }
}
</script>
