import type { NumberFormatOption } from '@/composables/useNumberFormatOptions';
import type { SupportedRegionalFormatLocale } from '@/i18n/regionalFormat/regional-format-locales';
import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
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

  const preferredLanguages = usePreferredLanguages();
  const fallbackLocale: SupportedRegionalFormatLocale = 'en-US';

  const findOption = (localeOfInterest: string, exact: boolean) => {
    return numberFormatOptions.find((opt) => {
      const locales = opt.locales as string[];
      return exact
        ? locales.includes(localeOfInterest)
        : locales.some((l) => l.startsWith(localeOfInterest));
    });
  };

  for (const lang of preferredLanguages.value) {
    const locale = new Intl.Locale(lang);
    const base = locale.baseName;

    let match = findOption(base, true);
    if (match) {
      return match.value;
    }

    if (!locale.region) {
      match = findOption(base, false);
      if (match) return match.value;
    }
  }

  const fallback = findOption(fallbackLocale, true) ?? numberFormatOptions[0];
  return fallback.value;
}
