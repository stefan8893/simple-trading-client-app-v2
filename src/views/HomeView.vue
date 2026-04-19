<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable';
import { ref, useTemplateRef } from 'vue';
import SimpleStarterApp from '@/components/starter/SimpleStarterApp.vue';

type App = {
  identifier: string;
  name: string;
  bgColor: string;
  icon: string;
  routeName: string;
};

const rearrangeApps = ref(false);

const apps = ref([
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
] as const satisfies App[]);

const sortableContainer = useTemplateRef('sortable-apps');
useSortable(sortableContainer, apps, {
  animation: 300,
  handle: '.sortable-app-handle',
  dataIdAttr: 'data-id',
  dragClass: 'sortable-app-item',
  ghostClass: 'sortable-app-ghost',
  chosenClass: 'sortable-app-item-chosen',
  forceFallback: true,
});
</script>

<template>
  <div
    ref="starter-apps"
    class="starter-apps-container grid justify-items-center"
  >
    <v-sheet class="max-w-xl p-4">
      <div ref="sortable-apps" class="starter-apps gap-3 sm:gap-6">
        <SimpleStarterApp
          v-for="(app, index) in apps"
          :key="app.identifier"
          v-model:edit-mode="rearrangeApps"
          :app-name="app.name"
          :bg-color-class="app.bgColor"
          :class="{
            'sortable-app-item': rearrangeApps,
            'sortable-app-handle': rearrangeApps,
          }"
          :icon="app.icon"
          :index="index"
          :route-name="app.routeName"
        />
      </div>
    </v-sheet>
    <v-btn class="mt-10" @click="rearrangeApps = !rearrangeApps">Jiggle</v-btn>
  </div>
</template>

<style scoped>
.starter-apps-container {
  container-type: inline-size;
  container-name: starter-apps;
}

.starter-apps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@container starter-apps (width < 480px) {
  .starter-apps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container starter-apps (width <= 345px) {
  .starter-apps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.sortable-app-ghost {
  opacity: 0;
}
</style>
