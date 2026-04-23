import type { LocaleMetadata, OptionBase } from './composable.types';
import { computed, type ComputedRef } from 'vue';

export function useLanguageOptions(
  localeMetadata: ComputedRef<LocaleMetadata[]>,
): ComputedRef<OptionBase[]> {
  const languageOptions = computed(() => {
    const uniqueLanguageCodes = new Set<string>(
      localeMetadata.value.map((x) => x.languageCode),
    );

    return [...uniqueLanguageCodes].map((x) => ({
      title: getTitle(x),
      value: x,
    }));
  });

  return languageOptions;
}

function getTitle(languageCode: string) {
  const formatter = new Intl.DisplayNames([languageCode], {
    type: 'language',
  });
  const endonym = formatter.of(languageCode) ?? languageCode;
  const capitalizedTitle = endonym.charAt(0).toUpperCase() + endonym.slice(1);

  return capitalizedTitle;
}
