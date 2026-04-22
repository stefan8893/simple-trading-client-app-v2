import type { DefaultsOptions } from 'vuetify/lib/composables/defaults.mjs';

export const appComponentDefaults = {
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
  VCard: {
    rounded: 'xl',
  },
  VCardTitle: {
    class: 'font-light pt-3.5',
  },
  VCardText: {
    class: 'p-4',
  },
  VCardActions: {
    class: 'grid justify-items-end pb-6 pr-6',
    VBtn: {
      variant: 'tonal',
    },
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
} as const satisfies DefaultsOptions;
