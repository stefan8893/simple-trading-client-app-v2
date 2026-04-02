<script setup lang="ts">
</script>

<template>
  <v-app-bar-title class="mx-2.5 sm:mx-5">
    <router-link
      v-slot="{ navigate }"
      custom
      to="/"
    >
      <h1 class="text-xl font-bold">
        <span class="cursor-pointer" @click="navigate">Simple Trading</span>
      </h1>
    </router-link>
  </v-app-bar-title>
</template>
