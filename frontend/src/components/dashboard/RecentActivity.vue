<!-- src/components/dashboard/RecentActivity.vue -->
<template>
  <v-card elevation="3" class="pa-5" rounded="xl">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold">Actividad Reciente</h3>
        <p class="text-body-2 text-grey-darken-1 mb-0">Últimos movimientos relevantes</p>
      </div>
      <v-icon color="primary" size="28">mdi-timeline-clock-outline</v-icon>
    </div>

    <v-timeline align="start" density="compact">
      <v-timeline-item
        v-for="(item, index) in actividad"
        :key="index"
        :dot-color="item.color || 'primary'"
        fill-dot
        size="small"
      >
        <template #opposite>
          <div class="text-caption text-grey">{{ formatFecha(item.fecha) }}</div>
        </template>

        <v-card variant="text">
          <v-card-title class="text-body-1 font-weight-medium pa-0">{{ item.titulo }}</v-card-title>
          <v-card-subtitle class="text-body-2 text-grey-darken-1 pa-0">{{ item.descripcion }}</v-card-subtitle>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <v-alert v-if="actividad.length === 0" type="info" variant="tonal" class="mt-4" border="start" border-color="primary">
      No hay actividad reciente registrada.
    </v-alert>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getActividadReciente } from '@/services/dashboardService'

const actividad = ref([])
const user = JSON.parse(localStorage.getItem('user'))

const formatFecha = (fechaIso) => {
  const fecha = new Date(fechaIso)
  return fecha.toLocaleString('es-PE', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

onMounted(async () => {
  try {
    const data = await getActividadReciente(user.rol.nombre)
    actividad.value = data
  } catch (err) {
    console.error('Error al cargar actividad reciente:', err)
  }
})
</script>
