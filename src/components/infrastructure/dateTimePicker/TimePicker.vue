<script setup lang="ts">
import { parse } from 'date-fns';
import { computed, ref } from 'vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatTime, isHour12 } from '@/i18n/regionalFormat/date-formatter';
import { useRegionalFormatStore } from '@/stores/useRegionalFormatStore';
const { locale } = useRegionalFormatStore();

const is12HFormat = isHour12(locale);
const timeFormat = is12HFormat ? 'ampm' : '24hr';

const model = defineModel<string | null | undefined>();
const props = withDefaults(
  defineProps<{
    label: string;
    icon?: string;
    showIcon?: boolean;
  }>(),
  {
    icon: 'ph:clock-afternoon',
    showIcon: true,
  },
);

const displayTime = computed(() =>
  model.value
    ? formatTime(parse(model.value, 'HH:mm:ss', new Date()), {
        timeStyle: 'medium',
        hour12: is12HFormat,
      })
    : '',
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
          <v-btn @click="showTimePickerDialog = false">{{
            $t(MessageKeys.close)
          }}</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-text-field>
</template>

<style scoped></style>
