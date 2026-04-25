<script setup lang="ts">
import { onLongPress } from '@vueuse/core';
import { computed, nextTick, ref, useTemplateRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { vibrate } from '@/utils';

const props = defineProps<{
  messageKey: string;
  messageCount?: number;
  routeName: string;
  icon: string;
  bgColorClass: string;
  editMode: boolean;
  isDragging: boolean;
  index: number;
  preventVisualFeedbackOnClick: boolean;
}>();

const router = useRouter();
const { t } = useI18n();

const emit = defineEmits(['update:editMode']);

const app = useTemplateRef('launcher-app');
const showHapticPop = ref(false);
const allowActive = computed(
  () =>
    !props.editMode &&
    !props.preventVisualFeedbackOnClick &&
    !showHapticPop.value,
);

const appName = computed(() => {
  return props.messageCount
    ? t(props.messageKey, props.messageCount)
    : t(props.messageKey);
});

onLongPress(
  app,
  (event) => {
    const leftMouseButton = 0;
    if (event instanceof MouseEvent && event.button !== leftMouseButton) return;

    if (!props.editMode) {
      vibrate(50);
      showHapticPop.value = true;

      setTimeout(() => {
        showHapticPop.value = false;
        nextTick(() => {
          emit('update:editMode', true);
        });
      }, 300);
    }
  },
  { delay: 600, distanceThreshold: 10 },
);

async function navigateTo() {
  !showHapticPop.value &&
    !props.editMode &&
    router.push({ name: props.routeName });
}
</script>

<template>
  <div>
    <div
      ref="launcher-app"
      class="launcher-app flex flex-col flex-nowrap justify-start items-center w-24"
      :class="[
        props.editMode
          ? props.isDragging
            ? 'cursor-grabbing'
            : 'cursor-grab'
          : 'cursor-pointer',
        {
          'is-jiggling': props.editMode,
          'is-even': props.index % 2 === 0,
          'is-triple': (props.index + 1) % 3 === 0,
          'allow-active': allowActive,
          'is-haptic-pop': showHapticPop,
        },
      ]"
      @click="navigateTo"
    >
      <div
        class="launcher-app-icon w-16 h-16 rounded-xl grid place-items-center elevation-3"
        :class="[props.bgColorClass]"
      >
        <v-icon :icon="props.icon" size="x-large"></v-icon>
      </div>
      <div class="text-sm max-w-24 truncate mt-2">
        {{ appName }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.launcher-app.allow-active:active:not(.is-jiggling) {
  transform: scale(0.92);
  transition: transform 0.1s ease-out;
}

/* sortable-app-item-chosen comes from parent component */
.sortable-app-item-chosen .launcher-app {
  animation: none;
}

/* sortable-app-item-chosen comes from parent component */
.sortable-app-item-chosen .launcher-app {
  transform: scale(1.15);
  /* needs to be set here as well to give the user a smooth experience */
  cursor: grabbing;
}

.is-haptic-pop {
  animation: haptic-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  user-select: none;
}

.is-jiggling {
  animation: jiggle 0.26s infinite ease-in-out;

  user-select: none;
}

.is-even.is-jiggling {
  animation-direction: reverse;
}

.is-triple.is-jiggling {
  animation-duration: 0.31s;
}

@keyframes haptic-pop {
  0% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes jiggle {
  0% {
    transform: rotate(-1.5deg) translate3d(-1px, 0, 0);
  }
  50% {
    transform: rotate(1.5deg) translate3d(1px, 0, 0);
  }
  100% {
    transform: rotate(-1.5deg) translate3d(-1px, 0, 0);
  }
}
</style>
