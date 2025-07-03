<template>
  <div>
    <v-card-title class="d-flex justify-space-between align-center">
      <v-btn color="primary" class="mb-4" @click="abrirForm">Agregar Educación</v-btn>
    </v-card-title>

    <v-list two-line>
      <v-list-item
        v-for="edu in educaciones"
        :key="edu.id"
        class="mb-2"
      >
        <v-list-item-content>
          <v-list-item-title>{{ edu.titulo }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ edu.institucion }} ({{ edu.fecha_inicio }} - {{ edu.fecha_fin || 'Actualidad' }})
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon @click="editar(edu)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="eliminar(edu.id)">
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <EducacionForm
      v-model="mostrarModal"
      :educacionEditar="educacionActual"
      @guardado="cargarEducaciones"
    />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { fetchEducaciones, deleteEducacion } from '@/services/educationService'
import { fetchMiCurriculum } from '@/services/curriculumService'
import EducacionForm from '@/components/perfil/education/EducacionForm.vue'

const educaciones = ref([])
const mostrarModal = ref(false)
const educacionActual = ref(null)
const curriculumId = ref(null)

const cargarCurriculumId = async () => {
  const miCurriculum = await fetchMiCurriculum()
  if (miCurriculum) curriculumId.value = miCurriculum.id
}

const cargarEducaciones = async () => {
  if (!curriculumId.value) {
    educaciones.value = []
    return
  }

  educaciones.value = await fetchEducaciones(curriculumId.value)
}

const abrirForm = () => {
  educacionActual.value = null
  mostrarModal.value = true
}

const editar = (edu) => {
  educacionActual.value = { ...edu }
  mostrarModal.value = true
}

const eliminar = async (id) => {
  await deleteEducacion(id)
  await cargarEducaciones()
}

onMounted(async () => {
  await cargarCurriculumId()
  await cargarEducaciones()
})
</script>
