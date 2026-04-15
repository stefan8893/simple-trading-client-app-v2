<script setup lang="ts">
  import { useEventListener } from '@vueuse/core';
  import { useTemplateRef } from 'vue';

  const model = defineModel<string | null>();
  const editor = useTemplateRef('editor');

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

  useEventListener(window, 'keydown', (e: KeyboardEvent) => {
    if (!editor.value?.focused)
      return;

    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      formatSelectionBold();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      formatSelectionItalic();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
      formatSelectionUnderscore();
    }
  });

  function formatSelectionBold () {
    surroundSelectionWith('**', '**');
  }

  function formatSelectionItalic () {
    surroundSelectionWith('*', '*');
  }

  function formatSelectionUnderscore () {
    surroundSelectionWith('<u>', '</u>');
  }
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
    />
  </div>
</template>

<style scoped>
</style>
