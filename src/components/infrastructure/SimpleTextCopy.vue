<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  closeTooltipInMs: {
    type: Number,
    default: 800,
  },
});

let timerHandle: ReturnType<typeof setTimeout> | undefined;
async function copyText() {
  if (!props.text) return;
  if (timerHandle) clearTimeout(timerHandle);

  await navigator.clipboard.writeText(props.text.trim());

  visible.value = true;
  timerHandle = setTimeout(
    () => (visible.value = false),
    props.closeTooltipInMs,
  );
}
</script>

<template>
  <div class="text-copy">
    <v-tooltip
      v-model="visible"
      location="top"
      open-on-click
      :open-on-hover="false"
      target="cursor"
    >
      <template #activator="{ props: activatorProps }">
        <span v-bind="activatorProps" class="cursor-pointer" @click="copyText">
          <slot :text="props.text">{{ props.text }}</slot>
        </span>
      </template>
      <span>Kopiert!</span>
    </v-tooltip>
  </div>
</template>
