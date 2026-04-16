<script setup lang="ts">
  import SimpleSelect from '../infrastructure/SimpleSelect.vue';

  const model = defineModel<string | null>('Default');
</script>

<template>
  <SimpleSelect
    v-model="model"
    :items="['Default', 'Experimental']"
    label="Profil"
  />
</template>

<style scoped>
</style>
