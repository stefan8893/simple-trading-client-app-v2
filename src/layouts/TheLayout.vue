<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useDisplay } from 'vuetify';
import TheFooter from './header/TheFooter.vue';
import TheHeaderRight from './header/TheHeaderRight.vue';
import TheHeaderTitle from './header/TheHeaderTitle.vue';
import TheNavigation from './TheNavigation.vue';

type DesktopSidebarState = {
  showSidebar: boolean;
  showRail: boolean;
};

const { mobile: isMobile } = useDisplay();

const showSidebar = ref(!isMobile.value);
const showRail = useLocalStorage(
  'sidebar-expanded',
  ref(!isMobile.value && !showSidebar.value),
);

const desktopSidebarState: DesktopSidebarState = {
  showSidebar: showSidebar.value,
  showRail: showRail.value,
};

function toggleSidebar(show?: boolean) {
  if (isMobile.value) {
    showRail.value = false;
    showSidebar.value = show ?? !showSidebar.value;
  } else {
    showSidebar.value = true;
    showRail.value = show === undefined ? !showRail.value : !show;
  }
}

watch(isMobile, (changedToMobile) => {
  const saveDesktopSidebarState = () => {
    desktopSidebarState.showRail = showRail.value;
    desktopSidebarState.showSidebar = showSidebar.value;
  };

  const restoreDesktopSidebarState = () => {
    showSidebar.value = desktopSidebarState.showSidebar;
    showRail.value = desktopSidebarState.showRail;
  };

  if (changedToMobile) {
    saveDesktopSidebarState();
  } else {
    restoreDesktopSidebarState();
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
    :rail="showRail"
  >
    <TheNavigation @toggle-sidebar="toggleSidebar" />
  </v-navigation-drawer>

  <v-main class="flex flex-col flex-nowrap items-center justify-start">
    <div
      class="max-w-5xl min-w-75 w-full px-2.5 sm:px-5 mt-5 sm:mt-10 mb-36 grow"
    >
      <RouterView />
    </div>

    <v-footer class="bg-footer max-h-10 px-2.5 sm:px-5 w-full" name="footer">
      <TheFooter />
    </v-footer>
  </v-main>
</template>

<style scoped></style>
