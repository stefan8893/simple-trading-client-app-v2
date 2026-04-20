<script setup lang="ts">
import { useTheme } from 'vuetify';
import TextCopy from '@/components/infrastructure/TextCopy.vue';
import UserAvatar from '@/components/UserAvatar.vue';

const { cycle } = useTheme();
</script>

<template>
  <div class="mr-2.5 sm:mr-5">
    <v-btn
      class="mr-4"
      color="accent"
      icon="ph:paint-roller"
      variant="tonal"
      @click="cycle()"
    ></v-btn>
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <UserAvatar v-bind="props" class="cursor-pointer" size="small" />
      </template>

      <v-sheet>
        <v-list slim>
          <v-list-item>
            <template #title>
              <TextCopy text="John Doe" />
            </template>
            <template #subtitle>
              <TextCopy text="john.doe@mail.com" />
            </template>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list nav slim>
          <v-list-item title="Einstellungen" value="1">
            <template #prepend>
              <v-icon icon="ph:gear-six" />
            </template>
          </v-list-item>

          <v-list-item title="Abmelden" value="2">
            <template #prepend>
              <v-icon icon="ph:x" />
            </template>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-menu>
  </div>
</template>

<style scoped></style>
