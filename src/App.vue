<script lang="ts" setup>
import { useLanguageStore } from './stores/useLanguageStore';
import { useNumberFormatStore } from './stores/useNumberFormatStore';
import { useRegionalFormatStore as useRegionalFormatStore } from './stores/useRegionalFormatStore';

// initialize language and regional Stores
useLanguageStore();
useRegionalFormatStore();
useNumberFormatStore();
</script>

<template>
  <v-app>
    <router-view />
  </v-app>
</template>
