export const supportedRegionalFormatLocales = [
  'de-AT',
  'de-CH',
  'de-DE',
  'en-US',
  'en-GB',
  'es-MX',
  'en-AU',
  'en-NZ',
  'ja-JP',
  'en-CA',
] as const;

export type SupportedLanguage =
  (typeof supportedRegionalFormatLocales)[number] extends `${infer Lang}-${string}`
    ? Lang
    : never;

const supportedRegionalFormatLocalesSet = new Set<string>(
  supportedRegionalFormatLocales,
);

const supportedLanguagesSet = new Set<string>(
  supportedRegionalFormatLocales.map((locale) => locale.split('-')[0]),
);

export type SupportedRegionalFormatLocale =
  (typeof supportedRegionalFormatLocales)[number];

export function isSupportedRegionalFormatLocale(
  candidate: string,
): candidate is SupportedRegionalFormatLocale {
  return supportedRegionalFormatLocalesSet.has(candidate);
}

export function isSupportedLanguage(
  candidate: string,
): candidate is SupportedLanguage {
  return supportedLanguagesSet.has(candidate);
}
