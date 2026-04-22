import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, type Ref, ref, watch } from 'vue';
import {
  getSupportedLocale,
  type SupportedRegionalFormatLocale,
} from '@/i18n/regionalFormat/regional-format-locales';

export const defaultLocale: SupportedRegionalFormatLocale = 'de-AT';

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

  const browserLocale = new Intl.Locale(navigator.language).baseName;
  const supportedBrowserLocale = getSupportedLocale(browserLocale);

  return supportedBrowserLocale ?? defaultLocale;
}
