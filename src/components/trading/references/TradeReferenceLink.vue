<script setup lang="ts">
  import type { ReferenceModel } from './references.types';
  import { computed } from 'vue';

  const model = defineModel<ReferenceModel>();
  const emit = defineEmits(['remove-reference']);

  function openLink (link?: string) {
    if (link)
      window.open(link, '_blank');
  }

  const isUpdateMode = computed(() => !!model.value?.id);

</script>

<template>
  <div class="flex flex-row flex-wrap items-center">
    <v-text-field
      v-if="!isUpdateMode"
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
    <div>
      <v-tooltip v-if="isUpdateMode" location="top" text="Bearbeiten">
        <template #activator="{ props: editTooltip }">
          <v-btn
            v-bind="editTooltip"
            color="secondary"
            icon="mdi-pencil-outline"
            variant="text"
          />
        </template>
      </v-tooltip>
      <v-tooltip v-else location="top" text="Öffnen">
        <template #activator="{ props: openTooltip }">
          <v-btn
            v-bind="openTooltip"
            color="secondary"
            :disabled="!model?.link"
            icon="mdi-open-in-new"
            variant="text"
            @click="openLink(model?.link)"
          />
        </template>
      </v-tooltip>
      <v-tooltip location="top" text="Anmerkungen">
        <template #activator="{ props: notesTooltip }">
          <v-btn
            v-bind="notesTooltip"
            color="secondary"
            icon="mdi-text"
            variant="text"
          />
        </template>
      </v-tooltip>
      <v-tooltip location="top" text="Entfernen">
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
