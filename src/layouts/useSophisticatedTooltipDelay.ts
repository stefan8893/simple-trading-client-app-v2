import { useMouseInElement } from '@vueuse/core';
import { type ComputedRef, readonly, ref, type Ref, watch } from 'vue';
import { TOOLTIP_OPEN_DELAY_SHORT_IN_MS } from '@/constants/app';

export function useSophisticatedTooltipDelay(
  targetArea: Ref<HTMLElement | null>,
  isAnyTooltipOpen: ComputedRef<boolean>,
) {
  const tooltipOpenDelay = ref(TOOLTIP_OPEN_DELAY_SHORT_IN_MS);
  const { isOutside: isMouseOutsideNavigation } = useMouseInElement(targetArea);

  watch(
    [isMouseOutsideNavigation, isAnyTooltipOpen],
    ([isMouseOutside, anyTooltipOpen]) => {
      if (isMouseOutside) {
        tooltipOpenDelay.value = TOOLTIP_OPEN_DELAY_SHORT_IN_MS;
      } else if (anyTooltipOpen) {
        tooltipOpenDelay.value = 0;
      }
    },
  );

  return readonly(tooltipOpenDelay);
}
