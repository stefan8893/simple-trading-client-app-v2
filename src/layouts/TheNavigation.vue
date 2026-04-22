<script setup lang="ts">
import { computed, nextTick, ref, type Ref, useTemplateRef } from 'vue';
import { useDisplay } from 'vuetify';
import { type MessageKey, MessageKeys } from '@/i18n/language/message-keys.g';
import { useSophisticatedTooltipDelay } from './useSophisticatedTooltipDelay';

type NavigationItem = {
  icon: string;
  messageKey: MessageKey;
  messageCount?: number;
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
    messageKey: MessageKeys.home,
    routeName: 'home',
    showTooltip: false,
  },
  {
    icon: 'ph:link',
    messageKey: MessageKeys.trading.reference,
    messageCount: 2,
    routeName: 'trade-references',
    showTooltip: true,
  },
  {
    icon: 'ph:plus',
    messageKey: MessageKeys.trading.newTrade,
    routeName: 'new-trade',
    showTooltip: true,
  },
  {
    icon: 'ph:gear-six',
    messageKey: MessageKeys.settings.settings,
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
            :title="
              item.messageCount
                ? $t(item.messageKey, item.messageCount)
                : $t(item.messageKey)
            "
            :to="{ name: item.routeName }"
            @click="disableTooltipWhileNavigating"
          >
            <template #prepend>
              <v-icon v-bind="activatorProps" :icon="item.icon"></v-icon>
            </template>
          </v-list-item>
        </template>
        {{
          item.messageCount
            ? $t(item.messageKey, item.messageCount)
            : $t(item.messageKey)
        }}
      </v-tooltip>
    </v-list>
  </div>
</template>

<style scoped></style>
