<script lang="ts" setup>
import { useDateFormatStore } from './stores/useDateFormatStore';
import { useLanguageStore } from './stores/useLanguageStore';

// initialize language store
useLanguageStore();
useDateFormatStore();
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
