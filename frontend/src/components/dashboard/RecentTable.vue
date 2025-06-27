<template>
  <v-card elevation="3" class="pa-5" rounded="xl">
    <div class="d-flex align-center justify-space-between mb-4">
      <div>
        <h3 class="text-h6 font-weight-bold">Resumen Reciente</h3>
        <p class="text-body-2 text-grey-darken-1 mb-0">Últimos registros destacados</p>
      </div>
      <v-icon size="28" color="primary">mdi-format-list-bulleted</v-icon>
    </div>

    <v-table density="compact" class="elevation-1 rounded-lg">
      <thead class="bg-grey-lighten-4">
        <tr>
          <th v-for="col in columnas" :key="col" class="text-left text-subtitle-2">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.col1 }}</td>
          <td>{{ item.col2 }}</td>
          <td>{{ item.col3 }}</td>
        </tr>
      </tbody>
    </v-table>

    <v-alert v-if="items.length === 0" type="info" variant="tonal" class="mt-4" border="start" border-color="primary">
      No hay datos disponibles.
    </v-alert>
  </v-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getTablaReciente } from '@/services/dashboardService'

const user = JSON.parse(localStorage.getItem('user'))
const items = ref([])
const columnas = ref([])

onMounted(async () => {
  try {
    const data = await getTablaReciente(user.rol.nombre)
    items.value = data.items
    columnas.value = data.columnas
  } catch (err) {
    console.error('Error al cargar la tabla reciente:', err)
  }
})
</script>
