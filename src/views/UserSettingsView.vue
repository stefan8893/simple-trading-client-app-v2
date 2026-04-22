<script setup lang="ts">
import { ref, watch } from 'vue';
import DateFormatSelect from '@/components/user-settings/DateFormatSelect.vue';
import LanguageSelect from '@/components/user-settings/LanguageSelect.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useRegionalFormatStore } from '@/stores/useRegionalFormatStore';

const languageStore = useLanguageStore();
const selectedLanguage = ref(languageStore.language);

watch(selectedLanguage, (newValue) => {
  languageStore.udpate(newValue);
});

const regionalFormatStore = useRegionalFormatStore();
const selectedRegionalFormat = ref(regionalFormatStore.locale);

watch(selectedRegionalFormat, (newValue) => {
  regionalFormatStore.update(newValue);
});
</script>

<template>
  <div class="grid justify-items-center">
    <v-card
      class="max-w-lg w-full"
      tag="form"
      :title="$t(MessageKeys.settings.settings)"
    >
      <v-card-text>
        <LanguageSelect v-model="selectedLanguage" />
        <DateFormatSelect v-model="selectedRegionalFormat" class="mt-4" />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
