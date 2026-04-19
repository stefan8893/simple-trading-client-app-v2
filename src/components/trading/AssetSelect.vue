<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useApiRequests } from '@/api/useApiRequests';
import { dummyData } from '@/dummy-data';
import { delay } from '@/utils';
import BaseSelect, {
  type BaseSelectItem,
} from '../infrastructure/BaseSelect.vue';

const { run, isLoading } = useApiRequests({
  loadingStartDelay: 500,
  skipLoadingStartDelayOnFirstRun: false,
});

const model = defineModel<string>();
const assets = ref<BaseSelectItem[]>([]);

onMounted(async () => {
  const result = await run(async () => {
    await delay(2500);
    return dummyData.assets;
  });

  if (result.state === 'success') {
    assets.value = result.value.map((x) => ({ value: x.id, title: x.name }));
  }
});

watch(model, () => {
  console.log('asset changed', model.value);
});
</script>

<template>
  <BaseSelect
    v-model="model"
    :items="assets"
    label="Asset"
    :loading="isLoading"
  />
</template>

<style scoped></style>
