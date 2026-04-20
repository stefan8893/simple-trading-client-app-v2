import type { MaybeRefOrGetter, Ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { nextTick, readonly, ref, toValue } from 'vue';

export function useSingleLauncherAppContextMenu(
  target: Ref<HTMLElement | null>,
  options: {
    editMode?: MaybeRefOrGetter<boolean>;
  } = {},
) {
  const showContextMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  useEventListener(target, 'contextmenu', async (event) => {
    event.preventDefault();
    if (toValue(options.editMode)) return;

    showContextMenu.value = false;

    x.value = event.clientX;
    y.value = event.clientY;

    await nextTick();
    showContextMenu.value = true;
  });

  return { showContextMenu, x: readonly(x), y: readonly(y) };
}
