<script setup lang="ts">
import { ref, watch } from 'vue';
import LanguageSelect from '@/components/user-settings/LanguageSelect.vue';
import NumberFormatSelect from '@/components/user-settings/NumberFormatSelect.vue';
import RegionalFormatSelect from '@/components/user-settings/RegionalFormatSelect.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useNumberFormatStore } from '@/stores/useNumberFormatStore';
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

const numberFormatStore = useNumberFormatStore();
const selectedNumberFormat = ref(numberFormatStore.fingerprint);
console.log(selectedNumberFormat.value);
watch(selectedNumberFormat, (newValue) => {
  numberFormatStore.update(newValue);
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
        <RegionalFormatSelect v-model="selectedRegionalFormat" />
        <LanguageSelect v-model="selectedLanguage" class="mt-6" />
        <NumberFormatSelect v-model="selectedNumberFormat" class="mt-4" />
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
