<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import TextCopy from '@/components/infrastructure/TextCopy.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';

const { cycle } = useTheme();
const router = useRouter();
const showUserMenu = ref(false);

function closeMenuAndNavigateTo(routeName: string) {
  showUserMenu.value = false;
  router.push({ name: routeName });
}

function logout() {
  console.log('logout user');
  router.push({ name: 'index' });
}
</script>

<template>
  <div class="pr-1.5 sm:pr-4">
    <v-btn
      class="mr-4"
      color="accent"
      icon="ph:paint-roller"
      variant="tonal"
      @click="cycle()"
    ></v-btn>
    <v-menu v-model="showUserMenu" :close-on-content-click="false">
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
          <v-list-item
            :title="$t(MessageKeys.settings.settings)"
            @click="closeMenuAndNavigateTo('user-settings')"
          >
            <template #prepend>
              <v-icon icon="ph:gear-six" />
            </template>
          </v-list-item>

          <v-list-item :title="$t(MessageKeys.logout)" @click="logout()">
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
