<script setup lang="ts">
import { computed } from 'vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatNumber } from '@/i18n/numbers/number-formatter';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const titleNumber = 1234.56;
const items = computed(() => [
  {
    title: formatNumber(titleNumber, undefined, 'de-AT'),
    value: 'de-AT',
  },
  {
    title: formatNumber(titleNumber, undefined, 'en-US'),
    value: 'en-US',
  },
]);

const model = defineModel<string>();
</script>

<template>
  <BaseSelect
    v-model="model"
    :items="items"
    :label="$t(MessageKeys.settings.numberFormat)"
  ></BaseSelect>
</template>

<style scoped></style>
