<script setup lang="ts">
import { useTemplateRef } from 'vue';
import NumberInput from '@/components/infrastructure/numberInput/NumberInput.vue';

defineOptions({ inheritAttrs: true });

const model = defineModel<number | undefined | null>();
const props = withDefaults(
  defineProps<{
    label: string;
    initialStepperValue?: number;
    step?: number;
    min?: number;
    max?: number;
    precision?: number;
    currency?: string;
    showCurrency?: boolean;
    errorMessage?: string;
  }>(),
  {
    step: 1,
    min: 0,
    max: 99_999_999,
    precision: 2,
    currency: 'EUR',
    showCurrency: false,
  },
);

const numberInput = useTemplateRef('number-input');

function increment() {
  numberInput.value?.increment(props.step, props.initialStepperValue);
}
function decrement() {
  numberInput.value?.decrement(props.step, props.initialStepperValue);
}
</script>

<template>
  <div class="flex flex-row flex-nowrap items-center gap-x-4">
    <div>
      <v-btn
        class="flex flex-col flex-nowrap justify-center"
        icon="ph:minus"
        @click="decrement"
      />
    </div>

    <NumberInput
      ref="number-input"
      v-model="model"
      :currency="props.currency"
      :error-message="props.errorMessage"
      :label="props.label"
      :max="props.max"
      :min="props.min"
      :precision="props.precision"
      :show-currency="props.showCurrency"
    />

    <div class="flex flex-col flex-nowrap justify-center">
      <v-btn icon="ph:plus" @click="increment" />
    </div>
  </div>
</template>

<style scoped></style>
