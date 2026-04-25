import type { SupportedRegionalFormatLocale } from '../regionalFormat/regional-format-locales';
import { useNumberFormatStore } from '@/stores/i18n/useNumberFormatStore';

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale?: SupportedRegionalFormatLocale,
) {
  const numberFormatStore = useNumberFormatStore();

  return new Intl.NumberFormat(locale ?? numberFormatStore.baseLocale, {
    maximumFractionDigits: 15,
    minimumFractionDigits: 0,
    ...options,
  }).format(value);
}

export function formatCurrency(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale?: SupportedRegionalFormatLocale,
) {
  const numberFormatStore = useNumberFormatStore();

  return new Intl.NumberFormat(locale ?? numberFormatStore.baseLocale, {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'symbol',
    ...options,
  }).format(value);
}
