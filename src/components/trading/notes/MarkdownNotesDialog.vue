<script setup lang="ts">
  import { computed } from 'vue';
  import ViewTitle from '@/components/ViewTitle.vue';
  import { DIALOG_MAX_WIDTH_IN_PX } from '@/constants/app';
  import MarkdownNotes from './MarkdownNotes.vue';

  const notes = defineModel<string | null>('notes');
  const showDialog = defineModel<boolean>('show');
  const props = defineProps<{
    tradeId?: string
    referenceId?: string
  }>();

  const isNewReference = computed(() => !props.referenceId);
  const saveBtnLabel = computed(() => isNewReference.value ? 'Übernehmen' : 'Speichern');

</script>

<template>
  <v-dialog
    v-model="showDialog"
    :max-width="DIALOG_MAX_WIDTH_IN_PX"
    persistent
  >
    <template #default="{ isActive }">

      <v-card>
        <v-card-title class="flex justify-between items-center">
          <ViewTitle text="Anmerkungen" />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          />
        </v-card-title>

        <v-card-text>
          <MarkdownNotes v-model="notes" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="accent"
            text="Abbrechen"
            @click="isActive.value = false"
          />
          <v-btn
            color="primary"
            :text="saveBtnLabel"
            variant="tonal"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
</style>
