<script setup lang="ts">
const props = defineProps<{
  heading: string;
  icon?: string;
}>();
</script>

<template>
  <div class="flex flex-row flex-nowrap justify-between items-center py-4">
    <h2 class="text-2xl leading-tight font-light">{{ props.heading }}</h2>
    <v-icon
      v-if="props.icon"
      class="font-light ml-2"
      color="primary"
      :icon="props.icon"
      size="small"
    ></v-icon>
  </div>
</template>

<style scoped></style>
