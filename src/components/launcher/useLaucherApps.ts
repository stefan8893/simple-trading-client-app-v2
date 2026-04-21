import { useLocalStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { type MessageKey, MessageKeys } from '@/i18n/language/message-keys.g';
import { zip } from '../utils';

type App = {
  identifier: string;
  messageKey: MessageKey;
  messageCount?: number;
  bgColor: string;
  icon: string;
  routeName: string;
};

const defaultLauncherApps = [
  {
    identifier: 'new-trade',
    messageKey: MessageKeys.trading.newTrade,
    bgColor: 'bg-trade-icon',
    icon: 'ph:plus',
    routeName: 'new-trade',
  },
  {
    identifier: 'references',
    messageKey: MessageKeys.trading.reference,
    messageCount: 2,
    bgColor: 'bg-reference-icon',
    icon: 'ph:link',
    routeName: 'trade-references',
  },
  {
    identifier: 'dummy-1',
    messageKey: MessageKeys.appearance,
    bgColor: 'bg-primary',
    icon: 'ph:shield-checkered',
    routeName: 'home',
  },
  {
    identifier: 'dummy-2',
    messageKey: MessageKeys.trading.investment,
    bgColor: 'bg-secondary',
    icon: 'ph:hand-tap',
    routeName: 'home',
  },
  {
    identifier: 'dummy-3',
    messageKey: MessageKeys.name,
    bgColor: 'bg-info',
    icon: 'ph:crane-tower',
    routeName: 'home',
  },
  {
    identifier: 'dummy-4',
    messageKey: MessageKeys.empty,
    bgColor: 'bg-warning',
    icon: 'ph:calculator',
    routeName: 'home',
  },
  {
    identifier: 'landing',
    messageKey: MessageKeys.goHome,
    bgColor: 'bg-error',
    icon: 'ph:airplane-landing',
    routeName: 'index',
  },
] as const as App[];

export function useLaucherApp() {
  const launcherApps = useLocalStorage(
    'launcherApps',
    ref(defaultLauncherApps),
  );

  const resetOrder = () => (launcherApps.value = defaultLauncherApps);

  const isOriginalOrder = computed(() => {
    if (launcherApps.value.length !== defaultLauncherApps.length) return false;

    return zip(launcherApps.value, defaultLauncherApps).every(
      ([a, b]) => a.identifier === b.identifier,
    );
  });

  return {
    launcherApps,
    isOriginalOrder,
    resetOrder,
  };
}
