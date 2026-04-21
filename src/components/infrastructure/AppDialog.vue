<script setup lang="ts">
import ViewTitle from '@/components/ViewTitle.vue';

export type Width = 'large' | 'medium';

const dialogWidth: Map<Width, number> = new Map([
  ['large', 1024],
  ['medium', 768],
]);

const model = defineModel<boolean>({ default: false });
const emit = defineEmits(['on-cancel']);
const props = defineProps<{
  headerTitle: string;
  headerIcon?: string;
  width: Width;
}>();

function onCancel() {
  emit('on-cancel');
  model.value = false;
}
</script>

<template>
  <v-dialog
    v-model="model"
    :max-width="dialogWidth.get(props.width)"
    persistent
    scrollable
  >
    <template #default>
      <v-card>
        <v-card-title class="flex justify-between items-center">
          <slot name="header">
            <ViewTitle
              :header-title="props.headerTitle"
              :icon="props.headerIcon"
            />

            <v-btn icon="ph:x" variant="text" @click="onCancel" />
          </slot>
        </v-card-title>

        <v-card-text>
          <slot name="content" />
        </v-card-text>

        <v-card-actions>
          <slot name="actions" />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped></style>
