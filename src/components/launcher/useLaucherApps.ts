import { useLocalStorage } from '@vueuse/core';
import { computed, ref } from 'vue';
import { zip } from '../utils';

type App = {
  identifier: string;
  name: string;
  bgColor: string;
  icon: string;
  routeName: string;
};

const defaultLauncherApps = [
  {
    identifier: 'new-trade',
    name: 'Neuer Trade',
    bgColor: 'bg-trade-icon',
    icon: 'ph:plus',
    routeName: 'new-trade',
  },
  {
    identifier: 'references',
    name: 'Referenzen',
    bgColor: 'bg-reference-icon',
    icon: 'ph:link',
    routeName: 'trade-references',
  },
  {
    identifier: 'dummy-1',
    name: 'Dummy 1',
    bgColor: 'bg-primary',
    icon: 'ph:shield-checkered',
    routeName: 'home',
  },
  {
    identifier: 'dummy-2',
    name: 'Dummy 2',
    bgColor: 'bg-secondary',
    icon: 'ph:hand-tap',
    routeName: 'home',
  },
  {
    identifier: 'dummy-3',
    name: 'Dummy 3',
    bgColor: 'bg-info',
    icon: 'ph:crane-tower',
    routeName: 'home',
  },
  {
    identifier: 'dummy-4',
    name: 'Dummy 4',
    bgColor: 'bg-warning',
    icon: 'ph:calculator',
    routeName: 'home',
  },
  {
    identifier: 'landing',
    name: 'Landing',
    bgColor: 'bg-error',
    icon: 'ph:airplane-landing',
    routeName: 'index',
  },
] as const satisfies App[];

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
