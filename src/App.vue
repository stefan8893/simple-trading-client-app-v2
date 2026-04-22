<script lang="ts" setup>
import { useDateFormatStore } from './stores/useDateFormatStore';
import { useLanguageStore } from './stores/useLanguageStore';

// initialize stores
useLanguageStore();
useDateFormatStore();
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
