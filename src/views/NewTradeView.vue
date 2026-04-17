<script setup lang="ts">
import type { ReferenceModel } from '@/components/trading/references/references.types';
import { ref, watch } from 'vue';
import SimpleDateTimePicker from '@/components/infrastructure/dateTimePicker/SimpleDateTimePicker.vue';
import SimpleStepperNumberInput from '@/components/infrastructure/numberInput/SimpleStepperNumberInput.vue';
import SimpleExpandPanel from '@/components/infrastructure/SimpleExpandPanel.vue';
import AssetSelect from '@/components/trading/AssetSelect.vue';
import MarkdownNotes from '@/components/trading/notes/MarkdownNotes.vue';
import ProfileSelect from '@/components/trading/ProfileSelect.vue';
import TradeReferences from '@/components/trading/references/TradeReferences.vue';
import ResultSelect from '@/components/trading/ResultSelect.vue';
import ViewTitle from '@/components/ViewTitle.vue';
import { formatDateTime } from '@/i18n/date-utils';
import { useLocaleStore } from '@/stores/localeStore';
const localeStore = useLocaleStore();
localeStore.locale = 'en-US';

const opened = ref<Date | null>(null);
const closed = ref<Date | null>(null);
const positionSize = ref<number | null>(null);
const profitLoss = ref<number | null>(null);
const entry = ref<number | null>(null);
const stopLoss = ref<number | null>(null);
const takeProfit = ref<number | null>(null);
const exit = ref<number | null>(null);
const references = ref<ReferenceModel[]>([]);
const notes = ref<string | null>(null);

const referencesSectionExpanded = ref(false);
const notesSectionExpanded = ref(false);
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
      <ViewTitle class="px-4" heading="Neuer Trade" />
      <div class="two-columns mt-2 px-6">
        <div class="left">
          <SimpleDateTimePicker
            v-model="opened"
            date-label="Am"
            time-label="Um"
          />
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
        <div class="right">
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

      <SimpleExpandPanel
        v-model="referencesSectionExpanded"
        class="mt-2"
        header-title="Referenzen"
      >
        <template #content>
          <div class="mt-2 px-6">
            <TradeReferences v-model="references" :trade-id="undefined" />
          </div>
        </template>
      </SimpleExpandPanel>

      <SimpleExpandPanel
        v-model="notesSectionExpanded"
        class="mt-2"
        header-title="Anmerkung"
      >
        <template #content>
          <div class="mt-2 px-6">
            <MarkdownNotes v-model="notes" :show-editor="true" />
          </div>
        </template>
      </SimpleExpandPanel>

      <SimpleExpandPanel
        v-model="closeTradeSectionExpanded"
        class="mt-2"
        header-title="Abschließen"
      >
        <template #content>
          <div class="two-columns mt-4 px-6">
            <div class="left">
              <SimpleDateTimePicker
                v-model="closed"
                date-label="Abgeschlossen am"
                time-label="Um"
              />
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
            <div class="right">
              <div class="flex flex-col flex-nowrap gap-2">
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
          </div>
        </template>
      </SimpleExpandPanel>

      <div
        class="flex flex-row flex-wrap justify-end items-start mt-8 px-4 pb-4"
      >
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
  column-gap: 2rem;
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
}
</style>
