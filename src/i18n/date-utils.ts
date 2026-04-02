import { format, type Locale } from 'date-fns';
import { useDateLocales } from './useDateLocales';

export const defaultDateFormat = 'P'; // de-AT: 01.04.2026
export const defaultTimeFormat = 'pp'; // de-AT: 14:30:45

function formatInternal (date: Date, formatString: string) {
  const dateLocales = useDateLocales();

  return format(date, formatString ?? defaultDateFormat, { locale: dateLocales.getCurrentLocale() });
}

export function formatDate (date: Date, formatString?: string) {
  return formatInternal(date, formatString ?? defaultDateFormat);
}

export function formatTime (date: Date, formatString?: string) {
  return formatInternal(date, formatString ?? defaultTimeFormat);
}

export function formatDateTime (date: Date, formatString?: string) {
  return formatInternal(date, formatString ?? `${defaultDateFormat} ${defaultTimeFormat}`);
}

export type TimeFormat = '24H' | 'AM/PM';

export function getTimeFormat (locale: Locale): TimeFormat {
  const timeFormat = locale.formatLong.time({});

  return timeFormat.includes('HH') && !timeFormat.includes('a')
    ? '24H'
    : 'AM/PM';
}
