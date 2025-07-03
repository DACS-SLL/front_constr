<template>
  <v-container fluid>
    <v-card class="pa-4" elevation="2">
      <v-card-title class="text-h6 font-weight-bold">Informes de Actividad</v-card-title>
      <v-divider class="my-2" />

      <!-- Ofertas por Empresa -->
      <v-card class="mb-4 pa-3" outlined>
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Ofertas por Empresa</h3>
        <v-table dense>
          <thead>
            <tr><th>Empresa</th><th>Ofertas Creadas</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in data.ofertasPorEmpresa" :key="item.empresa">
              <td>{{ item.empresa }}</td>
              <td>{{ item.total_ofertas }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Postulantes por Oferta -->
      <v-card class="mb-4 pa-3" outlined>
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Postulantes por Oferta</h3>
        <v-table dense>
          <thead>
            <tr><th>Oferta</th><th>Postulantes</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in data.postulantesPorOferta" :key="item.oferta">
              <td>{{ item.oferta }}</td>
              <td>{{ item.total_postulantes }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Postulantes por Categoría -->
      <v-card class="mb-4 pa-3" outlined>
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Postulantes por Categoría</h3>
        <v-table dense>
          <thead>
            <tr><th>Categoría</th><th>Postulantes</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in data.postulantesPorCategoria" :key="item.categoria">
              <td>{{ item.categoria }}</td>
              <td>{{ item.total_postulantes }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Ofertas por Estado -->
      <v-card class="mb-4 pa-3" outlined>
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Ofertas por Estado</h3>
        <v-table dense>
          <thead>
            <tr><th>Estado</th><th>Total</th></tr>
          </thead>
          <tbody>
            <tr v-for="item in data.ofertasPorEstado" :key="item.estado">
              <td>{{ item.estado }}</td>
              <td>{{ item.total }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card>

      <!-- Promedio de Postulaciones por Oferta -->
      <v-card class="mb-4 pa-3" outlined>
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Promedio de Postulaciones por Oferta</h3>
        <v-alert type="info" border="start" variant="outlined">
          {{ data.promedioPostulaciones.toFixed(2) }} postulaciones por oferta
        </v-alert>
      </v-card>
    
      <v-btn color="primary" class="mb-4" @click="generarPDF">
        Descargar Informe PDF
      </v-btn>

    </v-card>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getReportesAdmin } from '@/services/adminService'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

const data = ref({
  ofertasPorEmpresa: [],
  postulantesPorOferta: [],
  postulantesPorCategoria: [],
  ofertasPorEstado: [],
  promedioPostulaciones: 0
})

function generarPDF() {
  const doc = new jsPDF()
  const today = new Date().toLocaleDateString()

  doc.setFontSize(14)
  doc.text('Informe de Actividad - Administración', 14, 15)
  doc.setFontSize(10)
  doc.text(`Generado el: ${today}`, 14, 22)

  let startY = 30

  autoTable(doc, {
    startY,
    head: [['Empresa', 'Ofertas Creadas']],
    body: data.value.ofertasPorEmpresa.map(item => [item.empresa, item.total_ofertas]),
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] },
    margin: { left: 14, right: 14 },
  })

  startY = doc.lastAutoTable.finalY + 10

  autoTable(doc, {
    startY,
    head: [['Oferta', 'Postulantes']],
    body: data.value.postulantesPorOferta.map(item => [item.oferta, item.total_postulantes]),
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [39, 174, 96] },
    margin: { left: 14, right: 14 },
  })

  startY = doc.lastAutoTable.finalY + 10

  autoTable(doc, {
    startY,
    head: [['Categoría', 'Postulantes']],
    body: data.value.postulantesPorCategoria.map(item => [item.categoria, item.total_postulantes]),
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [142, 68, 173] },
    margin: { left: 14, right: 14 },
  })

  startY = doc.lastAutoTable.finalY + 10

  autoTable(doc, {
    startY,
    head: [['Estado', 'Total']],
    body: data.value.ofertasPorEstado.map(item => [item.estado, item.total]),
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [243, 156, 18] },
    margin: { left: 14, right: 14 },
  })

  startY = doc.lastAutoTable.finalY + 10

  doc.setFontSize(12)
  doc.text(`Promedio de postulaciones por oferta: ${data.value.promedioPostulaciones.toFixed(2)}`, 14, startY + 5)

  doc.save(`informe_admin_${today.replace(/\//g, '-')}.pdf`)
}

onMounted(async () => {
  const res = await getReportesAdmin()
  data.value = res
})
</script>
