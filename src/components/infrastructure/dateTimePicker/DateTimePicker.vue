<script setup lang="ts">
import { format, parse } from 'date-fns';
import { computed, ref, watch } from 'vue';
import DatePicker from './DatePicker.vue';
import TimePicker from './TimePicker.vue';

const props = defineProps<{
  dateLabel: string;
  timeLabel: string;
  errorMessage?: string;
}>();

const model = defineModel<Date | null | undefined>();

const date = ref<Date | null | undefined>();
const time = ref<string | null | undefined>();

watch(
  model,
  (newValue) => {
    if (!newValue) return;

    date.value = newValue;
    time.value = newValue ? newValue.toTimeString().slice(0, 8) : null;
  },
  { immediate: true },
);

watch([date, time], ([newDate, newTime]) => {
  if (!newDate || !newTime) {
    model.value = null;
    return;
  }

  const newDateTime = parse(newTime, 'HH:mm:ss', newDate);
  if (!model.value || newDateTime?.getTime() !== model.value.getTime()) {
    model.value = newDateTime;
  }
});

function setNow() {
  const now = new Date();

  date.value = now;
  time.value = format(now, 'HH:mm:ss');
}

const isError = computed(() => !!props.errorMessage);
</script>

<template>
  <div class="date-time-picker-container">
    <div class="date-time-picker">
      <DatePicker
        v-model="date"
        class="date-picker"
        :error="isError"
        :error-messages="props.errorMessage"
        :label="props.dateLabel"
        :show-icon="false"
      />
      <TimePicker
        v-model="time"
        class="time-picker"
        :error="isError"
        :label="props.timeLabel"
        :show-icon="false"
      />

      <v-btn class="set-now-btn" icon="ph:clock" @click="setNow" />
    </div>
  </div>
</template>

<style scoped>
.date-time-picker-container {
  container-type: inline-size;
  container-name: date-time-picker-container;
}

.date-time-picker {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  grid-template-rows: auto;

  grid-template-areas: 'date-picker time-picker set-now-btn';
}

.date-picker {
  grid-area: date-picker;
}

.time-picker {
  grid-area: time-picker;
}

.set-now-btn {
  grid-area: set-now-btn;
  align-self: center;
  margin-left: 1rem;
}

@container date-time-picker-container (width < 340px) {
  .date-time-picker {
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    row-gap: 8px;

    grid-template-areas:
      'date-picker date-picker'
      'time-picker set-now-btn';
  }
}
</style>
