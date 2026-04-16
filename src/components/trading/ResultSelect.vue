<script setup lang="ts">
  import SimpleSelect from '../infrastructure/SimpleSelect.vue';

</script>

<template>
  <SimpleSelect
    :items="['Automatisch ermitteln', 'Gewinn', 'Mittelmäßig', 'Kostendeckend', 'Verlust']"
    label="Ergebnis"
  />
</template>

<style scoped>
</style>
