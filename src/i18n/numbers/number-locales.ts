export const supportedNumberLocales = ['de-AT', 'en-US'] as const;
export type SupportedNumberLocale = (typeof supportedNumberLocales)[number];

export function getSupportedLocale(candidate?: string) {
  return supportedNumberLocales.find(
    (x) => x.toLowerCase() === candidate?.toLowerCase(),
  );
}
