import { deAT, enUS, type Locale } from 'date-fns/locale';
import { useLocaleStore } from '@/stores/localeStore';

export function useDateLocales () {
  const localeStore = useLocaleStore();
  const supportedLocales = [deAT, enUS];

  const getLocale = (code: string): Locale => {
    const found = supportedLocales.find(x => x.code === code);

    if (!found) {
      const supportedLocaleCodes = supportedLocales.map(x => x.code);
      supportedLocaleCodes.push('en');

      throw new Error(
        `The locale '${code}' is not supported. Only '${supportedLocaleCodes.join('\', \'')}'`,
      );
    }

    return found;
  };

  const getCurrentLocale = () => getLocale(localeStore.locale);

  return {
    supportedLocales,
    getLocale,
    getCurrentLocale,
  };
}
