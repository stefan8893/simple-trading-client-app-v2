<script setup lang="ts">
import TheFooter from './header/TheFooter.vue';
import TheHeaderRight from './header/TheHeaderRight.vue';
import TheHeaderTitle from './header/TheHeaderTitle.vue';
</script>

<template>
  <v-app-bar color="bg-header" density="compact">
    <TheHeaderTitle />
    <TheHeaderRight />
  </v-app-bar>

  <v-main class="flex flex-row flex-nowrap justify-center items-start">
    <div class="max-w-5xl min-w-75 w-full mx-2.5 sm:mx-5 mt-5 sm:mt-10 mb-36">
      <RouterView />
    </div>
  </v-main>

  <v-footer class="bg-footer max-h-10 px-2.5 sm:px-5">
    <TheFooter />
  </v-footer>
</template>

<style scoped></style>
