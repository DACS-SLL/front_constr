<template>
  <v-container class="py-6">
        <!-- Botón para volver -->
    <v-btn color="secondary" variant="tonal" @click="router.push('/dashboard')" class="mb-4">
      <v-icon start>mdi-arrow-left</v-icon>
      Volver al Dashboard
    </v-btn>

    <v-card elevation="3" class="pa-6">
      <v-card-title class="text-h5">Publicar Nueva Oferta</v-card-title>
      <v-card-text>
        <OfertaForm @oferta-creada="onOfertaCreada" />
      </v-card-text>
    </v-card>
    
  </v-container>
</template>

<script setup>
import OfertaForm from '@/components/ofertas/OfertaForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

function onOfertaCreada() {
  router.push('/ofertas') // o ruta deseada tras guardar
}
</script>
