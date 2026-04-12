<script setup lang="ts">
  import packageInfo from '@/../package.json';
</script>

<template>
  <div class="text-sm w-full">
    <pre class="float-end">{{ packageInfo.version }}</pre>
  </div>
</template>

<style scoped>
</style>
