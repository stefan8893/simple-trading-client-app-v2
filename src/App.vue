<script lang="ts" setup>
import { useLanguageStore } from './stores/i18n/useLanguageStore';
import { useNumberFormatStore } from './stores/i18n/useNumberFormatStore';
import { useRegionalFormatStore } from './stores/i18n/useRegionalFormatStore';

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
