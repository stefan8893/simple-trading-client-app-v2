<script lang="ts" setup>
import { useLanguageStore } from './stores/useLanguageStore';

// initialize language store
useLanguageStore();
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
