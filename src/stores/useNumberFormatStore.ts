import type { SupportedRegionalFormatLocale } from '@/i18n/regionalFormat/regional-format-locales';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, readonly, ref, type Ref, watch } from 'vue';
import {
  type NumberFormatOption,
  useLocaleOptionsStore,
} from './useLocaleOptionsStore';

export type NumberFormat = {
  fingerprint: string;
  baseLocale: SupportedRegionalFormatLocale;
};

export const defaultNumberFormat = 'g:.|d:,';
const numberFormatInLocalStorage = useLocalStorage<string | undefined>(
  'numberFormat',
  undefined,
);

export const useNumberFormatStore = defineStore('numberFormat', () => {
  const { numberFormatOptions } = useLocaleOptionsStore();
  const fingerprint: Ref<string> = ref(
    getInitialFingerprint(numberFormatOptions),
  );

  const baseLocale = computed(
    () =>
      numberFormatOptions.find((x) => x.value === fingerprint.value)
        ?.baseLocale ?? 'de-AT',
  );

  watch(
    fingerprint,
    (newValue) => {
      numberFormatInLocalStorage.value = newValue;
    },
    { immediate: true },
  );

  function update(newFingerprint: string) {
    const newNumberFormat = numberFormatOptions.find(
      (x) => x.value === newFingerprint,
    );

    if (!newNumberFormat) return;

    fingerprint.value = newFingerprint;
  }

  return {
    fingerprint: readonly(fingerprint),
    baseLocale,
    update,
  };
});

function getInitialFingerprint(
  numberFormatOptions: NumberFormatOption[],
): string {
  if (numberFormatInLocalStorage.value) {
    return numberFormatInLocalStorage.value;
  }

  const browserLocale = new Intl.Locale(navigator.language).baseName;

  const supportedLocale = numberFormatOptions.find((x) =>
    (x.locales as string[]).includes(browserLocale),
  );

  return supportedLocale ? supportedLocale.value : defaultNumberFormat;
}
