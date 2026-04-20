<script setup lang="ts"></script>

<template>
  <router-link v-slot="{ navigate }" custom :to="{ name: 'home' }">
    <h1 class="text-xl font-bold">
      <span class="cursor-pointer" @click="navigate">Simple Trading</span>
    </h1>
  </router-link>
</template>
