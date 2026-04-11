<script setup lang="ts">
  import MarkdownNotesEditor from './MarkdownNotesEditor.vue';
  import MarkdownNotesPreview from './MarkdownNotesPreview.vue';

  const model = defineModel<string | null>();

</script>

<template>
  <v-sheet>
    <div class="flex flex-row flex-wrap w-full h-full">
      <MarkdownNotesEditor v-model="model" class="flex-1 min-w-72 p-4" />
      <v-divider vertical />
      <MarkdownNotesPreview v-model="model" class="flex-1 min-w-72 p-4" />
    </div>
  </v-sheet>
</template>

<style scoped>
</style>
