import AdapterDateFns from '@date-io/date-fns';
import { deAT, enUS } from 'date-fns/locale';
import { createVuetify } from 'vuetify';
import { de, en } from 'vuetify/locale';
import { appComponentDefaults } from './vuetify/app-component-defaults';
import { appIcons } from './vuetify/appIcons';
import { appThemes } from './vuetify/appThemes';
import '../styles/layers.css';
import 'vuetify/styles';

export default createVuetify({
  icons: appIcons,
  defaults: appComponentDefaults,
  theme: appThemes,
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
  locale: {
    locale: 'de',
    fallback: 'en',
    messages: { de, en },
  },
  date: {
    adapter: AdapterDateFns,
    locale: {
      de: deAT,
      en: enUS,
    },
  },
});
