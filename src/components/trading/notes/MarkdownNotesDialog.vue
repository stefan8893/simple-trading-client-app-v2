<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import ViewTitle from '@/components/ViewTitle.vue';
  import { DIALOG_MAX_WIDTH_IN_PX } from '@/constants/app';
  import MarkdownNotes from './MarkdownNotes.vue';

  const model = defineModel<string | null>('notes');
  const showDialog = defineModel<boolean>('show');
  const props = defineProps<{
    tradeId?: string
    referenceId?: string
  }>();

  const internalModel = ref(model.value);

  const isNewReference = computed(() => !props.referenceId);
  const saveBtnLabel = computed(() => isNewReference.value ? 'Übernehmen' : 'Speichern');

  watch(model, () => {
    if (model.value !== internalModel.value)
      internalModel.value = model.value;
  });

  function cancel () {
    internalModel.value = model.value;
    showDialog.value = false;
  }

  function save () {
    console.log('save new note in backend');
    model.value = internalModel.value;
    showDialog.value = false;
  }
</script>

<template>
  <v-dialog
    v-model="showDialog"
    :max-width="DIALOG_MAX_WIDTH_IN_PX"
    persistent
    scrollable
  >
    <template #default>

      <v-card>
        <v-card-title class="flex justify-between items-center">
          <ViewTitle text="Anmerkung" />

          <v-btn
            icon="mdi-close"
            variant="text"
            @click="cancel"
          />
        </v-card-title>

        <v-card-text>
          <MarkdownNotes v-model="internalModel" />
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="accent"
            text="Abbrechen"
            @click="cancel"
          />
          <v-btn
            color="primary"
            :text="saveBtnLabel"
            variant="tonal"
            @click="save"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
</style>
