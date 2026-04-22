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
 * Determines the first day of the week for a given locale.
 * Uses the modern `Intl.Locale` API to retrieve region-specific calendar data.
 *
 * @param locale - The BCP 47 language tag (e.g., 'de-DE', 'en-US').
 * @returns The weekday as a number according to ISO standards:
 * - `1`: Monday
 * - `2`: Tuesday
 * - `3`: Wednesday
 * - `4`: Thursday
 * - `5`: Friday
 * - `6`: Saturday
 * - `7`: Sunday
 * * @example
 * getFirstDayOfWeek('de-DE'); // returns 1
 * getFirstDayOfWeek('en-US'); // returns 7
 */
export function getFirstDayOfWeek(locale: string): number {
  try {
    return (new Intl.Locale(locale) as any).getWeekInfo?.().firstDay ?? 1;
  } catch {
    return 1;
  }
}
