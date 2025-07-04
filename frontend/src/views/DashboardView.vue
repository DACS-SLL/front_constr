<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4">
    <WelcomeBanner />

    <v-alert v-if="summaryError" type="error" class="mb-4">
      {{ summaryError }}
    </v-alert>

    <v-row
      class="mb-4"
      dense
      style="overflow-x: auto; flex-wrap: nowrap;"
      v-if="Object.keys(summary).length && !summaryError"
    >
      <!-- Postulante -->
      <template v-if="user.rol.nombre === 'postulante'">
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-briefcase-search" label="Postulaciones" :value="summary.postulaciones" color="primary" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-account-tie" label="Entrevistas" :value="summary.entrevistas" color="success" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-clipboard-list-outline" label="Ofertas disponibles" :value="summary.ofertas_disponibles" color="indigo" />
        </v-col>
      </template>

      <!-- Empleador -->
      <template v-else-if="user.rol.nombre === 'empleador'">
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-briefcase" label="Ofertas creadas" :value="summary.ofertas_creadas" color="indigo" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-account-multiple-check" label="Postulaciones recibidas" :value="summary.postulaciones_recibidas" color="primary" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-calendar-clock" label="Entrevistas agendadas" :value="summary.entrevistas_agendadas" color="success" />
        </v-col>
      </template>

      <!-- Admin -->
      <template v-else-if="user.rol.nombre === 'admin'">
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-account-group" label="Usuarios totales" :value="summary.total_usuarios" color="primary" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-briefcase-outline" label="Ofertas totales" :value="summary.total_ofertas" color="indigo" />
        </v-col>
        <v-col cols="auto" class="mr-4" style="flex: 0 0 auto;">
          <SummaryCard icon="mdi-calendar-multiselect" label="Entrevistas totales" :value="summary.total_entrevistas" color="success" />
        </v-col>
      </template>
    </v-row>

    <v-row dense class="mt-4">
      <v-col cols="12" md="6">
        <RecentActivity />
      </v-col>
      <v-col cols="12" md="6">
        <RecentTable />
      </v-col>
    </v-row>

    <QuickActions class="mt-6" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner.vue'
import SummaryCard from '@/components/dashboard/SummaryCard.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import RecentTable from '@/components/dashboard/RecentTable.vue'
import QuickActions from '@/components/dashboard/QuickActions.vue'
import { fetchResumen } from '@/services/dashboardService'

const summary = ref({})
const summaryError = ref('')
const user = ref(JSON.parse(localStorage.getItem('user')))

onMounted(async () => {
  try {
    const data = await fetchResumen(user.value.rol.nombre.toLowerCase())
    

    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      summaryError.value = 'No se pudo cargar el resumen del dashboard.'
      summary.value = {}
    } else {
      summary.value = data
      summaryError.value = ''
    }
    console.log('Datos del resumen:', data)
    console.log('Resumen cargado:', summary.value)
  } catch (error) {
    summaryError.value = 'Error al cargar el resumen del dashboard.'
    summary.value = {}
    console.error('Error al cargar resumen:', error)
  }
})
</script>
