<script lang="ts" setup>
import { useLanguageStore } from './stores/useLanguageStore';
import { useRegionalFormatStore as useRegionalFormatStore } from './stores/useRegionalFormatStore';

// initialize language and regional Stores
useLanguageStore();
useRegionalFormatStore();
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
