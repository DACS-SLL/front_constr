<template>
  <v-container>
    <!-- Botón de regreso -->
    <v-row justify="start" class="mb-4">
      <v-col cols="12" sm="auto">
        <v-btn
          color="secondary"
          variant="tonal"
          @click="router.push('/dashboard')"
          prepend-icon="mdi-arrow-left"
        >
          Volver al Dashboard
        </v-btn>
      </v-col>
    </v-row>

    <h2 class="mb-4">Postulantes por Oferta</h2>

    <!-- Selector de oferta -->
    <v-select
      label="Selecciona una Oferta"
      v-model="ofertaSeleccionada"
      :items="ofertas"
      item-title="titulo"
      item-value="id"
      class="mb-4"
    />

    <!-- Estado de la oferta -->
    <v-select
    v-if="ofertaSeleccionadaObj"
    label="Estado de la Oferta"
    v-model="estadoOferta"
    :items="['activa', 'inactiva', 'finalizada']"
    @update:modelValue="actualizarEstadoOferta"
    class="mb-4"
    />


    <!-- Tabla de postulantes -->
    <v-data-table
      :items="postulantes"
      :headers="headers"
      class="elevation-1"
    >
      <!-- Switch para cambiar estado -->
      <template #item.cambiar_estado="{ item }">
        <div class="d-flex align-center">
          <v-switch
            v-model="item.estado"
            :true-value="'aprobado'"
            :false-value="'pendiente'"
            @change="cambiarEstadoPostulacion(item)"
            color="success"
            inset
            hide-details
          />
          <span class="ms-2 text-caption">{{ item.estado }}</span>
        </div>
      </template>

      <!-- Botón de evaluar -->
      <template #item.acciones="{ item }">
        <v-btn size="small" color="primary" @click="evaluar(item)">
          Evaluar
        </v-btn>
      </template>
    </v-data-table>
  </v-container>

  <!-- Modal Evaluación -->
  <v-dialog v-model="modalEvaluar" max-width="500">
    <v-card>
      <v-card-title>Evaluar Postulante</v-card-title>
      <v-card-text>
        <p><strong>{{ postulacionSeleccionada?.postulante?.nombre_completo }}</strong></p>

        <v-textarea
          label="Comentarios"
          v-model="comentariosEvaluacion"
          auto-grow
        />
        <v-select
          label="Resultado"
          v-model="resultadoEvaluacion"
          :items="['aprobado', 'rechazado']"
          required
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="modalEvaluar = false">Cancelar</v-btn>
        <v-btn color="primary" @click="guardarEvaluacion">Guardar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { fetchPostulacionesPorOferta } from '@/services/postulacionService'
import { fetchOfertas, actualizarOferta } from '@/services/ofertaService'
import { useRouter } from 'vue-router'
import api from '@/services/apiService'

const router = useRouter()
const ofertas = ref([])
const ofertaSeleccionada = ref(null)
const ofertaSeleccionadaObj = ref(null)
const postulantes = ref([])

const modalEvaluar = ref(false)
const postulacionSeleccionada = ref(null)
const comentariosEvaluacion = ref('')
const resultadoEvaluacion = ref('')
const estadoOferta = ref('')


const user = JSON.parse(localStorage.getItem('user'))

const headers = [
  { title: 'Nombre Completo', value: 'postulante.nombre_completo' },
  { title: 'Teléfono', value: 'postulante.telefono' },
  { title: 'Fecha Postulación', value: 'fecha_postulacion' },
  { title: 'Cambiar Estado', value: 'cambiar_estado', sortable: false },
  { title: 'Acciones', value: 'acciones', sortable: false }
]

const cargarOfertas = async () => {
  try {
    const res = await fetchOfertas({ empresa_id: user.id })
    ofertas.value = res.data
  } catch (err) {
    console.error('Error al cargar ofertas:', err)
  }
}

const cargarPostulantes = async () => {
  if (!ofertaSeleccionada.value) return
  try {
    const res = await fetchPostulacionesPorOferta(ofertaSeleccionada.value)
    postulantes.value = res.data.map(p => ({
      ...p,
      estado: p.estado || 'pendiente'
    }))
    ofertaSeleccionadaObj.value = ofertas.value.find(o => o.id === ofertaSeleccionada.value)
    estadoOferta.value = ofertaSeleccionadaObj.value?.estado ?? ''
  } catch (err) {
    console.error('Error al cargar postulantes:', err)
  }
}


const actualizarEstadoOferta = async () => {
  if (!ofertaSeleccionada.value || !estadoOferta.value) return
  try {
    await actualizarOferta(ofertaSeleccionada.value, {
      estado: estadoOferta.value
    })
    alert('Estado de oferta actualizado.')
    ofertaSeleccionadaObj.value.estado = estadoOferta.value // sincronizar
  } catch (err) {
    console.error('Error al actualizar estado:', err)
    alert('Error al actualizar estado.')
  }
}

const cambiarEstadoPostulacion = async (postulacion) => {
  try {
    await api.patch(`/postulaciones/${postulacion.id}`, {
    estado: postulacion.estado
    }, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })
    alert('Estado actualizado correctamente.')
  } catch (err) {
    console.error('Error al cambiar estado:', err)
    alert('No se pudo actualizar el estado.')
  }
}

const evaluar = (postulacion) => {
  postulacionSeleccionada.value = postulacion
  comentariosEvaluacion.value = ''
  resultadoEvaluacion.value = ''
  modalEvaluar.value = true
}

const guardarEvaluacion = async () => {
  try {
    const payload = {
      postulacion_id: postulacionSeleccionada.value.id,
      comentarios: comentariosEvaluacion.value,
      resultado: resultadoEvaluacion.value
    }

    await api.post('/evaluaciones', payload, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    })

    alert('Evaluación guardada correctamente.')
    modalEvaluar.value = false
  } catch (err) {
    console.error('Error al guardar evaluación:', err)
    alert('Error al guardar evaluación.')
  }
}

watch(ofertaSeleccionada, (nuevoId) => {
  if (nuevoId) cargarPostulantes()
})

onMounted(cargarOfertas)
</script>
