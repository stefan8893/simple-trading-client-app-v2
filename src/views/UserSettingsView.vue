<script setup lang="ts">
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
  getCalendarWeek,
  getFirstDayOfWeek,
} from '@/i18n/regionalFormat/date-formatter';
import { useLanguageStore } from '@/stores/i18n/useLanguageStore';
import { useNumberFormatStore } from '@/stores/i18n/useNumberFormatStore';
import { useRegionalFormatStore } from '@/stores/i18n/useRegionalFormatStore';

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

const previewDate = new Date();

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

const week = computed(() =>
  getCalendarWeek(previewDate, regionalFormatStore.locale),
);

const dateTimePreviewLong = computed(() =>
  formatTime(previewDate, {
    dateStyle: 'full',
    timeStyle: 'medium',
  }),
);

const firstDayOfWeek = computed(() =>
  getFirstDayOfWeek(regionalFormatStore.locale) === 1
    ? t(MessageKeys.dates.weekdays.monday)
    : t(MessageKeys.dates.weekdays.sunday),
);
</script>

<template>
  <div class="grid justify-items-center">
    <v-card
      class="max-w-xl w-full"
      tag="form"
      :title="$t(MessageKeys.settings.settings)"
    >
      <v-card-text>
        <RegionalFormatSelect v-model="selectedRegionalFormat" />
        <LanguageSelect v-model="selectedLanguage" class="mt-4" />
        <NumberFormatSelect v-model="selectedNumberFormat" class="mt-4" />

        <v-card class="mt-10" color="result-background" variant="flat">
          <v-card-title>
            {{ $t(MessageKeys.preview) }}
          </v-card-title>

          <v-divider></v-divider>

          <v-card-text>
            <div
              class="text-xs font-bold uppercase tracking-wider opacity-40 mt-4 mb-2"
            >
              {{ $t(MessageKeys.number, 2) }}
            </div>

            <div class="flex flex-col flex-nowrap gap-1">
              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60">{{ $t(MessageKeys.number) }}</span>

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="numberPreview"
                    class="font-mono font-medium inline-block"
                  >
                    {{ numberPreview }}
                  </div>
                </transition>
              </div>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60"
                  >{{ $t(MessageKeys.trading.currency) }} (EUR)</span
                >

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="currencyPreviewEUR"
                    class="font-mono font-medium inline-block"
                  >
                    {{ currencyPreviewEUR }}
                  </div>
                </transition>
              </div>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60"
                  >{{ $t(MessageKeys.trading.currency) }} (USD)</span
                >

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="currencyPreviewUSD"
                    class="font-mono font-medium inline-block"
                  >
                    {{ currencyPreviewUSD }}
                  </div>
                </transition>
              </div>
            </div>

            <div
              class="text-xs font-bold uppercase tracking-wider opacity-40 mt-6 mb-2"
            >
              {{ $t(MessageKeys.calendar) }}
            </div>

            <div class="flex flex-col flex-nowrap gap-1">
              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60"
                  >{{ $t(MessageKeys.dates.date) }}
                </span>

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="datePreviewMedium"
                    class="font-mono font-medium inline-block"
                  >
                    {{ datePreviewMedium }}
                  </div>
                </transition>
              </div>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60">{{ $t(MessageKeys.dates.time) }}</span>

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="timePreviewMedium"
                    class="font-mono font-medium inline-block"
                  >
                    {{ timePreviewMedium }}
                  </div>
                </transition>
              </div>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60">{{
                  $t(MessageKeys.dates.calendarWeek)
                }}</span>

                <transition mode="out-in" name="glow-bg">
                  <div :key="week" class="font-mono font-medium inline-block">
                    {{ week }}
                  </div>
                </transition>
              </div>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60">{{
                  $t(MessageKeys.dates.fullFormat)
                }}</span>

                <transition mode="out-in" name="glow-bg">
                  <div
                    :key="dateTimePreviewLong"
                    class="font-mono font-medium inline-block"
                  >
                    {{ dateTimePreviewLong }}
                  </div>
                </transition>
              </div>

              <v-divider class="my-4"></v-divider>

              <div class="flex flex-row flex-wrap justify-between gap-x-4">
                <span class="opacity-60">{{
                  $t(MessageKeys.dates.weekStart)
                }}</span>

                <transition mode="out-in" name="glow-bg">
                  <div :key="firstDayOfWeek" class="font-medium inline-block">
                    {{ firstDayOfWeek }}
                  </div>
                </transition>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped></style>
