<script setup lang="ts">
import SimpleAppIcon from '@/components/SimpleAppIcon.vue';
</script>

<template>
  <div class="home-screen grid justify-items-center">
    <v-sheet class="max-w-xl p-4">
      <div class="home-screen-apps gap-4 sm:gap-6">
        <SimpleAppIcon
          app-name="Neuer Trade"
          bg-color-class="bg-trade-icon"
          icon="ph:plus"
          route-name="new-trade"
        />

        <SimpleAppIcon
          app-name="Referenzen"
          bg-color-class="bg-reference-icon"
          icon="ph:link"
          route-name="trade-references"
        />

        <SimpleAppIcon
          app-name="Dummmy 1"
          bg-color-class="bg-primary"
          icon="ph:house"
          route-name="home"
        />

        <SimpleAppIcon
          app-name="Dummmy 2"
          bg-color-class="bg-secondary"
          icon="ph:cheese"
          route-name="home"
        />

        <SimpleAppIcon
          app-name="Dummmy 3"
          bg-color-class="bg-info"
          icon="ph:car-profile"
          route-name="home"
        />

        <SimpleAppIcon
          app-name="Dummmy 4"
          bg-color-class="bg-warning"
          icon="ph:beer-bottle"
          route-name="home"
        />

        <SimpleAppIcon
          app-name="Dummmy 5"
          bg-color-class="bg-error"
          icon="ph:alien"
          route-name="home"
        />
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.home-screen {
  container-type: inline-size;
  container-name: home-screen-apps;
}

.home-screen-apps {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@container home-screen-apps (width < 400px) {
  .home-screen-apps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@container home-screen-apps (width <= 310px) {
  .home-screen-apps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
