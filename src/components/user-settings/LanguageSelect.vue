<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import BaseSelect, {
  type BaseSelectItem,
} from '../infrastructure/BaseSelect.vue';

const { t } = useI18n();

const items = [
  {
    title: t(MessageKeys.german),
    value: 'de',
  },
  {
    title: t(MessageKeys.english),
    value: 'en',
  },
] as const satisfies BaseSelectItem[];

const model = defineModel<string>();
</script>

<template>
  <BaseSelect v-model="model" :items="items"></BaseSelect>
</template>

<style scoped></style>
