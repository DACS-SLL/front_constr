<template>
  <v-card class="mb-4" outlined elevation="1">
    <v-card-title class="text-primary">{{ oferta.titulo }}</v-card-title>
    <v-card-subtitle>
      {{ oferta.ubicacion }} • {{ formatFecha(oferta.fecha_publicacion) }}
    </v-card-subtitle>
    <v-card-text>
      <p>{{ oferta.descripcion ? oferta.descripcion.slice(0, 120) : 'Sin descripción disponible' }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="indigo" variant="text" @click="$emit('ver-detalle', oferta.id)">Ver más</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
const props = defineProps({ oferta: Object })
const formatFecha = (f) => new Date(f).toLocaleDateString()
</script>
