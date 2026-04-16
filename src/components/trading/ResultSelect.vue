<script setup lang="ts">
import type { ResultDto } from '@stefan8893/simple-trading-client';
import { watch } from 'vue';
import SimpleSelect, {
  type SimpleSelectItem,
} from '../infrastructure/SimpleSelect.vue';

type ResultSelectItem = {
  title: string;
  value: ResultDto | null;
};

const model = defineModel<string | null>({ default: undefined });

const items = [
  {
    title: 'Automatisch ermitteln',
    value: null,
  },
  {
    title: 'Gewinn',
    value: 'Win',
  },
  {
    title: 'Mittelmäßig',
    value: 'Mediocre',
  },
  {
    title: 'Kostendeckend',
    value: 'BreakEven',
  },
  {
    title: 'Verlust',
    value: 'Loss',
  },
] satisfies ResultSelectItem[] & SimpleSelectItem[];

watch(model, () => {
  console.log('result changed', model.value);
});
</script>

<template>
  <SimpleSelect v-model="model" :items="items" label="Ergebnis" />
</template>

<style scoped></style>
