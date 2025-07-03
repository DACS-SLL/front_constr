<template>
  <v-container fluid>
    <!-- Resumen de estadísticas -->
    <v-row justify="center" class="mb-6" align="stretch">
      <v-col cols="12" sm="4" md="3" v-for="card in resumenCards" :key="card.titulo">
        <v-card class="text-center pa-4" :color="card.color" elevation="3" rounded="xl">
          <v-icon size="36" :color="card.iconColor">{{ card.icono }}</v-icon>
          <div class="text-h6 mt-2">{{ card.titulo }}</div>
          <div class="text-subtitle-1 font-weight-bold">{{ card.valor }}</div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Secciones desplegables -->
    <v-expansion-panels variant="accordion" elevation="2" rounded="xl">
      
      <!-- Resumen -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon class="mr-2" color="primary">mdi-account-box</v-icon>
          <span class="font-weight-bold">Resumen de Curriculum</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <CurriculumInfo />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Educación -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon class="mr-2" color="secondary">mdi-school</v-icon>
          <span class="font-weight-bold">Educación</span>
          <v-spacer />
          <v-chip size="small" color="secondary" variant="flat">{{ educaciones.length }} registradas</v-chip>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <EducacionList />
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- Experiencia Laboral -->
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon class="mr-2" color="tertiary">mdi-briefcase-outline</v-icon>
          <span class="font-weight-bold">Experiencia Laboral</span>
          <v-spacer />
          <v-chip size="small" color="tertiary" variant="flat">{{ experiencias.length }} registradas</v-chip>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ExperienciaList />
        </v-expansion-panel-text>
      </v-expansion-panel>

    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { fetchEducaciones } from '@/services/educationService'
import { fetchExperiencias } from '@/services/experienciaService'
import { fetchMiCurriculum } from '@/services/curriculumService'

import CurriculumInfo from '@/components/perfil/CurriculumInfo.vue'
import EducacionList from '@/components/perfil/EducacionList.vue'
import ExperienciaList from '@/components/perfil/ExperienciaList.vue'

const educaciones = ref([])
const experiencias = ref([])
const tieneCV = ref(false)
const curriculumId = ref(null)

const cargarCurriculumId = async () => {
  const miCurriculum = await fetchMiCurriculum()
  if (miCurriculum) curriculumId.value = miCurriculum.id
}

onMounted(async () => {
  await cargarCurriculumId()
  if (!curriculumId.value) {
    educaciones.value = []
    experiencias.value = []
    return
  }
  educaciones.value = await fetchEducaciones(curriculumId.value)
  experiencias.value = await fetchExperiencias(curriculumId.value)
  const cv = await fetchMiCurriculum()
  tieneCV.value = !!cv?.ruta_archivo
})

const resumenCards = computed(() => [
  {
    titulo: 'CV Subido',
    valor: tieneCV.value ? '✔ Subido' : 'No',
    icono: 'mdi-file-pdf-box',
    iconColor: 'primary',
    color: '#E3F2FD'
  },
  {
    titulo: 'Educaciones',
    valor: educaciones.value.length,
    icono: 'mdi-school',
    iconColor: 'secondary',
    color: '#F3E5F5'
  },
  {
    titulo: 'Experiencias',
    valor: experiencias.value.length,
    icono: 'mdi-briefcase-outline',
    iconColor: 'tertiary',
    color: '#E0F7FA'
  }
])
</script>
