<script setup lang="ts">
  import MarkdownNotesEditor from './MarkdownNotesEditor.vue';
  import MarkdownNotesPreview from './MarkdownNotesPreview.vue';

  const model = defineModel<string | null>();

</script>

<template>
  <v-card elevation="0" rounded="0">
    <v-card-text class="p-0">
      <div class="flex flex-col sm:flex-row flex-wrap w-full h-full">
        <MarkdownNotesEditor v-model="model" class="flex-1 min-w-72" />
        <v-divider class="hidden sm:block" vertical />
        <v-divider class="sm:hidden" />
        <div class="flex-1">
          <MarkdownNotesPreview v-model="model" class="min-w-72 px-4" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
</style>
