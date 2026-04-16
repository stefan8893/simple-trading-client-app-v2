export const supportedLocales = ['de-AT', 'en-US'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export function getSupportedLocale(candidate?: string) {
  return supportedLocales.find(
    (x) => x.toLowerCase() === candidate?.toLowerCase(),
  );
}
