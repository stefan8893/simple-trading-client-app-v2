<script setup lang="ts">
import { useManualRefHistory } from '@vueuse/core';
import { nextTick, ref, useTemplateRef, watch } from 'vue';

const model = defineModel<string | null>();
const editor = useTemplateRef('editor');
const { commit, undo, redo } = useManualRefHistory(model, { capacity: 50 });

let saveTimeoutHandle: number | undefined;
const redoOrUndoIsInProgress = ref(false);

async function surroundSelectionWith(
  leadingChars: string,
  trailingChars: string,
) {
  if (!model.value) return;

  const textarea = editor.value?.$el.querySelector('textarea');
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selectedText = model.value.slice(start, end);

  if (!selectedText) return;

  model.value =
    model.value.slice(0, Math.max(0, start)) +
    leadingChars +
    selectedText +
    trailingChars +
    model.value.slice(Math.max(0, end));

  await nextTick();
  textarea.selectionStart = start + leadingChars.length;
  textarea.selectionEnd = end + leadingChars.length;
}

function formatSelectionBold() {
  surroundSelectionWith('**', '**');
}

function formatSelectionItalic() {
  surroundSelectionWith('*', '*');
}

function formatSelectionUnderscore() {
  surroundSelectionWith('<u>', '</u>');
}

async function travelCommandHistory(command: 'redo' | 'undo') {
  redoOrUndoIsInProgress.value = true;

  if (command === 'redo') {
    redo();
  } else {
    undo();
  }
  await nextTick();

  redoOrUndoIsInProgress.value = false;
}

async function handleKeydown(e: KeyboardEvent) {
  const undoHotkey = e.key === 'z' && !e.shiftKey;
  const redoHotkeyMac = e.key === 'z' && e.shiftKey;
  const redoHotkeyWindowsLinux = e.key === 'y' && !e.shiftKey;

  if ((e.metaKey || e.ctrlKey) && undoHotkey) {
    e.preventDefault();
    await travelCommandHistory('undo');
  } else if (
    (e.metaKey && redoHotkeyMac) ||
    (e.ctrlKey && redoHotkeyWindowsLinux)
  ) {
    e.preventDefault();
    await travelCommandHistory('redo');
  } else if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
    e.preventDefault();
    formatSelectionBold();
  } else if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
    e.preventDefault();
    formatSelectionItalic();
  } else if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
    e.preventDefault();
    formatSelectionUnderscore();
  }
}

watch(model, () => {
  if (redoOrUndoIsInProgress.value) return;

  clearTimeout(saveTimeoutHandle);
  saveTimeoutHandle = setTimeout(() => {
    commit();
  }, 500);
});
</script>

<template>
  <div>
    <v-textarea
      ref="editor"
      v-model="model"
      auto-grow
      class="font-mono min-h-60 min-w-32 w-auto"
      clearable
      counter
      flat
      :placeholder="`Enter Notes here ...\nHint:Use Markdown`"
      rounded="xl"
      variant="solo"
      @keydown="handleKeydown"
    />
  </div>
</template>

<style scoped></style>
