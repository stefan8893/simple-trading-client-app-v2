<script setup lang="ts">
import { ref } from 'vue';
import HomescreenApp from '@/components/HomescreenApp.vue';

type App = {
  identifier: string;
  name: string;
  bgColor: string;
  icon: string;
  routeName: string;
};

const rearrangeApps = ref(false);

const apps = [
  {
    identifier: 'new-trade',
    name: 'Neuer Trade',
    bgColor: 'bg-trade-icon',
    icon: 'ph:plus',
    routeName: 'new-trade',
  },
  {
    identifier: 'references',
    name: 'Referenzen',
    bgColor: 'bg-reference-icon',
    icon: 'ph:link',
    routeName: 'trade-references',
  },
  {
    identifier: 'dummy-1',
    name: 'Dummy 1',
    bgColor: 'bg-primary',
    icon: 'ph:shield-checkered',
    routeName: 'home',
  },
  {
    identifier: 'dummy-2',
    name: 'Dummy 2',
    bgColor: 'bg-secondary',
    icon: 'ph:hand-tap',
    routeName: 'home',
  },
  {
    identifier: 'dummy-3',
    name: 'Dummy 3',
    bgColor: 'bg-info',
    icon: 'ph:crane-tower',
    routeName: 'home',
  },
  {
    identifier: 'dummy-4',
    name: 'Dummy 4',
    bgColor: 'bg-warning',
    icon: 'ph:calculator',
    routeName: 'home',
  },
  {
    identifier: 'dummy-5',
    name: 'Dummy 5',
    bgColor: 'bg-error',
    icon: 'ph:binoculars',
    routeName: 'home',
  },
] as const satisfies App[];
</script>

<template>
  <div class="home-screen grid justify-items-center">
    <v-sheet class="max-w-xl p-4">
      <div class="home-screen-apps gap-4 sm:gap-6">
        <HomescreenApp
          v-for="(app, index) in apps"
          :key="app.identifier"
          :animation-delay="`${index * 0.025}s`"
          :app-name="app.name"
          :bg-color-class="app.bgColor"
          :edit-mode="rearrangeApps"
          :icon="app.icon"
          :index="index"
          :route-name="app.routeName"
        />
      </div>
    </v-sheet>
    <v-sheet class="mt-2 w-full h-11">
      <v-btn @click="rearrangeApps = !rearrangeApps">Jiggle</v-btn>
    </v-sheet>
  </div>
</template>

<style scoped>
.home-screen {
  container-type: inline-size;
  container-name: home-screen-apps;
}

.home-screen-apps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@container home-screen-apps (width < 400px) {
  .home-screen-apps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container home-screen-apps (width <= 310px) {
  .home-screen-apps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
