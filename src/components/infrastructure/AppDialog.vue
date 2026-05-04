<script setup lang="ts">
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
        <v-card-title class="flex justify-between items-center pt-2.5">
          <slot name="header">
            <div
              class="flex flex-row flex-nowrap justify-between items-center gap-2"
            >
              <h2 class="text-2xl font-light">
                {{ props.headerTitle }}
              </h2>

              <v-icon
                v-if="props.headerIcon"
                class="font-light"
                :icon="props.headerIcon"
                size="small"
              ></v-icon>
            </div>

            <v-btn icon="ph:x" variant="text" @click="onCancel" />
          </slot>
        </v-card-title>

        <v-card-text class="px-0">
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
