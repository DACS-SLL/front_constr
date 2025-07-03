<template>
  <v-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" persistent max-width="600px">
    <v-card>
      <v-card-title>{{ educacion.id ? 'Editar' : 'Nueva' }} Educación</v-card-title>
      <v-card-text>
        <v-text-field v-model="educacion.institucion" label="Institución" />
        <v-text-field v-model="educacion.titulo" label="Título" />
        <v-text-field v-model="educacion.fecha_inicio" label="Fecha inicio" type="date" />
        <v-text-field v-model="educacion.fecha_fin" label="Fecha fin" type="date" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="cerrar">Cancelar</v-btn>
        <v-btn color="primary" @click="guardar">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { watch, ref } from 'vue'
import { createEducacion, updateEducacion } from '@/services/educationService'

const props = defineProps({
  modelValue: Boolean,
  educacionEditar: Object
})

const emit = defineEmits(['update:modelValue', 'guardado'])

const educacion = ref({})

const cerrar = () => emit('update:modelValue', false)

watch(
  () => props.modelValue,
  () => {
    educacion.value = props.educacionEditar
      ? { ...props.educacionEditar }
      : {
          institucion: '',
          titulo: '',
          fecha_inicio: '',
          fecha_fin: ''
        }
  },
  { immediate: true }
)

const guardar = async () => {
  if (!educacion.value.institucion || !educacion.value.titulo) {
    return alert('Por favor, completa todos los campos obligatorios.')
  }

  if (props.educacionEditar) {
    await updateEducacion(educacion.value.id, educacion.value)
  } else {
    await createEducacion(educacion.value)
  }
  cerrar()
  emit('guardado')
}
</script>
