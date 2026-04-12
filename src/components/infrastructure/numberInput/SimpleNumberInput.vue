<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { CurrencyDisplay, useCurrencyInput } from 'vue-currency-input';

  const model = defineModel<number | undefined | null>();
  const props = withDefaults(defineProps<{
    label: string
    min?: number
    max?: number
    precision?: number
    currency?: string
    showCurrency?: boolean
    errorMessage?: string
  }>(), {
    min: 0,
    max: 99_999_999,
    precision: 2,
    currency: 'EUR',
    showCurrency: false,
  });

  const displayValue = ref<string | null>(null);

  // Declare emitted events to avoid Vue warnings.
  // - 'change' is emitted by Vuetify's v-text-field internally (e.g., on stepper button clicks or input changes).
  //   While I don't explicitly emit it, declaring it silences Vue's warning about undeclared events.
  defineEmits([
    'change',
  ]);

  defineExpose({ increment, decrement });

  const { inputRef, numberValue, formattedValue, setValue } = useCurrencyInput({
    currency: props.currency,
    autoDecimalDigits: false,
    currencyDisplay: props.showCurrency ? CurrencyDisplay.symbol : CurrencyDisplay.hidden,
    locale: 'de-AT',
    hideGroupingSeparatorOnFocus: false,
    precision: props.precision,
    hideNegligibleDecimalDigitsOnFocus: true,
    valueRange: { min: props.min, max: props.max },
  });

  watch(numberValue, value => {
    model.value = value;
    displayValue.value = formattedValue.value;
  });

  function increment (step: number, initialStepValue?: number) {
    if (numberValue.value) {
      setValue(numberValue.value + step);
    } else if (initialStepValue) {
      setValue(initialStepValue);
    }
  }

  function decrement (step: number, initialStepValue?: number) {
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

<style scoped>
</style>
