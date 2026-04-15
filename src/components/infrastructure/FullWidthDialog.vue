<script setup lang="ts">
  import ViewTitle from '@/components/ViewTitle.vue';
  import { DIALOG_MAX_WIDTH_IN_PX } from '@/constants/app';

  const model = defineModel<boolean>({ default: false });
  const emit = defineEmits(['on-cancel']);
  const props = defineProps<{
    heading: string
  }>();

  function onCancel () {
    emit('on-cancel');
    model.value = false;
  }

</script>

<template>
  <v-dialog
    v-model="model"
    :max-width="DIALOG_MAX_WIDTH_IN_PX"
    persistent
    scrollable
  >
    <template #default>

      <v-card>
        <v-card-title class="flex justify-between items-center">
          <slot name="header">
            <ViewTitle :heading="props.heading" />

            <v-btn
              icon="mdi-close"
              variant="text"
              @click="onCancel"
            />
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

<style scoped>
</style>
