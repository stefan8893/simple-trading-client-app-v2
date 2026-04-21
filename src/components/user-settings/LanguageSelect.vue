<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const { t } = useI18n();

const items = computed(() => [
  {
    title: t(MessageKeys.german),
    value: 'de',
  },
  {
    title: t(MessageKeys.english),
    value: 'en',
  },
]);

const model = defineModel<string>();
</script>

<template>
  <BaseSelect v-model="model" :items="items"></BaseSelect>
</template>

<style scoped></style>
