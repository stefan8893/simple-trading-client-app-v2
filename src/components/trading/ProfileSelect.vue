<script setup lang="ts">

  const model = defineModel<string | null>('Default');
</script>

<template>
  <v-select
    v-model="model"
    :items="['Default', 'Experimental']"
    label="Profil"
  />
</template>

<style scoped>
</style>
