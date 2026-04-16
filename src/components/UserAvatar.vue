<script setup lang="ts">
const props = defineProps<{
  size?: string | number;
}>();
</script>

<template>
  <v-avatar
    class="bg-header-avatar-background"
    color="accent"
    :size="props.size"
  >
    <span class="font-bold select-none">SJ</span>
  </v-avatar>
</template>

<style scoped></style>
