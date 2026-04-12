<script setup lang="ts">
  import { ref } from 'vue';
  import TradeReferences from '@/components/trading/references/TradeReferences.vue';

  const tradeId = ref('52C540EA-FD20-401B-9CC7-B3633FEFC48B');

  const items = ref([
    {
      id: 'd5d1c952-9c53-4c2e-8bbd-48b2292778e3',
      link: 'https://example.org',
      notes: 'First Note',
    },
    {
      id: 'c6adf0d2-f3b5-46f1-b1c2-9905feaf64b2',
      link: 'https://foo.bar',
      notes: '######',
    },
    {
      id: '17632073-3e80-4d5f-8dc8-c33ca363715e',
      link: 'https://bar.fo',
      notes: 'Last Note',
    },
  ]);

  function removeFirst () {
    if (items.value.length <= 0)
      return;

    const copy = [...items.value];
    copy.splice(0, 1);
    items.value = copy;
  }
</script>

<template>
  <v-sheet class="w-full">
    <TradeReferences v-model="items" :trade-id="tradeId" />
    <div class="mt-8">
      <v-btn @click="removeFirst">Remove first</v-btn>
      Parent Items:
      <pre class="text-sm leading-3.5">{{ JSON.stringify(items.map((x,i) => ({...x, index: i})), null, 2) }}</pre>
    </div>
  </v-sheet>
</template>

<style scoped>

</style>
