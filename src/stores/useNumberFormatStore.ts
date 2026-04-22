import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, ref, type Ref, watch } from 'vue';
import {
  isSupportedRegionalFormatLocale,
  type SupportedRegionalFormatLocale,
} from '@/i18n/regionalFormat/regional-format-locales';

export const defaultLocale: SupportedRegionalFormatLocale = 'de-AT';

const numberFormatInLocalStorage = useLocalStorage<
  SupportedRegionalFormatLocale | undefined
>('numberFormat', undefined);

export const useNumberFormatStore = defineStore('numberFormat', () => {
  const locale: Ref<SupportedRegionalFormatLocale> = ref(getInitialLocale());

  watch(
    locale,
    (newValue) => {
      numberFormatInLocalStorage.value = newValue;
    },
    { immediate: true },
  );

  function update(newLanguage: SupportedRegionalFormatLocale) {
    locale.value = newLanguage;
  }

  return {
    locale: readonly(locale),
    update,
  };
});

function getInitialLocale(): SupportedRegionalFormatLocale {
  if (numberFormatInLocalStorage.value) {
    return numberFormatInLocalStorage.value;
  }

  const browserLocale = new Intl.Locale(navigator.language).baseName;
  const isSupported = isSupportedRegionalFormatLocale(browserLocale);

  return isSupported ? browserLocale : defaultLocale;
}
