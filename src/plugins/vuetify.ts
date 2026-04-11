import { createVuetify } from 'vuetify';
import { de, en } from 'vuetify/locale';
import colors from 'vuetify/util/colors';
import '@mdi/font/css/materialdesignicons.css';
import '../styles/layers.css';
import 'vuetify/styles';

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VBtn: {
      variant: 'tonal',
      density: 'comfortable',
      color: 'primary',
    },
    VTextField: {
      variant: 'underlined',
      density: 'compact',
      color: 'primary',
    },
    VTextarea: {
      variant: 'underlined',
    },
    VCard: {
      rounded: 'xl',
    },
    VSheet: {
      rounded: 'xl',
      elevation: '1',
    },
    VList: {
      density: 'compact',
      rounded: 'xl',
      color: 'primary',
    },
    VSelect: {
      density: 'compact',
      rounded: 'xl',
      variant: 'underlined',
      color: 'primary',
    },
    VExpansionPanels: {
      rounded: 'xl',
      variant: 'accordion',
    },
    VDatePicker: {
      elevation: '0',
    },
    VTimePicker: {
      elevation: '0',
    },
    VTooltip: {
      openDelay: 800,
    },
  },
  theme: {
    defaultTheme: 'light',
    utilities: true,
    themes: {
      light: {
        dark: false,
        colors: {
          'background': colors.grey.lighten5,

          'header': colors.grey.darken3,
          'on-header': colors.shades.white,

          'footer': colors.grey.darken3,
          'on-footer': colors.shades.white,

          'header-avatar-background': colors.shades.white,
          'on-header-avatar-background': colors.grey.darken3,

          'header-user-menu-background': colors.shades.white,
        },
      },
      dark: {
        dark: true,
        colors: {
          'background': '#27272a',

          'header': colors.grey.darken4,
          'on-header': colors.grey.lighten2,

          'footer': colors.grey.darken4,
          'on-footer': colors.grey.lighten2,

          'header-avatar-background': colors.grey.lighten3,
          'on-header-avatar-background': colors.grey.darken4,

          'header-user-menu-background': colors.grey.darken3,
        },
      },
    },
  },
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
