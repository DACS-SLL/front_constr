<template>
  <v-container>
    <v-card class="pa-4" elevation="2">
      <v-card-title class="text-h6 font-weight-bold">Gestión de Usuarios</v-card-title>
      <v-divider class="my-2" />

      <!-- Filtros -->
      <v-row class="mb-4" dense>
        <v-col cols="12" md="4">
          <v-select
            v-model="filtroRol"
            :items="rolesDisponibles"
            label="Filtrar por rol"
            clearable
          />
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="filtroEstado"
            :items="['Activo', 'Bloqueado']"
            label="Filtrar por estado"
            clearable
          />
        </v-col>
      </v-row>

      <!-- Tabla de usuarios -->
      <v-data-table
        :headers="headers"
        :items="usuariosFiltrados"
        :items-per-page="10"
        class="elevation-1"
        dense
      >
        <!-- En chip de rol -->
        <template #item.rol="{ item }">
        <v-chip :color="getRolColor(item.rol.nombre)" variant="flat">
            {{ item.rol.nombre }}
        </v-chip>
        </template>


        <template #item.estado="{ item }">
          <v-chip :color="item.estado === 'Activo' ? 'green' : 'red'" variant="flat">
            {{ item.estado }}
          </v-chip>
        </template>

        <template #item.acciones="{ item }">
          <v-btn icon @click="abrirDialogoRol(item)">
            <v-icon>mdi-account-edit</v-icon>
          </v-btn>
          <v-btn icon @click="toggleBloqueo(item)">
            <v-icon :color="item.estado === 'Activo' ? 'red' : 'green'">
              {{ item.estado === 'Activo' ? 'mdi-block-helper' : 'mdi-account-check' }}
            </v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Modal para cambiar rol -->
    <v-dialog v-model="dialogoRol" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Cambiar Rol</v-card-title>
        <v-card-text>
          <v-select
            v-model="nuevoRol"
            :items="rolesDisponibles"
            label="Nuevo rol"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialogoRol = false">Cancelar</v-btn>
          <v-btn color="primary" @click="guardarNuevoRol">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchUsuarios, cambiarRolUsuario, bloquearUsuario } from '@/services/adminService'

const usuarios = ref([])
const filtroRol = ref(null)
const filtroEstado = ref(null)
const rolesDisponibles = ['postulante', 'empleador', 'admin']

const headers = [
  { text: 'Nombre', value: 'nombre' },
  { text: 'Correo', value: 'correo' },
  { text: 'Rol', value: 'rol' },
  { text: 'Estado', value: 'estado' },
  { text: 'Acciones', value: 'acciones', sortable: false },
]

const dialogoRol = ref(false)
const usuarioActual = ref(null)
const nuevoRol = ref('')

const getRolColor = (rol) => {
  if (rol === 'admin') return 'deep-purple'
  if (rol === 'empleador') return 'blue'
  return 'green'
}

const usuariosFiltrados = computed(() => {
  return usuarios.value.filter(u => {
    const cumpleRol = !filtroRol.value || u.rol.nombre === filtroRol.value
    const cumpleEstado = !filtroEstado.value || u.estado === filtroEstado.value
    return cumpleRol && cumpleEstado
  })
})

const cargarUsuarios = async () => {
  const datos = await fetchUsuarios()
  usuarios.value = datos.map(u => ({
    ...u,
    estado: u.activo ? 'Activo' : 'Bloqueado'
  }))
}

const abrirDialogoRol = (usuario) => {
  usuarioActual.value = usuario
  nuevoRol.value = usuario.rol.nombre
  dialogoRol.value = true
}

const guardarNuevoRol = async () => {
  if (!usuarioActual.value || !nuevoRol.value) return

  await cambiarRolUsuario(usuarioActual.value.id, nuevoRol.value)
  dialogoRol.value = false
  await cargarUsuarios()
}

const toggleBloqueo = async (usuario) => {
  const nuevoEstado = usuario.estado === 'Activo' ? false : true
  await bloquearUsuario(usuario.id, nuevoEstado)
  await cargarUsuarios()
}

onMounted(() => {
  cargarUsuarios()
})
</script>
