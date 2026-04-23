<script setup lang="ts">
import { addMonths, set, startOfMonth } from 'date-fns';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import LanguageSelect from '@/components/user-settings/LanguageSelect.vue';
import NumberFormatSelect from '@/components/user-settings/NumberFormatSelect.vue';
import RegionalFormatSelect from '@/components/user-settings/RegionalFormatSelect.vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatCurrency, formatNumber } from '@/i18n/numbers/number-formatter';
import {
  formatDate,
  formatTime,
  getFirstDayOfWeek,
} from '@/i18n/regionalFormat/date-formatter';
import { useLanguageStore } from '@/stores/useLanguageStore';
import { useNumberFormatStore } from '@/stores/useNumberFormatStore';
import { useRegionalFormatStore } from '@/stores/useRegionalFormatStore';

const { t } = useI18n();

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

const previewDate = set(startOfMonth(addMonths(new Date(), 1)), {
  hours: 14,
  minutes: 30,
  seconds: 45,
});

const numberPreview = computed(() => formatNumber(4567.89));

const currencyPreviewEUR = computed(() =>
  formatCurrency(12_345.67, {
    currency: 'EUR',
    currencyDisplay: 'symbol',
  }),
);

const currencyPreviewUSD = computed(() =>
  formatCurrency(12_345.67, {
    currency: 'USD',
    currencyDisplay: 'symbol',
  }),
);

const datePreviewMedium = computed(() => formatDate(previewDate));
const timePreviewMedium = computed(() => formatTime(previewDate));

const dateTimePreviewShort = computed(() =>
  formatTime(previewDate, {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
);

const dateTimePreviewLong = computed(() =>
  formatTime(previewDate, {
    dateStyle: 'full',
    timeStyle: 'medium',
  }),
);

const firstDayOfWeekStartsOn = computed(() =>
  getFirstDayOfWeek(regionalFormatStore.locale) === 1
    ? t(MessageKeys.dates.weekdays.monday)
    : t(MessageKeys.dates.weekdays.sunday),
);

const weekStartsOn = computed(
  () => `${t(MessageKeys.dates.weekStartsOn)} ${firstDayOfWeekStartsOn.value}`,
);
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
          class="py-2.5 mt-8 w-full flex flex-col flex-nowrap justify-start items-center"
          elevation="0"
        >
          <span class="text-lg font-semibold self-start">{{
            $t(MessageKeys.preview)
          }}</span>

          <div class="flex flex-row justify-center mt-2">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="numberPreview">
                  {{ numberPreview }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <v-divider class="my-2 max-w-96 w-full"></v-divider>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="currencyPreviewEUR">
                  {{ currencyPreviewEUR }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="currencyPreviewUSD">
                  {{ currencyPreviewUSD }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <v-divider class="my-2 max-w-96 w-full"></v-divider>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="datePreviewMedium">
                  {{ datePreviewMedium }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="timePreviewMedium">
                  {{ timePreviewMedium }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <v-divider class="my-2 max-w-96 w-full"></v-divider>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="dateTimePreviewShort">
                  {{ dateTimePreviewShort }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="dateTimePreviewLong">
                  {{ dateTimePreviewLong }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>

          <v-divider class="my-2 max-w-96 w-full"></v-divider>

          <div class="flex flex-row justify-center">
            <span class="font-semibold font-mono">
              <v-slide-y-transition mode="out-in">
                <div :key="weekStartsOn">
                  {{ weekStartsOn }}
                </div>
              </v-slide-y-transition>
            </span>
          </div>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
