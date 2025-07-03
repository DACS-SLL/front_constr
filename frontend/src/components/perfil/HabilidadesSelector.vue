<template>
  <v-card title="Habilidades">
    <v-autocomplete
      v-model="seleccionadas"
      :items="todas"
      item-text="nombre"
      item-value="id"
      label="Selecciona tus habilidades"
      multiple chips
    />
    <v-btn color="primary" @click="guardar">Guardar</v-btn>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchHabilidades, asignarHabilidadesACurriculum } from '@/services/habilidadesService'

const todas = ref([])
const seleccionadas = ref([])

onMounted(async () => {
  todas.value = await fetchHabilidades()
  // Opcional: cargar las seleccionadas si ya hay
})

const guardar = async () => {
  await asignarHabilidadesACurriculum(seleccionadas.value)
}
</script>
