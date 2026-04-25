<script setup lang="ts">
import { MessageKeys } from '@/i18n/language/message-keys.g';

const props = defineProps<{
  showResetOrderEntry: boolean;
}>();

const emit = defineEmits(['reset-apps-order']);

const editMode = defineModel<boolean>('editMode');
</script>

<template>
  <v-list nav>
    <v-list-item value="1" @click="editMode = true">
      <v-list-item-title>{{ $t(MessageKeys.arrangeApps) }}</v-list-item-title>
    </v-list-item>
    <v-list-item
      v-if="props.showResetOrderEntry"
      value="2"
      @click="emit('reset-apps-order', true)"
    >
      <v-list-item-title>{{ $t(MessageKeys.resetOrder) }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style scoped></style>
