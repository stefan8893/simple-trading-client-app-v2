import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, ref, type Ref, watch, type WritableComputedRef } from 'vue';
import { useLocale } from 'vuetify';
import {
  getSupportedLanguage,
  type SupportedLanguage,
} from '@/i18n/language/language-locales';
import i18n from '../i18n/language/i18n-config';

export const defaultLanguage: SupportedLanguage = 'de';

const languageInLocalStorage = useLocalStorage<SupportedLanguage>(
  'language',
  defaultLanguage,
);

export const useLanguageStore = defineStore('language', () => {
  const language: Ref<SupportedLanguage> = ref(getInitialLanguage());
  const { current: vuetifyLocale } = useLocale();

  watch(
    language,
    (newValue) => {
      languageInLocalStorage.value = newValue;

      (
        i18n.global.locale as unknown as WritableComputedRef<SupportedLanguage>
      ).value = newValue;

      vuetifyLocale.value = newValue;
    },
    { immediate: true },
  );

  function udpateLanguage(newLanguage: SupportedLanguage) {
    language.value = newLanguage;
  }

  return {
    language: readonly(language),
    udpateLanguage,
  };
});

function getInitialLanguage(): SupportedLanguage {
  if (languageInLocalStorage.value) {
    return languageInLocalStorage.value;
  }

  const languages = usePreferredLanguages();
  const browserLanguage = languages.value?.[0]?.split('-')[0];
  const supportedBrowserLanguage = getSupportedLanguage(browserLanguage);

  return supportedBrowserLanguage ?? defaultLanguage;
}
