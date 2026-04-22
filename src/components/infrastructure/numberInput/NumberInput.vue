<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input';
import { useNumberFormatStore } from '@/stores/useNumberFormatStore';

const model = defineModel<number | undefined | null>();
const props = withDefaults(
  defineProps<{
    label: string;
    min?: number;
    max?: number;
    precision?: number;
    currency?: string;
    showCurrency?: boolean;
    errorMessage?: string;
  }>(),
  {
    min: 0,
    max: 99_999_999,
    precision: 2,
    currency: 'EUR',
    showCurrency: false,
  },
);

const displayValue = ref<string | null>(null);

defineExpose({ increment, decrement });

const numberFormatStore = useNumberFormatStore();
const { inputRef, numberValue, formattedValue, setValue } = useCurrencyInput({
  currency: props.currency,
  autoDecimalDigits: false,
  currencyDisplay: props.showCurrency
    ? CurrencyDisplay.narrowSymbol
    : CurrencyDisplay.hidden,
  locale: numberFormatStore.locale,
  hideGroupingSeparatorOnFocus: false,
  precision: props.precision,
  hideNegligibleDecimalDigitsOnFocus: true,
  valueRange: { min: props.min, max: props.max },
});

watch(numberValue, (value) => {
  model.value = value;
  displayValue.value = formattedValue.value;
});

function increment(step: number, initialStepValue?: number) {
  if (numberValue.value) {
    setValue(numberValue.value + step);
  } else if (initialStepValue) {
    setValue(initialStepValue);
  }
}

function decrement(step: number, initialStepValue?: number) {
  if (numberValue.value) {
    setValue(numberValue.value - step);
  } else if (initialStepValue) {
    setValue(initialStepValue);
  }
}

const isError = computed(() => !!props.errorMessage);
</script>

<template>
  <v-text-field
    ref="inputRef"
    v-model="displayValue"
    class="centered-input"
    :error="isError"
    :error-messages="props.errorMessage"
    :label="props.label"
    rounded
    type="text"
  />
</template>

<style scoped></style>
