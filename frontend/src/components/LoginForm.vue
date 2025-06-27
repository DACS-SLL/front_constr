<template>
  <v-form @submit.prevent="onSubmit" validate-on="submit">
    <v-text-field
      v-model="email"
      label="Email"
      type="email"
      variant="outlined"
      class="mb-4"
      prepend-inner-icon="mdi-email"
      required
    />
    <v-text-field
      v-model="password"
      label="Contraseña"
      type="password"
      variant="outlined"
      class="mb-4"
      prepend-inner-icon="mdi-lock"
      required
    />
    <v-btn
      type="submit"
      color="primary"
      block
      size="large"
      :loading="loading"
      class="mt-2"
    >
      Iniciar Sesión
    </v-btn>
  </v-form>
</template>

<script setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['submit'])

const email = ref('')
const password = ref('')
const loading = ref(false)

const onSubmit = () => {
  emit('submit', {
    email: email.value,
    password: password.value,
    setLoading: (val) => loading.value = val
  })
}
</script>
