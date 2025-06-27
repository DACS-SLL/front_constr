<template>
  <v-container fluid class="pa-6 bg-grey-lighten-4">
    <h2 class="mb-6">Explorar Ofertas Laborales</h2>

    <OfertasFiltros v-model="filtros" :loading="loading" @buscar="cargarOfertas" />


    <v-row dense>
      <v-col cols="12" v-if="ofertas.length === 0">
        <v-alert type="info" class="text-center">No se encontraron ofertas.</v-alert>
      </v-col>

      <v-col v-for="oferta in ofertas" :key="oferta.id" cols="12" md="6" lg="4">
        <OfertaCard :oferta="oferta" @ver-detalle="verDetalle" />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-4">
      <v-pagination
        v-model="paginaActual"
        :length="totalPaginas"
        @input="cargarOfertas"
      />
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { fetchOfertas } from '@/services/ofertaService'
import { useRouter } from 'vue-router'
import OfertaCard from '@/components/ofertas/OfertaCard.vue'
import OfertasFiltros from '@/components/ofertas/OfertasFiltros.vue'

const router = useRouter()
const ofertas = ref([])
const paginaActual = ref(1)
const totalPaginas = ref(1)
const loading = ref(false)

const cargarOfertas = async () => {
  try {
    loading.value = true
    const limit = 9
    const skip = (paginaActual.value - 1) * limit

    const params = {
      ...(filtros.value.ubicacion && { ubicacion: filtros.value.ubicacion }),
      ...(filtros.value.estado && { estado: filtros.value.estado }),
      ...(filtros.value.empresa_id && { empresa_id: filtros.value.empresa_id }),
      skip,
      limit
    }

    console.log('Parámetros enviados:', params)

    const res = await fetchOfertas(params)
    ofertas.value = res.data
    console.log('Ofertas cargadas:', ofertas.value)
    // Podrías obtener el total desde los headers u otro endpoint
    totalPaginas.value = Math.ceil(10/ limit) // ← ajusta esto dinámicamente
  } catch (err) {
    console.error('Error al cargar ofertas:', err)
  } finally {
    loading.value = false
  }
}

const filtros = ref({
  ubicacion: '',
  estado: '',
  empresa_id: ''
})


const verDetalle = (id) => {
  router.push(`/ofertas/${id}`)
}

onMounted(cargarOfertas)

watch(paginaActual, cargarOfertas)
</script>
