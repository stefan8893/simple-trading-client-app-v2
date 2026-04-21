<script setup lang="ts">
import { computed, nextTick, ref, type Ref, useTemplateRef } from 'vue';
import { useDisplay } from 'vuetify';
import { useSophisticatedTooltipDelay } from './useSophisticatedTooltipDelay';

type NavigationItem = {
  icon: string;
  title: string;
  routeName: string;
  showTooltip: boolean;
  isTooltipOpen?: boolean;
};

const { mobile: isMobile } = useDisplay();
const tooltipsEnabled = ref(true);

const props = defineProps<{
  isSidebarExpanded: boolean;
}>();

const navListContainer = useTemplateRef('nav-list');

const items: Ref<NavigationItem[]> = ref([
  {
    icon: 'ph:house-simple',
    title: 'Home',
    routeName: 'home',
    showTooltip: false,
  },
  {
    icon: 'ph:link',
    title: 'Referenzen',
    routeName: 'trade-references',
    showTooltip: true,
  },
  {
    icon: 'ph:plus',
    title: 'Neuer Trade',
    routeName: 'new-trade',
    showTooltip: true,
  },
  {
    icon: 'ph:gear-six',
    title: 'User Settings',
    routeName: 'user-settings',
    showTooltip: true,
  },
]);

const isAnyTooltipOpen = computed(() => {
  return items.value.some((x) => x.isTooltipOpen);
});

const tooltipOpenDelay = useSophisticatedTooltipDelay(
  navListContainer,
  isAnyTooltipOpen,
);

async function disableTooltipWhileNavigating() {
  tooltipsEnabled.value = false;

  await nextTick();
  tooltipsEnabled.value = true;
}
</script>

<template>
  <div ref="nav-list">
    <v-list nav slim>
      <v-tooltip
        v-for="item in items"
        :key="item.routeName"
        v-model="item.isTooltipOpen"
        close-delay="0"
        :disabled="
          !tooltipsEnabled ||
          isMobile ||
          props.isSidebarExpanded ||
          !item.showTooltip
        "
        location="end"
        :open-delay="tooltipOpenDelay"
      >
        <template #activator="{ props: activatorProps }">
          <v-list-item
            link
            :title="item.title"
            :to="{ name: item.routeName }"
            @click="disableTooltipWhileNavigating"
          >
            <template #prepend>
              <v-icon v-bind="activatorProps" :icon="item.icon"></v-icon>
            </template>
          </v-list-item>
        </template>
        {{ item.title }}
      </v-tooltip>
    </v-list>
  </div>
</template>

<style scoped></style>
