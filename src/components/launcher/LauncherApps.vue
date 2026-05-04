<script setup lang="ts">
import { onClickOutside, onKeyStroke, useMediaQuery } from '@vueuse/core';
import { useSortable } from '@vueuse/integrations/useSortable';
import { storeToRefs } from 'pinia';
import { nextTick, ref, useTemplateRef, watch } from 'vue';
import SingleLauncherApp from '@/components/launcher/SingleLauncherApp.vue';
import { useSwipeStore } from '@/stores/useSwipeStore';
import { delay } from '@/utils';
import LauncherAppsContextMenuList from './LauncherAppsContextMenuList.vue';
import { useLaucherApp } from './useLaucherApps';
import { useSingleLauncherAppContextMenu } from './useSingleLauncherAppContextMenu';

const { launcherApps, resetOrder, isOriginalOrder } = useLaucherApp();
const rearrangeApps = ref(false);
const launcherAppsContainer = useTemplateRef('sortable-apps');
const isDragging = ref(false);

// 'coarse' -> Touchscreen
// 'fine' -> Mouse/Stylus
const isTouchScreen = useMediaQuery('(pointer: coarse)');

useSortable(launcherAppsContainer, launcherApps, {
  animation: 300,
  handle: '.sortable-app-handle',
  dataIdAttr: 'data-id',
  dragClass: 'sortable-app-item',
  ghostClass: 'sortable-app-ghost',
  fallbackClass: 'sortable-drag-item',
  chosenClass: 'sortable-app-item-chosen',
  forceFallback: true,
  onStart: () => {
    isDragging.value = true;
  },
  onEnd: () => {
    isDragging.value = false;
  },
});

onClickOutside(launcherAppsContainer, () => {
  if (rearrangeApps.value) {
    rearrangeApps.value = false;
  }
});

const { showContextMenu, x, y } = useSingleLauncherAppContextMenu(
  launcherAppsContainer,
  rearrangeApps,
);

onKeyStroke('Escape', (event) => {
  if (rearrangeApps.value) {
    event.preventDefault();
    rearrangeApps.value = false;
  }
});

const { swipeRightEnabled } = storeToRefs(useSwipeStore());
watch(rearrangeApps, (newValue) => {
  swipeRightEnabled.value = !newValue;
});

async function onContextMenuRearrangingApp() {
  showContextMenu.value = false;
  // give the context menu some time to close
  await delay(10);
  await nextTick();
  rearrangeApps.value = true;
}
</script>

<template>
  <div>
    <div
      ref="launcher-apps"
      class="launcher-apps-container grid justify-items-center select-none relative"
      :class="{ 'z-1007': rearrangeApps }"
    >
      <div
        ref="sortable-apps"
        class="launcher-apps gap-3 sm:gap-6"
        :class="[
          // cursor needs to be set in two different places in order to provide a smooth user experience
          // 1. Here
          // 2. In SingleLauncherApp component
          isDragging ? 'cursor-grabbing' : '',
        ]"
      >
        <SingleLauncherApp
          v-for="(app, index) in launcherApps"
          :key="app.identifier"
          v-model:edit-mode="rearrangeApps"
          :bg-color-class="app.bgColor"
          :class="[
            {
              'sortable-app-item': rearrangeApps,
              'sortable-app-handle': rearrangeApps,
            },
          ]"
          :icon="app.icon"
          :index="index"
          :is-dragging="isDragging"
          :message-count="app.messageCount"
          :message-key="app.messageKey"
          :prevent-visual-feedback-on-click="showContextMenu"
          :route-name="app.routeName"
        />
      </div>

      <v-menu variant="tonal">
        <template #activator="{ props: activatorProps }">
          <v-btn
            v-if="isTouchScreen && !rearrangeApps"
            v-bind="activatorProps"
            class="absolute -right-4 -bottom-10 cursor-pointer no-visual-feedback"
            icon="ph:dots-three-circle-vertical"
            variant="text"
          >
          </v-btn>
        </template>

        <LauncherAppsContextMenuList
          :show-reset-order-entry="!isOriginalOrder"
          @reset-apps-order="resetOrder"
          @start-rearranging-app="onContextMenuRearrangingApp"
        />
      </v-menu>

      <v-menu
        v-model="showContextMenu"
        absolute
        offset-y
        :style="{ top: `${y}px`, left: `${x}px` }"
        variant="tonal"
      >
        <LauncherAppsContextMenuList
          :show-reset-order-entry="!isOriginalOrder"
          @reset-apps-order="resetOrder"
          @start-rearranging-app="onContextMenuRearrangingApp"
        />
      </v-menu>
    </div>
    <!-- Freeze UI while rearranging apps -->
    <v-overlay
      v-model="rearrangeApps"
      :scrim="'rgba(0, 0, 0, 0)'"
      z-index="1006"
    />
  </div>
</template>

<style scoped>
.launcher-apps-container {
  container-type: inline-size;
  container-name: launcher-apps;
  margin-bottom: 1.5rem;
}

.launcher-apps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.sortable-app-ghost {
  opacity: 0;
}

.sortable-drag-item {
  opacity: 1 !important;
}

@container launcher-apps (width < 450px) {
  .launcher-apps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container launcher-apps (width <= 310px) {
  .launcher-apps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.no-visual-feedback {
  background-color: inherit;
}

.no-visual-feedback :deep(.v-btn__overlay) {
  opacity: 0;
}
</style>
