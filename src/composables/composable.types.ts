import type { SupportedRegionalFormatLocale } from '@/i18n/regionalFormat/regional-format-locales';

export type LocaleMetadata = {
  locale: SupportedRegionalFormatLocale;
  languageCode: string;
  languageName: string;
  regionName: string;
  countryFlag: string;
};

export type OptionBase = {
  title: string;
  value: string;
};
