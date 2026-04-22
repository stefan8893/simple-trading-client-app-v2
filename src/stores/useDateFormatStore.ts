import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { type Ref, ref, watch } from 'vue';
import { useDate } from 'vuetify';
import {
  getSupportedLocale,
  type SupportedLocale,
} from '@/i18n/dates/date-locales';

export const defaultLocale: SupportedLocale = 'de-AT';

const localeInLocalStorage = useLocalStorage<SupportedLocale>(
  'dateFormat',
  defaultLocale,
);

export const useDateFormatStore = defineStore('dateFormat', () => {
  const locale: Ref<SupportedLocale> = ref(getInitialLocale());
  const { locale: vuetifyDateLocal } = useDate();

  watch(
    locale,
    (newValue) => {
      localeInLocalStorage.value = newValue;
      vuetifyDateLocal.value = newValue;
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
