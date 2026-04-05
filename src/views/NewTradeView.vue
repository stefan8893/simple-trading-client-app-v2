<script setup lang="ts">
  import { ref, watch } from 'vue';
  import SimpleDateTimePicker from '@/components/infrastructure/dateTimePicker/SimpleDateTimePicker.vue';
  import SimpleStepperNumberInput from '@/components/infrastructure/numberInput/SimpleStepperNumberInput.vue';
  import SimpleExpandPanel from '@/components/infrastructure/SimpleExpandPanel.vue';
  import AssetSelect from '@/components/trading/AssetSelect.vue';
  import ProfileSelect from '@/components/trading/ProfileSelect.vue';
  import TradeReferences from '@/components/trading/references/TradeReferences.vue';
  import ResultSelect from '@/components/trading/ResultSelect.vue';
  import ViewTitle from '@/components/ViewTitle.vue';
  import { formatDateTime } from '@/i18n/date-utils';
  import { useLocaleStore } from '@/stores/localeStore';
  const localeStore = useLocaleStore();
  localeStore.locale = 'de-AT';

  const opened = ref<Date | null>(null);
  const closed = ref<Date | null>(null);
  const positionSize = ref<number | null>(null);
  const profitLoss = ref<number | null>(null);
  const entry = ref<number | null>(null);
  const stopLoss = ref<number | null>(null);
  const takeProfit = ref<number | null>(null);
  const exit = ref<number | null>(null);

  const referencesSectionExpanded = ref(false);
  const closeTradeSectionExpanded = ref(false);

  watch(opened, () => {
    if (opened.value)
      console.log('opened value changed', formatDateTime(opened.value));
    else console.log('opened date not present');
  });
</script>

<template>
  <div class="flex flex-row flex-nowrap justify-center add-trade-container">
    <v-sheet class="max-w-3xl w-full">
      <ViewTitle text="Neuer Trade" />
      <div class="two-columns mt-2">
        <div class="left ml-4">
          <SimpleDateTimePicker v-model="opened" date-label="Am" time-label="Um" />
          <ProfileSelect />
          <AssetSelect />
          <SimpleStepperNumberInput
            v-model="positionSize"
            :initial-stepper-value="5000"
            label="Positionsgröße"
            :max="999_999_999"
            :min="0"
            :precision="0"
            :step="100"
          />
        </div>
        <div class="right sm:px-10 md:px-14 mr-4">
          <SimpleStepperNumberInput
            v-model="entry"
            class="w-full"
            currency="USD"
            :initial-stepper-value="1.15"
            label="Einstiegspreis"
            :precision="4"
            show-currency
            :step="0.0001"
          />
          <SimpleStepperNumberInput
            v-model="stopLoss"
            currency="USD"
            error-message=""
            :initial-stepper-value="1.149"
            label="Stop-Loss"
            :precision="4"
            show-currency
            :step="0.0001"
          />
          <SimpleStepperNumberInput
            v-model="takeProfit"
            currency="USD"
            :initial-stepper-value="1.153"
            label="Take-Profit"
            :precision="4"
            show-currency
            :step="0.0001"
          />
        </div>
      </div>

      <SimpleExpandPanel v-model="referencesSectionExpanded" class="mt-4" header-title="Referenzen">
        <template #content>
          <div class="px-4 mt-4">
            <TradeReferences :reference-view-mode="{mode: 'create'}" />
          </div>
        </template>
      </SimpleExpandPanel>

      <SimpleExpandPanel v-model="closeTradeSectionExpanded" class="mt-4" header-title="Abschließen">
        <template #content>
          <div class="two-columns mt-4">
            <div class="left ml-4">
              <SimpleDateTimePicker v-model="closed" date-label="Abgeschlossen am" time-label="Um" />
              <SimpleStepperNumberInput
                v-model="profitLoss"
                currency="EUR"
                :initial-stepper-value="50"
                label="Profit/Verlust"
                :precision="2"
                show-currency
                :step="1"
              />
            </div>
            <div class="right sm:px-10 md:px-14 mr-4">
              <SimpleStepperNumberInput
                v-model="exit"
                currency="USD"
                :initial-stepper-value="1.153"
                label="Ausstiegspreis"
                :precision="4"
                show-currency
                :step="0.0001"
              />
              <ResultSelect />
            </div>
          </div>
        </template>
      </SimpleExpandPanel>

      <div class="flex flex-row flex-wrap justify-end items-start mt-4 px-4 pb-4">
        <v-btn>Speichern</v-btn>
      </div>
    </v-sheet>
  </div>
</template>

<style scoped>
.add-trade-container {
  container-type: inline-size;
  container-name: add-trade-container;
}

.two-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;

  row-gap: 1rem;
}

.left {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

.right {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 8px;
}

@container add-trade-container (width < 650px) {
  .two-columns {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }

  .left {
    margin-right: 1rem;
  }

  .right {
    margin-left: 1rem;
    padding-inline: 0;
  }
}
</style>
