<template>
  <v-app>
    <v-main class="fullscreen-view d-flex align-center justify-center">
      <v-container fluid class="fill-height d-flex align-center justify-center pa-0">
        <v-card class="pa-8" max-width="450" width="100%" elevation="10" rounded="lg">
          <div class="text-center mb-6">
            <v-icon size="64" color="primary">mdi-account-plus</v-icon>
            <h1 class="text-h5 mt-3">Registro de Usuario</h1>
          </div>

          <RegisterForm />

          <div class="text-center mt-4">
            <v-btn variant="text" @click="$router.push('/')">
              ¿Ya tienes cuenta? Inicia sesión
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import RegisterForm from '@/components/RegisterForm.vue'
</script>

<style scoped>
.fullscreen-view {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
}
</style>