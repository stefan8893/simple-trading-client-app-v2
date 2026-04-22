export const supportedRegionalFormatLocales = ['de-AT', 'en-US'] as const;
export type SupportedRegionalFormatLocale =
  (typeof supportedRegionalFormatLocales)[number];

export function getSupportedLocale(candidate?: string) {
  return supportedRegionalFormatLocales.find(
    (x) => x.toLowerCase() === candidate?.toLowerCase(),
  );
}
