<!-- src/components/dashboard/ChartSection.vue -->
<template>
  <v-card elevation="2" class="pa-4" rounded="lg">
    <h3 class="text-h6 mb-4">{{ chartTitle }}</h3>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
  </v-card>
</template>

<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title, Tooltip, Legend,
  LineElement, PointElement,
  CategoryScale, LinearScale
} from 'chart.js'

import { ref, onMounted } from 'vue'
import { getChartData } from '@/services/dashboardService'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const chartData = ref(null)
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

const props = defineProps({ user: Object })
const chartTitle = ref('')

let cargado = false

onMounted(async () => {
  if (cargado) return
  cargado = true

  const rol = props.user?.rol?.nombre
  const response = await getChartData(rol)

  if (rol === 'postulante') {
    chartTitle.value = 'Postulaciones por Mes'
    chartData.value = null
    chartData.value = {
      labels: response.meses,
      datasets: [{
        label: 'Postulaciones',
        data: response.valores,
        borderColor: '#4f46e5',
        backgroundColor: '#a5b4fc'
      }]
    }
  } else if (rol === 'empleador') {
    chartTitle.value = 'Postulaciones por Oferta'
    chartData.value = null
    chartData.value = {
      labels: response.ofertas,
      datasets: [{
        label: 'Cantidad',
        data: response.cantidades,
        borderColor: '#16a34a',
        backgroundColor: '#bbf7d0'
      }]
    }
  } else if (rol === 'admin') {
    chartTitle.value = 'Usuarios registrados por Mes'
    chartData.value = null
    chartData.value = {
      labels: response.meses,
      datasets: [{
        label: 'Usuarios nuevos',
        data: response.valores,
        borderColor: '#f59e0b',
        backgroundColor: '#fde68a'
      }]
    }
  }
})

</script>
