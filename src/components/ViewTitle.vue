<script setup lang="ts">
const props = defineProps<{
  heading: string;
}>();
</script>

<template>
  <div class="flex flex-row flex-nowrap justify-between items-center px-4 py-4">
    <h2 class="text-2xl leading-tight font-light">{{ props.heading }}</h2>
  </div>
</template>

<style scoped></style>
