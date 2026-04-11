<script setup lang="ts">
  import type { ReferenceModel } from './references.types';
  import { computed, ref } from 'vue';

  const model = defineModel<ReferenceModel>();
  const props = defineProps<{
    isNewTrade: boolean
  }>();

  const emit = defineEmits(['remove-reference']);

  const isReferenceAlreadyPersisted = computed(() => !props.isNewTrade && model.value?.id);

  const editReferenceEnabled = ref(false);
  const editReference = computed(() => isReferenceAlreadyPersisted.value && editReferenceEnabled.value);

  function saveLink () {
    console.log('Save updated link in the backend');
    if (!isReferenceAlreadyPersisted.value && model.value)
      model.value.id = 'FooBar';

    editReferenceEnabled.value = false;
  }

  const showEditBtn = computed(() => isReferenceAlreadyPersisted.value && !editReferenceEnabled.value);
  const showSaveBtn = computed(() => !showEditBtn.value && !props.isNewTrade);
  const showCancelBtn = computed(() => !showEditBtn.value && isReferenceAlreadyPersisted.value);
  const showNotesBtn = computed(() => isReferenceAlreadyPersisted.value || (props.isNewTrade));
  const showDeleteBtn = computed(() => true);

</script>

<template>
  <div class="flex flex-row flex-wrap items-center">
    <v-text-field
      v-if="!isReferenceAlreadyPersisted || editReference"
      v-model="model!.link"
      class="pt-2"
      clearable
      label="Link"
    />
    <div v-else class="flex flex-row flex-wrap items-center shrink grow">
      <a
        class="underline"
        color="primary"
        :href="model!.link"
        rel="noopener noreferrer"
        target="_blank"
      >
        {{ model?.link }}
      </a>
    </div>
    <v-tooltip v-if="showEditBtn" location="top" text="Bearbeiten">
      <template #activator="{ props: editTooltip }">
        <v-btn
          v-bind="editTooltip"
          color="secondary"
          icon="mdi-pencil-outline"
          variant="text"
          @click="editReferenceEnabled = true"
        />
      </template>
    </v-tooltip>
    <v-tooltip v-if="showSaveBtn" location="top" text="Speichern">
      <template #activator="{ props: editTooltip }">
        <v-btn
          v-bind="editTooltip"
          color="secondary"
          icon="mdi-content-save-outline"
          variant="text"
          @click="saveLink"
        />
      </template>
    </v-tooltip>
    <v-tooltip v-if="showCancelBtn" location="top" text="Abbrechen">
      <template #activator="{ props: editTooltip }">
        <v-btn
          v-bind="editTooltip"
          color="secondary"
          icon="mdi-close-outline"
          variant="text"
          @click="editReferenceEnabled = false"
        />
      </template>
    </v-tooltip>

    <v-tooltip v-if="showNotesBtn" location="top" text="Anmerkungen">
      <template #activator="{ props: notesTooltip }">
        <v-btn
          v-bind="notesTooltip"
          color="secondary"
          icon="mdi-text"
          variant="text"
        />
      </template>
    </v-tooltip>
    <v-tooltip v-if="showDeleteBtn" location="top" text="Entfernen">
      <template #activator="{ props: removeTooltip }">
        <v-btn
          v-bind="removeTooltip"
          color="secondary"
          icon="mdi-delete-outline"
          variant="text"
          @click="emit('remove-reference')"
        />
      </template>
    </v-tooltip>

  </div>
</template>

<style scoped>
  .sortable-reference-ghost button {
    color: transparent;
  }
  .sortable-reference-ghost i {
    color: transparent;
  }
</style>
