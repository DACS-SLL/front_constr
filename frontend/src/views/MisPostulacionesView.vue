<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4">
    <h2 class="mb-4">Mis Postulaciones</h2>

    <v-row dense>
      <v-col v-for="postulacion in postulaciones" :key="postulacion.id" cols="12" md="6" lg="4">
        <v-card class="mb-4" outlined>
          <v-card-title class="text-primary">{{ postulacion.oferta?.titulo }}</v-card-title>
          <v-card-subtitle>
            {{ postulacion.oferta?.ubicacion }} • 
            {{ formatFecha(postulacion.fecha_postulacion) }}
          </v-card-subtitle>
          <v-card-text>
            <p>Estado: <strong>{{ postulacion.estado }}</strong></p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="indigo" text @click="verDetalle(postulacion.oferta.id)">
            Ver oferta
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-card-actions class="justify-end">
        <v-btn color="primary" @click="router.back()">Volver</v-btn>
    </v-card-actions>

    <v-alert v-if="postulaciones.length === 0" type="info" class="mt-6">
      Aún no has realizado ninguna postulación.
    </v-alert>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchMisPostulaciones } from '@/services/postulacionService'
import { useRouter } from 'vue-router'

const postulaciones = ref([])
const router = useRouter()

const formatFecha = (f) => new Date(f).toLocaleDateString()

const verDetalle = (ofertaId) => {
  router.push(`/ofertas/${ofertaId}`)
}

onMounted(async () => {
  try {
    const res = await fetchMisPostulaciones()
    postulaciones.value = res.data
  } catch (err) {
    console.error('Error al cargar postulaciones:', err)
  }
})
</script>
