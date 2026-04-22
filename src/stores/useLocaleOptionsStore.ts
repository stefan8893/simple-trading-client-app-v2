import type { LocaleMetadata } from '@/composables/composable.types';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useLanguageOptions } from '@/composables/useLanguageOptions';
import { useNumberFormatOptions } from '@/composables/useNumberFormatOptions';
import { useRegionalFormatOptions } from '@/composables/useRegionalFormatOptions';
import { supportedRegionalFormatLocales } from '@/i18n/regionalFormat/regional-format-locales';
import { useLanguageStore } from './useLanguageStore';

export const useLocaleOptionsStore = defineStore('localeOptions', () => {
  const { language } = storeToRefs(useLanguageStore());

  const localeMetadata = computed(() => {
    return collectLocaleMetadata(language.value);
  });

  const regionalFormatOptions = useRegionalFormatOptions(localeMetadata);
  const languageOptions = useLanguageOptions(localeMetadata);
  const numberFormatOptions = useNumberFormatOptions(localeMetadata);

  return {
    regionalFormatOptions,
    languageOptions,
    numberFormatOptions,
  };
});

function getFlagEmoji(countryCode: string) {
  return Array.from(countryCode.toUpperCase(), (char) =>
    String.fromCodePoint((char.codePointAt(0) ?? 0) + 127_397),
  ).join('');
}

function collectLocaleMetadata(language: string): LocaleMetadata[] {
  const languageNames = new Intl.DisplayNames([language], {
    type: 'language',
  });
  const regionNames = new Intl.DisplayNames([language], {
    type: 'region',
  });

  return supportedRegionalFormatLocales
    .map((locale) => {
      const [languageCode, regionCode] = locale.split('-');

      return {
        locale,
        languageCode,
        languageName: languageNames.of(languageCode) ?? languageCode,
        regionName: regionNames.of(regionCode) ?? regionCode,
        countryFlag: getFlagEmoji(regionCode),
      };
    })
    .toSorted((a, b) => {
      const left = `${a.languageName} ${a.regionName}`;
      const right = `${b.languageName} ${b.regionName}`;

      return left.localeCompare(right, language);
    });
}
