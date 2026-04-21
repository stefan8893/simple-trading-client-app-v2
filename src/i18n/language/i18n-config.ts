import { createI18n } from 'vue-i18n';
import de from '@/i18n/language/resources/de.json';
import en from '@/i18n/language/resources/en.json';

type MessageSchema = typeof de;

export default createI18n<[MessageSchema], 'de' | 'en'>({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
  },
});
