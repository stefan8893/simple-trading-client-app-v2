import type { MaybeRefOrGetter, Ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { nextTick, ref, toValue } from 'vue';

// Wir nutzen MaybeRefOrGetter für maximale Flexibilität
export function useStarterAppContextMenu(
  target: Ref<HTMLElement | null>,
  options: {
    editMode?: MaybeRefOrGetter<boolean>;
  } = {},
) {
  const showContextMenu = ref(false);
  const x = ref(0);
  const y = ref(0);

  useEventListener(target, 'contextmenu', async (event) => {
    if (toValue(options.editMode)) return;

    event.preventDefault();
    showContextMenu.value = false;

    x.value = event.clientX;
    y.value = event.clientY;

    await nextTick();
    showContextMenu.value = true;
  });

  return { showContextMenu, x, y };
}
