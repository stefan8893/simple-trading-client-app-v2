import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, type Ref, ref, watch } from 'vue';
import {
  isSupportedRegionalFormatLocale,
  type SupportedRegionalFormatLocale,
  supportedRegionalFormatLocales,
} from '@/i18n/regionalFormat/regional-format-locales';

const regionalFormatInLocalStorage = useLocalStorage<
  SupportedRegionalFormatLocale | undefined
>('regionalFormat', undefined);

export const useRegionalFormatStore = defineStore('regionalFormat', () => {
  const locale: Ref<SupportedRegionalFormatLocale> = ref(getInitialLocale());

  watch(
    locale,
    (newValue) => {
      regionalFormatInLocalStorage.value = newValue;
    },
    { immediate: true },
  );

  function update(newLocale: SupportedRegionalFormatLocale) {
    locale.value = newLocale;
  }

  return {
    locale: readonly(locale),
    update,
  };
});

function getInitialLocale(): SupportedRegionalFormatLocale {
  if (regionalFormatInLocalStorage.value) {
    return regionalFormatInLocalStorage.value;
  }

  const preferredLanguages = usePreferredLanguages();
  const fallback: SupportedRegionalFormatLocale = 'en-US';

  for (const lang of preferredLanguages.value) {
    const locale = new Intl.Locale(lang);
    const base = locale.baseName;

    if (isSupportedRegionalFormatLocale(base)) {
      return base;
    }

    if (!locale.region) {
      const match = supportedRegionalFormatLocales.find((x) =>
        x.startsWith(`${locale.language}-`),
      );
      if (match) {
        return match;
      }
    }
  }

  return fallback;
}
