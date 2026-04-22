import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, ref, type Ref, watch } from 'vue';
import {
  getSupportedLocale,
  type SupportedNumberLocale,
} from '@/i18n/numbers/number-locales';

export const defaultLocale: SupportedNumberLocale = 'de-AT';

const numberFormatInLocalStorage = useLocalStorage<
  SupportedNumberLocale | undefined
>('numberFormat', undefined);

export const useNumberFormatStore = defineStore('numberFormat', () => {
  const locale: Ref<SupportedNumberLocale> = ref(getInitialLocale());

  watch(
    locale,
    (newValue) => {
      numberFormatInLocalStorage.value = newValue;
    },
    { immediate: true },
  );

  function update(newLanguage: SupportedNumberLocale) {
    locale.value = newLanguage;
  }

  return {
    locale: readonly(locale),
    update,
  };
});

function getInitialLocale(): SupportedNumberLocale {
  if (numberFormatInLocalStorage.value) {
    return numberFormatInLocalStorage.value;
  }

  const browserLocale = new Intl.Locale(navigator.language).baseName;
  const supportedBrowserLocale = getSupportedLocale(browserLocale);

  return supportedBrowserLocale ?? defaultLocale;
}
