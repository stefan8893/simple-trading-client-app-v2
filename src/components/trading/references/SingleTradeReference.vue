<script setup lang="ts">
import type { ReferenceModel } from './references.types';
import { computed, nextTick, onMounted, ref, useTemplateRef } from 'vue';
import MarkdownNotesDialog from '../notes/MarkdownNotesDialog.vue';

const model = defineModel<ReferenceModel>({ required: true });
const props = defineProps<{
  tradeId?: string;
}>();

const showNotesEditor = ref(false);

const emit = defineEmits(['remove-reference', 'highlight']);
const referenceInput = useTemplateRef('reference-input');

const isNewTrade = computed(() => !props.tradeId);
const isReferenceAlreadyPersisted = computed(
  () => !isNewTrade.value && !!model.value?.id,
);

const editReferenceEnabled = ref(false);
const previousReferenceLink = ref<string | null>(null);
const editReference = computed(
  () => isReferenceAlreadyPersisted.value && editReferenceEnabled.value,
);

function startEditing() {
  editReferenceEnabled.value = true;
  previousReferenceLink.value = model.value?.link ?? null;
}

function saveLink() {
  console.log('Save updated link in the backend');
  if (!isReferenceAlreadyPersisted.value)
    model.value.id = 'new id goes here ...';

  editReferenceEnabled.value = false;
}

function cancelEdit() {
  editReferenceEnabled.value = false;

  if (previousReferenceLink.value) {
    model.value.link = previousReferenceLink.value;
  }
}

function openNotesEditor() {
  showNotesEditor.value = true;
}

const showEditBtn = computed(
  () => !!isReferenceAlreadyPersisted.value && !editReferenceEnabled.value,
);
const showSaveBtn = computed(() => !showEditBtn.value && !isNewTrade.value);
const showCancelBtn = computed(
  () => !showEditBtn.value && !!isReferenceAlreadyPersisted.value,
);
const showNotesBtn = computed(
  () => !!isReferenceAlreadyPersisted.value || isNewTrade.value,
);
const showDeleteBtn = computed(() => true);

const showMobileMenu = ref(false);

onMounted(async () => {
  await nextTick();
  referenceInput.value?.focus();
});
</script>

<template>
  <div class="flex flex-row flex-wrap items-center grow shrink min-w-0">
    <v-text-field
      v-if="!isReferenceAlreadyPersisted || editReference"
      ref="reference-input"
      v-model="model!.link"
      class="pt-4"
      clearable
      label="Link"
      @keydown.esc.prevent="referenceInput?.blur()"
      @keyup.enter="saveLink"
    />
    <div v-else class="flex-1 truncate">
      <a
        class="underline"
        color="primary"
        :href="model!.link"
        rel="noopener noreferrer"
        target="_blank"
        :title="model!.link"
      >
        {{ model?.link }}
      </a>
    </div>

    <v-btn
      v-if="showEditBtn"
      class="hidden sm:block"
      color="primary"
      icon="mdi-pencil-outline"
      variant="text"
      @click="startEditing"
    />

    <v-btn
      v-if="showSaveBtn"
      color="primary"
      icon="mdi-content-save-outline"
      variant="text"
      @click="saveLink"
    />

    <v-btn
      v-if="showCancelBtn"
      color="primary"
      icon="mdi-close-outline"
      variant="text"
      @click="cancelEdit"
    />

    <v-menu v-model="showMobileMenu" location="bottom end">
      <template #activator="{ props: mobileMenuProps }">
        <v-btn
          class="sm:hidden"
          color="primary"
          icon="mdi-dots-vertical"
          variant="text"
          v-bind="mobileMenuProps"
        />
      </template>

      <v-list class="py-0" item-props slim>
        <v-list-item
          v-if="showEditBtn"
          prepend-icon="mdi-pencil-outline"
          title="Bearbeiten"
          @click="startEditing"
        >
          <template #prepend>
            <v-icon color="primary" size="small" />
          </template>
        </v-list-item>

        <v-list-item
          v-if="showNotesBtn"
          prepend-icon="mdi-text"
          title="Anmerkung"
          @click="openNotesEditor"
        >
          <template #prepend>
            <v-badge
              color="secondary"
              dot
              location="top right"
              :model-value="!!model.notes"
            >
              <v-icon color="primary" size="small" />
            </v-badge>
          </template>
        </v-list-item>

        <v-list-item
          prepend-icon="mdi-trash-can-outline"
          title="Löschen"
          @click="emit('remove-reference')"
        >
          <template #prepend>
            <v-icon color="primary" size="small" />
          </template>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-badge
      class="hidden sm:block"
      color="secondary"
      dot
      location="top right"
      :model-value="!!model.notes"
    >
      <v-btn
        v-if="showNotesBtn"
        class="hidden sm:block"
        color="primary"
        icon="mdi-text"
        variant="text"
        @click="showNotesEditor = true"
      />
    </v-badge>

    <v-btn
      v-if="showDeleteBtn"
      class="hidden sm:block"
      color="primary"
      icon="mdi-trash-can-outline"
      variant="text"
      @click="emit('remove-reference')"
    />

    <MarkdownNotesDialog
      v-model:notes="model.notes"
      v-model:show="showNotesEditor"
      :reference-id="model.id"
      :trade-id="props.tradeId"
      @on-notes-dialog-closed="emit('highlight')"
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
