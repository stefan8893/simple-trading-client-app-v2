import type {
  SupportedLanguage,
  SupportedRegionalFormatLocale,
} from './regional-format-locales';
import { getWeek, type Locale } from 'date-fns';
import {
  de,
  deAT,
  enAU,
  enCA,
  enGB,
  enNZ,
  enUS,
  es,
  ja,
} from 'date-fns/locale';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useRegionalFormatStore } from '@/stores/useRegionalFormatStore';

const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
};

const DEFAULT_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  timeStyle: 'medium',
};

const DEFAULT_DATETIME_OPTIONS: Intl.DateTimeFormatOptions = {
  dateStyle: 'long',
  timeStyle: 'short',
};

const supportedLocales: Record<
  SupportedRegionalFormatLocale | SupportedLanguage,
  Locale
> = {
  'de-AT': deAT,
  'de-DE': de,
  'en-US': enUS,
  'en-GB': enGB,
  'de-CH': de,
  'es-MX': es,
  'en-AU': enAU,
  'en-NZ': enNZ,
  'ja-JP': ja,
  'en-CA': enCA,
  de: deAT,
  en: enUS,
  es,
  ja,
};

const fallbackLocale: SupportedRegionalFormatLocale = 'en-US';

function getBcpTag(): string {
  const { language } = useLanguageStore();
  const { locale } = useRegionalFormatStore();

  const regionSuffix = locale.includes('-') ? locale.split('-')[1] : locale;

  return `${language}-${regionSuffix}`;
}

export function formatDate(date: Date, options = DEFAULT_DATE_OPTIONS) {
  return new Intl.DateTimeFormat(getBcpTag(), options).format(date);
}

export function formatTime(date: Date, options = DEFAULT_TIME_OPTIONS) {
  return new Intl.DateTimeFormat(getBcpTag(), options).format(date);
}

export function formatDateTime(date: Date, options = DEFAULT_DATETIME_OPTIONS) {
  return new Intl.DateTimeFormat(getBcpTag(), options).format(date);
}

export function isHour12(locale: string): boolean {
  try {
    const formatter = new Intl.DateTimeFormat(locale, { hour: 'numeric' });
    return formatter.resolvedOptions().hour12 ?? false;
  } catch {
    return false;
  }
}

/**
 * determines the first day of the week based on the given locale
 * @returns 1 (Mo) to 0 (Su)
 */
export function getFirstDayOfWeek(
  localeId: SupportedRegionalFormatLocale | SupportedLanguage,
): number {
  const locale = supportedLocales[localeId] ?? supportedLocales[fallbackLocale];

  // 0 = Sunday, 1 = Monday
  return locale.options?.weekStartsOn ?? 0;
}

export function getCalendarWeek(
  date: Date,
  localeId: SupportedRegionalFormatLocale | SupportedLanguage,
) {
  const locale = supportedLocales[localeId] ?? supportedLocales[fallbackLocale];

  return getWeek(date, { locale });
}
