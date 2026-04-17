<script setup lang="ts">
import { parse } from 'date-fns';
import { computed, ref } from 'vue';
import { formatTime, getTimeFormat } from '@/i18n/date-utils';
import { useDateLocales } from '@/i18n/useDateLocales';
const { getCurrentLocale } = useDateLocales();
const currentDateLocale = getCurrentLocale();
const timeFormat = getTimeFormat(currentDateLocale) === '24H' ? '24hr' : 'ampm';

const model = defineModel<string | null | undefined>();
const props = withDefaults(
  defineProps<{
    label: string;
    icon?: string;
    showIcon?: boolean;
  }>(),
  {
    icon: 'mdi-clock-time-four-outline',
    showIcon: true,
  },
);

const displayTime = computed(() =>
  model.value ? formatTime(parse(model.value, 'HH:mm:ss', new Date())) : '',
);

const showTimePickerDialog = ref(false);
</script>

<template>
  <v-text-field
    class="min-w-36"
    clearable
    :label="props.label"
    :model-value="displayTime"
    :prepend-icon="props.showIcon ? props.icon : undefined"
    readonly
    type="text"
    @click:clear="model = null"
  >
    <v-dialog v-model="showTimePickerDialog" activator="parent" width="auto">
      <v-card class="overflow-x-auto">
        <v-time-picker
          v-model="model"
          class="overflow-y-auto"
          :format="timeFormat"
          use-seconds
        />
        <template #actions>
          <v-btn @click="showTimePickerDialog = false">Schließen</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-text-field>
</template>

<style scoped></style>
