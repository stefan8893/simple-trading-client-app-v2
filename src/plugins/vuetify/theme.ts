import type { ThemeOptions } from 'vuetify/lib/composables/theme.mjs';
import colors from 'vuetify/util/colors';

export const simpleTheme = {
  defaultTheme: 'light',
  utilities: true,
  themes: {
    light: {
      dark: false,
      colors: {
        background: colors.grey.lighten5,

        header: colors.grey.darken3,
        'on-header': colors.shades.white,

        footer: colors.grey.darken3,
        'on-footer': colors.shades.white,

        'header-avatar-background': colors.shades.white,
        'on-header-avatar-background': colors.grey.darken3,

        'header-user-menu-background': colors.shades.white,
      },
    },
    dark: {
      dark: true,
      colors: {
        background: '#27272a',

        header: colors.grey.darken4,
        'on-header': colors.grey.lighten2,

        footer: colors.grey.darken4,
        'on-footer': colors.grey.lighten2,

        'header-avatar-background': colors.grey.lighten3,
        'on-header-avatar-background': colors.grey.darken4,

        'header-user-menu-background': colors.grey.darken3,
      },
    },
  },
} as const satisfies ThemeOptions;
