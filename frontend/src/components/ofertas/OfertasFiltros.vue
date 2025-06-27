<template>
  <v-row dense class="mb-6">
    <v-col cols="12" sm="3">
      <v-text-field v-model="filtros.ubicacion" label="Ubicación" outlined dense clearable />
    </v-col>
    <v-col cols="12" sm="3">
      <v-select v-model="filtros.estado" :items="['Activa', 'Inactiva']" label="Estado" outlined dense clearable />
    </v-col>
    <v-col cols="12" sm="3">
      <v-text-field v-model="filtros.empresa_id" label="ID Empresa" outlined dense clearable />
    </v-col>
    <v-col cols="12" sm="3">
      <v-btn color="primary" class="mt-2" block :loading="loading" @click="emitBuscar">Buscar</v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
const filtros = defineModel({ default: {} })
const props = defineProps({ loading: Boolean })
const emit = defineEmits(['buscar'])

const emitBuscar = () => {
  emit('buscar')
}
</script>
