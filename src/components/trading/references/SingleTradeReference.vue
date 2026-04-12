<script setup lang="ts">
  import type { ReferenceModel } from './references.types';
  import { computed, ref } from 'vue';

  const model = defineModel<ReferenceModel>({ required: true });
  const props = defineProps<{
    isNewTrade: boolean
  }>();

  const emit = defineEmits(['remove-reference']);

  const isReferenceAlreadyPersisted = computed(() => !props.isNewTrade && model.value?.id);

  const editReferenceEnabled = ref(false);
  const previousReferenceLink = ref<string | null>(null);
  const editReference = computed(() => isReferenceAlreadyPersisted.value && editReferenceEnabled.value);

  function startEditing () {
    editReferenceEnabled.value = true;
    previousReferenceLink.value = model.value?.link ?? null;
  }

  function saveLink () {
    console.log('Save updated link in the backend');
    if (!isReferenceAlreadyPersisted.value)
      model.value.id = 'new id goes here ...';

    editReferenceEnabled.value = false;
  }

  function cancelEdit () {
    editReferenceEnabled.value = false;

    if (previousReferenceLink.value) {
      model.value.link = previousReferenceLink.value;
    }
  }

  function openNotesEditor () {
    console.log('Opening Notes Editor ...');
  }

  const showEditBtn = computed(() => !!isReferenceAlreadyPersisted.value && !editReferenceEnabled.value);
  const showSaveBtn = computed(() => !showEditBtn.value && !props.isNewTrade);
  const showCancelBtn = computed(() => !showEditBtn.value && !!isReferenceAlreadyPersisted.value);
  const showNotesBtn = computed(() => !!isReferenceAlreadyPersisted.value || (props.isNewTrade));
  const showDeleteBtn = computed(() => true);

  const mobileMenuItems = computed(() => [
    ...(showEditBtn.value
      ? [{ title: 'Bearbeiten', prependIcon: 'mdi-pencil-outline', code: 'edit' }]
      : []),
    ...(showNotesBtn.value
      ? [{ title: 'Anmerkungen', prependIcon: 'mdi-text', code: 'notes' }]
      : []),
    { title: 'Löschen', prependIcon: 'mdi-trash-can-outline', code: 'delete' },
  ]);

  const showMobileMenu = ref(false);

  function onMobileMenuItemClick (value: {
    id: unknown
    value: boolean
  }) {
    switch (value.id) {
      case 'edit': {
        startEditing();
        break;
      }
      case 'notes': {
        openNotesEditor();
        break;
      }
      case 'delete': {
        emit('remove-reference');
        break;
      }
    }
  }
</script>

<template>
  <div class="flex flex-row flex-wrap items-center">
    <v-text-field
      v-if="!isReferenceAlreadyPersisted || editReference"
      v-model="model!.link"
      class="pt-4"
      clearable
      label="Link"
      @keyup.enter="saveLink"
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

    <v-btn
      v-if="showEditBtn"
      class="hidden sm:block"
      color="secondary"
      icon="mdi-pencil-outline"
      variant="text"
      @click="startEditing"
    />

    <v-btn
      v-if="showSaveBtn"
      color="secondary"
      icon="mdi-content-save-outline"
      variant="text"
      @click="saveLink"
    />

    <v-btn
      v-if="showCancelBtn"
      color="secondary"
      icon="mdi-close-outline"
      variant="text"
      @click="cancelEdit"
    />

    <v-menu v-model="showMobileMenu" location="bottom end">
      <template #activator="{ props: mobileMenuProps }">
        <v-btn
          class="sm:hidden"
          color="secondary"
          icon="mdi-dots-vertical"
          variant="text"
          v-bind="mobileMenuProps"
        />
      </template>

      <v-list
        class="py-0"
        item-props
        item-value="code"
        :items="mobileMenuItems"
        slim
        @click:select="onMobileMenuItemClick"
      >
        <template #prepend>
          <v-icon size="small" />
        </template>
      </v-list>
    </v-menu>

    <v-btn
      v-if="showNotesBtn"
      class="hidden sm:block"
      color="secondary"
      icon="mdi-text"
      variant="text"
    />

    <v-btn
      v-if="showDeleteBtn"
      class="hidden sm:block"
      color="secondary"
      icon="mdi-trash-can-outline"
      variant="text"
      @click="emit('remove-reference')"
    />

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
