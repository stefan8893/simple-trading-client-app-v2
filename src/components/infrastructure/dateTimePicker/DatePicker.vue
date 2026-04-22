<script setup lang="ts">
import { computed, ref } from 'vue';
import { MessageKeys } from '@/i18n/language/message-keys.g';
import { formatDate } from '@/i18n/regionalFormat/date-utils';
import { useDateLocales } from '@/i18n/regionalFormat/useDateLocales';

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

const model = defineModel<Date | null | undefined>();

const displayDate = computed(() =>
  model.value ? formatDate(model.value) : '',
);
const showDatePickerDialog = ref(false);

const { getCurrentLocale } = useDateLocales();
const weekStartsOn = getCurrentLocale().options?.weekStartsOn ?? 1;
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
            :first-day-of-week="weekStartsOn"
            header-date-format="normalDate"
            show-adjacent-months
          />
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
