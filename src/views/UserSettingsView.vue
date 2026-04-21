<script setup lang="ts">
import { ref, watch } from 'vue';
import LanguageSelect from '@/components/user-settings/LanguageSelect.vue';
import { useLanguageStore } from '@/stores/useLanguageStore';

const { language, udpateLanguage } = useLanguageStore();
const model = ref(language);

watch(model, (newValue) => {
  udpateLanguage(newValue);
});
</script>

<template>
  <div class="grid justify-items-center">
    <v-card class="max-w-3xl w-full" tag="form" title="Benutzereinstellungen">
      <v-card-text>
        <LanguageSelect v-model="model" />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
