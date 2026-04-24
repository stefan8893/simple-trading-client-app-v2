<script setup lang="ts">
import { onClickOutside, useMediaQuery } from '@vueuse/core';
import { useSortable } from '@vueuse/integrations/useSortable';
import { ref, useTemplateRef } from 'vue';
import SingleLauncherApp from '@/components/launcher/SingleLauncherApp.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLaucherApp } from './useLaucherApps';

const { launcherApps, resetOrder, isOriginalOrder } = useLaucherApp();
const rearrangeApps = ref(false);
const launcherAppsContainer = useTemplateRef('sortable-apps');
const isDragging = ref(false);
const preventContextMenuToOpen = ref(false);
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
</script>

<template>
  <div
    ref="launcher-apps"
    class="launcher-apps-container grid justify-items-center select-none relative"
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
        :prevent-context-menu="preventContextMenuToOpen"
        :route-name="app.routeName"
        :show-reset-entry-in-context-menu="!isOriginalOrder"
        @context-menu-toggle="(opened) => (preventContextMenuToOpen = opened)"
        @reset-apps-order="resetOrder"
      />
    </div>

    <v-menu v-if="isTouchScreen" variant="tonal">
      <template #activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          class="absolute -right-4 -bottom-4 cursor-pointer"
          icon="ph:dots-three-circle-vertical"
          variant="text"
        >
        </v-btn>
      </template>
      <v-list nav>
        <v-list-item value="1" @click="rearrangeApps = true">
          <v-list-item-title>{{
            $t(MessageKeys.arrangeApps)
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item v-if="!isOriginalOrder" value="2" @click="resetOrder">
          <v-list-item-title>{{
            $t(MessageKeys.resetOrder)
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped>
.launcher-apps-container {
  container-type: inline-size;
  container-name: launcher-apps;
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
</style>
