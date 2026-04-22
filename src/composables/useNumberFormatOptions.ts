import type { LocaleMetadata } from './composable.types';
import type { SupportedRegionalFormatLocale } from '@/i18n/regionalFormat/regional-format-locales';
import { computed, type ComputedRef } from 'vue';

export type NumberFormatOption = {
  title: string;
  value: string;
  baseLocale: SupportedRegionalFormatLocale;
  locales: SupportedRegionalFormatLocale[];
  countryFlags: string[];
};

type UniqueNumberFormat = {
  fingerprint: string;
  locales: SupportedRegionalFormatLocale[];
  countryFlags: string[];
  formatted: string;
  baseLocale: string;
};

const DUMMY_NUMBER = 1234.5;

export function useNumberFormatOptions(
  localeMetadata: ComputedRef<LocaleMetadata[]>,
): ComputedRef<NumberFormatOption[]> {
  const numberFormatOptions = computed(() => {
    const uniqueNumberFormats = localeMetadata.value
      .map(
        (localeMetadata) =>
          [localeMetadata, createUniqueNumberFormat(localeMetadata)] as const,
      )
      .reduce(
        (acc, [localeMetadata, next]) => merge(localeMetadata, acc, next),
        new Map<string, UniqueNumberFormat>(),
      );

    return Array.from(uniqueNumberFormats, ([fingerprint, numberFormat]) => {
      return {
        // title shows something like "🇺🇸 1,234.56" or "🇩🇪 1.234,56"
        title: `${numberFormat.countryFlags.slice(0, 4).join('')} ${numberFormat.formatted}`,
        value: fingerprint,
        baseLocale: numberFormat.baseLocale,
        locales: numberFormat.locales,
        countryFlags: numberFormat.countryFlags,
      } as NumberFormatOption;
    }).toSorted((a, b) => a.title.localeCompare(b.title));
  });

  return numberFormatOptions;
}

function getSeparator(
  parts: Intl.NumberFormatPart[],
  currencyIndex: number,
  integerIndex: number,
) {
  const separatorPart = parts.find((p, i) => {
    const isBetween =
      (i === currencyIndex + 1 && i < integerIndex) ||
      (i === currencyIndex - 1 && i > integerIndex);
    return isBetween && p.type === 'literal';
  });

  return separatorPart ? encodeURIComponent(separatorPart.value) : 'none';
}

function createFingerprint(localeMetadata: LocaleMetadata) {
  const currentCurrency = 'USD';
  const currencyFormatter = new Intl.NumberFormat(localeMetadata.locale, {
    style: 'currency',
    currency: currentCurrency,
    currencyDisplay: 'symbol',
  });

  const parts = currencyFormatter.formatToParts(DUMMY_NUMBER);

  const group = parts.find((p) => p.type === 'group')?.value ?? '';
  const decimal = parts.find((p) => p.type === 'decimal')?.value ?? '';
  const currency = parts.find((p) => p.type === 'currency')?.value ?? '';
  const currencyIndex = parts.findIndex((p) => p.type === 'currency');
  const integerIndex = parts.findIndex((p) => p.type === 'integer');
  const position = currencyIndex < integerIndex ? 'pre' : 'post';
  const separator = getSeparator(parts, currencyIndex, integerIndex);

  return `cur:${currency}|cp:${position}|g:${group}|d:${decimal}|s:${separator}`;
}

function createUniqueNumberFormat(
  localeMetadata: LocaleMetadata,
): UniqueNumberFormat {
  const exampleFormat = new Intl.NumberFormat(localeMetadata.locale, {
    style: 'decimal',
  });

  const fingerprint = createFingerprint(localeMetadata);

  return {
    fingerprint,
    locales: [localeMetadata.locale],
    countryFlags: [localeMetadata.countryFlag],
    formatted: exampleFormat.format(1234.56),
    baseLocale: localeMetadata.locale,
  };
}

function merge(
  localeMetadata: LocaleMetadata,
  acc: Map<string, UniqueNumberFormat>,
  next: UniqueNumberFormat,
) {
  const entry = acc.get(next.fingerprint) ?? next;

  if (!entry.locales.includes(localeMetadata.locale))
    entry.locales.push(localeMetadata.locale);

  if (!entry.countryFlags.includes(localeMetadata.countryFlag))
    entry.countryFlags.push(localeMetadata.countryFlag);

  return acc.set(next.fingerprint, entry);
}
