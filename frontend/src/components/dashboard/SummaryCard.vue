<!-- src/components/dashboard/SummaryCard.vue -->
<template>
  <v-card
    class="summary-card d-flex flex-column justify-center align-center text-center"
    :color="`${color} lighten-5`"
    elevation="3"
    min-width="220"
    height="150"
    rounded="xl"
  >
    <v-avatar size="48" class="mb-2" :color="color">
      <v-icon color="white">{{ icon }}</v-icon>
    </v-avatar>

    <div class="text-subtitle-2 font-weight-medium text-uppercase mb-1" style="letter-spacing: 1px;">
      {{ label }}
    </div>
    <div class="text-h5 font-weight-bold text--primary">
      {{ value ?? 0 }}
    </div>
  </v-card>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  color: { type: String, default: 'primary' },
})
</script>

<style scoped>
.summary-card {
  transition: box-shadow 0.2s ease;
}
.summary-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}
</style>
