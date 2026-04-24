<script setup lang="ts">
import { useLocalStorage, useSwipe } from '@vueuse/core';
import { ref, useTemplateRef, watch } from 'vue';
import { useDisplay } from 'vuetify';
import packageInfo from '@/../package.json';
import TextCopy from '@/components/infrastructure/TextCopy.vue';
import TheHeaderRight from './header/TheHeaderRight.vue';
import TheHeaderTitle from './header/TheHeaderTitle.vue';
import TheNavigation from './TheNavigation.vue';

type DesktopSidebarState = {
  showSidebar: boolean;
  isSidebarExpanded: boolean;
};

const { mobile: isMobile } = useDisplay();

const showSidebar = ref(!isMobile.value);
const isSidebarExpanded = useLocalStorage(
  'sidebar-expanded',
  ref(!isMobile.value),
);

const desktopSidebarState: DesktopSidebarState = {
  showSidebar: showSidebar.value,
  isSidebarExpanded: isSidebarExpanded.value,
};

function toggleSidebar(show?: boolean) {
  if (isMobile.value) {
    isSidebarExpanded.value = true;
    showSidebar.value = show ?? !showSidebar.value;
  } else {
    showSidebar.value = true;
    isSidebarExpanded.value = show ?? !isSidebarExpanded.value;
  }
}

watch(isMobile, (changedToMobile) => {
  const saveDesktopSidebarState = () => {
    desktopSidebarState.isSidebarExpanded = isSidebarExpanded.value;
    desktopSidebarState.showSidebar = showSidebar.value;
  };

  const restoreDesktopSidebarState = () => {
    showSidebar.value = desktopSidebarState.showSidebar;
    isSidebarExpanded.value = desktopSidebarState.isSidebarExpanded;
  };

  if (changedToMobile) {
    saveDesktopSidebarState();
  } else {
    restoreDesktopSidebarState();
  }
});

const main = useTemplateRef('main');
const { isSwiping, direction, coordsStart } = useSwipe(main);

watch(isSwiping, (swiping) => {
  if (swiping && isMobile.value && direction.value === 'right') {
    const edgeThreshold = 50;

    if (coordsStart.x > edgeThreshold) {
      toggleSidebar(true);
    }
  }
});
</script>

<template>
  <v-app-bar color="bg-header" density="compact" name="app-bar">
    <v-app-bar-nav-icon
      class="rounded-md"
      color="text"
      icon="ph:sidebar-simple"
      @click.stop="toggleSidebar()"
    ></v-app-bar-nav-icon>

    <v-app-bar-title class="ml-1">
      <TheHeaderTitle />
    </v-app-bar-title>

    <template #append>
      <TheHeaderRight />
    </template>
  </v-app-bar>

  <v-navigation-drawer
    v-model="showSidebar"
    name="sidebar"
    :permanent="!isMobile"
    :rail="!isSidebarExpanded"
  >
    <div class="flex flex-col flex-nowrap h-full">
      <TheNavigation
        class="grow"
        :is-sidebar-expanded="isSidebarExpanded"
        @toggle-sidebar="toggleSidebar"
      />

      <div v-if="isSidebarExpanded" class="mt-5">
        <span class="float-end pr-4 pb-2.5 text-sm font-mono font-light">
          <TextCopy :text="packageInfo.version" />
        </span>
      </div>
    </div>
  </v-navigation-drawer>

  <v-main class="grid justify-items-center">
    <div ref="main" class="w-full h-full">
      <div
        class="max-w-5xl min-w-75 w-full px-2.5 sm:px-5 mt-5 sm:mt-10 mb-36 grow"
      >
        <RouterView />
      </div>
    </div>
  </v-main>
</template>

<style scoped></style>
