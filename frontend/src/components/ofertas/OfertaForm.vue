<template>
  <v-container class="pa-6">
    <!-- Formulario -->
    <v-form ref="formRef" v-model="formValido" @submit.prevent="submitForm">
      <v-text-field
        label="Título de la Oferta"
        v-model="form.titulo"
        :rules="[v => !!v || 'Campo requerido']"
        required
      />
      <v-textarea label="Descripción" v-model="form.descripcion" />
      <v-text-field label="Ubicación" v-model="form.ubicacion" />
      <v-select
        label="Categoría"
        v-model="form.categoria_id"
        :items="categorias"
        item-title="nombre"
        item-value="id"
        :rules="[v => !!v || 'Selecciona una categoría']"
        required
      />
      <v-select
        label="Estado"
        v-model="form.estado"
        :items="['activa', 'inactiva']"
        required
      />
      <v-btn type="submit" color="primary" class="mt-4">Publicar Oferta</v-btn>
    </v-form>

    <!-- Modal de Confirmación -->
    <v-dialog v-model="mostrarConfirmacion" max-width="600px">
      <v-card>
        <v-card-title class="text-h6">Confirmar Publicación</v-card-title>
        <v-card-text>
          <p><strong>Título:</strong> {{ form.titulo }}</p>
          <p><strong>Descripción:</strong> {{ form.descripcion || '—' }}</p>
          <p><strong>Ubicación:</strong> {{ form.ubicacion || '—' }}</p>
          <p><strong>Estado:</strong> {{ form.estado }}</p>
          <p>
            <strong>Categoría:</strong>
            {{
              categorias.find(c => c.id === form.categoria_id)?.nombre || '—'
            }}
          </p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="mostrarConfirmacion = false">Cancelar</v-btn>
          <v-btn color="primary" @click="confirmarEnvio">Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Snackbar de éxito -->
    <v-snackbar v-model="snackbar.visible" :timeout="3000" color="success">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { guardarOferta } from '@/services/ofertaService'
import { fetchCategorias } from '@/services/categoriaService'

const router = useRouter()
const formRef = ref(null)
const formValido = ref(false)
const categorias = ref([])
const mostrarConfirmacion = ref(false)

const user = JSON.parse(localStorage.getItem('user'))
const empresa_id = user?.id

const form = ref({
  titulo: '',
  descripcion: '',
  ubicacion: '',
  estado: 'activa',
  categoria_id: null,
  empresa_id
})

const snackbar = ref({
  visible: false,
  text: ''
})

const emit = defineEmits(['oferta-creada'])

const cargarCategorias = async () => {
  try {
    const response = await fetchCategorias()
    categorias.value = response.data
  } catch (error) {
    console.error('Error al cargar categorías', error)
  }
}

const submitForm = () => {
  if (formRef.value?.validate()) {
    mostrarConfirmacion.value = true
  }
}

const confirmarEnvio = async () => {
  try {
    await guardarOferta(form.value)
    mostrarConfirmacion.value = false
    snackbar.value = { visible: true, text: 'Oferta publicada con éxito' }
    emit('oferta-creada')
  } catch (e) {
    console.error(e)
    alert('Error al guardar la oferta')
  }
}

onMounted(cargarCategorias)
</script>
