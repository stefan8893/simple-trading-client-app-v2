import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import {
  type SupportedRegionalFormatLocale,
  supportedRegionalFormatLocales,
} from '@/i18n/regionalFormat/regional-format-locales';
import { useLanguageStore } from './useLanguageStore';

export type NumberFormatOption = {
  title: string;
  value: string;
  baseLocale: SupportedRegionalFormatLocale;
  locales: SupportedRegionalFormatLocale[];
};

function getFlagEmoji(countryCode: string) {
  return Array.from(countryCode.toUpperCase(), (char) =>
    String.fromCodePoint((char.codePointAt(0) ?? 0) + 127_397),
  ).join('');
}

export const useLocaleOptionsStore = defineStore('localeOptions', () => {
  const { language } = storeToRefs(useLanguageStore());

  const localeMetadata = computed(() => {
    const displayLocale = language.value;

    const languageNames = new Intl.DisplayNames([displayLocale], {
      type: 'language',
    });
    const regionNames = new Intl.DisplayNames([displayLocale], {
      type: 'region',
    });

    return supportedRegionalFormatLocales
      .map((locale) => {
        const [langCode, regionCode] = locale.split('-');

        return {
          locale,
          langCode,
          languageName: languageNames.of(langCode) ?? langCode,
          regionName: regionNames.of(regionCode) ?? regionCode,
          flag: getFlagEmoji(regionCode),
        };
      })
      .toSorted((a, b) => {
        const left = `${a.languageName} ${a.regionName}`;
        const right = `${b.languageName} ${b.regionName}`;

        return left.localeCompare(right, language.value);
      });
  });

  const regionalFormatOptions = computed(() =>
    localeMetadata.value.map(({ flag, languageName, regionName, locale }) => ({
      title: `${flag} ${languageName} (${regionName})`,
      value: locale,
    })),
  );

  const languageOptions = computed(() => {
    const uniqueLanguages = new Map<string, string>();

    for (const { langCode } of localeMetadata.value) {
      if (!uniqueLanguages.has(langCode)) {
        const formatter = new Intl.DisplayNames([langCode], {
          type: 'language',
        });
        const endonym = formatter.of(langCode) ?? langCode;

        const capitalizedTitle =
          endonym.charAt(0).toUpperCase() + endonym.slice(1);

        uniqueLanguages.set(langCode, capitalizedTitle);
      }
    }

    return Array.from(uniqueLanguages, ([value, title]) => ({
      title,
      value,
    })).toSorted((a, b) => a.title.localeCompare(b.title));
  });

  const numberFormatOptions = computed(() => {
    const TEST_NUMBER = 1234.5;
    const uniqueFormats = new Map<
      string,
      {
        locales: string[];
        flags: string[];
        formatted: string;
        baseLocale: string;
      }
    >();

    for (const item of localeMetadata.value) {
      const parts = new Intl.NumberFormat(item.locale).formatToParts(
        TEST_NUMBER,
      );
      const group = parts.find((p) => p.type === 'group')?.value || '';
      const decimal = parts.find((p) => p.type === 'decimal')?.value || '';

      const fingerprint = `g:${group}|d:${decimal}`;

      const entry = uniqueFormats.get(fingerprint) || {
        locales: [],
        flags: [],
        formatted: new Intl.NumberFormat(item.locale).format(1234.56),
        baseLocale: item.locale, // store the first locale as base
      };

      entry.locales.push(item.locale);
      if (!entry.flags.includes(item.flag)) entry.flags.push(item.flag);
      uniqueFormats.set(fingerprint, entry);
    }

    return Array.from(uniqueFormats, ([fingerprint, info]) => {
      return {
        title: `${info.flags.join('')} ${info.formatted}`,
        value: fingerprint,
        baseLocale: info.baseLocale,
        locales: info.locales,
      } as NumberFormatOption;
    }).toSorted((a, b) => a.baseLocale.localeCompare(b.baseLocale));
  });

  return {
    regionalFormatOptions,
    languageOptions,
    numberFormatOptions,
  };
});
