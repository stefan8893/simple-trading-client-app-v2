import { useLocalStorage, usePreferredLanguages } from '@vueuse/core';
import { defineStore } from 'pinia';
import { readonly, ref, type Ref, watch, type WritableComputedRef } from 'vue';
import { useLocale } from 'vuetify';
import {
  isSupportedLanguage,
  type SupportedLanguage,
} from '@/i18n/regionalFormat/regional-format-locales';
import i18n from '../i18n/language/i18n-config';

const languageInLocalStorage = useLocalStorage<SupportedLanguage | undefined>(
  'language',
  undefined,
);

export const useLanguageStore = defineStore('language', () => {
  const language: Ref<SupportedLanguage> = ref(getInitialLanguage());
  const { current: vuetifyLocale } = useLocale();

  watch(
    language,
    (newValue) => {
      languageInLocalStorage.value = newValue;
      updateI18nLanguage(newValue);
      vuetifyLocale.value = newValue;
    },
    { immediate: true },
  );

  function udpateLanguage(newLanguage: SupportedLanguage) {
    language.value = newLanguage;
  }

  return {
    language: readonly(language),
    udpate: udpateLanguage,
  };
});

function updateI18nLanguage(newValue: SupportedLanguage) {
  const i18nGlobalConfig = i18n.global
    .locale as unknown as WritableComputedRef<SupportedLanguage>;

  i18nGlobalConfig.value = newValue;
}

function getInitialLanguage(): SupportedLanguage {
  if (languageInLocalStorage.value) {
    return languageInLocalStorage.value;
  }

  const preferred = usePreferredLanguages();
  const fallback: SupportedLanguage = 'en';

  for (const pref of preferred.value) {
    const langCode = pref.split('-')[0] as SupportedLanguage;

    if (isSupportedLanguage(langCode)) {
      return langCode;
    }
  }

  return fallback;
}
