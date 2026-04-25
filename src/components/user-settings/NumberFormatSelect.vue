<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLocaleOptionsStore } from '@/stores/i18n/useLocaleOptionsStore';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const { numberFormatOptions } = storeToRefs(useLocaleOptionsStore());

const model = defineModel<string>();
</script>

<template>
  <BaseSelect
    v-model="model"
    item-title="title"
    item-value="value"
    :items="numberFormatOptions"
    :label="$t(MessageKeys.settings.numberFormat)"
  ></BaseSelect>
</template>

<style scoped></style>
