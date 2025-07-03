<template>
  <v-card>
    <v-card-title class="d-flex justify-space-between align-center">
      <v-btn color="primary" @click="abrirForm">Agregar</v-btn>
    </v-card-title>

    <v-card-text>
      <v-list v-if="experiencias.length">
        <v-list-item
          v-for="exp in experiencias"
          :key="exp.id"
          class="px-2"
        >
          <v-list-item-content>
            <v-list-item-title>{{ exp.cargo }} en {{ exp.empresa }}</v-list-item-title>
            <v-list-item-subtitle>{{ exp.fecha_inicio }} - {{ exp.fecha_fin }}</v-list-item-subtitle>
            <v-list-item-subtitle class="text-body-2">{{ exp.descripcion }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click="editar(exp)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="eliminar(exp.id)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <div v-else class="text-center text-grey">No hay experiencias registradas</div>
    </v-card-text>
  </v-card>

  <ExperienciaForm
    v-model="mostrarModal"
    :experienciaEditar="experienciaActual"
    @guardado="cargarExperiencias"
/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchExperiencias, deleteExperiencia } from '@/services/experienciaService'
import { fetchMiCurriculum } from '@/services/curriculumService'
import ExperienciaForm from '@/components/perfil/experiencia/ExperienciaForm.vue'

const experiencias = ref([])
const mostrarModal = ref(false)
const experienciaActual = ref(null)
const curriculumId = ref(null)


const cargarCurriculumId = async () => {
  const miCurriculum = await fetchMiCurriculum()
  if (miCurriculum) curriculumId.value = miCurriculum.id
}

console.log(curriculumId.value)

const cargarExperiencias = async () => {
  if (!curriculumId.value) {
    experiencias.value = []
    return
  }

  experiencias.value = await fetchExperiencias(curriculumId.value)
}

const abrirForm = () => {
  experienciaActual.value = null
  mostrarModal.value = true
}

const editar = (exp) => {
  experienciaActual.value = { ...exp }
  mostrarModal.value = true
}

const eliminar = async (id) => {
  if (confirm('¿Deseas eliminar esta experiencia?')) {
    await deleteExperiencia(id)
    await cargarExperiencias()
  }
}

onMounted(async () => {
  await cargarCurriculumId()
  await cargarExperiencias()
})
</script>
