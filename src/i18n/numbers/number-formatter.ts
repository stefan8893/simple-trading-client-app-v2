import type { SupportedRegionalFormatLocale } from '../regionalFormat/regional-format-locales';
import { useNumberFormatStore } from '@/stores/useNumberFormatStore';

export function formatNumber(
  value: number,
  options: Intl.NumberFormatOptions = {},
  locale?: SupportedRegionalFormatLocale,
) {
  const numberFormatStore = useNumberFormatStore();

  return new Intl.NumberFormat(locale ?? numberFormatStore.locale, {
    maximumFractionDigits: 15,
    minimumFractionDigits: 0,
    ...options,
  }).format(value);
}
