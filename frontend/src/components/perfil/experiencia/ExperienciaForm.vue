<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>{{ experiencia.id ? 'Editar' : 'Nueva' }} Experiencia</v-card-title>
      <v-card-text>
        <v-text-field v-model="experiencia.empresa" label="Empresa" />
        <v-text-field v-model="experiencia.cargo" label="Cargo" />
        <v-textarea v-model="experiencia.descripcion" label="Descripción" />
        <v-text-field v-model="experiencia.fecha_inicio" label="Fecha inicio" type="date" />
        <v-text-field v-model="experiencia.fecha_fin" label="Fecha fin" type="date" />
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
import { ref, watch } from 'vue'
import { createExperiencia, updateExperiencia } from '@/services/experienciaService'

const props = defineProps({
  modelValue: Boolean,
  experienciaEditar: Object
})
const emit = defineEmits(['update:modelValue', 'guardado'])

const experiencia = ref({})

const cerrar = () => emit('update:modelValue', false)

// Rellena los datos según si es nueva o edición
watch(() => props.modelValue, () => {
  experiencia.value = props.experienciaEditar ? { ...props.experienciaEditar } : {
    empresa: '',
    cargo: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: ''
  }
})

const guardar = async () => {
  props.experienciaEditar
    ? await updateExperiencia(experiencia.value.id, experiencia.value)
    : await createExperiencia(experiencia.value)
  emit('update:modelValue', false)
  emit('guardado')
}
</script>
