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
      flat
      :placeholder="`Enter Notes here ...\nHint:Use Markdown`"
      rounded="xl"
      variant="solo"
    />
  </div>
</template>

<style scoped>
</style>
