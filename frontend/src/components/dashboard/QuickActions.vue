<template>
  <v-card class="pa-6" elevation="3" rounded="xl">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold">Acciones Rápidas</h3>
        <p class="text-body-2 text-grey-darken-1 mb-0">Navega rápidamente a las secciones clave</p>
      </div>
      <v-icon size="28" color="primary">mdi-flash</v-icon>
    </div>

    <v-row dense>
      <v-col
        v-for="accion in acciones"
        :key="accion.label"
        cols="12"
        sm="6"
        md="4"
      >
        <v-btn
          :color="accion.color"
          variant="elevated"
          class="text-capitalize font-weight-medium"
          block
          height="48"
          prepend-icon="mdi-chevron-right"
          @click="$router.push(accion.route)"
        >
          {{ accion.label }}
        </v-btn>
      </v-col>
    </v-row>

    <div v-if="acciones.length === 0" class="text-center text-grey mt-4">
      No hay acciones disponibles para tu rol.
    </div>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const user = JSON.parse(localStorage.getItem('user'))
console.log(user.nombre)
console.log(user.rol.nombre)

const acciones = computed(() => {
  switch (user?.rol?.nombre?.toLowerCase()) {
    case 'postulante':
      return [
        { label: 'Ver Ofertas', route: '/ofertas', color: 'primary' },
        { label: 'Mis Postulaciones', route: '/postulaciones', color: 'indigo' },
        { label: 'Subir Currículum', route: '/perfil', color: 'teal' }
      ]
    case 'empleador':
      return [
        { label: 'Publicar Oferta', route: '/ofertas/nueva', color: 'primary' },
        { label: 'Ver Postulantes', route: '/postulantes', color: 'deep-purple' },
        { label: 'Entrevistas', route: '/entrevistas', color: 'success' }
      ]
    case 'admin':
      return [
        { label: 'Gestionar Usuarios', route: '/admin/usuarios', color: 'primary' },
        { label: 'Estadísticas', route: '/admin/stats', color: 'orange' }
      ]
    default:
      return []
  }
})
</script>
