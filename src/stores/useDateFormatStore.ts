import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, ref, watch } from 'vue';
import {
  getSupportedLocale,
  type SupportedLocale,
} from '@/i18n/dates/date-locales';

export const defaultLocale: SupportedLocale = 'de-AT';

const localeInLocalStorage = useLocalStorage<SupportedLocale>(
  'dateLocale',
  defaultLocale,
);

export const useDateFormatStore = defineStore('dateFormat', () => {
  const locale: Ref<SupportedLocale> = ref(getInitialLocale());

  watch(
    locale,
    () => {
      localeInLocalStorage.value = locale.value;
    },
    { immediate: true },
  );

  return {
    locale,
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
