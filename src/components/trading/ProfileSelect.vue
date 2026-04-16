<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useApiRequests } from '@/api/useApiRequests';
import { dummyData } from '@/dummy-data';
import { delay } from '@/utils';
import SimpleSelect, {
  type SimpleSelectItem,
} from '../infrastructure/SimpleSelect.vue';

const { run, isLoading } = useApiRequests({
  loadingStartDelay: 500,
  skipLoadingStartDelayOnFirstRun: false,
});

const model = defineModel<string>();
const profiles = ref<SimpleSelectItem[]>([]);

onMounted(async () => {
  const result = await run(async () => {
    await delay(2500);
    return dummyData.profiles;
  });

  if (result.state === 'success') {
    profiles.value = result.value.map((x) => ({ value: x.id, title: x.name }));
  }
});

watch(model, () => {
  console.log('profile changed', model.value);
});
</script>

<template>
  <SimpleSelect
    v-model="model"
    :items="profiles"
    label="Profile"
    :loading="isLoading"
  />
</template>

<style scoped></style>
