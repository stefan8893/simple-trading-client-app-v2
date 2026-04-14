<script setup lang="ts">
  import DOMPurify from 'dompurify';
  import MarkdownIt from 'markdown-it';
  import TaskLists from 'markdown-it-task-lists';
  import { computed } from 'vue';

  const model = defineModel<string | null>();

  const markdownEngine = new MarkdownIt({
    html: true,
    linkify: false,
    typographer: true,
    breaks: true,
  })
    .use(TaskLists)
    .disable(['link', 'image'])
  ;

  function renderMarkdown (text: string): string {
    const rawHtml = markdownEngine.render(text);
    return DOMPurify.sanitize(rawHtml, {
      ALLOWED_TAGS: ['span', 'b', 'i', 'u', 'strong', 's',
                     'em', 'ul', 'ol', 'li', 'p', 'h1',
                     'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'br', 'input', 'label'],
      ALLOWED_ATTR: ['style', 'class', 'id', 'disabled', 'checked', 'type'],
      FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],
      FORBID_ATTR: ['onerror', 'onclick', 'onmouseover', 'onload', 'srcdoc'],
    });
  }

  const markdown = computed(() => renderMarkdown(model.value ?? ''));
</script>

<template>
  <div class="markdown-content" v-html="markdown" />
</template>

<style>
.markdown-content {
  line-height: 1.6;
  font-size: 1rem;
  color: inherit;
  font-family: inherit;
}

.markdown-content p {
  margin: 0.5em 0;
}

.markdown-content h1 {
  font-size: 2rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content h2 {
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content h4 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content h5 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content h6 {
  font-size: 1rem;
  font-weight: 600;
  margin: 0.5em 0 0.5em;
  color: inherit;
}

.markdown-content strong {
  font-weight: 600;
}

.markdown-content em {
  font-style: italic;
}

.markdown-content ul {
  list-style-type: disc;
  margin: 0.5em 0;
  padding-left: 2em;
}

.markdown-content ol {
  list-style-type: decimal;
  margin: 0.5em 0;
  padding-left: 2em;
}

.markdown-content li {
  margin: 0.25em 0;
}

.markdown-content blockquote {
  border-left: 3px solid #e2e8f0;
  padding-left: 1em;
  margin: 0.5em 0;
  color: #6b7280;
  font-style: italic;
}

.markdown-content pre {
  background-color: #f3f4f6;
  padding: 1em;
  border-radius: 0.25rem;
  overflow-x: auto;
  margin: 0.5em 0;
}

.markdown-content code {
  font-family: "JetBrains Mono", monospace;
  background-color:rgb(var(--v-theme-surface-light));
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
  font-size: 0.875rem;
}

.markdown-content ul.contains-task-list {
  list-style-type: none;
  padding-left: 0;
}

.markdown-content .task-list-item {
  display: flex;
  align-items: center;
  margin: 0.25em 0;
  padding: 0.25em 0;
}

.markdown-content .task-list-item input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.75em;
  border: 2px solid #BDBDBD;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s, border-color 0.2s;
}

.markdown-content .task-list-item input[type="checkbox"]:checked {
  background-color: rgb(var(--v-theme-primary));
  border-color: rgb(var(--v-theme-primary));
}

.markdown-content .task-list-item input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 0.8em;
  font-weight: bold;
}

.markdown-content .task-list-item input[type="checkbox"]:hover {
  border-color: #6b7280;
}
</style>
