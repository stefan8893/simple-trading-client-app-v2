<script setup lang="ts">
const props = defineProps<{
  appName: string;
  routeName: string;
  icon: string;
  bgColorClass: string;
  editMode?: boolean;
  animationDelay?: string;
  index: number;
}>();
</script>

<template>
  <div class="home-screen-app">
    <router-link v-slot="{ navigate }" custom :to="{ name: props.routeName }">
      <div
        class="flex flex-col flex-nowrap justify-start items-center w-20 sm:w-24"
        :class="[props.editMode ? 'cursor-grab' : 'cursor-pointer']"
        @click="!props.editMode && navigate()"
      >
        <div
          class="home-screen-app-icon w-12 sm:w-16 h-12 sm:h-16 rounded-xl grid place-items-center elevation-2"
          :class="[
            props.bgColorClass,
            {
              'is-jiggling': props.editMode,
              'is-even': props.index % 2 === 0,
              'is-triple': (props.index + 1) % 3 === 0,
            },
          ]"
          :style="{ animationDelay: props.animationDelay }"
        >
          <v-icon :icon="props.icon" size="x-large"></v-icon>
        </div>
        <div class="text-sm max-w-20 sm:max-w-24 truncate mt-2">
          {{ props.appName }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.home-screen-app-icon {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: rotate(45deg) translateX(0) translateZ(0);
  will-change: transform;
}

@keyframes jiggle {
  0% {
    transform: rotate(-3deg) translate3d(-1.5px, 0, 0);
  }
  50% {
    transform: rotate(3deg) translate3d(1.5px, 0, 0);
  }
  100% {
    transform: rotate(-3deg) translate3d(-1.5px, 0, 0);
  }
}

.is-jiggling {
  animation: jiggle 0.26s infinite ease-in-out;
  user-select: none;
  will-change: transform;
}

.is-even.is-jiggling {
  animation-direction: reverse;
}

.is-triple.is-jiggling {
  animation-duration: 0.35s;
}
</style>
