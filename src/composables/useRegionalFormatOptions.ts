import type { LocaleMetadata, OptionBase } from './composable.types';
import { computed, type ComputedRef } from 'vue';

export function useRegionalFormatOptions(
  localeMetadata: ComputedRef<LocaleMetadata[]>,
): ComputedRef<OptionBase[]> {
  const regionalFormatOptions = computed(() =>
    localeMetadata.value.map(
      ({ countryFlag: flag, languageName, regionName, locale }) => ({
        title: `${flag} ${languageName} (${regionName})`,
        value: locale,
      }),
    ),
  );

  return regionalFormatOptions;
}
