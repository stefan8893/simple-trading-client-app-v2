<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useApiRequests } from '@/api/useApiRequests';
import { delay } from '@/utils';
import SimpleSelect from '../infrastructure/SimpleSelect.vue';

const { run, isRunning, isLoading } = useApiRequests({
  loadingStartDelay: 500,
  skipLoadingStartDelayOnFirstRun: false,
});

const assets = ref<string[]>([]);

onMounted(async () => {
  const result = await run(async () => {
    await delay(2500);
    return ['EUR/USD', 'BTC/EUR', 'BTC/USD', 'S&P500', 'ATX'];
  });

  if (result.state === 'success') {
    assets.value = result.value;
  }
});

watch(isRunning, (newValue) => {
  console.log('isRunning changed:', newValue);
});

watch(isLoading, (newValue) => {
  console.log('isLoading changed:', newValue);
});
</script>

<template>
  <SimpleSelect :items="assets" label="Asset" :loading="isLoading" />
</template>

<style scoped></style>
