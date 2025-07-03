<template>
  <v-card class="pa-4" elevation="2">
    <v-divider class="my-2" />

    <!-- Subida de archivo PDF -->
    <v-file-input
      v-model="archivo"
      accept=".pdf"
      label="Selecciona tu CV (PDF)"
      prepend-icon="mdi-paperclip"
      outlined dense class="mb-4"
    />

    <!-- Formulario de información profesional -->
    <v-textarea
      v-model="curriculum.resumen"
      label="Resumen Profesional"
      rows="3"
      auto-grow class="mb-3"
    />

    <v-textarea
      v-model="curriculum.competencias"
      label="Competencias"
      rows="2"
      auto-grow class="mb-3"
    />

    <v-textarea
      v-model="curriculum.idiomas"
      label="Idiomas"
      rows="2"
      auto-grow class="mb-3"
    />

    <v-text-field
      v-model="curriculum.linkedin_url"
      label="LinkedIn"
      prepend-icon="mdi-linkedin"
      class="mb-3"
    />
    <v-text-field
      v-model="curriculum.github_url"
      label="GitHub"
      prepend-icon="mdi-github"
      class="mb-3"
    />
    <v-text-field
      v-model="curriculum.portafolio_url"
      label="Portafolio"
      prepend-icon="mdi-web"
      class="mb-4"
    />

    <v-autocomplete
      v-model="curriculum.habilidades"
      :items="habilidadesDisponibles"
      label="Habilidades"
      item-title="nombre"
      item-value="id"
      multiple clearable chips
      class="mb-4"
    />

    <v-btn
      color="primary"
      @click="guardarTodo"
      :disabled="!formularioValido"
    >
      <v-icon start>mdi-content-save</v-icon>
      Guardar y Subir CV
    </v-btn>

  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {
  fetchMiCurriculum,
  crearCurriculum,
  actualizarCurriculum,
  uploadCurriculum
} from '@/services/curriculumService'
import { fetchHabilidades } from '@/services/habilidadesService'
import { toRaw } from 'vue'
import { computed } from 'vue'

const archivo = ref(null)
const user = JSON.parse(localStorage.getItem('user'))
const curriculum = ref({
  resumen: '',
  competencias: '',
  idiomas: '',
  linkedin_url: '',
  github_url: '',
  portafolio_url: '',
  ruta_archivo: '',
  nombre_original: '',
  habilidades: []
})

const formularioValido = computed(() => {
  return [
    curriculum.value.resumen,
    curriculum.value.competencias,
    curriculum.value.idiomas,
    curriculum.value.linkedin_url,
    curriculum.value.github_url,
    curriculum.value.portafolio_url,
    curriculum.value.habilidades?.length,
    archivo.value
  ].some(Boolean)
})


const habilidadesDisponibles = ref([])

onMounted(async () => {
  const data = await fetchMiCurriculum()
  if (data) {
    curriculum.value = {
      ...data,
      habilidades: data.habilidades?.map(h => h.id) || []
    }
  }

  habilidadesDisponibles.value = await fetchHabilidades()
})

const guardarTodo = async () => {
  try {
    if (archivo.value) {
      const formData = new FormData()
      formData.append('archivo', archivo.value)
      formData.append('postulante_id', user.id)
      const res = await uploadCurriculum(formData, user.id)
      console.log('Respuesta de subida:', res)
      curriculum.value.ruta_archivo = res.data.ruta_archivo
      curriculum.value.nombre_original = res.data.nombre_original
      archivo.value = null

      console.log('Archivo subido correctamente:', curriculum.value.ruta_archivo,  curriculum.value.nombre_original)

    }

    const tieneContenido = [
      curriculum.value.resumen,
      curriculum.value.linkedin_url,
      curriculum.value.github_url,
      curriculum.value.portafolio_url,
      curriculum.value.competencias,
      curriculum.value.idiomas,
      curriculum.value.habilidades?.length,
      curriculum.value.ruta_archivo,
      curriculum.value.nombre_original
    ].some(Boolean)

    if (!tieneContenido) {
      alert('Debes completar al menos un campo o subir un archivo.')
      return
    }

    curriculum.value.postulante_id = user.id

    // Convertir habilidades a array plano
    const payload = {
      ...curriculum.value,
      habilidades: toRaw(curriculum.value.habilidades || [])
    }

    for (const key of ['linkedin_url', 'github_url', 'portafolio_url']) {
      if (!payload[key]?.trim()) {
        delete payload[key]
      }
    }

    if (!payload.ruta_archivo?.trim()) {
      delete payload.ruta_archivo
    }


    console.log('Payload a enviar (crear o actualizar):', payload)

    if (curriculum.value.id) {
      await actualizarCurriculum(curriculum.value.id, payload)
    } else {
      const nuevo = await crearCurriculum(payload)
      curriculum.value.id = nuevo.id
    }

    alert('Información guardada correctamente.')
  } catch (err) {
    console.error('Error al guardar la información:', err)
    alert('Error al guardar el CV.')
  }
}
</script>
