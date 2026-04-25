<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import packageInfo from '@/../package.json';
import TextCopy from '@/components/infrastructure/TextCopy.vue';
import { useSwipeStore } from '@/stores/useSwipeStore';
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

const swipeStore = useSwipeStore();
function handleSwipeRight() {
  if (!swipeStore.swipeRightEnabled) return;

  const zoomLevel = window.visualViewport?.scale || 1;

  if (zoomLevel <= 1.05) {
    toggleSidebar(true);
  }
}
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
    touchless
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

  <v-main
    v-touch="{
      right: handleSwipeRight,
      options: { touchAction: 'pan-x pan-y' },
    }"
    class="grid justify-items-center"
  >
    <div
      class="max-w-5xl min-w-75 w-full px-2.5 sm:px-5 mt-5 sm:mt-10 mb-36 grow"
    >
      <RouterView />
    </div>
  </v-main>
</template>

<style scoped></style>
