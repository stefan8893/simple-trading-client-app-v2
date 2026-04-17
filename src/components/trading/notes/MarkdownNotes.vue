<script setup lang="ts">
import MarkdownNotesEditor from './MarkdownNotesEditor.vue';
import MarkdownNotesPreview from './MarkdownNotesPreview.vue';

const model = defineModel<string | null>();
const props = defineProps<{
  showEditor: boolean;
}>();
</script>

<template>
  <v-card elevation="0" rounded="0">
    <v-card-text class="p-0">
      <div class="flex flex-col sm:flex-row flex-wrap gap-4">
        <MarkdownNotesEditor
          v-if="props.showEditor"
          v-model="model"
          class="flex-1 min-w-40"
        />
        <div class="flex-1">
          <MarkdownNotesPreview v-model="model" class="min-w-40" />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
