<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const { t } = useI18n();

const items = computed(() => [
  {
    title: t(MessageKeys.locales.de_AT),
    value: 'de-AT',
  },
  {
    title: t(MessageKeys.locales.en_US),
    value: 'en-US',
  },
]);

const model = defineModel<string>();
</script>

<template>
  <BaseSelect
    v-model="model"
    :hint="$t(MessageKeys.settings.regionalFormatHint)"
    :items="items"
    :label="$t(MessageKeys.settings.regionalFormat)"
    :persistent-hint="true"
  ></BaseSelect>
</template>

<style scoped></style>
