import type { NumberFormatOption } from '@/composables/useNumberFormatOptions';
import type { SupportedRegionalFormatLocale } from '@/i18n/regionalFormat/regional-format-locales';
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed, readonly, ref, type Ref, watch } from 'vue';
import { useLocaleOptionsStore } from './useLocaleOptionsStore';

export type NumberFormat = {
  fingerprint: string;
  baseLocale: SupportedRegionalFormatLocale;
};

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
        ?.baseLocale ??
      // fallback
      numberFormatOptions[0].baseLocale,
  );

  const countryFlags = computed(
    () =>
      numberFormatOptions.find((x) => x.value === fingerprint.value)
        ?.countryFlags ??
      // fallback
      numberFormatOptions[0].countryFlags,
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
    countryFlags,
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
  const isLanguageOnly = browserLocale.length === 2;

  const supportedLocale = numberFormatOptions.find((x) =>
    isLanguageOnly
      ? (x.locales as string[]).some((x) => x.startsWith(browserLocale))
      : (x.locales as string[]).includes(browserLocale),
  );

  const fallback = numberFormatOptions[0].value!;

  return supportedLocale ? supportedLocale.value : fallback;
}
