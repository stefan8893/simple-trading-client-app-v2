<script setup lang="ts">
const props = defineProps<{
  appName: string;
  routeName: string;
  icon: string;
  bgColorClass: string;
}>();
</script>

<template>
  <router-link v-slot="{ navigate }" :to="{ name: props.routeName }">
    <div
      class="flex flex-col flex-nowrap justify-start items-center w-20 sm:w-24"
      @click="navigate"
    >
      <div
        class="w-12 sm:w-16 h-12 sm:h-16 rounded-xl grid place-items-center elevation-2"
        :class="[props.bgColorClass]"
      >
        <v-icon :icon="props.icon" size="x-large"></v-icon>
      </div>
      <div class="text-sm max-w-20 sm:max-w-24 truncate mt-2">
        {{ props.appName }}
      </div>
    </div>
  </router-link>
</template>

<style scoped></style>
