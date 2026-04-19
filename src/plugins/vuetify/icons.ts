import type { IconAliases } from 'vuetify';
import type { InternalIconOptions } from 'vuetify/lib/composables/icons.mjs';
import { Icon } from '@iconify/vue';
import { h } from 'vue';

const iconAliasess = {
  collapse: 'ph:caret-up',
  complete: 'ph:check',
  cancel: 'ph:x-circle',
  close: 'ph:x',
  delete: 'ph:trash',
  clear: 'ph:x-circle',
  success: 'ph:check-circle',
  info: 'ph:info',
  warning: 'ph:warning',
  error: 'ph:prohibit',
  prev: 'ph:caret-left',
  next: 'ph:caret-right',
  checkboxOn: 'ph:check-square-fill',
  checkboxOff: 'ph:square',
  checkboxIndeterminate: 'ph:minus-square',
  delimiter: 'ph:circle-fill',
  sort: 'ph:arrows-down-up',
  expand: 'ph:caret-down',
  menu: 'ph:list',
  subgroup: 'ph:caret-down',
  dropdown: 'ph:caret-down',
  radioOn: 'ph:circle-fill',
  radioOff: 'ph:circle',
  edit: 'ph:pencil-simple',
  ratingEmpty: 'ph:star',
  ratingFull: 'ph:star-fill',
  ratingHalf: 'ph:star-half-fill',
  loading: 'ph:spinner-gap',
  first: 'ph:caret-double-left',
  last: 'ph:caret-double-right',
  unfold: 'ph:arrows-out-line-vertical',
  file: 'ph:file',
  plus: 'ph:plus',
  minus: 'ph:minus',
} as const satisfies Partial<IconAliases>;

export const appIcons = {
  defaultSet: 'iconify',
  sets: {
    iconify: {
      component: (props) => h(Icon, { ...(props as any) }),
    },
  },
  aliases: iconAliasess,
} as const satisfies Partial<InternalIconOptions>;
