<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLocaleOptionsStore } from '@/stores/i18n/useLocaleOptionsStore';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const { regionalFormatOptions } = storeToRefs(useLocaleOptionsStore());

const model = defineModel<string>();
</script>

<template>
  <BaseSelect
    v-model="model"
    :items="regionalFormatOptions"
    :label="$t(MessageKeys.settings.regionalFormat)"
  ></BaseSelect>
</template>

<style scoped></style>
