<script setup lang="ts">
  import { useManualRefHistory } from '@vueuse/core';
  import { nextTick, useTemplateRef, watch } from 'vue';

  const model = defineModel<string | null>();
  const editor = useTemplateRef('editor');
  const { history, commit, undo, redo } = useManualRefHistory(model, { capacity: 50 });

  let saveTimeout: number | undefined;

  function surroundSelectionWith (leadingChars: string, trailingChars: string) {
    if (!model.value)
      return;

    const textarea = editor.value?.$el.querySelector('textarea');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = model.value.slice(start, end);

    if (!selectedText)
      return;

    model.value = model.value.slice(0, Math.max(0, start))
      + leadingChars + selectedText + trailingChars
      + model.value.slice(Math.max(0, end));

    nextTick(() => {
      textarea.selectionStart = start + leadingChars.length;
      textarea.selectionEnd = end + leadingChars.length;
    });
  }

  function formatSelectionBold () {
    surroundSelectionWith('**', '**');
  }

  function formatSelectionItalic () {
    surroundSelectionWith('*', '*');
  }

  function formatSelectionUnderscore () {
    surroundSelectionWith('<u>', '</u>');
  }

  function handleKeydown (e: KeyboardEvent) {
    const undoHotkey = e.key === 'z' && !e.shiftKey;
    const redoHotkeyMac = e.key === 'z' && e.shiftKey;
    const redoHotkeyWindowsLinux = e.key === 'y' && !e.shiftKey;

    if ((e.metaKey || e.ctrlKey) && undoHotkey) {
      e.preventDefault();
      undo();
    } else if ((e.metaKey && redoHotkeyMac) || (e.ctrlKey && redoHotkeyWindowsLinux)) {
      e.preventDefault();
      redo();
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

  watch(model, (newValue: string | null | undefined) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const latestHistoryEntry = history.value.at(0);
      if (latestHistoryEntry && latestHistoryEntry.snapshot !== newValue)
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
      class="font-mono min-h-60"
      counter
      flat
      :placeholder="`Enter Notes here ...\nHint:Use Markdown`"
      rounded="xl"
      variant="solo"
      @keydown="handleKeydown"
    />
  </div>
</template>

<style scoped>
</style>
