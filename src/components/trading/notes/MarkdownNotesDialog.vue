<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import AppDialog from '@/components/infrastructure/AppDialog.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import MarkdownNotes from './MarkdownNotes.vue';

const model = defineModel<string | null>('notes');
const showDialog = defineModel<boolean>('show');
const props = defineProps<{
  tradeId?: string;
  referenceId?: string;
}>();
const emit = defineEmits(['on-notes-dialog-closed']);

function getInitialShowEditorState() {
  return isNewReference.value || !model.value;
}

const internalModel = ref(model.value);
const isNewReference = computed(() => !props.referenceId);
const showEditor = ref(getInitialShowEditorState());
const isDirty = computed(() => model.value !== internalModel.value);

const showCancelBtn = computed(() => showEditor.value);
const showCloseBtn = computed(() => !showCancelBtn.value);
const showEditBtn = computed(() => !showEditor.value && !isNewReference.value);
const showApplyBtn = computed(() => isNewReference.value && showEditor.value);
const showSaveBtn = computed(() => !showApplyBtn.value && !showEditBtn.value);
const isSaveBtnEnabled = computed(() => isDirty.value);

watch(model, () => {
  if (model.value !== internalModel.value) internalModel.value = model.value;
});

function cancel() {
  const justLeaveEditorButKeepDialogOpen = () => {
    internalModel.value = model.value;
    showEditor.value = false;
  };

  const discardNewNote = !isDirty.value && !model.value;
  const discardUpdate = isDirty.value && !model.value && internalModel.value;

  if (discardNewNote) {
    close();
  } else if (discardUpdate) {
    close();
  } else if (isNewReference.value) {
    close();
  } else {
    justLeaveEditorButKeepDialogOpen();
  }
}

function close() {
  internalModel.value = model.value;
  showDialog.value = false;
  emit('on-notes-dialog-closed');
  setTimeout(() => {
    showEditor.value = getInitialShowEditorState();
  }, 200);
}

function save() {
  console.log('save new note in backend');
  model.value = internalModel.value;
  showEditor.value = false;
}

function apply() {
  model.value = internalModel.value;
  close();
}

function edit() {
  showEditor.value = true;
}
</script>

<template>
  <AppDialog
    v-model="showDialog"
    :header-icon="showEditor ? 'ph:pencil-simple' : ''"
    :header-title="$t(MessageKeys.trading.note)"
    width="medium"
    @on-cancel="close"
  >
    <template #content>
      <MarkdownNotes v-model="internalModel" :show-editor="showEditor" />
    </template>

    <template #actions>
      <div>
        <v-btn
          v-if="showCancelBtn"
          color="accent"
          :text="$t(MessageKeys.cancel)"
          variant="text"
          @click="cancel"
        />
        <v-btn
          v-if="showCloseBtn"
          color="accent"
          :text="$t(MessageKeys.close)"
          variant="text"
          @click="close"
        />
        <v-btn
          v-if="showSaveBtn"
          class="ml-4"
          color="primary"
          :disabled="!isSaveBtnEnabled"
          :text="$t(MessageKeys.save)"
          @click="save"
        />
        <v-btn
          v-if="showApplyBtn"
          class="ml-4"
          color="secondary"
          :text="$t(MessageKeys.apply)"
          @click="apply"
        />
        <v-btn
          v-if="showEditBtn"
          class="ml-4"
          color="secondary"
          :text="$t(MessageKeys.edit)"
          @click="edit"
        />
      </div>
    </template>
  </AppDialog>
</template>

<style scoped></style>
