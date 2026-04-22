import type { ThemeOptions } from 'vuetify/lib/composables/theme.mjs';
import { formatHex, oklch } from 'culori';
import tailwindColors from 'tailwindcss/colors';
import colors from 'vuetify/util/colors';

function convertOklchToHex(oklchColor: string) {
  return formatHex(oklch(oklchColor));
}

export const appThemes = {
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
        'surface-variant': colors.grey.lighten5,
        'on-surface-variant': colors.grey.darken1,

        'trade-icon': convertOklchToHex(tailwindColors.blue[400]),
        'reference-icon': convertOklchToHex(tailwindColors.stone[500]),
      },
    },
    dark: {
      dark: true,
      colors: {
        background: convertOklchToHex(tailwindColors.zinc[800]),
        header: colors.grey.darken4,
        'on-header': colors.grey.lighten2,
        footer: colors.grey.darken4,
        'on-footer': colors.grey.lighten2,
        'header-avatar-background': colors.grey.lighten3,
        'on-header-avatar-background': colors.grey.darken4,

        'trade-icon': convertOklchToHex(tailwindColors.blue[400]),
        'reference-icon': convertOklchToHex(tailwindColors.stone[500]),
      },
    },
  },
} as const satisfies ThemeOptions;
