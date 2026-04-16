<script setup lang="ts">
  import SimpleSelect from '../infrastructure/SimpleSelect.vue';
</script>

<template>
  <SimpleSelect
    :items="['EUR/USD', 'BTC/EUR', 'BTC/USD', 'S&P500', 'ATX']"
    label="Asset"
  />
</template>

<style scoped>
</style>
