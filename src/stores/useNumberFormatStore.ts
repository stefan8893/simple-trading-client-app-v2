import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, ref, type Ref, watch } from 'vue';
import {
  isSupportedRegionalFormatLocale,
  type SupportedRegionalFormatLocale,
} from '@/i18n/regionalFormat/regional-format-locales';
import { useLocaleOptionsStore } from './useLocaleOptionsStore';

export const defaultLocale: SupportedRegionalFormatLocale = 'de-AT';

const numberFormatInLocalStorage = useLocalStorage<
  SupportedRegionalFormatLocale | undefined
>('numberFormat', undefined);

export const useNumberFormatStore = defineStore('numberFormat', () => {
  const { numberFormatOptions } = useLocaleOptionsStore();
  const locale: Ref<SupportedRegionalFormatLocale> = ref(
    getInitialLocale(numberFormatOptions),
  );

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

function getInitialLocale(
  numberFormatOptions: { title: string; value: string }[],
): SupportedRegionalFormatLocale {
  if (numberFormatInLocalStorage.value) {
    return numberFormatInLocalStorage.value;
  }

  const browserLocale = new Intl.Locale(navigator.language).baseName;
  const isSupported =
    numberFormatOptions.some((x) => x.value === browserLocale) &&
    isSupportedRegionalFormatLocale(browserLocale);

  return isSupported ? browserLocale : defaultLocale;
}
