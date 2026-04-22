import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, type Ref, ref, watch } from 'vue';
import {
  getSupportedLocale,
  type SupportedLocale,
} from '@/i18n/regionalFormat/date-locales';

export const defaultLocale: SupportedLocale = 'de-AT';

const localeInLocalStorage = useLocalStorage<SupportedLocale>(
  'regionalFormat',
  defaultLocale,
);

export const useRegionalFormatStore = defineStore('regionalFormat', () => {
  const locale: Ref<SupportedLocale> = ref(getInitialLocale());

  watch(
    locale,
    (newValue) => {
      localeInLocalStorage.value = newValue;
    },
    { immediate: true },
  );

  function update(newLocale: SupportedLocale) {
    locale.value = newLocale;
  }

  return {
    locale: readonly(locale),
    update,
  };
});

function getInitialLocale(): SupportedLocale {
  if (localeInLocalStorage.value) {
    return localeInLocalStorage.value;
  }

  const browserLocale = new Intl.Locale(navigator.language).baseName;
  const supportedBrowserLocale = getSupportedLocale(browserLocale);

  return supportedBrowserLocale ?? defaultLocale;
}
