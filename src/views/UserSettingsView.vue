<script setup lang="ts">
import { addMonths, set, startOfMonth } from 'date-fns';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import LanguageSelect from '@/components/user-settings/LanguageSelect.vue';
import NumberFormatSelect from '@/components/user-settings/NumberFormatSelect.vue';
import RegionalFormatSelect from '@/components/user-settings/RegionalFormatSelect.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatCurrency, formatNumber } from '@/i18n/numbers/number-formatter';
import { formatDate, formatTime } from '@/i18n/regionalFormat/date-formatter';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useNumberFormatStore } from '@/stores/useNumberFormatStore';
import { useRegionalFormatStore } from '@/stores/useRegionalFormatStore';

const dummyDateTime = set(startOfMonth(addMonths(new Date(), 1)), {
  hours: 14,
  minutes: 30,
});

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
const { fingerprint } = storeToRefs(numberFormatStore);
const selectedNumberFormat = ref(fingerprint.value);

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
        <LanguageSelect v-model="selectedLanguage" class="mt-4" />
        <NumberFormatSelect v-model="selectedNumberFormat" class="mt-4" />

        <v-sheet
          class="px-4 py-2.5 mt-8 w-full border"
          elevation="0"
          rounded="xl"
        >
          <span class="text-lg font-semibold">{{
            $t(MessageKeys.preview)
          }}</span>

          <div class="flex flex-row justify-center mt-2">
            <span class="font-semibold font-mono">{{
              formatNumber(4567.89)
            }}</span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">{{
              formatCurrency(12345.67, {
                currency: 'EUR',
                currencyDisplay: 'narrowSymbol',
              })
            }}</span>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">{{
              formatDate(dummyDateTime)
            }}</span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">{{
              formatTime(dummyDateTime)
            }}</span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">{{
              formatTime(dummyDateTime, {
                dateStyle: 'short',
                timeStyle: 'short',
              })
            }}</span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">{{
              formatTime(dummyDateTime, {
                dateStyle: 'full',
                timeStyle: 'medium',
              })
            }}</span>
          </div>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
