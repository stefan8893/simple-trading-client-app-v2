<script setup lang="ts">
import SimpleTextCopy from '@/components/infrastructure/SimpleTextCopy.vue';
import UserAvatar from '@/components/UserAvatar.vue';
</script>

<template>
  <div class="mr-2.5 sm:mr-5">
    <v-menu :close-on-content-click="false">
      <template #activator="{ props }">
        <UserAvatar v-bind="props" class="cursor-pointer" size="small" />
      </template>

      <v-list class="bg-header-user-menu-background" color="primary">
        <v-list-item class="mb-2">
          <template #title>
            <SimpleTextCopy text="John Doe" />
          </template>
          <template #subtitle>
            <SimpleTextCopy text="john.doe@mail.com" />
          </template>
        </v-list-item>

        <v-divider />

        <v-list-item value="1">
          <template #title><span class="text-sm">Einstellungen</span></template>
          <template #prepend>
            <v-icon icon="mdi-cog-outline" />
          </template>
        </v-list-item>

        <v-list-item value="2">
          <template #title><span class="text-sm">Abmelden</span></template>
          <template #prepend>
            <v-icon icon="mdi-close-outline" />
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped></style>
