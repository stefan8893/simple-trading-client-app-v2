export const supportedLanguages = ['de', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export function getSupportedLanguage(candidate?: string) {
  return supportedLanguages.find(
    (x) => x.toLowerCase() === candidate?.toLowerCase(),
  );
}
