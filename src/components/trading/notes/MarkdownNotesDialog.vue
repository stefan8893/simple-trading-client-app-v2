<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import FullWidthDialog from '@/components/infrastructure/FullWidthDialog.vue';
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
  <FullWidthDialog
    v-model="showDialog"
    heading="Anmerkung"
    @on-cancel="cancel"
  >
    <template #content>
      <MarkdownNotes v-model="internalModel" />
    </template>

    <template #actions>
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
    </template>

  </FullWidthDialog>
</template>

<style scoped>
</style>
