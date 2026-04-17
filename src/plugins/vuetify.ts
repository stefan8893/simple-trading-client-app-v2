import { createVuetify } from 'vuetify';
import { de, en } from 'vuetify/locale';
import { simpleComponentDefaults } from './vuetify/component-defaults';
import { simpleIcons } from './vuetify/icons';
import { simpleTheme } from './vuetify/theme';
import '../styles/layers.css';
import 'vuetify/styles';

export default createVuetify({
  icons: simpleIcons,
  defaults: simpleComponentDefaults,
  theme: simpleTheme,
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
});
