<script setup lang="ts">
import { useRouter } from 'vue-router';

type NavigationItem = {
  icon: string;
  title: string;
  routeName: string;
};

const router = useRouter();

const items = [
  {
    icon: 'ph:house-simple',
    title: 'Home',
    routeName: 'home',
  },
  {
    icon: 'ph:airplane-landing',
    title: 'Landing',
    routeName: 'index',
  },
  {
    icon: 'ph:plus',
    title: 'Neuer Trade',
    routeName: 'new-trade',
  },
] as const satisfies NavigationItem[];

function gotoTarget(navItem: NavigationItem) {
  router.push({ name: navItem.routeName });
}
</script>

<template>
  <div>
    <v-list nav slim>
      <v-list-item
        v-for="item in items"
        :key="item.routeName"
        :prepend-icon="item.icon"
        :title="item.title"
        :value="item.routeName"
        @click="gotoTarget(item)"
      ></v-list-item>
    </v-list>
  </div>
</template>

<style scoped></style>
