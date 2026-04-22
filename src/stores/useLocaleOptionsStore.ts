import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';
import { supportedRegionalFormatLocales } from '@/i18n/regionalFormat/regional-format-locales';
import { useLanguageStore } from './useLanguageStore';

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
    const TEST_NUMBER = 1234.56;
    const uniqueFormats = new Map<
      string,
      { locales: string[]; flags: string[] }
    >();

    for (const item of localeMetadata.value) {
      const formatted = new Intl.NumberFormat(item.locale).format(TEST_NUMBER);

      const entry = uniqueFormats.get(formatted) || { locales: [], flags: [] };
      entry.locales.push(item.locale);
      if (!entry.flags.includes(item.flag)) entry.flags.push(item.flag);
      uniqueFormats.set(formatted, entry);
    }

    return Array.from(uniqueFormats, ([formattedNumber, info]) => {
      return {
        title: `${info.flags.join('')} ${formattedNumber}`,
        value: info.locales.toSorted((a, b) => a.localeCompare(b))[0],
        description: info.locales.join(', '),
      };
    }).toSorted((a, b) => a.value.localeCompare(b.value));
  });

  return {
    regionalFormatOptions,
    languageOptions,
    numberFormatOptions,
  };
});
