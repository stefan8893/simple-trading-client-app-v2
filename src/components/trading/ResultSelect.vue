<script setup lang="ts">
import type { ResultDto } from '@stefan8893/simple-trading-client';
import { watch } from 'vue';
import { type MessageKey, MessageKeys } from '@/i18n/language/message-keys.g';
import BaseSelect, {
  type BaseSelectItem,
} from '../infrastructure/BaseSelect.vue';

type ResultSelectItem = {
  title: MessageKey;
  value: ResultDto | null;
};

const model = defineModel<string | null>({ default: undefined });

const items = [
  {
    title: MessageKeys.trading.results.determineAutomatically,
    value: null,
  },
  {
    title: MessageKeys.trading.results.win,
    value: 'Win',
  },
  {
    title: MessageKeys.trading.results.mediocre,
    value: 'Mediocre',
  },
  {
    title: MessageKeys.trading.results.breakEven,
    value: 'BreakEven',
  },
  {
    title: MessageKeys.trading.results.loss,
    value: 'Loss',
  },
] satisfies ResultSelectItem[] & BaseSelectItem[];

watch(model, () => {
  console.log('result changed', model.value);
});
</script>

<template>
  <BaseSelect
    v-model="model"
    :item-title="(item: BaseSelectItem) => $t(item.title)"
    :items="items"
    :label="$t(MessageKeys.trading.results.result)"
  />
</template>

<style scoped></style>
