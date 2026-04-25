<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLocale } from 'vuetify';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import {
  formatDate,
  getFirstDayOfWeek,
} from '@/i18n/regionalFormat/date-formatter';
import { useRegionalFormatStore } from '@/stores/i18n/useRegionalFormatStore';

const props = withDefaults(
  defineProps<{
    label: string;
    icon?: string;
    showIcon?: boolean;
  }>(),
  {
    icon: 'ph:calendar',
    showIcon: true,
  },
);
const { t } = useLocale();

const model = defineModel<Date | null | undefined>();

const displayDate = computed(() =>
  model.value ? formatDate(model.value) : '',
);

const datePickerHeaderDate = computed(() =>
  model.value
    ? formatDate(model.value, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null,
);

const showDatePickerDialog = ref(false);

const { locale } = useRegionalFormatStore();
const firstDayOfWeek = getFirstDayOfWeek(locale);
</script>

<template>
  <v-text-field
    class="min-w-36"
    clearable
    :label="props.label"
    :model-value="displayDate"
    :prepend-icon="props.showIcon ? props.icon : undefined"
    readonly
    type="text"
    @click:clear="model = null"
  >
    <v-dialog v-model="showDatePickerDialog" activator="parent" width="auto">
      <v-card class="overflow-x-auto">
        <template #default>
          <v-date-picker
            v-model="model"
            class="overflow-y-auto"
            :first-day-of-week="firstDayOfWeek"
            show-adjacent-months
          >
            <template #header>
              <div class="pl-6 pb-3 pr-3 h-17.5 custom-header grid">
                <v-slide-y-transition mode="out-in">
                  <div
                    :key="displayDate"
                    class="self-end text-[2rem] leading-10"
                  >
                    {{
                      datePickerHeaderDate ??
                      t('$vuetify.datePicker.input.placeholder')
                    }}
                  </div>
                </v-slide-y-transition>
              </div>
            </template>
          </v-date-picker>
        </template>
        <template #actions>
          <v-btn @click="showDatePickerDialog = false">{{
            $t(MessageKeys.close)
          }}</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-text-field>
</template>

<style scoped></style>
