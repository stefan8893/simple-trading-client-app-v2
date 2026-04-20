<script setup lang="ts">
import { onKeyStroke, onLongPress } from '@vueuse/core';
import { computed, nextTick, ref, useTemplateRef } from 'vue';
import { useRouter } from 'vue-router';
import { vibrate } from '@/utils';
import { useSingleLauncherAppContextMenu } from './useSingleLauncherAppContextMenu';

const props = defineProps<{
  appName: string;
  routeName: string;
  icon: string;
  bgColorClass: string;
  editMode: boolean;
  isDragging: boolean;
  index: number;
  showResetEntryInContextMenu: boolean;
}>();

const router = useRouter();

const emit = defineEmits(['update:editMode', 'reset-apps-order']);

const app = useTemplateRef('launcher-app');
const showHapticPop = ref(false);
const { showContextMenu, x, y } = useSingleLauncherAppContextMenu(app, {
  editMode: () => props.editMode,
});
const allowActive = computed(
  () => !props.editMode && !showContextMenu.value && !showHapticPop.value,
);

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

onKeyStroke('Escape', (event) => {
  if (props.editMode) {
    event.preventDefault();
    emit('update:editMode', false);
  }
});

async function gotoTarget() {
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
      @click="gotoTarget"
    >
      <div
        class="launcher-app-icon w-16 h-16 rounded-xl grid place-items-center elevation-3"
        :class="[props.bgColorClass]"
      >
        <v-icon :icon="props.icon" size="x-large"></v-icon>
      </div>
      <div class="text-sm select-none max-w-24 truncate mt-2">
        {{ props.appName }}
      </div>
    </div>
    <v-menu
      v-model="showContextMenu"
      absolute
      offset-y
      :style="{ top: `${y}px`, left: `${x}px` }"
      variant="tonal"
    >
      <v-list>
        <v-list-item value="1" @click="emit('update:editMode', true)">
          <v-list-item-title>Apps anordnen</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="props.showResetEntryInContextMenu"
          value="2"
          @click="emit('reset-apps-order', true)"
        >
          <v-list-item-title>Reihenfolge zurücksetzen</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
