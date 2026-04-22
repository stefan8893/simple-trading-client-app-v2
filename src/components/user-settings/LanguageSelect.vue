<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLocaleOptionsStore } from '@/stores/useLocaleOptionsStore';
import BaseSelect from '../infrastructure/BaseSelect.vue';

const { languageOptions } = storeToRefs(useLocaleOptionsStore());

const model = defineModel<string>();
</script>

<template>
  <BaseSelect
    v-model="model"
    :items="languageOptions"
    :label="$t(MessageKeys.settings.language)"
  ></BaseSelect>
</template>

<style scoped></style>
