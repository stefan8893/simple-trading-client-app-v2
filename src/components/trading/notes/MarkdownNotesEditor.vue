<script setup lang="ts">
  import { ref, useTemplateRef, watch } from 'vue';

  const model = defineModel<string | null>();
  const editor = useTemplateRef('editor');

  const history = ref([model.value]);
  const historyIndex = ref(0);
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

    setTimeout(() => {
      textarea.selectionStart = start + leadingChars.length;
      textarea.selectionEnd = end + leadingChars.length;
    }, 0);
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
    } else if ((e.metaKey || e.ctrlKey) && (redoHotkeyMac || redoHotkeyWindowsLinux)) {
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

  function saveToHistory () {
    // remove all future states if something new happens
    history.value = history.value.slice(0, historyIndex.value + 1);

    history.value.push(model.value);
    historyIndex.value++;
  }

  function undo () {
    if (historyIndex.value > 0) {
      historyIndex.value--;
      model.value = history.value[historyIndex.value];
    }
  }

  function redo () {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++;
      model.value = history.value[historyIndex.value];
    }
  }

  watch(model, (newValue: string | null | undefined) => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      if (history.value[historyIndex.value] !== newValue) {
        saveToHistory();
      }
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
