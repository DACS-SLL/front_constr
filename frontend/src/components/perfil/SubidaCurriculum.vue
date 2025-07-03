<template>
  <v-card class="pa-4" elevation="2">
    <v-card-text>
      <v-file-input
        v-model="archivo"
        accept=".pdf"
        label="Selecciona tu CV (PDF)"
        prepend-icon="mdi-paperclip"
        outlined
        dense
      />
    </v-card-text>

    <v-card-actions class="justify-end">
      <v-btn
        :disabled="!archivo"
        color="primary"
        @click="subir"
        variant="flat"
      >
        <v-icon start>mdi-upload</v-icon>
        Subir
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { uploadCurriculum } from '@/services/curriculumService'

const archivo = ref(null)
const user = JSON.parse(localStorage.getItem('user'))

const subir = async () => {
  if (!archivo.value) return

  const formData = new FormData()
  formData.append('archivo', archivo.value)
  formData.append('postulante_id', user?.id)

  try {
    await uploadCurriculum(formData)
    archivo.value = null
    alert('CV subido correctamente.')
  } catch (error) {
    console.error('Error al subir CV:', error)
    alert('Hubo un error al subir tu CV.')
  }
}
</script>
