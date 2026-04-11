<script setup lang="ts">

  const model = defineModel<string | null>();

</script>

<template>
  <div>
    <v-textarea
      v-model="model"
      auto-grow
      class="font-mono min-h-72"
      counter
      elevation="0"
      persistent-hint
      rounded="xl"
    />
  </div>
</template>

<style scoped>
</style>
