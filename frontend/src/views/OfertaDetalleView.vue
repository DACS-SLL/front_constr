<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4">
    <v-card class="mx-auto pa-6" max-width="800" outlined elevation="2">
      <v-card-title class="text-h5 text-primary">
        {{ oferta?.titulo }}
      </v-card-title>

      <v-card-subtitle class="mb-4">
        <v-chip color="indigo" class="me-2" text-color="white">
          {{ oferta?.empresa?.nombre }}
        </v-chip>
        <v-chip color="primary" text-color="white">
          {{ oferta?.categoria?.nombre }}
        </v-chip>
      </v-card-subtitle>

      <v-divider></v-divider>

      <v-card-text class="mt-4">
        <v-row dense>
          <v-col cols="12" sm="6">
            <strong>Ubicación:</strong> {{ oferta?.ubicacion }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Estado:</strong> {{ oferta?.estado }}
          </v-col>
          <v-col cols="12" sm="6">
            <strong>Fecha de publicación:</strong> {{ formatFecha(oferta?.fecha_publicacion) }}
          </v-col>
        </v-row>

        <v-divider class="my-4"></v-divider>

        <h4 class="text-subtitle-1 mb-2">Descripción del puesto</h4>
        <p class="text-body-1">
          {{ oferta?.descripcion }}
        </p>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="success" @click="irAPostulacion">Postularme</v-btn>
        <v-btn color="primary" @click="router.back()">Volver</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getOfertaById } from '@/services/ofertaService'

const route = useRoute()
const router = useRouter()
const oferta = ref(null)

const formatFecha = (f) => new Date(f).toLocaleDateString()

onMounted(async () => {
  try {
    const res = await getOfertaById(route.params.id)
    oferta.value = res.data
    console.log('Oferta cargada:', oferta.value)
  } catch (error) {
    console.error('Error al cargar la oferta:', error)
  }
})

const irAPostulacion = () => {
  router.push(`/postulacion/${oferta.value.id}`)
}

</script>
